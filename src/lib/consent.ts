// Lightweight cookie-consent storage & hook.
// We use localStorage (not a cookie) for the consent record itself — the consent record
// is essential and does not require its own consent. Analytics/marketing scripts must
// gate themselves behind `consent.analytics === true` / `consent.marketing === true`.

"use client";

import { useEffect, useState, useCallback } from "react";

export type Consent = {
  essential: true;
  analytics: boolean;
  marketing: boolean;
  ts: number; // epoch ms
};

const STORAGE_KEY = "fmr-consent";
const EVENT = "fmr-consent-change";

export function readConsent(): Consent | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (typeof parsed?.ts === "number" && typeof parsed?.analytics === "boolean") {
      return { essential: true, analytics: !!parsed.analytics, marketing: !!parsed.marketing, ts: parsed.ts };
    }
    return null;
  } catch {
    return null;
  }
}

export function writeConsent(partial: Omit<Consent, "essential" | "ts">) {
  if (typeof window === "undefined") return;
  const next: Consent = { essential: true, analytics: partial.analytics, marketing: partial.marketing, ts: Date.now() };
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    window.dispatchEvent(new CustomEvent<Consent>(EVENT, { detail: next }));
  } catch {
    /* ignore */
  }
}

export function clearConsent() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new CustomEvent(EVENT));
}

export function useConsent(): {
  consent: Consent | null;
  decided: boolean;
  setConsent: (next: Omit<Consent, "essential" | "ts">) => void;
  reset: () => void;
} {
  const [consent, setConsentState] = useState<Consent | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setConsentState(readConsent());
    setHydrated(true);
    const onChange = () => setConsentState(readConsent());
    window.addEventListener(EVENT, onChange);
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener(EVENT, onChange);
      window.removeEventListener("storage", onChange);
    };
  }, []);

  const setConsent = useCallback((next: Omit<Consent, "essential" | "ts">) => {
    writeConsent(next);
  }, []);

  const reset = useCallback(() => {
    clearConsent();
  }, []);

  return { consent, decided: hydrated && consent !== null, setConsent, reset };
}
