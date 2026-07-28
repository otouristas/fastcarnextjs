import { notFound } from "next/navigation";
import { isLocale, localePath, SITE } from "@/lib/site";
import { getDict } from "@/i18n/dictionaries";
import { seoFor } from "@/lib/seo";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, graph } from "@/lib/schema";
import { whatsappUrl } from "@/lib/whatsapp";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return seoFor("book", locale, "book");
}

export default async function BookPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDict(locale);

  return (
    <>
      <JsonLd data={graph([
        breadcrumbSchema([
          { name: dict.nav.home, url: `${SITE.domain}${localePath(locale)}` },
          { name: dict.nav.book, url: `${SITE.domain}${localePath(locale, "book")}` },
        ]),
      ])} />

      <section className="wave-bg">
        <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <Breadcrumbs label={dict.common.breadcrumb} items={[
            { label: dict.nav.home, href: localePath(locale) },
            { label: dict.nav.book },
          ]} />
          <span className="mt-5 inline-flex items-center gap-2 rounded-full border border-[var(--sea-2)]/30 bg-white/70 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-[var(--sea)] shadow-sm dark:bg-white/10 dark:text-[var(--sea-2)]">
            <ShieldCheck className="h-4 w-4" /> Secure booking
          </span>
          <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-[var(--ink)] dark:text-white sm:text-5xl">{dict.book.title}</h1>
          <p className="mt-4 text-lg text-muted-foreground">{dict.book.subtitle}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a href={SITE.bookingUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-brand-gradient px-6 py-3 text-sm font-bold text-white shadow-lg shadow-orange-500/20 glow-brand">
              {dict.book.continue} <ArrowRight className="h-4 w-4" />
            </a>
            <a href={whatsappUrl(dict.whatsAppFab.message)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-border bg-white/70 px-6 py-3 text-sm font-bold text-[var(--ink)] shadow-sm hover:border-[var(--sea-2)] dark:bg-white/10 dark:text-white">
              <WhatsAppIcon className="h-5 w-5" /> {dict.book.talkToHuman}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
