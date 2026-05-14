"use client";

import { useState, useMemo, useCallback } from "react";
import { VehicleCard } from "./VehicleCard";
import type { Vehicle, VehicleCategory } from "@/types/content";
import type { Dict } from "@/i18n/types";
import type { Locale } from "@/lib/site";
import { SlidersHorizontal, X, ChevronDown, Sparkles } from "lucide-react";

/* ── Types ── */
type Transmission = "any" | "automatic" | "manual";
type Licence = "any" | "car" | "moto";
type SortKey = "recommended" | "price-asc" | "price-desc" | "largest";
type BestForKey = "couples" | "families" | "adventure" | "mountains" | "beaches" | "offroad" | "style";

interface Filters {
  type: VehicleCategory | "all";
  transmission: Transmission;
  seats: number | null;
  licence: Licence;
  priceMin: number;
  priceMax: number;
  fourByFour: boolean;
  bestFor: Set<BestForKey>;
  sort: SortKey;
}

const BEST_FOR_KEYWORDS: Record<BestForKey, string[]> = {
  couples:   ["couple", "romantic", "duo"],
  families:  ["famil", "kids", "children", "child"],
  adventure: ["adventure", "explore", "off-road", "trails"],
  mountains: ["mountain", "filoti", "apollonas", "village", "apeiranthos", "climb"],
  beaches:   ["beach", "coast", "swim"],
  offroad:   ["off-road", "off road", "4×4", "4x4", "terrain", "buggy", "atv"],
  style:     ["style", "photo", "instagram", "elegant", "luxury"],
};

function matchesBestFor(vehicle: Vehicle, key: BestForKey): boolean {
  const text = vehicle.bestFor.map((b) => b.en.toLowerCase()).join(" ");
  return BEST_FOR_KEYWORDS[key].some((kw) => text.includes(kw));
}

function getVehiclePrice(v: Vehicle) {
  return v.priceShoulder;
}

const DEFAULT_FILTERS: Filters = {
  type: "all",
  transmission: "any",
  seats: null,
  licence: "any",
  priceMin: 15,
  priceMax: 200,
  fourByFour: false,
  bestFor: new Set(),
  sort: "recommended",
};

function applyFilters(vehicles: Vehicle[], f: Filters): Vehicle[] {
  let result = vehicles.filter((v) => {
    if (f.type !== "all" && v.category !== f.type) return false;
    if (f.transmission !== "any" && v.transmission !== f.transmission) return false;
    if (f.seats !== null && (v.seats ?? 0) < f.seats) return false;
    if (f.licence === "car" && !["cars"].includes(v.category)) return false;
    if (f.licence === "moto" && v.category === "cars") return false;
    const price = getVehiclePrice(v);
    if (price < f.priceMin || price > f.priceMax) return false;
    if (f.fourByFour && !v.fourByFour) return false;
    if (f.bestFor.size > 0) {
      const anyMatch = Array.from(f.bestFor).some((key) => matchesBestFor(v, key));
      if (!anyMatch) return false;
    }
    return true;
  });

  if (f.sort === "price-asc") result = [...result].sort((a, b) => a.priceShoulder - b.priceShoulder);
  else if (f.sort === "price-desc") result = [...result].sort((a, b) => b.priceShoulder - a.priceShoulder);
  else if (f.sort === "largest") result = [...result].sort((a, b) => (b.seats ?? 0) - (a.seats ?? 0));

  return result;
}

function hasActiveFilters(f: Filters) {
  return (
    f.type !== "all" ||
    f.transmission !== "any" ||
    f.seats !== null ||
    f.licence !== "any" ||
    f.priceMin !== DEFAULT_FILTERS.priceMin ||
    f.priceMax !== DEFAULT_FILTERS.priceMax ||
    f.fourByFour ||
    f.bestFor.size > 0
  );
}

/* ── Sub-components ── */
function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-b border-border/60 pb-5 last:border-0 last:pb-0">
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">{title}</p>
      {children}
    </div>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
        active
          ? "border-[var(--sea)] bg-[var(--sea)] text-white"
          : "border-border bg-card text-foreground hover:border-[var(--sea-2)]"
      }`}
    >
      {children}
    </button>
  );
}

/* ── Main Component ── */
export function FleetBrowser({
  vehicles,
  locale,
  dict,
  initialCategory,
}: {
  vehicles: Vehicle[];
  locale: Locale;
  dict: Dict;
  initialCategory?: VehicleCategory;
}) {
  const [filters, setFilters] = useState<Filters>({
    ...DEFAULT_FILTERS,
    type: initialCategory ?? "all",
  });
  const [drawerOpen, setDrawerOpen] = useState(false);

  const filtered = useMemo(() => applyFilters(vehicles, filters), [vehicles, filters]);

  const update = useCallback(<K extends keyof Filters>(key: K, value: Filters[K]) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }, []);

  function toggleBestFor(key: BestForKey) {
    setFilters((prev) => {
      const next = new Set(prev.bestFor);
      next.has(key) ? next.delete(key) : next.add(key);
      return { ...prev, bestFor: next };
    });
  }

  function clearAll() {
    setFilters({ ...DEFAULT_FILTERS, type: initialCategory ?? "all" });
  }

  const ff = dict.fleetFilter;
  const active = hasActiveFilters(filters);

  const typeOptions: { value: VehicleCategory | "all"; label: string }[] = [
    { value: "all", label: ff.any },
    { value: "cars", label: dict.fleetHub.categoryCars },
    { value: "scooters", label: dict.fleetHub.categoryScooters },
    { value: "atv-quad", label: dict.fleetHub.categoryAtv },
    { value: "buggy", label: dict.fleetHub.categoryBuggy },
    { value: "motorbike", label: dict.fleetHub.categoryMoto },
  ];

  const bestForOptions: { key: BestForKey; label: string }[] = [
    { key: "couples", label: ff.bestForOptions.couples },
    { key: "families", label: ff.bestForOptions.families },
    { key: "adventure", label: ff.bestForOptions.adventure },
    { key: "mountains", label: ff.bestForOptions.mountains },
    { key: "beaches", label: ff.bestForOptions.beaches },
    { key: "offroad", label: ff.bestForOptions.offroad },
    { key: "style", label: ff.bestForOptions.style },
  ];

  const FilterPanel = (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <p className="text-sm font-bold text-foreground">{ff.title}</p>
        {active && (
          <button onClick={clearAll} className="text-xs font-semibold text-[var(--sea)] hover:underline">
            {ff.clearAll}
          </button>
        )}
      </div>

      {/* Type — hidden when locked to category */}
      {!initialCategory && (
        <FilterSection title={ff.type}>
          <div className="flex flex-wrap gap-2">
            {typeOptions.map((opt) => (
              <Chip key={opt.value} active={filters.type === opt.value} onClick={() => update("type", opt.value)}>
                {opt.label}
              </Chip>
            ))}
          </div>
        </FilterSection>
      )}

      {/* Transmission */}
      <FilterSection title={ff.transmission}>
        <div className="flex gap-2">
          {(["any", "automatic", "manual"] as Transmission[]).map((t) => (
            <Chip key={t} active={filters.transmission === t} onClick={() => update("transmission", t)}>
              {t === "any" ? ff.any : dict.common[t as "automatic" | "manual"]}
            </Chip>
          ))}
        </div>
      </FilterSection>

      {/* Seats */}
      <FilterSection title={ff.seats}>
        <div className="flex gap-2">
          {[null, 2, 4, 5, 7].map((s) => (
            <Chip key={s ?? "any"} active={filters.seats === s} onClick={() => update("seats", s)}>
              {s === null ? ff.any : `${s}+`}
            </Chip>
          ))}
        </div>
      </FilterSection>

      {/* Licence */}
      <FilterSection title={ff.licence}>
        <div className="flex flex-wrap gap-2">
          {(["any", "car", "moto"] as Licence[]).map((l) => (
            <Chip key={l} active={filters.licence === l} onClick={() => update("licence", l)}>
              {l === "any" ? ff.any : l === "car" ? ff.licenceB : ff.licenceMoto}
            </Chip>
          ))}
        </div>
      </FilterSection>

      {/* Price range */}
      <FilterSection title={`${ff.priceRange}: €${filters.priceMin}–€${filters.priceMax}`}>
        <div className="flex flex-col gap-2">
          <input
            type="range"
            min={15}
            max={200}
            step={5}
            value={filters.priceMax}
            onChange={(e) => update("priceMax", Number(e.target.value))}
            className="w-full accent-[var(--sea)]"
            aria-label={ff.priceRange}
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>€15</span><span>€200</span>
          </div>
        </div>
      </FilterSection>

      {/* 4×4 toggle */}
      <FilterSection title="">
        <label className="flex cursor-pointer items-center gap-3">
          <div
            role="checkbox"
            aria-checked={filters.fourByFour}
            tabIndex={0}
            onClick={() => update("fourByFour", !filters.fourByFour)}
            onKeyDown={(e) => e.key === " " && update("fourByFour", !filters.fourByFour)}
            className={`relative h-5 w-9 rounded-full transition-colors ${filters.fourByFour ? "bg-[var(--sea)]" : "bg-muted"}`}
          >
            <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${filters.fourByFour ? "translate-x-4" : "translate-x-0.5"}`} />
          </div>
          <span className="text-sm font-medium text-foreground">{ff.fourByFourOnly}</span>
        </label>
      </FilterSection>

      {/* Best for chips */}
      <FilterSection title={ff.bestFor}>
        <div className="flex flex-wrap gap-2">
          {bestForOptions.map((opt) => (
            <Chip key={opt.key} active={filters.bestFor.has(opt.key)} onClick={() => toggleBestFor(opt.key)}>
              {opt.label}
            </Chip>
          ))}
        </div>
      </FilterSection>
    </div>
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Top bar: sort + mobile filter trigger */}
      <div className="mb-6 flex items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          <span className="font-bold text-foreground">{filtered.length}</span>{" "}
          {filtered.length === 1 ? ff.result : ff.results}
          {active && (
            <button onClick={clearAll} className="ml-2 text-xs text-[var(--sea)] hover:underline">
              · {ff.clearAll}
            </button>
          )}
        </p>

        <div className="flex items-center gap-3">
          {/* Sort */}
          <div className="relative">
            <select
              value={filters.sort}
              onChange={(e) => update("sort", e.target.value as SortKey)}
              className="appearance-none rounded-full border border-border bg-card px-3 py-2 pr-8 text-xs font-semibold text-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--sea)]"
              aria-label={ff.sort}
            >
              <option value="recommended">{ff.sortRecommended}</option>
              <option value="price-asc">{ff.sortPriceAsc}</option>
              <option value="price-desc">{ff.sortPriceDesc}</option>
              <option value="largest">{ff.sortLargest}</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-2 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
          </div>

          {/* Mobile filter pill */}
          <button
            onClick={() => setDrawerOpen(true)}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-xs font-bold text-foreground shadow-sm transition-colors hover:border-[var(--sea-2)] lg:hidden"
          >
            <SlidersHorizontal className="h-4 w-4" />
            {ff.openDrawer}
            {active && <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[var(--sea)] text-[10px] text-white">{Array.from(filters.bestFor).length + (filters.type !== "all" ? 1 : 0)}</span>}
          </button>
        </div>
      </div>

      <div className="lg:grid lg:grid-cols-12 lg:gap-8">
        {/* Sidebar (desktop) */}
        <aside className="hidden lg:col-span-4 lg:block xl:col-span-3">
          <div className="sticky top-24 rounded-3xl border border-border/60 bg-card p-6 shadow-sm">
            {FilterPanel}
          </div>
        </aside>

        {/* Grid */}
        <div className="lg:col-span-8 xl:col-span-9">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-dashed border-border/60 py-20 text-center">
              <Sparkles className="h-10 w-10 text-muted-foreground/50" />
              <p className="text-lg font-bold text-foreground">{ff.emptyTitle}</p>
              <p className="max-w-xs text-sm text-muted-foreground">{ff.emptyBody}</p>
              <button
                onClick={clearAll}
                className="rounded-full border border-[var(--sea)] px-4 py-2 text-sm font-bold text-[var(--sea)] transition-colors hover:bg-[var(--sea)] hover:text-white"
              >
                {ff.clearAll}
              </button>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((v) => (
                <VehicleCard key={v.slug} vehicle={v} locale={locale} dict={dict} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile filter drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setDrawerOpen(false)} />
          <div className="absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-y-auto rounded-t-3xl bg-background p-6 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <p className="text-base font-bold text-foreground">{ff.title}</p>
              <button
                onClick={() => setDrawerOpen(false)}
                className="rounded-full p-2 text-muted-foreground hover:bg-muted"
                aria-label={ff.closeDrawer}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            {FilterPanel}
            <button
              onClick={() => setDrawerOpen(false)}
              className="mt-6 w-full rounded-full bg-[var(--sea)] py-3 text-sm font-bold text-white"
            >
              {ff.closeDrawer} · {filtered.length} {filtered.length === 1 ? ff.result : ff.results}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
