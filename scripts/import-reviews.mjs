#!/usr/bin/env node
/**
 * Normalise a raw scrape into the dataset the site publishes.
 *
 *   node scripts/scrape-google-reviews.mjs
 *   node scripts/import-reviews.mjs [--in .tmp/google-reviews.json]
 *
 * Kept separate from the scrape on purpose: a partial or rate-limited scrape
 * should never silently truncate what is published. This step refuses to write
 * if the harvest looks materially smaller than what is already committed.
 */
import { readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);
const flag = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i === -1 ? fallback : args[i + 1];
};

const IN = flag("in", ".tmp/google-reviews.json");
const OUT = flag("out", "src/content/reviews-google.json");
const FORCE = args.includes("--force");

/**
 * Language of a review body. Google serves this profile's reviews already
 * translated into English, so in practice almost everything resolves to "en";
 * the detection stays because the dataset is re-scraped and a future harvest
 * may carry originals. Scoring needs 3+ stopword hits so an English review
 * containing "la" or "de" is not misfiled.
 */
const STOPWORDS = {
  el: null, // handled by script range below
  it: ["il", "la", "che", "per", "con", "sono", "auto", "molto", "noi", "abbiamo", "della", "grazie"],
  es: ["el", "la", "que", "por", "con", "muy", "coche", "nos", "todo", "gracias", "para", "fue"],
  fr: ["le", "la", "les", "que", "pour", "avec", "nous", "très", "voiture", "merci", "était", "des"],
  de: ["und", "der", "die", "das", "wir", "sehr", "auto", "war", "nicht", "mit", "für", "haben"],
  nl: ["een", "het", "wij", "auto", "zeer", "was", "niet", "met", "voor", "goed", "heel"],
};

function detectLang(text) {
  if (/[Ͱ-Ͽἀ-῿]/.test(text)) return "el";
  const tokens = text.toLowerCase().match(/\p{L}+/gu) ?? [];
  if (tokens.length < 4) return "en";
  const set = new Set(tokens);
  let best = "en";
  let bestScore = 2; // require 3+ hits to beat English
  for (const [lang, words] of Object.entries(STOPWORDS)) {
    if (!words) continue;
    const score = words.reduce((n, w) => n + (set.has(w) ? 1 : 0), 0);
    if (score > bestScore) {
      best = lang;
      bestScore = score;
    }
  }
  return best;
}

const raw = JSON.parse(await readFile(path.resolve(IN), "utf8"));

const reviews = raw.reviews
  .filter((r) => r.text?.trim() && r.author?.trim() && r.rating > 0 && r.date)
  .map((r) => ({
    reviewId: r.reviewId,
    author: r.author.trim(),
    rating: r.rating,
    date: r.date,
    text: r.text.replace(/\n{3,}/g, "\n\n").trim(),
    lang: detectLang(r.text),
    source: "Google",
  }))
  // Newest first; ties broken by id so the order is stable between runs.
  .sort((a, b) => b.date.localeCompare(a.date) || a.reviewId.localeCompare(b.reviewId));

if (reviews.length === 0) {
  console.error("Refusing to write: the scrape produced no usable reviews.");
  process.exit(1);
}

// Guard against publishing a truncated harvest over a good one.
const outPath = path.resolve(OUT);
if (existsSync(outPath) && !FORCE) {
  const previous = JSON.parse(await readFile(outPath, "utf8"));
  const before = previous.reviews?.length ?? 0;
  if (reviews.length < before * 0.9) {
    console.error(
      `Refusing to write: ${reviews.length} reviews would replace ${before}. ` +
        `Re-run the scrape, or pass --force if the drop is real.`,
    );
    process.exit(1);
  }
}

const aggregate = raw.aggregate ?? {};
if (!aggregate.rating || !aggregate.total) {
  console.error(
    "Refusing to write: the scrape captured no header aggregate. That number is " +
      "what schema.org AggregateRating publishes and it must not be inferred.",
  );
  process.exit(1);
}

const byLang = reviews.reduce((acc, r) => ({ ...acc, [r.lang]: (acc[r.lang] ?? 0) + 1 }), {});

await writeFile(
  outPath,
  JSON.stringify(
    {
      _comment:
        "GENERATED — do not edit by hand. Regenerate with scripts/scrape-google-reviews.mjs " +
        "then scripts/import-reviews.mjs. `aggregate` is the Google Business Profile header " +
        "total (it counts ratings left without text) and is the only number schema.org " +
        "AggregateRating may publish; `reviews` are the cards that carry readable text.",
      source: "Google Business Profile",
      cid: raw.cid,
      scrapedAt: raw.scrapedAt,
      aggregate: { rating: aggregate.rating, total: aggregate.total },
      reviews,
    },
    null,
    2,
  ) + "\n",
);

console.log(`${OUT}`);
console.log(`  aggregate : ${aggregate.rating} from ${aggregate.total} (Google header)`);
console.log(`  published : ${reviews.length} reviews with text`);
console.log(`  languages : ${Object.entries(byLang).map(([l, n]) => `${l}=${n}`).join(", ")}`);
console.log(`  ratings   : ${[5, 4, 3, 2, 1].map((n) => `${n}★=${reviews.filter((r) => r.rating === n).length}`).join(", ")}`);
