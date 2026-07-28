import { notFound } from "next/navigation";
import Link from "next/link";
import { isLocale, localePath, SITE } from "@/lib/site";
import { getDict } from "@/i18n/dictionaries";
import { buildMetadata } from "@/lib/seo";
import { LOCALES } from "@/lib/site";

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = await getDict(locale);
  return {
    ...buildMetadata({
      locale,
      path: "reviews",
      title: dict.reviews.title,
      description: "Fast Motor Rental Naxos review information.",
    }),
    robots: { index: false, follow: true },
  };
}

export default async function ReviewsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDict(locale);

  return (
    <>
      <section className="bg-[#fffaf1] border-b border-border dark:bg-[var(--ink)]">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <h1 className="mt-2 text-4xl sm:text-5xl font-extrabold tracking-tight text-[var(--ink)] dark:text-white">
            {dict.reviews.title}
          </h1>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">{dict.reviews.subtitle}</p>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <div className="island-card rounded-3xl p-8">
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
