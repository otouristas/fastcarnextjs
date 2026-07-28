import { notFound } from "next/navigation";
import { isLocale, LOCALES, localePath, SITE } from "@/lib/site";
import { getDict } from "@/i18n/dictionaries";
import { seoFor } from "@/lib/seo";
import { vehiclesByCategory } from "@/content/fleet";
import { FleetBrowser } from "@/components/fleet/FleetBrowser";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, graph, faqPageSchema } from "@/lib/schema";
import { FAQS } from "@/content/faqs";
import type { VehicleCategory } from "@/types/content";
import { ContextualFaq } from "@/components/faq/ContextualFaq";
import { ArrowRight, Sparkles } from "lucide-react";

const VALID_CATEGORIES: VehicleCategory[] = ["cars"];

export function generateStaticParams() {
  const params: { locale: string; category: string }[] = [];
  for (const locale of LOCALES) for (const c of VALID_CATEGORIES) params.push({ locale, category: c });
  return params;
}

export const dynamicParams = false;

const categoryFaqMap: Record<VehicleCategory, string[]> = {
  cars: ["do-i-need-car-naxos", "automatic-availability", "4x4-needed", "child-seats", "fuel-policy", "documents-needed"],
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string; category: string }> }) {
  const { locale, category } = await params;
  if (!isLocale(locale) || !VALID_CATEGORIES.includes(category as VehicleCategory)) return {};
  return seoFor(`fleet/${category}`, locale, `fleet/${category}`, {
    description: SITE.tagline[locale],
  });
}

export default async function FleetCategoryPage({ params }: { params: Promise<{ locale: string; category: string }> }) {
  const { locale, category } = await params;
  if (!isLocale(locale) || !VALID_CATEGORIES.includes(category as VehicleCategory)) notFound();
  const dict = await getDict(locale);
  const cat = category as VehicleCategory;
  const vehicles = vehiclesByCategory(cat);
  const catLabels = {
    cars: dict.fleetHub.categoryCars,
  } as const;
  const navLabels = {
    cars: dict.nav.cars,
  } as const;
  const faqs = categoryFaqMap[cat]
    .map((slug) => FAQS.find((f) => f.slug === slug))
    .filter((f): f is (typeof FAQS)[number] => Boolean(f));

  return (
    <>
      <JsonLd data={graph([
        breadcrumbSchema([
          { name: dict.nav.home, url: `${SITE.domain}${localePath(locale)}` },
          { name: dict.nav.fleet, url: `${SITE.domain}${localePath(locale, "fleet")}` },
          { name: navLabels[cat], url: `${SITE.domain}${localePath(locale, `fleet/${cat}`)}` },
        ]),
        faqPageSchema(faqs, locale),
      ])} />

      <section className="wave-bg border-b border-border/70">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div>
            <div className="max-w-4xl">
              <Breadcrumbs label={dict.common.breadcrumb} items={[
                { label: dict.nav.home, href: localePath(locale) },
                { label: dict.nav.fleet, href: localePath(locale, "fleet") },
                { label: navLabels[cat] },
              ]} />
              <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-[var(--sea-2)]/30 bg-white/70 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[var(--sea)] shadow-sm dark:bg-white/10 dark:text-[var(--sea-2)]">
                <Sparkles className="h-4 w-4" /> {dict.hero.eyebrow}
              </span>
              <h1 className="mt-5 max-w-4xl text-4xl font-extrabold tracking-tight text-[var(--ink)] dark:text-white sm:text-6xl">{catLabels[cat]}</h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">{SITE.tagline[locale]}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={SITE.bookingUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-brand-gradient px-6 py-3 text-sm font-bold text-white shadow-lg" style={{ boxShadow: '0 4px 20px rgba(0,119,182,0.25)' }}>
                  {dict.cta.bookCar} <ArrowRight className="h-4 w-4" />
                </a>
                <a href={`tel:${SITE.phones[0]}`} className="inline-flex items-center gap-2 rounded-full border border-border bg-white/75 px-6 py-3 text-sm font-bold text-[var(--ink)] shadow-sm dark:bg-white/10 dark:text-white">
                  {dict.cta.callNow}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-sand dark:bg-[var(--background)] border-t border-border/70">
        <FleetBrowser vehicles={vehicles} locale={locale} dict={dict} />
      </section>

      <ContextualFaq faqs={faqs} locale={locale} dict={dict} title={dict.faqTeaser.title} />
    </>
  );
}
