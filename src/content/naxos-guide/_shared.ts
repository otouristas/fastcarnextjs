import type { LocalizedString } from "@/types/content";

/**
 * Locale helper shared by every guide article file. English is required; the
 * other four fall back to English so a half-translated article renders rather
 * than crashing, which is what the `?? en` in the original guides.ts did.
 */
export const ls = (
  en: string,
  el?: string,
  it?: string,
  fr?: string,
  de?: string,
): LocalizedString => ({
  en,
  el: el ?? en,
  it: it ?? en,
  fr: fr ?? en,
  de: de ?? en,
});
