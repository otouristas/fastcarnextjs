"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  SITE,
  LOCALES,
  LOCALE_META,
  localePath,
  swapLocalePath,
  type Locale,
} from "@/lib/site";
import type { Dict } from "@/i18n/types";
import { designCopy } from "@/content/design-copy";
import { navigationCopy } from "@/content/navigation-copy";
import { LOCATIONS } from "@/content/locations";
import { NAXOS_GUIDE_ARTICLES } from "@/content/naxos-guide";
import {
  ArrowUpRight,
  ChevronDown,
  X,
  Star,
  Check,
  Plane,
  Anchor,
} from "lucide-react";
import { MobileMenu, type MenuLink } from "./MobileMenu";
import { ThemeToggle } from "./ThemeToggle";

export function Header({ locale, dict }: { locale: Locale; dict: Dict }) {
  const c = designCopy(locale),
    n = navigationCopy(locale),
    currentPath = usePathname();
  const [active, setActive] = useState<number | null>(null);
  const header = useRef<HTMLElement>(null);
  const triggers = useRef<(HTMLButtonElement | null)[]>([]);
  const link = (
    path: string,
    label: string,
    description: string,
  ): MenuLink => ({ href: localePath(locale, path), label, description });
  const fleetLinks = [
    link("fleet/cars", c.all, c.fleetIntro),
    link("fleet/collections/automatic", c.automatic, c.automaticDesc),
    link("fleet/collections/family-7-seater", c.family, c.familyDesc),
    link("fleet/collections/suv-4x4", c.suv, c.suvDesc),
    link("fleet", dict.nav.fleet, dict.fleetHub.subtitle),
    link("fleet/scooters", n.scooter, n.scooterNote),
  ];
  const infoLinks = [
    link("pricing", dict.nav.pricing, dict.pricing.subtitle),
    link("insurance", dict.nav.insurance, dict.insurance.subtitle),
    link(
      "reviews",
      c.reviews,
      `${SITE.rating.value}/5 · ${SITE.rating.count} Google`,
    ),
    link("about", dict.nav.about, c.peopleText),
    link("faq", dict.nav.faq, dict.faqHub.subtitle),
    link("contact", dict.nav.contact, dict.contact.subtitle),
    link("terms", c.terms, c.legal),
  ];
  const exploreLinks = [
    link("locations/airport-pickup", c.airport, c.pickup),
    link("locations/port-pickup", c.port, c.pickup),
    link("locations", c.stay, dict.locationsHub.subtitle),
    link("naxos", dict.naxos.pageTitle, c.islandText),
    link("naxos/beaches", dict.naxos.beachesTitle, c.coast),
    link("guides", dict.nav.guides, c.journal),
    ...NAXOS_GUIDE_ARTICLES.slice(0, 3).map((a) =>
      link(`naxos/${a.slug}`, a.title[locale], a.excerpt[locale]),
    ),
    ...LOCATIONS.slice(2, 5).map((l) =>
      link(`locations/${l.slug}`, l.name[locale], l.hero[locale]),
    ),
  ];
  const groups = [
    {
      title: dict.nav.fleet,
      links: fleetLinks,
      image: "/images/fleet/studio/fiat-500-cabrio.webp",
      heading: c.fleet,
    },
    {
      title: dict.footer.company,
      links: infoLinks,
      image: "/images/pexels/naxos-portara-sunset.webp",
      heading: c.people,
    },
    {
      title: dict.footer.explore,
      links: exploreLinks,
      image: "/images/naxos/plaka-beach.jpg",
      heading: c.island,
    },
  ];
  useEffect(() => {
    if (active === null) return;
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActive(null);
        triggers.current[active]?.focus();
      }
    };
    const outside = (e: PointerEvent) => {
      if (!header.current?.contains(e.target as Node)) setActive(null);
    };
    document.addEventListener("keydown", key);
    document.addEventListener("pointerdown", outside);
    return () => {
      document.removeEventListener("keydown", key);
      document.removeEventListener("pointerdown", outside);
    };
  }, [active]);
  const close = () => setActive(null);
  return (
    <header
      ref={header}
      className="island-header"
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) close();
      }}
    >
      <a href="#main" className="skip-navigation">
        {dict.a11y.skipToContent}
      </a>
      <div className="header-indicators">
        <div>
          <span>
            <Star size={12} fill="currentColor" />
            {SITE.rating.value}/5 · {SITE.rating.count} Google
          </span>
          <span className="header-indicator-extra">
            <Check size={13} />
            {n.direct}
          </span>
        </div>
        <div>
          <a href={`tel:${SITE.phones[0]}`}>{SITE.phones[0]}</a>
          <span className="header-indicator-extra">
            {SITE.hours.open}—{SITE.hours.close}
          </span>
        </div>
      </div>
      <div className="header-main">
        <Link
          onClick={close}
          className="header-logo"
          href={localePath(locale)}
          aria-label={SITE.brand}
        >
          <Image
            src={SITE.logo}
            alt={SITE.brand}
            width={220}
            height={72}
            unoptimized
            priority
          />
        </Link>
        <nav className="desktop-navigation" aria-label={dict.nav.menu}>
          {groups.map((g, i) => (
            <button
              ref={(el) => {
                triggers.current[i] = el;
              }}
              key={g.title}
              className={active === i ? "is-active" : ""}
              aria-expanded={active === i}
              aria-controls={`mega-${i}`}
              onClick={() => setActive(active === i ? null : i)}
            >
              {g.title}
              <ChevronDown size={14} />
            </button>
          ))}
        </nav>
        <div className="header-tools">
          <div className="header-languages">
            {LOCALES.map((l) => (
              <Link
                onClick={close}
                href={swapLocalePath(currentPath, l)}
                hrefLang={l}
                aria-label={LOCALE_META[l].name}
                aria-current={l === locale ? "true" : undefined}
                key={l}
              >
                {l}
              </Link>
            ))}
          </div>
          <ThemeToggle labels={dict.theme} className="header-theme" />
          <a
            className="header-book"
            href={SITE.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {dict.nav.bookNow}
            <ArrowUpRight size={17} />
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
      {groups.map((g, i) => (
        <div
          id={`mega-${i}`}
          key={g.title}
          className="island-mega"
          hidden={active !== i}
        >
          <div className="mega-heading">
            <p className="eyebrow">
              <span className="sun-dot" />0{i + 1} — {n.plan}
            </p>
            <button
              onClick={() => {
                close();
                triggers.current[i]?.focus();
              }}
              aria-label={n.close}
            >
              <X size={23} />
            </button>
          </div>
          <div className="mega-body">
            <div className="mega-index">
              <h2>
                {g.title}
                <span>.</span>
              </h2>
              <p>{n.navigate}</p>
              <div className="mega-pickup">
                <Link
                  onClick={close}
                  href={localePath(locale, "locations/airport-pickup")}
                >
                  <Plane size={18} />
                  {c.airport}
                  <ArrowUpRight size={16} />
                </Link>
                <Link
                  onClick={close}
                  href={localePath(locale, "locations/port-pickup")}
                >
                  <Anchor size={18} />
                  {c.port}
                  <ArrowUpRight size={16} />
                </Link>
              </div>
            </div>
            <div className="mega-link-grid">
              {g.links.map((l, j) => (
                <Link onClick={close} href={l.href} key={l.href}>
                  <span className="mega-link-index">
                    {String(j + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <strong>{l.label}</strong>
                    <p>{l.description}</p>
                  </div>
                  <ArrowUpRight size={18} />
                </Link>
              ))}
            </div>
            <Link
              onClick={close}
              href={localePath(
                locale,
                i === 0 ? "fleet/cars" : i === 1 ? "about" : "naxos",
              )}
              className="mega-feature"
            >
              <Image
                src={g.image}
                alt={g.heading}
                fill
                sizes="30vw"
                className="object-cover"
              />
              <div>
                <span>{n.welcome}</span>
                <h3>{g.heading}</h3>
                <ArrowUpRight size={25} />
              </div>
            </Link>
          </div>
          <div className="mega-bottom">
            <span>
              <Star size={14} fill="currentColor" />
              {SITE.rating.value}/5 · {SITE.rating.count} {dict.reviews.google}
            </span>
            <span>
              <Check size={14} />
              {dict.trust.delivery}
            </span>
            <span>
              <Check size={14} />
              {dict.trust.unlimited}
            </span>
            <a href={SITE.bookingUrl} target="_blank" rel="noopener noreferrer">
              {c.available}
              <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      ))}
    </header>
  );
}
