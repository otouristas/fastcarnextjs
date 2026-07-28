import { VEHICLES } from "@/content/fleet";
import type { Vehicle } from "@/types/content";
import type { VehicleCollectionSlug } from "@/types/editorial";

export const VEHICLE_COLLECTION_SLUGS: VehicleCollectionSlug[] = [
  "automatic",
  "family-7-seater",
  "suv-4x4",
];

const SUV_SLUGS = new Set([
  "suzuki-jimny",
  "dacia-duster",
  "toyota-rav4",
  "kia-sportage",
]);

export function vehiclesForCollection(slug: VehicleCollectionSlug): Vehicle[] {
  if (slug === "automatic") {
    return VEHICLES.filter((vehicle) => vehicle.transmission === "automatic");
  }
  if (slug === "family-7-seater") {
    return VEHICLES.filter((vehicle) => (vehicle.seats ?? 0) >= 7);
  }
  return VEHICLES.filter((vehicle) => SUV_SLUGS.has(vehicle.slug));
}
