import { SITE } from "./site";

// Canonical WhatsApp web URL pattern (works on both web & mobile, hands off to the app when installed).
// Matches https://api.whatsapp.com/send/?phone=306948820568&text=...&type=phone_number&app_absent=0
export function whatsappUrl(message?: string): string {
  const params = new URLSearchParams({ phone: SITE.whatsapp, type: "phone_number", app_absent: "0" });
  if (message) params.set("text", message);
  return `https://api.whatsapp.com/send/?${params.toString()}`;
}

export function whatsappVehicleMessage(vehicleName: string, locale: string): string {
  return locale === "el"
    ? `Γεια σας! Θα ήθελα να κλείσω το ${vehicleName} στη Νάξο.`
    : `Hi! I'd like to book the ${vehicleName} on Naxos.`;
}
