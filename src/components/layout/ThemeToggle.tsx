"use client";

import { useSyncExternalStore } from "react";
import { Sun, Moon } from "lucide-react";

type Mode = "light" | "dark";
let fallbackMode: Mode = "light";

const STORAGE_KEY = "fmr-theme";
const THEME_CHANGE_EVENT = "fmr-theme-change";

function applyMode(mode: Mode) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  const isDark = mode === "dark";
  root.classList.toggle("dark", isDark);
  root.style.colorScheme = isDark ? "dark" : "light";
}

function readMode(): Mode {
  if (typeof window === "undefined") return "light";
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "dark" ? "dark" : "light";
  } catch {
    return fallbackMode;
  }
}

function subscribeToMode(onStoreChange: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY || event.key === null) {
      applyMode(readMode());
      onStoreChange();
    }
  };

  window.addEventListener("storage", onStorage);
  window.addEventListener(THEME_CHANGE_EVENT, onStoreChange);

  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(THEME_CHANGE_EVENT, onStoreChange);
  };
}

function getServerMode(): Mode {
  return "light";
}

export function ThemeToggle({ labels, className = "" }: {
  labels: { light: string; dark: string };
  className?: string;
}) {
  const mode = useSyncExternalStore(subscribeToMode, readMode, getServerMode);

  function update(next: Mode) {
    fallbackMode = next;
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // The controls still work when browser storage is unavailable.
    }
    applyMode(next);
    window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
  }

  return (
    <div className={`theme-switch ${className}`}>
      <button type="button" onClick={() => update("light")} aria-label={labels.light} title={labels.light} aria-pressed={mode === "light"}>
        <Sun size={18} aria-hidden="true" />
      </button>
      <button type="button" onClick={() => update("dark")} aria-label={labels.dark} title={labels.dark} aria-pressed={mode === "dark"}>
        <Moon size={18} aria-hidden="true" />
      </button>
    </div>
  );
}
