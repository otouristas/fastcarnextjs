import { buildRobotsTxt, ROBOTS_HEADERS } from "@/lib/seo-parity/robots-parity";

export const dynamic = "force-static";

/** Same group structure as discovercyclades.gr/robots.txt; see robots-parity.ts. */
export function GET() {
  const body = buildRobotsTxt({
    name: "Fast Motor Rental Naxos",
    origin: "https://naxos-carrentals.com",
    disallow: ["/api/"],
    sitemaps: ["https://naxos-carrentals.com/sitemap-index.xml"],
  });
  return new Response(body, { headers: ROBOTS_HEADERS });
}
