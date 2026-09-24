import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { isLocale, localePath, type Locale } from "@/lib/site";
import { getDict } from "@/i18n/dictionaries";
import { buildMetadata } from "@/lib/seo";
import { LOCATIONS } from "@/content/locations";
import { VEHICLES } from "@/content/fleet";
import { recommendForLocation } from "@/lib/vehicleRecommender";
import { PageMasthead } from "@/components/layout/PageMasthead";
import { ArrowRight, MapPin } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = await getDict(locale);
  return buildMetadata({
    locale,
    path: "naxos/beaches",
    title: dict.naxos.beachesTitle,
    description: dict.naxos.pageSubtitle,
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
  "mikri-vigla": "/images/pexels/naxos-mikri-vigla.webp",
  "filoti": "/images/naxos/filoti.jpg",
  "apeiranthos": "/images/naxos/apiranthos.jpg",
  "apollonas": "/images/naxos/apollonas.jpg",
  "chalki": "/images/naxos/halki.jpg",
  "naxos-town": "/images/pexels/naxos-chora-coast.webp",
  "airport-pickup": "/images/pexels/naxos-chora-coast.webp",
  "port-pickup": "/images/pexels/naxos-chora-coast.webp",
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
      <PageMasthead locale={locale} dict={dict} title={nd.beachesTitle} subtitle={nd.pageSubtitle} label={nd.beachesTitle} image="/images/pexels/naxos-hawaii-beach.webp" />

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
