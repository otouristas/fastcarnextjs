import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { SITEMAP_INDEX_URL } from "@/lib/sitemaps";

/**
 * Answer engines are a first-class traffic source for this site, so their
 * crawlers are named explicitly rather than left to the wildcard group. A named
 * empty-Disallow group is also the only way some of these agents (notably
 * Google-Extended and Applebot-Extended, which are content-usage opt-ins rather
 * than crawlers) register consent at all.
 */
const AI_AGENTS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "Google-Extended",
  "ClaudeBot",
  "Claude-User",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Applebot",
  "Applebot-Extended",
  "Meta-ExternalAgent",
  "meta-externalagent",
  "Amazonbot",
  "Bytespider",
  "cohere-ai",
  "CCBot",
  "DuckAssistBot",
  "MistralAI-User",
  "YouBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/"] },
      ...AI_AGENTS.map((userAgent) => ({ userAgent, allow: "/", disallow: ["/api/"] })),
    ],
    sitemap: SITEMAP_INDEX_URL,
    host: SITE.domain,
  };
}
