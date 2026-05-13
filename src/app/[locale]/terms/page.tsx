import { notFound } from "next/navigation";
import { isLocale, localePath, SITE } from "@/lib/site";
import { getDict } from "@/i18n/dictionaries";
import { seoFor } from "@/lib/seo";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, graph } from "@/lib/schema";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return seoFor("terms", locale, "terms");
}

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDict(locale);

  return (
    <>
      <JsonLd data={graph([
        breadcrumbSchema([
          { name: dict.nav.home, url: `${SITE.domain}${localePath(locale)}` },
          { name: "Terms", url: `${SITE.domain}${localePath(locale, "terms")}` },
        ]),
      ])} />

      <section className="wave-bg border-b border-border/70">
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
          <Breadcrumbs label={dict.common.breadcrumb} items={[
            { label: dict.nav.home, href: localePath(locale) },
            { label: "Terms" },
          ]} />
          <h1 className="mt-5 text-4xl font-extrabold text-[var(--ink)] dark:text-white">Terms &amp; conditions</h1>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8 prose prose-neutral max-w-none text-[var(--ink)] dark:prose-invert dark:text-white">
          <p className="text-muted-foreground">This page summarises the key terms of the rental contract for {SITE.brand}. The full contract is provided in Greek at pickup, with a sworn English translation available on request.</p>
          <h2>Driver requirements</h2>
          <p>Minimum age 21, valid licence held for at least 1 year. SUVs and the buggy require minimum age 23.</p>
          <h2>Insurance</h2>
          <p>Basic CDW is included. Full and Zero Excess upgrades are optional. Tyres, undercarriage and windscreen are not covered by Basic.</p>
          <h2>Cancellation</h2>
          <p>Free cancellation up to 24 hours before pickup. After that, the first day is retained as a no-show fee.</p>
          <h2>Off-road / ferry</h2>
          <p>Driving the vehicle off paved roads (except the Suzuki Jimny and the Polaris buggy) is not permitted. The vehicle may not leave Naxos by ferry without our written permission.</p>
          <h2>Damage protocol</h2>
          <p>The vehicle is photographed at pickup and at return. New damage is logged with photos and the customer is charged according to their insurance level.</p>
          <h2>Contact</h2>
          <p>Questions: <a href={`mailto:${SITE.email}`} className="text-[var(--sea)] hover:underline">{SITE.email}</a> or WhatsApp {SITE.phones[0]}.</p>
        </div>
      </section>
    </>
  );
}
