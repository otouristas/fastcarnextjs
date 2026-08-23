import { REVIEWS } from "./reviews";
import type { Review } from "@/types/content";

/**
 * Real reviews that name a specific vehicle, mapped to that vehicle's page.
 *
 * Curated by hand from the harvested corpus, not matched at runtime: a keyword
 * search would attach "we rented Aygo & i10" to both cars and "the 500" to
 * anything containing a number. Each entry is a review that unambiguously names
 * the model and is about the car rather than the handover.
 *
 * Matched on a distinctive phrase rather than on Google's review id, because
 * ids are opaque base64 that nobody can verify in review and that a re-harvest
 * can rotate; the sentence a person wrote is stable and self-documenting.
 *
 * Only three of the twelve vehicles are named anywhere in 185 reviews. The
 * other nine render no quote, which is the correct outcome — the alternative is
 * putting words about one car under a photo of another.
 */
const QUOTE_MARKERS: Record<string, RegExp> = {
  "hyundai-i10": /We booked the Hyundai i10 \(automatic\)/i,
  "toyota-aygo": /Toyota AYGo was brand new and in excellent condition/i,
  "fiat-panda": /Perfect car \(fiat panda\)/i,
};

export interface VehicleReview {
  review: Review;
  vehicleSlug: string;
}

const BY_SLUG: Record<string, VehicleReview> = {};
for (const [slug, marker] of Object.entries(QUOTE_MARKERS)) {
  const review = REVIEWS.find((r) => marker.test(r.text));
  // Silently skipped when a re-harvest drops the review: a vehicle with no
  // quote renders no quote, exactly like the other nine.
  if (review) BY_SLUG[slug] = { review, vehicleSlug: slug };
}

/** The curated quote for a vehicle, or undefined when none was named. */
export function reviewForVehicle(slug: string): VehicleReview | undefined {
  return BY_SLUG[slug];
}

/**
 * Trim a long review to the sentence that names the car, for the fleet card.
 * Returns the full text when it is already short enough.
 */
export function quoteFor(review: Review, marker: RegExp, maxLength = 180): string {
  const sentences = review.text.split(/(?<=[.!?])\s+/);
  const named = sentences.find((s) => marker.test(s));
  const candidate = named ?? review.text;
  return candidate.length <= maxLength ? candidate.trim() : `${candidate.slice(0, maxLength - 1).trimEnd()}…`;
}

export { QUOTE_MARKERS };
