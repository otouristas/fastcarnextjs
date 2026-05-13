import { notFound } from "next/navigation";
import Link from "next/link";
import { isLocale, localePath, SITE } from "@/lib/site";
import { getDict } from "@/i18n/dictionaries";
import { seoFor } from "@/lib/seo";
import { LOCATIONS } from "@/content/locations";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, graph } from "@/lib/schema";
import { Plane, Anchor, MapPin, Mountain, ArrowRight, Sparkles, Clock } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return seoFor("locations", locale, "locations");
}

const TYPE_ICON = {
  airport: <Plane className="h-5 w-5" />,
  port: <Anchor className="h-5 w-5" />,
  beach: <MapPin className="h-5 w-5" />,
  village: <Mountain className="h-5 w-5" />,
} as const;

const TYPE_GROUPS = [
  { key: "airport", label: { en: "Airport pickup", el: "Παραλαβή στο αεροδρόμιο", it: "Ritiro in aeroporto", fr: "Retrait à l'aéroport", de: "Abholung am Flughafen" } },
  { key: "port", label: { en: "Port pickup", el: "Παραλαβή στο λιμάνι", it: "Ritiro al porto", fr: "Retrait au port", de: "Abholung am Hafen" } },
  { key: "beach", label: { en: "Beaches", el: "Παραλίες", it: "Spiagge", fr: "Plages", de: "Strände" } },
  { key: "village", label: { en: "Villages", el: "Χωριά", it: "Villaggi", fr: "Villages", de: "Dörfer" } },
] as const;

export default async function LocationsHubPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDict(locale);

  return (
    <>
      <JsonLd data={graph([
        breadcrumbSchema([
          { name: dict.nav.home, url: `${SITE.domain}${localePath(locale)}` },
          { name: dict.nav.locations, url: `${SITE.domain}${localePath(locale, "locations")}` },
        ]),
      ])} />

      <section className="wave-bg border-b border-border/70">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <Breadcrumbs label={dict.common.breadcrumb} items={[
            { label: dict.nav.home, href: localePath(locale) },
            { label: dict.nav.locations },
          ]} />
          <span className="mt-5 inline-flex items-center gap-2 rounded-full border border-[var(--sea-2)]/30 bg-white/70 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-[var(--sea)] shadow-sm dark:bg-white/10 dark:text-[var(--sea-soft)]">
            <Sparkles className="h-4 w-4" /> {dict.trust.delivery}
          </span>
          <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-[var(--ink)] dark:text-white sm:text-5xl">{dict.locationsHub.title}</h1>
          <p className="mt-3 max-w-3xl text-lg text-muted-foreground">{dict.locationsHub.subtitle}</p>
        </div>
      </section>

      <section className="bg-background border-y border-border/70">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-14">
          {TYPE_GROUPS.map((group) => {
            const items = LOCATIONS.filter((l) => l.type === group.key);
            if (items.length === 0) return null;
            return (
              <div key={group.key} id={group.key} className="scroll-mt-24">
                <div className="mb-6 flex items-end justify-between gap-4">
                  <h2 className="text-2xl font-extrabold text-[var(--ink)] dark:text-white sm:text-3xl">
                    {group.label[locale === "el" || locale === "it" || locale === "fr" || locale === "de" ? locale : "en"]}
                  </h2>
                  <span className="text-sm text-muted-foreground">{items.length}</span>
                </div>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((l) => (
                    <Link
                      key={l.slug}
                      href={localePath(locale, `locations/${l.slug}`)}
                      className="group island-card flex flex-col rounded-3xl p-6 transition-transform hover:-translate-y-1"
                    >
                      <div className="flex items-center gap-3">
                        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[var(--sea-soft)] text-[var(--sea)] dark:bg-white/10 dark:text-white">
                          {TYPE_ICON[l.type]}
                        </span>
                        <div className="min-w-0">
                          <h3 className="truncate text-lg font-bold text-[var(--ink)] dark:text-white">{l.shortName}</h3>
                          <p className="text-xs text-muted-foreground">
                            {l.distanceFromChoraKm} km · ~{l.pickupTimeMinutes} min
                          </p>
                        </div>
                      </div>
                      <p className="mt-4 line-clamp-3 text-sm leading-6 text-muted-foreground">{l.hero[locale]}</p>
                      <span className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-[var(--sea)]">
                        {dict.common.viewAll} <ArrowRight className="h-4 w-4" />
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="wave-bg border-y border-border/70">
        <div className="mx-auto max-w-5xl px-4 py-14 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[var(--ink)] dark:text-white sm:text-4xl">{dict.delivery.title}</h2>
          <p className="mx-auto mt-3 max-w-2xl text-lg text-muted-foreground">{dict.delivery.subtitle}</p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-sm">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1.5 font-semibold text-[var(--ink)] shadow-sm dark:bg-white/10 dark:text-white">
              <Clock className="h-4 w-4 text-[var(--brand-2)]" /> {SITE.hours.open}–{SITE.hours.close}
            </span>
          </div>
        </div>
      </section>
    </>
  );
}
