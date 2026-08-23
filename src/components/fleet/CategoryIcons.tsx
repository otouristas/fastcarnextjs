/**
 * Single-stroke category glyphs, drawn to sit alongside lucide at the same
 * weight (24×24, strokeWidth 1.8, round caps). Only shapes lucide has no good
 * equivalent for live here — everything else in the nav uses lucide directly.
 */
export function ScooterIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="5.5" cy="17.5" r="2.5" />
      <circle cx="18.5" cy="17.5" r="2.5" />
      <path d="M8 17.5h8" />
      <path d="M16.5 17.5 14 9h-3" />
      <path d="M14 9h3.5l1.5 8.5" />
      <path d="M11 9 8.5 13H6a2.5 2.5 0 0 0-.5 4.5" />
      <path d="M15 5h2.5" />
    </svg>
  );
}
