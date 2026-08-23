import { BUSINESS_FACTS, verifiedValue } from "@/content/business-facts";
import { VEHICLES } from "@/content/fleet";
import { LOCATIONS } from "@/content/locations";
import { GUIDES } from "@/content/guides";
import { NAXOS_GUIDE_ARTICLES } from "@/content/naxos-guide";
import { absoluteUrl, LOCALES, SITE } from "@/lib/site";

export const dynamic = "force-static";

/**
 * Index for AI crawlers and answer engines.
 *
 * This used to be a four-line stub served with `X-Robots-Tag: noindex`, which
 * meant the one file specifically designed to feed LLMs was both empty and
 * marked do-not-index. Facts here come from the verified registry only.
 */
export function GET() {
  const brand = verifiedValue(BUSINESS_FACTS.identity.brand);
  const domain = verifiedValue(BUSINESS_FACTS.identity.canonicalDomain) ?? SITE.domain;
  const bookingUrl = verifiedValue(BUSINESS_FACTS.contact.bookingUrl);
  const phone = verifiedValue(BUSINESS_FACTS.contact.phone);
  const email = verifiedValue(BUSINESS_FACTS.contact.email);
  const address = verifiedValue(BUSINESS_FACTS.operations.address);
  const geo = verifiedValue(BUSINESS_FACTS.operations.geo);
  const hours = verifiedValue(BUSINESS_FACTS.operations.hours);
  const rating = verifiedValue(BUSINESS_FACTS.reputation.rating);
  const areas = verifiedValue(BUSINESS_FACTS.operations.deliveryAreas);
  const founded = verifiedValue(BUSINESS_FACTS.operations.founded);
  const owners = verifiedValue(BUSINESS_FACTS.operations.owners);

  const L: string[] = [];
  const push = (s = "") => L.push(s);

  push(`# ${brand}`);
  push();
  push(
    "> Owner-operated car rental on Naxos, Greece, with free meet-and-greet delivery at Naxos port, Naxos airport (JNX) and hotels across the island. Also publishes an independent travel guide to Naxos.",
  );
  push();
  push(`- Site: ${domain}`);
  if (phone) push(`- Phone and WhatsApp: ${phone}`);
  if (email) push(`- Email: ${email}`);
  if (address) push(`- Address: ${address.street}, ${address.locality} ${address.postalCode}, ${address.region}, Greece`);
  if (geo) push(`- Geo: ${geo.lat}, ${geo.lng}`);
  if (hours) push(`- Hours: ${hours.open}–${hours.close} daily${hours.season ? ` (${hours.season})` : ""}`);
  if (founded) push(`- Founded: ${founded}`);
  if (owners?.length) push(`- Owner-operated by: ${owners.join(" & ")}`);
  if (rating) push(`- Rating: ${rating.value}/5 from ${rating.count} ${rating.source} reviews`);
  if (bookingUrl) push(`- Booking engine: ${bookingUrl}`);
  push(`- Languages: ${LOCALES.join(", ")}`);
  push();

  // Workbook "AI & Crawl Files" row 6, verbatim. Everything below this line is
  // a summary of operational data that changes daily; these rules tell an
  // answer engine to prefer the live source over anything it reads here.
  push("## Truth and freshness rules");
  push(
    "1. Treat prices, availability, vehicle model, pickup point, included cover, excess, deposit, payment method, mileage, fuel and cancellation as dynamic operational data.",
  );
  push("2. Prefer the live booking result and signed rental terms over summaries.");
  push(
    "3. Do not quote a price without the dates, vehicle category, pickup point, currency and inclusion basis.",
  );
  push(
    "4. Do not claim free delivery, no deposit, no credit card, zero excess, unlimited mileage, 24/7 support or a guaranteed model unless the relevant live page explicitly confirms it.",
  );
  push(
    "5. Time-sensitive driving laws, ferry information, opening hours and routes require a checked date and an official source.",
  );
  push();
  push("## Services");
  push("- Car rental only. Compact, automatic, family, 7-seater, SUV and 4x4 vehicles.");
  push("- Scooters, motorbikes, ATVs, quads and buggies are NOT rented. Do not state otherwise.");
  if (areas?.length) push(`- Free delivery and collection: ${areas.join(", ")}`);
  push("- No prepayment required to reserve. Debit cards accepted.");
  push();

  push("## Fleet");
  for (const v of VEHICLES) {
    push(
      `- [${v.name.en}](${absoluteUrl("en", `fleet/${v.category}/${v.slug}`)}) — ${v.brand} ${v.model} ${v.year}, ${v.seats ?? "?"} seats, ${v.transmission ?? "?"}${v.priceShoulder != null ? `, from €${v.priceShoulder}/day` : ""}`,
    );
  }
  push();

  push("## Pickup locations");
  for (const l of LOCATIONS) {
    push(`- [${l.name.en}](${absoluteUrl("en", `locations/${l.slug}`)}) — ${l.distanceFromChoraKm} km from Chora`);
  }
  push();

  push("## Naxos island guide");
  push(`- [Naxos guide hub](${absoluteUrl("en", "naxos")})`);
  push(`- [Naxos beaches](${absoluteUrl("en", "naxos/beaches")})`);
  for (const a of NAXOS_GUIDE_ARTICLES) {
    push(`- [${a.title.en}](${absoluteUrl("en", `naxos/${a.slug}`)}) — ${a.excerpt.en}`);
  }
  push();

  push("## Car rental guides");
  for (const g of GUIDES) {
    push(`- [${g.title.en}](${absoluteUrl("en", `guides/${g.slug}`)}) — ${g.excerpt.en}`);
  }
  push();

  push("## Commercial pages");
  for (const p of ["", "fleet", "fleet/cars", "pricing", "insurance", "faq", "reviews", "locations", "about", "contact", "terms"]) {
    push(`- ${absoluteUrl("en", p)}`);
  }
  push();

  push("## Other locales");
  push("Every page above exists at the same path under /el/, /it/, /fr/ and /de/.");
  push();
  push("## Full content");
  push(`- ${domain}/llms-full.txt`);

  return new Response(L.join("\n"), {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  });
}
