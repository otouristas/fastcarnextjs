"use client";

import { useState } from "react";
import type { Review } from "@/types/content";
import type { Dict } from "@/i18n/types";
import type { Locale } from "@/lib/site";
import { GoogleG } from "./GoogleG";
import { Stars } from "./Stars";

/**
 * Avatar colours. Chosen by hashing the author name rather than at random, so
 * the same reviewer keeps the same colour between renders — a random pick would
 * differ between the server and the client and hydrate mismatched.
 */
/**
 * Google's darker brand shades, not the primary ones: white on #4285F4,
 * #EA4335 and #34A853 measures 3.6:1, 3.9:1 and 3.1:1, and 14px bold initials
 * are not "large text", so all three fail WCAG AA. The 800-weight variants
 * clear 5:1. Fixed hexes rather than theme tokens because the disc keeps its
 * colour in both themes — var(--sea) turns bright cyan at night and would drop
 * white text to 2.2:1.
 */
const AVATAR_COLORS = [
  "bg-[#1967D2] text-white",
  "bg-[#C5221F] text-white",
  "bg-[#FBBC05] text-[#071b2a]",
  "bg-[#137333] text-white",
  "bg-[#0A6C8A] text-white",
  "bg-[#1B4A63] text-white",
] as const;

function hashName(name: string) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  const first = [...parts[0]][0] ?? "";
  const last = parts.length > 1 ? ([...parts[parts.length - 1]][0] ?? "") : "";
  return (first + last).toUpperCase();
}

const CLAMP_AT = 280;

export function ReviewCard({
  review,
  locale,
  dict,
  expandable = true,
}: {
  review: Review;
  locale: Locale;
  dict: Dict;
  expandable?: boolean;
}) {
  const [expanded, setExpanded] = useState(false);
  const long = review.text.length > CLAMP_AT;
  const showToggle = expandable && long;
  const color = AVATAR_COLORS[hashName(review.author) % AVATAR_COLORS.length];

  const formattedDate = new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(review.date));

  return (
    <article className="island-card flex flex-col rounded-3xl p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <span
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold ${color}`}
            aria-hidden="true"
          >
            {initials(review.author)}
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-[var(--prose-heading)]">{review.author}</p>
            <time className="text-[11px] text-muted-foreground" dateTime={review.date}>
              {formattedDate}
            </time>
          </div>
        </div>
        <span
          className="inline-flex shrink-0 items-center gap-1 rounded-full border border-border bg-[var(--pill-bg)] px-2 py-1"
          title={dict.reviews.verified}
        >
          <GoogleG className="h-3.5 w-3.5" />
          <span className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
            Google
          </span>
        </span>
      </div>

      <div className="mt-3">
        <Stars rating={review.rating} label={`${review.rating} ${dict.reviews.ofFive}`} />
      </div>

      <blockquote
        className={`mt-3 flex-1 whitespace-pre-line text-sm leading-relaxed text-[var(--prose-body)] ${
          showToggle && !expanded ? "line-clamp-6" : ""
        }`}
      >
        {review.text}
      </blockquote>

      {showToggle && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-2 self-start text-xs font-bold text-[var(--link)] hover:underline"
        >
          {expanded ? dict.reviews.readLess : dict.reviews.readMore}
        </button>
      )}
    </article>
  );
}
