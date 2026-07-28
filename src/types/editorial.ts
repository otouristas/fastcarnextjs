import type { Locale } from "@/lib/site";

export type PublicationStatus = "draft" | "in-review" | "published" | "retired";
export type FactVerificationStatus = "verified" | "owner-review-required" | "retired";
export type EditorialContentType = "guide" | "commercial" | "location" | "vehicle-collection";
export type VehicleCollectionSlug = "automatic" | "family-7-seater" | "suv-4x4";

export interface SourceReference {
  label: string;
  url: string;
  accessedAt: string;
  authority: "owner" | "official" | "first-party" | "search-console";
}

export interface EditorialFrontmatter {
  slug: string;
  locale: Locale;
  contentType: EditorialContentType;
  status: PublicationStatus;
  translationOf: string;
  title: string;
  description: string;
  author: string;
  reviewer: string;
  approvedAt?: string;
  publishedAt?: string;
  updatedAt?: string;
  hero?: string;
  sourceRefs: SourceReference[];
}

export interface VerifiedFact<T> {
  value: T | null;
  status: FactVerificationStatus;
  sources: SourceReference[];
  reviewedBy?: string;
  reviewedAt?: string;
}

export interface BusinessFacts {
  identity: {
    brand: VerifiedFact<string>;
    legalName: VerifiedFact<string>;
    canonicalDomain: VerifiedFact<string>;
    serviceType: VerifiedFact<"car-rental">;
  };
  contact: {
    bookingUrl: VerifiedFact<string>;
    phone: VerifiedFact<string>;
    secondaryPhone: VerifiedFact<string>;
    whatsapp: VerifiedFact<string>;
    email: VerifiedFact<string>;
    facebook: VerifiedFact<string>;
    instagram: VerifiedFact<string>;
    googleBusinessProfile: VerifiedFact<string>;
  };
  operations: {
    owners: VerifiedFact<string[]>;
    founded: VerifiedFact<string>;
    address: VerifiedFact<{
      street: string;
      locality: string;
      region: string;
      postalCode: string;
      country: string;
    }>;
    geo: VerifiedFact<{ lat: number; lng: number }>;
    hours: VerifiedFact<{ open: string; close: string; days: string[]; season?: string }>;
    deliveryAreas: VerifiedFact<string[]>;
  };
  reputation: {
    rating: VerifiedFact<{ value: number; count: number; source: "Google" }>;
  };
  policies: {
    delivery: VerifiedFact<string>;
    pricing: VerifiedFact<string>;
    inclusions: VerifiedFact<string[]>;
    deposits: VerifiedFact<string>;
    insurance: VerifiedFact<string>;
    cancellation: VerifiedFact<string>;
    driverRequirements: VerifiedFact<string>;
    ferry: VerifiedFact<string>;
  };
  retiredInventory: VerifiedFact<Array<"scooters" | "motorbikes" | "atvs" | "buggies">>;
}
