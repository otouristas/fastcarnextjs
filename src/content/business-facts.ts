import type { BusinessFacts, SourceReference, VerifiedFact } from "@/types/editorial";

const auditedAt = "2026-07-28";

const firstParty = (label: string, url: string): SourceReference => ({
  label,
  url,
  accessedAt: auditedAt,
  authority: "first-party",
});

const verified = <T>(value: T, ...sources: SourceReference[]): VerifiedFact<T> => ({
  value,
  status: "verified",
  sources,
  reviewedBy: "Repository migration audit",
  reviewedAt: auditedAt,
});

const pending = <T>(value: T | null = null, ...sources: SourceReference[]): VerifiedFact<T> => ({
  value,
  status: "owner-review-required",
  sources,
});

export const BUSINESS_FACTS: BusinessFacts = {
  identity: {
    brand: verified(
      "Fast Motor Rental Naxos",
      firstParty("Canonical website", "https://naxos-carrentals.com"),
    ),
    legalName: pending("Fast Motor Rental Naxos"),
    canonicalDomain: verified(
      "https://naxos-carrentals.com",
      firstParty("Canonical website", "https://naxos-carrentals.com"),
    ),
    serviceType: verified(
      "car-rental",
      firstParty("Current cars-only fleet", "https://naxos-carrentals.com/en/fleet/cars"),
    ),
  },
  contact: {
    bookingUrl: verified(
      "https://fastmotorentalnaxos.cosmicbooker.com",
      firstParty("Booking engine", "https://fastmotorentalnaxos.cosmicbooker.com"),
    ),
    phone: verified(
      "+306948820568",
      firstParty("Contact page", "https://naxos-carrentals.com/en/contact"),
    ),
    secondaryPhone: pending("+306948820702"),
    whatsapp: verified(
      "306948820568",
      firstParty("Contact page", "https://naxos-carrentals.com/en/contact"),
    ),
    email: verified(
      "info@fmrnaxos.gr",
      firstParty("Contact page", "https://naxos-carrentals.com/en/contact"),
    ),
    facebook: verified(
      "https://www.facebook.com/fastmotorentalnaxos",
      firstParty("Published social profile", "https://www.facebook.com/fastmotorentalnaxos"),
    ),
    instagram: verified(
      "https://www.instagram.com/fastmotorentalnaxos",
      firstParty("Published social profile", "https://www.instagram.com/fastmotorentalnaxos"),
    ),
    googleBusinessProfile: pending(),
  },
  operations: {
    owners: pending(["Marios", "Ria"]),
    founded: pending("2018"),
    address: pending({
      street: "Chora",
      locality: "Naxos",
      region: "South Aegean",
      postalCode: "84300",
      country: "GR",
    }),
    geo: pending({ lat: 37.1036, lng: 25.3771 }),
    hours: pending({
      open: "08:00",
      close: "22:00",
      days: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
      season: "May–October",
    }),
    deliveryAreas: pending(["Naxos Airport", "Naxos Port", "Naxos Town"]),
  },
  reputation: {
    rating: pending({ value: 4.9, count: 187, source: "Google" }),
  },
  policies: {
    delivery: pending(),
    pricing: pending(),
    inclusions: pending(),
    deposits: pending(),
    insurance: pending(),
    cancellation: pending(),
    driverRequirements: pending(),
    ferry: pending(),
  },
  retiredInventory: {
    value: ["scooters", "motorbikes", "atvs", "buggies"],
    status: "retired",
    sources: [
      firstParty("Cars-only product decision", "https://naxos-carrentals.com/en/fleet/cars"),
    ],
    reviewedBy: "P0 SEO/CRO foundation",
    reviewedAt: auditedAt,
  },
};

export function verifiedValue<T>(fact: VerifiedFact<T>): T | undefined {
  return fact.status === "verified" && fact.value !== null ? fact.value : undefined;
}
