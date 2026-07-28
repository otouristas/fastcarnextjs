"use client";

import { useEffect } from "react";
import { useConsent } from "@/lib/consent";
import type { Locale } from "@/lib/site";

type TrackedEvent =
  | "booking_outbound"
  | "whatsapp_click"
  | "phone_click"
  | "email_click"
  | "language_switch";

function eventForLink(link: HTMLAnchorElement): TrackedEvent | null {
  const explicit = link.dataset.analyticsEvent as TrackedEvent | undefined;
  if (explicit) return explicit;

  const href = link.href;
  if (href.startsWith("tel:")) return "phone_click";
  if (href.startsWith("mailto:")) return "email_click";

  try {
    const url = new URL(href, window.location.href);
    if (url.hostname === "wa.me" || url.hostname.endsWith("whatsapp.com")) {
      return "whatsapp_click";
    }
    if (url.hostname === "fastmotorentalnaxos.cosmicbooker.com") {
      return "booking_outbound";
    }
  } catch {
    return null;
  }

  return null;
}

export function ConsentAwareInteractionTracking({ locale }: { locale: Locale }) {
  const { consent, hydrated } = useConsent();

  useEffect(() => {
    if (!hydrated || !consent?.analytics) return;

    const track = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const link = target.closest("a");
      if (!(link instanceof HTMLAnchorElement)) return;

      const eventName = eventForLink(link);
      if (!eventName || typeof window.gtag !== "function") return;

      window.gtag("event", eventName, {
        locale,
        link_location: link.closest("header, footer, main")?.tagName.toLowerCase() ?? "page",
      });
    };

    document.addEventListener("click", track, { capture: true });
    return () => document.removeEventListener("click", track, { capture: true });
  }, [consent?.analytics, hydrated, locale]);

  return null;
}
