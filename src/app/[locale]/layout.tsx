import { notFound } from "next/navigation";
import type { Metadata, Viewport } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import "../globals.css";
import "../escape.css";
import "../editorial.css";
import { LOCALES, isLocale, LOCALE_META } from "@/lib/site";
import { getDict } from "@/i18n/dictionaries";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileDock } from "@/components/layout/MobileDock";
import { WhatsAppFab } from "@/components/layout/WhatsAppFab";
import { ScrollRestore } from "@/components/layout/ScrollRestore";
import { CookieBanner } from "@/components/legal/CookieBanner";
import { TouristasChat } from "@/components/ai/TouristasChat";
import { SITE } from "@/lib/site";
import { JsonLd } from "@/components/seo/JsonLd";
import { graph, organizationSchema, localBusinessSchema, websiteSchema } from "@/lib/schema";
import { ConsentAwareAnalytics } from "@/components/analytics/ConsentAwareAnalytics";
import { RouteSurface } from "@/components/layout/RouteSurface";

// Both typefaces include Greek so all five locales share the same typography.
const bodyFont = Inter({ subsets: ["latin", "greek"], variable: "--font-sans", display: "swap" });
const headingFont = Inter_Tight({ subsets: ["latin", "greek"], weight: ["400", "500", "600", "700"], variable: "--font-heading-family", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.domain),
  title: { default: SITE.brand, template: `%s | ${SITE.brand}` },
  description: SITE.tagline.en,
  applicationName: SITE.brand,
  authors: SITE.owners.map((name) => ({ name })),
  creator: SITE.brand,
  publisher: SITE.brand,
  formatDetection: { email: false, address: false, telephone: false },
  // No `icons` block: src/app/{favicon.ico,icon.png,apple-icon.png} are the
  // file conventions, and Next emits the right rel/type/sizes for each. Setting
  // metadata.icons here overrode all of them with a single 32px .ico, which is
  // what an iOS home-screen shortcut was being handed.
  verification: {
    google: "pL-SeZBkk3W6jILNDB7fGwD_hJuVYmXNENO0DhFvYMo",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f0e8" },
    { media: "(prefers-color-scheme: dark)", color: "#071b2a" },
  ],
  colorScheme: "light dark",
};

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
    <html
      lang={LOCALE_META[locale].htmlLang}
      className={`${bodyFont.variable} ${headingFont.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-background text-foreground flex flex-col">
        <div className="flex min-h-full flex-col">
          {/* llms.txt discovery (llmstxt.org). React hoists this into <head>.
              No markdown alternate is declared — no markdown equivalents exist,
              and pointing at one that 404s is worse than omitting the hint. */}
          <link rel="describedby" href={`${SITE.domain}/llms.txt`} type="text/plain" />
          <JsonLd data={graph([organizationSchema(), localBusinessSchema(locale), websiteSchema(locale)])} />
          <ScrollRestore />
          <Header locale={locale} dict={dict} />
          <RouteSurface>{children}</RouteSurface>
          <Footer locale={locale} dict={dict} />
          <MobileDock dict={dict} />
          <WhatsAppFab label={dict.whatsAppFab.label} message={dict.whatsAppFab.message} />
          <CookieBanner dict={dict} locale={locale} />
          {SITE.flags.touristasEnabled && <TouristasChat dict={dict} />}
        </div>
        <ConsentAwareAnalytics />
      </body>
    </html>
  );
}

export const dynamicParams = false;
