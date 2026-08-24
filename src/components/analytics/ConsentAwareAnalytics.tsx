"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";
import { useConsent } from "@/lib/consent";

const GA_ID = "G-CWXLKV3G9T";
const AW_ID = "AW-18405029812";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

export function ConsentAwareAnalytics() {
  const { consent, hydrated } = useConsent();
  const gaConfigured = useRef(false);
  const awConfigured = useRef(false);
  const jsStamped = useRef(false);

  const analytics = Boolean(consent?.analytics);
  const marketing = Boolean(consent?.marketing);
  const loadGtag = hydrated && (analytics || marketing);

  useEffect(() => {
    if (!hydrated || typeof window.gtag !== "function") return;

    window.gtag("consent", "update", {
      analytics_storage: analytics ? "granted" : "denied",
      ad_storage: marketing ? "granted" : "denied",
      ad_user_data: marketing ? "granted" : "denied",
      ad_personalization: marketing ? "granted" : "denied",
    });

    if ((analytics || marketing) && !jsStamped.current) {
      window.gtag("js", new Date());
      jsStamped.current = true;
    }

    if (analytics && !gaConfigured.current) {
      window.gtag("config", GA_ID, { anonymize_ip: true });
      gaConfigured.current = true;
    }

    if (marketing && !awConfigured.current) {
      window.gtag("config", AW_ID);
      awConfigured.current = true;
    }
  }, [analytics, marketing, hydrated]);

  if (!loadGtag) return null;

  return (
    <Script
      id="google-gtag"
      src={`https://www.googletagmanager.com/gtag/js?id=${analytics ? GA_ID : AW_ID}`}
      strategy="afterInteractive"
    />
  );
}
