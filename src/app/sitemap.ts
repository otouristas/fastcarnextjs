import type { MetadataRoute } from "next";
import { LOCALES, SITE, localePath, type Locale } from "@/lib/site";
import { VEHICLES } from "@/content/fleet";
import { INDEXABLE_GUIDES } from "@/content/guides";
import { VEHICLE_COLLECTION_SLUGS } from "@/content/vehicle-collections";

function localizedEntry(
  locale: Locale,
  path: string,
  lastModified?: string,
): MetadataRoute.Sitemap[number] {
  const languages: Record<string, string> = {};
  for (const l of LOCALES) {
    languages[l] = `${SITE.domain}${localePath(l, path)}`;
  }
  languages["x-default"] = `${SITE.domain}${localePath("en", path)}`;
  return {
    url: `${SITE.domain}${localePath(locale, path)}`,
    lastModified,
    alternates: { languages },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const items: MetadataRoute.Sitemap = [];
  const STATIC_PATHS = [
    "",
    "fleet",
    "fleet/cars",
    "naxos",
    "naxos/beaches",
    "guides",
  ];

  for (const locale of LOCALES) {
    for (const path of STATIC_PATHS) {
      items.push(localizedEntry(locale, path));
    }
  }

  for (const locale of LOCALES) {
    for (const vehicle of VEHICLES) {
      items.push(localizedEntry(locale, `fleet/${vehicle.category}/${vehicle.slug}`));
    }
    for (const slug of VEHICLE_COLLECTION_SLUGS) {
      items.push(localizedEntry(locale, `fleet/collections/${slug}`));
    }
  }

  for (const g of INDEXABLE_GUIDES) {
    for (const locale of LOCALES) {
      items.push(localizedEntry(locale, `guides/${g.slug}`, g.updatedAt));
    }
  }

  return items;
}
