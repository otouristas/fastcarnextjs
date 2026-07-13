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
import { graph, localBusinessSchema, organizationSchema, websiteSchema, faqPageSchema, breadcrumbSchema } from "@/lib/schema";
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

  const featuredCars = vehiclesByCategory("cars").slice(0, 8);
  const heroFaqs = FAQS.slice(0, 10);

  return (
    <>
      <JsonLd
        data={graph([
          localBusinessSchema(locale),
          organizationSchema(),
          websiteSchema(locale),
          faqPageSchema(heroFaqs, locale),
          breadcrumbSchema([{ name: dict.nav.home, url: `${SITE.domain}${localePath(locale)}` }]),
        ])}
      />

      {/* HERO  -  full-bleed background image */}
      <section className="relative flex min-h-[100dvh] flex-col overflow-hidden">
        <div className="absolute inset-0">
          <Image
             src="/images/naxos/portara-detail.jpg"
            alt="Portara, Naxos - Fast Motor Rental Naxos"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
        {/* Gradient overlays */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, rgba(7,32,78,0.68) 0%, rgba(7,32,78,0.50) 44%, rgba(7,32,78,0.28) 60%, rgba(7,32,78,0.08) 72%, rgba(7,32,78,0) 94%)' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(4,7,12,0.30) 0%, rgba(4,7,12,0.10) 42%, transparent 66%)' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(4,6,12,0.26) 0%, rgba(4,6,12,0.10) 52%, transparent 82%)' }} />

        <div className="container relative z-10 mx-auto flex flex-1 flex-col px-4 sm:px-6 lg:px-8 pb-8 lg:pb-12 pt-40 lg:pt-52">
          <div className="max-w-2xl">
            {/* Eyebrow */}
            <div className="mb-7 inline-flex items-center gap-2.5 rounded-full border px-5 py-2 backdrop-blur-sm" style={{ background: 'rgba(37,99,235,0.08)', borderColor: 'rgba(37,99,235,0.18)' }}>
              <Star className="h-3.5 w-3.5 fill-blue-400 text-blue-400" />
              <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-blue-400">
                {dict.hero.eyebrow}
              </span>
            </div>

            {/* Title */}
            <h1 className="mb-5 text-[2.8rem] sm:text-[3.5rem] lg:text-[4rem] xl:text-[4.5rem] font-bold leading-[1.05]" style={{ color: 'rgba(245,250,255,0.98)' }}>
              {dict.hero.title.split(" ").slice(0, -1).join(" ")}{" "}
              <span className="text-brand-gradient" style={{ background: 'linear-gradient(135deg, #00b4d8, #48cae4)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
                {dict.hero.title.split(" ").slice(-1)[0]}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mb-4 max-w-xl text-[1rem] leading-[1.85]" style={{ color: 'rgba(233,242,255,0.92)' }}>
              {dict.hero.subtitle}
            </p>

            {/* CTAs */}
            <div className="mb-8 flex flex-wrap items-center gap-4">
              <Link
                href={localePath(locale, "fleet")}
                className="inline-flex min-h-[60px] items-center gap-2.5 rounded-full border-none px-7 py-3 text-sm font-bold uppercase tracking-[0.16em] text-white transition-all duration-200 hover:brightness-110 glow-brand"
                style={{ background: 'linear-gradient(135deg, #0077b6 0%, #00b4d8 100%)', boxShadow: '0 4px 20px rgba(0,119,182,0.25), 0 2px 8px rgba(0,180,216,0.15)' }}
              >
                {dict.hero.ctaPrimary} <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={whatsappUrl(dict.whatsAppFab.message)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[60px] items-center gap-2 rounded-full border px-7 py-3 text-sm font-bold uppercase tracking-[0.12em] backdrop-blur-sm transition-all duration-200 hover:brightness-110 hover:scale-105"
                style={{ borderColor: 'rgba(20,184,166,0.18)', backgroundColor: 'rgba(255,255,255,0.88)', color: 'rgba(12,34,56,0.95)', boxShadow: '0 10px 24px rgba(5,20,35,0.16)' }}
              >
                <WhatsAppIcon className="h-5 w-5" />
                {dict.hero.ctaSecondary}
              </a>
            </div>

            {/* Trust badges inline */}
            <div className="mb-8 inline-flex max-w-lg items-start gap-3 rounded-xl border px-5 py-3.5 backdrop-blur-sm" style={{ background: 'rgba(218,232,252,0.20)', borderColor: 'rgba(200,223,252,0.42)' }}>
              <ShieldCheck className="mt-0.5 h-5 w-5 flex-none" style={{ color: 'rgba(244,251,255,0.98)' }} />
              <div>
                <p className="text-sm font-semibold" style={{ color: 'rgba(244,251,255,0.98)' }}>{dict.hero.badge1}</p>
                <p className="mt-1 text-xs leading-relaxed" style={{ color: 'rgba(226,239,255,0.93)' }}>{dict.hero.badge2} · {dict.hero.badge3} · {dict.hero.badge4}</p>
              </div>
            </div>

            {/* Stats row */}
            <div className="flex flex-wrap items-center gap-6 sm:gap-8">
              {[
                { icon: <CarIcon className="h-4 w-4" />, value: `${VEHICLES.length}+`, label: "Vehicles" },
                { icon: <Star className="h-4 w-4" />, value: String(SITE.rating.value), label: "Rating" },
                { icon: <Clock className="h-4 w-4" />, value: `${SITE.hours.open}–${SITE.hours.close}`, label: "Support" },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full" style={{ background: 'rgba(220,235,255,0.22)', border: '1px solid rgba(196,222,253,0.40)' }}>
                    <span style={{ color: 'rgba(243,250,255,0.95)' }}>{stat.icon}</span>
                  </div>
                  <div>
                    <p className="text-xl font-bold" style={{ color: 'rgba(246,252,255,0.98)' }}>{stat.value}</p>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em]" style={{ color: 'rgba(219,234,252,0.90)' }}>{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Scroll cue */}
          <div className="mt-auto flex justify-center pt-8 lg:hidden">
            <ChevronDown className="h-6 w-6 animate-scroll-cue" style={{ color: 'rgba(0,180,216,0.8)' }} />
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section aria-label="Trust" className="py-8" style={{ backgroundColor: 'color-mix(in oklab, #edf5fc 84%, #ffffff)' }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-[28px] border island-card">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4" style={{ gap: '1px', backgroundColor: 'rgba(26,143,197,0.08)' }}>
              {[
                { Icon: Truck, text: dict.trust.delivery },
                { Icon: BadgeCheck, text: dict.trust.unlimited },
                { Icon: ShieldCheck, text: dict.trust.transparent },
                { Icon: ThumbsUp, text: dict.trust.owner },
              ].map(({ Icon, text }) => (
                <div key={text} className="flex items-start gap-3 p-4 md:p-5" style={{ backgroundColor: 'color-mix(in oklab, #edf5fc 84%, #ffffff)' }}>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl" style={{ backgroundColor: 'rgba(26,143,197,0.08)', color: 'var(--sea)' }}>
                    <Icon className="h-4 w-4" />
                  </span>
                  <div>
                    <h3 className="text-sm font-extrabold uppercase tracking-[0.08em] text-[var(--ink)] dark:text-white">{text}</h3>
                  </div>
                </div>
              ))}
            </div>
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
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl text-[var(--sea)]" style={{ backgroundColor: 'rgba(26,143,197,0.08)' }}>
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

      {/* FLEET TEASER  -  CARS */}
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

      {/* CATEGORY GRID  -  Find Your Ride */}
      <section className="bg-background border-y border-border/70">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-sm uppercase tracking-widest text-[var(--brand-1)]">{dict.fleetTeaser.title}</p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-[var(--ink)] dark:text-white">
              {dict.fleetHub.title}
            </h2>
            <p className="mt-3 text-muted-foreground">{dict.fleetHub.subtitle}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { href: "fleet/cars", label: dict.fleetTeaser.cars, Icon: CarIcon },
              { href: "fleet/cars?transmission=automatic", label: dict.common.automatic, Icon: Zap },
              { href: "fleet/cars?transmission=manual", label: dict.common.manual, Icon: CarIcon },
              { href: "fleet/cars?fourByFour=true", label: "Jeeps & 4×4", Icon: Mountain },
              { href: "fleet/cars?seats=7", label: "7-Seater Vans", Icon: Truck },
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
                className="inline-flex items-center gap-2 rounded-full bg-brand-gradient px-6 py-3 text-sm font-bold text-white shadow-lg" style={{ boxShadow: '0 4px 20px rgba(0,119,182,0.25)' }}
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
          <div className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand-gradient px-7 py-3.5 text-sm font-bold text-white shadow-lg cursor-pointer select-none" style={{ boxShadow: '0 4px 20px rgba(0,119,182,0.30)' }}>
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
                <figcaption className="mt-4 text-sm font-semibold text-[var(--ink)] dark:text-white"> -  {r.author}</figcaption>
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
              className="inline-flex items-center gap-2 rounded-full bg-brand-gradient px-8 py-4 text-base font-bold text-white glow-brand shadow-2xl" style={{ boxShadow: '0 6px 28px rgba(0,119,182,0.35)' }}
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
