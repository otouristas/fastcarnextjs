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
  async redirects() {
    return [
      {
        source: "/:locale/guides/atv-vs-buggy-vs-car",
        destination: "/:locale/guides/do-you-need-a-car-in-naxos",
        permanent: true,
      },
      {
        source: "/:locale/guides/best-car-rental-naxos-reviews-comparison",
        destination: "/:locale/about",
        permanent: true,
      },
      {
        source: "/:locale/guides/idp-greece-rules",
        destination: "/:locale/guides/driving-in-naxos",
        permanent: true,
      },
      {
        source: "/:locale/guides/new-greek-traffic-code-2026",
        destination: "/:locale/guides/driving-in-naxos",
        permanent: true,
      },
      {
        source: "/:locale/guides/naxos-car-rental-without-credit-card-insurance",
        destination: "/:locale/guides/naxos-rent-a-car-prices-cost-breakdown",
        permanent: true,
      },
      {
        source: "/:locale/guides/rent-a-car-naxos-port-vs-airport-pickup-guide",
        destination: "/:locale/guides/naxos-airport-jnx-guide",
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
