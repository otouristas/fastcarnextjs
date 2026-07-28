"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { SITE, type Locale, localePath, LOCALES, LOCALE_META, swapLocalePath } from "@/lib/site";
import type { Dict } from "@/i18n/types";
import { LOCATIONS } from "@/content/locations";
import { whatsappUrl } from "@/lib/whatsapp";
import {
  Phone, ChevronDown, Mail, Clock, Star,
} from "lucide-react";
import { MobileMenu, type MenuLink } from "./MobileMenu";
import { ThemeToggle } from "./ThemeToggle";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

interface MegaLink extends MenuLink {
  badge?: string;
}

interface MegaGroup {
  title: string;
  links: MegaLink[];
  cta?: { label: string; href: string; description: string };
}

export function Header({ locale, dict }: { locale: Locale; dict: Dict }) {
  const [scrolled, setScrolled] = useState(false);
  const currentPath = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const fleetLinks: MegaLink[] = [
    { href: localePath(locale, "fleet/cars"), label: dict.nav.cars, description: dict.fleetHub.categoryCars },
    { href: localePath(locale, "fleet"), label: dict.nav.fleet, description: dict.fleetHub.subtitle },
  ];
  const infoLinks: MegaLink[] = [
    { href: localePath(locale, "pricing"), label: dict.nav.pricing, description: dict.pricing.subtitle },
    { href: localePath(locale, "insurance"), label: dict.nav.insurance, description: dict.insurance.subtitle },
    { href: localePath(locale, "faq"), label: dict.nav.faq, description: dict.faqHub.subtitle },
    { href: localePath(locale, "about"), label: dict.nav.about, description: dict.about.subtitle },
    { href: localePath(locale, "contact"), label: dict.nav.contact, description: dict.contact.subtitle },
    { href: localePath(locale, "terms"), label: "Terms", description: "Rental terms & conditions" },
    { href: localePath(locale, "reviews"), label: "Reviews", description: `${SITE.rating.value}★ · ${SITE.rating.count}+ verified Google reviews` },
  ];
  const exploreLinks: MegaLink[] = [
    { href: localePath(locale, "naxos"), label: dict.naxos.pageTitle, description: dict.naxos.pageSubtitle, badge: "Guide" },
    { href: localePath(locale, "naxos/beaches"), label: dict.naxos.beachesTitle, description: "Beaches, villages & best vehicle picks" },
    { href: localePath(locale, "locations"), label: dict.nav.locations, description: dict.locationsHub.subtitle },
    ...LOCATIONS.slice(0, 4).map((l) => ({
      href: localePath(locale, `locations/${l.slug}`),
      label: l.shortName,
      description: l.hero[locale],
    })),
    { href: localePath(locale, "guides"), label: dict.nav.guides, description: dict.guidesHub.subtitle },
  ];

  const megaGroups: MegaGroup[] = [
    {
      title: dict.nav.fleet,
      links: fleetLinks,
      cta: { label: dict.cta.bookCar, href: SITE.bookingUrl, description: dict.book.subtitle },
    },
    {
      title: dict.footer.company,
      links: infoLinks,
      cta: { label: dict.cta.whatsappQuote, href: whatsappUrl(dict.whatsAppFab.message), description: dict.contact.subtitle },
    },
    {
      title: dict.footer.explore,
      links: exploreLinks,
      cta: { label: dict.cta.seeFleet, href: localePath(locale, "fleet"), description: dict.fleetHub.subtitle },
    },
  ];

  return (
    <header className="site-header sticky top-0 z-[80] w-full border-b backdrop-blur-xl">
      {/* Utility bar */}
      <div className="site-header-utility hidden border-b text-xs text-muted-foreground sm:block">
        <div className="mx-auto flex h-9 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <a href={`tel:${SITE.phones[0]}`} className="inline-flex items-center gap-1.5 font-medium hover:text-[var(--sea)]">
              <Phone className="h-3.5 w-3.5" /> {SITE.phones[0]}
            </a>
            <a href={`mailto:${SITE.email}`} className="hidden items-center gap-1.5 font-medium hover:text-[var(--sea)] md:inline-flex">
              <Mail className="h-3.5 w-3.5" /> {SITE.email}
            </a>
            <span className="hidden items-center gap-1.5 md:inline-flex">
              <Clock className="h-3.5 w-3.5" /> {SITE.hours.open}–{SITE.hours.close}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden items-center gap-1 font-semibold text-[var(--ink)] dark:text-white md:inline-flex">
              <Star className="h-3.5 w-3.5 fill-[var(--brand-1)] text-[var(--brand-1)]" /> {SITE.rating.value}/5
            </span>
            <div className="site-language-switcher flex items-center gap-1 rounded-full border px-2 py-0.5">
              {LOCALES.map((l) => (
                <Link
                  key={l}
                  href={swapLocalePath(currentPath, l)}
                  aria-label={LOCALE_META[l].name}
                  hrefLang={LOCALE_META[l].htmlLang}
                  className={`rounded-full px-1.5 py-0.5 uppercase tracking-wider ${l === locale ? "bg-brand-gradient text-white" : "hover:text-[var(--ink)] dark:hover:text-white"}`}
                >
                  {l}
                </Link>
              ))}
            </div>
            <ThemeToggle labels={dict.theme} className="h-7 w-7" />
          </div>
        </div>
      </div>

      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-50 focus:rounded-full focus:bg-brand-gradient focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-white">
        {dict.a11y.skipToContent}
      </a>

      {/* Main bar */}
      <div className="group/header relative">
        <div className={`mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8 transition-all duration-300 ${scrolled ? "h-16" : "h-[72px]"}`}>
          <Link href={localePath(locale)} className="flex items-center gap-3" aria-label={SITE.brand}>
            <Image
              src={SITE.logo}
              alt={SITE.brand}
              width={260}
              height={80}
              priority
              unoptimized
              className={`w-auto transition-all duration-300 ${scrolled ? "h-10 sm:h-11" : "h-12 sm:h-14 lg:h-16"}`}
            />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex h-full" aria-label="Primary">
            {megaGroups.map((g) => (
              <MegaMenu key={g.title} group={g} dict={dict} />
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={`tel:${SITE.phones[0]}`}
              className="hidden h-10 w-10 items-center justify-center rounded-lg border text-[var(--ink)] shadow-sm hover:border-[var(--sea-2)] hover:text-[var(--sea)] dark:text-white sm:flex" style={{ borderColor: 'rgba(26,143,197,0.20)', background: 'transparent' }}
              aria-label={dict.nav.call}
            >
              <Phone className="h-4 w-4" />
            </a>

            <a
              href={whatsappUrl(dict.whatsAppFab.message)}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden h-10 w-10 items-center justify-center rounded-lg border shadow-sm hover:border-green-400 sm:flex" style={{ borderColor: 'rgba(26,143,197,0.20)', background: 'transparent' }}
              aria-label="WhatsApp"
            >
              <WhatsAppIcon className="h-6 w-6" />
            </a>

            <a
              href={SITE.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-2 rounded-lg bg-brand-gradient px-6 py-3 text-[13px] font-bold uppercase tracking-[0.12em] text-white shadow-lg sm:inline-flex" style={{ boxShadow: '0 4px 20px rgba(0,119,182,0.25)' }}
            >
              {dict.nav.bookNow}
            </a>

            <MobileMenu
              locale={locale}
              dict={dict}
              currentPath={currentPath}
              fleetLinks={fleetLinks}
              infoLinks={infoLinks}
              exploreLinks={exploreLinks}
            />
          </div>
        </div>
      </div>
    </header>
  );
}

function MegaMenu({ group, dict }: { group: MegaGroup; dict: Dict }) {
  return (
    <div className="group/mega self-stretch flex items-center">
      <button
        type="button"
        className="inline-flex h-10 items-center gap-1 rounded-lg px-2 text-[12px] font-semibold uppercase tracking-[0.10em] whitespace-nowrap transition-all duration-200 text-[var(--ink)]/75 hover:bg-[var(--sea)]/[0.06] hover:text-[var(--ink)] dark:text-white/80 dark:hover:text-white"
        aria-haspopup="true"
      >
        {group.title}
        <ChevronDown className="h-4 w-4 transition-transform group-hover/mega:rotate-180 group-focus-within/mega:rotate-180" />
      </button>

      <div className="invisible absolute left-1/2 top-full -translate-x-1/2 opacity-0 transition-all duration-200 group-hover/mega:visible group-hover/mega:opacity-100 group-focus-within/mega:visible group-focus-within/mega:opacity-100">
        <div aria-hidden="true" className="h-3 w-full" />
        <div
          className="site-mega-panel rounded-[2rem] border p-6 backdrop-blur-xl"
          style={{ width: "min(76rem, calc(100vw - 2rem))" }}
        >
          <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
            <div>
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-[var(--sea)] dark:text-[var(--sea-2)]">
                {group.title}
              </p>
              <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="flex h-full items-start gap-2 rounded-2xl border border-transparent p-3.5 transition-colors hover:border-border hover:bg-white dark:hover:border-white/10 dark:hover:bg-white/10"
                    >
                      <span className="min-w-0">
                        <span className="flex items-center gap-1.5 text-sm font-bold text-[var(--ink)] dark:text-white">
                          {link.label}
                          {link.badge && (
                            <span className="rounded-full bg-[var(--sea-soft)] px-1.5 py-0.5 text-[10px] font-bold text-[var(--sea)] dark:bg-white/10 dark:text-[var(--sea-2)]">
                              {link.badge}
                            </span>
                          )}
                        </span>
                        <span className="mt-0.5 line-clamp-2 block text-xs leading-5 text-muted-foreground">{link.description}</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {group.cta && (
              <Link
                href={group.cta.href}
                className="relative flex min-h-full flex-col justify-between overflow-hidden rounded-[1.75rem] bg-brand-gradient p-6 text-white shadow-xl" style={{ boxShadow: '0 20px 60px rgba(0,119,182,0.30)' }}
              >
                <div aria-hidden="true" className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full bg-white/15 blur-2xl" />
                <div aria-hidden="true" className="pointer-events-none absolute -left-12 -bottom-12 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
                <div className="relative">
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/85">{dict.nav.bookNow}</p>
                  <p className="mt-3 text-2xl font-extrabold leading-tight">{group.cta.label}</p>
                  <p className="mt-3 text-sm leading-6 text-white/90">{group.cta.description}</p>
                </div>
                <span className="relative mt-5 inline-flex items-center gap-2 text-sm font-bold">
                  {dict.common.readMore} →
                </span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
