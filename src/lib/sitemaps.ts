import type { MetadataRoute } from "next";
import { LOCALES, SITE, localePath, type Locale } from "@/lib/site";
import { VEHICLES } from "@/content/fleet";
import { INDEXABLE_GUIDES } from "@/content/guides";
import { LOCATIONS } from "@/content/locations";
import { NAXOS_GUIDE_ARTICLES } from "@/content/naxos-guide";
import { VEHICLE_COLLECTION_SLUGS } from "@/content/vehicle-collections";

/**
 * The sitemap is split by page group so Google Search Console reports indexing
 * per group. One 345-URL file tells you coverage dropped; four files tell you
 * which part of the site it dropped in. The split is for diagnostics, not size
 * — Google's per-file limit is 50,000 URLs and we are nowhere near it.
 */
export const SITEMAP_GROUPS = ["core", "fleet", "locations", "guides"] as const;
export type SitemapGroup = (typeof SITEMAP_GROUPS)[number];

export function isSitemapGroup(value: string): value is SitemapGroup {
  return (SITEMAP_GROUPS as readonly string[]).includes(value);
}

/** Public URL of one group's sitemap. */
export function sitemapUrl(group: SitemapGroup): string {
  return `${SITE.domain}/sitemap/${group}.xml`;
}

export const SITEMAP_INDEX_URL = `${SITE.domain}/sitemap-index.xml`;

/**
 * Commercial and trust pages. Legal boilerplate (/terms, /privacy, /cookies,
 * /gdpr, /cancellation) stays indexable but is deliberately not advertised: on
 * a DR-0.7 domain that is 30 URLs of crawl budget spent on pages nobody
 * searches for.
 *
 * /book is included despite being a booking bridge — the blueprint marks it P0
 * in both locales and /el/book already earns 51 impressions at position 20.9,
 * so withholding it from the sitemap withholds a page that is already ranking.
 */
const CORE_PATHS = ["", "pricing", "insurance", "faq", "reviews", "about", "contact", "book"] as const;

/** Money pages outrank editorial, editorial outranks inventory detail. */
function staticPriority(path: string): number {
  if (path === "") return 1;
  if (path === "fleet/cars" || path === "naxos") return 0.9;
  if (path === "fleet" || path === "locations" || path === "pricing") return 0.8;
  if (path === "guides" || path === "naxos/beaches" || path === "fleet/scooters") return 0.8;
  return 0.6;
}

function localizedEntry(
  locale: Locale,
  path: string,
  opts: {
    lastModified?: string;
    priority?: number;
    changeFrequency?: MetadataRoute.Sitemap[number]["changeFrequency"];
  } = {},
): MetadataRoute.Sitemap[number] {
  const languages: Record<string, string> = {};
  for (const l of LOCALES) {
    languages[l] = `${SITE.domain}${localePath(l, path)}`;
  }
  languages["x-default"] = `${SITE.domain}${localePath("en", path)}`;
  return {
    url: `${SITE.domain}${localePath(locale, path)}`,
    lastModified: opts.lastModified,
    changeFrequency: opts.changeFrequency,
    priority: opts.priority,
    alternates: { languages },
  };
}

/** Every locale-less path in a group, with its lastmod where one is meaningful. */
function pathsForGroup(group: SitemapGroup): { path: string; lastModified?: string }[] {
  switch (group) {
    case "core":
      return CORE_PATHS.map((path) => ({ path }));
    case "fleet":
      return [
        { path: "fleet" },
        { path: "fleet/cars" },
        { path: "fleet/scooters" },
        ...VEHICLE_COLLECTION_SLUGS.map((slug) => ({ path: `fleet/collections/${slug}` })),
        ...VEHICLES.map((v) => ({ path: `fleet/${v.category}/${v.slug}` })),
      ];
    case "locations":
      return [
        { path: "locations" },
        ...LOCATIONS.map((l) => ({ path: `locations/${l.slug}` })),
      ];
    case "guides":
      return [
        { path: "guides" },
        { path: "naxos" },
        { path: "naxos/beaches" },
        ...INDEXABLE_GUIDES.map((g) => ({ path: `guides/${g.slug}`, lastModified: g.updatedAt })),
        ...NAXOS_GUIDE_ARTICLES.map((a) => ({ path: `naxos/${a.slug}`, lastModified: a.updatedAt })),
      ];
  }
}

/** One group, every locale, with reciprocal hreflang on each entry. */
export function sitemapForGroup(group: SitemapGroup): MetadataRoute.Sitemap {
  const items: MetadataRoute.Sitemap = [];
  for (const locale of LOCALES) {
    for (const { path, lastModified } of pathsForGroup(group)) {
      items.push(
        localizedEntry(locale, path, {
          lastModified,
          priority: staticPriority(path),
          changeFrequency: path === "" ? "weekly" : "monthly",
        }),
      );
    }
  }
  return items;
}

/**
 * Newest lastmod in a group, for the index. Groups with no dated content report
 * no lastmod at all rather than "now" — an always-fresh timestamp is noise that
 * teaches crawlers to ignore the field.
 */
export function groupLastModified(group: SitemapGroup): string | undefined {
  const dates = pathsForGroup(group)
    .map((p) => p.lastModified)
    .filter((d): d is string => Boolean(d))
    .sort();
  return dates.at(-1);
}
