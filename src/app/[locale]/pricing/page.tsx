import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { navigationCopy } from "@/content/navigation-copy";
import { isLocale, localePath, SITE } from "@/lib/site";
import { getDict } from "@/i18n/dictionaries";
import { seoFor } from "@/lib/seo";
import { VEHICLES } from "@/content/fleet";
import { FAQS } from "@/content/faqs";
import { PageMasthead } from "@/components/layout/PageMasthead";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, faqPageSchema, graph } from "@/lib/schema";
import { ContextualFaq } from "@/components/faq/ContextualFaq";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return seoFor("pricing", locale, "pricing");
}

export default async function PricingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDict(locale);
  const c = navigationCopy(locale);
  const items = VEHICLES.filter((v) => v.bookable);
  const faqs = FAQS.filter((f) =>
    [
      "rental-cost",
      "advance-vs-walkin",
      "credit-card-required",
      "cancellation",
      "delivery-zones",
      "insurance-included",
    ].includes(f.slug),
  );

  return (
    <>
      <JsonLd
        data={graph([
          breadcrumbSchema([
            { name: dict.nav.home, url: `${SITE.domain}${localePath(locale)}` },
            {
              name: dict.nav.pricing,
              url: `${SITE.domain}${localePath(locale, "pricing")}`,
            },
          ]),
          faqPageSchema(faqs, locale),
        ])}
      />
      <PageMasthead
        locale={locale}
        dict={dict}
        title={dict.pricing.title}
        subtitle={dict.pricing.subtitle}
        label={dict.nav.pricing}
        image="/images/fleet/studio/hyundai-i10.webp"
        imageAlt={c.photo}
      />
      <section className="escape-wrap">
        <div className="pricing-intro">
          <div>
            <span className="eyebrow">{c.seasonal}</span>
            <h2 className="mt-5">{c.choice}</h2>
          </div>
          <div>
            <p>{c.pricingNote}</p>
            <p>{dict.pricing.note}</p>
            <a
              href={SITE.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="escape-button"
            >
              {c.available}
              <ArrowUpRight size={18} />
            </a>
          </div>
        </div>
        <div className="pricing-ledger-head">
          <h2>{dict.nav.cars}</h2>
          <span>{String(items.length).padStart(2, "0")} / NAXOS</span>
        </div>
        <div className="pricing-ledger">
          {items.map((v) => (
            <article className="pricing-ledger-row" key={v.slug}>
              <div>
                <Image
                  src={v.image}
                  alt={`${v.name[locale]} — ${c.photo}`}
                  fill
                  sizes="140px"
                />
              </div>
              <div>
                <h3>
                  <Link href={localePath(locale, `fleet/cars/${v.slug}`)}>
                    {v.name[locale]}
                  </Link>
                </h3>
                <p>
                  {v.transmission === "automatic"
                    ? dict.common.automatic
                    : dict.common.manual}{" "}
                  · {v.seats} {dict.common.seats}
                </p>
              </div>
              <div>
                <small>{dict.pricing.shoulder}</small>
                <strong>
                  {v.priceShoulder != null ? `€${v.priceShoulder}` : "—"}
                </strong>
              </div>
              <div>
                <small>{dict.pricing.high}</small>
                <strong>{v.priceHigh != null ? `€${v.priceHigh}` : "—"}</strong>
              </div>
              <div>
                <small>{dict.pricing.weekly}</small>
                <strong>
                  {v.priceWeekly != null ? `€${v.priceWeekly}` : "—"}
                </strong>
              </div>
              <Link
                href={localePath(locale, `fleet/cars/${v.slug}`)}
                aria-label={v.name[locale]}
              >
                <ArrowUpRight size={18} />
              </Link>
            </article>
          ))}
        </div>
        <p className="pricing-disclosure">{c.imageNote}</p>
      </section>
      <ContextualFaq faqs={faqs} locale={locale} dict={dict} />
    </>
  );
}
