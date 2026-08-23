const ORIGIN = (process.env.SITE_ORIGIN ?? "http://127.0.0.1:3000").replace(/\/$/, "");
import { readFile } from "node:fs/promises";

const CANONICAL = "https://naxos-carrentals.com";
const LOCALES = ["en", "el", "it", "fr", "de"];
const errors = [];

function check(condition, message) {
  if (!condition) errors.push(message);
}

async function request(path, init) {
  return fetch(`${ORIGIN}${path}`, { redirect: "manual", ...init });
}

async function text(path, init) {
  const response = await request(path, init);
  return { response, body: await response.text() };
}

const [robots, indexA, indexB, ai, llmsFull, llms] = await Promise.all([
  text("/robots.txt"),
  text("/sitemap-index.xml"),
  text("/sitemap-index.xml"),
  text("/ai.txt"),
  text("/llms-full.txt"),
  text("/llms.txt"),
]);

check(indexA.response.ok, "sitemap-index.xml must return 200");
check(indexA.body === indexB.body, "sitemap-index.xml must be byte-stable between requests");

// The sitemap is split by page group for per-group coverage reporting in Search
// Console. Every child listed in the index must resolve, and the checks below
// run against their concatenation so a URL moving between groups is invisible.
const childLocs = [...indexA.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
check(childLocs.length > 0, "sitemap-index.xml lists no child sitemaps");
for (const loc of childLocs) {
  check(loc.startsWith(CANONICAL), `${loc}: sitemap index entry is not canonical-host-only`);
}
const children = await Promise.all(
  childLocs.map((loc) => text(loc.slice(CANONICAL.length))),
);
for (let i = 0; i < children.length; i++) {
  check(children[i].response.ok, `${childLocs[i]}: child sitemap returned ${children[i].response.status}`);
}

// The legacy single-file URL is the one currently submitted in Search Console,
// so it must keep resolving rather than 404 and drop reported coverage.
const legacy = await request("/sitemap.xml", { redirect: "manual" });
check(
  legacy.status === 301 || legacy.status === 308 || legacy.ok,
  `/sitemap.xml must still resolve (got ${legacy.status})`,
);

const sitemapA = { response: indexA.response, body: children.map((c) => c.body).join("\n") };

check(robots.response.ok, "robots.txt must return 200");
check(/User-Agent:\s*\*/i.test(robots.body), "robots.txt needs one public wildcard group");
check(/Disallow:\s*\/api\//i.test(robots.body), "robots.txt must exclude /api/");
check(
  robots.body.includes(`${CANONICAL}/sitemap-index.xml`),
  "robots.txt must advertise the canonical sitemap index",
);

check(!/(llms\.txt|llms-full\.txt|ai\.txt)/i.test(sitemapA.body), "sitemap.xml must not list the AI text endpoints");
check(!sitemapA.body.includes("fastcarrentalsnaxos.gr"), "sitemap.xml contains a non-canonical host");
// Only /fleet/scooters survives, as an editorial page at the URL that already
// ranks. The genuinely dead inventory paths must stay out.
check(!/fleet\/(?:atv|quad|bugg(?:y|ies)|motorbikes?)/i.test(sitemapA.body), "sitemap.xml contains retired fleet URLs");

// The content that commit 847f9a4 silently removed from the sitemap. Each of
// these assertions guards a specific regression that already shipped once.
for (const [label, pattern] of [
  ["editorial guides", /\/guides\/[a-z0-9-]+</i],
  ["the Naxos island guide hub", /\/naxos</i],
  ["Naxos guide articles", /\/naxos\/[a-z0-9-]+</i],
  ["location pages", /\/locations\/[a-z0-9-]+</i],
  ["the scooter-rental page", /\/fleet\/scooters</i],
  ["commercial pages", /\/(?:pricing|insurance|faq|reviews)</i],
]) {
  check(pattern.test(sitemapA.body), `sitemap.xml is missing ${label}`);
}

const sitemapBlocks = sitemapA.body.match(/<url>[\s\S]*?<\/url>/g) ?? [];
check(sitemapBlocks.length > 0, "sitemap.xml contains no URL entries");
for (const block of sitemapBlocks) {
  const loc = block.match(/<loc>(.*?)<\/loc>/)?.[1] ?? "unknown";
  const alternates = block.match(/hreflang=/g)?.length ?? 0;
  check(loc.startsWith(CANONICAL), `${loc}: sitemap URL is not canonical-host-only`);
  check(alternates === LOCALES.length + 1, `${loc}: expected five locale alternates plus x-default`);
  for (const locale of LOCALES) {
    check(new RegExp(`hreflang="${locale}"`, "i").test(block), `${loc}: missing ${locale} hreflang`);
  }
  check(block.includes('hreflang="x-default"'), `${loc}: missing x-default hreflang`);
}

// The AI discovery layer must be served, not gone. These three files used to
// return 410 / noindex, which removed the site from the corpus that answer
// engines build from.
for (const [name, result] of [["ai.txt", ai], ["llms-full.txt", llmsFull], ["llms.txt", llms]]) {
  check(result.response.ok, `${name} must return 200`);
  check(
    !(result.response.headers.get("x-robots-tag") ?? "").includes("noindex"),
    `${name} must not be served with X-Robots-Tag: noindex`,
  );
}
check(llms.body.includes("naxos-carrentals.com/en/naxos"), "llms.txt must index the Naxos guide");
check(/graviera|Fleet/i.test(llmsFull.body), "llms-full.txt must contain the full content dump");
// Cars-only is a standing correction for AI systems; assert it survives edits.
check(/rents? CARS ONLY|Car rental only/i.test(ai.body + llms.body), "AI files must state the fleet is cars-only");

const localizedHomes = await Promise.all(LOCALES.map((locale) => text(`/${locale}`)));
localizedHomes.forEach(({ response, body }, index) => {
  const locale = LOCALES[index];
  check(response.ok, `/${locale} must return 200`);
  check(new RegExp(`<html[^>]+lang="${locale}"`).test(body), `/${locale} has the wrong server-rendered html lang`);
});

const root = await request("/");
check([307, 308].includes(root.status), "/ must redirect through the locale proxy");

// These six guides were 301'd into unrelated pages and lost ~65 clicks and
// ~4,600 impressions a quarter of earned ranking. They must serve 200, in every
// locale, and never be redirected again.
for (const slug of [
  "atv-vs-buggy-vs-car",
  "best-car-rental-naxos-reviews-comparison",
  "idp-greece-rules",
  "new-greek-traffic-code-2026",
  "naxos-car-rental-without-credit-card-insurance",
  "rent-a-car-naxos-port-vs-airport-pickup-guide",
]) {
  for (const locale of ["en", "el"]) {
    const response = await request(`/${locale}/guides/${slug}`);
    check(response.status === 200, `/${locale}/guides/${slug} must return 200, got ${response.status}`);
  }
}

// The highest-traffic URL on the site. It 404'd for a full quarter.
for (const locale of LOCALES) {
  const response = await request(`/${locale}/fleet/scooters`);
  check(response.status === 200, `/${locale}/fleet/scooters must return 200, got ${response.status}`);
}

const sitemapPaths = sitemapBlocks
  .map((block) => block.match(/<loc>(.*?)<\/loc>/)?.[1])
  .filter(Boolean)
  .map((url) => new URL(url).pathname);

const pageResults = [];
for (let index = 0; index < sitemapPaths.length; index += 8) {
  const batch = sitemapPaths.slice(index, index + 8);
  pageResults.push(...(await Promise.all(batch.map((path) => text(path)))));
}

const internalPaths = new Set();
const ogChecks = [];
for (let index = 0; index < pageResults.length; index += 1) {
  const { response, body } = pageResults[index];
  const path = sitemapPaths[index];
  check(response.ok, `${path}: sitemap URL returned ${response.status}`);
  check(!/noindex/i.test(body.match(/<meta[^>]+name="robots"[^>]*>/i)?.[0] ?? ""), `${path}: sitemap URL is noindex`);
  check(/<title>[^<]{10,}<\/title>/i.test(body), `${path}: missing or too-short <title>`);
  check(/<meta name="description" content="[^"]{50,}"/i.test(body), `${path}: missing or too-short meta description`);
  check((body.match(/<h1[\s>]/gi) ?? []).length === 1, `${path}: must have exactly one H1`);
  check(body.includes('rel="canonical"'), `${path}: missing canonical`);
  check(/hreflang="x-default"/i.test(body), `${path}: missing x-default hreflang`);

  // Every page must advertise an OG image that actually resolves. Static
  // /og/*.png files only exist for a dozen routes; the rest must use the
  // dynamic generator rather than pointing at a 404.
  const ogImage = body.match(/<meta property="og:image" content="([^"]*)"/i)?.[1];
  check(Boolean(ogImage), `${path}: missing og:image`);
  if (ogImage?.startsWith(CANONICAL)) {
    ogChecks.push([path, new URL(ogImage.replaceAll("&amp;", "&")).pathname + new URL(ogImage.replaceAll("&amp;", "&")).search]);
  }

  for (const match of body.matchAll(/href="([^"#?]+)(?:[?#][^"]*)?"/g)) {
    const href = match[1].replaceAll("&amp;", "&");
    try {
      const url = new URL(href, CANONICAL);
      if (url.origin === CANONICAL && !url.pathname.startsWith("/api/")) {
        internalPaths.add(url.pathname);
      }
    } catch {
      errors.push(`${path}: invalid href ${href}`);
    }
  }
}

// Resolve each distinct og:image once — many pages share the generated one.
const uniqueOg = [...new Map(ogChecks.map(([path, og]) => [og, path])).entries()];
for (let index = 0; index < uniqueOg.length; index += 8) {
  const batch = uniqueOg.slice(index, index + 8);
  const results = await Promise.all(batch.map(([og]) => request(og)));
  results.forEach((response, offset) => {
    const [og, path] = batch[offset];
    check(response.status < 400, `${path}: og:image ${og} returned ${response.status}`);
  });
}

const retiredFleetPath = /\/fleet\/(?:atv|quad|bugg(?:y|ies)|motorbikes?)(?:\/|$)/i;
for (const path of internalPaths) {
  check(!retiredFleetPath.test(path), `${path}: internal link points to retired inventory`);
}

// seo-os Law 4: no orphans. Every sitemap URL needs at least one internal
// inbound link from a rendered page, or crawlers only ever reach it via the
// sitemap and it accrues no internal authority.
const orphans = sitemapPaths.filter((path) => !internalPaths.has(path));
for (const path of orphans) {
  check(false, `${path}: orphan — no internal link points to it`);
}

// Duplicate titles and descriptions are the CTR killer this site already has —
// but only *within* a locale. The same English title appearing under /en and
// /el is what reciprocal hreflang exists to resolve, and is the expected state
// for pages awaiting translation, so compare each locale against itself.
const localeOf = (path) => path.split("/")[1] ?? "";
const titles = new Map();
const descriptions = new Map();
for (let index = 0; index < pageResults.length; index += 1) {
  const { body } = pageResults[index];
  const path = sitemapPaths[index];
  const locale = localeOf(path);
  const title = body.match(/<title>([^<]*)<\/title>/i)?.[1];
  const description = body.match(/<meta name="description" content="([^"]*)"/i)?.[1];
  if (title) {
    const key = `${locale}::${title}`;
    check(!titles.has(key), `${path}: duplicate <title> shared with ${titles.get(key)}`);
    titles.set(key, path);
    // The root layout's title template used to append the brand on top of what
    // buildMetadata already produced, so 93 audited URLs shipped it twice.
    const brandHits = title.split("Fast Motor Rental Naxos").length - 1;
    check(brandHits <= 1, `${path}: <title> repeats the brand (${brandHits}x)`);
    // A trailing ellipsis means the clamp ate the end of the title.
    check(!/…\s*$/.test(title), `${path}: <title> was truncated by the length clamp`);
  }
  if (description) {
    const key = `${locale}::${description}`;
    check(
      !descriptions.has(key),
      `${path}: duplicate meta description shared with ${descriptions.get(key)}`,
    );
    descriptions.set(key, path);
  }
}

// Every URL the blueprint's master plan calls P0 must exist and be indexable.
// These are the pages carrying proven GSC demand; a refactor that quietly drops
// one is the exact failure mode that put /en/fleet/scooters on a 404.
const { rows: masterPlan } = JSON.parse(
  await readFile(new URL("../docs/seo/blueprint/08_url_master_plan.json", import.meta.url), "utf8"),
);
const sitemapSet = new Set(sitemapPaths);
const missingP0 = masterPlan
  .filter((row) => row.Priority === "P0")
  .map((row) => (row["Canonical URL"] ?? "").replace(CANONICAL, ""))
  .filter((path) => path && !sitemapSet.has(path));
for (const path of missingP0) {
  check(false, `${path}: P0 URL from the blueprint master plan is not in the sitemap`);
}

const linkPaths = [...internalPaths];
for (let index = 0; index < linkPaths.length; index += 12) {
  const batch = linkPaths.slice(index, index + 12);
  const results = await Promise.all(batch.map((path) => request(path)));
  results.forEach((response, offset) => {
    check(response.status < 400, `${batch[offset]}: internal link returned ${response.status}`);
  });
}

if (errors.length > 0) {
  console.error(`Site validation failed with ${errors.length} issue(s):`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log(
  `Site validation passed for ${sitemapPaths.length} sitemap URLs and ${internalPaths.size} internal paths.`,
);
