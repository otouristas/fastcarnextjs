import { notFound } from "next/navigation";
import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import Script from "next/script";
import "../globals.css";
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
import { ConsentAwareAnalytics } from "@/components/analytics/ConsentAwareAnalytics";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const themeScript = `(function(){try{var k='fmr-theme';var v=localStorage.getItem(k);var m=window.matchMedia('(prefers-color-scheme: dark)').matches;var d=v==='dark'||((!v||v==='system')&&m);var r=document.documentElement;if(d){r.classList.add('dark');r.style.colorScheme='dark';}else{r.classList.remove('dark');r.style.colorScheme='light';}}catch(e){}})();`;

const consentModeScript = `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('consent', 'default', {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    wait_for_update: 500
  });
  gtag('set', 'ads_data_redaction', true);
`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE.domain),
  title: { default: SITE.brand, template: `%s | ${SITE.brand}` },
  description: SITE.tagline.en,
  applicationName: SITE.brand,
  authors: SITE.owners.map((name) => ({ name })),
  creator: SITE.brand,
  publisher: SITE.brand,
  formatDetection: { email: false, address: false, telephone: false },
  icons: {
    icon: SITE.favicon,
    apple: SITE.favicon,
    shortcut: SITE.favicon,
  },
  verification: {
    google: "pL-SeZBkk3W6jILNDB7fGwD_hJuVYmXNENO0DhFvYMo",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#edf5fc" },
    { media: "(prefers-color-scheme: dark)", color: "#061521" },
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
      className={`${outfit.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-background text-foreground flex flex-col">
        <Script id="theme-bootstrap" strategy="beforeInteractive">
          {themeScript}
        </Script>
        <Script id="consent-mode-default" strategy="beforeInteractive">
          {consentModeScript}
        </Script>
        <div className="flex min-h-full flex-col">
          <JsonLd data={graph([organizationSchema(), localBusinessSchema(locale), websiteSchema(locale)])} />
          <ScrollRestore />
          <Header locale={locale} dict={dict} />
          <main id="main" className="flex-1">{children}</main>
          <Footer locale={locale} dict={dict} />
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
