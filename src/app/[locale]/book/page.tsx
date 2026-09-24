import { notFound } from "next/navigation";
import { isLocale, localePath, SITE } from "@/lib/site";
import { getDict } from "@/i18n/dictionaries";
import { seoFor } from "@/lib/seo";
import { PageMasthead } from "@/components/layout/PageMasthead";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, graph } from "@/lib/schema";
import { whatsappUrl } from "@/lib/whatsapp";
import { ArrowRight } from "lucide-react";
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

      <PageMasthead locale={locale} dict={dict} title={dict.book.title} subtitle={dict.book.subtitle} label={dict.nav.book} image="/images/pexels/naxos-chora-coast.webp">
        <div className="escape-actions"><a href={SITE.bookingUrl} target="_blank" rel="noopener noreferrer" className="escape-button">{dict.book.continue}<ArrowRight size={18}/></a><a href={whatsappUrl(dict.whatsAppFab.message)} target="_blank" rel="noopener noreferrer" className="escape-text-link"><WhatsAppIcon className="h-5 w-5"/>{dict.book.talkToHuman}</a></div>
      </PageMasthead>
    </>
  );
}
