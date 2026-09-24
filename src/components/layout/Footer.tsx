import { PHOTO_CREDITS } from "@/content/photo-credits";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight,
  ArrowUp,
  Phone,
  Mail,
  MapPin,
  Star,
  Check,
} from "lucide-react";
import {
  SITE,
  LOCALES,
  LOCALE_META,
  localePath,
  type Locale,
} from "@/lib/site";
import type { Dict } from "@/i18n/types";
import { designCopy } from "@/content/design-copy";
import { navigationCopy } from "@/content/navigation-copy";
import { whatsappUrl } from "@/lib/whatsapp";
import { getDiscoverHubLinks, DISCOVER_LABELS } from "@/lib/discover-cyclades";

export function Footer({ locale, dict }: { locale: Locale; dict: Dict }) {
  const c = designCopy(locale),
    n = navigationCopy(locale);
  const groups = [
    {
      title: dict.nav.fleet,
      links: [
        ["fleet/cars", c.all],
        ["fleet/collections/automatic", c.automatic],
        ["fleet/collections/family-7-seater", c.family],
        ["fleet/collections/suv-4x4", c.suv],
        ["pricing", dict.nav.pricing],
        ["book", dict.nav.bookNow],
      ],
    },
    {
      title: dict.footer.explore,
      links: [
        ["locations/airport-pickup", c.airport],
        ["locations/port-pickup", c.port],
        ["locations", c.stay],
        ["naxos", dict.naxos.pageTitle],
        ["naxos/beaches", dict.naxos.beachesTitle],
        ["guides", dict.nav.guides],
      ],
    },
    {
      title: dict.footer.company,
      links: [
        ["about", dict.nav.about],
        ["reviews", c.reviews],
        ["insurance", dict.nav.insurance],
        ["faq", dict.nav.faq],
        ["contact", dict.nav.contact],
        ["terms", c.terms],
      ],
    },
  ];
  const legal = [
    ["privacy", dict.legal.privacyTitle],
    ["cookies", dict.legal.cookiesTitle],
    ["gdpr", dict.legal.gdprTitle],
    ["cancellation", dict.legal.cancellationTitle],
  ];
  return (
    <footer className="island-footer">
      <div className="footer-top escape-wrap">
        <div>
          <p className="eyebrow">
            <span className="sun-dot" />
            {n.direct}
          </p>
          <h2>{n.footerLine}</h2>
        </div>
        <a
          href={SITE.bookingUrl}
          className="footer-round-cta"
          target="_blank"
          rel="noopener noreferrer"
        >
          <ArrowUpRight size={40} />
          <span>{c.available}</span>
        </a>
      </div>
      <div className="footer-trust">
        <span>
          <Star size={15} fill="currentColor" />
          {SITE.rating.value}/5 · {SITE.rating.count} Google
        </span>
        <span>
          <Check size={17} />
          {dict.trust.delivery}
        </span>
        <span>
          <Check size={17} />
          {dict.trust.unlimited}
        </span>
        <span>
          <Check size={17} />
          {dict.trust.owner}
        </span>
      </div>
      <div className="footer-grid escape-wrap">
        <div className="footer-brand">
          <Link href={localePath(locale)} aria-label={SITE.brand}>
            <Image
              src={SITE.logo}
              alt={SITE.brand}
              width={220}
              height={72}
              unoptimized
            />
          </Link>
          <p>{c.peopleText}</p>
          <a href={`tel:${SITE.phones[0]}`}>
            <Phone size={17} />
            {SITE.phones[0]}
          </a>
          <a href={`mailto:${SITE.email}`}>
            <Mail size={17} />
            {SITE.email}
          </a>
          <span>
            <MapPin size={17} />
            {SITE.address.locality}, {SITE.address.region}
          </span>
          <a
            className="footer-whatsapp"
            href={whatsappUrl(dict.whatsAppFab.message)}
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp
            <ArrowUpRight size={17} />
          </a>
        </div>
        {groups.map((group) => (
          <div className="footer-column" key={group.title}>
            <h3>{group.title}</h3>
            <ul>
              {group.links.map(([p, label]) => (
                <li key={p}>
                  <Link href={localePath(locale, p)}>
                    {label}
                    <ArrowUpRight size={13} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="footer-network escape-wrap">
        <div>
          <span className="eyebrow">Discover Cyclades</span>
          <div>
            {getDiscoverHubLinks(locale).map((l) => (
              <a
                href={l.href}
                key={l.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {DISCOVER_LABELS[l.labelKey]}
                <ArrowUpRight size={13} />
              </a>
            ))}
          </div>
        </div>
        <div className="footer-social">
          <a
            href={SITE.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
            <ArrowUpRight size={14} />
          </a>
          <a
            href={SITE.social.facebook}
            target="_blank"
            rel="noopener noreferrer"
          >
            Facebook
            <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
      <details className="footer-photo-credits escape-wrap">
        <summary>
          {
            {
              en: "Photography & film from Pexels",
              el: "Φωτογραφίες και βίντεο από το Pexels",
              it: "Fotografie e video da Pexels",
              fr: "Photos et vidéos de Pexels",
              de: "Fotografie und Film von Pexels",
            }[locale]
          }{" "}
          <span>+</span>
        </summary>
        <div>
          <a
            href="https://www.pexels.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Pexels ↗
          </a>
          {Object.values(PHOTO_CREDITS).map((p) => (
            <a
              key={p.id}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {p.photographer} · {p.id} ↗
            </a>
          ))}
          <a
            href="https://www.pexels.com/video/aerial-view-of-portara-and-naxos-town-29851806/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Jack Mulhern · Film ↗
          </a>
        </div>
      </details>
      <div className="footer-language-row escape-wrap">
        <div>
          <span>{dict.footer.languages}</span>
          {LOCALES.map((l) => (
            <Link
              key={l}
              href={localePath(l)}
              hrefLang={l}
              aria-current={l === locale ? "true" : undefined}
            >
              {LOCALE_META[l].name}
            </Link>
          ))}
        </div>
        <a href="#main">
          {n.back}
          <ArrowUp size={17} />
        </a>
      </div>
      <div className="footer-wordmark escape-wrap" aria-hidden="true">
        NAXOS<ArrowUpRight className="footer-wordmark-arrow" aria-hidden="true" strokeWidth={1.5} />
      </div>
      <div className="footer-bottom escape-wrap">
        <p>
          © {new Date().getFullYear()} {SITE.brand}
        </p>
        <nav aria-label={c.legal}>
          {legal.map(([p, label]) => (
            <Link key={p} href={localePath(locale, p)}>
              {label}
            </Link>
          ))}
          <a href="/sitemap.xml">Sitemap</a>
        </nav>
        <Image
          src="/images/payment-methods.webp"
          alt="Visa, Mastercard, Maestro, American Express"
          width={260}
          height={45}
          unoptimized
        />
      </div>
      <div className="footer-credits escape-wrap">
        <a
          href="https://anotherseoguru.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Designed by <span>AnotherSEOGuru</span>
        </a>
        <a
          href="https://touristas.ai"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by <span>Touristas AI</span>
        </a>
        <a
          href="https://discovercyclades.gr/en"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-partner"
        >
          <Image
            src="https://discovercyclades.gr/favicon.svg"
            alt=""
            width={20}
            height={20}
            unoptimized
          />
          <span>
            <strong>Discover Cyclades</strong>
            <small>Partner</small>
          </span>
        </a>
      </div>
    </footer>
  );
}
