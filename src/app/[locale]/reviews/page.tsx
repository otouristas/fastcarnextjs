import { notFound } from "next/navigation";
import Link from "next/link";
import { isLocale, localePath, LOCALES, SITE } from "@/lib/site";
import { getDict } from "@/i18n/dictionaries";
import { buildMetadata } from "@/lib/seo";
import {
  REVIEWS,
  REVIEW_AGGREGATE,
  REVIEW_LANGUAGES,
  REVIEWS_SOURCE_URL,
  REVIEWS_UPDATED_AT,
} from "@/content/reviews";
import { RatingSummary } from "@/components/reviews/RatingSummary";
import { ReviewsList } from "@/components/reviews/ReviewsList";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, graph } from "@/lib/schema";
import { ArrowRight } from "lucide-react";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = await getDict(locale);
  return buildMetadata({
    locale,
    path: "reviews",
    title: dict.reviews.title,
    description: `${REVIEW_AGGREGATE.total} verified Google reviews for Fast Motor Rental Naxos, rated ${REVIEW_AGGREGATE.rating} out of 5. Read what guests say about renting a car on Naxos.`,
  });
}

export default async function ReviewsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDict(locale);

  return (
    <>
      {/* No Review or AggregateRating node here.
          The aggregate already ships on the business entity in the root layout
          (localBusinessSchema), and repeating it on a page whose only purpose is
          to display our own rating is exactly the self-serving markup Google
          disallows. The reviews below are real, attributable and visible — the
          proof is the link to the Google profile, not a second schema block. */}
      <JsonLd
        data={graph([
          breadcrumbSchema([
            { name: dict.nav.home, url: `${SITE.domain}${localePath(locale)}` },
            { name: dict.reviews.title, url: `${SITE.domain}${localePath(locale, "reviews")}` },
          ]),
        ])}
      />

      <section className="wave-bg border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <Breadcrumbs
            label={dict.common.breadcrumb}
            items={[{ label: dict.nav.home, href: localePath(locale) }, { label: dict.reviews.title }]}
          />
          <div className="mt-4 flex flex-wrap items-end justify-between gap-6">
            <div>
              <h1 className="max-w-3xl font-heading text-4xl font-extrabold tracking-tight text-[var(--prose-heading)] md:text-5xl">
                {dict.reviews.title}
              </h1>
              <p className="mt-3 max-w-2xl text-muted-foreground">{dict.reviews.subtitle}</p>
            </div>
            <RatingSummary
              aggregate={REVIEW_AGGREGATE}
              sourceUrl={REVIEWS_SOURCE_URL}
              dict={dict}
              locale={locale}
              updatedAt={REVIEWS_UPDATED_AT}
            />
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <ReviewsList
            reviews={REVIEWS}
            languages={REVIEW_LANGUAGES}
            locale={locale}
            dict={dict}
          />

          <div className="mt-12 flex flex-wrap gap-3 border-t border-border pt-8">
            <a
              href={REVIEWS_SOURCE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-bold text-[var(--prose-heading)] transition hover:border-[var(--sea)] hover:text-[var(--link)]"
            >
              {dict.reviews.writeReview}
            </a>
            <Link
              href={localePath(locale, "fleet/cars")}
              className="inline-flex items-center gap-2 rounded-full bg-brand-gradient px-6 py-3 text-sm font-bold text-white transition hover:brightness-110"
            >
              {dict.cta.seeFleet} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
