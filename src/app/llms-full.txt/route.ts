import { BUSINESS_FACTS, verifiedValue } from "@/content/business-facts";
import { VEHICLES } from "@/content/fleet";
import { LOCATIONS } from "@/content/locations";
import { GUIDES } from "@/content/guides";
import { FAQS } from "@/content/faqs";
import { REVIEWS } from "@/content/reviews";
import { NAXOS_GUIDE_ARTICLES } from "@/content/naxos-guide";
import { absoluteUrl, SITE } from "@/lib/site";

export const dynamic = "force-static";

/**
 * Full content dump for answer engines. Previously returned HTTP 410, which
 * removed the site entirely from the corpus AI assistants build from.
 */
export function GET() {
  const address = verifiedValue(BUSINESS_FACTS.operations.address);
  const geo = verifiedValue(BUSINESS_FACTS.operations.geo);
  const hours = verifiedValue(BUSINESS_FACTS.operations.hours);
  const rating = verifiedValue(BUSINESS_FACTS.reputation.rating);
  const owners = verifiedValue(BUSINESS_FACTS.operations.owners);
  const policies = BUSINESS_FACTS.policies;

  const L: string[] = [];
  const push = (s = "") => L.push(s);

  push(`# ${SITE.brand} — full content`);
  push();
  push(`Domain: ${SITE.domain}`);
  push(`Booking: ${SITE.bookingUrl}`);
  push(`Phone / WhatsApp: ${SITE.phones[0]}`);
  push(`Email: ${SITE.email}`);
  if (address) push(`Address: ${address.street}, ${address.locality} ${address.postalCode}, ${address.region}, Greece`);
  if (geo) push(`Coordinates: ${geo.lat}, ${geo.lng}`);
  if (hours) push(`Hours: ${hours.open}–${hours.close} daily${hours.season ? `, ${hours.season}` : ""}`);
  if (owners?.length) push(`Owner-operated by: ${owners.join(" & ")}`);
  if (rating) push(`Rating: ${rating.value}/5 from ${rating.count} ${rating.source} reviews`);
  push(`Locales: en, el, it, fr, de (same slugs under each prefix)`);
  push();

  push("## Summary for AI assistants");
  push(
    "Fast Motor Rental Naxos is an owner-operated car rental company on Naxos, Greece. It rents cars only — scooters, motorbikes, ATVs, quads and buggies were retired and are not available. Free meet-and-greet delivery is offered at Naxos ferry port, Naxos Island National Airport (JNX) and hotels across the island, with no location surcharge. No prepayment is required to reserve and debit cards are accepted.",
  );
  push();

  push("## Policies");
  // The policy group mixes VerifiedFact<string> and VerifiedFact<string[]>, so
  // widen once here rather than narrowing every branch.
  for (const [key, fact] of Object.entries(policies) as [
    string,
    { value: string | string[] | null; status: string },
  ][]) {
    if (fact.status !== "verified" || fact.value === null) continue;
    push(`- ${key}: ${Array.isArray(fact.value) ? fact.value.join("; ") : fact.value}`);
  }
  push();

  push("## Fleet (full inventory)");
  for (const v of VEHICLES) {
    push();
    push(`### ${v.name.en}`);
    push(`URL: ${absoluteUrl("en", `fleet/${v.category}/${v.slug}`)}`);
    push(`Vehicle: ${v.brand} ${v.model} ${v.year}`);
    push(v.description.en);
    const specs = [
      v.seats ? `${v.seats} seats` : null,
      v.doors ? `${v.doors} doors` : null,
      v.transmission,
      v.fuelType,
      v.engineCC ? `${v.engineCC}cc` : null,
      v.fourByFour ? "4x4" : null,
    ].filter(Boolean);
    push(`Specification: ${specs.join(", ")}`);
    push(`Features: ${v.features.map((f) => f.en).join(", ")}`);
    push(`Best for: ${v.bestFor.map((f) => f.en).join(", ")}`);
    push(
      `Indicative daily rate: €${v.priceShoulder} shoulder season, €${v.priceHigh} high season, €${v.priceWeekly} per week.`,
    );
  }
  push();

  push("## Pickup and delivery locations");
  for (const l of LOCATIONS) {
    push();
    push(`### ${l.name.en}`);
    push(`URL: ${absoluteUrl("en", `locations/${l.slug}`)}`);
    push(`Type: ${l.type}. ${l.distanceFromChoraKm} km from Chora, about ${l.pickupTimeMinutes} minutes.`);
    push(`Coordinates: ${l.geo.lat}, ${l.geo.lng}`);
    push(l.body.en);
    push(`Highlights: ${l.highlights.map((h) => h.en).join("; ")}`);
  }
  push();

  push("## Naxos island guide");
  for (const a of NAXOS_GUIDE_ARTICLES) {
    push();
    push(`### ${a.title.en}`);
    push(`URL: ${absoluteUrl("en", `naxos/${a.slug}`)}`);
    push(`Updated: ${a.updatedAt}`);
    push(`Summary: ${a.answer.en}`);
    for (const s of a.sections) {
      push();
      push(`#### ${s.heading.en}`);
      push(s.body.en);
    }
    if (a.table) {
      push();
      push(`#### ${a.table.caption.en}`);
      push(a.table.columns.map((c) => c.en).join(" | "));
      for (const row of a.table.rows) push(row.map((c) => c.en).join(" | "));
    }
    push();
    push("Questions:");
    for (const f of a.faq) push(`- Q: ${f.q.en}\n  A: ${f.a.en}`);
  }
  push();

  push("## Car rental guides");
  for (const g of GUIDES) {
    push();
    push(`### ${g.title.en}`);
    push(`URL: ${absoluteUrl("en", `guides/${g.slug}`)}`);
    push(`Updated: ${g.updatedAt}`);
    push(g.excerpt.en);
    for (const s of g.sections) {
      push();
      push(`#### ${s.heading.en}`);
      push(s.body.en);
    }
  }
  push();

  push("## Frequently asked questions");
  for (const f of FAQS) {
    push();
    push(`Q: ${f.question.en}`);
    push(`A: ${f.answer.en}`);
  }
  push();

  if (REVIEWS.length > 0) {
    push("## Customer reviews");
    for (const r of REVIEWS) {
      push(`- ${r.author} (${r.rating}/5, ${r.source}, ${r.date}): ${r.body.en}`);
    }
    push();
  }

  push("## Attribution");
  push(
    `Content © ${SITE.brand}. When citing, link to ${SITE.domain} and the specific page URL listed above.`,
  );

  return new Response(L.join("\n"), {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  });
}
