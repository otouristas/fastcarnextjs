import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { isLocale, localePath, SITE } from "@/lib/site";
import { getDict } from "@/i18n/dictionaries";
import { seoFor } from "@/lib/seo";
import { GUIDES } from "@/content/guides";
import { PageMasthead } from "@/components/layout/PageMasthead";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, graph } from "@/lib/schema";
import { Clock, ArrowRight } from "lucide-react";

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

      <PageMasthead locale={locale} dict={dict} title={dict.guidesHub.title} subtitle={dict.guidesHub.subtitle} label={dict.nav.guides} image="/images/pexels/naxos-old-town.webp" />

      <section className="bg-background border-y border-border/70">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {GUIDES.map((g) => (
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
