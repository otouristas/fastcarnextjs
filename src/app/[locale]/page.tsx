import { PhotoCredit } from "@/components/media/PhotoCredit";
import { IslandFilm } from "@/components/media/IslandFilm";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight,
  ArrowRight,
  Plane,
  Anchor,
  MapPin,
  Check,
} from "lucide-react";
import { isLocale, localePath, SITE } from "@/lib/site";
import { getDict } from "@/i18n/dictionaries";
import { seoFor } from "@/lib/seo";
import { designCopy } from "@/content/design-copy";
import { VEHICLES } from "@/content/fleet";
import { GUIDES } from "@/content/guides";
import { FAQS } from "@/content/faqs";
import { REVIEWS, REVIEW_AGGREGATE } from "@/content/reviews";
import { ReviewCard } from "@/components/reviews/ReviewCard";
import { VehicleCard } from "@/components/fleet/VehicleCard";
import { ContextualFaq } from "@/components/faq/ContextualFaq";
import { JsonLd } from "@/components/seo/JsonLd";
import { graph, faqPageSchema, itemListSchema } from "@/lib/schema";
import { whatsappUrl } from "@/lib/whatsapp";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return isLocale(locale) ? seoFor("home", locale, "") : {};
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDict(locale);
  const c = designCopy(locale);
  const cars = VEHICLES.filter((v) => v.bookable).slice(0, 4);
  const faqs = FAQS.filter((f) =>
    [
      "airport-vs-port-pickup",
      "automatic-availability",
      "documents-needed",
      "credit-card-required",
      "4x4-needed",
      "advance-vs-walkin",
    ].includes(f.slug),
  );
  const arrival = [
    {
      label: c.airport,
      code: "JNX",
      path: "locations/airport-pickup",
      Icon: Plane,
    },
    {
      label: c.port,
      code: "PORT",
      path: "locations/port-pickup",
      Icon: Anchor,
    },
    { label: c.stay, code: "NAXOS", path: "locations", Icon: MapPin },
  ];
  return (
    <>
      <JsonLd
        data={graph([
          faqPageSchema(faqs, locale),
          itemListSchema(
            cars.map((v) => ({
              name: v.name[locale],
              url: `${SITE.domain}${localePath(locale, `fleet/cars/${v.slug}`)}`,
              image: v.image,
              description: v.tagline[locale],
            })),
            { name: dict.nav.cars },
          ),
        ])}
      />
      <section className="escape-hero">
        <div className="escape-hero-copy">
          <p className="eyebrow">
            <span className="sun-dot" /> {SITE.tagline[locale]}
          </p>
          <h1>
            {c.headline}
            <br />
            <em>{c.accent}</em>
          </h1>
          <p className="escape-intro">{c.description}</p>
          <div className="escape-actions">
            <a
              className="escape-button"
              href={SITE.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {c.available}
              <ArrowUpRight size={20} />
            </a>
            <Link
              className="escape-text-link"
              href={localePath(locale, "fleet/cars")}
            >
              {c.explore}
              <ArrowRight size={18} />
            </Link>
          </div>
          <div className="escape-signature">
            <span className="signature-line" />
            <span>{c.intro}</span>
            <span>37°06′N 25°22′E</span>
          </div>
        </div>
        <div className="escape-hero-photo">
          <Image
            src="/images/pexels/naxos-hawaii-beach.webp"
            alt={dict.naxos.beachesTitle}
            fill
            priority
            sizes="(max-width: 900px) 100vw, 55vw"
            className="object-cover"
          />
          <div className="escape-photo-label">
            <span>01 / NAXOS ISLAND</span>
            <span>CYCLADES, GREECE ↗</span>
          </div>
          <span className="escape-wordmark" aria-hidden="true">
            NAXOS.
          </span>
          <Link
            href={localePath(locale, "naxos/beaches")}
            className="escape-photo-note"
          >
            <span>{c.coast}</span>
            <ArrowUpRight size={24} />
          </Link>
        </div>
      </section>
      <div className="hero-photo-credit escape-wrap">
        <PhotoCredit
          image="/images/pexels/naxos-hawaii-beach.webp"
          locale={locale}
        />
      </div>
      <section
        className="arrival-section escape-wrap"
        aria-labelledby="arrival-title"
      >
        <div className="arrival-heading">
          <span className="eyebrow">01 — {dict.nav.locations}</span>
          <h2 id="arrival-title">{c.arrival}</h2>
          <p>{c.arrivalNote}</p>
        </div>
        <div className="arrival-options">
          {arrival.map(({ label, code, path, Icon }) => (
            <Link
              className="arrival-ticket"
              key={path}
              href={localePath(locale, path)}
            >
              <div className="arrival-ticket-top">
                <Icon size={25} strokeWidth={1.4} />
                <span>{code}</span>
              </div>
              <h3>{label}</h3>
              <span className="arrival-ticket-bottom">
                {c.pickup}
                <ArrowUpRight size={20} />
              </span>
            </Link>
          ))}
        </div>
      </section>
      <div className="escape-benefits">
        {[
          dict.hero.badge1,
          dict.hero.badge2,
          dict.hero.badge3,
          dict.hero.badge4,
        ].map((x) => (
          <span key={x}>
            <Check size={15} />
            {x}
          </span>
        ))}
      </div>
      <section className="escape-wrap escape-section" id="choose-car">
        <div className="escape-section-heading">
          <div>
            <p className="eyebrow">02 — {dict.nav.fleet}</p>
            <h2>{c.fleet}</h2>
            <p>{c.fleetIntro}</p>
          </div>
          <Link
            className="escape-text-link"
            href={localePath(locale, "fleet/cars")}
          >
            {c.all}
            <ArrowUpRight size={20} />
          </Link>
        </div>
        <nav className="fleet-category-links" aria-label={dict.nav.fleet}>
          {[
            ["fleet/cars", c.all],
            ["fleet/collections/automatic", c.automatic],
            ["fleet/collections/family-7-seater", c.family],
            ["fleet/collections/suv-4x4", c.suv],
          ].map(([path, label]) => (
            <Link href={localePath(locale, path)} key={path}>
              {label}
              <ArrowUpRight size={14} />
            </Link>
          ))}
        </nav>
        <div className="escape-fleet-grid">
          {cars.map((v) => (
            <VehicleCard vehicle={v} locale={locale} dict={dict} key={v.slug} />
          ))}
        </div>
        <p className="escape-price-note">{c.seasonal}</p>
      </section>
      <section className="escape-island">
        <div className="escape-wrap">
          <div className="escape-section-heading">
            <div>
              <p className="eyebrow">03 — {dict.footer.explore}</p>
              <h2>{c.island}</h2>
            </div>
            <p>{c.islandText}</p>
          </div>
          <IslandFilm locale={locale} />
          <div className="escape-destinations">
            {[
              {
                image: "naxos-hawaii-beach.webp",
                title: c.coast,
                path: "naxos/beaches",
                number: "01",
                place: "AEGEAN BLUE",
              },
              {
                image: "naxos-turquoise-door.webp",
                title: c.villages,
                path: "naxos",
                number: "02",
                place: "ISLAND LIFE",
              },
              {
                image: "naxos-chora-sunset.webp",
                title: c.sunset,
                path: "naxos",
                number: "03",
                place: "GOLDEN HOUR",
              },
            ].map((x) => (
              <div className="destination-frame" key={x.number}>
                <Link
                  href={localePath(locale, x.path)}
                  className="escape-destination"
                >
                  <Image
                    src={`/images/pexels/${x.image}`}
                    alt={x.title}
                    fill
                    sizes="(max-width: 700px) 100vw, 33vw"
                    className="object-cover"
                  />
                  <span className="destination-number">{x.number}</span>
                  <div>
                    <p>{x.place}</p>
                    <h3>{x.title}</h3>
                    <ArrowUpRight size={25} />
                  </div>
                </Link>
                <PhotoCredit
                  image={`/images/pexels/${x.image}`}
                  locale={locale}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="escape-wrap escape-people">
        <div className="escape-people-heading">
          <p className="eyebrow">FAST MOTOR RENTAL NAXOS</p>
          <h2>{c.people}</h2>
          <p>{c.peopleText}</p>
          <Link className="escape-text-link" href={localePath(locale, "about")}>
            {dict.nav.about}
            <ArrowUpRight size={20} />
          </Link>
        </div>
        <div className="escape-stat">
          <strong>{SITE.founded}</strong>
          <span>{c.since}</span>
        </div>
        <div className="escape-stat">
          <strong>
            {VEHICLES.length}
            <span> /</span>
          </strong>
          <span>{c.cars}</span>
        </div>
      </section>
      <section className="escape-wrap escape-section escape-journal">
        <div className="escape-section-heading">
          <div>
            <p className="eyebrow">04 — {dict.nav.guides}</p>
            <h2>{c.journal}</h2>
          </div>
          <Link
            className="escape-text-link"
            href={localePath(locale, "guides")}
          >
            {dict.common.viewAll}
            <ArrowUpRight size={20} />
          </Link>
        </div>
        <div className="escape-journal-grid">
          {GUIDES.slice(0, 3).map((g, i) => (
            <Link key={g.slug} href={localePath(locale, `guides/${g.slug}`)}>
              <span className="journal-index">0{i + 1}</span>
              <h3>{g.title[locale]}</h3>
              <p>{g.excerpt[locale]}</p>
              <span className="escape-text-link">
                {dict.common.readArticle}
                <ArrowUpRight size={18} />
              </span>
            </Link>
          ))}
        </div>
      </section>
      <section className="escape-wrap escape-section">
        <div className="escape-section-heading">
          <div>
            <p className="eyebrow">05 — {c.reviews}</p>
            <h2>{dict.reviews.title}</h2>
          </div>
          <Link
            className="escape-text-link"
            href={localePath(locale, "reviews")}
          >
            {REVIEW_AGGREGATE.rating} / 5 · {REVIEW_AGGREGATE.total}{" "}
            {dict.reviews.google}
            <ArrowUpRight size={20} />
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {REVIEWS.slice(0, 3).map((r, i) => (
            <ReviewCard key={i} review={r} dict={dict} locale={locale} />
          ))}
        </div>
      </section>
      <ContextualFaq faqs={faqs} locale={locale} dict={dict} />
      <section className="escape-finale">
        <div className="escape-wrap">
          <p className="eyebrow">NAXOS IS CALLING</p>
          <h2>{c.final}</h2>
          <p>{c.finalText}</p>
          <div className="escape-actions">
            <a
              className="escape-button"
              href={SITE.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {c.available}
              <ArrowUpRight size={21} />
            </a>
            <a
              className="escape-text-link"
              href={whatsappUrl(dict.whatsAppFab.message)}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp
              <ArrowUpRight size={20} />
            </a>
          </div>
          <span className="finale-word" aria-hidden="true">
            LET’S GO.
          </span>
        </div>
      </section>
    </>
  );
}
