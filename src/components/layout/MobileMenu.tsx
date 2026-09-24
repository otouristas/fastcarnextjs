"use client";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight,
  ChevronDown,
  Menu,
  X,
  Star,
  Check,
  Phone,
} from "lucide-react";
import {
  SITE,
  LOCALES,
  LOCALE_META,
  swapLocalePath,
  type Locale,
} from "@/lib/site";
import type { Dict } from "@/i18n/types";
import { designCopy } from "@/content/design-copy";
import { navigationCopy } from "@/content/navigation-copy";
import { whatsappUrl } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { ThemeToggle } from "./ThemeToggle";

export interface MenuLink {
  href: string;
  label: string;
  description: string;
  badge?: string;
  icon?: React.ReactNode;
  meta?: string;
}
type Props = {
  locale: Locale;
  dict: Dict;
  currentPath: string;
  fleetLinks: MenuLink[];
  infoLinks: MenuLink[];
  exploreLinks: MenuLink[];
};
export function MobileMenu(props: Props) {
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null),
    wasOpen = useRef(false);
  useEffect(() => {
    if (!open && wasOpen.current) trigger.current?.focus();
    wasOpen.current = open;
  }, [open]);
  return (
    <div className="mobile-navigation">
      <button
        ref={trigger}
        className="mobile-menu-trigger"
        aria-label={props.dict.a11y.openMenu}
        aria-expanded={open}
        aria-controls="mobile-menu-panel"
        onClick={() => setOpen(true)}
      >
        <Menu size={25} />
      </button>
      {open &&
        createPortal(
          <MobileDialog {...props} close={() => setOpen(false)} />,
          document.body,
        )}
    </div>
  );
}
function MobileDialog({
  locale,
  dict,
  currentPath,
  fleetLinks,
  infoLinks,
  exploreLinks,
  close,
}: Props & { close: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null),
    c = designCopy(locale),
    n = navigationCopy(locale);
  useEffect(() => {
    const el = dialog.current;
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    el?.showModal();
    return () => {
      document.body.style.overflow = old;
    };
  }, []);
  return (
    <dialog
      ref={dialog}
      id="mobile-menu-panel"
      className="island-mobile-dialog"
      aria-label={dict.nav.menu}
      onCancel={close}
      onClose={close}
    >
      <div className="mobile-dialog-top">
        <Image
          src={SITE.logo}
          alt={SITE.brand}
          width={180}
          height={60}
          unoptimized
        />
        <ThemeToggle labels={dict.theme} />
        <button onClick={close} aria-label={dict.a11y.closeMenu} autoFocus>
          <X size={26} />
        </button>
      </div>
      <div className="mobile-dialog-scroll">
        <div className="mobile-menu-intro">
          <span className="eyebrow">
            <span className="sun-dot" />
            {n.plan}
          </span>
          <p>{n.navigate}</p>
        </div>
        <div className="mobile-marketing">
          <Link onClick={close} href={`/${locale}/reviews`}>
            <Star size={17} fill="currentColor" />
            <strong>
              {SITE.rating.value}
              <small>/5</small>
            </strong>
            <span>{SITE.rating.count} Google</span>
          </Link>
          <span>
            <Check size={18} />
            {n.direct}
          </span>
          <span>
            <Check size={18} />
            {dict.trust.delivery}
          </span>
        </div>
        <nav aria-label={dict.nav.menu}>
          {[
            { title: dict.nav.fleet, links: fleetLinks },
            { title: dict.footer.company, links: infoLinks },
            { title: dict.footer.explore, links: exploreLinks },
          ].map((group, i) => (
            <details
              key={group.title}
              className="mobile-nav-group"
              open={i === 0}
            >
              <summary>
                <span className="mobile-nav-number">0{i + 1}</span>
                <span>{group.title}</span>
                <ChevronDown size={23} />
              </summary>
              <div className="mobile-nav-links">
                {group.links.map((l) => (
                  <Link href={l.href} key={l.href} onClick={close}>
                    <span>
                      {l.label}
                      <small>{l.description}</small>
                    </span>
                    <ArrowUpRight size={20} />
                  </Link>
                ))}
              </div>
            </details>
          ))}
        </nav>
        <div className="mobile-settings">
          <div>
            <span className="eyebrow">{dict.footer.languages}</span>
          </div>
          <div className="mobile-languages">
            {LOCALES.map((l) => (
              <Link
                key={l}
                href={swapLocalePath(currentPath, l)}
                hrefLang={l}
                onClick={close}
                aria-current={l === locale ? "true" : undefined}
              >
                {LOCALE_META[l].name}
              </Link>
            ))}
          </div>
        </div>
        <div className="mobile-contact">
          <a href={`tel:${SITE.phones[0]}`}>
            <Phone size={17} />
            {SITE.phones[0]}
          </a>
          <a href={`mailto:${SITE.email}`}>
            {SITE.email}
            <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
      <div className="mobile-dialog-bottom">
        <a
          className="escape-button"
          href={SITE.bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          {c.available}
          <ArrowUpRight size={22} />
        </a>
        <a
          className="mobile-whatsapp"
          href={whatsappUrl(dict.whatsAppFab.message)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
        >
          <WhatsAppIcon className="h-7 w-7" />
        </a>
      </div>
    </dialog>
  );
}
