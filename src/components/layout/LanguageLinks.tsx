"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LOCALES,
  LOCALE_META,
  swapLocalePath,
  type Locale,
} from "@/lib/site";

export function LanguageLinks({ locale }: { locale: Locale }) {
  const pathname = usePathname();

  return (
    <>
      {LOCALES.map((targetLocale) => (
        <Link
          key={targetLocale}
          href={swapLocalePath(pathname, targetLocale)}
          hrefLang={LOCALE_META[targetLocale].htmlLang}
          data-analytics-event="language_switch"
          className={`rounded-full px-2 py-1 uppercase tracking-wider ${
            targetLocale === locale
              ? "bg-brand-gradient text-white"
              : "border border-border bg-white/60 text-muted-foreground hover:text-[var(--ink)] dark:border-white/10 dark:bg-white/10 dark:hover:text-white"
          }`}
        >
          {LOCALE_META[targetLocale].flag} {targetLocale}
        </Link>
      ))}
    </>
  );
}
