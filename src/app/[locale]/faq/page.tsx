import { notFound } from "next/navigation";
import { isLocale, localePath, SITE } from "@/lib/site";
import { getDict } from "@/i18n/dictionaries";
import { seoFor } from "@/lib/seo";
import { FAQS } from "@/content/faqs";
import { PageMasthead } from "@/components/layout/PageMasthead";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, graph, faqPageSchema } from "@/lib/schema";

const CATEGORY_ORDER = ["booking", "documents", "vehicles", "insurance", "delivery", "driving"] as const;
const CATEGORY_LABELS: Record<string, string> = {
  booking: "Booking & cancellation",
  documents: "Documents & licences",
  vehicles: "Vehicles & options",
  insurance: "Insurance & deposit",
  delivery: "Delivery & pickup",
  driving: "Driving on Naxos",
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return seoFor("faq", locale, "faq");
}

export default async function FaqPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDict(locale);

  return (
    <>
      <JsonLd data={graph([
        faqPageSchema(FAQS, locale),
        breadcrumbSchema([
          { name: dict.nav.home, url: `${SITE.domain}${localePath(locale)}` },
          { name: dict.nav.faq, url: `${SITE.domain}${localePath(locale, "faq")}` },
        ]),
      ])} />

      <PageMasthead locale={locale} dict={dict} title={dict.faqHub.title} subtitle={dict.faqHub.subtitle} label={dict.nav.faq} image="/images/naxos/halki.jpg" />

      <section className="bg-background border-y border-border/70">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-14 space-y-12">
          <nav aria-label="FAQ categories" className="flex flex-wrap gap-2">
            {CATEGORY_ORDER.map((cat) => (
              <a key={cat} href={`#cat-${cat}`} className="inline-flex items-center rounded-full border border-border bg-white/70 px-3 py-1.5 text-xs font-semibold text-[var(--ink)] shadow-sm hover:border-[var(--sea-2)] dark:bg-white/10 dark:text-white">
                {CATEGORY_LABELS[cat]}
              </a>
            ))}
          </nav>
          {CATEGORY_ORDER.map((cat) => {
            const items = FAQS.filter((f) => f.category === cat);
            if (items.length === 0) return null;
            return (
              <div key={cat} id={`cat-${cat}`} className="scroll-mt-24">
                <h2 className="text-2xl font-bold mb-4 text-[var(--sea)] dark:text-[var(--sea-2)]">{CATEGORY_LABELS[cat]}</h2>
                <ul className="space-y-3">
                  {items.map((f) => (
                    <li key={f.slug}>
                      <details className="group island-card rounded-3xl p-5 open:border-[var(--sea-2)]">
                        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-[var(--ink)] dark:text-white">
                          {f.question[locale]}
                          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[var(--sea-soft)] text-[var(--sea)] transition-transform group-open:rotate-45 dark:bg-white/10 dark:text-white">+</span>
                        </summary>
                        <p className="mt-3 text-sm leading-7 text-muted-foreground">{f.answer[locale]}</p>
                      </details>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
