import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE.brand,
    short_name: SITE.shortBrand,
    description: SITE.tagline.en,
    start_url: "/",
    display: "standalone",
    background_color: "#f5f0e8",
    theme_color: "#12bceb",
    // Generated from public/logo-final.svg — see scripts/generate-icons.mjs.
    // The previous entry declared type "image/png" for an .svg file and gave
    // Android no maskable variant, so the installed icon was letterboxed.
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icons/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
