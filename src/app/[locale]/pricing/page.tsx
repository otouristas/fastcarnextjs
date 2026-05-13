import { notFound } from "next/navigation";
import Link from "next/link";
import { isLocale, localePath, SITE } from "@/lib/site";
import { getDict } from "@/i18n/dictionaries";
import { seoFor } from "@/lib/seo";
import { VEHICLES } from "@/content/fleet";
import { FAQS } from "@/content/faqs";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, faqPageSchema, graph } from "@/lib/schema";
import { ContextualFaq } from "@/components/faq/ContextualFaq";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return seoFor("pricing", locale, "pricing");
}

export default async function PricingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDict(locale);
  const groups = ["cars", "scooters", "atv-quad", "buggy"] as const;
  const faqs = FAQS.filter((f) => ["rental-cost", "advance-vs-walkin", "credit-card-required", "cancellation", "delivery-zones", "insurance-included"].includes(f.slug));
  const groupLabels = {
    cars: dict.nav.cars, scooters: dict.nav.scooters,
    "atv-quad": dict.nav.atvQuad, buggy: dict.nav.buggy,
  } as const;

  return (
    <>
      <JsonLd data={graph([
        breadcrumbSchema([
          { name: dict.nav.home, url: `${SITE.domain}${localePath(locale)}` },
          { name: dict.nav.pricing, url: `${SITE.domain}${localePath(locale, "pricing")}` },
        ]),
        faqPageSchema(faqs, locale),
      ])} />
      <section className="wave-bg border-b border-border/70">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
          <Breadcrumbs label={dict.common.breadcrumb} items={[
            { label: dict.nav.home, href: localePath(locale) },
            { label: dict.nav.pricing },
          ]} />
          <h1 className="mt-5 text-4xl sm:text-5xl font-extrabold tracking-tight text-[var(--ink)] dark:text-white">{dict.pricing.title}</h1>
          <p className="mt-3 text-lg text-muted-foreground max-w-3xl">{dict.pricing.subtitle}</p>
        </div>
      </section>

      <section className="bg-background border-t border-border/70">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 space-y-12">
          {groups.map((g) => {
            const items = VEHICLES.filter((v) => v.category === g);
            if (items.length === 0) return null;
            return (
              <div key={g}>
                <h2 className="text-2xl font-bold mb-4 text-[var(--ink)] dark:text-white">{groupLabels[g]}</h2>
                <div className="overflow-x-auto rounded-3xl border border-border bg-white shadow-sm dark:bg-white/10">
                  <table className="w-full text-sm">
                    <thead className="bg-[var(--sea-soft)] text-[var(--ink)] dark:bg-white/10 dark:text-white">
                      <tr>
                        <th className="text-left px-4 py-3 font-medium">Vehicle</th>
                        <th className="text-left px-4 py-3 font-medium">{dict.pricing.shoulder}</th>
                        <th className="text-left px-4 py-3 font-medium">{dict.pricing.high}</th>
                        <th className="text-left px-4 py-3 font-medium">{dict.pricing.weekly}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border bg-white dark:bg-transparent dark:divide-white/10">
                      {items.map((v) => (
                        <tr key={v.slug} className="hover:bg-[var(--sand)] dark:hover:bg-white/10">
                          <td className="px-4 py-3">
                            <Link href={localePath(locale, `fleet/${v.category}/${v.slug}`)} className="font-semibold text-[var(--ink)] hover:text-[var(--brand-2)] dark:text-white">
                              {v.name[locale]}
                            </Link>
                            <div className="text-xs text-muted-foreground">{v.brand} {v.model}</div>
                          </td>
                          <td className="px-4 py-3 text-[var(--brand-1)] font-semibold">€{v.priceShoulder}</td>
                          <td className="px-4 py-3">€{v.priceHigh}</td>
                          <td className="px-4 py-3">€{v.priceWeekly}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })}
          <p className="text-sm text-muted-foreground">{dict.pricing.note}</p>
        </div>
      </section>
      <ContextualFaq faqs={faqs} locale={locale} dict={dict} />
    </>
  );
}
