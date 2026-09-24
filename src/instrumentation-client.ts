// Next runs this entry before React hydration. Keeping startup side effects
// outside the layout avoids rendering executable script tags during refreshes.
declare global {
  interface Window {
    __fmrConsentInitialized?: boolean;
  }
}

let dark = false;
try {
  const mode = window.localStorage.getItem("fmr-theme");
  dark = mode === "dark";
} catch {
  // A browser that blocks storage must still initialize consent and the app.
}
// New visitors and legacy system preferences start light, regardless of OS.
document.documentElement.classList.toggle("dark", dark);
document.documentElement.style.colorScheme = dark ? "dark" : "light";

// Fast Refresh must not reset an existing consent decision to denied.
if (!window.__fmrConsentInitialized) {
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function (...args: unknown[]) {
    window.dataLayer.push(args);
  };
  window.gtag("consent", "default", {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    wait_for_update: 500,
  });
  window.gtag("set", "ads_data_redaction", true);
  window.__fmrConsentInitialized = true;
}

export {};
