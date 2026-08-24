"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";
import { useConsent } from "@/lib/consent";

const GA_ID = "G-CWXLKV3G9T";
const GOOGLE_ADS_ID = "AW-18405029812";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

export function ConsentAwareAnalytics() {
  const { consent, hydrated } = useConsent();
  const initialized = useRef(false);
  const analyticsConfigured = useRef(false);
  const adsConfigured = useRef(false);

  useEffect(() => {
    if (!hydrated || typeof window.gtag !== "function") return;

    window.gtag("consent", "update", {
      analytics_storage: consent?.analytics ? "granted" : "denied",
      ad_storage: consent?.marketing ? "granted" : "denied",
      ad_user_data: consent?.marketing ? "granted" : "denied",
      ad_personalization: consent?.marketing ? "granted" : "denied",
    });

    if ((consent?.analytics || consent?.marketing) && !initialized.current) {
      window.gtag("js", new Date());
      initialized.current = true;
    }

    if (consent?.analytics && !analyticsConfigured.current) {
      window.gtag("config", GA_ID, { anonymize_ip: true });
      analyticsConfigured.current = true;
    }

    if (consent?.marketing && !adsConfigured.current) {
      window.gtag("config", GOOGLE_ADS_ID);
      adsConfigured.current = true;
    }
  }, [consent, hydrated]);

  if (!hydrated || (!consent?.analytics && !consent?.marketing)) return null;

  return (
    <Script
      id="google-tag"
      src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
      strategy="afterInteractive"
    />
  );
}
