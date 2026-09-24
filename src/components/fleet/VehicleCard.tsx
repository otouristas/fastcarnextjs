import Link from "next/link";
import Image from "next/image";
import type { Vehicle } from "@/types/content";
import { localePath, type Locale } from "@/lib/site";
import type { Dict } from "@/i18n/types";
import { navigationCopy } from "@/content/navigation-copy";
import { designCopy } from "@/content/design-copy";
import { ArrowUpRight, Users, Gauge, Briefcase } from "lucide-react";

export function VehicleCard({
  vehicle: v,
  locale,
  dict,
}: {
  vehicle: Vehicle;
  locale: Locale;
  dict: Dict;
}) {
  const c = designCopy(locale);
  return (
    <Link
      href={localePath(locale, `fleet/${v.category}/${v.slug}`)}
      className="escape-car group"
    >
      <div className="escape-car-image">
        <span className="car-category">
          {v.fourByFour
            ? "4×4"
            : v.transmission === "automatic"
              ? dict.common.automatic
              : dict.common.manual}
        </span>
        {v.image && (
          <Image
            src={v.image}
            alt={v.name[locale]}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 25vw"
            className="object-contain"
          />
        )}
        <span className="car-illustration">{navigationCopy(locale).photo}</span>
        <span className="car-open">
          <ArrowUpRight size={20} />
        </span>
      </div>
      <div className="escape-car-content">
        <h3>{v.name[locale]}</h3>
        <p>{v.tagline[locale]}</p>
        <ul>
          {v.seats != null && (
            <li>
              <Users size={15} />
              {v.seats} {dict.common.seats}
            </li>
          )}
          <li>
            <Gauge size={15} />
            {v.transmission === "automatic"
              ? dict.common.automatic
              : dict.common.manual}
          </li>
          {v.luggageLarge != null && (
            <li>
              <Briefcase size={15} />
              {v.luggageLarge} {dict.common.bags}
            </li>
          )}
        </ul>
        {!v.bookable && (
          <p className="inventory-note">
            {navigationCopy(locale).inventoryNote}
          </p>
        )}
        <div className="escape-car-bottom">
          <span>
            {v.bookable && v.priceShoulder != null ? (
              <>
                <small>{dict.common.from}</small>
                <strong>€{v.priceShoulder}</strong>
                <small>{dict.common.perDay}</small>
              </>
            ) : (
              dict.cta.priceOnRequest
            )}
          </span>
          <span>
            {c.details}
            <ArrowUpRight size={15} />
          </span>
        </div>
      </div>
    </Link>
  );
}
