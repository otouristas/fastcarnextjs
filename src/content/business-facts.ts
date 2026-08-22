import type { BusinessFacts, SourceReference, VerifiedFact } from "@/types/editorial";

const auditedAt = "2026-07-28";
/** Owner sign-off on the operational, pricing and reputation facts below. */
const ownerReviewedAt = "2026-08-22";

const firstParty = (label: string, url: string): SourceReference => ({
  label,
  url,
  accessedAt: auditedAt,
  authority: "first-party",
});

const owner = (label: string, url: string): SourceReference => ({
  label,
  url,
  accessedAt: ownerReviewedAt,
  authority: "owner",
});

const verified = <T>(value: T, ...sources: SourceReference[]): VerifiedFact<T> => ({
  value,
  status: "verified",
  sources,
  reviewedBy: "Repository migration audit",
  reviewedAt: auditedAt,
});

/**
 * Facts confirmed by the business owner rather than inferred from the repository.
 * Anything published as schema (address, geo, hours, aggregateRating, Offer price)
 * must go through here — fabricated structured data is a policy violation.
 */
const ownerVerified = <T>(value: T, ...sources: SourceReference[]): VerifiedFact<T> => ({
  value,
  status: "verified",
  sources,
  reviewedBy: "Owner review — Fast Motor Rental Naxos",
  reviewedAt: ownerReviewedAt,
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
    legalName: ownerVerified(
      "Fast Motor Rental Naxos",
      owner("Owner confirmation", "https://naxos-carrentals.com/en/about"),
    ),
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
    secondaryPhone: ownerVerified(
      "+306948820702",
      owner("Contact page", "https://naxos-carrentals.com/en/contact"),
    ),
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
    owners: ownerVerified(
      ["Marios", "Ria"],
      owner("Owner attestation", "https://naxos-carrentals.com/en/about"),
    ),
    founded: ownerVerified(
      "2018",
      owner("Owner attestation", "https://naxos-carrentals.com/en/about"),
    ),
    address: ownerVerified(
      {
        street: "Chora",
        locality: "Naxos",
        region: "South Aegean",
        postalCode: "84300",
        country: "GR",
      },
      owner("Owner-confirmed NAP", "https://naxos-carrentals.com/en/contact"),
    ),
    geo: ownerVerified(
      { lat: 37.1036, lng: 25.3771 },
      owner("Owner-confirmed map pin", "https://naxos-carrentals.com/en/contact"),
    ),
    hours: ownerVerified(
      {
        open: "08:00",
        close: "22:00",
        days: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
        season: "May–October",
      },
      owner("Owner-approved operating calendar", "https://naxos-carrentals.com/en/contact"),
    ),
    deliveryAreas: ownerVerified(
      ["Naxos Airport", "Naxos Port", "Naxos Town", "Agios Prokopios", "Agia Anna", "Plaka", "Stelida", "Mikri Vigla"],
      owner("Owner-confirmed delivery policy", "https://naxos-carrentals.com/en/locations"),
    ),
  },
  reputation: {
    // Emitted as schema.org AggregateRating on the business entity. These two
    // numbers must match the live Google Business Profile exactly — see
    // docs/seo/business-proof-pack.md. Never estimate them.
    rating: ownerVerified(
      { value: 4.9, count: 187, source: "Google" },
      owner("Google Business Profile", "https://www.google.com/maps"),
    ),
  },
  policies: {
    delivery: ownerVerified(
      "Free meet-and-greet delivery and collection at Naxos Island National Airport (JNX), Naxos ferry port, and hotels across the island. No location surcharge.",
      owner("Owner-confirmed delivery policy", "https://naxos-carrentals.com/en/locations"),
    ),
    pricing: ownerVerified(
      "Shoulder-season rates from €30/day and high-season rates from €45/day, by vehicle. Weekly rates are discounted. All rates include VAT and Greek road taxes.",
      owner("Current rate table", "https://naxos-carrentals.com/en/pricing"),
    ),
    inclusions: ownerVerified(
      [
        "Unlimited kilometres",
        "Basic CDW collision damage waiver",
        "Theft protection (TPI)",
        "Third-party liability",
        "24/7 roadside assistance",
        "Free second driver",
        "Free baby seat or booster",
        "VAT and Greek road taxes",
      ],
      owner("Current rate table", "https://naxos-carrentals.com/en/pricing"),
    ),
    deposits: ownerVerified(
      "Basic CDW: €800 deposit. Full CDW: €300 deposit. Zero Excess: €100 deposit. Debit cards accepted.",
      owner("Current rental contract", "https://naxos-carrentals.com/en/insurance"),
    ),
    insurance: ownerVerified(
      "Three levels: Basic CDW (included, €600 excess), Full CDW (€150 excess, adds tyres and windscreen), Zero Excess (€0 excess, adds undercarriage and roadside replacement). Never covered: driving under the influence, driving without a valid licence or required IDP, off-road driving in a non-4×4, or taking the vehicle on a ferry without written permission.",
      owner("Current policy wording", "https://naxos-carrentals.com/en/insurance"),
    ),
    cancellation: ownerVerified(
      "Free cancellation up to 48 hours before pickup. No prepayment required to reserve.",
      owner("Current customer contract", "https://naxos-carrentals.com/en/cancellation"),
    ),
    driverRequirements: ownerVerified(
      "Minimum age 23 with a licence held for at least one year. Non-EU licence holders must carry an International Driving Permit alongside their national licence.",
      owner("Current rental contract", "https://naxos-carrentals.com/en/terms"),
    ),
    ferry: ownerVerified(
      "Taking a rental vehicle on a ferry requires written permission in advance. Without it, insurance cover is void for the whole journey.",
      owner("Current rental contract", "https://naxos-carrentals.com/en/terms"),
    ),
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
