import type { MetadataRoute } from "next";
import { LOCALES, SITE, localePath, type Locale } from "@/lib/site";
import { VEHICLES } from "@/content/fleet";
import { LOCATIONS } from "@/content/locations";
import { GUIDES } from "@/content/guides";

function localizedEntry(
  locale: Locale,
  path: string,
  priority: number,
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"],
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
    changeFrequency,
    priority,
    alternates: { languages },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const items: MetadataRoute.Sitemap = [];
  const STATIC_PATHS = [
    "",
    "fleet",
    "fleet/cars",
    "locations",
    "naxos",
    "naxos/beaches",
    "pricing",
    "insurance",
    "faq",
    "guides",
    "about",
    "contact",
    "terms",
    "book",
    "reviews",
    "cancellation",
    "privacy",
    "gdpr",
    "cookies",
  ];

  for (const locale of LOCALES) {
    for (const path of STATIC_PATHS) {
      items.push(localizedEntry(locale, path, path === "" ? 1 : 0.85, "weekly"));
    }
  }

  for (const locale of LOCALES) {
    for (const vehicle of VEHICLES) {
      items.push(localizedEntry(locale, `fleet/${vehicle.category}/${vehicle.slug}`, 0.85, "weekly"));
    }
  }

  for (const l of LOCATIONS) {
    const isMajorHub = ["airport-pickup-jnx", "port-pickup", "naxos-town"].includes(l.slug);
    for (const locale of LOCALES) {
      items.push(localizedEntry(locale, `locations/${l.slug}`, isMajorHub ? 0.88 : 0.75, "weekly"));
    }
  }

  for (const g of GUIDES) {
    const isPillar = [
      "do-you-need-a-car-in-naxos",
      "naxos-rent-a-car-prices-cost-breakdown",
      "naxos-car-rental-without-credit-card-insurance",
      "rent-a-car-naxos-port-vs-airport-pickup-guide",
      "best-car-rental-naxos-reviews-comparison",
    ].includes(g.slug);
    for (const locale of LOCALES) {
      items.push(
        localizedEntry(locale, `guides/${g.slug}`, isPillar ? 0.9 : 0.75, "weekly", g.updatedAt),
      );
    }
  }

  for (const txt of ["llms.txt", "llms-full.txt", "ai.txt"]) {
    items.push({
      url: `${SITE.domain}/${txt}`,
      changeFrequency: "weekly",
      priority: 0.5,
    });
  }

  return items;
}
