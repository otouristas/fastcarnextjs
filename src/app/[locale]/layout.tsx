import { notFound } from "next/navigation";
import { LOCALES, isLocale, LOCALE_META } from "@/lib/site";
import { getDict } from "@/i18n/dictionaries";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFab } from "@/components/layout/WhatsAppFab";
import { ScrollRestore } from "@/components/layout/ScrollRestore";
import { CookieBanner } from "@/components/legal/CookieBanner";
import { TouristasChat } from "@/components/ai/TouristasChat";
import { SITE } from "@/lib/site";
import { JsonLd } from "@/components/seo/JsonLd";
import { graph, organizationSchema, localBusinessSchema, websiteSchema } from "@/lib/schema";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDict(locale);

  return (
    <div lang={LOCALE_META[locale].htmlLang} className="flex min-h-full flex-col">
      <JsonLd data={graph([organizationSchema(), localBusinessSchema(locale), websiteSchema(locale)])} />
      <ScrollRestore />
      <Header locale={locale} dict={dict} currentPath={`/${locale}`} />
      <main id="main" className="flex-1">{children}</main>
      <Footer locale={locale} dict={dict} />
      <WhatsAppFab label={dict.whatsAppFab.label} message={dict.whatsAppFab.message} />
      <CookieBanner dict={dict} locale={locale} />
      {SITE.flags.touristasEnabled && <TouristasChat dict={dict} />}
    </div>
  );
}

export const dynamicParams = false;
