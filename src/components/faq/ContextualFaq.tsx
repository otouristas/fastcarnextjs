import Link from "next/link";
import type { Faq } from "@/types/content";
import { localePath, type Locale } from "@/lib/site";
import type { Dict } from "@/i18n/types";
import { ArrowUpRight } from "lucide-react";

export function ContextualFaq({
  faqs,
  locale,
  dict,
  title,
  subtitle,
  className = "",
}: {
  faqs: Faq[];
  locale: Locale;
  dict: Dict;
  title?: string;
  subtitle?: string;
  className?: string;
}) {
  if (!faqs.length) return null;
  return (
    <section className={`editorial-faq ${className}`}>
      <div className="escape-wrap editorial-faq-grid">
        <div className="editorial-faq-heading">
          <span className="eyebrow">{dict.nav.faq}</span>
          <h2>{title ?? dict.faqTeaser.title}</h2>
          <p>{subtitle ?? dict.faqTeaser.subtitle}</p>
          <Link href={localePath(locale, "faq")} className="escape-text-link">
            {dict.faqTeaser.cta}
            <ArrowUpRight size={18} />
          </Link>
        </div>
        <div className="editorial-faq-items">
          {faqs.map((f) => (
            <details key={f.slug}>
              <summary>
                <span>{f.question[locale]}</span>
                <span aria-hidden="true">+</span>
              </summary>
              <p>{f.answer[locale]}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
