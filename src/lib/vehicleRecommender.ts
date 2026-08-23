import type { Vehicle } from "@/types/content";

export interface ScoredVehicle {
  vehicle: Vehicle;
  score: number;
  reason: { en: string; el: string; it: string; fr: string; de: string };
}

type SlugRule = {
  slugs: string[];
  preferred: string[];
  reason: ScoredVehicle["reason"];
};

const RULES: SlugRule[] = [
  {
    slugs: ["apeiranthos", "filoti", "apollonas", "chalki"],
    preferred: ["suzuki-jimny", "hyundai-i10"],
    reason: {
      en: "Built for mountain village roads",
      el: "Ιδανικό για ορεινά χωριά",
      it: "Perfetto per i villaggi di montagna",
      fr: "Fait pour les routes de villages de montagne",
      de: "Für Bergdorfstraßen gemacht",
    },
  },
  {
    slugs: ["agios-prokopios", "agia-anna", "plaka", "stelida"],
    preferred: ["hyundai-i10", "toyota-aygo", "fiat-panda"],
    reason: {
      en: "Ideal for beach-to-beach hopping",
      el: "Ιδανικό για παραλία-παραλία",
      it: "Perfetto per i tour delle spiagge",
      fr: "Idéal pour aller de plage en plage",
      de: "Ideal für Strand-Hopping",
    },
  },
  {
    slugs: ["mikri-vigla"],
    preferred: ["suzuki-jimny"],
    reason: {
      en: "Handles dunes and off-road tracks",
      el: "Για αμμόλοφους και χωματόδρομους",
      it: "Per dune e piste sterrate",
      fr: "Pour les dunes et les pistes off-road",
      de: "Für Dünen und Offroad-Strecken",
    },
  },
  {
    slugs: ["naxos-town", "airport-pickup", "port-pickup"],
    preferred: ["hyundai-i10", "toyota-aygo", "fiat-panda"],
    reason: {
      en: "Compact and easy to park in Chora",
      el: "Compact, παρκάρει εύκολα στη Χώρα",
      it: "Compatta, facile da parcheggiare a Chora",
      fr: "Compacte et facile à garer à Chora",
      de: "Kompakt und leicht zu parken in Chora",
    },
  },
];

const FALLBACK_REASON: ScoredVehicle["reason"] = {
  en: "Popular choice on Naxos",
  el: "Δημοφιλής επιλογή στη Νάξο",
  it: "Scelta popolare a Naxos",
  fr: "Choix populaire à Naxos",
  de: "Beliebte Wahl auf Naxos",
};

export function recommendForLocation(slug: string, vehicles: Vehicle[], count = 3): ScoredVehicle[] {
  const rule = RULES.find((r) => r.slugs.includes(slug));

  if (!rule) {
    return vehicles
      .filter((v) => v.category === "cars")
      .slice(0, count)
      .map((vehicle) => ({ vehicle, score: 1, reason: FALLBACK_REASON }));
  }

  const scored: ScoredVehicle[] = vehicles.map((vehicle) => {
    const prefIndex = rule.preferred.indexOf(vehicle.slug);
    const score = prefIndex >= 0 ? rule.preferred.length - prefIndex : 0;
    return { vehicle, score, reason: prefIndex >= 0 ? rule.reason : FALLBACK_REASON };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, count);
}
