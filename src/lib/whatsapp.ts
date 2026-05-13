import { SITE } from "./site";

export function whatsappUrl(message?: string): string {
  const base = `https://wa.me/${SITE.whatsapp}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

export function whatsappVehicleMessage(vehicleName: string, locale: string): string {
  const map: Record<string, string> = {
    en: `Hi! I'd like to book the ${vehicleName} on Naxos.`,
    el: `Γεια σας! Θα ήθελα να κλείσω το ${vehicleName} στη Νάξο.`,
    it: `Salve! Vorrei prenotare la ${vehicleName} a Naxos.`,
    fr: `Bonjour ! Je voudrais réserver la ${vehicleName} à Naxos.`,
    de: `Hallo! Ich möchte den ${vehicleName} auf Naxos buchen.`,
  };
  return map[locale] ?? map.en;
}
