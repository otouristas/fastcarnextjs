import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { isLocale, localePath, SITE } from "@/lib/site";
import { getDict } from "@/i18n/dictionaries";
import { buildMetadata } from "@/lib/seo";
import { LegalPageShell } from "@/components/legal/LegalPageShell";
import { CANCELLATION } from "@/content/legal";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = await import(`@/i18n/dict/${locale}`).then((m) => m.dict);
  return buildMetadata({
    locale,
    path: "cancellation",
    title: dict.legal.cancellationTitle,
    description: dict.legal.cancellationSubtitle,
  });
}

export default async function CancellationPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDict(locale);

  return (
    <LegalPageShell
      locale={locale}
      dict={dict}
      slug="cancellation"
      title={dict.legal.cancellationTitle}
      subtitle={dict.legal.cancellationSubtitle}
    >
      <div className="space-y-10">
        <div className="island-card rounded-3xl p-6">
          <h2 className="text-xl font-extrabold text-[var(--ink)] dark:text-white">{CANCELLATION.deposit[locale]}</h2>
          <p className="mt-2 text-sm text-muted-foreground">{CANCELLATION.charge[locale]}</p>
        </div>

        <div className="overflow-hidden rounded-3xl border border-border">
          <table className="w-full text-left text-sm">
            <thead className="bg-[var(--sea-soft)] text-[var(--sea)] dark:bg-[var(--ink-3)] dark:text-[var(--brand-1)]">
              <tr>
                <th className="px-4 py-3 font-bold">Window</th>
                <th className="px-4 py-3 font-bold">Refund</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border bg-white dark:bg-white/5">
              {CANCELLATION.tiers.map((t) => (
                <tr key={t.window.en}>
                  <td className="px-4 py-3 font-semibold text-[var(--ink)] dark:text-white">{t.window[locale]}</td>
                  <td className="px-4 py-3 text-muted-foreground">{t.outcome[locale]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="rounded-3xl border border-border bg-[var(--sea-soft)]/40 p-6 text-sm dark:bg-white/5">
          <p className="text-[var(--ink)] dark:text-white">
            Read the full {" "}
            <Link className="font-semibold text-[var(--sea)] hover:underline" href={localePath(locale, "terms")}>
              {dict.legal.termsTitle}
            </Link>
            . Questions? {" "}
            <a className="font-semibold text-[var(--sea)] hover:underline" href={`mailto:${SITE.email}`}>
              {SITE.email}
            </a>
          </p>
        </div>
      </div>
    </LegalPageShell>
  );
}
