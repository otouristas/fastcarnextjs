// Lightweight cookie-consent storage & hook.
// We use localStorage (not a cookie) for the consent record itself  -  the consent record
// is essential and does not require its own consent. Analytics/marketing scripts must
// gate themselves behind `consent.analytics === true` / `consent.marketing === true`.

"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";

export type Consent = {
  essential: true;
  analytics: boolean;
  marketing: boolean;
  ts: number; // epoch ms
};

const STORAGE_KEY = "fmr-consent";
const EVENT = "fmr-consent-change";
const SERVER_SNAPSHOT = "__fmr_server__";
const EMPTY_SNAPSHOT = "__fmr_empty__";

function getSnapshot(): string {
  if (typeof window === "undefined") return SERVER_SNAPSHOT;
  try {
    return window.localStorage.getItem(STORAGE_KEY) ?? EMPTY_SNAPSHOT;
  } catch {
    return EMPTY_SNAPSHOT;
  }
}

function getServerSnapshot(): string {
  return SERVER_SNAPSHOT;
}

function subscribe(onStoreChange: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  const onChange = () => onStoreChange();
  window.addEventListener(EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

function parseConsent(raw: string): Consent | null {
  if (raw === SERVER_SNAPSHOT || raw === EMPTY_SNAPSHOT) return null;
  try {
    const parsed = JSON.parse(raw);
    if (typeof parsed?.ts === "number" && typeof parsed?.analytics === "boolean") {
      return {
        essential: true,
        analytics: Boolean(parsed.analytics),
        marketing: Boolean(parsed.marketing),
        ts: parsed.ts,
      };
    }
  } catch {
    // Treat invalid persisted data as no consent decision.
  }
  return null;
}

export function readConsent(): Consent | null {
  return parseConsent(getSnapshot());
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
  try {
    window.localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new CustomEvent(EVENT));
  } catch {
    /* ignore */
  }
}

export function useConsent(): {
  consent: Consent | null;
  hydrated: boolean;
  decided: boolean;
  setConsent: (next: Omit<Consent, "essential" | "ts">) => void;
  reset: () => void;
} {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const consent = useMemo(() => parseConsent(snapshot), [snapshot]);
  const hydrated = snapshot !== SERVER_SNAPSHOT;

  const setConsent = useCallback((next: Omit<Consent, "essential" | "ts">) => {
    writeConsent(next);
  }, []);

  const reset = useCallback(() => {
    clearConsent();
  }, []);

  return { consent, hydrated, decided: hydrated && consent !== null, setConsent, reset };
}
