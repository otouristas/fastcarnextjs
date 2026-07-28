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

if (errors.length > 0) {
  console.error(`Content validation failed with ${errors.length} issue(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Content validation passed for ${files.length} editorial file(s).`);
