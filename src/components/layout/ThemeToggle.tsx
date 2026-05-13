"use client";

import { useEffect, useState } from "react";
import { Sun, Moon, MonitorSmartphone } from "lucide-react";

type Mode = "light" | "dark" | "system";

const STORAGE_KEY = "fmr-theme";

function applyMode(mode: Mode) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const isDark = mode === "dark" || (mode === "system" && prefersDark);
  root.classList.toggle("dark", isDark);
  root.style.colorScheme = isDark ? "dark" : "light";
}

function readMode(): Mode {
  if (typeof window === "undefined") return "system";
  const v = window.localStorage.getItem(STORAGE_KEY);
  return v === "light" || v === "dark" || v === "system" ? v : "system";
}

export function ThemeToggle({ labels, className = "" }: {
  labels: { light: string; dark: string; system: string };
  className?: string;
}) {
  const [mode, setMode] = useState<Mode>("system");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMode(readMode());
    setMounted(true);
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      const current = readMode();
      if (current === "system") applyMode("system");
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  function update(next: Mode) {
    setMode(next);
    window.localStorage.setItem(STORAGE_KEY, next);
    applyMode(next);
  }

  function cycle() {
    const next: Mode = mode === "system" ? "light" : mode === "light" ? "dark" : "system";
    update(next);
  }

  const icon = mode === "light" ? <Sun className="h-4 w-4" /> : mode === "dark" ? <Moon className="h-4 w-4" /> : <MonitorSmartphone className="h-4 w-4" />;
  const label = mode === "light" ? labels.light : mode === "dark" ? labels.dark : labels.system;
  const title = mounted ? label : labels.system;

  return (
    <button
      type="button"
      onClick={cycle}
      aria-label={title}
      title={title}
      className={`inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-white/70 text-[var(--ink)] shadow-sm transition-colors hover:border-[var(--sea-2)] hover:bg-white dark:bg-white/10 dark:text-white dark:hover:bg-white/15 ${className}`}
    >
      <span suppressHydrationWarning>{icon}</span>
    </button>
  );
}
