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
    setConsent({ analytics: true, marketing: true });
  }

  function reject() {
    setConsent({ analytics: false, marketing: false });
  }

  return (
    <div
      role="dialog"
      aria-label={dict.cookie.ariaLabel}
      className="fixed bottom-4 left-4 z-50 max-w-sm rounded-2xl border border-border/60 bg-background/95 p-5 shadow-xl backdrop-blur-md"
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
      <div className="mt-4 flex flex-col gap-2">
        <button
          onClick={accept}
          className="w-full rounded-full bg-[var(--brand-1)] px-4 py-2 text-xs font-bold text-white shadow transition-opacity hover:opacity-90"
        >
          {dict.cookie.accept}
        </button>
        <button
          onClick={reject}
          className="w-full rounded-full border border-border px-4 py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted"
        >
          {dict.cookie.reject}
        </button>
        <Link
          href={localePath(locale, "cookies")}
          className="text-center text-xs text-[var(--sea)] underline-offset-2 hover:underline"
        >
          {dict.cookie.settings}
        </Link>
      </div>
    </div>
  );
}
