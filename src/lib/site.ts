export const SITE = {
  brand: "Fast Motor Rental Naxos",
  shortBrand: "FMR Naxos",
  legalName: "Fast Motor Rental Naxos",
  tagline: {
    en: "Car rental in Naxos, Greece",
    el: "Ενοικίαση αυτοκινήτου στη Νάξο",
    it: "Noleggio auto a Naxos",
    fr: "Location de voiture à Naxos",
    de: "Mietwagen auf Naxos",
  },
  domain: "https://naxos-carrentals.com",
  url: "https://naxos-carrentals.com",
  bookingUrl: "https://fastmotorentalnaxos.cosmicbooker.com",
  logo: "/logo-final.svg",
  favicon: "/favicon.ico",
  ogImage: "/og-default.jpg",
  phones: ["+306948820568"],
  whatsapp: "306948820568",
  email: "info@fmrnaxos.gr",
  // Presentation mirror of the verified facts in src/content/business-facts.ts,
  // which holds the source references, reviewer and review date. Change a value
  // there first, then here — never the other way round.
  owners: ["Marios", "Ria"] as readonly string[],
  founded: "2018",
  geo: { lat: 37.1036, lng: 25.3771 },
  address: {
    street: "Chora",
    locality: "Naxos",
    region: "South Aegean",
    postalCode: "84300",
    country: "GR",
  },
  hours: {
    open: "08:00",
    close: "22:00",
    days: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"] as readonly string[],
    season: "May–October",
  },
  priceRange: "€€",
  currency: "EUR",
  paymentAccepted: "Cash, Credit Card, Debit Card",
  areaServed: [
    "Naxos Airport",
    "Naxos Port",
    "Naxos Town",
    "Agios Prokopios",
    "Agia Anna",
    "Plaka",
    "Stelida",
    "Mikri Vigla",
  ] as readonly string[],
  social: {
    facebook: "https://www.facebook.com/fastmotorentalnaxos",
    instagram: "https://www.instagram.com/fastmotorentalnaxos",
  },
  // Mirrors BUSINESS_FACTS.reputation.rating; see reviews-google.json.
  rating: { value: "4.9", count: "222" },
  flags: {
    touristasEnabled: false,
    cookieBannerEnabled: true,
  },
} as const;

export function viberUrl(): string {
  return `viber://chat/?number=%2B${SITE.whatsapp}`;
}

export const LOCALES = ["en", "el", "it", "fr", "de"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

export const LOCALE_META: Record<Locale, { name: string; flag: string; htmlLang: string }> = {
  en: { name: "English", flag: "🇬🇧", htmlLang: "en" },
  el: { name: "Ελληνικά", flag: "🇬🇷", htmlLang: "el" },
  it: { name: "Italiano", flag: "🇮🇹", htmlLang: "it" },
  fr: { name: "Français", flag: "🇫🇷", htmlLang: "fr" },
  de: { name: "Deutsch", flag: "🇩🇪", htmlLang: "de" },
};

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

export function localePath(locale: Locale, path: string = ""): string {
  const clean = path.replace(/^\/+/, "");
  return clean ? `/${locale}/${clean}` : `/${locale}`;
}

export function absoluteUrl(locale: Locale, path: string = ""): string {
  return `${SITE.domain}${localePath(locale, path)}`;
}

export function absoluteAssetUrl(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  return `${SITE.domain}${path.startsWith("/") ? path : `/${path}`}`;
}

export function swapLocalePath(path: string, newLocale: Locale): string {
  const parts = path.split("/").filter(Boolean);
  if (parts.length === 0) return `/${newLocale}`;
  if ((LOCALES as readonly string[]).includes(parts[0])) {
    parts[0] = newLocale;
  } else {
    parts.unshift(newLocale);
  }
  return `/${parts.join("/")}`;
}
