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
  const jsTimeSet = useRef(false);
  const gaConfigured = useRef(false);
  const awConfigured = useRef(false);

  useEffect(() => {
    if (!hydrated || typeof window.gtag !== "function") return;

    window.gtag("consent", "update", {
      analytics_storage: consent?.analytics ? "granted" : "denied",
      ad_storage: consent?.marketing ? "granted" : "denied",
      ad_user_data: consent?.marketing ? "granted" : "denied",
      ad_personalization: consent?.marketing ? "granted" : "denied",
    });

    const loadGa = Boolean(consent?.analytics);
    const loadAw = Boolean(consent?.marketing);

    if ((loadGa || loadAw) && !jsTimeSet.current) {
      window.gtag("js", new Date());
      jsTimeSet.current = true;
    }

    if (loadGa && !gaConfigured.current) {
      window.gtag("config", GA_ID, { anonymize_ip: true });
      gaConfigured.current = true;
    }

    if (loadAw && !awConfigured.current) {
      window.gtag("config", AW_ID);
      awConfigured.current = true;
    }
  }, [consent, hydrated]);

  const loadGa = Boolean(hydrated && consent?.analytics);
  const loadAw = Boolean(hydrated && consent?.marketing);

  if (!loadGa && !loadAw) return null;

  // One gtag.js download is enough for Analytics and Ads; extra IDs are
  // registered with gtag('config', …) above.
  const tagId = loadGa ? GA_ID : AW_ID;

  return (
    <Script
      id="google-gtag"
      src={`https://www.googletagmanager.com/gtag/js?id=${tagId}`}
      strategy="afterInteractive"
    />
  );
}
