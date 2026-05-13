import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE.brand,
    short_name: SITE.shortBrand,
    description: SITE.tagline.en,
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#ff4400",
    icons: [
      { src: SITE.logo, sizes: "any", type: "image/png", purpose: "any" },
    ],
  };
}
