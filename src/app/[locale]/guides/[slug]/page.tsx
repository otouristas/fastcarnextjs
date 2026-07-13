import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { isLocale, LOCALES, localePath, SITE } from "@/lib/site";
import { getDict } from "@/i18n/dictionaries";
import { buildMetadata } from "@/lib/seo";
import { GUIDES, GUIDES_BY_SLUG } from "@/content/guides";
import { FAQS } from "@/content/faqs";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { ContextualFaq } from "@/components/faq/ContextualFaq";
import { articleSchema, breadcrumbSchema, faqPageSchema, graph } from "@/lib/schema";
import { Clock, ArrowRight, Sparkles } from "lucide-react";

export function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of LOCALES) for (const g of GUIDES) params.push({ locale, slug: g.slug });
  return params;
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const g = GUIDES_BY_SLUG[slug];
  if (!isLocale(locale) || !g) return {};
  return buildMetadata({
    locale, path: `guides/${slug}`, title: g.title[locale], description: g.excerpt[locale],
    image: g.hero, type: "article", publishedTime: g.publishedAt, modifiedTime: g.updatedAt,
  });
}

export default async function GuidePage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const g = GUIDES_BY_SLUG[slug];
  if (!isLocale(locale) || !g) notFound();
  const dict = await getDict(locale);
  const related = (g.related || []).map((s) => GUIDES_BY_SLUG[s]).filter(Boolean).slice(0, 3);
  const faqs = (g.faqRefs ?? []).map((s) => FAQS.find((f) => f.slug === s)).filter(Boolean) as typeof FAQS;

  return (
    <>
      <JsonLd data={graph([
        articleSchema(g, locale),
        breadcrumbSchema([
          { name: dict.nav.home, url: `${SITE.domain}${localePath(locale)}` },
          { name: dict.nav.guides, url: `${SITE.domain}${localePath(locale, "guides")}` },
          { name: g.title[locale], url: `${SITE.domain}${localePath(locale, `guides/${g.slug}`)}` },
        ]),
        ...(faqs.length ? [faqPageSchema(faqs, locale)] : []),
      ])} />

      <section className="wave-bg border-b border-border/70">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          <Breadcrumbs label={dict.common.breadcrumb} items={[
            { label: dict.nav.home, href: localePath(locale) },
            { label: dict.nav.guides, href: localePath(locale, "guides") },
            { label: g.title[locale] },
          ]} />
          <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-[var(--sea-2)]/30 bg-white/70 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-[var(--sea)] shadow-sm dark:bg-white/10 dark:text-[var(--sea-soft)]">
            <Sparkles className="h-3.5 w-3.5" /> {dict.nav.guides}
          </div>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-[var(--ink)] dark:text-white sm:text-5xl">{g.title[locale]}</h1>
          <p className="mt-3 text-lg text-muted-foreground">{g.excerpt[locale]}</p>
          <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" /> {g.readingTime} min</span>
            <time dateTime={g.updatedAt}>{new Date(g.updatedAt).toLocaleDateString(locale)}</time>
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="island-card relative -mt-10 aspect-[16/8] overflow-hidden rounded-[2rem] shadow-2xl">
            <Image src={g.hero} alt={g.title[locale]} fill priority className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" unoptimized />
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8 grid gap-10 lg:grid-cols-[1fr_240px]">
          <article className="space-y-10">
            {g.sections.map((s, i) => (
              <div key={i} id={`s${i}`}>
                <h2 className="text-2xl font-bold tracking-tight text-[var(--ink)] dark:text-white">{s.heading[locale]}</h2>
                <p className="mt-3 text-base leading-7 text-[var(--ink)] dark:text-white">{s.body[locale]}</p>
              </div>
            ))}
          </article>
          <aside className="hidden lg:block">
            <div className="island-card sticky top-28 rounded-3xl p-4">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[var(--brand-2)]">{dict.toc}</p>
              <ul className="space-y-2 text-sm">
                {g.sections.map((s, i) => (
                  <li key={i}><a href={`#s${i}`} className="text-muted-foreground hover:text-[var(--sea)]">{s.heading[locale]}</a></li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      {faqs.length > 0 && <ContextualFaq faqs={faqs} locale={locale} dict={dict} />}

      {/* Internal Link Silo: Guide A -> Location B & Fleet C */}
      <section className="border-t border-border/70 bg-background/50 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2">
            {/* Location Hubs (Page B) */}
            <div className="island-card rounded-3xl p-6">
              <h3 className="text-lg font-bold text-[var(--ink)] dark:text-white">Popular Naxos Car Rental Pickup Hubs</h3>
              <p className="mt-1 text-xs text-muted-foreground">Free delivery & meet-and-greet at all major arrival locations</p>
              <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                <Link href={localePath(locale, "locations/port-pickup")} className="rounded-xl border border-border/60 bg-white/70 p-3 font-semibold text-[var(--ink)] hover:border-[var(--sea)] hover:text-[var(--sea)] dark:bg-white/10 dark:text-white">
                  ⚓ Rent a Car Naxos Port
                </Link>
                <Link href={localePath(locale, "locations/airport-pickup-jnx")} className="rounded-xl border border-border/60 bg-white/70 p-3 font-semibold text-[var(--ink)] hover:border-[var(--sea)] hover:text-[var(--sea)] dark:bg-white/10 dark:text-white">
                  ✈️ Rent a Car Naxos Airport (JNX)
                </Link>
                <Link href={localePath(locale, "locations/naxos-town")} className="rounded-xl border border-border/60 bg-white/70 p-3 font-semibold text-[var(--ink)] hover:border-[var(--sea)] hover:text-[var(--sea)] dark:bg-white/10 dark:text-white">
                  🏛️ Car Rental Naxos Town (Chora)
                </Link>
                <Link href={localePath(locale, "locations/agios-prokopios")} className="rounded-xl border border-border/60 bg-white/70 p-3 font-semibold text-[var(--ink)] hover:border-[var(--sea)] hover:text-[var(--sea)] dark:bg-white/10 dark:text-white">
                  🏖️ Rent a Car Agios Prokopios
                </Link>
                <Link href={localePath(locale, "locations/plaka")} className="rounded-xl border border-border/60 bg-white/70 p-3 font-semibold text-[var(--ink)] hover:border-[var(--sea)] hover:text-[var(--sea)] dark:bg-white/10 dark:text-white">
                  🌅 Rent a Car Plaka Beach
                </Link>
                <Link href={localePath(locale, "locations/mikri-vigla")} className="rounded-xl border border-border/60 bg-white/70 p-3 font-semibold text-[var(--ink)] hover:border-[var(--sea)] hover:text-[var(--sea)] dark:bg-white/10 dark:text-white">
                  🪁 Rent a Car Mikri Vigla
                </Link>
              </div>
            </div>

            {/* Fleet Categories (Page C) */}
            <div className="island-card rounded-3xl p-6">
              <h3 className="text-lg font-bold text-[var(--ink)] dark:text-white">Naxos Rental Fleet Categories</h3>
              <p className="mt-1 text-xs text-muted-foreground">Select your ideal vehicle type with full CDW insurance options</p>
              <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                <Link href={localePath(locale, "fleet/cars")} className="rounded-xl border border-border/60 bg-white/70 p-3 font-semibold text-[var(--ink)] hover:border-[var(--sea)] hover:text-[var(--sea)] dark:bg-white/10 dark:text-white">
                  🚗 Economy & Compact Cars
                </Link>
                <Link href={localePath(locale, "fleet/cars")} className="rounded-xl border border-border/60 bg-white/70 p-3 font-semibold text-[var(--ink)] hover:border-[var(--sea)] hover:text-[var(--sea)] dark:bg-white/10 dark:text-white">
                  ⚡ Automatic Rental Cars
                </Link>
                <Link href={localePath(locale, "fleet/cars")} className="rounded-xl border border-border/60 bg-white/70 p-3 font-semibold text-[var(--ink)] hover:border-[var(--sea)] hover:text-[var(--sea)] dark:bg-white/10 dark:text-white">
                  🚙 SUVs & 4x4 Off-Road
                </Link>
                <Link href={localePath(locale, "fleet/scooters")} className="rounded-xl border border-border/60 bg-white/70 p-3 font-semibold text-[var(--ink)] hover:border-[var(--sea)] hover:text-[var(--sea)] dark:bg-white/10 dark:text-white">
                  🛵 Scooters & Motorbikes
                </Link>
                <Link href={localePath(locale, "fleet/atvs")} className="rounded-xl border border-border/60 bg-white/70 p-3 font-semibold text-[var(--ink)] hover:border-[var(--sea)] hover:text-[var(--sea)] dark:bg-white/10 dark:text-white">
                  🚜 Quad / ATV 4x4
                </Link>
                <Link href={localePath(locale, "fleet/buggies")} className="rounded-xl border border-border/60 bg-white/70 p-3 font-semibold text-[var(--ink)] hover:border-[var(--sea)] hover:text-[var(--sea)] dark:bg-white/10 dark:text-white">
                  🏎️ Polaris Buggies
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-sand border-t border-border/70 dark:bg-[var(--background)]">
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-extrabold text-[var(--ink)] dark:text-white">{dict.common.relatedArticles}</h2>
            <div className="mt-6 grid gap-5 md:grid-cols-3">
              {related.map((r) => (
                <Link key={r.slug} href={localePath(locale, `guides/${r.slug}`)} className="island-card group rounded-3xl p-6 transition-transform hover:-translate-y-1">
                  <h3 className="font-bold leading-tight text-[var(--ink)] group-hover:text-[var(--sea)] dark:text-white">{r.title[locale]}</h3>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{r.excerpt[locale]}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-[var(--sea)]">{dict.common.readArticle} <ArrowRight className="h-3 w-3" /></span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
