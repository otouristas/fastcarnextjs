#!/usr/bin/env node
/**
 * Harvest the Google Business Profile reviews for Fast Motor Rental Naxos.
 *
 *   node scripts/scrape-google-reviews.mjs [--cid <id>] [--out <path>] [--headful]
 *
 * Google virtualises the review list, so cards are destroyed as they scroll out
 * of view. The loop therefore harvests on every scroll step and merges into a
 * Map keyed by review id rather than reading the DOM once at the end.
 *
 * Output is raw scrape data; `scripts/import-reviews.mjs` normalises it into
 * src/content/reviews-google.json. Keeping those separate means a partial or
 * blocked scrape can never silently truncate what the site publishes.
 */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import puppeteer from "puppeteer";

const args = process.argv.slice(2);
const flag = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i === -1 ? fallback : args[i + 1];
};

// From the Google listing URL in google-reviews.md (`rldimm=…`), which is the
// decimal CID for Fast Motor Car Rental Naxos. NOT the competitor's profile.
const CID = flag("cid", "4683627190655486374");
const OUT = flag("out", ".tmp/google-reviews.json");
const HEADFUL = args.includes("--headful");

const MAX_SCROLLS = 400;
const STABLE_LIMIT = 25;
const SCROLL_STEP = 520;
const SETTLE_MS = 750;

const CONSENT_LABELS = ["Accept all", "Alle akzeptieren", "Αποδοχή όλων", "I agree", "Accept"];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/** "3 months ago" / "a year ago" -> ISO date, resolved against the run date. */
function parseRelativeDate(text, now = new Date()) {
  if (!text) return null;
  const m = text.match(/(\d+|a|an)\s*(second|minute|hour|day|week|month|year)/i);
  if (!m) return null;
  const n = /^\d+$/.test(m[1]) ? Number(m[1]) : 1;
  const d = new Date(now);
  switch (m[2].toLowerCase()) {
    case "second": d.setSeconds(d.getSeconds() - n); break;
    case "minute": d.setMinutes(d.getMinutes() - n); break;
    case "hour":   d.setHours(d.getHours() - n); break;
    case "day":    d.setDate(d.getDate() - n); break;
    case "week":   d.setDate(d.getDate() - n * 7); break;
    case "month":  d.setMonth(d.getMonth() - n); break;
    case "year":   d.setFullYear(d.getFullYear() - n); break;
  }
  return d.toISOString().slice(0, 10);
}

async function clickByText(page, labels) {
  return page.evaluate((wanted) => {
    const nodes = [...document.querySelectorAll('button, [role="button"], form button')];
    const hit = nodes.find((n) => wanted.some((w) => (n.textContent || "").trim().startsWith(w)));
    if (hit) { hit.click(); return true; }
    return false;
  }, labels);
}

async function main() {
  const browser = await puppeteer.launch({
    headless: HEADFUL ? false : "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--lang=en-GB"],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });
  await page.setUserAgent(
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36",
  );

  const url = `https://www.google.com/maps?cid=${CID}&hl=en`;
  console.log(`→ ${url}`);
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
  await sleep(2500);

  if (await clickByText(page, CONSENT_LABELS)) {
    console.log("→ accepted consent");
    await sleep(2500);
  }

  // The reviews tab is labelled "Reviews" / "N reviews" depending on layout.
  const openedTab = await page.evaluate(() => {
    const tab = [...document.querySelectorAll('button[role="tab"], button')].find((b) =>
      /^reviews?\b|\breviews$/i.test((b.getAttribute("aria-label") || b.textContent || "").trim()),
    );
    if (tab) { tab.click(); return true; }
    return false;
  });
  console.log(openedTab ? "→ opened reviews tab" : "! reviews tab not found (may already be open)");
  await sleep(3000);

  // The header aggregate is the number that must match schema.org
  // AggregateRating. It counts ratings without text too, so it is always >= the
  // number of review cards harvested below; never substitute one for the other.
  const header = await page.evaluate(() => {
    const text = document.body.innerText || "";
    const name = document.querySelector("h1")?.textContent?.trim() || null;
    const ratingMatch = text.match(/(\d[.,]\d)\s*\n?\s*(?:\(|\s)?([\d.,]+)\s*reviews?/i);
    const countOnly = text.match(/([\d.,]+)\s*reviews?/i);
    return {
      name,
      rating: ratingMatch ? Number(ratingMatch[1].replace(",", ".")) : null,
      total: ratingMatch
        ? Number(ratingMatch[2].replace(/[.,]/g, ""))
        : countOnly
          ? Number(countOnly[1].replace(/[.,]/g, ""))
          : null,
    };
  });
  const place = header.name;
  console.log(`→ place: ${place ?? "unknown"}`);
  console.log(`→ header aggregate: ${header.rating ?? "?"} from ${header.total ?? "?"} reviews`);

  // Tag the scroll container so the loop always scrolls the right element.
  const tagged = await page.evaluate(() => {
    const card = document.querySelector("[data-review-id]");
    let node = card?.parentElement;
    while (node && node !== document.body) {
      const style = getComputedStyle(node);
      if (/(auto|scroll)/.test(style.overflowY) && node.scrollHeight > node.clientHeight + 40) {
        node.setAttribute("data-reviews-scroll", "1");
        return true;
      }
      node = node.parentElement;
    }
    return false;
  });
  if (!tagged) console.log("! scroll container not found — falling back to window scroll");

  const byId = new Map();
  let stable = 0;

  for (let i = 0; i < MAX_SCROLLS && stable < STABLE_LIMIT; i++) {
    // Expand truncated bodies before harvesting; Google caps them at ~3 lines.
    await page.evaluate(() => {
      const more = [...document.querySelectorAll('button[aria-label*="See more"], button.w8nwRe')];
      more.slice(0, 30).forEach((b) => b.click());
    });
    await sleep(220);

    const batch = await page.evaluate(() => {
      const out = [];
      for (const card of document.querySelectorAll("[data-review-id]")) {
        const id = card.getAttribute("data-review-id");
        if (!id) continue;
        const author = card.querySelector(".d4r55")?.textContent?.trim() ?? "";
        const ratingLabel =
          card.querySelector('[aria-label*="star"]')?.getAttribute("aria-label") ?? "";
        const rating = Number((ratingLabel.match(/([\d.]+)/) || [])[1] ?? 0);
        let text =
          card.querySelector(".wiI7pd")?.textContent ??
          card.querySelector(".MyEned")?.textContent ??
          "";
        text = text
          .replace(/\(Translated by Google\)/g, "")
          .replace(/\(Original\)/g, "\n")
          .replace(/See original/g, "")
          .trim();
        const relative = card.querySelector(".rsqaWe")?.textContent?.trim() ?? "";
        if (!author && !text) continue;
        out.push({ id, author, rating, text, relative });
      }
      return out;
    });

    const before = byId.size;
    for (const r of batch) {
      const existing = byId.get(r.id);
      // Keep the longest body seen: a card harvested before "See more" fired is
      // the truncated version of the same review.
      if (!existing || r.text.length > existing.text.length) byId.set(r.id, r);
    }
    stable = byId.size > before ? 0 : stable + 1;

    await page.evaluate((step) => {
      const el = document.querySelector('[data-reviews-scroll="1"]');
      if (el) el.scrollBy(0, step);
      else window.scrollBy(0, step);
    }, SCROLL_STEP);
    await sleep(SETTLE_MS);

    if (i % 20 === 0) console.log(`  … ${byId.size} reviews after ${i} scrolls`);
  }

  const reviews = [...byId.values()].map((r) => ({
    reviewId: r.id,
    author: r.author,
    rating: r.rating,
    text: r.text,
    relativeTime: r.relative,
    date: parseRelativeDate(r.relative),
  }));

  await browser.close();

  const outPath = path.resolve(OUT);
  await mkdir(path.dirname(outPath), { recursive: true });
  await writeFile(
    outPath,
    JSON.stringify(
      {
        cid: CID,
        place,
        scrapedAt: new Date().toISOString(),
        aggregate: { rating: header.rating, total: header.total },
        harvested: reviews.length,
        reviews,
      },
      null,
      2,
    ),
  );
  console.log(`\n${reviews.length} reviews -> ${OUT}`);
  if (reviews.length === 0) {
    console.error("No reviews harvested. Re-run with --headful to see what Google served.");
    process.exitCode = 1;
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
