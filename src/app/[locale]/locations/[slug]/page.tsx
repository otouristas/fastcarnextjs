import { GUIDES_BY_SLUG } from "@/content/guides";
import { notFound } from "next/navigation";
import Link from "next/link";
import { isLocale, LOCALES, localePath, SITE } from "@/lib/site";
import { getDict } from "@/i18n/dictionaries";
import { buildMetadata } from "@/lib/seo";
import { LOCATIONS, LOCATIONS_BY_SLUG } from "@/content/locations";
import { VEHICLES } from "@/content/fleet";
import { recommendForLocation } from "@/lib/vehicleRecommender";
import { FAQS } from "@/content/faqs";
import { VehicleCard } from "@/components/fleet/VehicleCard";
import { PageMasthead } from "@/components/layout/PageMasthead";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, faqPageSchema, graph, locationPlaceSchema } from "@/lib/schema";
import { ContextualFaq } from "@/components/faq/ContextualFaq";
import { whatsappUrl } from "@/lib/whatsapp";
import { ArrowRight, MapPin, Clock, Check } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

export function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of LOCALES) for (const l of LOCATIONS) params.push({ locale, slug: l.slug });
  return params;
}

export const dynamicParams = false;

function locationImage(slug:string){
 const images:Record<string,string>={"port-pickup":"/images/pexels/naxos-chora-coast.webp","naxos-town":"/images/pexels/naxos-old-town.webp","agios-prokopios":"/images/naxos/agios-prokopios.jpg","agia-anna":"/images/naxos/agia-anna.jpg","plaka":"/images/naxos/plaka-beach.jpg","mikri-vigla":"/images/pexels/naxos-mikri-vigla.webp","apollonas":"/images/naxos/apollonas.jpg","filoti":"/images/naxos/filoti.jpg","apeiranthos":"/images/naxos/apiranthos.jpg","chalki":"/images/naxos/halki.jpg"};
 return images[slug]??"/images/naxos/landscape.jpg";
}


const TYPE_FAQ_SLUGS: Record<string, string[]> = {
  airport: ["airport-vs-port-pickup", "drop-off-different", "advance-vs-walkin", "delivery-zones", "documents-needed", "credit-card-required"],
  port: ["airport-vs-port-pickup", "drop-off-different", "insurance-ferry-day", "ferry-with-rental", "delivery-zones", "advance-vs-walkin"],
  beach: ["delivery-zones", "drop-off-different", "child-seats", "automatic-vs-manual", "automatic-availability", "best-time-to-rent"],
  village: ["4x4-needed", "chora-parking", "driving-difficulty", "speed-limits-2026", "automatic-vs-manual", "fuel-policy"],
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const loc = LOCATIONS_BY_SLUG[slug];
  if (!isLocale(locale) || !loc) return {};
  const dict = await getDict(locale);
  // Several location heroes are under 60 characters, which leaves the SERP
  // snippet mostly blank. Append the distance and the free-delivery offer.
  const description = `${loc.hero[locale]}. ${dict.trust.delivery}. ${dict.cta.bookCar}.`;

  return buildMetadata({
    locale,
    path: `locations/${slug}`,
    title: loc.name[locale],
    description,
    keywords: [
      `${loc.shortName} car rental`,
      `rent a car ${loc.shortName} Naxos`,
      `${loc.shortName} pickup Naxos`,
      `car hire ${loc.shortName}`,
    ],
  });
}

export default async function LocationPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const loc = LOCATIONS_BY_SLUG[slug];
  if (!isLocale(locale) || !loc) notFound();
  const dict = await getDict(locale);
  const nearby = LOCATIONS.filter((l) => l.slug !== loc.slug).slice(0, 6);
  const recommended = recommendForLocation(loc.slug, VEHICLES, 3);
  const faqs = (TYPE_FAQ_SLUGS[loc.type] || [])
    .map((s) => FAQS.find((f) => f.slug === s))
    .filter((f): f is (typeof FAQS)[number] => Boolean(f));

  return (
    <>
      <JsonLd data={graph([
        locationPlaceSchema(loc, locale),
        breadcrumbSchema([
          { name: dict.nav.home, url: `${SITE.domain}${localePath(locale)}` },
          { name: dict.nav.locations, url: `${SITE.domain}${localePath(locale, "locations")}` },
          { name: loc.name[locale], url: `${SITE.domain}${localePath(locale, `locations/${loc.slug}`)}` },
        ]),
        faqPageSchema(faqs, locale),
      ])} />

      <PageMasthead locale={locale} dict={dict} title={loc.name[locale]} subtitle={loc.hero[locale]} label={loc.shortName} image={locationImage(loc.slug)}>
        <div className="location-facts"><span><MapPin size={16}/>{loc.distanceFromChoraKm} km</span><span><Clock size={16}/>~{loc.pickupTimeMinutes} min</span></div>
        <div className="escape-actions"><a className="escape-button" href={SITE.bookingUrl} target="_blank" rel="noopener noreferrer">{dict.nav.bookNow}<ArrowRight size={18}/></a><a className="escape-text-link" href={whatsappUrl(dict.whatsAppFab.message)} target="_blank" rel="noopener noreferrer"><WhatsAppIcon className="h-5 w-5"/>{dict.cta.whatsappQuote}</a></div>
      </PageMasthead>

      <section className="bg-background border-y border-border/70">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 grid lg:grid-cols-3 gap-10">
          <article className="lg:col-span-2 space-y-6">
            <p className="text-lg leading-relaxed text-[var(--ink)] dark:text-white">{loc.body[locale]}</p>
            <ul className="grid gap-3 sm:grid-cols-2">
              {loc.highlights.map((h, i) => (
                <li key={i} className="island-card flex items-start gap-2 rounded-2xl p-4">
                  <Check className="mt-0.5 h-4 w-4 text-[var(--brand-2)]" />
                  <span className="text-sm text-[var(--ink)] dark:text-white">{h[locale]}</span>
                </li>
              ))}
            </ul>
          </article>
          <aside className="space-y-6">
            <div className="island-card rounded-3xl p-6">
              <h3 className="text-lg font-bold text-[var(--ink)] dark:text-white">{dict.delivery.title}</h3>
              <ul className="mt-4 space-y-2 text-sm">
                {nearby.map((n) => (
                  <li key={n.slug}>
                    <Link href={localePath(locale, `locations/${n.slug}`)} className="text-[var(--prose-body)] hover:text-[var(--link)]">
                      → {n.shortName}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="island-card rounded-3xl p-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--link)]">{dict.nav.guides}</h3>
              <ul className="mt-3 space-y-2 text-xs font-semibold">
                <li>
                  <Link href={localePath(locale, "guides/naxos-rent-a-car-prices-cost-breakdown")} className="text-[var(--ink)] hover:text-[var(--link)] dark:text-white">
                    {GUIDES_BY_SLUG["naxos-rent-a-car-prices-cost-breakdown"].title[locale]}
                  </Link>
                </li>
                <li>
                  <Link href={localePath(locale, "guides/naxos-car-rental-without-credit-card-insurance")} className="text-[var(--ink)] hover:text-[var(--link)] dark:text-white">
                    {GUIDES_BY_SLUG["naxos-car-rental-without-credit-card-insurance"].title[locale]}
                  </Link>
                </li>
                <li>
                  <Link href={localePath(locale, "guides/rent-a-car-naxos-port-vs-airport-pickup-guide")} className="text-[var(--ink)] hover:text-[var(--link)] dark:text-white">
                    {GUIDES_BY_SLUG["rent-a-car-naxos-port-vs-airport-pickup-guide"].title[locale]}
                  </Link>
                </li>
                <li>
                  <Link href={localePath(locale, "guides/best-car-rental-naxos-reviews-comparison")} className="text-[var(--ink)] hover:text-[var(--link)] dark:text-white">
                    {GUIDES_BY_SLUG["best-car-rental-naxos-reviews-comparison"].title[locale]}
                  </Link>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </section>

      {recommended.length > 0 && (
        <section className="bg-sand dark:bg-[var(--background)]">
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-extrabold text-[var(--ink)] dark:text-white sm:text-3xl">
              {dict.naxos.bestVehicleFor} {loc.shortName}
            </h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {recommended.map(({ vehicle, reason }) => (
                <div key={vehicle.slug} className="relative">
                  <div className="recommendation-note">{reason[locale]}</div>
                  <VehicleCard vehicle={vehicle} locale={locale} dict={dict} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <ContextualFaq faqs={faqs} locale={locale} dict={dict} />
    </>
  );
}
