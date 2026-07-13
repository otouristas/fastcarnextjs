import type { MetadataRoute } from "next";
import { headers } from "next/headers";
import { LOCALES, localePath } from "@/lib/site";
import { VEHICLES } from "@/content/fleet";
import { LOCATIONS } from "@/content/locations";
import { GUIDES } from "@/content/guides";

export const dynamic = "force-dynamic";

function entry(path: string, priority: number, changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"], domain: string): MetadataRoute.Sitemap[number] {
  const languages: Record<string, string> = {};
  for (const l of LOCALES) {
    languages[l] = `${domain}${localePath(l, path)}`;
  }
  languages["x-default"] = `${domain}${localePath("en", path)}`;
  return {
    url: `${domain}${localePath("en", path)}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
    alternates: { languages },
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const headersList = await headers();
  const host = headersList.get("host") || "naxos-carrentals.com";
  const proto = headersList.get("x-forwarded-proto") || "https";
  const domain = `${proto}://${host}`;

  const items: MetadataRoute.Sitemap = [];
  const STATIC_PATHS = [
    "",
    "fleet",
    "fleet/cars",
    "locations",
    "pricing",
    "insurance",
    "faq",
    "guides",
    "about",
    "contact",
    "terms",
    "book"
  ];

  for (const p of STATIC_PATHS) items.push(entry(p, p === "" ? 1.0 : 0.85, "weekly", domain));
  for (const v of VEHICLES) items.push(entry(`fleet/${v.category}/${v.slug}`, 0.85, "weekly", domain));
  for (const l of LOCATIONS) {
    const isMajorHub = ["airport-pickup-jnx", "port-pickup", "naxos-town"].includes(l.slug);
    items.push(entry(`locations/${l.slug}`, isMajorHub ? 0.88 : 0.75, "weekly", domain));
  }
  for (const g of GUIDES) {
    const isPillar = [
      "do-you-need-a-car-in-naxos",
      "naxos-rent-a-car-prices-cost-breakdown",
      "naxos-car-rental-without-credit-card-insurance",
      "rent-a-car-naxos-port-vs-airport-pickup-guide",
      "best-car-rental-naxos-reviews-comparison",
    ].includes(g.slug);
    items.push(entry(`guides/${g.slug}`, isPillar ? 0.90 : 0.75, "weekly", domain));
  }

  // Add root AI & LLM endpoints for search engine and AI crawler discovery
  for (const txt of ["llms.txt", "llms-full.txt", "ai.txt"]) {
    items.push({
      url: `${domain}/${txt}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    });
  }

  return items;
}
