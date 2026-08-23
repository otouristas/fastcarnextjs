import type { Locale } from "./site";

/**
 * Contextual deep links into Discover Cyclades and Touristas AI.
 *
 * Adapted from the Artemis Rentals implementation. The dedupe logic matters:
 * several helpers deliberately alias to the same destination (the Naxos island
 * guide serves as the fallback for several topics), so building a list by hand
 * renders the same URL twice under two different labels and hands React
 * duplicate keys. When two entries collide, keep the label that actually
 * describes where the link goes.
 */

const DC = "https://discovercyclades.gr";

/**
 * Surfaces that link out to Discover Cyclades. Used as utm_campaign so the
 * partner can tell a guide-rail click from a footer click; without it every
 * referral from this domain lands in one undifferentiated bucket.
 */
export type DiscoverSurface = "guide-rail" | "footer" | "credit" | "planner";

/**
 * Tag an outbound partner URL. Applied last, after dedupe: the dedupe map keys
 * on href, so stamping a per-surface campaign earlier would make the same
 * destination look like two different links.
 */
export function withUtm(href: string, surface: DiscoverSurface): string {
  const url = new URL(href);
  url.searchParams.set("utm_source", "naxos-carrentals");
  url.searchParams.set("utm_medium", "referral");
  url.searchParams.set("utm_campaign", surface);
  return url.toString();
}

export type DiscoverLabelKey =
  | "island"
  | "rentACar"
  | "beaches"
  | "ferries"
  | "howToGet"
  | "compare"
  | "family"
  | "planner";

export interface DiscoverLink {
  href: string;
  labelKey: DiscoverLabelKey;
}

export const DISCOVER_LABELS: Record<DiscoverLabelKey, string> = {
  island: "Naxos island guide",
  rentACar: "Naxos car rental directory",
  beaches: "Best beaches in Naxos",
  ferries: "Cyclades ferry tickets",
  howToGet: "Athens to Naxos",
  compare: "Naxos vs Santorini",
  family: "Naxos with toddlers",
  planner: "Plan my trip with Touristas AI",
};

export const naxosIslandUrl = (locale: Locale) => `${DC}/${locale}/islands/naxos`;
export const naxosRentACarUrl = (locale: Locale) => `${DC}/${locale}/rent-a-car/naxos`;
export const naxosBeachesUrl = (locale: Locale) => `${DC}/${locale}/blog/best-beaches-naxos`;
export const ferryTicketsUrl = (locale: Locale) => `${DC}/${locale}/ferry-tickets`;
export const athensToNaxosUrl = (locale: Locale) => `${DC}/${locale}/blog/athens-to-naxos-travel-guide`;
export const santoriniVsNaxosUrl = (locale: Locale) => `${DC}/${locale}/blog/santorini-vs-naxos`;
export const naxosToddlersUrl = (locale: Locale) => `${DC}/${locale}/blog/naxos-with-toddlers-2026`;

export function tripPlannerUrl(locale: Locale, prompt: string) {
  const url = new URL(`${DC}/${locale}/cyclades-ai-planner`);
  url.searchParams.set("q", prompt);
  return url.toString();
}

export function discoverCycladesHome(locale: Locale) {
  return `${DC}/${locale}`;
}

/** When two entries resolve to one URL, this decides which label survives. */
function canonicalLabelForUrl(locale: Locale): Map<string, DiscoverLabelKey> {
  return new Map<string, DiscoverLabelKey>([
    [naxosIslandUrl(locale), "island"],
    [naxosRentACarUrl(locale), "rentACar"],
    [naxosBeachesUrl(locale), "beaches"],
    [ferryTicketsUrl(locale), "ferries"],
    [athensToNaxosUrl(locale), "howToGet"],
    [santoriniVsNaxosUrl(locale), "compare"],
    [naxosToddlersUrl(locale), "family"],
  ]);
}

function tagAll(links: DiscoverLink[], surface: DiscoverSurface): DiscoverLink[] {
  return links.map((link) => ({ ...link, href: withUtm(link.href, surface) }));
}

function dedupeByHref(links: DiscoverLink[], locale: Locale): DiscoverLink[] {
  const canonical = canonicalLabelForUrl(locale);
  const byHref = new Map<string, DiscoverLink>();
  for (const link of links) {
    const existing = byHref.get(link.href);
    if (!existing) {
      byHref.set(link.href, link);
      continue;
    }
    const preferred = canonical.get(link.href);
    if (preferred && link.labelKey === preferred) byHref.set(link.href, link);
  }
  return [...byHref.values()];
}

/** The shared hub set, used by the footer column and the guide index. */
export function getDiscoverHubLinks(
  locale: Locale,
  surface: DiscoverSurface = "footer",
): DiscoverLink[] {
  return tagAll(
    dedupeByHref(
      [
        { href: naxosIslandUrl(locale), labelKey: "island" },
        { href: naxosRentACarUrl(locale), labelKey: "rentACar" },
        { href: ferryTicketsUrl(locale), labelKey: "ferries" },
        { href: athensToNaxosUrl(locale), labelKey: "howToGet" },
        { href: naxosBeachesUrl(locale), labelKey: "beaches" },
      ],
      locale,
    ),
    surface,
  );
}

/** Per-article contextual set, matched to what the reader is actually reading. */
export function getArticleDiscoverLinks(
  locale: Locale,
  slug: string,
  surface: DiscoverSurface = "guide-rail",
): DiscoverLink[] {
  const island = { href: naxosIslandUrl(locale), labelKey: "island" as const };
  const cars = { href: naxosRentACarUrl(locale), labelKey: "rentACar" as const };
  const beaches = { href: naxosBeachesUrl(locale), labelKey: "beaches" as const };
  const ferries = { href: ferryTicketsUrl(locale), labelKey: "ferries" as const };
  const howTo = { href: athensToNaxosUrl(locale), labelKey: "howToGet" as const };
  const compare = { href: santoriniVsNaxosUrl(locale), labelKey: "compare" as const };
  const family = { href: naxosToddlersUrl(locale), labelKey: "family" as const };
  const planner = {
    href: tripPlannerUrl(locale, "Plan a Naxos trip with a rental car"),
    labelKey: "planner" as const,
  };

  const bySlug: Record<string, DiscoverLink[]> = {
    // ── Driving guides (/guides/[slug]) ──
    // These carry the proven GSC demand, so their rails are matched to intent
    // rather than falling through to the generic set.
    "driving-in-naxos": [island, cars, beaches, planner],
    "parking-in-naxos": [island, beaches, cars, planner],
    "do-you-need-a-car-in-naxos": [island, cars, ferries, planner],
    "naxos-road-trip-itinerary": [island, beaches, cars, planner],
    "naxos-mountain-villages-by-car": [island, cars, beaches, planner],
    "best-beaches-by-car-naxos": [beaches, island, cars, planner],
    "idp-greece-rules": [island, cars, howTo, planner],
    "new-greek-traffic-code-2026": [island, cars, howTo, planner],
    "naxos-airport-jnx-guide": [howTo, ferries, island, planner],
    "rent-a-car-naxos-port-vs-airport-pickup-guide": [howTo, ferries, island, planner],
    "naxos-rent-a-car-prices-cost-breakdown": [cars, island, ferries, planner],
    "naxos-car-rental-without-credit-card-insurance": [cars, island, ferries, planner],
    "best-car-rental-naxos-reviews-comparison": [cars, island, beaches, planner],
    "atv-vs-buggy-vs-car": [cars, island, beaches, planner],

    // ── Island guide articles (/naxos/[slug]) ──
    "how-to-get-to-naxos": [howTo, ferries, island, planner],
    "naxos-port-guide": [ferries, howTo, island, planner],
    "naxos-airport-jnx": [howTo, ferries, island, planner],
    "best-beaches-in-naxos": [beaches, island, cars, planner],
    "naxos-with-kids": [family, beaches, island, planner],
    "naxos-vs-paros": [compare, island, ferries, planner],
    "naxos-travel-guide": [island, beaches, cars, planner],
    "things-to-do-in-naxos": [island, beaches, cars, planner],
  };

  return tagAll(
    dedupeByHref(bySlug[slug] ?? [island, cars, beaches, ferries, planner], locale),
    surface,
  );
}
