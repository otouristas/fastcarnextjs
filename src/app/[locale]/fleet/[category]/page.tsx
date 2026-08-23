import { notFound } from "next/navigation";
import { isLocale, LOCALES, localePath, SITE } from "@/lib/site";
import { getDict } from "@/i18n/dictionaries";
import { seoFor } from "@/lib/seo";
import { vehiclesByCategory, minShoulderPrice, maxHighPrice } from "@/content/fleet";
import { FleetBrowser } from "@/components/fleet/FleetBrowser";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, graph, faqPageSchema } from "@/lib/schema";
import { FAQS } from "@/content/faqs";
import type { VehicleCategory } from "@/types/content";
import { ContextualFaq } from "@/components/faq/ContextualFaq";
import { ArrowRight, BadgeCheck, Car, KeyRound, MapPin, ShieldCheck, Sparkles } from "lucide-react";

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
  const minPrice = minShoulderPrice(vehicles);
  const maxPrice = maxHighPrice(vehicles);
  const heroVehicle = vehicles[0];
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

      <section className="wave-bg border-b border-border/70">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Breadcrumbs label={dict.common.breadcrumb} items={[
                { label: dict.nav.home, href: localePath(locale) },
                { label: dict.nav.fleet, href: localePath(locale, "fleet") },
                { label: navLabels[cat] },
              ]} />
              <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-[var(--sea-2)]/30 bg-white/70 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[var(--sea)] shadow-sm dark:bg-white/10 dark:text-[var(--sea-2)]">
                <Sparkles className="h-4 w-4" /> {dict.hero.eyebrow}
              </span>
              <h1 className="mt-5 max-w-4xl text-4xl font-extrabold tracking-tight text-[var(--ink)] dark:text-white sm:text-6xl">{catLabels[cat]}</h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">{categoryDetails.description}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={SITE.bookingUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-brand-gradient px-6 py-3 text-sm font-bold text-white shadow-lg" style={{ boxShadow: '0 4px 20px rgba(7,27,42,0.25)' }}>
                  {dict.cta.bookCar} <ArrowRight className="h-4 w-4" />
                </a>
                <a href={`tel:${SITE.phones[0]}`} className="inline-flex items-center gap-2 rounded-full border border-border bg-white/75 px-6 py-3 text-sm font-bold text-[var(--ink)] shadow-sm dark:bg-white/10 dark:text-white">
                  {dict.cta.callNow}
                </a>
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="island-card rounded-[2rem] p-5">
                <div className="rounded-[1.5rem] sea-gradient p-6 text-white">
                  <Car className="h-9 w-9" />
                  <p className="mt-5 text-sm uppercase tracking-[0.2em] text-white/70">{navLabels[cat]}</p>
                  <p className="mt-2 text-4xl font-extrabold">
                    {minPrice != null && maxPrice != null ? `€${minPrice}–€${maxPrice}` : dict.cta.priceOnRequest}
                  </p>
                  <p className="text-sm text-white/75">{dict.common.perDay}</p>
                </div>
                {heroVehicle && (
                  <div className="mt-4 grid gap-3 rounded-3xl bg-white/70 p-4 text-sm dark:bg-white/10">
                    <div className="font-bold text-[var(--ink)] dark:text-white">{heroVehicle.name[locale]}</div>
                    <div className="text-muted-foreground">{heroVehicle.tagline[locale]}</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

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
  return copy[locale === "el" ? "el" : "en"];
}
