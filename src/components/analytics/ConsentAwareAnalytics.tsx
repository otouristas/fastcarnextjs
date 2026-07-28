"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";
import { useConsent } from "@/lib/consent";

const GA_ID = "G-CWXLKV3G9T";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

export function ConsentAwareAnalytics() {
  const { consent, hydrated } = useConsent();
  const configured = useRef(false);

  useEffect(() => {
    if (!hydrated || typeof window.gtag !== "function") return;

    window.gtag("consent", "update", {
      analytics_storage: consent?.analytics ? "granted" : "denied",
      ad_storage: consent?.marketing ? "granted" : "denied",
      ad_user_data: consent?.marketing ? "granted" : "denied",
      ad_personalization: consent?.marketing ? "granted" : "denied",
    });

    if (consent?.analytics && !configured.current) {
      window.gtag("js", new Date());
      window.gtag("config", GA_ID, { anonymize_ip: true });
      configured.current = true;
    }
  }, [consent, hydrated]);

  if (!hydrated || !consent?.analytics) return null;

  return (
    <Script
      id="google-analytics"
      src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
      strategy="afterInteractive"
    />
  );
}
