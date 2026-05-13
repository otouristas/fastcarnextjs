import type { MetadataRoute } from "next";
import { LOCALES, absoluteUrl } from "@/lib/site";
import { VEHICLES } from "@/content/fleet";
import { LOCATIONS } from "@/content/locations";
import { GUIDES } from "@/content/guides";

const STATIC_PATHS = ["", "fleet", "fleet/cars", "fleet/scooters", "fleet/atv-quad", "fleet/buggy", "fleet/motorbike", "locations", "pricing", "insurance", "faq", "guides", "about", "contact", "terms", "book"];

function entry(path: string, priority: number, changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]): MetadataRoute.Sitemap[number] {
  const languages: Record<string, string> = {};
  for (const l of LOCALES) languages[l] = absoluteUrl(l, path);
  languages["x-default"] = absoluteUrl("en", path);
  return {
    url: absoluteUrl("en", path),
    lastModified: new Date(),
    changeFrequency,
    priority,
    alternates: { languages },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const items: MetadataRoute.Sitemap = [];
  for (const p of STATIC_PATHS) items.push(entry(p, p === "" ? 1.0 : 0.8, "weekly"));
  for (const v of VEHICLES) items.push(entry(`fleet/${v.category}/${v.slug}`, 0.85, "weekly"));
  for (const l of LOCATIONS) items.push(entry(`locations/${l.slug}`, 0.7, "monthly"));
  for (const g of GUIDES) items.push(entry(`guides/${g.slug}`, 0.65, "monthly"));
  return items;
}
