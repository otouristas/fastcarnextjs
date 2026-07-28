import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { isLocale, localePath, SITE } from "@/lib/site";
import { getDict } from "@/i18n/dictionaries";
import { seoFor } from "@/lib/seo";
import { vehiclesByCategory } from "@/content/fleet";
import { INDEXABLE_GUIDES } from "@/content/guides";
import { FAQS } from "@/content/faqs";
import { VehicleCard } from "@/components/fleet/VehicleCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { ContextualFaq } from "@/components/faq/ContextualFaq";
import { graph, localBusinessSchema, organizationSchema, websiteSchema, faqPageSchema, breadcrumbSchema } from "@/lib/schema";
import { whatsappUrl } from "@/lib/whatsapp";
import {
  ArrowRight, Star, Sparkles,
  Mountain, Zap, Truck,
} from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return seoFor("home", locale, "", {
    title: SITE.tagline[locale],
    description: SITE.tagline[locale],
  });
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

      {/* Compact booking-first hero */}
      <section className="relative flex min-h-[72dvh] flex-col overflow-hidden">
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
        <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, rgba(7,32,78,0.68) 0%, rgba(7,32,78,0.50) 44%, rgba(7,32,78,0.28) 60%, rgba(7,32,78,0.08) 72%, rgba(7,32,78,0) 94%)' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(4,7,12,0.30) 0%, rgba(4,7,12,0.10) 42%, transparent 66%)' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(4,6,12,0.26) 0%, rgba(4,6,12,0.10) 52%, transparent 82%)' }} />

        <div className="container relative z-10 mx-auto flex flex-1 items-center px-4 py-28 sm:px-6 lg:px-8 lg:py-36">
          <div className="max-w-2xl">
            <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border px-5 py-2 backdrop-blur-sm" style={{ background: 'rgba(37,99,235,0.08)', borderColor: 'rgba(37,99,235,0.18)' }}>
              <Star className="h-3.5 w-3.5 fill-blue-400 text-blue-400" />
              <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-blue-400">
                Naxos · Greece
              </span>
            </div>

            <h1 className="mb-5 text-[2.8rem] sm:text-[3.5rem] lg:text-[4rem] xl:text-[4.5rem] font-bold leading-[1.05]" style={{ color: 'rgba(245,250,255,0.98)' }}>
              {dict.hero.title.split(" ").slice(0, -1).join(" ")}{" "}
              <span className="text-brand-gradient" style={{ background: 'linear-gradient(135deg, #00b4d8, #48cae4)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
                {dict.hero.title.split(" ").slice(-1)[0]}
              </span>
            </h1>

            <div className="mt-8">
              <a
                href={SITE.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[60px] items-center gap-2.5 rounded-full border-none px-7 py-3 text-sm font-bold uppercase tracking-[0.16em] text-white transition-all duration-200 hover:brightness-110 glow-brand"
                style={{ background: 'linear-gradient(135deg, #0077b6 0%, #00b4d8 100%)', boxShadow: '0 4px 20px rgba(0,119,182,0.25), 0 2px 8px rgba(0,180,216,0.15)' }}
              >
                {dict.nav.bookNow} <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FLEET TEASER  -  CARS */}
      <section className="bg-sand dark:bg-[var(--background)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-[var(--brand-4)] dark:text-[var(--sea-2)]">{dict.fleetTeaser.title}</p>
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
            <p className="text-sm font-semibold uppercase tracking-widest text-[var(--brand-4)] dark:text-[var(--sea-2)]">{dict.fleetTeaser.title}</p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-[var(--ink)] dark:text-white">
              {dict.fleetHub.title}
            </h2>
            <p className="mt-3 text-muted-foreground">{SITE.tagline[locale]}</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { href: "fleet/collections/automatic", label: `${dict.common.automatic} ${dict.nav.cars}`, Icon: Zap },
              { href: "fleet/collections/family-7-seater", label: `${dict.fleetFilter.bestForOptions.families} · 7 ${dict.common.seats}`, Icon: Truck },
              { href: "fleet/collections/suv-4x4", label: "SUV & 4×4", Icon: Mountain },
            ].map((c) => (
              <Link
                key={c.href}
                href={localePath(locale, c.href)}
                className="group island-card relative overflow-hidden rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--brand-1)] hover:shadow-2xl"
              >
                <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-brand-gradient opacity-10 group-hover:opacity-30 transition-opacity duration-500" />
                <span className="relative inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--sea-soft)] text-[var(--sea)] transition-all duration-500 group-hover:bg-brand-gradient group-hover:text-white group-hover:rotate-6 dark:bg-[var(--ink-3)] dark:text-[var(--sea-2)]">
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

      {/* NAXOS INFO TEASER */}
      <section className="bg-background border-b border-border/70">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 grid lg:grid-cols-2 gap-12 items-center">
          <div>
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

      {/* GUIDES TEASER */}
      <section className="bg-sand border-y border-border/70 dark:bg-[var(--background)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-[var(--brand-4)] dark:text-[var(--sea-2)]">{dict.nav.guides}</p>
              <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-[var(--ink)] dark:text-white">{dict.guidesHub.title}</h2>
            </div>
            <Link href={localePath(locale, "guides")} className="text-sm font-semibold text-[var(--sea)] hover:text-[var(--brand-2)] inline-flex items-center gap-2">
              {dict.common.viewAll} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-8 grid md:grid-cols-3 gap-5">
            {INDEXABLE_GUIDES.slice(0, 3).map((g) => (
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
            {SITE.tagline[locale]}
          </span>
          <h2 className="mt-5 text-3xl sm:text-5xl font-extrabold tracking-tight">
            {dict.book.title}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">{SITE.tagline[locale]}</p>
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
              {dict.nav.whatsapp}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
