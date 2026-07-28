import { notFound } from "next/navigation";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { getDict } from "@/i18n/dictionaries";
import { breadcrumbSchema, graph } from "@/lib/schema";
import { seoFor } from "@/lib/seo";
import { isLocale, localePath, SITE } from "@/lib/site";
import { ArrowRight } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return seoFor("pricing", locale, "pricing", { noindex: true });
}

export default async function PricingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDict(locale);

  return (
    <>
      <JsonLd
        data={graph([
          breadcrumbSchema([
            { name: dict.nav.home, url: `${SITE.domain}${localePath(locale)}` },
            { name: dict.nav.pricing, url: `${SITE.domain}${localePath(locale, "pricing")}` },
          ]),
        ])}
      />
      <section className="wave-bg border-b border-border/70">
        <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
          <Breadcrumbs
            label={dict.common.breadcrumb}
            items={[
              { label: dict.nav.home, href: localePath(locale) },
              { label: dict.nav.pricing },
            ]}
          />
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            {dict.pricing.title}
          </h1>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={SITE.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center gap-2 rounded-full bg-brand-gradient px-6 py-3 text-sm font-bold text-white"
            >
              {dict.nav.bookNow} <ArrowRight className="h-4 w-4" />
            </a>
            <Link
              href={localePath(locale, "contact")}
              className="inline-flex min-h-12 items-center rounded-full border border-border bg-background px-6 py-3 text-sm font-bold text-foreground"
            >
              {dict.nav.contact}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
