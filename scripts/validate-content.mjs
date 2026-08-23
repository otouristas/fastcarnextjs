import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

const ROOT = path.resolve("content/editorial");
const LOCALES = ["en", "el", "it", "fr", "de"];
const REQUIRED = [
  "slug",
  "locale",
  "contentType",
  "status",
  "translationOf",
  "title",
  "description",
  "author",
  "reviewer",
  "sourceRefs",
];
const VALID_STATUS = new Set(["draft", "in-review", "published", "retired"]);
const SKIP = new Set(["_template.mdx"]);
const FORBIDDEN_INVENTORY =
  /\b(?:rent|rental|hire|fleet|available|book)\w*(?:\s+\w+){0,5}\s+(?:scooters?|motorbikes?|atvs?|quads?|bugg(?:y|ies))\b|\b(?:scooters?|motorbikes?|atvs?|quads?|bugg(?:y|ies))(?:\s+\w+){0,5}\s+(?:rent|rental|hire|fleet|available|book)\w*/i;
const UNSUPPORTED_CLAIMS = [
  /\b\d(?:\.\d)?\s*\/\s*5\b/i,
  /\b\d+\+?\s+reviews?\b/i,
  /\bzero excess\b/i,
  /\bfree delivery\b/i,
  /\b(?:instant|under\s+\d+\s+minutes?)\s+(?:reply|response|handover|delivery)\b/i,
];

async function listMdx(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map(async (entry) => {
      const target = path.join(dir, entry.name);
      if (entry.isDirectory()) return listMdx(target);
      return entry.isFile() && entry.name.endsWith(".mdx") && !SKIP.has(entry.name)
        ? [target]
        : [];
    }),
  );
  return nested.flat();
}

const files = await listMdx(ROOT);
const errors = [];
const publishedByTopic = new Map();
const publishedEntries = [];
const uniqueFields = new Map();

for (const file of files) {
  const source = await readFile(file, "utf8");
  const { data, content } = matter(source);
  const rel = path.relative(process.cwd(), file);

  for (const key of REQUIRED) {
    if (data[key] === undefined || data[key] === null || data[key] === "") {
      errors.push(`${rel}: missing frontmatter field "${key}"`);
    }
  }

  if (!LOCALES.includes(data.locale)) errors.push(`${rel}: unsupported locale "${data.locale}"`);
  if (!VALID_STATUS.has(data.status)) errors.push(`${rel}: invalid status "${data.status}"`);
  if (path.basename(file, ".mdx") !== data.locale) {
    errors.push(`${rel}: filename must match locale "${data.locale}.mdx"`);
  }

  if (data.status === "published") {
    if (!data.approvedAt) errors.push(`${rel}: published content requires approvedAt`);
    if (!data.publishedAt) errors.push(`${rel}: published content requires publishedAt`);
    if (content.trim().length < 400) errors.push(`${rel}: published content is too thin`);
    const topic = data.translationOf;
    const locales = publishedByTopic.get(topic) ?? new Set();
    locales.add(data.locale);
    publishedByTopic.set(topic, locales);

    if (!Array.isArray(data.sourceRefs) || data.sourceRefs.length === 0) {
      errors.push(`${rel}: published content requires at least one sourceRef`);
    }
    if (FORBIDDEN_INVENTORY.test(`${data.title}\n${data.description}\n${content}`)) {
      errors.push(`${rel}: published content contains retired vehicle terminology`);
    }
    for (const pattern of UNSUPPORTED_CLAIMS) {
      if (pattern.test(`${data.title}\n${data.description}\n${content}`)) {
        errors.push(`${rel}: published content contains a commercial claim that requires explicit fact-registry approval`);
      }
    }

    for (const field of ["title", "description"]) {
      const normalized = String(data[field]).trim().toLocaleLowerCase(data.locale);
      const key = `${data.locale}:${field}:${normalized}`;
      const previous = uniqueFields.get(key);
      if (previous) errors.push(`${rel}: duplicate ${field} also used by ${previous}`);
      else uniqueFields.set(key, rel);
    }

    publishedEntries.push({ rel, data, content: content.trim() });
  }
}

for (const [topic, locales] of publishedByTopic) {
  const missing = LOCALES.filter((locale) => !locales.has(locale));
  if (missing.length > 0) {
    errors.push(`${topic}: published cluster is missing locales: ${missing.join(", ")}`);
  }
}

for (const entry of publishedEntries.filter((item) => item.data.locale === "el")) {
  const english = publishedEntries.find(
    (item) =>
      item.data.locale === "en" &&
      item.data.translationOf === entry.data.translationOf,
  );
  if (!english) continue;
  if (entry.data.title.trim() === english.data.title.trim()) {
    errors.push(`${entry.rel}: Greek title matches English and appears to be a fallback`);
  }
  if (entry.data.description.trim() === english.data.description.trim()) {
    errors.push(`${entry.rel}: Greek description matches English and appears to be a fallback`);
  }
  if (entry.content === english.content) {
    errors.push(`${entry.rel}: Greek body matches English and appears to be a fallback`);
  }
}

// ---------------------------------------------------------------------------
// Pass 2: the TypeScript content modules.
//
// content/editorial/ is the intended MDX workflow but holds no topics yet, so
// every guard above currently runs over zero files while all shipped content
// lives in src/content/*.ts. These checks cover what actually renders.
// ---------------------------------------------------------------------------

const CONTENT_TS = path.resolve("src/content");

/**
 * The fleet is cars-only. Pages may discuss scooters, ATVs, quads and buggies —
 * /fleet/scooters exists precisely to answer that query — but nothing may imply
 * that *we* rent them. This looks for first-person inventory claims only, not
 * for the words themselves.
 */
const FIRST_PERSON_TWO_WHEELER =
  /\b(?:we|our|us)\b[^.!?]{0,60}\b(?:rent|rents|renting|rental|hire|hires|hiring|fleet|offer|offers|available)\w*[^.!?]{0,40}\b(?:scooters?|mopeds?|motorbikes?|motorcycles?|atvs?|quads?|bugg(?:y|ies))\b|\b(?:scooters?|mopeds?|motorbikes?|motorcycles?|atvs?|quads?|bugg(?:y|ies))\b[^.!?]{0,40}\b(?:from|with)\s+us\b/i;

/** Modules whose Greek must be real Greek, not an ls() fallback to English. */
const STRICT_GREEK = new Set(["scooter-guide.ts"]);

async function listTs(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map(async (entry) => {
      const target = path.join(dir, entry.name);
      if (entry.isDirectory()) return listTs(target);
      return entry.isFile() && entry.name.endsWith(".ts") ? [target] : [];
    }),
  );
  return nested.flat();
}

/**
 * Count ls() calls that pass only an English string. Those fall back to English
 * for every other locale, so the page ships English under lang="el" while still
 * claiming hreflang="el" — a duplicate-content and hreflang mismatch.
 */
function countEnglishOnlyLs(source) {
  // Strip line comments so prose in comments cannot trip the scan.
  const code = source.replace(/^\s*\/\/.*$/gm, "");
  let total = 0;
  let englishOnly = 0;
  for (const match of code.matchAll(/\bls\(/g)) {
    let i = match.index + match[0].length;
    let depth = 1;
    let quote = null;
    let commas = 0;
    while (i < code.length && depth > 0) {
      const ch = code[i];
      if (quote) {
        if (ch === "\\") i++;
        else if (ch === quote) quote = null;
      } else if (ch === '"' || ch === "'" || ch === "`") {
        quote = ch;
      } else if (ch === "(" || ch === "[" || ch === "{") {
        depth++;
      } else if (ch === ")" || ch === "]" || ch === "}") {
        depth--;
      } else if (ch === "," && depth === 1) {
        commas++;
      }
      i++;
    }
    total++;
    if (commas === 0) englishOnly++;
  }
  return { total, englishOnly };
}

const tsFiles = await listTs(CONTENT_TS);
const fallbackWarnings = [];

for (const file of tsFiles) {
  const source = await readFile(file, "utf8");
  const rel = path.relative(process.cwd(), file);
  const base = path.basename(file);

  // Skip the block comment at the top of a module so explanatory prose about
  // why we stopped renting two-wheelers is not read as an inventory claim.
  const prose = source.replace(/\/\*[\s\S]*?\*\//g, "");
  if (FIRST_PERSON_TWO_WHEELER.test(prose)) {
    errors.push(`${rel}: implies the fleet rents two-wheelers or ATVs (cars only)`);
  }

  const { total, englishOnly } = countEnglishOnlyLs(source);
  if (englishOnly === 0) continue;
  if (STRICT_GREEK.has(base)) {
    errors.push(
      `${rel}: ${englishOnly}/${total} ls() entries are English-only, but this module must ship real Greek`,
    );
  } else {
    fallbackWarnings.push(`${rel}: ${englishOnly}/${total} ls() entries fall back to English`);
  }
}

if (errors.length > 0) {
  console.error(`Content validation failed with ${errors.length} issue(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Content validation passed for ${files.length} editorial file(s) and ${tsFiles.length} content module(s).`);

if (fallbackWarnings.length > 0) {
  // Not fatal yet: these pages are live and indexed. Tracked as the Greek
  // quality gate — translate, or drop the hreflang alternate until translated.
  console.warn(`\n${fallbackWarnings.length} module(s) serve English under non-English locales:`);
  for (const warning of fallbackWarnings) console.warn(`- ${warning}`);
}
