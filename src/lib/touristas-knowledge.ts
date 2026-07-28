// The assistant is disabled while its operational answers await owner approval.
// Keep this module claim-free so a future re-enable cannot expose stale inventory,
// pricing, policy, delivery, or legal information.

import { SITE } from "./site";

export interface VehicleSuggestion {
  name: string;
  category: string;
  priceRange: string;
  features: string[];
  link: string;
}

export interface KnowledgeEntry {
  id: string;
  keywords: string[];
  title: string;
  response: string;
  vehicles?: VehicleSuggestion[];
  quickReplies?: string[];
}

export const FLEET_SUGGESTIONS: VehicleSuggestion[] = [];

const SAFE_RESPONSE =
  `Please use the live booking engine for current availability and terms: ${SITE.bookingUrl}`;

export const WELCOME_MESSAGE = {
  response: SAFE_RESPONSE,
  quickReplies: ["Book now"],
};

export const GREETING_RESPONSE = WELCOME_MESSAGE;
export const THANK_YOU_RESPONSE = WELCOME_MESSAGE;
export const FALLBACK_RESPONSE = WELCOME_MESSAGE;
export const KNOWLEDGE_BASE: KnowledgeEntry[] = [];
