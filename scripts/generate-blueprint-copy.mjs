#!/usr/bin/env node
/**
 * Generate src/content/seo-blueprint.ts from the extracted workbook JSON.
 *
 *   node scripts/extract-blueprint.py      # workbook -> docs/seo/blueprint/*.json
 *   node scripts/generate-blueprint-copy.mjs
 *
 * The workbook ships finished, character-counted title/description/H1 copy for
 * English and Greek only. Entries are deliberately partial: a locale the
 * workbook never audited stays undefined so the page falls back to the copy it
 * derives today, rather than shipping machine-shaped metadata in a language
 * nobody reviewed.
 */
import { readFileSync, writeFileSync } from "node:fs";

const BLUEPRINT = "docs/seo/blueprint";
const OUT = "src/content/seo-blueprint.ts";
const ORIGIN = "https://naxos-carrentals.com";

const SHEETS = [
  ["en", `${BLUEPRINT}/09_exact_content_en.json`],
  ["el", `${BLUEPRINT}/10_exact_content_el.json`],
];

/** "https://naxos-carrentals.com/en/fleet/cars" -> "fleet/cars"; homepage -> "" */
function toPath(url, locale) {
  if (!url?.startsWith(ORIGIN)) return null;
  const rest = url.slice(ORIGIN.length).replace(/^\/+|\/+$/g, "");
  if (rest === locale) return "";
  return rest.startsWith(`${locale}/`) ? rest.slice(locale.length + 1) : null;
}

/**
 * Paths whose workbook copy is superseded by a decision taken after the
 * workbook was written. Keep the reason next to the path.
 */
const SKIP = new Map([
  [
    "fleet/scooters",
    // The workbook wrote this row under an "owner decision pending" gate and its
    // title promises "Live Availability". The fleet is cars-only, so that title
    // would advertise a product we do not rent. The page supplies its own.
    "cars-only decision postdates the workbook",
  ],
]);

const entries = new Map();
for (const [locale, file] of SHEETS) {
  const { rows } = JSON.parse(readFileSync(file, "utf8"));
  for (const row of rows) {
    const path = toPath(row.URL, locale);
    if (path === null) continue;
    if (SKIP.has(path)) continue;
    const entry = entries.get(path) ?? { title: {}, description: {}, h1: {} };
    const title = row["SEO title"]?.trim();
    const description = row["Meta description"]?.trim();
    const h1 = row.H1?.trim();
    if (title) entry.title[locale] = title;
    if (description) entry.description[locale] = description;
    if (h1) entry.h1[locale] = h1;
    entries.set(path, entry);
  }
}

const q = (s) => JSON.stringify(s);
const block = (name, map) => {
  const keys = Object.keys(map);
  if (!keys.length) return "";
  return `\n    ${name}: { ${keys.map((k) => `${k}: ${q(map[k])}`).join(", ")} },`;
};

const body = [...entries.entries()]
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([path, e]) => `  ${q(path)}: {${block("title", e.title)}${block("description", e.description)}${block("h1", e.h1)}\n  },`)
  .join("\n");

const file = `// GENERATED FILE — do not edit by hand.
// Source: naxos_carrentals_complete_seo_blueprint_2026-08-22.xlsx
//         (sheets "Exact Content EN" / "Exact Content EL")
// Regenerate: python3 scripts/extract-blueprint.py && node scripts/generate-blueprint-copy.mjs
//
// Titles, descriptions and H1s in the workbook are finished, character-counted
// copy meant to ship verbatim. The workbook's "Publishable body copy" column is
// NOT included here: for guides, locations and vehicles it is an H2 skeleton
// plus editorial instructions, not prose. Read it from docs/seo/blueprint/.
import type { Locale } from "@/lib/site";

/** Partial by design — only locales the workbook actually audited (en, el). */
export type BlueprintText = Partial<Record<Locale, string>>;

export interface BlueprintCopy {
  title?: BlueprintText;
  description?: BlueprintText;
  h1?: BlueprintText;
}

/** Keyed by locale-less path; the homepage is "". */
export const BLUEPRINT_COPY: Record<string, BlueprintCopy> = {
${body}
};

/** Normalises leading/trailing slashes so callers can pass either form. */
export function blueprintCopy(path: string): BlueprintCopy | undefined {
  return BLUEPRINT_COPY[path.replace(/^\\/+|\\/+$/g, "")];
}

/** The workbook title for this path and locale, or undefined to fall back. */
export function blueprintTitle(path: string, locale: Locale): string | undefined {
  return blueprintCopy(path)?.title?.[locale];
}

export function blueprintDescription(path: string, locale: Locale): string | undefined {
  return blueprintCopy(path)?.description?.[locale];
}

export function blueprintH1(path: string, locale: Locale): string | undefined {
  return blueprintCopy(path)?.h1?.[locale];
}
`;

writeFileSync(OUT, file);
console.log(`${OUT}: ${entries.size} paths`);
for (const [path, reason] of SKIP) console.log(`  skipped ${path} — ${reason}`);
