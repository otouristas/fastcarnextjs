import Link from "next/link";
import { ChevronRight } from "lucide-react";

export interface Crumb { label: string; href?: string }

export function Breadcrumbs({ items, label }: { items: Crumb[]; label: string }) {
  return (
    <nav aria-label={label} className="flex items-center text-sm text-white/60">
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((it, i) => (
          <li key={i} className="flex items-center gap-1">
            {i > 0 && <ChevronRight className="h-3.5 w-3.5 text-white/30" />}
            {it.href ? (
              <Link href={it.href} className="hover:text-white">{it.label}</Link>
            ) : (
              <span className="text-white/80">{it.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
