import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { isLocale, localePath, SITE } from "@/lib/site";
import { getDict } from "@/i18n/dictionaries";
import { seoFor } from "@/lib/seo";
import { INDEXABLE_GUIDES } from "@/content/guides";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, graph } from "@/lib/schema";
import { Clock, ArrowRight, BookOpen } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return seoFor("guides", locale, "guides");
}

export default async function GuidesHubPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDict(locale);

  return (
    <>
      <JsonLd data={graph([breadcrumbSchema([
        { name: dict.nav.home, url: `${SITE.domain}${localePath(locale)}` },
        { name: dict.nav.guides, url: `${SITE.domain}${localePath(locale, "guides")}` },
      ])])} />

      <section className="wave-bg border-b border-border/70">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <Breadcrumbs label={dict.common.breadcrumb} items={[
            { label: dict.nav.home, href: localePath(locale) },
            { label: dict.nav.guides },
          ]} />
          <span className="mt-5 inline-flex items-center gap-2 rounded-full border border-[var(--sea-2)]/30 bg-white/70 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-[var(--sea)] shadow-sm dark:bg-white/10 dark:text-[var(--sea-2)]">
            <BookOpen className="h-4 w-4" /> {dict.nav.guides}
          </span>
          <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-[var(--ink)] dark:text-white sm:text-5xl">{dict.guidesHub.title}</h1>
          <p className="mt-3 max-w-3xl text-lg text-muted-foreground">{dict.guidesHub.subtitle}</p>
        </div>
      </section>

      <section className="bg-background border-y border-border/70">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {INDEXABLE_GUIDES.map((g) => (
              <Link
                key={g.slug}
                href={localePath(locale, `guides/${g.slug}`)}
                className="group island-card flex flex-col overflow-hidden rounded-3xl transition-transform hover:-translate-y-1"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image src={g.hero} alt={g.title[locale]} fill sizes="(max-width: 1024px) 50vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" unoptimized />
                  <div className="absolute inset-0 bg-gradient-to-t from-[rgba(15,37,51,0.55)] to-transparent" />
                </div>
                <div className="flex flex-1 flex-col gap-3 p-5">
                  <h2 className="text-lg font-bold leading-tight text-[var(--ink)] group-hover:text-[var(--sea)] dark:text-white">
                    {g.title[locale]}
                  </h2>
                  <p className="text-sm text-muted-foreground line-clamp-3">{g.excerpt[locale]}</p>
                  <div className="mt-auto flex items-center justify-between text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" /> {g.readingTime} min</span>
                    <span className="inline-flex items-center gap-1 font-bold text-[var(--sea)]">{dict.common.readArticle} <ArrowRight className="h-3 w-3" /></span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
