import { PhotoCredit } from "@/components/media/PhotoCredit";
import Image from "next/image";
import type { ReactNode } from "react";
import type { Dict } from "@/i18n/types";
import { localePath, type Locale } from "@/lib/site";
import { Breadcrumbs } from "./Breadcrumbs";

export function PageMasthead({
  locale,
  dict,
  title,
  subtitle,
  label,
  image,
  imageAlt,
  children,
}: {
  locale: Locale;
  dict: Dict;
  title: string;
  subtitle: string;
  label: string;
  image: string;
  imageAlt?: string;
  children?: ReactNode;
}) {
  return (
    <section className="editorial-masthead">
      <div className="editorial-masthead-copy">
        <Breadcrumbs
          label={dict.common.breadcrumb}
          items={[
            { label: dict.nav.home, href: localePath(locale) },
            { label },
          ]}
        />
        <span className="eyebrow masthead-eyebrow">
          FAST MOTOR RENTAL · NAXOS
        </span>
        <h1>{title}</h1>
        <p>{subtitle}</p>
        {children && <div className="masthead-extra">{children}</div>}
      </div>
      <aside className="editorial-masthead-image">
        <Image
          src={image}
          alt={imageAlt ?? ""}
          fill
          priority
          sizes="(max-width:760px) 100vw, 48vw"
        />
        <span aria-hidden="true">37°06′ N · 25°22′ E</span>
        <PhotoCredit
          image={image}
          locale={locale}
          className="masthead-credit"
        />
      </aside>
    </section>
  );
}
