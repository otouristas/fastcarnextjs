import { Star } from "lucide-react";

/**
 * Google's own star gold (#FBBC04) rather than a brand token — these represent
 * a Google rating, and recolouring them to match the site reads as our own
 * badge rather than a quotation of theirs.
 */
export function Stars({
  rating,
  className = "h-3.5 w-3.5",
  label,
}: {
  rating: number;
  className?: string;
  label?: string;
}) {
  const filled = Math.round(rating);
  return (
    <div className="flex" role="img" aria-label={label ?? `${rating} / 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`${className} ${
            i <= filled ? "fill-[#FBBC04] text-[#FBBC04]" : "fill-transparent text-[#FBBC04]/35"
          }`}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}
