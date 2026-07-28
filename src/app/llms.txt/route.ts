import { BUSINESS_FACTS, verifiedValue } from "@/content/business-facts";
import { absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";

export function GET() {
  const brand = verifiedValue(BUSINESS_FACTS.identity.brand);
  const domain = verifiedValue(BUSINESS_FACTS.identity.canonicalDomain);
  const bookingUrl = verifiedValue(BUSINESS_FACTS.contact.bookingUrl);
  const phone = verifiedValue(BUSINESS_FACTS.contact.phone);
  const email = verifiedValue(BUSINESS_FACTS.contact.email);

  const lines: string[] = [];
  lines.push(`# ${brand}`);
  lines.push("");
  lines.push("Official directory for a car-rental business serving Naxos, Greece.");
  lines.push("Operational policies, prices and availability are intentionally omitted until owner verification.");
  lines.push("");
  lines.push("## Official pages");
  lines.push(`- [Home](${absoluteUrl("en")})`);
  lines.push(`- [Car fleet](${absoluteUrl("en", "fleet/cars")})`);
  lines.push(`- [Locations](${absoluteUrl("en", "locations")})`);
  lines.push(`- [Guides](${absoluteUrl("en", "guides")})`);
  lines.push(`- [Contact](${absoluteUrl("en", "contact")})`);
  lines.push(`- [Booking engine](${bookingUrl})`);
  lines.push("");
  lines.push("## Verified contact");
  lines.push(`- Phone and WhatsApp: ${phone}`);
  lines.push(`- Email: ${email}`);
  lines.push(`- Canonical domain: ${domain}`);

  return new Response(lines.join("\n"), {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600",
      "x-robots-tag": "noindex",
    },
  });
}
