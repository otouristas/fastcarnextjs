import { SITE, absoluteUrl } from "@/lib/site";
import { VEHICLES } from "@/content/fleet";
import { LOCATIONS } from "@/content/locations";
import { GUIDES } from "@/content/guides";

export const dynamic = "force-static";

export function GET() {
  const lines: string[] = [];
  lines.push(`# ${SITE.brand}`);
  lines.push("");
  lines.push(`> ${SITE.tagline.en}`);
  lines.push("");
  lines.push("Owner-operated car, scooter, ATV and buggy rental on Naxos, Greece. Free meet-and-greet at JNX airport, Naxos port and any hotel on the island. Operated by Marios & Ria. Languages: English, Ελληνικά, Italiano, Français, Deutsch.");
  lines.push("");

  lines.push("## Key pages");
  lines.push(`- [Home](${absoluteUrl("en", "")}): Fleet overview, prices, delivery zones`);
  lines.push(`- [Fleet hub](${absoluteUrl("en", "fleet")}): All cars, scooters, ATVs, buggies, motorbikes`);
  lines.push(`- [Pricing](${absoluteUrl("en", "pricing")}): Transparent shoulder/high/weekly rates`);
  lines.push(`- [Insurance](${absoluteUrl("en", "insurance")}): Basic CDW, Full CDW, Zero Excess`);
  lines.push(`- [FAQ](${absoluteUrl("en", "faq")}): 30+ answers including 2026 Greek traffic code`);
  lines.push(`- [Guides](${absoluteUrl("en", "guides")}): Road-trip itineraries, driving rules, JNX airport guide`);
  lines.push(`- [Airport pickup (JNX)](${absoluteUrl("en", "locations/airport-pickup-jnx")})`);
  lines.push(`- [Port pickup](${absoluteUrl("en", "locations/port-pickup")})`);
  lines.push(`- [Contact](${absoluteUrl("en", "contact")}): WhatsApp, phone, email`);
  lines.push(`- [Book now](${SITE.bookingUrl}): Cosmicbooker reservation engine`);
  lines.push("");

  lines.push("## Fleet categories");
  lines.push("- Cars (12 models): Hyundai i10, Toyota Aygo, Fiat Panda, Fiat 500 Cabrio, Citroen C3, Kia Picanto, Peugeot 208, Suzuki Jimny 4×4, Dacia Duster, Toyota RAV4 Hybrid, Kia Sportage, Citroen Berlingo 7-seater");
  lines.push("- Scooters: 50cc (car licence accepted), 125cc, 200cc, Vespa Primavera 125");
  lines.push("- ATV / Quads: 150cc, 300cc, 500cc 4×4, 800cc 4×4");
  lines.push("- Buggies: Polaris RZR 2-seat, Polaris RZR 4-seat");
  lines.push("");

  lines.push("## Pickup zones (free delivery)");
  for (const l of LOCATIONS) lines.push(`- ${l.shortName}  -  ${l.distanceFromChoraKm} km from Chora, ~${l.pickupTimeMinutes} min`);
  lines.push("");

  lines.push("## Contact");
  lines.push(`- WhatsApp: ${SITE.phones[0]}`);
  lines.push(`- Phone: ${SITE.phones.join(", ")}`);
  lines.push(`- Email: ${SITE.email}`);
  lines.push(`- Address: ${SITE.address.locality}, ${SITE.address.region}, Greece`);
  lines.push(`- Hours: ${SITE.hours.open}–${SITE.hours.close} daily, May–October`);
  lines.push("");

  lines.push("## Optional");
  lines.push(`- [llms-full.txt](${absoluteUrl("en", "llms-full.txt").replace("/en/", "/")}): Full content dump for LLM ingestion`);
  lines.push(`- [Sitemap](${SITE.domain}/sitemap.xml)`);
  lines.push(`- Vehicles indexed: ${VEHICLES.length}. Locations indexed: ${LOCATIONS.length}. Guides indexed: ${GUIDES.length}.`);

  return new Response(lines.join("\n"), {
    headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "public, max-age=3600" },
  });
}
