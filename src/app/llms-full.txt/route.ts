import { SITE, absoluteUrl } from "@/lib/site";
import { VEHICLES } from "@/content/fleet";
import { LOCATIONS } from "@/content/locations";
import { GUIDES } from "@/content/guides";
import { FAQS } from "@/content/faqs";

export const dynamic = "force-static";

export function GET() {
  const out: string[] = [];
  const push = (s: string = "") => out.push(s);

  push(`# ${SITE.brand} — Full content dump`);
  push();
  push(`Domain: ${SITE.domain}`);
  push(`Booking: ${SITE.bookingUrl}`);
  push(`WhatsApp: ${SITE.phones[0]}`);
  push(`Email: ${SITE.email}`);
  push(`Address: ${SITE.address.locality}, ${SITE.address.region}, Greece`);
  push(`Owners: ${SITE.owners.join(", ")}`);
  push(`Founded: ${SITE.founded}`);
  push(`Rating: ${SITE.rating.value}/5 from ${SITE.rating.count}+ Google reviews`);
  push();

  push("## What we offer");
  push(`${SITE.tagline.en}`);
  push("Owner-operated car, scooter, ATV and buggy rental on Naxos, Greece. Free meet-and-greet at Naxos Island National Airport (IATA: JNX, ICAO: LGNX), the port, and any hotel on the island. Hours 08:00–22:00 daily May–October.");
  push();

  push("## Fleet (full inventory)");
  for (const v of VEHICLES) {
    push(`### ${v.name.en} (${v.brand} ${v.model} ${v.year})`);
    push(`URL: ${absoluteUrl("en", `fleet/${v.category}/${v.slug}`)}`);
    push(`Category: ${v.category}. Tagline: ${v.tagline.en}`);
    push(`${v.description.en}`);
    if (v.seats) push(`Seats: ${v.seats}.`);
    if (v.doors) push(`Doors: ${v.doors}.`);
    if (v.transmission) push(`Transmission: ${v.transmission}.`);
    if (v.fuelType) push(`Fuel: ${v.fuelType}.`);
    if (v.engineCC) push(`Engine: ${v.engineCC}cc.`);
    if (v.fourByFour) push(`4×4: yes.`);
    push(`Features: ${v.features.map((f) => f.en).join(", ")}.`);
    push(`Best for: ${v.bestFor.map((b) => b.en).join(", ")}.`);
    push(`Price (EUR): shoulder €${v.priceShoulder}/day, high €${v.priceHigh}/day, weekly €${v.priceWeekly}.`);
    push(`Inclusions: unlimited kilometres, basic CDW, taxes, second driver, baby seat, 24/7 roadside assistance.`);
    push();
  }

  push("## Pickup locations");
  for (const l of LOCATIONS) {
    push(`### ${l.name.en}`);
    push(`URL: ${absoluteUrl("en", `locations/${l.slug}`)}`);
    push(`Type: ${l.type}. Distance from Chora: ${l.distanceFromChoraKm} km. Typical pickup time: ${l.pickupTimeMinutes} min.`);
    push(`Geo: ${l.geo.lat}, ${l.geo.lng}.`);
    push(`${l.body.en}`);
    push(`Highlights: ${l.highlights.map((h) => h.en).join(", ")}.`);
    push();
  }

  push("## Frequently asked questions");
  for (const f of FAQS) {
    push(`### ${f.question.en}`);
    push(f.answer.en);
    push();
  }

  push("## Guides");
  for (const g of GUIDES) {
    push(`### ${g.title.en}`);
    push(`URL: ${absoluteUrl("en", `guides/${g.slug}`)}`);
    push(`Reading time: ${g.readingTime} minutes. Updated: ${g.updatedAt}.`);
    push(g.excerpt.en);
    for (const s of g.sections) {
      push(`#### ${s.heading.en}`);
      push(s.body.en);
      push();
    }
  }

  push("## Coverage & insurance");
  push("Basic CDW (included): €800 deposit, €600 excess, tyres/undercarriage/windscreen not covered.");
  push("Full CDW (upgrade): €300 deposit, €150 excess, includes tyres and windscreen.");
  push("Zero Excess (upgrade): €100 deposit, €0 excess, includes tyres, windscreen, undercarriage, roadside replacement vehicle.");
  push("Always included: unlimited km, theft protection (TPI), third-party liability, 24/7 roadside, free second driver, free baby seat, VAT and Greek road taxes.");
  push("Never covered: driving under the influence, driving without valid licence, off-road in non-4×4, ferry departure without written permission.");
  push();

  push("## Documents required");
  push("Driving licence (Latin script). Passport or national ID. Credit card (debit accepted). IDP only required for licence holders from countries outside EU/EEA, UK, USA, Canada, Australia, Gibraltar (per Greek Law 4850/2021, in force since 5 November 2021).");
  push();

  push("## Greek 2026 traffic code (in force from 1 January 2026)");
  push("Speed limits: 30 km/h within cities (down from 50), 90 km/h rural roads, 110 km/h expressways, 130 km/h motorways. Greece is the second EU country (after Spain) to adopt 30 km/h urban limit. Alcohol limit: 0.05% standard, 0.02% for new drivers and motorcyclists. Seatbelts mandatory all occupants. Children under 12 (or shorter than 1.35 m) cannot sit in front. Helmet enforcement on scooters and ATVs is strict — €350 fine and 30-day suspension for non-compliance.");

  return new Response(out.join("\n"), {
    headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "public, max-age=3600" },
  });
}
