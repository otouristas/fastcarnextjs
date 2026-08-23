import type { MetadataRoute } from "next";
import { SITEMAP_GROUPS, isSitemapGroup, sitemapForGroup } from "@/lib/sitemaps";

/**
 * Split by page group; see src/lib/sitemaps.ts for why. Next serves each id at
 * /sitemap/{id}.xml, and /sitemap-index.xml lists them.
 */
export async function generateSitemaps() {
  return SITEMAP_GROUPS.map((id) => ({ id }));
}

export default async function sitemap({ id }: { id: Promise<string> }): Promise<MetadataRoute.Sitemap> {
  const group = await id;
  return isSitemapGroup(group) ? sitemapForGroup(group) : [];
}
