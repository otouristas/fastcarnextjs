import Link from "next/link";
import Image from "next/image";
import type { Vehicle } from "@/types/content";
import type { Locale } from "@/lib/site";
import { localePath } from "@/lib/site";
import type { Dict } from "@/i18n/types";
import { Users, Fuel, Gauge, ArrowUpRight } from "lucide-react";

export function VehicleCard({ vehicle: v, locale, dict }: { vehicle: Vehicle; locale: Locale; dict: Dict }) {
  const href = localePath(locale, `fleet/${v.category}/${v.slug}`);
  return (
    <Link
      href={href}
      className="group island-card relative flex flex-col overflow-hidden rounded-3xl transition-all duration-300 hover:-translate-y-1 hover:border-[var(--sea-2)] hover:shadow-2xl"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={v.image}
          alt={v.name[locale]}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(15,37,51,0.82)] via-transparent to-transparent" />
        <span className="absolute top-3 left-3 inline-flex items-center rounded-full bg-brand-gradient px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
          {v.category.replace("-", " ")}
        </span>
        <span className="absolute top-3 right-3 inline-flex items-center rounded-full border border-white/40 bg-white/85 px-3 py-1 text-xs font-semibold text-[var(--ink)] shadow-sm backdrop-blur dark:bg-[rgba(15,37,51,0.78)] dark:text-white">
          {dict.common.from} €{v.priceShoulder}{dict.common.perDay}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <h3 className="text-lg font-bold text-[var(--ink)] dark:text-white">{v.name[locale]}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">{v.tagline[locale]}</p>
        </div>
        <ul className="mt-auto grid grid-cols-3 gap-2 text-xs text-muted-foreground">
          {v.seats != null && (
            <li className="flex items-center gap-1.5"><Users className="h-3.5 w-3.5 text-[var(--brand-1)]" /> {v.seats} {dict.common.seats}</li>
          )}
          {v.transmission && (
            <li className="flex items-center gap-1.5"><Gauge className="h-3.5 w-3.5 text-[var(--brand-1)]" /> {v.transmission === "automatic" ? dict.common.automatic : dict.common.manual}</li>
          )}
          {v.fuelType && (
            <li className="flex items-center gap-1.5"><Fuel className="h-3.5 w-3.5 text-[var(--brand-1)]" /> {dict.common[v.fuelType === "gasoline" ? "gasoline" : v.fuelType]}</li>
          )}
        </ul>
        <div className="mt-2 flex items-center justify-between border-t border-border pt-3 text-sm">
          <span className="font-semibold text-[var(--ink)] dark:text-white">{dict.common.seeDetails}</span>
          <ArrowUpRight className="h-4 w-4 text-[var(--brand-2)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </div>
      </div>
    </Link>
  );
}
