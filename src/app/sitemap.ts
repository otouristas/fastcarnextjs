import type { MetadataRoute } from "next";
import { LOCALES, SITE, localePath, type Locale } from "@/lib/site";
import { VEHICLES } from "@/content/fleet";
import { INDEXABLE_GUIDES } from "@/content/guides";
import { LOCATIONS } from "@/content/locations";
import { NAXOS_GUIDE_ARTICLES } from "@/content/naxos-guide";
import { VEHICLE_COLLECTION_SLUGS } from "@/content/vehicle-collections";

/**
 * Commercial and editorial landing pages. Legal boilerplate (/terms, /privacy,
 * /cookies, /gdpr, /cancellation) and /book stay indexable but are deliberately
 * not advertised: on a DR-0.7 domain that is 30 URLs of crawl budget spent on
 * pages nobody searches for.
 */
const STATIC_PATHS = [
  "",
  "fleet",
  "fleet/cars",
  "fleet/scooters",
  "naxos",
  "naxos/beaches",
  "guides",
  "locations",
  "pricing",
  "insurance",
  "faq",
  "reviews",
  "about",
  "contact",
] as const;

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

export default function sitemap(): MetadataRoute.Sitemap {
  const items: MetadataRoute.Sitemap = [];

  for (const locale of LOCALES) {
    for (const path of STATIC_PATHS) {
      items.push(
        localizedEntry(locale, path, {
          priority: staticPriority(path),
          changeFrequency: path === "" ? "weekly" : "monthly",
        }),
      );
    }

    for (const vehicle of VEHICLES) {
      items.push(
        localizedEntry(locale, `fleet/${vehicle.category}/${vehicle.slug}`, {
          priority: 0.7,
          changeFrequency: "monthly",
        }),
      );
    }

    for (const slug of VEHICLE_COLLECTION_SLUGS) {
      items.push(
        localizedEntry(locale, `fleet/collections/${slug}`, {
          priority: 0.7,
          changeFrequency: "monthly",
        }),
      );
    }

    for (const location of LOCATIONS) {
      items.push(
        localizedEntry(locale, `locations/${location.slug}`, {
          priority: 0.8,
          changeFrequency: "monthly",
        }),
      );
    }

    for (const guide of INDEXABLE_GUIDES) {
      items.push(
        localizedEntry(locale, `guides/${guide.slug}`, {
          lastModified: guide.updatedAt,
          priority: 0.8,
          changeFrequency: "monthly",
        }),
      );
    }

    for (const article of NAXOS_GUIDE_ARTICLES) {
      items.push(
        localizedEntry(locale, `naxos/${article.slug}`, {
          lastModified: article.updatedAt,
          priority: 0.8,
          changeFrequency: "monthly",
        }),
      );
    }
  }

  return items;
}
