"use client";

import { useMemo, useState } from "react";
import type { Review } from "@/types/content";
import type { Dict } from "@/i18n/types";
import type { Locale } from "@/lib/site";
import { ReviewCard } from "./ReviewCard";

const PAGE_SIZE = 12;

type Order = "newest" | "oldest";
type RatingFilter = "all" | "5" | "critical";

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full border px-3.5 py-1.5 text-xs font-bold transition-colors ${
        active
          ? "border-[var(--sea)] bg-[var(--sea-soft)] text-[var(--link)]"
          : "border-border bg-[var(--pill-bg)] text-muted-foreground hover:border-[var(--sea)]/40 hover:text-[var(--prose-heading)]"
      }`}
    >
      {children}
    </button>
  );
}

export function ReviewsList({
  reviews,
  languages,
  locale,
  dict,
}: {
  /** Pre-sorted newest-first at import time. */
  reviews: Review[];
  languages: string[];
  locale: Locale;
  dict: Dict;
}) {
  const [order, setOrder] = useState<Order>("newest");
  const [rating, setRating] = useState<RatingFilter>("all");
  const [lang, setLang] = useState<string>("all");
  const [visible, setVisible] = useState(PAGE_SIZE);

  // Google serves this profile's reviews already translated, so in practice
  // every review resolves to one language. Offering a one-option filter would
  // be furniture, so it only renders when the data actually varies.
  const showLanguageFilter = languages.length > 1;

  // Plain function, not memoised: Intl.DisplayNames is cheap, it is only called
  // for the handful of chips this renders, and wrapping the try/catch in
  // useMemo defeats the React Compiler's memoisation anyway.
  function languageLabel(code: string) {
    try {
      return new Intl.DisplayNames([locale], { type: "language" }).of(code) ?? code.toUpperCase();
    } catch {
      return code.toUpperCase();
    }
  }

  const filtered = useMemo(() => {
    let list = reviews;
    if (rating === "5") list = list.filter((r) => r.rating === 5);
    else if (rating === "critical") list = list.filter((r) => r.rating <= 3);
    if (showLanguageFilter && lang !== "all") list = list.filter((r) => r.lang === lang);
    // `reviews` arrives newest-first, so oldest is simply the reverse.
    return order === "newest" ? list : [...list].reverse();
  }, [reviews, rating, lang, order, showLanguageFilter]);

  // Any change to the result set restarts paging, otherwise a narrow filter
  // renders an empty grid under a stale "load more".
  function update<T>(setter: (v: T) => void) {
    return (value: T) => {
      setter(value);
      setVisible(PAGE_SIZE);
    };
  }

  const shown = filtered.slice(0, visible);
  const hasCritical = reviews.some((r) => r.rating <= 3);

  return (
    <div>
      <div className="island-card flex flex-col gap-4 rounded-3xl p-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
            {dict.reviews.sortLabel}
          </span>
          <Chip active={order === "newest"} onClick={() => update(setOrder)("newest")}>
            {dict.reviews.sortNewest}
          </Chip>
          <Chip active={order === "oldest"} onClick={() => update(setOrder)("oldest")}>
            {dict.reviews.sortOldest}
          </Chip>
        </div>

        {/* Critical reviews are filterable, not hidden. */}
        {hasCritical && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
              {dict.reviews.filterRating}
            </span>
            <Chip active={rating === "all"} onClick={() => update(setRating)("all")}>
              {dict.reviews.allRatings}
            </Chip>
            <Chip active={rating === "5"} onClick={() => update(setRating)("5")}>
              {dict.reviews.starsOnly}
            </Chip>
            <Chip active={rating === "critical"} onClick={() => update(setRating)("critical")}>
              {dict.reviews.critical}
            </Chip>
          </div>
        )}

        {showLanguageFilter && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
              {dict.reviews.filterLanguage}
            </span>
            <Chip active={lang === "all"} onClick={() => update(setLang)("all")}>
              {dict.reviews.allLanguages}
            </Chip>
            {languages.map((code) => (
              <Chip key={code} active={lang === code} onClick={() => update(setLang)(code)}>
                {languageLabel(code)}
              </Chip>
            ))}
          </div>
        )}

        <p className="text-xs font-semibold text-muted-foreground sm:ml-auto" aria-live="polite">
          {dict.reviews.showingOf
            .replace("{shown}", String(shown.length))
            .replace("{total}", String(filtered.length))}
        </p>
      </div>

      {shown.length === 0 ? (
        <p className="mt-8 text-sm text-muted-foreground">{dict.reviews.noneMatch}</p>
      ) : (
        <div className="mt-6 grid items-start gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((review) => (
            <ReviewCard key={review.reviewId} review={review} locale={locale} dict={dict} />
          ))}
        </div>
      )}

      {visible < filtered.length && (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => setVisible((v) => v + PAGE_SIZE)}
            className="rounded-full border border-border px-6 py-3 text-sm font-bold text-[var(--prose-heading)] transition hover:border-[var(--sea)] hover:text-[var(--link)]"
          >
            {dict.reviews.loadMore}
          </button>
        </div>
      )}
    </div>
  );
}
