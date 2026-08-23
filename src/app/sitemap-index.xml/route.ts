import { SITEMAP_GROUPS, groupLastModified, sitemapUrl } from "@/lib/sitemaps";

/**
 * Sitemap index over the four page groups. Next's file-convention sitemap can
 * split a sitemap but does not emit an index for the split, so this writes one.
 * Submit this URL in Search Console; it is what robots.txt advertises.
 */
export const dynamic = "force-static";

export function GET() {
  const entries = SITEMAP_GROUPS.map((group) => {
    const lastmod = groupLastModified(group);
    return [
      "  <sitemap>",
      `    <loc>${sitemapUrl(group)}</loc>`,
      // Omitted rather than faked: an always-current lastmod is noise that
      // teaches crawlers to stop trusting the field.
      lastmod ? `    <lastmod>${lastmod}</lastmod>` : null,
      "  </sitemap>",
    ]
      .filter(Boolean)
      .join("\n");
  }).join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</sitemapindex>
`;

  return new Response(xml, {
    headers: {
      "content-type": "application/xml; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  });
}
