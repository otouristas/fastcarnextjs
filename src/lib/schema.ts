import { SITE, type Locale, absoluteAssetUrl, absoluteUrl, LOCALES } from "./site";
import { BUSINESS_FACTS, verifiedValue } from "@/content/business-facts";
import type { Vehicle, Location, Faq, Guide } from "@/types/content";

const ORG_ID = `${SITE.domain}#organization`;
const LB_ID = `${SITE.domain}#localbusiness`;
const WEBSITE_ID = `${SITE.domain}#website`;

/** schema.org wants full day names; the facts registry stores two-letter codes. */
const DAY_NAMES: Record<string, string> = {
  Mo: "Monday",
  Tu: "Tuesday",
  We: "Wednesday",
  Th: "Thursday",
  Fr: "Friday",
  Sa: "Saturday",
  Su: "Sunday",
};

/**
 * Offers quote a price that is only valid for the current season, so they need a
 * `priceValidUntil`. Without one Google warns on the Product; with a date in the
 * past it drops the snippet entirely. End of the current calendar year is the
 * honest horizon for a seasonal rate card.
 */
function priceValidUntil(): string {
  return `${new Date().getUTCFullYear()}-12-31`;
}

export function organizationSchema() {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE.brand,
    legalName: verifiedValue(BUSINESS_FACTS.identity.legalName) ?? SITE.legalName,
    url: SITE.domain,
    logo: absoluteAssetUrl(SITE.logo),
    image: absoluteAssetUrl(SITE.logo),
    email: SITE.email,
    telephone: SITE.phones[0],
    foundingDate: verifiedValue(BUSINESS_FACTS.operations.founded),
    founder: (verifiedValue(BUSINESS_FACTS.operations.owners) ?? []).map((name) => ({
      "@type": "Person",
      name,
    })),
    sameAs: [SITE.social.facebook, SITE.social.instagram],
  };
}

/**
 * The business entity AI engines and the Map Pack read. Every field is gated on a
 * verified fact so an unreviewed value can never reach structured data — but the
 * gate must not be so wide that it emits an empty shell, which is what shipped
 * between commits 847f9a4 and this one.
 */
export function localBusinessSchema(locale: Locale) {
  const address = verifiedValue(BUSINESS_FACTS.operations.address);
  const geo = verifiedValue(BUSINESS_FACTS.operations.geo);
  const hours = verifiedValue(BUSINESS_FACTS.operations.hours);
  const areaServed = verifiedValue(BUSINESS_FACTS.operations.deliveryAreas);
  const rating = verifiedValue(BUSINESS_FACTS.reputation.rating);
  const bookingUrl = verifiedValue(BUSINESS_FACTS.contact.bookingUrl);

  return {
    "@type": ["LocalBusiness", "AutoRental"],
    "@id": LB_ID,
    name: SITE.brand,
    url: absoluteUrl(locale),
    image: absoluteAssetUrl(SITE.logo),
    logo: absoluteAssetUrl(SITE.logo),
    telephone: SITE.phones[0],
    email: SITE.email,
    parentOrganization: { "@id": ORG_ID },
    priceRange: SITE.priceRange,
    currenciesAccepted: SITE.currency,
    paymentAccepted: SITE.paymentAccepted,
    foundingDate: verifiedValue(BUSINESS_FACTS.operations.founded),
    ...(bookingUrl
      ? {
          potentialAction: {
            "@type": "ReserveAction",
            target: {
              "@type": "EntryPoint",
              urlTemplate: bookingUrl,
              actionPlatform: [
                "https://schema.org/DesktopWebPlatform",
                "https://schema.org/MobileWebPlatform",
              ],
            },
            result: { "@type": "Reservation", name: "Car rental reservation" },
          },
        }
      : {}),
    ...(address
      ? {
          address: {
            "@type": "PostalAddress",
            streetAddress: address.street,
            addressLocality: address.locality,
            addressRegion: address.region,
            postalCode: address.postalCode,
            addressCountry: address.country,
          },
        }
      : {}),
    ...(geo
      ? {
          geo: { "@type": "GeoCoordinates", latitude: geo.lat, longitude: geo.lng },
          hasMap: `https://www.google.com/maps/search/?api=1&query=${geo.lat},${geo.lng}`,
        }
      : {}),
    ...(areaServed
      ? { areaServed: areaServed.map((name) => ({ "@type": "Place", name: `${name}, Naxos, Greece` })) }
      : {}),
    ...(hours
      ? {
          openingHoursSpecification: [
            {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: hours.days.map((d) => DAY_NAMES[d] ?? d),
              opens: hours.open,
              closes: hours.close,
            },
          ],
        }
      : {}),
    ...(rating
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: rating.value,
            reviewCount: rating.count,
            bestRating: 5,
            worstRating: 1,
          },
        }
      : {}),
    sameAs: [SITE.social.facebook, SITE.social.instagram],
  };
}

/**
 * A rental car is a Product with a real, quotable Offer. Emitting the Product
 * without the Offer — the previous behaviour — is why Product snippets earned 10
 * impressions in a quarter: Google had no price to show.
 */
export function vehicleSchema(v: Vehicle, locale: Locale) {
  const url = absoluteUrl(locale, `fleet/${v.category}/${v.slug}`);

  return {
    "@type": ["Product", "Car"],
    "@id": url,
    name: v.name[locale],
    description: v.description[locale],
    image: absoluteAssetUrl(v.image),
    url,
    brand: { "@type": "Brand", name: v.brand },
    model: v.model,
    sku: v.slug,
    mpn: `${v.brand}-${v.model}-${v.year}`.replace(/\s+/g, "-").toLowerCase(),
    additionalType: "https://schema.org/Vehicle",
    vehicleConfiguration: v.model,
    vehicleTransmission: v.transmission,
    fuelType: v.fuelType,
    numberOfDoors: v.doors,
    seatingCapacity: v.seats,
    ...(v.engineCC
      ? {
          vehicleEngine: {
            "@type": "EngineSpecification",
            engineDisplacement: {
              "@type": "QuantitativeValue",
              value: v.engineCC,
              unitCode: "CMQ",
            },
          },
        }
      : {}),
    modelDate: v.year,
    // Offer is gated on two conditions, both required by Google's product
    // snippet policy and by the workbook: there must be a visible price on the
    // page, and the vehicle must actually be reservable. Emitting an InStock
    // Offer for a car the booking engine does not carry, or at a price the page
    // never shows, is markup that does not describe the page.
    ...(v.priceShoulder != null && v.bookable !== false
      ? {
          offers: {
            "@type": "Offer",
            "@id": `${url}#offer`,
            url,
            price: v.priceShoulder,
            priceCurrency: SITE.currency,
            priceValidUntil: priceValidUntil(),
            availability: "https://schema.org/InStock",
            itemCondition: "https://schema.org/UsedCondition",
            seller: { "@id": LB_ID },
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              price: v.priceShoulder,
              priceCurrency: SITE.currency,
              unitCode: "DAY",
              referenceQuantity: { "@type": "QuantitativeValue", value: 1, unitCode: "DAY" },
            },
          },
        }
      : {}),
    // No aggregateRating here on purpose. BUSINESS_FACTS.reputation.rating is a
    // rating of the company, not of this vehicle; attaching it to a Product
    // claims 222 people rated this specific car. It stays on the LocalBusiness
    // entity, where it is true and where the reviews page shows it.
  };
}

export function faqPageSchema(faqs: Faq[], locale: Locale) {
  if (faqs.length === 0) return null;
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question[locale],
      acceptedAnswer: { "@type": "Answer", text: f.answer[locale] },
    })),
  };
}

/** Fan-out question sets that live outside the typed FAQ registry. */
export function qaPageSchema(pairs: { q: string; a: string }[]) {
  if (pairs.length === 0) return null;
  return {
    "@type": "FAQPage",
    mainEntity: pairs.map((p) => ({
      "@type": "Question",
      name: p.q,
      acceptedAnswer: { "@type": "Answer", text: p.a },
    })),
  };
}

export function articleSchema(
  g: Guide,
  locale: Locale,
  opts: { path?: string; section?: string } = {},
) {
  const url = absoluteUrl(locale, opts.path ?? `guides/${g.slug}`);
  const wordCount = g.sections.reduce(
    (n, s) => n + s.body[locale].split(/\s+/).filter(Boolean).length,
    0,
  );
  return {
    "@type": "Article",
    "@id": url,
    headline: g.title[locale],
    description: g.excerpt[locale],
    image: absoluteAssetUrl(g.hero),
    datePublished: g.publishedAt,
    dateModified: g.updatedAt,
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    inLanguage: locale,
    wordCount,
    timeRequired: `PT${g.readingTime}M`,
    articleSection: opts.section ?? "Naxos travel",
    isPartOf: { "@id": WEBSITE_ID },
    mainEntityOfPage: url,
    about: { "@type": "Place", name: "Naxos, Greece" },
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: [".answer-block", "h1"],
    },
  };
}

export function locationPlaceSchema(loc: Location, locale: Locale) {
  return {
    "@type": ["Place", "TouristAttraction"],
    "@id": absoluteUrl(locale, `locations/${loc.slug}`),
    name: loc.name[locale],
    description: loc.body[locale],
    geo: { "@type": "GeoCoordinates", latitude: loc.geo.lat, longitude: loc.geo.lng },
    hasMap: `https://www.google.com/maps/search/?api=1&query=${loc.geo.lat},${loc.geo.lng}`,
    containedInPlace: { "@id": `${SITE.domain}#naxos` },
    isAccessibleForFree: true,
  };
}

/** The /naxos hub entity. Everything on the island guide hangs off this @id. */
export function touristDestinationSchema(locale: Locale) {
  return {
    "@type": "TouristDestination",
    "@id": `${SITE.domain}#naxos`,
    name: "Naxos",
    alternateName: ["Νάξος", "Naxos Island", "Naxos, Cyclades"],
    description:
      "Naxos is the largest island of the Cyclades, Greece — 430 km² of beaches, marble-paved mountain villages, a Venetian kastro and Mount Zas, the highest peak in the archipelago.",
    url: absoluteUrl(locale, "naxos"),
    geo: { "@type": "GeoCoordinates", latitude: 37.1036, longitude: 25.3771 },
    containedInPlace: [
      { "@type": "AdministrativeArea", name: "Cyclades" },
      { "@type": "Country", name: "Greece" },
    ],
    touristType: [
      "Beach holiday",
      "Family travel",
      "Road trip",
      "Hiking",
      "Food and wine",
    ],
    inLanguage: locale,
    isPartOf: { "@id": WEBSITE_ID },
  };
}

export function itemListSchema(
  items: { name: string; url: string; image?: string; description?: string }[],
  opts: { name?: string; id?: string } = {},
) {
  if (items.length === 0) return null;
  return {
    "@type": "ItemList",
    ...(opts.id ? { "@id": opts.id } : {}),
    ...(opts.name ? { name: opts.name } : {}),
    numberOfItems: items.length,
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      url: item.url,
      ...(item.image ? { image: absoluteAssetUrl(item.image) } : {}),
      ...(item.description ? { description: item.description } : {}),
    })),
  };
}

export function howToSchema(input: {
  name: string;
  description: string;
  steps: { name: string; text: string }[];
  totalTime?: string;
}) {
  return {
    "@type": "HowTo",
    name: input.name,
    description: input.description,
    ...(input.totalTime ? { totalTime: input.totalTime } : {}),
    step: input.steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
}

export function graph(items: Array<Record<string, unknown> | null | undefined>) {
  return { "@context": "https://schema.org", "@graph": items.filter(Boolean) };
}

export function websiteSchema(locale: Locale) {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: absoluteUrl(locale),
    name: SITE.brand,
    description: SITE.tagline[locale],
    inLanguage: locale,
    publisher: { "@id": ORG_ID },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${absoluteUrl(locale, "fleet/cars")}?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function alternates(path: string) {
  const languages: Record<string, string> = {};
  for (const l of LOCALES) languages[l] = absoluteUrl(l, path);
  languages["x-default"] = absoluteUrl("en", path);
  return languages;
}
