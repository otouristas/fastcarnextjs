import { notFound } from "next/navigation";
import Link from "next/link";
import { isLocale, localePath, SITE } from "@/lib/site";
import { getDict } from "@/i18n/dictionaries";
import { seoFor } from "@/lib/seo";
import { LegalPageShell } from "@/components/legal/LegalPageShell";
import { TermsAndCancellation } from "@/components/legal/TermsAndCancellation";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return seoFor("terms", locale, "terms");
}

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDict(locale);

  return (
    <LegalPageShell
      locale={locale}
      dict={dict}
      slug="terms"
      title={dict.legal.termsTitle}
      subtitle={dict.legal.termsSubtitle}
    >
      <TermsAndCancellation locale={locale} dict={dict} />

      <div className="mt-12 rounded-3xl border border-border bg-[var(--sea-soft)]/40 p-6 text-sm text-[var(--ink)] dark:bg-white/5 dark:text-white">
        <p>
          {dict.contact.subtitle} —{" "}
          <a className="font-semibold text-[var(--sea)] hover:underline" href={`mailto:${SITE.email}`}>
            {SITE.email}
          </a>{" "}
          ·{" "}
          <Link className="font-semibold text-[var(--sea)] hover:underline" href={localePath(locale, "privacy")}>
            {dict.legal.privacyTitle}
          </Link>{" "}
          ·{" "}
          <Link className="font-semibold text-[var(--sea)] hover:underline" href={localePath(locale, "cookies")}>
            {dict.legal.cookiesTitle}
          </Link>
        </p>
      </div>
    </LegalPageShell>
  );
}
