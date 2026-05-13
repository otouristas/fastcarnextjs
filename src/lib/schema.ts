import { SITE, type Locale, absoluteUrl, LOCALES } from "./site";
import type { Vehicle, Location, Faq, Guide, Review } from "@/types/content";

const ORG_ID = `${SITE.domain}#organization`;
const LB_ID = `${SITE.domain}#localbusiness`;

export function organizationSchema() {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE.brand,
    url: SITE.domain,
    logo: SITE.logo,
    sameAs: [SITE.social.facebook, SITE.social.instagram, SITE.social.googleMaps, SITE.social.tripadvisor].filter(Boolean),
    founder: SITE.owners.map((name) => ({ "@type": "Person", name })),
    foundingDate: SITE.founded,
  };
}

export function localBusinessSchema(locale: Locale) {
  return {
    "@type": ["LocalBusiness", "AutoRental"],
    "@id": LB_ID,
    name: SITE.brand,
    url: absoluteUrl(locale),
    image: SITE.logo,
    logo: SITE.logo,
    telephone: SITE.phones[0],
    email: SITE.email,
    priceRange: SITE.priceRange,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.locality,
      addressRegion: SITE.address.region,
      postalCode: SITE.address.postalCode,
      addressCountry: SITE.address.country,
    },
    geo: { "@type": "GeoCoordinates", latitude: SITE.geo.lat, longitude: SITE.geo.lng },
    areaServed: SITE.areaServed.map((name) => ({ "@type": "Place", name })),
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: SITE.hours.days,
        opens: SITE.hours.open,
        closes: SITE.hours.close,
      },
    ],
    sameAs: [SITE.social.facebook, SITE.social.instagram, SITE.social.googleMaps, SITE.social.tripadvisor].filter(Boolean),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: SITE.rating.value,
      reviewCount: SITE.rating.count,
    },
    knowsAbout: [
      "car rental Naxos",
      "scooter rental Naxos",
      "ATV rental Naxos",
      "buggy rental Naxos",
      "Naxos airport pickup",
      "Naxos port pickup",
    ],
  };
}

export function vehicleSchema(v: Vehicle, locale: Locale) {
  const url = absoluteUrl(locale, `fleet/${v.category}/${v.slug}`);
  return {
    "@type": "Product",
    "@id": url,
    name: v.name[locale],
    description: v.description[locale],
    image: v.image,
    brand: { "@type": "Brand", name: v.brand },
    sku: v.slug,
    offers: {
      "@type": "Offer",
      url,
      priceCurrency: SITE.currency,
      price: v.priceShoulder,
      priceValidUntil: "2026-12-31",
      availability: "https://schema.org/InStock",
      seller: { "@id": LB_ID },
      eligibleRegion: { "@type": "Place", name: "Naxos, Greece" },
      priceSpecification: [
        { "@type": "UnitPriceSpecification", price: v.priceShoulder, priceCurrency: "EUR", referenceQuantity: { "@type": "QuantitativeValue", value: 1, unitCode: "DAY" }, name: "Shoulder season" },
        { "@type": "UnitPriceSpecification", price: v.priceHigh, priceCurrency: "EUR", referenceQuantity: { "@type": "QuantitativeValue", value: 1, unitCode: "DAY" }, name: "High season" },
        { "@type": "UnitPriceSpecification", price: v.priceWeekly, priceCurrency: "EUR", referenceQuantity: { "@type": "QuantitativeValue", value: 7, unitCode: "DAY" }, name: "Weekly" },
      ],
    },
    additionalType: "https://schema.org/Vehicle",
    vehicleConfiguration: v.model,
    vehicleTransmission: v.transmission,
    fuelType: v.fuelType,
    numberOfDoors: v.doors,
    seatingCapacity: v.seats,
    vehicleEngine: v.engineCC ? { "@type": "EngineSpecification", engineDisplacement: { "@type": "QuantitativeValue", value: v.engineCC, unitCode: "CMQ" } } : undefined,
    modelDate: v.year,
    aggregateRating: { "@type": "AggregateRating", ratingValue: SITE.rating.value, reviewCount: SITE.rating.count },
  };
}

export function faqPageSchema(faqs: Faq[], locale: Locale) {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question[locale],
      acceptedAnswer: { "@type": "Answer", text: f.answer[locale] },
    })),
  };
}

export function articleSchema(g: Guide, locale: Locale) {
  return {
    "@type": "Article",
    "@id": absoluteUrl(locale, `guides/${g.slug}`),
    headline: g.title[locale],
    description: g.excerpt[locale],
    image: g.hero,
    datePublished: g.publishedAt,
    dateModified: g.updatedAt,
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    inLanguage: locale,
    mainEntityOfPage: absoluteUrl(locale, `guides/${g.slug}`),
  };
}

export function locationPlaceSchema(loc: Location, locale: Locale) {
  return {
    "@type": "Place",
    "@id": absoluteUrl(locale, `locations/${loc.slug}`),
    name: loc.name[locale],
    description: loc.body[locale],
    geo: { "@type": "GeoCoordinates", latitude: loc.geo.lat, longitude: loc.geo.lng },
    containedInPlace: { "@type": "Place", name: "Naxos, Greece" },
  };
}

export function reviewSchema(r: Review, locale: Locale) {
  return {
    "@type": "Review",
    author: { "@type": "Person", name: r.author },
    datePublished: r.date,
    reviewRating: { "@type": "Rating", ratingValue: r.rating, bestRating: 5 },
    reviewBody: r.body[locale],
    publisher: { "@type": "Organization", name: r.source },
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

export function graph(items: Record<string, unknown>[]) {
  return { "@context": "https://schema.org", "@graph": items };
}

export function websiteSchema(locale: Locale) {
  return {
    "@type": "WebSite",
    "@id": `${SITE.domain}#website`,
    url: absoluteUrl(locale),
    name: SITE.brand,
    inLanguage: locale,
    publisher: { "@id": ORG_ID },
    potentialAction: {
      "@type": "SearchAction",
      target: `${absoluteUrl(locale)}/fleet?q={search_term_string}`,
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
