import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { isLocale, LOCALES, localePath, SITE, type Locale } from "@/lib/site";
import { getDict } from "@/i18n/dictionaries";
import { buildMetadata } from "@/lib/seo";
import {
  NAXOS_GUIDE_ARTICLES,
  NAXOS_GUIDE_BY_SLUG,
  relatedArticles,
} from "@/content/naxos-guide";
import { VEHICLES } from "@/content/fleet";
import { LOCATIONS_BY_SLUG } from "@/content/locations";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { DiscoverCycladesBox } from "@/components/guide/DiscoverCycladesBox";
import { VehicleCard } from "@/components/fleet/VehicleCard";
import {
  articleSchema,
  breadcrumbSchema,
  graph,
  itemListSchema,
  qaPageSchema,
} from "@/lib/schema";
import { whatsappUrl } from "@/lib/whatsapp";
import { ArrowRight, Clock, MapPin, Sparkles } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

export function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of LOCALES) {
    for (const a of NAXOS_GUIDE_ARTICLES) params.push({ locale, slug: a.slug });
  }
  return params;
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const a = NAXOS_GUIDE_BY_SLUG[slug];
  if (!isLocale(locale) || !a) return {};
  return buildMetadata({
    locale,
    path: `naxos/${slug}`,
    title: a.title[locale],
    description: a.excerpt[locale],
    image: a.hero,
    keywords: a.keywords,
    type: "article",
    publishedTime: a.publishedAt,
    modifiedTime: a.updatedAt,
  });
}

export default async function NaxosGuideArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const a = NAXOS_GUIDE_BY_SLUG[slug];
  if (!isLocale(locale) || !a) notFound();
  const loc = locale as Locale;
  const dict = await getDict(loc);

  const related = relatedArticles(slug, 3);
  const vehicles = (a.vehiclePicks ?? [])
    .map((s) => VEHICLES.find((v) => v.slug === s))
    .filter((v): v is (typeof VEHICLES)[number] => Boolean(v))
    .slice(0, 3);
  const locations = (a.locationPicks ?? [])
    .map((s) => LOCATIONS_BY_SLUG[s])
    .filter(Boolean)
    .slice(0, 4);

  const faqPairs = a.faq.map((f) => ({ q: f.q[loc], a: f.a[loc] }));

  return (
    <>
      <JsonLd
        data={graph([
          articleSchema(
            {
              slug: a.slug,
              title: a.title,
              excerpt: a.excerpt,
              hero: a.hero,
              publishedAt: a.publishedAt,
              updatedAt: a.updatedAt,
              readingTime: a.readingTime,
              sections: a.sections,
              related: a.related,
            },
            loc,
            { path: `naxos/${a.slug}`, section: "Naxos travel guide" },
          ),
          qaPageSchema(faqPairs),
          itemListSchema(
            related.map((r) => ({
              name: r.title[loc],
              url: `${SITE.domain}${localePath(loc, `naxos/${r.slug}`)}`,
              image: r.hero,
              description: r.excerpt[loc],
            })),
            { name: "Related Naxos guides" },
          ),
          breadcrumbSchema([
            { name: dict.nav.home, url: `${SITE.domain}${localePath(loc)}` },
            { name: "Naxos", url: `${SITE.domain}${localePath(loc, "naxos")}` },
            { name: a.title[loc], url: `${SITE.domain}${localePath(loc, `naxos/${a.slug}`)}` },
          ]),
        ])}
      />

      {/* Hero */}
      <section className="relative">
        <div className="relative h-[46vh] min-h-[320px] w-full overflow-hidden md:h-[56vh]">
          <Image
            src={a.hero}
            alt={a.title[loc]}
            fill
            priority
            sizes="100vw"
            className="object-cover"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--overlay-scrim)] via-[color-mix(in_oklab,var(--overlay-scrim)_55%,transparent)] to-transparent" />
        </div>
        <div className="mx-auto -mt-40 max-w-4xl px-4 pb-2 sm:px-6 lg:px-8">
          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5" /> Naxos guide
            </span>
            <h1 className="mt-4 text-3xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-4xl lg:text-5xl">
              {a.title[loc]}
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-white/80">
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" /> {a.readingTime} min read
              </span>
              <time dateTime={a.updatedAt}>
                Updated {new Date(a.updatedAt).toLocaleDateString(loc, { year: "numeric", month: "long" })}
              </time>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto max-w-4xl px-4 pt-10 sm:px-6 lg:px-8">
          <Breadcrumbs
            label={dict.common.breadcrumb}
            items={[
              { label: dict.nav.home, href: localePath(loc) },
              { label: "Naxos", href: localePath(loc, "naxos") },
              { label: a.title[loc] },
            ]}
          />
        </div>
      </section>

      {/* Answer block — the featured-snippet and AI Overview target. */}
      <section className="bg-background">
        <div className="mx-auto max-w-4xl px-4 pt-6 sm:px-6 lg:px-8">
          <div className="answer-block rounded-3xl p-6 sm:p-7">
            <p className="editorial-lead text-[var(--prose-heading)]">{a.answer[loc]}</p>
          </div>
        </div>
      </section>

      {/* Body + sticky TOC */}
      <section className="bg-background">
        <div className="mx-auto grid max-w-5xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_220px] lg:px-8">
          <article className="editorial max-w-none">
            {a.sections.map((s, i) => (
              <section key={i} id={`s${i}`} className="scroll-mt-28">
                <h2>{s.heading[loc]}</h2>
                <p>{s.body[loc]}</p>
              </section>
            ))}

            {a.table && (
              <section className="scroll-mt-28" id="comparison">
                <h2>{a.table.caption[loc]}</h2>
                {/* Wide tables scroll inside their own container so the page body never does. */}
                <div
                  className="mt-5 overflow-x-auto rounded-2xl border border-border"
                  tabIndex={0}
                  role="region"
                  aria-label={a.table.caption[loc]}
                >
                  <table className="editorial-table w-full min-w-[38rem] border-collapse text-sm">
                    <caption className="sr-only">{a.table.caption[loc]}</caption>
                    <thead>
                      <tr>
                        {a.table.columns.map((c, i) => (
                          <th
                            key={i}
                            scope="col"
                            className="px-4 py-3 text-left font-bold text-[var(--prose-heading)]"
                          >
                            {c[loc]}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {a.table.rows.map((row, ri) => (
                        <tr key={ri} className="border-t border-border">
                          {row.map((cell, ci) => (
                            <td
                              key={ci}
                              className={`px-4 py-3 align-top ${
                                ci === 0
                                  ? "font-semibold text-[var(--prose-heading)]"
                                  : "text-[var(--prose-body)]"
                              }`}
                            >
                              {cell[loc]}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}
          </article>

          <aside className="hidden lg:block">
            <div className="island-card sticky top-28 rounded-3xl p-4">
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--link)]">
                {dict.toc}
              </p>
              <ul className="space-y-2 text-sm">
                {a.sections.map((s, i) => (
                  <li key={i}>
                    <a href={`#s${i}`} className="text-[var(--prose-body)] hover:text-[var(--link)]">
                      {s.heading[loc]}
                    </a>
                  </li>
                ))}
                {a.table && (
                  <li>
                    <a href="#comparison" className="text-[var(--prose-body)] hover:text-[var(--link)]">
                      {a.table.caption[loc]}
                    </a>
                  </li>
                )}
                <li>
                  <a href="#questions" className="text-[var(--prose-body)] hover:text-[var(--link)]">
                    Common questions
                  </a>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </section>

      {/* Query fan-out. Real on-page content, mirrored into FAQPage schema. */}
      <section id="questions" className="scroll-mt-24 border-y border-border bg-sand dark:bg-[var(--background)]">
        <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold tracking-tight text-[var(--ink)] dark:text-white">
            Common questions
          </h2>
          {/* Rendered as real content, not a collapsed accordion: text hidden
              behind a closed <details> is still indexed, but it does not win
              featured snippets the way visible prose does. */}
          <dl className="mt-8 divide-y divide-[var(--prose-rule)]">
            {a.faq.map((item, i) => (
              <div key={i} className="py-6 first:pt-0">
                <dt className="text-base font-bold text-[var(--prose-heading)]">{item.q[loc]}</dt>
                <dd className="mt-2 max-w-[68ch] text-[0.95rem] leading-7 text-[var(--prose-body)]">
                  {item.a[loc]}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* seo-os Law 2: every guide routes into the transactional pages. */}
      <section className="bg-background">
        <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="island-card rounded-3xl p-6 sm:p-8">
            <h2 className="text-xl font-extrabold text-[var(--ink)] dark:text-white">
              Getting around Naxos
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
              Most of what is on this page needs a car. We deliver free to the port, the
              airport and any hotel on the island.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={localePath(loc, "fleet/cars")}
                className="inline-flex items-center gap-2 rounded-full bg-brand-gradient px-6 py-3 text-sm font-bold text-white transition hover:brightness-110"
              >
                {dict.cta.seeFleet} <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={whatsappUrl(dict.whatsAppFab.message)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-bold text-[var(--ink)] transition hover:border-[var(--sea)] hover:text-[var(--sea)] dark:text-white"
              >
                <WhatsAppIcon className="h-4 w-4" /> {dict.cta.whatsappQuote}
              </a>
            </div>

            {locations.length > 0 && (
              <div className="mt-7 border-t border-border pt-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                  Pickup points near here
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {locations.map((l) => (
                    <Link
                      key={l.slug}
                      href={localePath(loc, `locations/${l.slug}`)}
                      className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/60 px-3.5 py-2 text-xs font-semibold text-[var(--ink)] transition hover:border-[var(--sea)] hover:text-[var(--sea)] dark:text-white"
                    >
                      <MapPin className="h-3 w-3" /> {l.shortName}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {vehicles.length > 0 && (
            <div className="mt-10">
              <h3 className="text-lg font-bold text-[var(--ink)] dark:text-white">
                {dict.common.relatedVehicles}
              </h3>
              <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {vehicles.map((v) => (
                  <VehicleCard key={v.slug} vehicle={v} locale={loc} dict={dict} />
                ))}
              </div>
            </div>
          )}

          <DiscoverCycladesBox locale={loc} slug={a.slug} />
        </div>
      </section>

      {related.length > 0 && (
        <section className="border-t border-border bg-sand dark:bg-[var(--background)]">
          <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-extrabold text-[var(--ink)] dark:text-white">
              {dict.common.relatedArticles}
            </h2>
            <div className="mt-6 grid gap-5 md:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={localePath(loc, `naxos/${r.slug}`)}
                  className="island-card lift-on-hover group flex flex-col overflow-hidden rounded-3xl"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={r.hero}
                      alt={r.title[loc]}
                      fill
                      sizes="(max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      unoptimized
                    />
                  </div>
                  <div className="flex flex-1 flex-col gap-2 p-5">
                    <h3 className="font-bold leading-tight text-[var(--ink)] group-hover:text-[var(--sea)] dark:text-white">
                      {r.title[loc]}
                    </h3>
                    <p className="line-clamp-3 text-sm text-muted-foreground">{r.excerpt[loc]}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
