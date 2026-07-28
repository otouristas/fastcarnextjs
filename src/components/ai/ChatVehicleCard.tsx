"use client";

import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import type { VehicleSuggestion } from "@/lib/touristas-knowledge";

export function ChatVehicleCard({ vehicle }: { vehicle: VehicleSuggestion }) {
  return (
    <div className="rounded-2xl border border-border/60 bg-background p-3 shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-xs font-bold text-foreground">{vehicle.name}</p>
          <p className="text-[11px] text-[var(--sea)]">{vehicle.category}</p>
        </div>
        <span className="whitespace-nowrap rounded-full bg-[var(--sea-soft)] px-2 py-0.5 text-[11px] font-bold text-[var(--sea)] dark:bg-white/10 dark:text-[var(--sea-2)]">
          {vehicle.priceRange}
        </span>
      </div>
      <ul className="mt-2 flex flex-wrap gap-1">
        {vehicle.features.map((f) => (
          <li key={f} className="inline-flex items-center gap-0.5 text-[10px] text-muted-foreground">
            <Check className="h-3 w-3 text-[var(--brand-2)]" /> {f}
          </li>
        ))}
      </ul>
      <Link
        href={vehicle.link}
        className="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-[var(--sea)] hover:text-[var(--brand-2)]"
      >
        See vehicles <ArrowRight className="h-3 w-3" />
      </Link>
    </div>
  );
}

export function ChatVehicleList({ vehicles }: { vehicles: VehicleSuggestion[] }) {
  return (
    <div className="mt-2 grid gap-2">
      {vehicles.slice(0, 3).map((v) => (
        <ChatVehicleCard key={v.name} vehicle={v} />
      ))}
    </div>
  );
}
