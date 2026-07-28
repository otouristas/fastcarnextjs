"use client";

import { useState } from "react";
import { useConsent } from "@/lib/consent";
import type { Dict } from "@/i18n/types";

export function ConsentSettings({ dict }: { dict: Dict }) {
  const { consent, hydrated, setConsent } = useConsent();

  if (!hydrated) return null;

  return (
    <ConsentForm
      key={consent?.ts ?? "no-consent"}
      initialAnalytics={consent?.analytics ?? false}
      initialMarketing={consent?.marketing ?? false}
      save={setConsent}
      label={dict.cookie.accept}
    />
  );
}

function ConsentForm({
  initialAnalytics,
  initialMarketing,
  save,
  label,
}: {
  initialAnalytics: boolean;
  initialMarketing: boolean;
  save: (next: { analytics: boolean; marketing: boolean }) => void;
  label: string;
}) {
  const [analytics, setAnalytics] = useState(initialAnalytics);
  const [marketing, setMarketing] = useState(initialMarketing);
  const [saved, setSaved] = useState(false);

  return (
    <section className="rounded-3xl border border-border bg-background p-6 shadow-sm">
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="flex cursor-pointer items-center justify-between gap-4 rounded-2xl border border-border p-4">
          <span className="font-semibold text-foreground">Analytics</span>
          <input
            type="checkbox"
            checked={analytics}
            onChange={(event) => {
              setAnalytics(event.target.checked);
              setSaved(false);
            }}
            className="h-5 w-5 accent-[var(--sea)]"
          />
        </label>
        <label className="flex cursor-pointer items-center justify-between gap-4 rounded-2xl border border-border p-4">
          <span className="font-semibold text-foreground">Marketing</span>
          <input
            type="checkbox"
            checked={marketing}
            onChange={(event) => {
              setMarketing(event.target.checked);
              setSaved(false);
            }}
            className="h-5 w-5 accent-[var(--sea)]"
          />
        </label>
      </div>
      <button
        type="button"
        onClick={() => {
          save({ analytics, marketing });
          setSaved(true);
        }}
        className="mt-4 min-h-11 rounded-full bg-primary px-6 py-2 text-sm font-bold text-primary-foreground"
      >
        {label}
      </button>
      {saved ? <span role="status" className="ml-3 text-sm text-muted-foreground">✓</span> : null}
    </section>
  );
}
