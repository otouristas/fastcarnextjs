// Touristas AI Chat Engine  -  intent-matching engine for Naxos rental queries.

import {
  KNOWLEDGE_BASE,
  GREETING_RESPONSE,
  FALLBACK_RESPONSE,
  THANK_YOU_RESPONSE,
  type KnowledgeEntry,
  type VehicleSuggestion,
} from "./touristas-knowledge";
import { whatsappUrl } from "./whatsapp";
import { SITE } from "./site";

export interface ChatResponse {
  text: string;
  vehicles?: VehicleSuggestion[];
  quickReplies?: string[];
}

const GREETING_PATTERNS = [
  "hello", "hi", "hey", "good morning", "good afternoon", "good evening",
  "greetings", "hola", "bonjour", "ciao", "geia", "yassou", "yasas", "howdy",
];

const THANK_PATTERNS = [
  "thank", "thanks", "thx", "cheers", "appreciate", "grateful",
  "perfect", "great", "awesome", "wonderful", "excellent", "amazing", "efcharisto",
];

const QUICK_REPLY_MAP: Record<string, string> = {
  "see all vehicles": "fleet overview cars",
  "see fleet": "fleet overview cars",
  "best for beaches?": "beach vehicles",
  "best vehicle for beaches?": "beach vehicles",
  "best for villages?": "village mountain filoti",
  "which car for filoti?": "filoti mountain village 4x4",
  "do i need a 4×4?": "4x4 needed jeep",
  "do i need a 4x4?": "4x4 needed jeep",
  "book now": "book reserve booking",
  "whatsapp us": "contact whatsapp phone",
  "ask about naxos": "naxos tips driving beaches",
};

function scoreEntry(entry: KnowledgeEntry, words: string[]): number {
  let score = 0;
  const input = words.join(" ");
  for (const kw of entry.keywords) {
    if (words.includes(kw)) score += 3;
    else if (input.includes(kw)) score += 2;
    else if (words.some((w) => w.startsWith(kw) || kw.startsWith(w))) score += 1;
  }
  return score;
}

export function getResponse(userMessage: string): ChatResponse {
  const input = userMessage.toLowerCase().trim();
  const words = input.split(/\s+/).filter(Boolean);

  // Quick reply map
  const quickReplyKey = Object.keys(QUICK_REPLY_MAP).find(
    (key) => input === key || input === key.replace(/[^\w\s]/g, "").trim()
  );
  if (quickReplyKey) {
    return getResponse(QUICK_REPLY_MAP[quickReplyKey]);
  }

  // Greetings
  if (words.length <= 4 && GREETING_PATTERNS.some((g) => words.includes(g) || input.includes(g))) {
    return { text: GREETING_RESPONSE.response, quickReplies: GREETING_RESPONSE.quickReplies };
  }

  // Thanks
  if (THANK_PATTERNS.some((t) => input.includes(t))) {
    return { text: THANK_YOU_RESPONSE.response, quickReplies: THANK_YOU_RESPONSE.quickReplies };
  }

  // WhatsApp direct
  if (input.includes("whatsapp")) {
    return {
      text: `Chat with us instantly on WhatsApp!\n\n[Tap to message us](${whatsappUrl()})\n\nOr call: **${SITE.phones[0]}**`,
      quickReplies: ["Book now", "See fleet", "Prices"],
    };
  }

  // Score all entries
  const scored = KNOWLEDGE_BASE.map((entry) => ({
    entry,
    score: scoreEntry(entry, words),
  }))
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score);

  if (scored.length > 0 && scored[0].score >= 2) {
    const best = scored[0].entry;
    return { text: best.response, vehicles: best.vehicles, quickReplies: best.quickReplies };
  }

  return { text: FALLBACK_RESPONSE.response, quickReplies: FALLBACK_RESPONSE.quickReplies };
}
