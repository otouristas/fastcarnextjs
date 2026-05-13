import { whatsappUrl } from "@/lib/whatsapp";
import { MessageCircle } from "lucide-react";

export function WhatsAppFab({ label, message }: { label: string; message: string }) {
  return (
    <a
      href={whatsappUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="fixed bottom-5 right-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl ring-4 ring-white/30 hover:scale-105 transition-transform"
    >
      <MessageCircle className="h-7 w-7" />
      <span className="sr-only">{label}</span>
    </a>
  );
}
