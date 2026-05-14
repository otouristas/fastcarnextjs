import { notFound } from "next/navigation";
import { isLocale, localePath, SITE } from "@/lib/site";
import { getDict } from "@/i18n/dictionaries";
import { seoFor } from "@/lib/seo";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, graph } from "@/lib/schema";
import { whatsappUrl } from "@/lib/whatsapp";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return seoFor("contact", locale, "contact");
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDict(locale);

  const contactPage = {
    "@type": "ContactPage",
    "@id": `${SITE.domain}${localePath(locale, "contact")}`,
    name: dict.contact.title,
    description: dict.contact.subtitle,
    inLanguage: locale,
  };

  return (
    <>
      <JsonLd data={graph([
        contactPage,
        breadcrumbSchema([
          { name: dict.nav.home, url: `${SITE.domain}${localePath(locale)}` },
          { name: dict.nav.contact, url: `${SITE.domain}${localePath(locale, "contact")}` },
        ]),
      ])} />

      {/* Header */}
      <section className="wave-bg border-b border-border/70">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          <Breadcrumbs label={dict.common.breadcrumb} items={[
            { label: dict.nav.home, href: localePath(locale) },
            { label: dict.nav.contact },
          ]} />
          <h1 className="mt-5 text-4xl sm:text-5xl font-extrabold tracking-tight text-[var(--ink)] dark:text-white">{dict.contact.title}</h1>
          <p className="mt-3 text-lg text-muted-foreground max-w-3xl">{dict.contact.subtitle}</p>
        </div>
      </section>

      {/* Main contact section */}
      <section className="bg-background">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr] items-start">

            {/* Contact cards */}
            <div className="grid grid-cols-2 gap-4">
              <a
                href={whatsappUrl(dict.whatsAppFab.message)}
                target="_blank"
                rel="noopener noreferrer"
                className="group island-card col-span-2 flex items-center gap-4 rounded-2xl p-5 transition-all hover:-translate-y-0.5 hover:shadow-xl"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#e8f7ef]">
                  <WhatsAppIcon className="h-7 w-7" />
                </span>
                <div className="min-w-0">
                  <p className="font-bold text-[var(--ink)] dark:text-white">{dict.contact.whatsappLabel}</p>
                  <p className="text-sm text-muted-foreground">{SITE.phones[0]}</p>
                </div>
              </a>

              <a
                href={`tel:${SITE.phones[0]}`}
                className="group island-card flex flex-col gap-3 rounded-2xl p-5 transition-all hover:-translate-y-0.5 hover:shadow-xl"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--sand-2)]">
                  <Phone className="h-5 w-5 text-[var(--brand-2)]" />
                </span>
                <div>
                  <p className="font-bold text-[var(--ink)] dark:text-white">{dict.contact.phoneLabel}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{SITE.phones.join(" · ")}</p>
                </div>
              </a>

              <a
                href={`mailto:${SITE.email}`}
                className="group island-card flex flex-col gap-3 rounded-2xl p-5 transition-all hover:-translate-y-0.5 hover:shadow-xl"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--sand-2)]">
                  <Mail className="h-5 w-5 text-[var(--brand-2)]" />
                </span>
                <div>
                  <p className="font-bold text-[var(--ink)] dark:text-white">{dict.contact.emailLabel}</p>
                  <p className="mt-1 text-sm text-muted-foreground break-all">{SITE.email}</p>
                </div>
              </a>

              <div className="island-card col-span-2 flex items-start gap-4 rounded-2xl p-5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--sand-2)]">
                  <MapPin className="h-5 w-5 text-[var(--brand-2)]" />
                </span>
                <div>
                  <p className="font-bold text-[var(--ink)] dark:text-white">{dict.contact.addressLabel}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{SITE.address.locality}, {SITE.address.region}, Greece</p>
                  <p className="mt-2 inline-flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" /> {SITE.hours.open}–{SITE.hours.close} daily (May–Oct)
                  </p>
                </div>
              </div>
            </div>

            {/* Google Maps */}
            <div className="overflow-hidden rounded-3xl border border-border shadow-xl">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3181.9081033514353!2d25.371157476634142!3d37.107304950326714!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x149809cec5a08b4d%3A0x40ff961d6f6189a6!2sFast%20Motor%20Car%20Rental%20Naxos!5e0!3m2!1sen!2sgr!4v1778753122333!5m2!1sen!2sgr"
                width="600"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-[360px] lg:h-[480px]"
                title="Fast Motor Car Rental Naxos"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
