import Link from "next/link";
import Image from "next/image";
import type { Vehicle } from "@/types/content";
import type { Locale } from "@/lib/site";
import { localePath } from "@/lib/site";
import type { Dict } from "@/i18n/types";
import { Users, Fuel, Gauge, DoorOpen, Mountain, ArrowUpRight } from "lucide-react";

export function VehicleCard({ vehicle: v, locale, dict }: { vehicle: Vehicle; locale: Locale; dict: Dict }) {
  const href = localePath(locale, `fleet/${v.category}/${v.slug}`);
  return (
    <Link
      href={href}
      className="group island-card relative flex flex-col overflow-hidden rounded-3xl transition-all duration-300 hover:-translate-y-1 hover:border-[var(--sea-2)] hover:shadow-2xl"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-[var(--sand)]">
        <Image
          src={v.image}
          alt={v.name[locale]}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(15,37,51,0.85)] via-[rgba(15,37,51,0.18)] to-transparent" />
        <span className="absolute top-3 left-3 inline-flex items-center rounded-full bg-brand-gradient px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-lg shadow-[rgba(255,110,0,0.25)]">
          {v.category.replace("-", " ")}
        </span>
        {v.fourByFour && (
          <span className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-[var(--ink)]/85 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white backdrop-blur">
            <Mountain className="h-3 w-3" /> 4×4
          </span>
        )}
        <div className="absolute inset-x-3 bottom-3 flex items-end justify-between gap-3">
          <h3 className="text-lg font-bold leading-tight text-white drop-shadow-md">
            {v.name[locale]}
          </h3>
          <span className="shrink-0 rounded-full border border-white/40 bg-white/95 px-3 py-1 text-xs font-bold text-[var(--ink)] shadow-md backdrop-blur">
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground mr-1">{dict.common.from}</span>
            <span className="text-brand-gradient">€{v.priceShoulder}</span>
            <span className="text-muted-foreground">{dict.common.perDay}</span>
          </span>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <p className="text-sm text-muted-foreground line-clamp-2 min-h-[2.5rem]">{v.tagline[locale]}</p>
        <ul className="mt-1 grid grid-cols-2 gap-x-3 gap-y-2 text-xs text-muted-foreground">
          {v.seats != null && (
            <li className="flex items-center gap-1.5">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--sea-soft)] text-[var(--sea)] dark:bg-[var(--ink-3)] dark:text-[var(--brand-1)]">
                <Users className="h-3.5 w-3.5" />
              </span>
              <span className="font-medium text-[var(--ink)] dark:text-white">{v.seats}</span> {dict.common.seats}
            </li>
          )}
          {v.transmission && (
            <li className="flex items-center gap-1.5">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--sea-soft)] text-[var(--sea)] dark:bg-[var(--ink-3)] dark:text-[var(--brand-1)]">
                <Gauge className="h-3.5 w-3.5" />
              </span>
              <span className="font-medium text-[var(--ink)] dark:text-white">
                {v.transmission === "automatic" ? dict.common.automatic : dict.common.manual}
              </span>
            </li>
          )}
          {v.fuelType && (
            <li className="flex items-center gap-1.5">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--sea-soft)] text-[var(--sea)] dark:bg-[var(--ink-3)] dark:text-[var(--brand-1)]">
                <Fuel className="h-3.5 w-3.5" />
              </span>
              <span className="font-medium text-[var(--ink)] dark:text-white">{dict.common[v.fuelType]}</span>
            </li>
          )}
          {v.doors != null && (
            <li className="flex items-center gap-1.5">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--sea-soft)] text-[var(--sea)] dark:bg-[var(--ink-3)] dark:text-[var(--brand-1)]">
                <DoorOpen className="h-3.5 w-3.5" />
              </span>
              <span className="font-medium text-[var(--ink)] dark:text-white">{v.doors}</span> {dict.common.doors}
            </li>
          )}
        </ul>
        <div className="mt-auto flex items-center justify-between border-t border-border pt-3 text-sm">
          <span className="font-semibold text-[var(--ink)] dark:text-white">{dict.common.seeDetails}</span>
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand-gradient text-white shadow-md transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}
