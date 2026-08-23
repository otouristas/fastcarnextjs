import type { Dict } from "@/i18n/types";
import type { ReviewAggregate } from "@/types/content";
import { ExternalLink } from "lucide-react";
import { GoogleG } from "./GoogleG";
import { Stars } from "./Stars";

/**
 * The Google Business Profile header aggregate, verbatim.
 *
 * `total` is Google's own count and includes ratings left without text, so it
 * is deliberately larger than the number of cards rendered below. Publishing
 * the card count here instead would understate the rating and, worse, put a
 * number in schema.org AggregateRating that nobody can verify on Google.
 */
export function RatingSummary({
  aggregate,
  sourceUrl,
  dict,
  locale,
  updatedAt,
}: {
  aggregate: ReviewAggregate;
  sourceUrl: string;
  dict: Dict;
  locale: string;
  updatedAt: string;
}) {
  const formattedDate = new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(updatedAt));

  return (
    <div className="island-card flex min-w-[240px] items-center gap-4 rounded-3xl px-6 py-4">
      <div className="flex flex-col items-center gap-1">
        <GoogleG className="h-6 w-6" />
        <span className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
          Google
        </span>
      </div>
      <div className="h-12 w-px bg-border" aria-hidden="true" />
      <span className="font-heading text-5xl font-extrabold text-[var(--sea)]">
        {aggregate.rating}
      </span>
      <div>
        <Stars
          rating={aggregate.rating}
          className="h-4 w-4"
          label={`${aggregate.rating} ${dict.reviews.ofFive}`}
        />
        <p className="mt-1 text-xs font-semibold text-muted-foreground">
          {aggregate.total} {dict.reviews.google}
        </p>
        <p className="text-[11px] text-muted-foreground">
          {dict.reviews.updated.replace("{date}", formattedDate)}
        </p>
        <a
          href={sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 inline-flex items-center gap-1 text-xs font-bold text-[var(--link)] hover:underline"
        >
          {dict.reviews.viewOnGoogle}
          <ExternalLink className="h-3 w-3" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
