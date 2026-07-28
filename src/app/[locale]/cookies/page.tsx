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
    path: "cookies",
    title: dict.legal.cookiesTitle,
    description: dict.legal.cookiesSubtitle,
  });
}

interface CookieRow {
  name: string;
  purpose: string;
  duration: string;
}

function CookieSection({
  title,
  rows,
  emptyText,
}: {
  title: string;
  rows: CookieRow[];
  emptyText?: string;
}) {
  return (
    <section className="rounded-3xl border border-border bg-white/70 p-6 shadow-sm dark:bg-white/5">
      <h2 className="text-lg font-bold text-[var(--ink)] dark:text-white">{title}</h2>
      {rows.length === 0 ? (
        <p className="mt-3 text-sm text-muted-foreground">{emptyText}</p>
      ) : (
        <div className="mt-4 overflow-hidden rounded-2xl border border-border">
          <table className="w-full text-left text-sm">
            <thead className="bg-[var(--sea-soft)] text-[var(--sea)] dark:bg-[var(--ink-3)] dark:text-[var(--sea-2)]">
              <tr>
                <th className="px-3 py-2 font-bold">Name</th>
                <th className="px-3 py-2 font-bold">Purpose</th>
                <th className="px-3 py-2 font-bold">Duration</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border bg-white dark:bg-white/5">
              {rows.map((row) => (
                <tr key={row.name}>
                  <td className="px-3 py-2 font-mono text-xs text-[var(--ink)] dark:text-white">{row.name}</td>
                  <td className="px-3 py-2 text-muted-foreground">{row.purpose}</td>
                  <td className="px-3 py-2 text-muted-foreground">{row.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default async function CookiesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDict(locale);

  const essential: CookieRow[] = [
    { name: "fmr-consent", purpose: "Stores your cookie consent choices.", duration: "12 months" },
    { name: "fmr-theme", purpose: "Remembers light/dark/system theme preference.", duration: "12 months" },
  ];
  const analytics: CookieRow[] = [
    { name: "_ga, _ga_*", purpose: "Google Analytics 4  -  anonymous page-view stats. Only set after you accept analytics.", duration: "Up to 24 months" },
  ];
  const marketing: CookieRow[] = [];

  return (
    <LegalPageShell
      locale={locale}
      dict={dict}
      slug="cookies"
      title={dict.legal.cookiesTitle}
      subtitle={dict.legal.cookiesSubtitle}
    >
      <div className="space-y-6">
        <CookieSection title="Strictly necessary cookies" rows={essential} />
        <CookieSection title="Analytics cookies" rows={analytics} />
        <CookieSection
          title="Marketing cookies"
          rows={marketing}
          emptyText="We do not currently use marketing cookies. If we ever introduce them, this page will be updated and your consent will be requested."
        />

        <div className="rounded-3xl border border-border bg-[var(--sea-soft)]/40 p-6 text-sm dark:bg-white/5">
          You can change your choices anytime from the cookie banner at the bottom-left of the site. See also{" "}
          <Link className="font-semibold text-[var(--sea)] hover:underline" href={localePath(locale, "privacy")}>{dict.legal.privacyTitle}</Link>{" and "}
          <Link className="font-semibold text-[var(--sea)] hover:underline" href={localePath(locale, "gdpr")}>{dict.legal.gdprTitle}</Link>.
        </div>
      </div>
    </LegalPageShell>
  );
}
