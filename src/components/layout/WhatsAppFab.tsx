"use client";

import { whatsappUrl } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { useConsent } from "@/lib/consent";

export function WhatsAppFab({ label, message }: { label: string; message: string }) {
  const { hydrated, decided } = useConsent();

  if (!hydrated || !decided) return null;

  return (
    <a
      href={whatsappUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="fixed bottom-4 right-4 z-40 inline-flex h-12 w-12 items-center justify-center rounded-full drop-shadow-2xl transition-transform hover:scale-105 sm:bottom-6 sm:right-6 sm:h-14 sm:w-14"
    >
      <WhatsAppIcon className="h-12 w-12 sm:h-14 sm:w-14" />
      <span className="sr-only">{label}</span>
    </a>
  );
}
