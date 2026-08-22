import { notFound } from "next/navigation";
import Link from "next/link";
import { isLocale, LOCALES, localePath, SITE, type Locale } from "@/lib/site";
import { getDict } from "@/i18n/dictionaries";
import { buildMetadata } from "@/lib/seo";
import { VEHICLES } from "@/content/fleet";
import { VehicleCard } from "@/components/fleet/VehicleCard";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, graph, qaPageSchema } from "@/lib/schema";
import { whatsappUrl } from "@/lib/whatsapp";
import { ArrowRight, Info, Wind } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

/**
 * This URL is the single highest-traffic page on the site (100 clicks / 2,800
 * impressions a quarter) and was left returning 404 when the fleet went
 * cars-only. Rather than throwing that away or 301-ing it into an unrelated
 * page, the URL is retained as an honest editorial answer to the query: it says
 * in the first paragraph that we rent cars only, genuinely answers what people
 * searching "scooter rental Naxos" need to know, and routes to the car fleet.
 */
export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export const dynamicParams = false;

const TITLE = "Scooter rental in Naxos 2026: licence rules, costs and when a car wins";
const DESCRIPTION =
  "Licence categories, meltemi wind risk, real prices and mountain roads. An honest guide from a Naxos rental company that rents cars, not scooters.";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return buildMetadata({
    locale,
    path: "fleet/scooters",
    title: TITLE,
    description: DESCRIPTION,
    keywords: [
      "naxos scooter rental",
      "scooter rental naxos",
      "rent scooter naxos",
      "naxos moped rental",
      "scooter hire naxos",
      "naxos scooter rental prices",
    ],
  });
}

const FAQ: { q: string; a: string }[] = [
  {
    q: "Does Fast Motor Rental Naxos rent scooters?",
    a: "No. We rent cars only. We used to run scooters, ATVs and buggies and stopped deliberately — on an island this windy, with long unlit mountain roads, the injury rate on open vehicles was not something we wanted to be part of. If you want a scooter, rent from a specialist operator who maintains them properly.",
  },
  {
    q: "What licence do you need for a scooter in Naxos?",
    a: "A 50cc scooter needs at least category AM. EU car licences issued from 2013 onwards normally carry AM automatically, but older licences and many non-EU licences do not. Anything above 50cc — including every 125cc you would actually want on Naxos hills — requires category A1 or higher. Renting on the wrong category voids the insurance completely.",
  },
  {
    q: "How much does scooter rental cost in Naxos?",
    a: "Indicatively €20–30 a day for a 50cc and €30–45 for a 125cc in shoulder season, rising in July and August. A small car is roughly €30–45 shoulder and €45–70 peak, so the gap is smaller than most people assume once two people are travelling.",
  },
  {
    q: "Is it safe to ride a scooter in Naxos?",
    a: "It depends heavily on when and where. The paved west-coast road in June is fine for an experienced rider. The same road in August with 6–7 Beaufort of meltemi is genuinely dangerous, and the mountain route to Apeiranthos and Apollonas is long, unlit and full of switchbacks. Naxos sits in the windiest corridor of the Cyclades, which is the factor visitors most consistently underestimate.",
  },
  {
    q: "Can a scooter reach all the Naxos beaches?",
    a: "It reaches the same paved car parks a car does — Agios Prokopios, Agia Anna, Plaka, Mikri Vigla, Alyko. The soft-sand tracks beyond those car parks are excluded from every rental agreement on Naxos, for scooters, ATVs and cars alike. Nothing legally goes further than the signed parking.",
  },
  {
    q: "Scooter or car in Naxos?",
    a: "A scooter suits two people travelling light, on a coastal itinerary, in calm weather, with the right licence. A car suits everyone else — luggage, children, mountain villages, air conditioning, night driving and any day the meltemi is up. Most visitors staying four nights or more end up wanting the car.",
  },
];

export default async function ScooterRentalNaxosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const loc = locale as Locale;
  const dict = await getDict(loc);
  const alternatives = VEHICLES.filter((v) =>
    ["hyundai-i10", "toyota-aygo", "fiat-panda"].includes(v.slug),
  );

  return (
    <>
      <JsonLd
        data={graph([
          qaPageSchema(FAQ),
          breadcrumbSchema([
            { name: dict.nav.home, url: `${SITE.domain}${localePath(loc)}` },
            { name: dict.nav.fleet, url: `${SITE.domain}${localePath(loc, "fleet")}` },
            { name: "Scooter rental", url: `${SITE.domain}${localePath(loc, "fleet/scooters")}` },
          ]),
        ])}
      />

      <section className="wave-bg border-b border-border">
        <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
          <Breadcrumbs
            label={dict.common.breadcrumb}
            items={[
              { label: dict.nav.home, href: localePath(loc) },
              { label: dict.nav.fleet, href: localePath(loc, "fleet") },
              { label: "Scooter rental" },
            ]}
          />
          <h1 className="mt-5 text-3xl font-extrabold leading-[1.1] tracking-tight text-[var(--prose-heading)] sm:text-4xl lg:text-5xl">
            {TITLE}
          </h1>

          {/* The disclosure comes first, before any advice. */}
          <div className="answer-block mt-6 flex gap-4 rounded-3xl p-6 sm:p-7">
            <Info className="mt-0.5 h-5 w-5 flex-none text-[var(--sea)]" />
            <p className="editorial-lead text-[var(--prose-heading)]">
              <strong>Fast Motor Rental Naxos rents cars only.</strong> We ran scooters,
              ATVs and buggies for years and stopped deliberately. This page is not a
              product listing — it is what we tell guests who ask us about scooters, and
              it is honest about when one is the right call.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto max-w-4xl space-y-10 px-4 py-14 sm:px-6 lg:px-8">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight text-[var(--prose-heading)]">
              Why we stopped renting two-wheelers
            </h2>
            <p className="editorial mt-3 max-w-[68ch]">
              Naxos sits in the windiest corridor of the Cyclades. Between mid-July and
              late August the meltemi routinely blows 6–7 Beaufort for days at a time, and
              the exposed west-coast road from Agios Prokopios down to Pyrgaki — the road
              every visitor uses to reach the beaches — is the worst of it. On a 125cc
              carrying two people and a beach bag, a sustained crosswind of that strength
              is frightening and objectively dangerous. Add unlit mountain roads, goats,
              and riders on holiday who have not been on two wheels since last summer, and
              the pattern became clear enough that we took the decision. We would rather
              lose the booking.
            </p>
          </div>

          <div className="island-card flex gap-4 rounded-3xl p-6">
            <Wind className="mt-0.5 h-5 w-5 flex-none text-[var(--sea)]" />
            <div>
              <h3 className="font-bold text-[var(--prose-heading)]">
                Check the wind before you book anything
              </h3>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">
                If your dates fall between 15 July and 25 August, look at a wind forecast
                for Naxos before deciding. Under 5 Beaufort, a scooter on the coastal road
                is pleasant. Over 6, it is not, and there is nowhere on the west coast to
                escape it.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-extrabold tracking-tight text-[var(--prose-heading)]">
              The licence rules, accurately
            </h2>
            <p className="editorial mt-3 max-w-[68ch]">
              This is where most of the misinformation online sits. In Greece a 50cc
              scooter requires at least an AM category entitlement. A full car licence
              issued in an EU country from 2013 onwards normally carries AM automatically,
              but older licences and many non-EU licences do not. Anything above 50cc —
              which includes every 125cc you would actually want for the hills here —
              requires category A1 or higher. Renting on the wrong category is not a
              technicality: it voids the insurance completely, so a single slide on gravel
              becomes a bill you pay in full. Non-EU licence holders also need an
              International Driving Permit alongside the home licence.
            </p>
            <Link
              href={localePath(loc, "guides/idp-greece-rules")}
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-[var(--link)] underline underline-offset-2 hover:text-[var(--link-hover)]"
            >
              Read the full IDP rules by country <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div>
            <h2 className="text-2xl font-extrabold tracking-tight text-[var(--prose-heading)]">
              Where a scooter genuinely makes sense
            </h2>
            <p className="editorial mt-3 max-w-[68ch]">
              Two people travelling with a daypack each, staying in or near Chora, with a
              coastal itinerary — Agios Prokopios, Agia Anna, Plaka — in June or September
              when the wind has eased. Parking in Chora in August is genuinely difficult
              for a car and trivial for a scooter, which is a real advantage we are not
              going to pretend away. If that describes your trip and you hold the right
              licence, rent from a specialist operator who services their fleet properly,
              and wear the helmet.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-extrabold tracking-tight text-[var(--prose-heading)]">
              Where it does not
            </h2>
            <p className="editorial mt-3 max-w-[68ch]">
              Apeiranthos, Apollonas and the Tragea. The climb to Apeiranthos is 25 minutes
              of continuous switchbacks; Apollonas is an hour each way on a road that is
              single-lane in places with no lighting and no barrier. A 50cc will not hold a
              reasonable speed on those gradients, and a 125cc with a pillion is working
              hard. Add luggage, children, a forecast with any weather in it, or an arrival
              after dark, and the answer is a car. That is also, not coincidentally, half of
              what makes Naxos worth visiting.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-sand dark:bg-[var(--background)]">
        <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold tracking-tight text-[var(--prose-heading)]">
            Common questions
          </h2>
          <dl className="mt-8 divide-y divide-[var(--prose-rule)]">
            {FAQ.map((item) => (
              <div key={item.q} className="py-6 first:pt-0">
                <dt className="text-base font-bold text-[var(--prose-heading)]">{item.q}</dt>
                <dd className="mt-2 max-w-[68ch] text-[0.95rem] leading-7 text-[var(--prose-body)]">{item.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold tracking-tight text-[var(--prose-heading)]">
            What we do rent
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Small, easy-to-park cars from €{Math.min(...alternatives.map((v) => v.priceShoulder))}/day
            with free delivery to the port, the airport or your hotel.
          </p>
          <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {alternatives.map((v) => (
              <VehicleCard key={v.slug} vehicle={v} locale={loc} dict={dict} />
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={localePath(loc, "fleet/cars")}
              className="inline-flex items-center gap-2 rounded-full bg-brand-gradient px-6 py-3 text-sm font-bold text-white transition hover:brightness-110"
            >
              {dict.cta.seeFleet} <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={whatsappUrl(dict.whatsAppFab.message)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-bold text-[var(--ink)] transition hover:border-[var(--sea)] hover:text-[var(--sea)] dark:text-white"
            >
              <WhatsAppIcon className="h-4 w-4" /> {dict.cta.whatsappQuote}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
