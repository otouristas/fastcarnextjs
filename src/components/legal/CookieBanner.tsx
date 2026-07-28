"use client";

import Link from "next/link";
import { useConsent } from "@/lib/consent";
import { X, Cookie } from "lucide-react";
import type { Dict } from "@/i18n/types";
import type { Locale } from "@/lib/site";
import { localePath } from "@/lib/site";

export function CookieBanner({ dict, locale }: { dict: Dict; locale: Locale }) {
  const { hydrated, decided, setConsent } = useConsent();

  if (!hydrated || decided) return null;

  function accept() {
    setConsent({ analytics: true, marketing: false });
  }

  function reject() {
    setConsent({ analytics: false, marketing: false });
  }

  return (
    <div
      role="dialog"
      aria-label={dict.cookie.ariaLabel}
      className="fixed inset-x-3 bottom-3 z-[90] rounded-2xl border border-border bg-background/98 p-4 shadow-2xl backdrop-blur-xl sm:inset-x-auto sm:bottom-5 sm:left-5 sm:max-w-md sm:p-5"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2 text-[var(--brand-1)]">
          <Cookie className="h-5 w-5 shrink-0" />
          <p className="text-sm font-bold text-foreground">{dict.cookie.title}</p>
        </div>
        <button
          onClick={reject}
          aria-label={dict.cookie.reject}
          className="rounded-full p-1 text-muted-foreground transition-colors hover:bg-muted"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{dict.cookie.body}</p>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <button
          onClick={accept}
          className="min-h-11 w-full rounded-full bg-primary px-4 py-2 text-xs font-bold text-primary-foreground shadow transition-opacity hover:opacity-90"
        >
          {dict.cookie.accept}
        </button>
        <button
          onClick={reject}
          className="min-h-11 w-full rounded-full border border-border px-4 py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted"
        >
          {dict.cookie.reject}
        </button>
        <Link
          href={localePath(locale, "cookies")}
          className="col-span-2 min-h-9 rounded-full py-2 text-center text-xs text-[var(--sea)] underline-offset-2 hover:underline"
        >
          {dict.cookie.settings}
        </Link>
      </div>
    </div>
  );
}
