import type { Review } from "@/types/content";

/** Highest rating first, with the newest review first when ratings match. */
export function highestRatedFirst(a: Review, b: Review): number {
  return b.rating - a.rating || b.date.localeCompare(a.date);
}
