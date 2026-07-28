import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { VehicleCard } from "@/components/fleet/VehicleCard";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  VEHICLE_COLLECTION_SLUGS,
  vehiclesForCollection,
} from "@/content/vehicle-collections";
import { getDict } from "@/i18n/dictionaries";
import { breadcrumbSchema, graph } from "@/lib/schema";
import {
  isLocale,
  localePath,
  LOCALES,
  SITE,
} from "@/lib/site";
import { buildMetadata } from "@/lib/seo";
import type { VehicleCollectionSlug } from "@/types/editorial";

function isCollectionSlug(value: string): value is VehicleCollectionSlug {
  return VEHICLE_COLLECTION_SLUGS.includes(value as VehicleCollectionSlug);
}

function collectionTitle(slug: VehicleCollectionSlug, dict: Awaited<ReturnType<typeof getDict>>) {
  if (slug === "automatic") return `${dict.common.automatic} ${dict.nav.cars}`;
  if (slug === "family-7-seater") {
    return `${dict.fleetFilter.bestForOptions.families} · 7 ${dict.common.seats}`;
  }
  return "SUV & 4×4";
}

export function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    VEHICLE_COLLECTION_SLUGS.map((slug) => ({ locale, slug })),
  );
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale) || !isCollectionSlug(slug)) return {};
  const dict = await getDict(locale);
  const title = collectionTitle(slug, dict);
  return buildMetadata({
    locale,
    path: `fleet/collections/${slug}`,
    title,
    description: `${title} · ${SITE.tagline[locale]}`,
  });
}

export default async function VehicleCollectionPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale) || !isCollectionSlug(slug)) notFound();
  const dict = await getDict(locale);
  const title = collectionTitle(slug, dict);
  const vehicles = vehiclesForCollection(slug);

  return (
    <>
      <JsonLd
        data={graph([
          breadcrumbSchema([
            { name: dict.nav.home, url: `${SITE.domain}${localePath(locale)}` },
            { name: dict.nav.fleet, url: `${SITE.domain}${localePath(locale, "fleet")}` },
            {
              name: title,
              url: `${SITE.domain}${localePath(locale, `fleet/collections/${slug}`)}`,
            },
          ]),
        ])}
      />
      <section className="wave-bg border-b border-border/70">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <Breadcrumbs
            label={dict.common.breadcrumb}
            items={[
              { label: dict.nav.home, href: localePath(locale) },
              { label: dict.nav.fleet, href: localePath(locale, "fleet") },
              { label: title },
            ]}
          />
          <h1 className="mt-6 max-w-4xl text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            {title}
          </h1>
        </div>
      </section>
      <section className="bg-background">
        <div className="mx-auto grid max-w-7xl gap-5 px-4 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
          {vehicles.map((vehicle) => (
            <VehicleCard key={vehicle.slug} vehicle={vehicle} locale={locale} dict={dict} />
          ))}
        </div>
      </section>
    </>
  );
}
