import type { NextConfig } from "next";
import createMDX from "@next/mdx";
const withMDX = createMDX({
  options: {
    remarkPlugins: [
      "remark-gfm",
      "remark-frontmatter",
      ["remark-mdx-frontmatter", { name: "frontmatter" }],
    ],
  },
});

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  // No guide redirects. Every guide here used to be 301'd into an unrelated page
  // (the reviews comparison went to /about), which threw away ~65 clicks and
  // ~4,600 impressions a quarter of already-earned ranking. They are live pages
  // again. Locale-less paths are handled by the accept-language proxy in
  // src/proxy.ts, so they do not need static redirect rules either.
  //
  // The one redirect that is genuinely topic-equivalent: the airport location
  // slug. GSC, the URL master plan and both llms files all address it as
  // /locations/airport-pickup, so the route moved to match and the old slug
  // points at its exact counterpart rather than at a hub.
  async redirects() {
    return [
      {
        source: "/:locale(en|el|it|fr|de)/locations/airport-pickup-jnx",
        destination: "/:locale/locations/airport-pickup",
        permanent: true,
      },
      {
        source: "/locations/airport-pickup-jnx",
        destination: "/en/locations/airport-pickup",
        permanent: true,
      },
      // The single /sitemap.xml is now four group sitemaps behind an index.
      // That URL is the one currently submitted in Search Console, so it keeps
      // resolving — Google follows sitemap redirects — rather than 404ing and
      // taking 345 URLs of reported coverage with it.
      {
        source: "/sitemap.xml",
        destination: "/sitemap-index.xml",
        permanent: true,
      },
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "media.kosmikbooker.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
};

export default withMDX(nextConfig);
