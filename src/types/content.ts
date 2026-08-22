import type { Locale } from "@/lib/site";

export type LocalizedString = Record<Locale, string>;

export type VehicleCategory = "cars";

export interface Vehicle {
  slug: string;
  category: VehicleCategory;
  brand: string;
  model: string;
  year: number;
  name: LocalizedString;
  tagline: LocalizedString;
  description: LocalizedString;
  image: string;
  gallery?: string[];
  seats?: number;
  doors?: number;
  transmission?: "automatic" | "manual";
  fuelType?: "gasoline" | "diesel" | "hybrid" | "electric";
  engineCC?: number;
  features: LocalizedString[];
  bestFor: LocalizedString[];
  priceShoulder: number;
  priceHigh: number;
  priceWeekly: number;
  fourByFour?: boolean;
}

export interface Location {
  slug: string;
  type: "airport" | "port" | "village" | "beach";
  name: LocalizedString;
  shortName: string;
  hero: LocalizedString;
  body: LocalizedString;
  geo: { lat: number; lng: number };
  distanceFromChoraKm: number;
  pickupTimeMinutes: number;
  highlights: LocalizedString[];
  nearbyVehicles: VehicleCategory[];
}

export interface Faq {
  slug: string;
  category: "booking" | "documents" | "vehicles" | "insurance" | "delivery" | "driving";
  question: LocalizedString;
  answer: LocalizedString;
}

export interface GuideSection {
  heading: LocalizedString;
  body: LocalizedString;
}

export interface Guide {
  slug: string;
  title: LocalizedString;
  excerpt: LocalizedString;
  hero: string;
  publishedAt: string;
  updatedAt: string;
  readingTime: number;
  sections: GuideSection[];
  faqRefs?: string[];
  related: string[];
}

export interface Review {
  author: string;
  rating: number;
  date: string;
  body: LocalizedString;
  source: "Google" | "Tripadvisor" | "direct";
}

/** One fan-out question and its answer, in every locale. */
export interface FanoutQa {
  q: LocalizedString;
  a: LocalizedString;
}

export interface ComparisonTable {
  caption: LocalizedString;
  columns: LocalizedString[];
  rows: LocalizedString[][];
}

/**
 * An article in the /naxos island guide.
 *
 * Differs from `Guide` in three ways that matter for answer engines:
 * `answer` is the 40–60 word direct response rendered immediately under the H1
 * and marked `speakable`; `faq` carries the query fan-out set that is rendered as
 * real on-page content *and* emitted as FAQPage schema; and `table` supports the
 * comparison layouts that win table snippets.
 */
export interface NaxosGuideArticle {
  slug: string;
  /** Groups articles on the hub and fills schema.org articleSection. */
  cluster: "plan" | "explore" | "arrive" | "eat-stay";
  title: LocalizedString;
  excerpt: LocalizedString;
  answer: LocalizedString;
  hero: string;
  publishedAt: string;
  updatedAt: string;
  readingTime: number;
  keywords: string[];
  sections: GuideSection[];
  table?: ComparisonTable;
  faq: FanoutQa[];
  related: string[];
  /** Vehicle slugs surfaced in the conversion rail (seo-os Law 1). */
  vehiclePicks?: string[];
  /** Location slugs surfaced in the cross-vertical rail (seo-os Law 2). */
  locationPicks?: string[];
}
