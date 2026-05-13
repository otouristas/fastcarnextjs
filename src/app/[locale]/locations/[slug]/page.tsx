import { notFound } from "next/navigation";
import Link from "next/link";
import { isLocale, LOCALES, localePath, SITE } from "@/lib/site";
import { getDict } from "@/i18n/dictionaries";
import { buildMetadata } from "@/lib/seo";
import { LOCATIONS, LOCATIONS_BY_SLUG } from "@/content/locations";
import { VEHICLES } from "@/content/fleet";
import { FAQS } from "@/content/faqs";
import { VehicleCard } from "@/components/fleet/VehicleCard";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, faqPageSchema, graph, locationPlaceSchema } from "@/lib/schema";
import { ContextualFaq } from "@/components/faq/ContextualFaq";
import { whatsappUrl } from "@/lib/whatsapp";
import { ArrowRight, MapPin, Clock, Check, MessageCircle, Plane, Anchor, Mountain, Sparkles } from "lucide-react";

export function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of LOCALES) for (const l of LOCATIONS) params.push({ locale, slug: l.slug });
  return params;
}

export const dynamicParams = false;

const TYPE_ICON = {
  airport: <Plane className="h-6 w-6" />,
  port: <Anchor className="h-6 w-6" />,
  beach: <MapPin className="h-6 w-6" />,
  village: <Mountain className="h-6 w-6" />,
} as const;

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
  return buildMetadata({
    locale,
    path: `locations/${slug}`,
    title: loc.name[locale],
    description: loc.hero[locale],
    keywords: [
      `${loc.shortName} car rental`,
      `rent a car ${loc.shortName} Naxos`,
      `${loc.shortName} pickup Naxos`,
    ],
  });
}

export default async function LocationPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const loc = LOCATIONS_BY_SLUG[slug];
  if (!isLocale(locale) || !loc) notFound();
  const dict = await getDict(locale);
  const nearby = LOCATIONS.filter((l) => l.slug !== loc.slug).slice(0, 6);
  const vehicles = VEHICLES.filter((v) => loc.nearbyVehicles.includes(v.category)).slice(0, 4);
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

      <section className="wave-bg border-b border-border/70">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <Breadcrumbs label={dict.common.breadcrumb} items={[
            { label: dict.nav.home, href: localePath(locale) },
            { label: dict.nav.locations, href: localePath(locale, "locations") },
            { label: loc.shortName },
          ]} />
          <div className="mt-6 grid items-end gap-10 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <span className="inline-flex items-center gap-2 rounded-full border border-[var(--sea-2)]/30 bg-white/70 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-[var(--sea)] shadow-sm dark:bg-white/10 dark:text-[var(--sea-soft)]">
                <Sparkles className="h-4 w-4" /> {dict.hero.eyebrow}
              </span>
              <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-[var(--ink)] dark:text-white sm:text-5xl">
                {loc.name[locale]}
              </h1>
              <p className="mt-3 max-w-3xl text-lg text-muted-foreground">{loc.hero[locale]}</p>
              <div className="mt-5 flex flex-wrap items-center gap-2 text-sm">
                <span className="inline-flex items-center gap-1 rounded-full bg-white/80 px-3 py-1 font-semibold text-[var(--ink)] shadow-sm dark:bg-white/10 dark:text-white">
                  <MapPin className="h-4 w-4 text-[var(--brand-2)]" /> {loc.distanceFromChoraKm} km
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-white/80 px-3 py-1 font-semibold text-[var(--ink)] shadow-sm dark:bg-white/10 dark:text-white">
                  <Clock className="h-4 w-4 text-[var(--brand-2)]" /> ~{loc.pickupTimeMinutes} min
                </span>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <a href={SITE.bookingUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-brand-gradient px-6 py-3 text-sm font-bold text-white shadow-lg shadow-orange-500/20">
                  {dict.nav.bookNow} <ArrowRight className="h-4 w-4" />
                </a>
                <a href={whatsappUrl(dict.whatsAppFab.message)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-border bg-white/70 px-6 py-3 text-sm font-bold text-[var(--ink)] shadow-sm hover:border-[var(--sea-2)] dark:bg-white/10 dark:text-white">
                  <MessageCircle className="h-4 w-4 text-[#25D366]" /> {dict.cta.whatsappQuote}
                </a>
              </div>
            </div>
            <div className="lg:col-span-4">
              <div className="island-card rounded-[2rem] p-5">
                <div className="rounded-[1.5rem] sea-gradient p-6 text-white">
                  {TYPE_ICON[loc.type]}
                  <p className="mt-4 text-sm uppercase tracking-[0.2em] text-white/80">{loc.shortName}</p>
                  <p className="mt-1 text-3xl font-extrabold leading-tight">{loc.distanceFromChoraKm} km</p>
                  <p className="text-sm text-white/85">~{loc.pickupTimeMinutes} {dict.common.days === "ημέρες" ? "λεπτά" : "min"}</p>
                </div>
                <ul className="mt-4 grid gap-2 rounded-3xl bg-white/70 p-4 text-sm dark:bg-white/10">
                  {loc.highlights.slice(0, 4).map((h, i) => (
                    <li key={i} className="flex items-start gap-2 text-[var(--ink)] dark:text-white">
                      <Check className="mt-0.5 h-4 w-4 text-[var(--sea)]" />
                      <span>{h[locale]}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

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
          <aside className="island-card h-fit rounded-3xl p-6">
            <h3 className="text-lg font-bold text-[var(--ink)] dark:text-white">{dict.delivery.title}</h3>
            <ul className="mt-4 space-y-2 text-sm">
              {nearby.map((n) => (
                <li key={n.slug}>
                  <Link href={localePath(locale, `locations/${n.slug}`)} className="text-muted-foreground hover:text-[var(--sea)]">
                    → {n.shortName}
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      {vehicles.length > 0 && (
        <section className="bg-sand dark:bg-[var(--background)]">
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-[var(--ink)] dark:text-white">{dict.common.relatedVehicles}</h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {vehicles.map((v) => <VehicleCard key={v.slug} vehicle={v} locale={locale} dict={dict} />)}
            </div>
          </div>
        </section>
      )}

      <ContextualFaq faqs={faqs} locale={locale} dict={dict} />
    </>
  );
}
