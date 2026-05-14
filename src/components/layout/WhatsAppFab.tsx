import { whatsappUrl } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

export function WhatsAppFab({ label, message }: { label: string; message: string }) {
  return (
    <a
      href={whatsappUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="fixed bottom-6 right-6 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full drop-shadow-2xl transition-transform hover:scale-105"
    >
      <WhatsAppIcon className="h-14 w-14" />
      <span className="sr-only">{label}</span>
    </a>
  );
}
