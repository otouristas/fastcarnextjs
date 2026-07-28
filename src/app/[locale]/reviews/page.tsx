import { notFound } from "next/navigation";
import Link from "next/link";
import { isLocale, localePath, SITE } from "@/lib/site";
import { getDict } from "@/i18n/dictionaries";
import { buildMetadata } from "@/lib/seo";
import { REVIEWS } from "@/content/reviews";
import { LOCALES } from "@/lib/site";
import { Star } from "lucide-react";

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = await getDict(locale);
  return buildMetadata({
    locale,
    path: "reviews",
    title: dict.reviews.title,
    description: "Customer reviews for Fast Motor Rental Naxos. Read what guests say about renting cars on Naxos.",
  });
}

export default async function ReviewsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDict(locale);

  const totalReviews = REVIEWS.length;
  const avgRating = SITE.rating.value;

  return (
    <>
      {/* Hero */}
      <section className="bg-[#fffaf1] border-b border-border dark:bg-[var(--ink)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 text-center">
          <p className="text-sm uppercase tracking-widest text-[var(--brand-1)]">Google Reviews</p>
          <h1 className="mt-2 text-4xl sm:text-5xl font-extrabold tracking-tight text-[var(--ink)] dark:text-white">
            {dict.reviews.title}
          </h1>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">{dict.reviews.subtitle}</p>

          {/* Rating summary */}
          <div className="mt-8 inline-flex flex-col items-center gap-2 rounded-3xl border border-border bg-white/80 px-8 py-5 shadow-sm dark:bg-white/10">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="h-6 w-6 fill-[var(--brand-1)] text-[var(--brand-1)]" />
              ))}
            </div>
            <p className="text-3xl font-extrabold text-[var(--ink)] dark:text-white">{avgRating} / 5</p>
            <p className="text-sm text-muted-foreground">{totalReviews}+ {dict.reviews.google}</p>
          </div>
        </div>
      </section>

      {/* Reviews grid */}
      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {REVIEWS.map((r) => (
              <figure key={`${r.author}-${r.date}`} className="island-card rounded-3xl p-6 flex flex-col">
                {/* Stars + source */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex">
                    {[...Array(r.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-[var(--brand-1)] text-[var(--brand-1)]" />
                    ))}
                  </div>
                  <span className="rounded-full bg-[var(--sea-soft)] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[var(--sea)] dark:bg-white/10">
                    {r.source}
                  </span>
                </div>

                <blockquote className="flex-1 text-sm text-muted-foreground leading-relaxed">
                  &ldquo;{r.body[locale]}&rdquo;
                </blockquote>

                <figcaption className="mt-4 flex items-center justify-between">
                  <span className="text-sm font-bold text-[var(--ink)] dark:text-white"> -  {r.author}</span>
                  <time className="text-xs text-muted-foreground">
                    {new Date(r.date).toLocaleDateString(locale === "el" ? "el-GR" : locale === "fr" ? "fr-FR" : locale === "de" ? "de-DE" : locale === "it" ? "it-IT" : "en-US", { month: "short", year: "numeric" })}
                  </time>
                </figcaption>
              </figure>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-14 text-center">
            <p className="text-muted-foreground mb-4">Ready to experience it yourself?</p>
            <a
              href={SITE.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-brand-gradient px-8 py-4 text-base font-bold text-white shadow-xl shadow-orange-500/25"
            >
              {dict.nav.bookNow}
            </a>
            <div className="mt-4">
              <Link href={localePath(locale)} className="text-sm text-muted-foreground hover:text-[var(--sea)]">
                ← {dict.nav.home}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
