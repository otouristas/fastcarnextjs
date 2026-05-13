import { notFound } from "next/navigation";
import { isLocale, localePath, SITE } from "@/lib/site";
import { getDict } from "@/i18n/dictionaries";
import { seoFor } from "@/lib/seo";
import { FAQS } from "@/content/faqs";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, faqPageSchema, graph } from "@/lib/schema";
import { ContextualFaq } from "@/components/faq/ContextualFaq";
import { Check, X, ShieldCheck } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return seoFor("insurance", locale, "insurance");
}

export default async function InsurancePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDict(locale);
  const faqs = FAQS.filter((f) => ["insurance-included", "what-if-damage", "extra-driver-fee", "documents-needed", "credit-card-required", "insurance-ferry-day"].includes(f.slug));

  return (
    <>
      <JsonLd data={graph([
        breadcrumbSchema([
          { name: dict.nav.home, url: `${SITE.domain}${localePath(locale)}` },
          { name: dict.nav.insurance, url: `${SITE.domain}${localePath(locale, "insurance")}` },
        ]),
        faqPageSchema(faqs, locale),
      ])} />

      <section className="wave-bg border-b border-border/70">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
          <Breadcrumbs label={dict.common.breadcrumb} items={[
            { label: dict.nav.home, href: localePath(locale) },
            { label: dict.nav.insurance },
          ]} />
          <h1 className="mt-5 text-4xl sm:text-5xl font-extrabold tracking-tight text-[var(--ink)] dark:text-white">{dict.insurance.title}</h1>
          <p className="mt-3 text-lg text-muted-foreground max-w-3xl">{dict.insurance.subtitle}</p>
        </div>
      </section>

      <section className="bg-background border-y border-border/70">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
          <h2 className="text-2xl font-bold text-[var(--ink)] dark:text-white">{dict.insurance.levelsTitle}</h2>
          <div className="mt-6 grid md:grid-cols-3 gap-5">
            {dict.insurance.levels.map((lvl, i) => (
              <div key={lvl.name} className={`rounded-3xl border p-6 ${i === 1 ? "border-[var(--brand-2)] bg-white shadow-xl dark:bg-white/10" : "island-card"}`}>
                <ShieldCheck className="h-8 w-8 text-[var(--brand-1)]" />
                <h3 className="mt-3 text-xl font-bold text-[var(--ink)] dark:text-white">{lvl.name}</h3>
                <p className="mt-1 text-sm text-[var(--brand-1)] font-semibold">{lvl.excess}</p>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{lvl.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 grid md:grid-cols-2 gap-8">
            <div className="island-card rounded-3xl p-6">
              <h3 className="text-xl font-bold text-[var(--ink)] dark:text-white">{dict.insurance.includedTitle}</h3>
              <ul className="mt-4 space-y-2 text-sm">
                {dict.insurance.included.map((it) => (
                  <li key={it} className="flex items-start gap-2 text-muted-foreground">
                    <Check className="mt-0.5 h-4 w-4 text-[var(--brand-1)]" /> {it}
                  </li>
                ))}
              </ul>
            </div>
            <div className="island-card rounded-3xl p-6">
              <h3 className="text-xl font-bold text-[var(--ink)] dark:text-white">{dict.insurance.notCoveredTitle}</h3>
              <ul className="mt-4 space-y-2 text-sm">
                {dict.insurance.notCovered.map((it) => (
                  <li key={it} className="flex items-start gap-2 text-muted-foreground">
                    <X className="mt-0.5 h-4 w-4 text-[var(--brand-5)]" /> {it}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
      <ContextualFaq faqs={faqs} locale={locale} dict={dict} />
    </>
  );
}
