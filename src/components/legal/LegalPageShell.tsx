import type { Locale } from "@/lib/site";
import { SITE, localePath } from "@/lib/site";
import type { Dict } from "@/i18n/types";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, graph } from "@/lib/schema";
import { LAST_UPDATED } from "@/content/legal";

export function LegalPageShell({
  locale,
  dict,
  slug,
  title,
  subtitle,
  children,
}: {
  locale: Locale;
  dict: Dict;
  slug: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd data={graph([
        breadcrumbSchema([
          { name: dict.nav.home, url: `${SITE.domain}${localePath(locale)}` },
          { name: title, url: `${SITE.domain}${localePath(locale, slug)}` },
        ]),
      ])} />

      {/* Hero band */}
      <section className="relative wave-bg border-b border-border/70">
        <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" aria-hidden />
        <div className="relative mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
          <Breadcrumbs
            label={dict.common.breadcrumb}
            items={[
              { label: dict.nav.home, href: localePath(locale) },
              { label: title },
            ]}
          />
          <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight text-[var(--ink)] dark:text-white sm:text-5xl">
            {title}
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-muted-foreground">{subtitle}</p>
          <p className="mt-4 text-xs uppercase tracking-widest text-[var(--brand-1)]">
            {dict.legal.lastUpdated}: {LAST_UPDATED}
          </p>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">{children}</div>
      </section>
    </>
  );
}
