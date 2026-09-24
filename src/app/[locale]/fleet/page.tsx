import { notFound } from "next/navigation";
import { isLocale, localePath, SITE } from "@/lib/site";
import { getDict } from "@/i18n/dictionaries";
import { seoFor } from "@/lib/seo";
import { VEHICLES } from "@/content/fleet";
import { FAQS } from "@/content/faqs";
import { FleetBrowser } from "@/components/fleet/FleetBrowser";
import { PageMasthead } from "@/components/layout/PageMasthead";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, faqPageSchema, graph } from "@/lib/schema";
import { ContextualFaq } from "@/components/faq/ContextualFaq";

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

      <PageMasthead locale={locale} dict={dict} title={dict.fleetHub.title} subtitle={dict.fleetHub.subtitle} label={dict.nav.fleet} image="/images/fleet/studio/fiat-500-cabrio.webp" />

      <section className="bg-background border-b border-border/70">
        <FleetBrowser vehicles={VEHICLES} locale={locale} dict={dict} />
      </section>

      <ContextualFaq faqs={faqs} locale={locale} dict={dict} />
    </>
  );
}
