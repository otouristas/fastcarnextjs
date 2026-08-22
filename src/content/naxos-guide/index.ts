import type { NaxosGuideArticle } from "@/types/content";
import { PLAN_ARTICLES } from "./plan";
import { PLAN_EXTRA_ARTICLES } from "./plan-extra";
import { EXPLORE_ARTICLES } from "./explore";
import { ARRIVE_ARTICLES } from "./arrive";
import { EAT_STAY_ARTICLES } from "./eat-stay";

/**
 * The /naxos island guide corpus.
 *
 * Ordered by cluster so the hub renders in a sensible reading order: plan the
 * trip, explore the island, arrive, then eat and sleep.
 */
export const NAXOS_GUIDE_ARTICLES: NaxosGuideArticle[] = [
  ...PLAN_ARTICLES,
  ...PLAN_EXTRA_ARTICLES,
  ...EXPLORE_ARTICLES,
  ...ARRIVE_ARTICLES,
  ...EAT_STAY_ARTICLES,
];

export const NAXOS_GUIDE_BY_SLUG: Record<string, NaxosGuideArticle> =
  Object.fromEntries(NAXOS_GUIDE_ARTICLES.map((a) => [a.slug, a]));

export const NAXOS_GUIDE_CLUSTERS = ["plan", "explore", "arrive", "eat-stay"] as const;

export function articlesInCluster(cluster: NaxosGuideArticle["cluster"]) {
  return NAXOS_GUIDE_ARTICLES.filter((a) => a.cluster === cluster);
}

export function relatedArticles(slug: string, limit = 3): NaxosGuideArticle[] {
  const article = NAXOS_GUIDE_BY_SLUG[slug];
  if (!article) return [];
  const explicit = article.related
    .map((s) => NAXOS_GUIDE_BY_SLUG[s])
    .filter((a): a is NaxosGuideArticle => Boolean(a) && a.slug !== slug);
  if (explicit.length >= limit) return explicit.slice(0, limit);

  // Backfill from the same cluster so a thin `related` list never leaves the
  // rail empty — an orphaned article breaks seo-os Law 4.
  const seen = new Set([slug, ...explicit.map((a) => a.slug)]);
  const backfill = articlesInCluster(article.cluster).filter((a) => !seen.has(a.slug));
  return [...explicit, ...backfill].slice(0, limit);
}
