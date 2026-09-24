import { designCopy } from "@/content/design-copy";
import { LOCATIONS_BY_SLUG } from "@/content/locations";
import { notFound } from "next/navigation";
import Link from "next/link";
import { isLocale, LOCALES, localePath, SITE } from "@/lib/site";
import { getDict } from "@/i18n/dictionaries";
import { buildMetadata } from "@/lib/seo";
import { GUIDES, GUIDES_BY_SLUG } from "@/content/guides";
import { FAQS } from "@/content/faqs";
import { PageMasthead } from "@/components/layout/PageMasthead";
import { JsonLd } from "@/components/seo/JsonLd";
import { ContextualFaq } from "@/components/faq/ContextualFaq";
import { DiscoverCycladesBox } from "@/components/guide/DiscoverCycladesBox";
import { articleSchema, breadcrumbSchema, faqPageSchema, graph } from "@/lib/schema";
import { ArrowRight } from "lucide-react";

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
  // Several non-English excerpts are one-line summaries well under the ~155
  // characters Google renders, which wastes most of the snippet. Top up from the
  // opening section until the description is a usable length.
  let description = g.excerpt[locale];
  if (description.length < 110 && g.sections[0]) {
    description = `${description} ${g.sections[0].body[locale]}`;
  }

  return buildMetadata({
    locale,
    path: `guides/${slug}`,
    title: g.title[locale],
    description,
    image: g.hero,
    type: "article",
    publishedTime: g.publishedAt,
    modifiedTime: g.updatedAt,
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

      <PageMasthead locale={locale} dict={dict} title={g.title[locale]} subtitle={g.excerpt[locale]} label={dict.nav.guides} image={g.hero}>
        <p className="article-byline">{g.readingTime} min · <time dateTime={g.updatedAt}>{new Date(g.updatedAt).toLocaleDateString(locale)}</time></p>
      </PageMasthead>

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
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[var(--link)]">{dict.toc}</p>
              <ul className="space-y-2 text-sm">
                {g.sections.map((s, i) => (
                  <li key={i}><a href={`#s${i}`} className="text-[var(--prose-body)] hover:text-[var(--link)]">{s.heading[locale]}</a></li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      {faqs.length > 0 && <ContextualFaq faqs={faqs} locale={locale} dict={dict} />}

      {/* Partner rail. This was rendering only on /naxos/* island articles, so
          all 14 driving guides — the pages carrying the proven GSC demand —
          shipped without it. Same component, same per-slug link selection. */}
      <section className="bg-background">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <DiscoverCycladesBox locale={locale} slug={slug} />
        </div>
      </section>

      {/* Internal Link Silo: Guide A -> Location B & Fleet C */}
      <section className="border-t border-border/70 bg-background/50 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2">
            {/* Location Hubs (Page B) */}
            <div className="island-card rounded-3xl p-6">
              <h3 className="text-lg font-bold text-[var(--ink)] dark:text-white">{dict.nav.locations}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{dict.trust.delivery}</p>
              <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                <Link href={localePath(locale, "locations/port-pickup")} className="rounded-xl border border-border/60 bg-white/70 p-3 font-semibold text-[var(--ink)] hover:border-[var(--sea)] hover:text-[var(--sea)] dark:bg-white/10 dark:text-white">
                  {LOCATIONS_BY_SLUG["port-pickup"].name[locale]}
                </Link>
                <Link href={localePath(locale, "locations/airport-pickup")} className="rounded-xl border border-border/60 bg-white/70 p-3 font-semibold text-[var(--ink)] hover:border-[var(--sea)] hover:text-[var(--sea)] dark:bg-white/10 dark:text-white">
                  {LOCATIONS_BY_SLUG["airport-pickup"].name[locale]}
                </Link>
                <Link href={localePath(locale, "locations/naxos-town")} className="rounded-xl border border-border/60 bg-white/70 p-3 font-semibold text-[var(--ink)] hover:border-[var(--sea)] hover:text-[var(--sea)] dark:bg-white/10 dark:text-white">
                  {LOCATIONS_BY_SLUG["naxos-town"].name[locale]}
                </Link>
                <Link href={localePath(locale, "locations/agios-prokopios")} className="rounded-xl border border-border/60 bg-white/70 p-3 font-semibold text-[var(--ink)] hover:border-[var(--sea)] hover:text-[var(--sea)] dark:bg-white/10 dark:text-white">
                  {LOCATIONS_BY_SLUG["agios-prokopios"].name[locale]}
                </Link>
                <Link href={localePath(locale, "locations/plaka")} className="rounded-xl border border-border/60 bg-white/70 p-3 font-semibold text-[var(--ink)] hover:border-[var(--sea)] hover:text-[var(--sea)] dark:bg-white/10 dark:text-white">
                  {LOCATIONS_BY_SLUG["plaka"].name[locale]}
                </Link>
                <Link href={localePath(locale, "locations/mikri-vigla")} className="rounded-xl border border-border/60 bg-white/70 p-3 font-semibold text-[var(--ink)] hover:border-[var(--sea)] hover:text-[var(--sea)] dark:bg-white/10 dark:text-white">
                  {LOCATIONS_BY_SLUG["mikri-vigla"].name[locale]}
                </Link>
              </div>
            </div>

            {/* Fleet Categories (Page C) */}
            <div className="island-card rounded-3xl p-6">
              <h3 className="text-lg font-bold text-[var(--ink)] dark:text-white">{dict.nav.fleet}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{dict.fleetHub.subtitle}</p>
              <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                <Link href={localePath(locale, "fleet/cars")} className="rounded-xl border border-border/60 bg-white/70 p-3 font-semibold text-[var(--ink)] hover:border-[var(--sea)] hover:text-[var(--sea)] dark:bg-white/10 dark:text-white">
                  {designCopy(locale).all}
                </Link>
                <Link href={localePath(locale, "fleet/collections/automatic")}  className="rounded-xl border border-border/60 bg-white/70 p-3 font-semibold text-[var(--ink)] hover:border-[var(--sea)] hover:text-[var(--sea)] dark:bg-white/10 dark:text-white">
                  {designCopy(locale).automatic}
                </Link>
                <Link href={localePath(locale, "fleet/collections/suv-4x4")}  className="rounded-xl border border-border/60 bg-white/70 p-3 font-semibold text-[var(--ink)] hover:border-[var(--sea)] hover:text-[var(--sea)] dark:bg-white/10 dark:text-white">
                  {designCopy(locale).suv}
                </Link>
                <Link href={localePath(locale, "fleet/collections/family-7-seater")}  className="rounded-xl border border-border/60 bg-white/70 p-3 font-semibold text-[var(--ink)] hover:border-[var(--sea)] hover:text-[var(--sea)] dark:bg-white/10 dark:text-white">
                  {designCopy(locale).family}
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
