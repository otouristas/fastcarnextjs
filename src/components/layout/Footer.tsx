import Link from "next/link";
import Image from "next/image";
import { SITE, type Locale, localePath } from "@/lib/site";
import type { Dict } from "@/i18n/types";
import { whatsappUrl } from "@/lib/whatsapp";
import {
  Mail, Phone, MapPin, ShieldCheck,
  ChevronDown, Globe2,
} from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { LanguageLinks } from "./LanguageLinks";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M13.5 22v-8h2.7l.4-3.2h-3.1V8.8c0-.9.3-1.6 1.7-1.6h1.7V4.3c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.2v2.4H8v3.2h2.5V22h3z" />
    </svg>
  );
}

export function Footer({ locale, dict }: { locale: Locale; dict: Dict }) {
  const fleetLinks = [
    { href: localePath(locale, "fleet/cars"), label: dict.nav.cars },
    { href: localePath(locale, "fleet"), label: dict.nav.fleet },
  ];
  const infoLinks = [
    { href: localePath(locale, "pricing"), label: dict.nav.pricing },
    { href: localePath(locale, "insurance"), label: dict.nav.insurance },
    { href: localePath(locale, "faq"), label: dict.nav.faq },
    { href: localePath(locale, "guides"), label: dict.nav.guides },
    { href: localePath(locale, "about"), label: dict.nav.about },
    { href: localePath(locale, "contact"), label: dict.nav.contact },
  ];
  const exploreLinks = [
    { href: localePath(locale, "naxos"), label: dict.naxos.pageTitle },
    { href: localePath(locale, "naxos/beaches"), label: dict.naxos.beachesTitle },
    { href: localePath(locale, "guides"), label: dict.nav.guides },
  ];
  const legalLinks = [
    { href: localePath(locale, "terms"), label: "Terms & Conditions" },
    { href: localePath(locale, "cancellation"), label: "Cancellation Policy" },
    { href: localePath(locale, "privacy"), label: "Privacy Policy" },
    { href: localePath(locale, "cookies"), label: "Cookie Policy" },
    { href: localePath(locale, "gdpr"), label: "GDPR Notice" },
    { href: `${SITE.domain}/sitemap.xml`, label: "Sitemap", external: true },
  ];

  return (
    <footer className="relative overflow-hidden border-t bg-[#0a1628] text-white" style={{ borderColor: 'rgba(26,143,197,0.15)' }}>
      <div className="absolute inset-0 grid-bg opacity-50" />
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Main grid  -  5 columns */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12">
          {/* Brand block */}
          <div className="lg:col-span-3">
            <Link href={localePath(locale)} className="flex items-center gap-2" aria-label={SITE.brand}>
              <Image src={SITE.logo} alt={SITE.brand} width={280} height={84} className="h-14 w-auto sm:h-16" unoptimized />
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">{SITE.tagline[locale]}</p>

            <div className="mt-5 rounded-3xl border border-white/10 bg-[#0e2240]/40 p-4 text-sm shadow-sm">
              <a href={`tel:${SITE.phones[0]}`} className="flex items-center gap-2 py-1 font-semibold hover:text-[var(--sea)]">
                <Phone className="h-4 w-4 text-[var(--brand-2)]" /> {SITE.phones[0]}
              </a>
              <a href={`mailto:${SITE.email}`} className="flex items-center gap-2 py-1 font-semibold hover:text-[var(--sea)]">
                <Mail className="h-4 w-4 text-[var(--brand-2)]" /> {SITE.email}
              </a>
              <span className="flex items-center gap-2 py-1 text-muted-foreground">
                <MapPin className="h-4 w-4 text-[var(--brand-2)]" /> Naxos, Greece
              </span>
              <a
                href={whatsappUrl(dict.whatsAppFab.message)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-2 rounded-full bg-brand-gradient px-4 py-2 text-sm font-bold text-white shadow-lg" style={{ boxShadow: '0 4px 20px rgba(0,119,182,0.25)' }}
              >
                <WhatsAppIcon className="h-5 w-5" />
                {dict.nav.whatsapp}
              </a>
            </div>

            <div className="mt-5 flex items-center gap-2">
              <SocialIcon href={SITE.social.instagram} label="Instagram"><InstagramIcon className="h-4 w-4" /></SocialIcon>
              <SocialIcon href={SITE.social.facebook} label="Facebook"><FacebookIcon className="h-4 w-4" /></SocialIcon>
            </div>
          </div>

          <FooterCol title={dict.footer.fleet} links={fleetLinks} className="lg:col-span-2" />
          <FooterCol title={dict.footer.company} links={infoLinks} className="lg:col-span-2" />
          <FooterCol title={dict.footer.explore} links={exploreLinks} className="lg:col-span-2" />
          <FooterCol title="Legal & Info" links={legalLinks} className="lg:col-span-3" />
        </div>

        {/* Credit / attribution row */}
        <div className="mt-8 flex flex-col items-center gap-3 border-t border-border pt-6 text-center sm:flex-row sm:justify-center dark:border-white/10">
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-muted-foreground">
            <a href="https://anotherseoGuru.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-[var(--sea)] transition-colors group">
              <span>Designed &amp; Developed by</span>
              <span className="font-semibold group-hover:underline">AnotherSEOGuru</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>
            </a>
            <span className="hidden sm:inline text-border">•</span>
            <a href="https://discovercyclades.gr/en" target="_blank" rel="noopener noreferrer" className="group relative flex-shrink-0">
              <div className="flex items-center gap-1.5 transition-transform duration-300 group-hover:-translate-y-0.5">
                <Globe2 className="h-[18px] w-[18px] text-[var(--sea-2)]" aria-hidden="true" />
                <div className="flex flex-col text-left">
                  <span className="text-xs font-bold leading-tight text-[var(--ink)] dark:text-white group-hover:text-[var(--sea)] transition-colors">Discover Cyclades</span>
                  <span className="text-[9px] uppercase tracking-wider text-muted-foreground">Partner</span>
                </div>
              </div>
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-6 flex flex-col gap-4 border-t border-border pt-6 md:flex-row md:items-center md:justify-between dark:border-white/10">
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <ShieldCheck className="h-4 w-4 text-[var(--sea)]" />
            <span>© {new Date().getFullYear()} {SITE.brand}.</span>
            <span>{dict.footer.rights}</span>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="mr-1 text-muted-foreground">{dict.footer.languages}:</span>
            <LanguageLinks locale={locale} />
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
  className = "",
}: {
  title: string;
  links: { href: string; label: string; external?: boolean }[];
  className?: string;
}) {
  return (
    <div className={className}>
      <details className="group" open>
        <summary className="flex cursor-pointer list-none items-center justify-between gap-2 text-sm font-bold text-white md:pointer-events-none md:cursor-default">
          {title}
          <ChevronDown className="h-4 w-4 shrink-0 transition-transform group-open:rotate-180 md:hidden" />
        </summary>
        <ul className="mt-3 space-y-2 text-sm">
          {links.map((l) =>
            l.external ? (
              <li key={l.href}>
                <a href={l.href} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-[var(--sea)]">
                  {l.label}
                </a>
              </li>
            ) : (
              <li key={l.href}>
                <Link href={l.href} className="text-muted-foreground hover:text-[var(--sea)]">
                  {l.label}
                </Link>
              </li>
            )
          )}
        </ul>
      </details>
    </div>
  );
}

function SocialIcon({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-[#0e2240]/40 text-white shadow-sm transition-colors hover:border-[var(--sea-2)] hover:text-[var(--sea-2)]"
    >
      {children}
    </a>
  );
}
