import { notFound } from "next/navigation";
import { isLocale, LOCALES, localePath, SITE } from "@/lib/site";
import { getDict } from "@/i18n/dictionaries";
import { seoFor } from "@/lib/seo";
import { vehiclesByCategory } from "@/content/fleet";
import { FleetBrowser } from "@/components/fleet/FleetBrowser";
import { PageMasthead } from "@/components/layout/PageMasthead";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, graph, faqPageSchema } from "@/lib/schema";
import { FAQS } from "@/content/faqs";
import type { VehicleCategory } from "@/types/content";
import { ContextualFaq } from "@/components/faq/ContextualFaq";
import { ArrowRight, BadgeCheck, KeyRound, MapPin, ShieldCheck } from "lucide-react";

const VALID_CATEGORIES: VehicleCategory[] = ["cars"];

export function generateStaticParams() {
  const params: { locale: string; category: string }[] = [];
  for (const locale of LOCALES) for (const c of VALID_CATEGORIES) params.push({ locale, category: c });
  return params;
}

export const dynamicParams = false;

const categoryFaqMap: Record<VehicleCategory, string[]> = {
  cars: ["do-i-need-car-naxos", "automatic-availability", "4x4-needed", "child-seats", "fuel-policy", "documents-needed"],
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string; category: string }> }) {
  const { locale, category } = await params;
  if (!isLocale(locale) || !VALID_CATEGORIES.includes(category as VehicleCategory)) return {};
  return seoFor(`fleet/${category}`, locale, `fleet/${category}`);
}

export default async function FleetCategoryPage({ params }: { params: Promise<{ locale: string; category: string }> }) {
  const { locale, category } = await params;
  if (!isLocale(locale) || !VALID_CATEGORIES.includes(category as VehicleCategory)) notFound();
  const dict = await getDict(locale);
  const cat = category as VehicleCategory;
  const vehicles = vehiclesByCategory(cat);
  const catLabels = {
    cars: dict.fleetHub.categoryCars,
  } as const;
  const navLabels = {
    cars: dict.nav.cars,
  } as const;
  const faqs = categoryFaqMap[cat]
    .map((slug) => FAQS.find((f) => f.slug === slug))
    .filter((f): f is (typeof FAQS)[number] => Boolean(f));
  const categoryDetails = getCategoryDetails(cat, locale);

  return (
    <>
      <JsonLd data={graph([
        breadcrumbSchema([
          { name: dict.nav.home, url: `${SITE.domain}${localePath(locale)}` },
          { name: dict.nav.fleet, url: `${SITE.domain}${localePath(locale, "fleet")}` },
          { name: navLabels[cat], url: `${SITE.domain}${localePath(locale, `fleet/${cat}`)}` },
        ]),
        faqPageSchema(faqs, locale),
      ])} />

      <PageMasthead locale={locale} dict={dict} title={catLabels[cat]} subtitle={categoryDetails.description} label={navLabels[cat]} image="/images/fleet/studio/toyota-aygo.webp">
        <a className="escape-button" href={SITE.bookingUrl} target="_blank" rel="noopener noreferrer">{dict.cta.bookCar}<ArrowRight size={18}/></a>
      </PageMasthead>

      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid gap-5 md:grid-cols-3">
            {categoryDetails.highlights.map((item, index) => {
              const Icon = [MapPin, ShieldCheck, KeyRound][index] ?? BadgeCheck;
              return (
                <div key={item} className="island-card rounded-3xl p-6">
                  <Icon className="h-7 w-7 text-[var(--sea)]" />
                  <p className="mt-4 text-sm font-semibold leading-6 text-[var(--ink)] dark:text-white">{item}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-sand dark:bg-[var(--background)] border-t border-border/70">
        <FleetBrowser vehicles={vehicles} locale={locale} dict={dict} />
      </section>

      <ContextualFaq faqs={faqs} locale={locale} dict={dict} title={dict.faqTeaser.title} subtitle={categoryDetails.faqIntro} />
    </>
  );
}

function getCategoryDetails(_category: VehicleCategory, locale: string) {
  const copy = {
    en: {
      description: "Compact automatics, family hatchbacks, cabrios, SUVs and 7-seaters for relaxed Naxos road trips from Chora to Apeiranthos, Alyko and Apollonas.",
      highlights: ["Best for families, couples and village day trips", "Free airport, port and hotel delivery anywhere on Naxos", "Unlimited kilometres, basic CDW and second driver included"],
      faqIntro: "Helpful answers for choosing, booking and driving a rental car on Naxos.",
    },
    el: {
      description: "Μικρά αυτόματα, οικογενειακά hatchback, cabrio, SUV και 7θέσια για άνετες διαδρομές στη Νάξο από τη Χώρα μέχρι την Απείρανθο, το Αλυκό και τον Απόλλωνα.",
      highlights: ["Ιδανικά για οικογένειες, ζευγάρια και εκδρομές στα χωριά", "Δωρεάν παράδοση σε αεροδρόμιο, λιμάνι και κατάλυμα", "Απεριόριστα χιλιόμετρα, βασική ασφάλεια και δεύτερος οδηγός"],
      faqIntro: "Χρήσιμες απαντήσεις για επιλογή, κράτηση και οδήγηση αυτοκινήτου στη Νάξο.",
    },
  } as const;
  const translated = {
    it: {description:"Auto compatte, automatiche, cabrio, SUV e 7 posti per esplorare Naxos, da Chora ad Apeiranthos, Alyko e Apollonas.",highlights:["Per famiglie, coppie e gite nei borghi","Consegna gratuita in aeroporto, al porto e in hotel a Naxos","Chilometri illimitati, CDW base e secondo guidatore inclusi"],faqIntro:"Risposte pratiche per scegliere, prenotare e guidare un’auto a noleggio a Naxos."},
    fr: {description:"Citadines, automatiques, cabriolets, SUV et 7 places pour découvrir Naxos, de Chora à Apeiranthos, Alyko et Apollonas.",highlights:["Pour les familles, les couples et les escapades dans les villages","Livraison gratuite à l’aéroport, au port et à votre hôtel à Naxos","Kilométrage illimité, CDW de base et second conducteur inclus"],faqIntro:"Des réponses pratiques pour choisir, réserver et conduire une voiture de location à Naxos."},
    de: {description:"Kleinwagen, Automatikautos, Cabrios, SUVs und 7-Sitzer für entspannte Ausflüge auf Naxos – von Chora nach Apeiranthos, Alyko und Apollonas.",highlights:["Für Familien, Paare und Ausflüge in die Dörfer","Kostenlose Übergabe am Flughafen, Hafen oder Hotel auf Naxos","Unbegrenzte Kilometer, Basis-CDW und zweiter Fahrer inklusive"],faqIntro:"Praktische Antworten zur Auswahl, Buchung und Fahrt mit dem Mietwagen auf Naxos."},
  };
  return locale in translated ? translated[locale as keyof typeof translated] : copy[locale === "el" ? "el" : "en"];
}
