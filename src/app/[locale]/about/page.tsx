import { notFound } from "next/navigation";
import Link from "next/link";
import { isLocale, localePath, SITE } from "@/lib/site";
import { getDict } from "@/i18n/dictionaries";
import { seoFor } from "@/lib/seo";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, graph } from "@/lib/schema";
import { ArrowRight } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { whatsappUrl } from "@/lib/whatsapp";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return seoFor("about", locale, "about", {
    title: SITE.tagline[locale],
    description: SITE.tagline[locale],
    noindex: true,
  });
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDict(locale);

  const aboutPage = {
    "@type": "AboutPage",
    "@id": `${SITE.domain}${localePath(locale, "about")}`,
    name: dict.about.title,
    description: SITE.tagline[locale],
    inLanguage: locale,
  };

  return (
    <>
      <JsonLd data={graph([
        aboutPage,
        breadcrumbSchema([
          { name: dict.nav.home, url: `${SITE.domain}${localePath(locale)}` },
          { name: dict.nav.about, url: `${SITE.domain}${localePath(locale, "about")}` },
        ]),
      ])} />

      <section className="wave-bg border-b border-border/70">
        <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
          <Breadcrumbs label={dict.common.breadcrumb} items={[
            { label: dict.nav.home, href: localePath(locale) },
            { label: dict.nav.about },
          ]} />
          <h1 className="mt-5 text-4xl sm:text-5xl font-extrabold tracking-tight text-[var(--ink)] dark:text-white">{dict.about.title}</h1>
          <p className="mt-3 text-lg text-muted-foreground max-w-3xl">{SITE.tagline[locale]}</p>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
          <p className="text-lg leading-relaxed text-[var(--ink)] dark:text-white">
            {SITE.brand} · {SITE.tagline[locale]}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={whatsappUrl(dict.whatsAppFab.message)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-brand-gradient px-5 py-3 text-sm font-bold text-white shadow-lg shadow-orange-500/20">
              <WhatsAppIcon className="h-5 w-5" /> {dict.cta.whatsappQuote}
            </a>
            <Link href={localePath(locale, "fleet")} className="inline-flex items-center gap-2 rounded-full border border-border bg-white/70 px-5 py-3 text-sm font-bold text-[var(--ink)] shadow-sm hover:border-[var(--sea-2)] dark:bg-white/10 dark:text-white">
              {dict.cta.seeFleet} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
