import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { isLocale, localePath, SITE } from "@/lib/site";
import { getDict } from "@/i18n/dictionaries";
import { seoFor } from "@/lib/seo";
import { VEHICLES, vehiclesByCategory } from "@/content/fleet";
import { LOCATIONS } from "@/content/locations";
import { GUIDES } from "@/content/guides";
import { FAQS } from "@/content/faqs";
import { REVIEWS } from "@/content/reviews";
import { VehicleCard } from "@/components/fleet/VehicleCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { ContextualFaq } from "@/components/faq/ContextualFaq";
import { graph, faqPageSchema, breadcrumbSchema } from "@/lib/schema";
import { whatsappUrl } from "@/lib/whatsapp";
import {
  ArrowRight, Star, MapPin, Plane, Anchor, MessageCircle, ShieldCheck, Wallet, Clock, Sparkles,
  Car as CarIcon, Bike, Mountain, Zap, Truck, ThumbsUp, BadgeCheck, ChevronDown,
} from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return seoFor("home", locale, "");
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDict(locale);

  const featuredCars = vehiclesByCategory("cars").slice(0, 4);
  const featuredOther = [
    ...vehiclesByCategory("scooters").slice(0, 1),
    ...vehiclesByCategory("atv-quad").slice(0, 1),
    ...vehiclesByCategory("buggy").slice(0, 1),
    ...vehiclesByCategory("scooters").slice(2, 3),
  ];
  const heroFaqs = FAQS.slice(0, 6);

  return (
    <>
      <JsonLd
        data={graph([
          faqPageSchema(heroFaqs, locale),
          breadcrumbSchema([{ name: dict.nav.home, url: `${SITE.domain}${localePath(locale)}` }]),
        ])}
      />

      {/* HERO */}
      <section className="relative ember-bg overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-60 pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-24 lg:pt-24 lg:pb-32">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-2 rounded-full border border-[var(--sea-2)]/30 bg-white/70 px-3 py-1 text-xs font-bold text-[var(--sea)] shadow-sm backdrop-blur dark:bg-white/10 dark:text-white">
                <Sparkles className="h-3.5 w-3.5 text-[var(--brand-1)]" />
                {dict.hero.eyebrow}
              </span>
              <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.05] text-[var(--ink)] dark:text-white">
                {dict.hero.title.split(" ").map((w, i, arr) => (
                  <span key={i}>
                    {i === arr.length - 1 ? <span className="text-brand-gradient">{w}</span> : w}
                    {i < arr.length - 1 ? " " : ""}
                  </span>
                ))}
              </h1>
              <p className="mt-5 text-lg text-muted-foreground max-w-2xl">{dict.hero.subtitle}</p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href={localePath(locale, "fleet")}
                  className="inline-flex items-center gap-2 rounded-full bg-brand-gradient px-6 py-3 text-sm font-bold text-white glow-brand"
                >
                  {dict.hero.ctaPrimary} <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href={whatsappUrl(dict.whatsAppFab.message)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-white/70 px-6 py-3 text-sm font-bold text-[var(--ink)] shadow-sm hover:border-[var(--sea-2)] dark:bg-white/10 dark:text-white"
                >
                  <WhatsAppIcon className="h-5 w-5" />
                  {dict.hero.ctaSecondary}
                </a>
              </div>

              <ul className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[dict.hero.badge1, dict.hero.badge2, dict.hero.badge3, dict.hero.badge4].map((b) => (
                  <li key={b} className="flex items-start gap-2 rounded-2xl border border-border bg-white/70 px-3 py-2 text-xs text-[var(--ink)] shadow-sm dark:bg-white/10 dark:text-white">
                    <ShieldCheck className="mt-0.5 h-4 w-4 text-[var(--brand-1)] shrink-0" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-10 flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-[var(--brand-1)] text-[var(--brand-1)]" />
                    ))}
                  </div>
                  <span className="font-semibold text-[var(--ink)] dark:text-white">{SITE.rating.value}</span>
                  <span>· {SITE.rating.count}+ {dict.reviews.google}</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                <div className="absolute inset-0 animate-kenburns">
                  <Image
                    src={VEHICLES[3].image}
                    alt={VEHICLES[3].name[locale]}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                  />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-ink via-ink/60 to-transparent">
                  <span className="inline-flex items-center rounded-full bg-brand-gradient px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-lg shadow-[rgba(255,110,0,0.35)]">
                    {VEHICLES[3].category}
                  </span>
                  <h3 className="mt-2 text-xl font-bold text-white">{VEHICLES[3].name[locale]}</h3>
                  <p className="text-sm text-white/70">
                    {dict.common.from} <span className="text-brand-gradient font-bold">€{VEHICLES[3].priceShoulder}</span>{dict.common.perDay}
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Scroll cue */}
          <div className="mt-10 flex justify-center lg:hidden">
            <ChevronDown className="h-6 w-6 text-[var(--brand-1)] animate-scroll-cue" />
          </div>
        </div>
      </section>

      {/* TRUST STRIP — inspired by bestrrentals */}
      <section aria-label="Trust" className="bg-ink text-white border-y border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center md:text-left">
            {[
              { Icon: Truck, text: dict.trust.delivery },
              { Icon: BadgeCheck, text: dict.trust.unlimited },
              { Icon: ShieldCheck, text: dict.trust.transparent },
              { Icon: ThumbsUp, text: dict.trust.owner },
            ].map(({ Icon, text }) => (
              <div key={text} className="flex items-center justify-center md:justify-start gap-2.5 text-sm">
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-gradient text-white shadow-md shadow-[rgba(255,110,0,0.25)]">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="text-white/90 font-medium leading-snug">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="relative bg-background border-t border-border/70">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--ink)] dark:text-white">{dict.why.title}</h2>
            <p className="mt-3 text-muted-foreground">{dict.why.subtitle}</p>
          </div>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {dict.why.items.map((item, i) => {
              const Icon = [MapPin, Wallet, MessageCircle, Sparkles][i];
              return (
                <div key={item.title} className="island-card rounded-3xl p-6 transition-colors hover:border-[var(--sea-2)]">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-gradient text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-bold text-lg text-[var(--ink)] dark:text-white">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{item.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FLEET TEASER — CARS */}
      <section className="bg-sand dark:bg-[var(--background)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-widest text-[var(--brand-1)]">{dict.fleetTeaser.title}</p>
              <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-[var(--ink)] dark:text-white">{dict.nav.cars}</h2>
            </div>
            <Link
              href={localePath(locale, "fleet/cars")}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--sea)] hover:text-[var(--brand-2)]"
            >
              {dict.common.viewAll} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featuredCars.map((v) => (
              <VehicleCard key={v.slug} vehicle={v} locale={locale} dict={dict} />
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORY GRID — Find Your Ride */}
      <section className="bg-background border-y border-border/70">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-sm uppercase tracking-widest text-[var(--brand-1)]">{dict.fleetTeaser.title}</p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-[var(--ink)] dark:text-white">
              {dict.fleetHub.title}
            </h2>
            <p className="mt-3 text-muted-foreground">{dict.fleetHub.subtitle}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {[
              { href: "fleet/cars", label: dict.fleetTeaser.cars, Icon: CarIcon },
              { href: "fleet/cars?transmission=automatic", label: dict.common.automatic, Icon: Zap },
              { href: "fleet/cars?fourByFour=true", label: "Jeeps & 4×4", Icon: Mountain },
              { href: "fleet/scooters", label: dict.fleetTeaser.scooters, Icon: Bike },
              { href: "fleet/atv-quad", label: dict.fleetTeaser.atvQuad, Icon: Mountain },
              { href: "fleet/buggy", label: dict.fleetTeaser.buggy, Icon: Zap },
              { href: "fleet/motorbike", label: dict.nav.motorbike, Icon: Bike },
            ].map((c) => (
              <Link
                key={c.href}
                href={localePath(locale, c.href)}
                className="group island-card relative overflow-hidden rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--brand-1)] hover:shadow-2xl"
              >
                <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-brand-gradient opacity-10 group-hover:opacity-30 transition-opacity duration-500" />
                <span className="relative inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--sea-soft)] text-[var(--sea)] transition-all duration-500 group-hover:bg-brand-gradient group-hover:text-white group-hover:rotate-6 dark:bg-[var(--ink-3)] dark:text-[var(--brand-1)]">
                  <c.Icon className="h-7 w-7" />
                </span>
                <h3 className="mt-5 text-xl font-bold text-[var(--ink)] dark:text-white group-hover:text-[var(--brand-2)] transition-colors">
                  {c.label}
                </h3>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[var(--brand-1)] group-hover:gap-2 transition-all">
                  {dict.common.viewAll} <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FLEET TEASER — OTHER */}
      <section className="relative bg-sand dark:bg-[var(--background)] overflow-hidden">
        <div className="diagonal-accent" aria-hidden />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <p className="text-sm uppercase tracking-widest text-[var(--brand-1)]">{dict.fleetTeaser.title}</p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-[var(--ink)] dark:text-white">
              {dict.fleetTeaser.scooters} · {dict.fleetTeaser.atvQuad} · {dict.fleetTeaser.buggy}
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featuredOther.map((v) => (
              <VehicleCard key={v.slug} vehicle={v} locale={locale} dict={dict} />
            ))}
          </div>
        </div>
      </section>

      {/* DELIVERY ZONES */}
      <section className="wave-bg border-y border-border/70">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-sm uppercase tracking-widest text-[var(--brand-1)]">{dict.delivery.title}</p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-[var(--ink)] dark:text-white">{dict.delivery.subtitle}</h2>
            <ul className="mt-6 space-y-3">
              {dict.delivery.points.map((p) => (
                <li key={p} className="flex items-start gap-3 text-muted-foreground">
                  <MapPin className="mt-0.5 h-5 w-5 text-[var(--brand-1)] shrink-0" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={localePath(locale, "locations/airport-pickup-jnx")}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-white/70 px-4 py-2 text-sm font-semibold text-[var(--ink)] shadow-sm hover:border-[var(--sea-2)] dark:bg-white/10 dark:text-white"
              >
                <Plane className="h-4 w-4 text-[var(--brand-1)]" /> JNX Airport
              </Link>
              <Link
                href={localePath(locale, "locations/port-pickup")}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-white/70 px-4 py-2 text-sm font-semibold text-[var(--ink)] shadow-sm hover:border-[var(--sea-2)] dark:bg-white/10 dark:text-white"
              >
                <Anchor className="h-4 w-4 text-[var(--brand-1)]" /> Naxos Port
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {LOCATIONS.slice(2, 8).map((l) => (
              <Link
                key={l.slug}
                href={localePath(locale, `locations/${l.slug}`)}
                className="group island-card rounded-2xl p-4"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold">{l.shortName}</span>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  {l.distanceFromChoraKm} km · ~{l.pickupTimeMinutes} min
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* NAXOS INFO TEASER */}
      <section className="bg-background border-b border-border/70">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-sm uppercase tracking-widest text-[var(--brand-1)]">Discover Naxos</p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-[var(--ink)] dark:text-white">
              {dict.naxos.pageTitle}
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">{dict.naxos.pageSubtitle}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={localePath(locale, "naxos")}
                className="inline-flex items-center gap-2 rounded-full bg-brand-gradient px-6 py-3 text-sm font-bold text-white shadow-lg shadow-orange-500/20"
              >
                {dict.naxos.readMoreAbout} Naxos <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href={localePath(locale, "naxos/beaches")}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-white/80 px-5 py-3 text-sm font-semibold text-[var(--ink)] shadow-sm hover:border-[var(--sea-2)] dark:bg-white/10 dark:text-white"
              >
                {dict.naxos.beachesTitle} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl">
            <Image
              src="/images/naxos/naxos-cta.jpg"
              alt="Naxos Island"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* AI CHAT TEASER */}
      <section className="relative overflow-hidden bg-[var(--ink)] text-white">
        <div aria-hidden className="pointer-events-none absolute -left-40 -top-40 h-80 w-80 rounded-full bg-[var(--brand-1)] opacity-10 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -right-40 -bottom-40 h-80 w-80 rounded-full bg-[var(--sea)] opacity-10 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 text-center">
          <p className="text-sm uppercase tracking-widest text-[var(--brand-1)]">{dict.ai.trigger}</p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold">{dict.ai.title}</h2>
          <p className="mt-4 max-w-xl mx-auto text-white/70 leading-relaxed">{dict.ai.subtitle}</p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {dict.ai.suggestions.slice(0, 3).map((s) => (
              <span key={s} className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white/80">
                {s}
              </span>
            ))}
          </div>
          <div className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand-gradient px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-orange-500/30 cursor-pointer select-none">
            <Sparkles className="h-4 w-4" /> {dict.ai.trigger}
          </div>
          <p className="mt-3 text-xs text-white/40">{dict.ai.placeholder}</p>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--ink)] dark:text-white">{dict.reviews.title}</h2>
            <p className="mt-3 text-muted-foreground">{dict.reviews.subtitle}</p>
          </div>
          <div className="mt-12 grid md:grid-cols-3 gap-5">
            {REVIEWS.slice(0, 3).map((r) => (
              <figure key={r.author} className="island-card rounded-3xl p-6">
                <div className="flex">
                  {[...Array(r.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-[var(--brand-1)] text-[var(--brand-1)]" />
                  ))}
                </div>
                <blockquote className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  "{r.body[locale]}"
                </blockquote>
                <figcaption className="mt-4 text-sm font-semibold text-[var(--ink)] dark:text-white">— {r.author}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* GUIDES TEASER */}
      <section className="bg-sand border-y border-border/70 dark:bg-[var(--background)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-widest text-[var(--brand-1)]">{dict.nav.guides}</p>
              <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-[var(--ink)] dark:text-white">{dict.guidesHub.title}</h2>
            </div>
            <Link href={localePath(locale, "guides")} className="text-sm font-semibold text-[var(--sea)] hover:text-[var(--brand-2)] inline-flex items-center gap-2">
              {dict.common.viewAll} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-8 grid md:grid-cols-3 gap-5">
            {GUIDES.slice(0, 3).map((g) => (
              <Link
                key={g.slug}
                href={localePath(locale, `guides/${g.slug}`)}
                className="group island-card rounded-3xl p-6"
              >
                <h3 className="text-lg font-bold leading-tight group-hover:text-[var(--brand-1)] transition-colors">
                  {g.title[locale]}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{g.excerpt[locale]}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-xs text-[var(--brand-1)]">
                  {dict.common.readArticle} <ArrowRight className="h-3 w-3" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ContextualFaq faqs={heroFaqs} locale={locale} dict={dict} />

      {/* FINAL CTA */}
      <section className="relative wave-bg border-y border-border/70 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" aria-hidden />
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-24 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--sea-2)]/30 bg-white/70 px-3 py-1 text-xs font-bold text-[var(--sea)] shadow-sm backdrop-blur dark:bg-white/10 dark:text-white">
            <Sparkles className="h-3.5 w-3.5 text-[var(--brand-1)]" />
            {dict.hero.eyebrow}
          </span>
          <h2 className="mt-5 text-3xl sm:text-5xl font-extrabold tracking-tight">
            {dict.book.title}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">{dict.book.subtitle}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href={SITE.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-brand-gradient px-8 py-4 text-base font-bold text-white glow-brand shadow-2xl shadow-[rgba(255,110,0,0.35)]"
            >
              {dict.book.continue} <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href={whatsappUrl(dict.whatsAppFab.message)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-white/80 px-6 py-3 text-sm font-bold text-[var(--ink)] shadow-sm hover:border-[var(--sea-2)] hover:-translate-y-0.5 transition-all dark:bg-white/10 dark:text-white"
            >
              <WhatsAppIcon className="h-5 w-5" />
              {dict.book.talkToHuman}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
