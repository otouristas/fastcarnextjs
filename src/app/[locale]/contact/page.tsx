import { notFound } from "next/navigation";
import { isLocale, localePath, SITE } from "@/lib/site";
import { getDict } from "@/i18n/dictionaries";
import { seoFor } from "@/lib/seo";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, graph } from "@/lib/schema";
import { whatsappUrl } from "@/lib/whatsapp";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";

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

      <section className="wave-bg border-b border-border/70">
        <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
          <Breadcrumbs label={dict.common.breadcrumb} items={[
            { label: dict.nav.home, href: localePath(locale) },
            { label: dict.nav.contact },
          ]} />
          <h1 className="mt-5 text-4xl sm:text-5xl font-extrabold tracking-tight text-[var(--ink)] dark:text-white">{dict.contact.title}</h1>
          <p className="mt-3 text-lg text-muted-foreground max-w-3xl">{dict.contact.subtitle}</p>
        </div>
      </section>

      <section className="bg-background border-y border-border/70">
        <div className="mx-auto grid max-w-5xl gap-5 px-4 py-14 sm:grid-cols-2 sm:px-6 lg:px-8">
          <a href={whatsappUrl(dict.whatsAppFab.message)} target="_blank" rel="noopener noreferrer" className="group island-card rounded-3xl p-6 transition-transform hover:-translate-y-1">
            <MessageCircle className="h-8 w-8 text-[#25D366]" />
            <h2 className="mt-3 text-xl font-bold text-[var(--ink)] dark:text-white">{dict.contact.whatsappLabel}</h2>
            <p className="mt-1 text-muted-foreground">{SITE.phones[0]}</p>
          </a>
          <a href={`tel:${SITE.phones[0]}`} className="group island-card rounded-3xl p-6 transition-transform hover:-translate-y-1">
            <Phone className="h-8 w-8 text-[var(--brand-1)]" />
            <h2 className="mt-3 text-xl font-bold text-[var(--ink)] dark:text-white">{dict.contact.phoneLabel}</h2>
            <p className="mt-1 text-muted-foreground">{SITE.phones.join(" · ")}</p>
          </a>
          <a href={`mailto:${SITE.email}`} className="group island-card rounded-3xl p-6 transition-transform hover:-translate-y-1">
            <Mail className="h-8 w-8 text-[var(--brand-1)]" />
            <h2 className="mt-3 text-xl font-bold text-[var(--ink)] dark:text-white">{dict.contact.emailLabel}</h2>
            <p className="mt-1 text-muted-foreground">{SITE.email}</p>
          </a>
          <div className="island-card rounded-3xl p-6">
            <MapPin className="h-8 w-8 text-[var(--brand-1)]" />
            <h2 className="mt-3 text-xl font-bold text-[var(--ink)] dark:text-white">{dict.contact.addressLabel}</h2>
            <p className="mt-1 text-muted-foreground">{SITE.address.locality}, {SITE.address.region}, Greece</p>
            <p className="mt-3 inline-flex items-center gap-2 text-sm text-muted-foreground"><Clock className="h-4 w-4" /> {SITE.hours.open}–{SITE.hours.close} daily (May–Oct)</p>
          </div>
        </div>
      </section>
    </>
  );
}
