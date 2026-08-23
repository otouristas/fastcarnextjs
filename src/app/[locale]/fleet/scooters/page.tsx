import { notFound } from "next/navigation";
import Link from "next/link";
import { isLocale, LOCALES, localePath, SITE, type Locale } from "@/lib/site";
import { getDict } from "@/i18n/dictionaries";
import { buildMetadata } from "@/lib/seo";
import { VEHICLES } from "@/content/fleet";
import { SCOOTER_GUIDE, SCOOTER_KEYWORDS } from "@/content/scooter-guide";
import { VehicleCard } from "@/components/fleet/VehicleCard";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, graph, qaPageSchema } from "@/lib/schema";
import { whatsappUrl } from "@/lib/whatsapp";
import { ArrowRight, Info, Wind } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

/**
 * This URL is the single highest-traffic page on the site (100 clicks / 2,800
 * impressions a quarter) and was left returning 404 when the fleet went
 * cars-only. Rather than throwing that away or 301-ing it into an unrelated
 * page, the URL is retained as an honest editorial answer to the query: it says
 * in the first paragraph that we rent cars only, genuinely answers what people
 * searching "scooter rental Naxos" need to know, and routes to the car fleet.
 *
 * Copy lives in src/content/scooter-guide.ts so /el is Greek rather than
 * English served under lang="el". The workbook's own title for this path is
 * deliberately not applied — it was written under an "owner decision pending"
 * gate and promises "Live Availability" for a product we do not rent.
 */
export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return buildMetadata({
    locale,
    path: "fleet/scooters",
    title: SCOOTER_GUIDE.title[locale],
    description: SCOOTER_GUIDE.description[locale],
    keywords: SCOOTER_KEYWORDS,
  });
}

export default async function ScooterRentalNaxosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const loc = locale as Locale;
  const dict = await getDict(loc);
  const g = SCOOTER_GUIDE;
  const alternatives = VEHICLES.filter((v) =>
    ["hyundai-i10", "toyota-aygo", "fiat-panda"].includes(v.slug),
  );
  const faqPairs = g.faq.map((f) => ({ q: f.q[loc], a: f.a[loc] }));

  return (
    <>
      <JsonLd
        data={graph([
          qaPageSchema(faqPairs),
          breadcrumbSchema([
            { name: dict.nav.home, url: `${SITE.domain}${localePath(loc)}` },
            { name: dict.nav.fleet, url: `${SITE.domain}${localePath(loc, "fleet")}` },
            { name: g.breadcrumb[loc], url: `${SITE.domain}${localePath(loc, "fleet/scooters")}` },
          ]),
        ])}
      />

      <section className="wave-bg border-b border-border">
        <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
          <Breadcrumbs
            label={dict.common.breadcrumb}
            items={[
              { label: dict.nav.home, href: localePath(loc) },
              { label: dict.nav.fleet, href: localePath(loc, "fleet") },
              { label: g.breadcrumb[loc] },
            ]}
          />
          <h1 className="mt-5 text-3xl font-extrabold leading-[1.1] tracking-tight text-[var(--prose-heading)] sm:text-4xl lg:text-5xl">
            {g.h1[loc]}
          </h1>

          {/* The disclosure comes first, before any advice. */}
          <div className="answer-block mt-6 flex gap-4 rounded-3xl p-6 sm:p-7">
            <Info className="mt-0.5 h-5 w-5 flex-none text-[var(--sea)]" />
            <p className="editorial-lead text-[var(--prose-heading)]">
              <strong>{g.disclosureLead[loc]}</strong> {g.disclosureBody[loc]}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto max-w-4xl space-y-10 px-4 py-14 sm:px-6 lg:px-8">
          {g.sections.map((section, i) => (
            <div key={section.heading.en}>
              <h2 className="text-2xl font-extrabold tracking-tight text-[var(--prose-heading)]">
                {section.heading[loc]}
              </h2>
              <p className="editorial mt-3 max-w-[68ch]">{section.body[loc]}</p>

              {/* The wind card sits under the section it qualifies. */}
              {i === 0 && (
                <div className="island-card mt-6 flex gap-4 rounded-3xl p-6">
                  <Wind className="mt-0.5 h-5 w-5 flex-none text-[var(--sea)]" />
                  <div>
                    <h3 className="font-bold text-[var(--prose-heading)]">{g.windTipTitle[loc]}</h3>
                    <p className="mt-2 text-sm leading-7 text-muted-foreground">{g.windTipBody[loc]}</p>
                  </div>
                </div>
              )}

              {i === 1 && (
                <Link
                  href={localePath(loc, "guides/idp-greece-rules")}
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-[var(--link)] underline underline-offset-2 hover:text-[var(--link-hover)]"
                >
                  {g.idpLinkLabel[loc]} <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Decision table. Scrolls inside its own container so a narrow viewport
          never scrolls the page body sideways, and stays keyboard-reachable. */}
      <section className="border-y border-border bg-sand dark:bg-[var(--background)]">
        <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold tracking-tight text-[var(--prose-heading)]">
            {g.headings.comparison[loc]}
          </h2>
          <div
            className="mt-6 overflow-x-auto rounded-2xl border border-border"
            tabIndex={0}
            role="region"
            aria-label={g.comparison.caption[loc]}
          >
            <table className="editorial-table w-full min-w-[42rem] text-left text-sm">
              <caption className="sr-only">{g.comparison.caption[loc]}</caption>
              <thead>
                <tr>
                  {g.comparison.columns.map((col, i) => (
                    <th key={i} scope="col" className="px-4 py-3 font-bold">
                      {col[loc]}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {g.comparison.rows.map((row) => (
                  <tr key={row[0].en}>
                    <th scope="row" className="px-4 py-3 text-left font-semibold text-[var(--prose-heading)]">
                      {row[0][loc]}
                    </th>
                    {row.slice(1).map((cell, i) => (
                      <td key={i} className="px-4 py-3 text-[var(--prose-body)]">
                        {cell[loc]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold tracking-tight text-[var(--prose-heading)]">
            {g.headings.faq[loc]}
          </h2>
          {/* A visible <dl>, not an accordion: collapsed text is indexed but
              does not win featured snippets. */}
          <dl className="mt-8 divide-y divide-[var(--prose-rule)]">
            {g.faq.map((item) => (
              <div key={item.q.en} className="py-6 first:pt-0">
                <dt className="text-base font-bold text-[var(--prose-heading)]">{item.q[loc]}</dt>
                <dd className="mt-2 max-w-[68ch] text-[0.95rem] leading-7 text-[var(--prose-body)]">
                  {item.a[loc]}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="border-t border-border bg-background">
        <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold tracking-tight text-[var(--prose-heading)]">
            {g.headings.whatWeRent[loc]}
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{g.whatWeRentLead[loc]}</p>
          <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {alternatives.map((v) => (
              <VehicleCard key={v.slug} vehicle={v} locale={loc} dict={dict} />
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={localePath(loc, "fleet/cars")}
              className="inline-flex items-center gap-2 rounded-full bg-brand-gradient px-6 py-3 text-sm font-bold text-white transition hover:brightness-110"
            >
              {dict.cta.seeFleet} <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={whatsappUrl(dict.whatsAppFab.message)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-bold text-[var(--ink)] transition hover:border-[var(--sea)] hover:text-[var(--sea)] dark:text-white"
            >
              <WhatsAppIcon className="h-4 w-4" /> {dict.cta.whatsappQuote}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
