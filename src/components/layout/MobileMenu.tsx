"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { SITE, type Locale, LOCALES, LOCALE_META } from "@/lib/site";
import type { Dict } from "@/i18n/types";
import { whatsappUrl } from "@/lib/whatsapp";
import { Menu, X, MessageCircle, Phone, Car, MapPin, BookOpen, ShieldCheck, ChevronDown } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export interface MenuLink {
  href: string;
  label: string;
  description: string;
  icon?: React.ReactNode;
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

      {/* Slide-down panel that visually extends from the header */}
      <div
        id="mobile-menu-panel"
        role="dialog"
        aria-modal="true"
        aria-label={dict.nav.menu}
        className={`fixed inset-x-0 top-0 z-50 max-h-[100dvh] origin-top overflow-y-auto border-b border-border bg-[#fffaf1] shadow-2xl transition-transform duration-300 dark:border-white/10 dark:bg-[var(--ink)] ${open ? "translate-y-0" : "-translate-y-full"}`}
      >
        {/* Mirrors header utility bar style so it feels like the same surface */}
        <div className="border-b border-border bg-white/70 px-4 py-3 dark:border-white/10 dark:bg-white/5 sm:px-6">
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

        <div className="mx-auto max-w-7xl px-4 pb-8 pt-5 sm:px-6">
          {/* Primary CTAs */}
          <div className="grid grid-cols-2 gap-2">
            <a
              href={whatsappUrl(dict.whatsAppFab.message)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-brand-gradient px-4 py-3 text-sm font-bold text-white shadow-lg shadow-orange-500/20"
            >
              <MessageCircle className="h-4 w-4" /> {dict.nav.bookNow}
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
                  href={swapLocale(currentPath, l)}
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
            className="flex items-start gap-3 rounded-2xl px-3 py-2.5 transition-colors hover:bg-[var(--sea-soft)] dark:hover:bg-white/10"
          >
            {link.icon && (
              <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-[var(--sea-soft)] text-[var(--sea)] dark:bg-white/10 dark:text-white">
                {link.icon}
              </span>
            )}
            <span className="min-w-0">
              <span className="block text-sm font-semibold text-[var(--ink)] dark:text-white">{link.label}</span>
              <span className="mt-0.5 line-clamp-2 block text-xs leading-5 text-muted-foreground">{link.description}</span>
            </span>
          </Link>
        ))}
      </div>
    </details>
  );
}

function swapLocale(path: string, newLocale: Locale): string {
  const parts = path.split("/").filter(Boolean);
  if (parts.length === 0) return `/${newLocale}`;
  const isLocale = (LOCALES as readonly string[]).includes(parts[0]);
  if (isLocale) parts[0] = newLocale;
  else parts.unshift(newLocale);
  return "/" + parts.join("/");
}
