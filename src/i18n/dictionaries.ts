import "server-only";
import type { Locale } from "@/lib/site";
import type { Dict } from "./types";

const dictionaries = {
  en: () => import("./dict/en").then((m) => m.dict),
  el: () => import("./dict/el").then((m) => m.dict),
  it: () => import("./dict/it").then((m) => m.dict),
  fr: () => import("./dict/fr").then((m) => m.dict),
  de: () => import("./dict/de").then((m) => m.dict),
};

export type { Dict };

export async function getDict(locale: Locale): Promise<Dict> {
  return dictionaries[locale]();
}
