import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { isLocale, LOCALES, localePath, SITE, type Locale } from "@/lib/site";
import { getDict } from "@/i18n/dictionaries";
import { buildMetadata } from "@/lib/seo";
import { VEHICLES, VEHICLES_BY_SLUG } from "@/content/fleet";
import { INDEXABLE_GUIDES } from "@/content/guides";
import { FAQS } from "@/content/faqs";
import { VehicleCard } from "@/components/fleet/VehicleCard";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, graph, vehicleSchema, faqPageSchema } from "@/lib/schema";
import { ContextualFaq } from "@/components/faq/ContextualFaq";
import { whatsappUrl, whatsappVehicleMessage } from "@/lib/whatsapp";
import {
  ArrowRight, Check, Users, Fuel, Gauge, DoorOpen,
  Phone, BadgeCheck, CalendarDays,
} from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

/* -------------------------------------------------------------------------- */
/* Localised UI labels (only used here so we don't bloat the global dict)     */
/* -------------------------------------------------------------------------- */

const VEHICLE_LABELS: Record<Locale, {
  overview: string;
  features: string;
  bestFor: string;
  specs: string;
  whyChoose: string;
}> = {
  en: {
    overview: "Overview",
    features: "Features & equipment",
    bestFor: "Best for",
    specs: "Specifications",
    whyChoose: "Why renters pick this",
  },
  el: {
    overview: "Επισκόπηση",
    features: "Χαρακτηριστικά & εξοπλισμός",
    bestFor: "Ιδανικό για",
    specs: "Τεχνικά χαρακτηριστικά",
    whyChoose: "Γιατί το επιλέγουν",
  },
  it: {
    overview: "Panoramica",
    features: "Caratteristiche e dotazioni",
    bestFor: "Ideale per",
    specs: "Specifiche tecniche",
    whyChoose: "Perché lo scelgono",
  },
  fr: {
    overview: "Aperçu",
    features: "Caractéristiques & équipement",
    bestFor: "Idéal pour",
    specs: "Caractéristiques techniques",
    whyChoose: "Pourquoi le choisir",
  },
  de: {
    overview: "Überblick",
    features: "Ausstattung",
    bestFor: "Ideal für",
    specs: "Technische Daten",
    whyChoose: "Warum Mieter es wählen",
  },
};

/* -------------------------------------------------------------------------- */

export function generateStaticParams() {
  const params: { locale: string; category: string; slug: string }[] = [];
  for (const locale of LOCALES) for (const v of VEHICLES) params.push({ locale, category: v.category, slug: v.slug });
  return params;
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ locale: string; category: string; slug: string }> }) {
  const { locale, slug } = await params;
  const v = VEHICLES_BY_SLUG[slug];
  if (!isLocale(locale) || !v) return {};
  return buildMetadata({
    locale,
    path: `fleet/${v.category}/${v.slug}`,
    title: v.name[locale],
    description: SITE.tagline[locale],
    image: v.image,
    type: "product",
    keywords: [`${v.brand} ${v.model} naxos`, `rent ${v.brand} ${v.model} naxos`, "naxos rental"],
  });
}

export default async function VehiclePage({ params }: { params: Promise<{ locale: string; category: string; slug: string }> }) {
  const { locale, category, slug } = await params;
  const v = VEHICLES_BY_SLUG[slug];
  if (!isLocale(locale) || !v || v.category !== category) notFound();
  const dict = await getDict(locale);
  const labels = VEHICLE_LABELS[locale];
  const related = VEHICLES.filter((x) => x.category === v.category && x.slug !== v.slug).slice(0, 3);
  const categoryFaqs = FAQS.filter((f) => f.category === "vehicles" || f.category === "insurance" || f.category === "documents").slice(0, 6);
  const navLabels = {
    cars: dict.nav.cars,
  } as const;
  const wm = whatsappVehicleMessage(v.name[locale], locale);

  return (
    <>
      <JsonLd data={graph([
        vehicleSchema(v, locale),
        breadcrumbSchema([
          { name: dict.nav.home, url: `${SITE.domain}${localePath(locale)}` },
          { name: dict.nav.fleet, url: `${SITE.domain}${localePath(locale, "fleet")}` },
          { name: navLabels[v.category], url: `${SITE.domain}${localePath(locale, `fleet/${v.category}`)}` },
          { name: v.name[locale], url: `${SITE.domain}${localePath(locale, `fleet/${v.category}/${v.slug}`)}` },
        ]),
        faqPageSchema(categoryFaqs, locale),
      ])} />

      {/* HERO */}
      <section className="wave-bg border-b border-border/70">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          <Breadcrumbs label={dict.common.breadcrumb} items={[
            { label: dict.nav.home, href: localePath(locale) },
            { label: dict.nav.fleet, href: localePath(locale, "fleet") },
            { label: navLabels[v.category], href: localePath(locale, `fleet/${v.category}`) },
            { label: v.name[locale] },
          ]} />

          <div className="mt-8 grid items-start gap-10 lg:grid-cols-12">
            {/* Image */}
            <div className="lg:col-span-7">
              <div className="relative aspect-[16/11] overflow-hidden rounded-[2rem] shadow-[0_30px_80px_-30px_rgba(15,37,51,0.45)] island-card">
                <div className="absolute inset-0 animate-kenburns">
                  <Image
                    src={v.image}
                    alt={v.name[locale]}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover"
                  />
                </div>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[rgba(15,37,51,0.55)] via-transparent to-transparent p-5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-gradient px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-md" style={{ boxShadow: '0 4px 12px rgba(0,119,182,0.25)' }}>
                      <BadgeCheck className="h-3.5 w-3.5" /> {navLabels[v.category]}
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-[var(--ink)] shadow-sm backdrop-blur dark:bg-[rgba(16,43,61,0.85)] dark:text-white">
                      <CalendarDays className="h-3.5 w-3.5 text-[var(--brand-2)]" /> {v.year}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick spec strip  -  sits visually attached under the photo on large screens */}
              <ul className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {v.seats != null && <SpecTile icon={<Users className="h-4 w-4" />} label={dict.common.seats} value={String(v.seats)} />}
                {v.doors != null && <SpecTile icon={<DoorOpen className="h-4 w-4" />} label={dict.common.doors} value={String(v.doors)} />}
                {v.transmission && <SpecTile icon={<Gauge className="h-4 w-4" />} label={dict.common.transmission} value={v.transmission === "automatic" ? dict.common.automatic : dict.common.manual} />}
                {v.fuelType && <SpecTile icon={<Fuel className="h-4 w-4" />} label={dict.common.fuel} value={dict.common[v.fuelType === "gasoline" ? "gasoline" : v.fuelType]} />}
              </ul>
            </div>

            {/* Booking / price card */}
            <div className="lg:col-span-5 lg:sticky lg:top-28">
              <div className="island-card overflow-hidden rounded-[2rem]">
                <div className="border-b border-border/70 px-6 pt-6 pb-5 dark:border-white/10">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--brand-2)]">
                    {v.brand} {v.model} · {v.year}
                  </p>
                  <h1 className="mt-2 text-3xl font-extrabold leading-tight tracking-tight text-foreground sm:text-4xl">
                    {v.name[locale]}
                  </h1>
                </div>

                <div className="px-6 py-5">
                  <div className="grid gap-2">
                    <a
                      href={SITE.bookingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-gradient px-5 py-3 text-sm font-bold text-white shadow-lg transition-transform hover:scale-[1.01]" style={{ boxShadow: '0 4px 20px rgba(0,119,182,0.25)' }}
                    >
                      {dict.cta.bookCar} <ArrowRight className="h-4 w-4" />
                    </a>
                    <div className="grid grid-cols-2 gap-2">
                      <a
                        href={whatsappUrl(wm)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card px-3 py-3 text-sm font-bold text-foreground shadow-sm hover:border-[var(--sea-2)] hover:text-[var(--sea)] dark:bg-white/10"
                      >
                        <WhatsAppIcon className="h-5 w-5" /> {dict.nav.whatsapp}
                      </a>
                      <a
                        href={`tel:${SITE.phones[0]}`}
                        className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card px-3 py-3 text-sm font-bold text-foreground shadow-sm hover:border-[var(--sea-2)] hover:text-[var(--sea)] dark:bg-white/10"
                      >
                        <Phone className="h-4 w-4 text-[var(--brand-2)]" /> {dict.nav.call}
                      </a>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BODY */}
      <section className="bg-background">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-3 lg:px-8">
          <article className="space-y-12 lg:col-span-2">
            {/* Features */}
            <div>
              <SectionEyebrow icon={<BadgeCheck className="h-3.5 w-3.5" />}>{labels.features}</SectionEyebrow>
              <h3 className="mt-2 text-2xl font-bold text-foreground">{labels.features}</h3>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {v.features.map((f, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm transition-colors hover:border-[var(--sea-2)]/40 dark:bg-white/5"
                  >
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[var(--sea-soft)] text-[var(--sea)] dark:bg-white/10 dark:text-[var(--sea-2)]">
                      <Check className="h-4 w-4" />
                    </span>
                    <span className="text-sm font-medium text-foreground">{f[locale]}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Specs */}
            <div>
              <SectionEyebrow icon={<Gauge className="h-3.5 w-3.5" />}>{labels.specs}</SectionEyebrow>
              <h3 className="mt-2 text-2xl font-bold text-foreground">{labels.specs}</h3>
              <dl className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
                <SpecRow label={dict.common.seats} value={v.seats ? String(v.seats) : " - "} />
                <SpecRow label={dict.common.doors} value={v.doors ? String(v.doors) : " - "} />
                <SpecRow label={dict.common.transmission} value={v.transmission ? (v.transmission === "automatic" ? dict.common.automatic : dict.common.manual) : " - "} />
                <SpecRow label={dict.common.fuel} value={v.fuelType ? dict.common[v.fuelType === "gasoline" ? "gasoline" : v.fuelType] : " - "} />
                {v.engineCC && <SpecRow label="Engine" value={`${v.engineCC} cc`} />}
                <SpecRow label="Year" value={String(v.year)} />
              </dl>
            </div>

          </article>

          {/* Sidebar */}
          <aside className="space-y-5">
            <div className="rounded-3xl border border-[var(--brand-2)]/30 bg-[var(--accent)] p-6 shadow-sm dark:bg-white/5">
              <h3 className="mt-3 text-base font-bold text-foreground">{labels.whyChoose}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{SITE.tagline[locale]}</p>
            </div>
          </aside>
        </div>
      </section>

      {/* Related vehicles */}
      <section className="bg-sand dark:bg-[var(--background)]">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-3">
            <h2 className="text-2xl font-extrabold text-foreground sm:text-3xl">{dict.common.relatedVehicles}</h2>
            <Link href={localePath(locale, `fleet/${v.category}`)} className="inline-flex items-center gap-1 text-sm font-bold text-[var(--sea)] hover:text-[var(--brand-2)]">
              {dict.common.viewAll} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => <VehicleCard key={r.slug} vehicle={r} locale={locale} dict={dict} />)}
          </div>
        </div>
      </section>

      <ContextualFaq faqs={categoryFaqs} locale={locale} dict={dict} />

      <section className="bg-background border-t border-border/70">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold text-foreground sm:text-3xl">{dict.common.relatedArticles}</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {INDEXABLE_GUIDES.slice(0, 3).map((g) => (
              <Link
                key={g.slug}
                href={localePath(locale, `guides/${g.slug}`)}
                className="island-card group rounded-3xl p-6 transition-transform hover:-translate-y-1"
              >
                <h3 className="font-bold text-foreground">{g.title[locale]}</h3>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{g.excerpt[locale]}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-[var(--sea)]">
                  {dict.common.readArticle} <ArrowRight className="h-3 w-3" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* Subcomponents                                                              */
/* -------------------------------------------------------------------------- */

function SectionEyebrow({ children, icon }: { children: React.ReactNode; icon: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--sea-2)]/30 bg-[var(--sea-soft)]/70 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--sea)] shadow-sm dark:bg-white/10 dark:text-[var(--sea-2)]">
      {icon}
      {children}
    </span>
  );
}

function SpecTile({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <li className="flex items-center gap-3 rounded-2xl border border-border bg-card px-3 py-2.5 shadow-sm dark:bg-white/5">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[var(--sea-soft)] text-[var(--sea)] dark:bg-white/10 dark:text-[var(--sea-2)]">
        {icon}
      </span>
      <span className="min-w-0">
        <span className="block text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">{label}</span>
        <span className="block truncate text-sm font-semibold text-foreground">{value}</span>
      </span>
    </li>
  );
}

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card px-4 py-3 shadow-sm dark:bg-white/5">
      <dt className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">{label}</dt>
      <dd className="mt-1 text-sm font-semibold text-foreground">{value}</dd>
    </div>
  );
}
