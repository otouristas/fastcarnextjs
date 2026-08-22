import { DISCOVER_LABELS, discoverCycladesHome, getArticleDiscoverLinks } from "@/lib/discover-cyclades";
import type { Locale } from "@/lib/site";
import { ArrowUpRight, Compass } from "lucide-react";

/**
 * Contextual Discover Cyclades rail, rendered on every island-guide article.
 * Colours come from tokens so the panel is correct in both themes without a
 * dark-mode-only override.
 */
export function DiscoverCycladesBox({ locale, slug }: { locale: Locale; slug: string }) {
  const links = getArticleDiscoverLinks(locale, slug);

  return (
    <aside className="island-card mt-12 overflow-hidden rounded-3xl p-6 md:p-8">
      <div className="flex flex-wrap items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[var(--sea-soft)] text-[var(--sea)]">
          <Compass className="h-5 w-5" />
        </span>
        <a
          href={discoverCycladesHome(locale)}
          target="_blank"
          rel="noopener noreferrer"
          className="group"
        >
          <span className="block text-sm font-bold text-[var(--ink)] group-hover:text-[var(--sea)] dark:text-white">
            Discover Cyclades
          </span>
          <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Travel partner
          </span>
        </a>
      </div>

      <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
        Planning the rest of the trip? Our partner Discover Cyclades covers ferries,
        hotels and island-hopping across all 24 Cyclades islands.
      </p>

      <ul className="mt-5 flex flex-wrap gap-2">
        {links.map((link) => (
          <li key={link.labelKey}>
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/60 px-3.5 py-2 text-xs font-semibold text-[var(--ink)] transition hover:border-[var(--sea)] hover:text-[var(--sea)] dark:text-white dark:hover:text-[var(--sea-2)]"
            >
              {DISCOVER_LABELS[link.labelKey]}
              <ArrowUpRight className="h-3 w-3" />
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
