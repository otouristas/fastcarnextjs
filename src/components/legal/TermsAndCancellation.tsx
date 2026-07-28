import { TERMS, CANCELLATION } from "@/content/legal";
import type { Locale } from "@/lib/site";
import type { Dict } from "@/i18n/types";

export function TermsAndCancellation({ locale, dict }: { locale: Locale; dict: Dict }) {
  return (
    <div className="space-y-12">
      {/* 14 numbered clauses */}
      <div>
        <ol className="grid gap-4 sm:grid-cols-2">
          {TERMS.map((c) => (
            <li
              key={c.number}
              className="island-card rounded-3xl p-5 transition-colors hover:border-[var(--sea-2)]"
            >
              <div className="flex items-start gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand-gradient text-sm font-bold text-white shadow-md shadow-orange-500/25">
                  {c.number}
                </span>
                <div>
                  <h3 className="text-base font-bold text-[var(--ink)] dark:text-white">{c.title[locale]}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.body[locale]}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/* Cancellation matrix */}
      <div>
        <h2 className="text-2xl font-extrabold tracking-tight text-[var(--ink)] dark:text-white">
          {dict.legal.cancellationTitle}
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{CANCELLATION.deposit[locale]}</p>
        <p className="mt-1 max-w-2xl text-sm text-muted-foreground">{CANCELLATION.charge[locale]}</p>

        <div className="mt-6 overflow-hidden rounded-3xl border border-border">
          <table className="w-full text-left text-sm">
            <thead className="bg-[var(--sea-soft)] text-[var(--sea)] dark:bg-[var(--ink-3)] dark:text-[var(--sea-2)]">
              <tr>
                <th className="px-4 py-3 font-bold">{dict.common.from}</th>
                <th className="px-4 py-3 font-bold">{dict.common.seeDetails}</th>
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
      </div>
    </div>
  );
}
