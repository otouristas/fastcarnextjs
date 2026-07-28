import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { isLocale, LOCALES, localePath, SITE } from "@/lib/site";
import { getDict } from "@/i18n/dictionaries";
import { buildMetadata } from "@/lib/seo";
import {
  GUIDES,
  GUIDES_BY_SLUG,
  INDEXABLE_GUIDES_BY_SLUG,
  guideRequiresReview,
} from "@/content/guides";
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
    noindex: guideRequiresReview(slug),
  });
}

export default async function GuidePage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const g = GUIDES_BY_SLUG[slug];
  if (!isLocale(locale) || !g) notFound();
  const dict = await getDict(locale);
  const requiresReview = guideRequiresReview(slug);
  const related = (g.related || []).map((s) => INDEXABLE_GUIDES_BY_SLUG[s]).filter(Boolean).slice(0, 3);
  const faqs = (g.faqRefs ?? []).map((s) => FAQS.find((f) => f.slug === s)).filter(Boolean) as typeof FAQS;

  return (
    <>
      <JsonLd data={graph([
        ...(!requiresReview ? [articleSchema(g, locale)] : []),
        breadcrumbSchema([
          { name: dict.nav.home, url: `${SITE.domain}${localePath(locale)}` },
          { name: dict.nav.guides, url: `${SITE.domain}${localePath(locale, "guides")}` },
          { name: g.title[locale], url: `${SITE.domain}${localePath(locale, `guides/${g.slug}`)}` },
        ]),
        ...(faqs.length ? [faqPageSchema(faqs, locale)] : []),
      ])} />

      <section className="wave-bg border-b border-border/70">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <Breadcrumbs label={dict.common.breadcrumb} items={[
            { label: dict.nav.home, href: localePath(locale) },
            { label: dict.nav.guides, href: localePath(locale, "guides") },
            { label: g.title[locale] },
          ]} />
          <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-[var(--sea-2)]/30 bg-white/70 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-[var(--sea)] shadow-sm dark:bg-white/10 dark:text-[var(--sea-2)]">
            <Sparkles className="h-3.5 w-3.5" /> {dict.nav.guides}
          </div>
          <h1 className="mt-4 max-w-4xl text-4xl font-extrabold leading-[1.08] tracking-tight text-[var(--ink)] dark:text-white sm:text-5xl lg:text-6xl">{g.title[locale]}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground sm:text-xl">{g.excerpt[locale]}</p>
          <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" /> {g.readingTime} min</span>
            <time dateTime={g.updatedAt}>{new Date(g.updatedAt).toLocaleDateString(locale)}</time>
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="island-card relative -mt-7 aspect-[16/9] overflow-hidden rounded-[1.75rem] shadow-2xl sm:-mt-10 sm:rounded-[2rem]">
            <Image src={g.hero} alt={g.title[locale]} fill priority className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" unoptimized />
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto grid max-w-5xl gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[minmax(0,1fr)_260px] lg:px-8">
          <article className="min-w-0">
            <div className="mb-10 rounded-3xl border border-[var(--sea)]/20 bg-[var(--sea-soft)]/45 p-6 text-lg leading-8 text-[var(--ink)] dark:bg-white/5 dark:text-white">
              {g.excerpt[locale]}
            </div>
            <details className="mb-10 rounded-2xl border border-border bg-background p-4 lg:hidden">
              <summary className="cursor-pointer font-bold text-foreground">{dict.toc}</summary>
              <ul className="mt-4 space-y-2 text-sm">
                {g.sections.map((section, index) => (
                  <li key={index}>
                    <a href={`#s${index}`} className="text-muted-foreground hover:text-[var(--sea)]">
                      {section.heading[locale]}
                    </a>
                  </li>
                ))}
              </ul>
            </details>
            <div className="space-y-12">
            {g.sections.map((s, i) => (
              <section key={i} id={`s${i}`} className="scroll-mt-28">
                <h2 className="text-2xl font-bold leading-tight tracking-tight text-[var(--ink)] dark:text-white sm:text-3xl">{s.heading[locale]}</h2>
                <p className="mt-4 max-w-[68ch] text-[1.0625rem] leading-8 text-foreground/90">{s.body[locale]}</p>
              </section>
            ))}
            </div>
          </article>
          <aside className="hidden lg:block">
            <div className="island-card sticky top-28 rounded-3xl p-4">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[var(--brand-4)] dark:text-[var(--sea-2)]">{dict.toc}</p>
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
