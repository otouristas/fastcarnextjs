import type { Review, ReviewAggregate } from "@/types/content";
import dataset from "./reviews-google.json";

/**
 * Real Google reviews for Fast Motor Rental Naxos.
 *
 * This file used to hold 12 hand-transcribed reviews, the newest from 2023,
 * several carrying invented Greek "translations" of words an English-speaking
 * reviewer wrote. It is now generated from the live Business Profile:
 *
 *   node scripts/scrape-google-reviews.mjs
 *   node scripts/import-reviews.mjs
 *
 * Two different numbers, deliberately kept apart:
 *  - REVIEW_AGGREGATE is the Google header (4.9 from 222). It counts ratings
 *    left without text and is the ONLY figure schema.org AggregateRating may
 *    publish, because it is the one a reader can verify on Google.
 *  - REVIEWS is the subset carrying readable text — what the page can render.
 */
export const REVIEW_AGGREGATE: ReviewAggregate = dataset.aggregate;

/** Newest first. Ordering is fixed at import time so SSR and client agree. */
export const REVIEWS: Review[] = dataset.reviews as Review[];

/** Link to the profile these came from, for the "See on Google" affordance. */
export const REVIEWS_SOURCE_URL = `https://www.google.com/maps?cid=${dataset.cid}`;

/** Date of the last successful harvest, shown as a freshness label. */
export const REVIEWS_UPDATED_AT = dataset.scrapedAt.slice(0, 10);

/** Languages actually present, so the UI only offers a filter that means something. */
export const REVIEW_LANGUAGES: string[] = [...new Set(REVIEWS.map((r) => r.lang))].sort();

/** Rating buckets present, newest-first order preserved within each. */
export function reviewsWithRating(rating: number): Review[] {
  return REVIEWS.filter((r) => r.rating === rating);
}
