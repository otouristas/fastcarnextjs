import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { isLocale, localePath, SITE } from "@/lib/site";
import { getDict } from "@/i18n/dictionaries";
import { buildMetadata } from "@/lib/seo";
import { LegalPageShell } from "@/components/legal/LegalPageShell";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = await import(`@/i18n/dict/${locale}`).then((m) => m.dict);
  return buildMetadata({
    locale,
    path: "privacy",
    title: dict.legal.privacyTitle,
    description: dict.legal.privacySubtitle,
  });
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDict(locale);

  const sections: { h: string; body: React.ReactNode }[] = [
    {
      h: "1. Data controller",
      body: (
        <p>
          The data controller is <strong>{SITE.brand}</strong>, {SITE.address.street}, {SITE.address.locality} {SITE.address.postalCode}, Greece.
          Contact: <a className="text-[var(--sea)] hover:underline" href={`mailto:${SITE.email}`}>{SITE.email}</a>, phone {SITE.phones[0]}.
        </p>
      ),
    },
    {
      h: "2. What we collect",
      body: (
        <ul className="ml-5 list-disc space-y-1">
          <li>Booking details you submit: full name, dates, vehicle, contact info.</li>
          <li>Driver documents shown at pickup (licence, passport/ID, credit-card details for the deposit hold)  -  retained only as required by Greek tax law.</li>
          <li>Email exchanges and WhatsApp messages with our team.</li>
          <li>Anonymous site analytics if you consent (cookies, see Cookie Policy).</li>
        </ul>
      ),
    },
    {
      h: "3. Purpose of processing",
      body: (
        <ul className="ml-5 list-disc space-y-1">
          <li>Performing the rental contract with you.</li>
          <li>Complying with Greek tax and rental-vehicle legal obligations.</li>
          <li>Replying to enquiries you send us.</li>
          <li>Improving the website (only with consent for analytics).</li>
        </ul>
      ),
    },
    {
      h: "4. Lawful basis",
      body: (
        <ul className="ml-5 list-disc space-y-1">
          <li><strong>Contract</strong>  -  for booking, pickup and drop-off.</li>
          <li><strong>Legal obligation</strong>  -  tax records, rental registry, insurance records.</li>
          <li><strong>Legitimate interest</strong>  -  fraud prevention, replying to support enquiries.</li>
          <li><strong>Consent</strong>  -  analytics and any future marketing communications.</li>
        </ul>
      ),
    },
    {
      h: "5. Third parties",
      body: (
        <ul className="ml-5 list-disc space-y-1">
          <li><strong>Cosmic Booker</strong>  -  booking engine at fastmotorentalnaxos.cosmicbooker.com.</li>
          <li><strong>WhatsApp / Meta</strong>  -  when you message us via WhatsApp.</li>
          <li><strong>Google Analytics</strong>  -  only if you accept analytics cookies.</li>
          <li><strong>Hellenic tax authority (AADE)</strong>  -  invoices and rental records as legally required.</li>
        </ul>
      ),
    },
    {
      h: "6. Retention",
      body: (
        <p>
          Rental contracts and tax-related documents are retained for the period required by Greek law (currently 5 years).
          Casual email/WhatsApp enquiries are deleted within 12 months unless they lead to a booking.
        </p>
      ),
    },
    {
      h: "7. Your rights",
      body: (
        <ul className="ml-5 list-disc space-y-1">
          <li>Right of access, rectification, erasure, restriction, portability, objection.</li>
          <li>Right to withdraw consent at any time (where consent is the basis).</li>
          <li>Right to lodge a complaint with the Hellenic Data Protection Authority  -  <a className="text-[var(--sea)] hover:underline" href="https://www.dpa.gr" target="_blank" rel="noopener noreferrer">www.dpa.gr</a>.</li>
        </ul>
      ),
    },
    {
      h: "8. Contact",
      body: (
        <p>
          Email <a className="text-[var(--sea)] hover:underline" href={`mailto:${SITE.email}`}>{SITE.email}</a> or write to the postal address above. We aim to respond within 30 days.
        </p>
      ),
    },
  ];

  return (
    <LegalPageShell
      locale={locale}
      dict={dict}
      slug="privacy"
      title={dict.legal.privacyTitle}
      subtitle={dict.legal.privacySubtitle}
    >
      <div className="space-y-8">
        {sections.map((s) => (
          <div key={s.h} className="rounded-3xl border border-border bg-white/70 p-6 shadow-sm dark:bg-white/5">
            <h2 className="text-lg font-bold text-[var(--ink)] dark:text-white">{s.h}</h2>
            <div className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</div>
          </div>
        ))}
        <div className="rounded-3xl border border-border bg-[var(--sea-soft)]/40 p-6 text-sm dark:bg-white/5">
          See also: {" "}
          <Link className="font-semibold text-[var(--sea)] hover:underline" href={localePath(locale, "gdpr")}>{dict.legal.gdprTitle}</Link>{" · "}
          <Link className="font-semibold text-[var(--sea)] hover:underline" href={localePath(locale, "cookies")}>{dict.legal.cookiesTitle}</Link>{" · "}
          <Link className="font-semibold text-[var(--sea)] hover:underline" href={localePath(locale, "terms")}>{dict.legal.termsTitle}</Link>
        </div>
      </div>
    </LegalPageShell>
  );
}
