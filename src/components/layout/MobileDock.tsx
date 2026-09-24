import { ArrowUpRight, Phone } from "lucide-react";
import { SITE } from "@/lib/site";
import type { Dict } from "@/i18n/types";
import { whatsappUrl } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

export function MobileDock({ dict }: { dict: Dict }) {
  return (
    <div className="mobile-booking-dock">
      <nav className="glass-dock" aria-label={dict.nav.book}>
        <a
          className="dock-book"
          href={SITE.bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          {dict.nav.bookNow}
          <ArrowUpRight size={17} />
        </a>
        <a
          className="dock-call"
          href={`tel:${SITE.phones[0]}`}
          aria-label={dict.cta.callNow}
        >
          <Phone size={17} />
          <span>{dict.nav.call}</span>
        </a>
        <a
          className="dock-whatsapp"
          href={whatsappUrl(dict.whatsAppFab.message)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={dict.whatsAppFab.label}
        >
          <WhatsAppIcon className="h-7 w-7" />
          <span>WhatsApp</span>
        </a>
      </nav>
    </div>
  );
}
