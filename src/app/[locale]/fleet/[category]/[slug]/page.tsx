import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { isLocale, LOCALES, localePath, SITE, type Locale } from "@/lib/site";
import { getDict } from "@/i18n/dictionaries";
import { buildMetadata } from "@/lib/seo";
import { VEHICLES, VEHICLES_BY_SLUG } from "@/content/fleet";
import { LOCATIONS } from "@/content/locations";
import { GUIDES } from "@/content/guides";
import { FAQS } from "@/content/faqs";
import { VehicleCard } from "@/components/fleet/VehicleCard";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, graph, vehicleSchema, faqPageSchema } from "@/lib/schema";
import { ContextualFaq } from "@/components/faq/ContextualFaq";
import { TermsAndCancellation } from "@/components/legal/TermsAndCancellation";
import { whatsappUrl, whatsappVehicleMessage } from "@/lib/whatsapp";
import {
  ArrowRight, Check, Users, Fuel, Gauge, DoorOpen, Wallet,
  Sparkles, Star, Phone, ShieldCheck, MapPin, BadgeCheck, CalendarDays,
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
  pricing: string;
  whyChoose: string;
  perks: string[];
  saveBadge: (pct: number) => string;
}> = {
  en: {
    overview: "Overview",
    features: "Features & equipment",
    bestFor: "Best for",
    specs: "Specifications",
    pricing: "Daily price by season",
    whyChoose: "Why renters pick this",
    perks: ["Free delivery anywhere on Naxos", "Unlimited kilometres included", "Basic CDW insurance included", "Baby seat & 2nd driver free"],
    saveBadge: (pct: number) => `Save ${pct}% on 7+ days`,
  },
  el: {
    overview: "Επισκόπηση",
    features: "Χαρακτηριστικά & εξοπλισμός",
    bestFor: "Ιδανικό για",
    specs: "Τεχνικά χαρακτηριστικά",
    pricing: "Ημερήσια τιμή ανά σεζόν",
    whyChoose: "Γιατί το επιλέγουν",
    perks: ["Δωρεάν παράδοση παντού στη Νάξο", "Απεριόριστα χιλιόμετρα", "Βασική ασφάλεια CDW", "Παιδικό κάθισμα & 2ος οδηγός δωρεάν"],
    saveBadge: (pct: number) => `Έκπτωση ${pct}% για 7+ ημέρες`,
  },
  it: {
    overview: "Panoramica",
    features: "Caratteristiche e dotazioni",
    bestFor: "Ideale per",
    specs: "Specifiche tecniche",
    pricing: "Prezzo giornaliero per stagione",
    whyChoose: "Perché lo scelgono",
    perks: ["Consegna gratuita ovunque a Naxos", "Chilometri illimitati", "Assicurazione CDW base inclusa", "Seggiolino e 2° guidatore gratis"],
    saveBadge: (pct: number) => `Risparmia ${pct}% su 7+ giorni`,
  },
  fr: {
    overview: "Aperçu",
    features: "Caractéristiques & équipement",
    bestFor: "Idéal pour",
    specs: "Caractéristiques techniques",
    pricing: "Tarif quotidien par saison",
    whyChoose: "Pourquoi le choisir",
    perks: ["Livraison gratuite partout à Naxos", "Kilométrage illimité", "Assurance CDW de base incluse", "Siège bébé & second conducteur offerts"],
    saveBadge: (pct: number) => `Économisez ${pct}% sur 7+ jours`,
  },
  de: {
    overview: "Überblick",
    features: "Ausstattung",
    bestFor: "Ideal für",
    specs: "Technische Daten",
    pricing: "Tagespreis nach Saison",
    whyChoose: "Warum Mieter es wählen",
    perks: ["Kostenlose Lieferung auf ganz Naxos", "Unbegrenzte Kilometer", "Basis-CDW inklusive", "Kindersitz & 2. Fahrer kostenlos"],
    saveBadge: (pct: number) => `${pct}% Rabatt ab 7 Tagen`,
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
  const dict = await getDict(locale);
  return buildMetadata({
    locale,
    path: `fleet/${v.category}/${v.slug}`,
    title: `${v.name[locale]} — ${dict.common.from} €${v.priceShoulder}${dict.common.perDay}`,
    description: v.tagline[locale],
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
    cars: dict.nav.cars, scooters: dict.nav.scooters, "atv-quad": dict.nav.atvQuad,
    buggy: dict.nav.buggy, motorbike: dict.nav.motorbike,
  } as const;
  const wm = whatsappVehicleMessage(v.name[locale], locale);

  const weeklyPerDay = Math.round((v.priceWeekly / 7) * 10) / 10;
  const savePct = v.priceShoulder > 0 ? Math.max(0, Math.round((1 - weeklyPerDay / v.priceShoulder) * 100)) : 0;

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
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-gradient px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-md">
                      <BadgeCheck className="h-3.5 w-3.5" /> {navLabels[v.category]}
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-[var(--ink)] shadow-sm backdrop-blur dark:bg-[rgba(16,43,61,0.85)] dark:text-white">
                      <CalendarDays className="h-3.5 w-3.5 text-[var(--brand-2)]" /> {v.year}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick spec strip — sits visually attached under the photo on large screens */}
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
                  <p className="mt-2 text-base text-muted-foreground">{v.tagline[locale]}</p>
                  <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-[var(--sea-soft)] px-3 py-1 text-xs font-semibold text-[var(--sea)] dark:bg-white/10 dark:text-[var(--sea-soft)]">
                    <Star className="h-3.5 w-3.5 fill-[var(--brand-1)] text-[var(--brand-1)]" />
                    {SITE.rating.value}/5 · {SITE.rating.count}+ Google reviews
                  </div>
                </div>

                <div className="px-6 py-5">
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <span className="text-xs uppercase tracking-wider text-muted-foreground">{dict.common.from}</span>
                      <div className="text-5xl font-extrabold leading-none text-brand-gradient">€{v.priceShoulder}</div>
                      <span className="text-sm text-muted-foreground">{dict.common.perDay}</span>
                    </div>
                    {savePct > 0 && (
                      <span className="inline-flex items-center rounded-full border border-[var(--brand-2)]/30 bg-[var(--accent)] px-3 py-1 text-xs font-bold text-[var(--accent-foreground)] dark:bg-white/10 dark:text-[var(--brand-1)]">
                        {labels.saveBadge(savePct)}
                      </span>
                    )}
                  </div>

                  <dl className="mt-5 grid grid-cols-2 gap-2 rounded-2xl bg-secondary/60 p-3 text-sm dark:bg-white/5">
                    <div>
                      <dt className="text-xs uppercase tracking-wider text-muted-foreground">{dict.pricing.high}</dt>
                      <dd className="mt-0.5 font-semibold text-foreground">€{v.priceHigh}<span className="text-xs text-muted-foreground">{dict.common.perDay}</span></dd>
                    </div>
                    <div>
                      <dt className="text-xs uppercase tracking-wider text-muted-foreground">{dict.pricing.weekly}</dt>
                      <dd className="mt-0.5 font-semibold text-foreground">€{v.priceWeekly}<span className="text-xs text-muted-foreground">/{dict.common.week}</span></dd>
                    </div>
                  </dl>

                  <div className="mt-5 grid gap-2">
                    <a
                      href={SITE.bookingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-gradient px-5 py-3 text-sm font-bold text-white shadow-lg shadow-orange-500/25 transition-transform hover:scale-[1.01]"
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

                  <ul className="mt-5 grid gap-1.5 text-sm">
                    {labels.perks.map((p) => (
                      <li key={p} className="flex items-start gap-2 text-muted-foreground">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--brand-2)]" />
                        <span className="text-foreground">{p}</span>
                      </li>
                    ))}
                  </ul>
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
            {/* Overview */}
            <div>
              <SectionEyebrow icon={<Sparkles className="h-3.5 w-3.5" />}>{labels.overview}</SectionEyebrow>
              <h2 className="mt-2 text-2xl font-extrabold text-foreground sm:text-3xl">{v.name[locale]}</h2>
              <p className="mt-3 text-base leading-7 text-foreground/90 dark:text-foreground">
                {v.description[locale]}
              </p>
            </div>

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
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[var(--sea-soft)] text-[var(--sea)] dark:bg-white/10 dark:text-[var(--sea-soft)]">
                      <Check className="h-4 w-4" />
                    </span>
                    <span className="text-sm font-medium text-foreground">{f[locale]}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Best for */}
            <div>
              <SectionEyebrow icon={<Users className="h-3.5 w-3.5" />}>{labels.bestFor}</SectionEyebrow>
              <h3 className="mt-2 text-2xl font-bold text-foreground">{labels.bestFor}</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {v.bestFor.map((b, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 rounded-full border border-[var(--brand-2)]/30 bg-[var(--accent)] px-3 py-1.5 text-xs font-semibold text-[var(--accent-foreground)] shadow-sm dark:bg-white/10 dark:text-[var(--brand-1)]"
                  >
                    <Sparkles className="h-3 w-3" />
                    {b[locale]}
                  </span>
                ))}
              </div>
            </div>

            {/* Specs */}
            <div>
              <SectionEyebrow icon={<Gauge className="h-3.5 w-3.5" />}>{labels.specs}</SectionEyebrow>
              <h3 className="mt-2 text-2xl font-bold text-foreground">{labels.specs}</h3>
              <dl className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
                <SpecRow label={dict.common.seats} value={v.seats ? String(v.seats) : "—"} />
                <SpecRow label={dict.common.doors} value={v.doors ? String(v.doors) : "—"} />
                <SpecRow label={dict.common.transmission} value={v.transmission ? (v.transmission === "automatic" ? dict.common.automatic : dict.common.manual) : "—"} />
                <SpecRow label={dict.common.fuel} value={v.fuelType ? dict.common[v.fuelType === "gasoline" ? "gasoline" : v.fuelType] : "—"} />
                {v.engineCC && <SpecRow label="Engine" value={`${v.engineCC} cc`} />}
                <SpecRow label="Year" value={String(v.year)} />
              </dl>
            </div>

            {/* Pricing */}
            <div>
              <SectionEyebrow icon={<Wallet className="h-3.5 w-3.5" />}>{labels.pricing}</SectionEyebrow>
              <h3 className="mt-2 text-2xl font-bold text-foreground">{labels.pricing}</h3>
              <div className="mt-5 overflow-hidden rounded-3xl border border-border bg-card shadow-sm dark:bg-white/5">
                <table className="w-full text-sm">
                  <thead className="bg-[var(--sea-soft)] text-foreground dark:bg-white/10">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold">{dict.pricing.shoulder}</th>
                      <th className="px-4 py-3 text-left font-semibold">{dict.pricing.high}</th>
                      <th className="px-4 py-3 text-left font-semibold">{dict.pricing.weekly}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-border dark:border-white/10">
                      <td className="px-4 py-3 font-bold text-[var(--brand-2)]">€{v.priceShoulder}<span className="text-xs text-muted-foreground">{dict.common.perDay}</span></td>
                      <td className="px-4 py-3 font-semibold text-foreground">€{v.priceHigh}<span className="text-xs text-muted-foreground">{dict.common.perDay}</span></td>
                      <td className="px-4 py-3 font-semibold text-foreground">€{v.priceWeekly}<span className="text-xs text-muted-foreground">/{dict.common.week}</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-xs text-muted-foreground">{dict.pricing.note}</p>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="space-y-5">
            <div className="island-card rounded-3xl p-6">
              <h3 className="inline-flex items-center gap-2 text-lg font-bold text-foreground">
                <Wallet className="h-5 w-5 text-[var(--brand-2)]" /> {dict.insurance.includedTitle}
              </h3>
              <ul className="mt-3 space-y-2 text-sm">
                {dict.insurance.included.map((it) => (
                  <li key={it} className="flex items-start gap-2 text-muted-foreground">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--brand-2)]" />
                    <span className="text-foreground">{it}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={localePath(locale, "insurance")}
                className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-[var(--sea)] hover:text-[var(--brand-2)]"
              >
                {dict.common.readMore} <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="island-card rounded-3xl p-6">
              <h3 className="inline-flex items-center gap-2 text-lg font-bold text-foreground">
                <MapPin className="h-5 w-5 text-[var(--brand-2)]" /> {dict.delivery.title}
              </h3>
              <ul className="mt-3 space-y-2 text-sm">
                {LOCATIONS.slice(0, 5).map((l) => (
                  <li key={l.slug}>
                    <Link
                      href={localePath(locale, `locations/${l.slug}`)}
                      className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-[var(--sea)]"
                    >
                      <span className="text-[var(--brand-2)]">→</span> {l.shortName}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href={localePath(locale, "locations")}
                className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-[var(--sea)] hover:text-[var(--brand-2)]"
              >
                {dict.common.viewAll} <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="rounded-3xl border border-[var(--brand-2)]/30 bg-[var(--accent)] p-6 shadow-sm dark:bg-white/5">
              <ShieldCheck className="h-6 w-6 text-[var(--brand-2)]" />
              <h3 className="mt-3 text-base font-bold text-foreground">{labels.whyChoose}</h3>
              <ul className="mt-3 space-y-1.5 text-sm">
                {labels.perks.map((p) => (
                  <li key={p} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--brand-2)]" />
                    <span className="text-foreground">{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      {/* Rental terms & cancellation */}
      <section className="bg-background border-t border-border/70">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <details className="group">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 rounded-2xl border border-border/60 bg-card p-5 shadow-sm transition-colors hover:border-[var(--sea-2)]">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 shrink-0 text-[var(--brand-2)]" />
                <span className="text-base font-bold text-foreground">{dict.legal.termsTitle} &amp; {dict.legal.cancellationTitle}</span>
              </div>
              <span className="text-muted-foreground transition-transform group-open:rotate-180">
                <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5"><path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" /></svg>
              </span>
            </summary>
            <div className="mt-6">
              <TermsAndCancellation locale={locale} dict={dict} />
            </div>
          </details>
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
            {GUIDES.slice(0, 3).map((g) => (
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
    <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--sea-2)]/30 bg-[var(--sea-soft)]/70 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--sea)] shadow-sm dark:bg-white/10 dark:text-[var(--sea-soft)]">
      {icon}
      {children}
    </span>
  );
}

function SpecTile({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <li className="flex items-center gap-3 rounded-2xl border border-border bg-card px-3 py-2.5 shadow-sm dark:bg-white/5">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[var(--sea-soft)] text-[var(--sea)] dark:bg-white/10 dark:text-[var(--sea-soft)]">
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
