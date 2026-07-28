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
