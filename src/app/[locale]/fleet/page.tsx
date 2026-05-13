import { notFound } from "next/navigation";
import Link from "next/link";
import { isLocale, localePath, SITE } from "@/lib/site";
import { getDict } from "@/i18n/dictionaries";
import { seoFor } from "@/lib/seo";
import { VEHICLES, vehiclesByCategory } from "@/content/fleet";
import { FAQS } from "@/content/faqs";
import { VehicleCard } from "@/components/fleet/VehicleCard";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, faqPageSchema, graph } from "@/lib/schema";
import { ContextualFaq } from "@/components/faq/ContextualFaq";
import { ArrowRight, Bike, Car, Mountain, Sparkles, Zap } from "lucide-react";

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

  const categories = [
    { slug: "cars", label: dict.fleetHub.categoryCars, Icon: Car },
    { slug: "scooters", label: dict.fleetHub.categoryScooters, Icon: Bike },
    { slug: "atv-quad", label: dict.fleetHub.categoryAtv, Icon: Mountain },
    { slug: "buggy", label: dict.fleetHub.categoryBuggy, Icon: Zap },
    { slug: "motorbike", label: dict.fleetHub.categoryMoto, Icon: Bike },
  ] as const;

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

      <section className="bg-background">
        <div className="mx-auto grid max-w-7xl gap-5 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-5 lg:px-8">
          {categories.map((cat) => (
            <Link key={cat.slug} href={localePath(locale, `fleet/${cat.slug}`)} className="island-card group rounded-3xl p-5 transition-transform hover:-translate-y-1">
              <cat.Icon className="h-7 w-7 text-[var(--sea)]" />
              <h2 className="mt-4 text-base font-bold text-[var(--ink)] dark:text-white">{cat.label}</h2>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[var(--sea)]">
                {dict.common.viewAll} <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {categories.filter((c) => vehiclesByCategory(c.slug).length > 0).map((cat) => {
        const items = vehiclesByCategory(cat.slug);
        return (
          <section key={cat.slug} className="border-t border-border/70 bg-sand even:bg-background dark:bg-[var(--background)]">
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
              <div className="flex items-end justify-between gap-4">
                <h2 className="text-2xl font-extrabold text-[var(--ink)] dark:text-white sm:text-3xl">{cat.label}</h2>
                <Link href={localePath(locale, `fleet/${cat.slug}`)} className="inline-flex items-center gap-1 text-sm font-bold text-[var(--sea)] hover:text-[var(--brand-2)]">
                  {dict.common.viewAll} <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {items.map((v) => <VehicleCard key={v.slug} vehicle={v} locale={locale} dict={dict} />)}
              </div>
            </div>
          </section>
        );
      })}

      <ContextualFaq faqs={faqs} locale={locale} dict={dict} />
    </>
  );
}
