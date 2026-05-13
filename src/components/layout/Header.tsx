import Link from "next/link";
import Image from "next/image";
import { SITE, type Locale, localePath, LOCALES, LOCALE_META } from "@/lib/site";
import type { Dict } from "@/i18n/types";
import { LOCATIONS } from "@/content/locations";
import { whatsappUrl } from "@/lib/whatsapp";
import {
  Phone, MessageCircle, ChevronDown, Car, MapPin, ShieldCheck, Mail, Clock, Star,
  Bike, Mountain, Zap, BookOpen, Wallet, HelpCircle, Sparkles,
} from "lucide-react";
import { MobileMenu, type MenuLink } from "./MobileMenu";
import { ThemeToggle } from "./ThemeToggle";

interface MegaLink extends MenuLink {
  icon?: React.ReactNode;
  badge?: string;
}

interface MegaGroup {
  title: string;
  icon: React.ReactNode;
  links: MegaLink[];
  cta?: { label: string; href: string; description: string };
}

export function Header({ locale, dict, currentPath }: { locale: Locale; dict: Dict; currentPath: string }) {
  const fleetLinks: MegaLink[] = [
    { href: localePath(locale, "fleet/cars"), label: dict.nav.cars, description: dict.fleetHub.categoryCars, icon: <Car className="h-4 w-4" /> },
    { href: localePath(locale, "fleet/scooters"), label: dict.nav.scooters, description: dict.fleetHub.categoryScooters, icon: <Bike className="h-4 w-4" /> },
    { href: localePath(locale, "fleet/atv-quad"), label: dict.nav.atvQuad, description: dict.fleetHub.categoryAtv, icon: <Mountain className="h-4 w-4" /> },
    { href: localePath(locale, "fleet/buggy"), label: dict.nav.buggy, description: dict.fleetHub.categoryBuggy, icon: <Zap className="h-4 w-4" /> },
    { href: localePath(locale, "fleet/motorbike"), label: dict.nav.motorbike, description: dict.fleetHub.categoryMoto, icon: <Bike className="h-4 w-4" /> },
    { href: localePath(locale, "fleet"), label: dict.nav.fleet, description: dict.fleetHub.subtitle, icon: <Sparkles className="h-4 w-4" /> },
  ];
  const infoLinks: MegaLink[] = [
    { href: localePath(locale, "pricing"), label: dict.nav.pricing, description: dict.pricing.subtitle, icon: <Wallet className="h-4 w-4" /> },
    { href: localePath(locale, "insurance"), label: dict.nav.insurance, description: dict.insurance.subtitle, icon: <ShieldCheck className="h-4 w-4" /> },
    { href: localePath(locale, "faq"), label: dict.nav.faq, description: dict.faqHub.subtitle, icon: <HelpCircle className="h-4 w-4" /> },
    { href: localePath(locale, "about"), label: dict.nav.about, description: dict.about.subtitle, icon: <Sparkles className="h-4 w-4" /> },
    { href: localePath(locale, "contact"), label: dict.nav.contact, description: dict.contact.subtitle, icon: <Mail className="h-4 w-4" /> },
    { href: localePath(locale, "terms"), label: "Terms", description: "Rental terms & conditions", icon: <ShieldCheck className="h-4 w-4" /> },
  ];
  const exploreLinks: MegaLink[] = [
    { href: localePath(locale, "locations"), label: dict.nav.locations, description: dict.locationsHub.subtitle, icon: <MapPin className="h-4 w-4" /> },
    ...LOCATIONS.slice(0, 5).map((l) => ({
      href: localePath(locale, `locations/${l.slug}`),
      label: l.shortName,
      description: l.hero[locale],
      icon: <MapPin className="h-4 w-4" />,
    })),
    { href: localePath(locale, "guides"), label: dict.nav.guides, description: dict.guidesHub.subtitle, icon: <BookOpen className="h-4 w-4" /> },
  ];

  const megaGroups: MegaGroup[] = [
    {
      title: dict.nav.fleet,
      icon: <Car className="h-4 w-4" />,
      links: fleetLinks,
      cta: { label: dict.cta.bookCar, href: localePath(locale, "book"), description: dict.book.subtitle },
    },
    {
      title: dict.footer.company,
      icon: <ShieldCheck className="h-4 w-4" />,
      links: infoLinks,
      cta: { label: dict.cta.whatsappQuote, href: whatsappUrl(dict.whatsAppFab.message), description: dict.contact.subtitle },
    },
    {
      title: dict.footer.explore,
      icon: <MapPin className="h-4 w-4" />,
      links: exploreLinks,
      cta: { label: dict.cta.seeFleet, href: localePath(locale, "fleet"), description: dict.fleetHub.subtitle },
    },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-[#fffaf1]/95 shadow-[0_8px_30px_-22px_rgba(15,37,51,0.45)] backdrop-blur-xl dark:border-white/10 dark:bg-[rgba(16,43,61,0.92)]">
      {/* Utility bar */}
      <div className="hidden border-b border-border/70 bg-white/60 text-xs text-muted-foreground dark:border-white/10 dark:bg-white/5 sm:block">
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
            <div className="flex items-center gap-1 rounded-full border border-border bg-white/80 px-2 py-0.5 dark:bg-white/10">
              {LOCALES.map((l) => (
                <Link
                  key={l}
                  href={swapLocale(currentPath, l)}
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

      {/* Main bar — sets `group` so mega panels can react to focus-within/hover within the nav */}
      <div className="group/header relative">
        <div className="mx-auto flex h-24 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <Link href={localePath(locale)} className="flex items-center gap-3" aria-label={SITE.brand}>
            <Image
              src={SITE.logo}
              alt={SITE.brand}
              width={260}
              height={80}
              priority
              className="h-12 w-auto sm:h-14 lg:h-16"
              unoptimized
            />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {megaGroups.map((g) => (
              <MegaMenu key={g.title} group={g} dict={dict} />
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={`tel:${SITE.phones[0]}`}
              className="hidden h-11 w-11 items-center justify-center rounded-full border border-border bg-white/80 text-[var(--ink)] shadow-sm hover:border-[var(--sea-2)] hover:text-[var(--sea)] dark:bg-white/10 dark:text-white sm:flex"
              aria-label={dict.nav.call}
            >
              <Phone className="h-4 w-4" />
            </a>

            <a
              href={whatsappUrl(dict.whatsAppFab.message)}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-2 rounded-full bg-brand-gradient px-5 py-3 text-sm font-bold text-white shadow-lg shadow-orange-500/20 sm:inline-flex"
            >
              <MessageCircle className="h-4 w-4" />
              <span className="hidden sm:inline">{dict.nav.bookNow}</span>
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
    <div className="group/mega relative">
      <button
        type="button"
        className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-[var(--ink)] transition-colors hover:bg-white/90 hover:text-[var(--sea)] focus:bg-white/90 focus:outline-none data-[active=true]:bg-white/90 dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10"
        aria-haspopup="true"
      >
        <span className="text-[var(--sea)]">{group.icon}</span>
        {group.title}
        <ChevronDown className="h-4 w-4 transition-transform group-hover/mega:rotate-180 group-focus-within/mega:rotate-180" />
      </button>

      {/* Bridging area — eliminates the hover gap between trigger and panel so the panel feels attached */}
      <div className="invisible absolute left-1/2 top-full -translate-x-1/2 opacity-0 transition-all duration-200 group-hover/mega:visible group-hover/mega:opacity-100 group-focus-within/mega:visible group-focus-within/mega:opacity-100">
        <div aria-hidden="true" className="h-3 w-full" />
        <div
          className="rounded-[2rem] border border-border bg-[#fffaf1]/98 p-6 shadow-[0_40px_100px_-30px_rgba(15,37,51,0.5)] backdrop-blur-xl dark:border-white/10 dark:bg-[rgba(16,43,61,0.98)]"
          style={{ width: "min(76rem, calc(100vw - 2rem))" }}
        >
          <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
            <div>
              <p className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-[var(--sea)] dark:text-[var(--sea-soft)]">
                <span className="grid h-6 w-6 place-items-center rounded-md bg-[var(--sea-soft)] text-[var(--sea)] dark:bg-white/10 dark:text-[var(--sea-soft)]">
                  {group.icon}
                </span>
                {group.title}
              </p>
              <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="flex h-full items-start gap-3 rounded-2xl border border-transparent p-3.5 transition-colors hover:border-border hover:bg-white dark:hover:border-white/10 dark:hover:bg-white/10"
                    >
                      <span className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[var(--sea-soft)] text-[var(--sea)] dark:bg-white/10 dark:text-white">
                        {link.icon}
                      </span>
                      <span className="min-w-0">
                        <span className="block text-sm font-bold text-[var(--ink)] dark:text-white">{link.label}</span>
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
                className="relative flex min-h-full flex-col justify-between overflow-hidden rounded-[1.75rem] bg-brand-gradient p-6 text-white shadow-xl shadow-orange-500/25"
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

function swapLocale(path: string, newLocale: Locale): string {
  const parts = path.split("/").filter(Boolean);
  if (parts.length === 0) return `/${newLocale}`;
  const isLocale = (LOCALES as readonly string[]).includes(parts[0]);
  if (isLocale) parts[0] = newLocale;
  else parts.unshift(newLocale);
  return "/" + parts.join("/");
}
