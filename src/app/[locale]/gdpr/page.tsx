import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { isLocale, localePath } from "@/lib/site";
import { getDict } from "@/i18n/dictionaries";
import { buildMetadata } from "@/lib/seo";
import { LegalPageShell } from "@/components/legal/LegalPageShell";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = await import(`@/i18n/dict/${locale}`).then((m) => m.dict);
  return buildMetadata({
    locale,
    path: "gdpr",
    title: dict.legal.gdprTitle,
    description: dict.legal.gdprSubtitle,
  });
}

export default async function GdprPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDict(locale);

  const lawfulBases = [
    {
      activity: "Processing rental bookings",
      basis: "Article 6(1)(b) — performance of a contract",
      detail: "We need your name, dates, vehicle preference and contact details to fulfil the rental contract.",
    },
    {
      activity: "Storing rental & tax records",
      basis: "Article 6(1)(c) — legal obligation",
      detail: "Greek tax (AADE) and rental-vehicle legislation require us to keep records for the legally mandated retention period.",
    },
    {
      activity: "Replying to enquiries",
      basis: "Article 6(1)(f) — legitimate interest",
      detail: "Operating a responsive customer-service channel is a legitimate interest of the business.",
    },
    {
      activity: "Fraud prevention",
      basis: "Article 6(1)(f) — legitimate interest",
      detail: "We verify documents and credit-card pre-authorisations to prevent rental fraud, weighed against your rights.",
    },
    {
      activity: "Analytics cookies",
      basis: "Article 6(1)(a) — consent",
      detail: "Only set after you click Accept on the cookie banner. Can be withdrawn at any time from cookie settings.",
    },
    {
      activity: "Marketing emails",
      basis: "Article 6(1)(a) — consent",
      detail: "We currently do not send marketing emails. If we ever start, an opt-in checkbox will appear at booking and any email will include an unsubscribe link.",
    },
  ];

  const rights = [
    "Access — request a copy of the personal data we hold about you.",
    "Rectification — ask us to correct inaccurate data.",
    "Erasure — request deletion where we no longer need the data.",
    "Restriction — ask us to pause processing while a dispute is resolved.",
    "Portability — receive your data in a machine-readable format.",
    "Objection — object to processing based on legitimate interest.",
    "Withdraw consent — for any processing where consent is the basis.",
    "Complaint to supervisory authority — Hellenic Data Protection Authority (www.dpa.gr).",
  ];

  return (
    <LegalPageShell
      locale={locale}
      dict={dict}
      slug="gdpr"
      title={dict.legal.gdprTitle}
      subtitle={dict.legal.gdprSubtitle}
    >
      <div className="space-y-10">
        <section>
          <h2 className="text-xl font-extrabold text-[var(--ink)] dark:text-white">Lawful bases for processing</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {lawfulBases.map((b) => (
              <div key={b.activity} className="rounded-2xl border border-border bg-white p-4 dark:bg-white/5">
                <p className="text-sm font-bold text-[var(--ink)] dark:text-white">{b.activity}</p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-[var(--brand-1)]">{b.basis}</p>
                <p className="mt-2 text-sm text-muted-foreground">{b.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-extrabold text-[var(--ink)] dark:text-white">Your rights under GDPR</h2>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {rights.map((r) => (
              <li key={r} className="flex gap-2"><span className="text-[var(--brand-1)]">•</span> {r}</li>
            ))}
          </ul>
        </section>

        <div className="rounded-3xl border border-border bg-[var(--sea-soft)]/40 p-6 text-sm dark:bg-white/5">
          See full {" "}
          <Link className="font-semibold text-[var(--sea)] hover:underline" href={localePath(locale, "privacy")}>{dict.legal.privacyTitle}</Link>{" "}
          and {" "}
          <Link className="font-semibold text-[var(--sea)] hover:underline" href={localePath(locale, "cookies")}>{dict.legal.cookiesTitle}</Link>.
        </div>
      </div>
    </LegalPageShell>
  );
}
