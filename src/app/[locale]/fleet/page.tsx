import { notFound } from "next/navigation";
import { isLocale, localePath, SITE } from "@/lib/site";
import { getDict } from "@/i18n/dictionaries";
import { seoFor } from "@/lib/seo";
import { VEHICLES } from "@/content/fleet";
import { FAQS } from "@/content/faqs";
import { FleetBrowser } from "@/components/fleet/FleetBrowser";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, faqPageSchema, graph } from "@/lib/schema";
import { ContextualFaq } from "@/components/faq/ContextualFaq";
import { Sparkles } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return seoFor("fleet", locale, "fleet");
}

export default async function FleetHubPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDict(locale);
  const faqs = FAQS.filter((f) => f.category === "vehicles" || f.category === "delivery" || f.category === "documents").slice(0, 6);

  return (
    <>
      <JsonLd data={graph([
        breadcrumbSchema([
          { name: dict.nav.home, url: `${SITE.domain}${localePath(locale)}` },
          { name: dict.nav.fleet, url: `${SITE.domain}${localePath(locale, "fleet")}` },
        ]),
        faqPageSchema(faqs, locale),
      ])} />

      <section className="wave-bg border-b border-border/70">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <Breadcrumbs label={dict.common.breadcrumb} items={[
            { label: dict.nav.home, href: localePath(locale) },
            { label: dict.nav.fleet },
          ]} />
          <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-[var(--sea-2)]/30 bg-white/70 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[var(--sea)] shadow-sm dark:bg-white/10 dark:text-[var(--sea-soft)]">
            <Sparkles className="h-4 w-4" /> {dict.hero.eyebrow}
          </span>
          <h1 className="mt-5 max-w-4xl text-4xl font-extrabold tracking-tight text-[var(--ink)] dark:text-white sm:text-6xl">
            {dict.fleetHub.title}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">{dict.fleetHub.subtitle}</p>
        </div>
      </section>

      <section className="bg-background border-b border-border/70">
        <FleetBrowser vehicles={VEHICLES} locale={locale} dict={dict} />
      </section>

      <ContextualFaq faqs={faqs} locale={locale} dict={dict} />
    </>
  );
}
