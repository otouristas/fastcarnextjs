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
