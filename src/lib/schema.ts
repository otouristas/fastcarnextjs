import { SITE, type Locale, absoluteAssetUrl, absoluteUrl, LOCALES } from "./site";
import { BUSINESS_FACTS, verifiedValue } from "@/content/business-facts";
import type { Vehicle, Location, Faq, Guide } from "@/types/content";

const ORG_ID = `${SITE.domain}#organization`;
const LB_ID = `${SITE.domain}#localbusiness`;

export function organizationSchema() {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE.brand,
    url: SITE.domain,
    logo: absoluteAssetUrl(SITE.logo),
    sameAs: [SITE.social.facebook, SITE.social.instagram],
  };
}

export function localBusinessSchema(locale: Locale) {
  const address = verifiedValue(BUSINESS_FACTS.operations.address);
  const geo = verifiedValue(BUSINESS_FACTS.operations.geo);
  const hours = verifiedValue(BUSINESS_FACTS.operations.hours);
  const areaServed = verifiedValue(BUSINESS_FACTS.operations.deliveryAreas);

  return {
    "@type": ["LocalBusiness", "AutoRental"],
    "@id": LB_ID,
    name: SITE.brand,
    url: absoluteUrl(locale),
    image: absoluteAssetUrl(SITE.logo),
    logo: absoluteAssetUrl(SITE.logo),
    telephone: SITE.phones[0],
    email: SITE.email,
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
      ? { geo: { "@type": "GeoCoordinates", latitude: geo.lat, longitude: geo.lng } }
      : {}),
    ...(areaServed
      ? { areaServed: areaServed.map((name) => ({ "@type": "Place", name })) }
      : {}),
    ...(hours
      ? {
          openingHoursSpecification: [
            {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: hours.days,
              opens: hours.open,
              closes: hours.close,
            },
          ],
        }
      : {}),
    sameAs: [SITE.social.facebook, SITE.social.instagram],
  };
}

export function vehicleSchema(v: Vehicle, locale: Locale) {
  const url = absoluteUrl(locale, `fleet/${v.category}/${v.slug}`);
  return {
    "@type": "Product",
    "@id": url,
    name: v.name[locale],
    description: SITE.tagline[locale],
    image: absoluteAssetUrl(v.image),
    brand: { "@type": "Brand", name: v.brand },
    sku: v.slug,
    additionalType: "https://schema.org/Vehicle",
    vehicleConfiguration: v.model,
    vehicleTransmission: v.transmission,
    fuelType: v.fuelType,
    numberOfDoors: v.doors,
    seatingCapacity: v.seats,
    vehicleEngine: v.engineCC ? { "@type": "EngineSpecification", engineDisplacement: { "@type": "QuantitativeValue", value: v.engineCC, unitCode: "CMQ" } } : undefined,
    modelDate: v.year,
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

export function articleSchema(g: Guide, locale: Locale) {
  return {
    "@type": "Article",
    "@id": absoluteUrl(locale, `guides/${g.slug}`),
    headline: g.title[locale],
    description: g.excerpt[locale],
    image: absoluteAssetUrl(g.hero),
    datePublished: g.publishedAt,
    dateModified: g.updatedAt,
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
    "@id": `${SITE.domain}#website`,
    url: absoluteUrl(locale),
    name: SITE.brand,
    inLanguage: locale,
    publisher: { "@id": ORG_ID },
  };
}

export function alternates(path: string) {
  const languages: Record<string, string> = {};
  for (const l of LOCALES) languages[l] = absoluteUrl(l, path);
  languages["x-default"] = absoluteUrl("en", path);
  return languages;
}
