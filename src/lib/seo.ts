import type { Metadata } from "next";
import { SITE, absoluteUrl, type Locale, LOCALES } from "./site";
import { alternates as buildAlternates } from "./schema";
import { SEO_COPY } from "./seoCopy";

const OG_LOCALE: Record<Locale, string> = {
  en: "en_GB",
  el: "el_GR",
  it: "it_IT",
  fr: "fr_FR",
  de: "de_DE",
};

export interface SeoInput {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  image?: string;
  keywords?: string[];
  type?: "website" | "article" | "product";
  publishedTime?: string;
  modifiedTime?: string;
  noindex?: boolean;
}

function clamp(text: string, max: number): string {
  if (text.length <= max) return text;
  return text.slice(0, max - 1).trimEnd() + "…";
}

/**
 * Routes with a hand-made OG image in /public/og. Everything else falls through
 * to the dynamic generator: the previous code assumed a file existed for every
 * path, so every guide, vehicle, location and collection URL pointed at a 404
 * and shared as a broken card on social and in Discover.
 */
const PRERENDERED_OG = new Set([
  "home",
  "about",
  "book",
  "contact",
  "faq",
  "fleet",
  "fleet-cars",
  "guides",
  "insurance",
  "locations",
  "pricing",
  "terms",
]);

export function buildMetadata(input: SeoInput): Metadata {
  const url = absoluteUrl(input.locale, input.path);

  const cleanPath = input.path.replace(/^\/+|\/+$/g, "");
  const ogFilename = cleanPath ? cleanPath.replace(/\//g, "-") : "home";
  const image =
    input.image ??
    (PRERENDERED_OG.has(ogFilename)
      ? `${SITE.domain}/og/${ogFilename}.png`
      : `${SITE.domain}/api/og?title=${encodeURIComponent(input.title)}`);

  const rawTitle = input.title.includes(SITE.brand) ? input.title : `${input.title} | ${SITE.brand}`;
  const titleFull = clamp(rawTitle, 65);
  const description = clamp(input.description, 160);
  const alternateLocale = LOCALES.filter((l) => l !== input.locale).map((l) => OG_LOCALE[l]);

  const robots = input.noindex
    ? { index: false, follow: true }
    : { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" as const, "max-snippet": -1 } };

  return {
    metadataBase: new URL(SITE.domain),
    title: titleFull,
    description,
    keywords: input.keywords,
    alternates: {
      canonical: url,
      languages: buildAlternates(input.path),
    },
    openGraph: {
      type: input.type === "article" ? "article" : "website",
      url,
      siteName: SITE.brand,
      title: titleFull,
      description,
      locale: OG_LOCALE[input.locale],
      alternateLocale,
      images: [{ url: image, width: 1200, height: 630, alt: input.title }],
      publishedTime: input.publishedTime,
      modifiedTime: input.modifiedTime,
    },
    twitter: {
      card: "summary_large_image",
      title: titleFull,
      description,
      images: [image],
    },
    robots,
  };
}

export function seoFor(key: string, locale: Locale, path: string, overrides: Partial<SeoInput> = {}): Metadata {
  const copy = SEO_COPY[key]?.[locale];
  if (!copy) {
    return buildMetadata({ locale, path, title: SITE.brand, description: SITE.tagline[locale], ...overrides });
  }
  return buildMetadata({
    locale,
    path,
    title: copy.title,
    description: copy.description,
    keywords: copy.keywords,
    ...overrides,
  });
}
