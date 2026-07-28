"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { SITE, viberUrl, type Locale, LOCALES, LOCALE_META, swapLocalePath } from "@/lib/site";
import type { Dict } from "@/i18n/types";
import { whatsappUrl } from "@/lib/whatsapp";
import { Menu, X, Phone, Car, MapPin, BookOpen, ShieldCheck, ChevronDown } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { ThemeToggle } from "./ThemeToggle";

export interface MenuLink {
  href: string;
  label: string;
  description: string;
  badge?: string;
}

export function MobileMenu({
  locale,
  dict,
  currentPath,
  fleetLinks,
  infoLinks,
  exploreLinks,
}: {
  locale: Locale;
  dict: Dict;
  currentPath: string;
  fleetLinks: MenuLink[];
  infoLinks: MenuLink[];
  exploreLinks: MenuLink[];
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-white/80 text-[var(--ink)] shadow-sm backdrop-blur transition-colors hover:border-[var(--sea-2)] dark:bg-white/10 dark:text-white"
        aria-label={dict.a11y.openMenu}
        aria-expanded={open}
        aria-controls="mobile-menu-panel"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-[rgba(15,37,51,0.46)] backdrop-blur-sm transition-opacity duration-200 ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      {/* Slide-down panel */}
      <div
        id="mobile-menu-panel"
        role="dialog"
        aria-modal="true"
        aria-label={dict.nav.menu}
        className={`fixed inset-x-0 top-0 z-50 flex max-h-[100dvh] origin-top flex-col overflow-hidden border-b shadow-2xl transition-transform duration-300 dark:border-white/10 ${open ? "translate-y-0" : "-translate-y-full"}`}
        style={{ background: 'rgba(237,245,252,0.98)', borderColor: 'rgba(143,165,207,0.34)' }}
      >
        {/* Header row */}
        <div className="shrink-0 border-b border-border bg-white/70 px-4 py-3 dark:border-white/10 dark:bg-white/5 sm:px-6">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="truncate text-xs font-bold uppercase tracking-[0.22em] text-[var(--sea)]">{SITE.shortBrand}</p>
              <p className="truncate text-sm text-muted-foreground">{SITE.tagline[locale]}</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-border bg-white text-[var(--ink)] shadow-sm hover:border-[var(--sea-2)] dark:border-white/10 dark:bg-white/10 dark:text-white"
              aria-label={dict.a11y.closeMenu}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-7xl px-4 pb-4 pt-5 sm:px-6">
            {/* Primary CTAs */}
            <div className="grid grid-cols-2 gap-2">
              <a
                href={SITE.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-brand-gradient px-4 py-3 text-sm font-bold text-white shadow-lg shadow-orange-500/20"
              >
                <Car className="h-4 w-4" /> {dict.nav.bookNow}
              </a>
              <a
                href={`tel:${SITE.phones[0]}`}
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-border bg-white px-4 py-3 text-sm font-bold text-[var(--ink)] shadow-sm dark:bg-white/10 dark:text-white"
              >
                <Phone className="h-4 w-4" /> {dict.nav.call}
              </a>
            </div>

            <MobileSection icon={<Car className="h-4 w-4" />} title={dict.nav.fleet} links={fleetLinks} onNavigate={() => setOpen(false)} defaultOpen />
            <MobileSection icon={<ShieldCheck className="h-4 w-4" />} title={dict.footer.company} links={infoLinks} onNavigate={() => setOpen(false)} />
            <MobileSection icon={<MapPin className="h-4 w-4" />} title={dict.footer.explore} links={exploreLinks} onNavigate={() => setOpen(false)} />

            {/* Settings row */}
            <div className="mt-5 rounded-3xl border border-border bg-white/70 p-3 dark:bg-white/10">
              <div className="mb-2 flex items-center justify-between gap-2 text-sm font-bold text-[var(--ink)] dark:text-white">
                <span className="inline-flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-[var(--sea)]" /> {dict.footer.languages}
                </span>
                <ThemeToggle labels={dict.theme} className="h-8 w-8" />
              </div>
              <div className="flex flex-wrap gap-2">
                {LOCALES.map((l) => (
                  <Link
                    key={l}
                    href={swapLocalePath(currentPath, l)}
                    onClick={() => setOpen(false)}
                    hrefLang={LOCALE_META[l].htmlLang}
                    className={`rounded-full px-3 py-2 text-xs font-bold uppercase tracking-wider ${l === locale ? "bg-brand-gradient text-white" : "bg-white text-muted-foreground shadow-sm hover:text-[var(--ink)] dark:bg-white/10 dark:hover:text-white"}`}
                  >
                    {LOCALE_META[l].flag} {l}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sticky bottom CTA bar */}
        <div className="shrink-0 border-t border-border bg-white/90 px-4 py-3 dark:border-white/10 dark:bg-[rgba(16,43,61,0.98)]">
          <div className="grid grid-cols-4 gap-2">
            <a
              href={whatsappUrl(dict.whatsAppFab.message)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-1 rounded-2xl bg-white/80 p-3 hover:bg-white dark:bg-white/10 dark:hover:bg-white/20"
            >
              <WhatsAppIcon className="h-6 w-6" />
              <span className="text-[10px] font-bold text-[#25D366]">WhatsApp</span>
            </a>
            <a
              href={viberUrl()}
              className="flex flex-col items-center gap-1 rounded-2xl bg-purple-700 p-3 text-white hover:bg-purple-600"
            >
              <Phone className="h-5 w-5" />
              <span className="text-[10px] font-bold">Viber</span>
            </a>
            <a
              href={`tel:${SITE.phones[0]}`}
              className="flex flex-col items-center gap-1 rounded-2xl border border-border bg-white/80 p-3 text-[var(--ink)] hover:bg-white dark:bg-white/10 dark:text-white"
            >
              <Phone className="h-5 w-5" />
              <span className="text-[10px] font-bold">Call</span>
            </a>
            <a
              href={SITE.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-1 rounded-2xl bg-brand-gradient p-3 text-white shadow-md shadow-orange-500/20"
            >
              <Car className="h-5 w-5" />
              <span className="text-[10px] font-bold">Book</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileSection({
  icon,
  title,
  links,
  onNavigate,
  defaultOpen = false,
}: {
  icon: React.ReactNode;
  title: string;
  links: MenuLink[];
  onNavigate: () => void;
  defaultOpen?: boolean;
}) {
  return (
    <details open={defaultOpen} className="group mt-3 rounded-3xl border border-border bg-white/70 dark:bg-white/10">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-2 px-4 py-3 text-sm font-bold text-[var(--ink)] dark:text-white">
        <span className="inline-flex items-center gap-2">
          <span className="text-[var(--sea)]">{icon}</span> {title}
        </span>
        <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
      </summary>
      <div className="grid gap-1 px-2 pb-3">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={onNavigate}
            className="flex items-start gap-2 rounded-2xl px-3 py-2.5 transition-colors hover:bg-[var(--sea-soft)] dark:hover:bg-white/10"
          >
            <span className="min-w-0">
              <span className="flex items-center gap-1.5 text-sm font-semibold text-[var(--ink)] dark:text-white">
                {link.label}
                {link.badge && (
                  <span className="rounded-full bg-[var(--sea-soft)] px-1.5 py-0.5 text-[10px] font-bold text-[var(--sea)] dark:bg-white/10">
                    {link.badge}
                  </span>
                )}
              </span>
              <span className="mt-0.5 line-clamp-2 block text-xs leading-5 text-muted-foreground">{link.description}</span>
            </span>
          </Link>
        ))}
      </div>
    </details>
  );
}
