import { notFound } from "next/navigation";
import { isLocale, localePath, SITE } from "@/lib/site";
import { getDict } from "@/i18n/dictionaries";
import { seoFor } from "@/lib/seo";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, graph } from "@/lib/schema";
import { whatsappUrl } from "@/lib/whatsapp";
import { Phone, Mail, ArrowRight } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return seoFor("contact", locale, "contact", {
    title: dictTitle(locale),
    description: SITE.tagline[locale],
    noindex: true,
  });
}

function dictTitle(locale: keyof typeof SITE.tagline): string {
  return `${SITE.brand} · ${SITE.tagline[locale]}`;
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDict(locale);

  const contactPage = {
    "@type": "ContactPage",
    "@id": `${SITE.domain}${localePath(locale, "contact")}`,
    name: dict.contact.title,
    description: SITE.tagline[locale],
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
          <p className="mt-3 text-lg text-muted-foreground max-w-3xl">{SITE.tagline[locale]}</p>
        </div>
      </section>

      {/* Main contact section */}
      <section className="bg-background">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-3xl gap-8 items-start">

            {/* Contact cards */}
            <div className="grid grid-cols-2 gap-4">
              <a
                href={whatsappUrl(dict.whatsAppFab.message)}
                target="_blank"
                rel="noopener noreferrer"
                className="group island-card col-span-2 flex items-center gap-4 rounded-2xl p-5 transition-all hover:-translate-y-0.5 hover:shadow-xl"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#e8f7ef] dark:bg-emerald-400/15">
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

              <a
                href={SITE.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="island-card col-span-2 flex items-center justify-between gap-4 rounded-2xl p-5 font-bold text-[var(--ink)] transition-all hover:-translate-y-0.5 hover:shadow-xl dark:text-white"
              >
                {dict.nav.bookNow}
                <ArrowRight className="h-5 w-5 text-[var(--brand-2)]" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
