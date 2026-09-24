"use client";
import { usePathname } from "next/navigation";

/** Route attributes let every template share one visual system without changing URLs or editorial content. */
export function RouteSurface({ children }: { children: React.ReactNode }) {
  const parts = usePathname().split("/").filter(Boolean);
  return (
    <main
      id="main"
      className="route-surface flex-1"
      data-section={parts[1] ?? "home"}
      data-depth={Math.max(0, parts.length - 1)}
    >
      {children}
    </main>
  );
}
