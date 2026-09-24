import { PHOTO_CREDITS } from "@/content/photo-credits";
import type { Locale } from "@/lib/site";
export function PhotoCredit({
  image,
  locale,
  className = "",
}: {
  image: string;
  locale: Locale;
  className?: string;
}) {
  const credit = PHOTO_CREDITS[image];
  if (!credit) return null;
  const label = {
    en: "Photo",
    el: "Φωτογραφία",
    it: "Foto",
    fr: "Photo",
    de: "Foto",
  }[locale];
  return (
    <a
      className={`photo-credit ${className}`}
      href={credit.url}
      target="_blank"
      rel="noopener noreferrer"
    >
      {label}: {credit.photographer} / Pexels ↗
    </a>
  );
}
