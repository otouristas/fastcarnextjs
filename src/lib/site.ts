export const SITE = {
  brand: "Fast Motor Rental Naxos",
  shortBrand: "FMR Naxos",
  legalName: "Fast Motor Rental Naxos",
  tagline: {
    en: "Rent a Car in Naxos  -  free delivery to airport, port & hotel",
    el: "Ενοικίαση Αυτοκινήτου στη Νάξο  -  δωρεάν παράδοση σε αεροδρόμιο, λιμάνι & ξενοδοχείο",
    it: "Noleggio Auto a Naxos  -  consegna gratuita in aeroporto, porto e hotel",
    fr: "Location de Voiture à Naxos  -  livraison gratuite à l'aéroport, au port et à l'hôtel",
    de: "Mietwagen auf Naxos  -  kostenlose Lieferung zu Flughafen, Hafen & Hotel",
  },
  domain: "https://naxos-carrentals.com",
  url: "https://naxos-carrentals.com",
  bookingUrl: "https://fastmotorentalnaxos.cosmicbooker.com",
  logo: "/logo-final.svg",
  ogImage: "/og-default.jpg",
  phones: ["+306948820568", "+306948820702"],
  whatsapp: "306948820568",
  email: "info@fmrnaxos.gr",
  owners: ["Marios", "Ria"],
  founded: "2018",
  // TODO confirm exact coords with owner  -  Chora, Naxos centre as default
  geo: { lat: 37.1036, lng: 25.3771 },
  address: {
    street: "Chora",
    locality: "Naxos",
    region: "South Aegean",
    postalCode: "84300",
    country: "GR",
  },
  // TODO confirm seasonal hours
  hours: { open: "08:00", close: "22:00", days: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"] },
  priceRange: "€15–€150",
  currency: "EUR",
  areaServed: ["Naxos", "Naxos Town", "Chora", "JNX Airport", "Naxos Port"],
  social: {
    facebook: "https://www.facebook.com/fastmotorentalnaxos",
    instagram: "https://www.instagram.com/fastmotorentalnaxos",
    googleMaps: "https://maps.google.com/?q=Fast+Motor+Rental+Naxos",
    tripadvisor: "https://www.tripadvisor.com/",
  },
  rating: { value: 4.9, count: 187 },
  flags: {
    touristasEnabled: true,
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
