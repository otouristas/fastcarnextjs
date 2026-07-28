const ORIGIN = (process.env.SITE_ORIGIN ?? "http://127.0.0.1:3000").replace(/\/$/, "");
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

const [robots, sitemapA, sitemapB, ai, llmsFull, llms] = await Promise.all([
  text("/robots.txt"),
  text("/sitemap.xml"),
  text("/sitemap.xml"),
  text("/ai.txt"),
  text("/llms-full.txt"),
  text("/llms.txt"),
]);

check(robots.response.ok, "robots.txt must return 200");
check(/User-Agent:\s*\*/i.test(robots.body), "robots.txt needs one public wildcard group");
check(/Disallow:\s*\/api\//i.test(robots.body), "robots.txt must exclude /api/");
check(robots.body.includes(`${CANONICAL}/sitemap.xml`), "robots.txt must advertise the canonical sitemap");

check(sitemapA.response.ok, "sitemap.xml must return 200");
check(sitemapA.body === sitemapB.body, "sitemap.xml must be byte-stable between requests");
check(!/(changefreq|priority|llms\.txt|llms-full\.txt|ai\.txt)/i.test(sitemapA.body), "sitemap.xml contains a forbidden field or AI text endpoint");
check(!sitemapA.body.includes("fastcarrentalsnaxos.gr"), "sitemap.xml contains a non-canonical host");
check(!/fleet\/(?:scooters?|atv|quad|bugg(?:y|ies)|motorbikes?)/i.test(sitemapA.body), "sitemap.xml contains retired fleet URLs");

const sitemapBlocks = sitemapA.body.match(/<url>[\s\S]*?<\/url>/g) ?? [];
check(sitemapBlocks.length > 0, "sitemap.xml contains no URL entries");
for (const block of sitemapBlocks) {
  const loc = block.match(/<loc>(.*?)<\/loc>/)?.[1] ?? "unknown";
  const alternates = block.match(/hreflang=/g)?.length ?? 0;
  check(loc.startsWith(CANONICAL), `${loc}: sitemap URL is not canonical-host-only`);
  check(alternates === LOCALES.length + 1, `${loc}: expected five locale alternates plus x-default`);
  for (const locale of LOCALES) {
    check(block.includes(`hreflang="${locale}"`), `${loc}: missing ${locale} hreflang`);
  }
  check(block.includes('hreflang="x-default"'), `${loc}: missing x-default hreflang`);
}

for (const result of [ai, llmsFull]) {
  check(result.response.status === 410, "ai.txt and llms-full.txt must return 410");
  check((result.response.headers.get("x-robots-tag") ?? "").includes("noindex"), "410 AI files need X-Robots-Tag: noindex");
}
check(llms.response.ok, "llms.txt must return 200");
check((llms.response.headers.get("x-robots-tag") ?? "").includes("noindex"), "llms.txt needs X-Robots-Tag: noindex");
check(!/\b(?:rating|review count|zero excess|free delivery)\b/i.test(llms.body), "llms.txt contains an unverified commercial claim");

const localizedHomes = await Promise.all(LOCALES.map((locale) => text(`/${locale}`)));
localizedHomes.forEach(({ response, body }, index) => {
  const locale = LOCALES[index];
  check(response.ok, `/${locale} must return 200`);
  check(new RegExp(`<html[^>]+lang="${locale}"`).test(body), `/${locale} has the wrong server-rendered html lang`);
});

const root = await request("/");
check([307, 308].includes(root.status), "/ must redirect through the locale proxy");

for (const slug of [
  "atv-vs-buggy-vs-car",
  "best-car-rental-naxos-reviews-comparison",
  "idp-greece-rules",
  "new-greek-traffic-code-2026",
  "naxos-car-rental-without-credit-card-insurance",
  "rent-a-car-naxos-port-vs-airport-pickup-guide",
]) {
  const response = await request(`/el/guides/${slug}`);
  check([307, 308].includes(response.status), `/el/guides/${slug} must be a permanent redirect`);
  check((response.headers.get("location") ?? "").startsWith("/el/"), `/el/guides/${slug} must preserve the locale`);
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
for (let index = 0; index < pageResults.length; index += 1) {
  const { response, body } = pageResults[index];
  const path = sitemapPaths[index];
  check(response.ok, `${path}: sitemap URL returned ${response.status}`);
  check(!/noindex/i.test(body.match(/<meta[^>]+name="robots"[^>]*>/i)?.[0] ?? ""), `${path}: sitemap URL is noindex`);
  check(!/("aggregateRating"|"availability":"https:\/\/schema\.org\/InStock"|"@type":"SearchAction")/.test(body), `${path}: JSON-LD contains an unsupported claim`);

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

const retiredFleetPath = /\/fleet\/(?:scooters?|atv|quad|bugg(?:y|ies)|motorbikes?)(?:\/|$)/i;
for (const path of internalPaths) {
  check(!retiredFleetPath.test(path), `${path}: internal link points to retired inventory`);
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
