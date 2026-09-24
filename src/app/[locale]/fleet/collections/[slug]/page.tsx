import { notFound } from "next/navigation";
import Link from "next/link";
import { collectionCopy } from "@/content/collection-copy";
import { PageMasthead } from "@/components/layout/PageMasthead";
import { navigationCopy } from "@/content/navigation-copy";
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
  const { title, intro: description } = collectionCopy(locale, slug);

  return buildMetadata({
    locale,
    path: `fleet/collections/${slug}`,
    title,
    description,
    keywords: [`${slug.replace(/-/g, " ")} car rental naxos`, "naxos car rental", "rent a car naxos"],
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
  const { title, intro, heading, advice } = collectionCopy(locale, slug);
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
      <PageMasthead locale={locale} dict={dict} title={title} subtitle={intro} label={title} image={vehicles[0]?.image ?? "/images/naxos/landscape.jpg"} imageAlt={navigationCopy(locale).photo} />

      <section className="escape-wrap escape-section">
        <h2 className="text-3xl tracking-tight">{heading}</h2>
        <p className="mt-5 max-w-3xl leading-8 text-muted-foreground">{advice}</p>
        <div className="escape-actions">
          <Link className="escape-text-link" href={localePath(locale, "insurance")}>{dict.nav.insurance} ↗</Link>
          <Link className="escape-text-link" href={localePath(locale, "locations/port-pickup")}>{dict.nav.locations} ↗</Link>
          <Link className="escape-button" href={localePath(locale, "book")}>{dict.cta.bookCar} ↗</Link>
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
