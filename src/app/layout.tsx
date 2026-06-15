import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { SITE } from "@/lib/site";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const themeScript = `(function(){try{var k='fmr-theme';var v=localStorage.getItem(k);var m=window.matchMedia('(prefers-color-scheme: dark)').matches;var d=v==='dark'||((!v||v==='system')&&m);var r=document.documentElement;if(d){r.classList.add('dark');r.style.colorScheme='dark';}else{r.classList.remove('dark');r.style.colorScheme='light';}}catch(e){}})();`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE.domain),
  title: { default: SITE.brand, template: `%s | ${SITE.brand}` },
  description: SITE.tagline.en,
  applicationName: SITE.brand,
  authors: SITE.owners.map((name) => ({ name })),
  creator: SITE.brand,
  publisher: SITE.brand,
  formatDetection: { email: false, address: false, telephone: false },
  alternates: { canonical: `${SITE.domain}/` },
  icons: {
    icon: SITE.logo,
    apple: SITE.logo,
  },
  verification: {
    google: "pL-SeZBkk3W6jILNDB7fGwD_hJuVYmXNENO0DhFvYMo",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#edf5fc" },
    { media: "(prefers-color-scheme: dark)", color: "#081b2e" },
  ],
  colorScheme: "light dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${outfit.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full bg-background text-foreground flex flex-col">
        {children}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-CWXLKV3G9T"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-CWXLKV3G9T');
          `}
        </Script>
      </body>
    </html>
  );
}

