import Link from "next/link";
import type { Faq } from "@/types/content";
import type { Locale } from "@/lib/site";
import { localePath } from "@/lib/site";
import type { Dict } from "@/i18n/types";
import { HelpCircle, ArrowRight } from "lucide-react";

export function ContextualFaq({
  faqs,
  locale,
  dict,
  title,
  subtitle,
  className = "",
}: {
  faqs: Faq[];
  locale: Locale;
  dict: Dict;
  title?: string;
  subtitle?: string;
  className?: string;
}) {
  if (faqs.length === 0) return null;

  return (
    <section className={`wave-bg border-y border-border/70 ${className}`}>
      <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--sea-2)]/30 bg-white/70 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[var(--sea)] shadow-sm dark:bg-white/10 dark:text-[var(--sea-soft)]">
            <HelpCircle className="h-4 w-4" />
            FAQ
          </span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[var(--ink)] dark:text-white sm:text-4xl">
            {title ?? dict.faqTeaser.title}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            {subtitle ?? dict.faqTeaser.subtitle}
          </p>
        </div>

        <div className="mt-8 grid gap-3">
          {faqs.map((f) => (
            <details key={f.slug} className="group island-card rounded-3xl p-5 open:border-[var(--sea-2)]">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left font-semibold text-[var(--ink)] dark:text-white">
                <span>{f.question[locale]}</span>
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[var(--sea-soft)] text-[var(--sea)] transition-transform group-open:rotate-45 dark:bg-white/10 dark:text-white">+</span>
              </summary>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">{f.answer[locale]}</p>
            </details>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link href={localePath(locale, "faq")} className="inline-flex items-center gap-2 rounded-full bg-brand-gradient px-5 py-3 text-sm font-bold text-white shadow-lg shadow-orange-500/20">
            {dict.faqTeaser.cta}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
