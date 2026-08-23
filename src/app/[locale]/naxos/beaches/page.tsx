import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { isLocale, localePath, type Locale } from "@/lib/site";
import { getDict } from "@/i18n/dictionaries";
import { buildMetadata } from "@/lib/seo";
import { LOCATIONS } from "@/content/locations";
import { VEHICLES } from "@/content/fleet";
import { recommendForLocation } from "@/lib/vehicleRecommender";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ArrowRight, MapPin } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return buildMetadata({
    locale,
    path: "naxos/beaches",
    title: "Naxos Beaches & Villages  -  Complete Guide with Vehicle Recommendations",
    description: "Explore every beach and mountain village on Naxos with expert vehicle recommendations for each destination.",
    keywords: ["Naxos beaches", "Naxos villages", "Agios Prokopios", "Agia Anna", "Plaka beach", "Filoti", "Apeiranthos"],
  });
}

const BEACH_SLUGS = ["agios-prokopios", "agia-anna", "plaka", "stelida", "mikri-vigla"];
const VILLAGE_SLUGS = ["filoti", "apeiranthos", "apollonas", "chalki", "naxos-town"];

const LOCATION_IMAGES: Record<string, string> = {
  "agios-prokopios": "/images/naxos/agios-prokopios.jpg",
  "agia-anna": "/images/naxos/agia-anna.jpg",
  "plaka": "/images/naxos/plaka-beach.jpg",
  "stelida": "/images/naxos/agios-prokopios.jpg",
  "mikri-vigla": "/images/naxos/mikri-vigla.jpg",
  "filoti": "/images/naxos/filoti.jpg",
  "apeiranthos": "/images/naxos/apiranthos.jpg",
  "apollonas": "/images/naxos/apollonas.jpg",
  "chalki": "/images/naxos/halki.jpg",
  "naxos-town": "/images/naxos/chora.jpg",
  "airport-pickup": "/images/naxos/chora.jpg",
  "port-pickup": "/images/naxos/chora.jpg",
};

function LocationCard({ slug, locale, dict, image }: { slug: string; locale: Locale; dict: Awaited<ReturnType<typeof import("@/i18n/dictionaries").getDict>>; image: string }) {
  const loc = LOCATIONS.find((l) => l.slug === slug);
  if (!loc) return null;
  const recommended = recommendForLocation(slug, VEHICLES, 1);
  const topVehicle = recommended[0];

  return (
    <div className="island-card overflow-hidden rounded-3xl">
      <div className="relative h-52 overflow-hidden">
        <Image src={image} alt={loc.shortName} fill className="object-cover" />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          <p className="font-extrabold text-white">{loc.shortName}</p>
        </div>
      </div>
      <div className="p-5 space-y-3">
        <p className="text-sm leading-relaxed text-muted-foreground line-clamp-3">{loc.body[locale]}</p>
        <div className="flex flex-wrap gap-1.5">
          <span className="inline-flex items-center gap-1 rounded-full bg-[var(--sea-soft)] px-2.5 py-1 text-xs font-semibold text-[var(--sea)] dark:bg-white/10 dark:text-[var(--sea-2)]">
            <MapPin className="h-3 w-3" /> {loc.distanceFromChoraKm} km
          </span>
          {loc.highlights.slice(0, 2).map((h, i) => (
            <span key={i} className="inline-flex items-center rounded-full border border-border px-2.5 py-1 text-xs text-muted-foreground">
              {h[locale]}
            </span>
          ))}
        </div>
        {topVehicle && (
          <div className="rounded-2xl border border-[var(--sea-2)]/30 bg-[var(--sea-soft)]/40 p-3 dark:bg-white/5">
            <p className="text-[11px] font-bold uppercase tracking-wide text-[var(--sea)]">
              {dict.naxos.bestVehicleFor} {loc.shortName}
            </p>
            <p className="mt-1 text-sm font-semibold text-foreground">{topVehicle.vehicle.name[locale]}</p>
            <p className="text-xs text-muted-foreground">{topVehicle.reason[locale]}</p>
          </div>
        )}
        <Link
          href={localePath(locale, `locations/${slug}`)}
          className="mt-2 inline-flex items-center gap-1 text-sm font-bold text-[var(--sea)] hover:text-[var(--brand-2)]"
        >
          {dict.naxos.readMoreAbout} <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}

export default async function NaxosBeachesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDict(locale);
  const nd = dict.naxos;

  const beachLabel = {
    en: "Beaches", el: "Παραλίες", it: "Spiagge", fr: "Plages", de: "Strände",
  }[locale] ?? "Beaches";

  const villageLabel = {
    en: "Mountain Villages", el: "Ορεινά Χωριά", it: "Villaggi di Montagna", fr: "Villages de Montagne", de: "Bergdörfer",
  }[locale] ?? "Mountain Villages";

  return (
    <>
      <section className="wave-bg border-b border-border/70">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <Breadcrumbs label={dict.common.breadcrumb} items={[
            { label: dict.nav.home, href: localePath(locale) },
            { label: nd.pageTitle, href: localePath(locale, "naxos") },
            { label: nd.beachesTitle },
          ]} />
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-[var(--ink)] dark:text-white sm:text-6xl">
            {nd.beachesTitle}
          </h1>
          <p className="mt-5 max-w-3xl text-lg text-muted-foreground">
            {locale === "el"
              ? "Κάθε παραλία και ορεινό χωριό στη Νάξο  -  με προτεινόμενα οχήματα για τη μεγαλύτερη εμπειρία."
              : locale === "it"
              ? "Ogni spiaggia e villaggio di montagna a Naxos  -  con consigli sui veicoli per la migliore esperienza."
              : locale === "fr"
              ? "Chaque plage et village de montagne à Naxos  -  avec des recommandations de véhicules pour la meilleure expérience."
              : locale === "de"
              ? "Jeder Strand und jedes Bergdorf auf Naxos  -  mit Fahrzeugempfehlungen für das beste Erlebnis."
              : "Every beach and mountain village on Naxos  -  with vehicle recommendations for the best experience."}
          </p>
        </div>
      </section>

      <section className="bg-background border-b border-border/70">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold text-foreground">{beachLabel}</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {BEACH_SLUGS.map((slug) => (
              <LocationCard
                key={slug}
                slug={slug}
                locale={locale}
                dict={dict}
                image={LOCATION_IMAGES[slug] ?? "/images/naxos-island.jpg"}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-sand dark:bg-[var(--background)]">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold text-foreground">{villageLabel}</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {VILLAGE_SLUGS.map((slug) => (
              <LocationCard
                key={slug}
                slug={slug}
                locale={locale}
                dict={dict}
                image={LOCATION_IMAGES[slug] ?? "/images/naxos-island.jpg"}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
