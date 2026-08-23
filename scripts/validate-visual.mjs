import { mkdir } from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";
import puppeteer from "puppeteer";

const require = createRequire(import.meta.url);
const axePath = require.resolve("axe-core/axe.min.js");
const ORIGIN = (process.env.SITE_ORIGIN ?? "http://127.0.0.1:3000").replace(/\/$/, "");
const OUTPUT = process.env.VISUAL_OUTPUT ?? "/tmp/fastcar-visual";
const ROUTES = [
  { name: "home-el", path: "/el" },
  { name: "fleet-en", path: "/en/fleet/cars" },
  { name: "vehicle-en", path: "/en/fleet/cars/hyundai-i10" },
  { name: "guide-el", path: "/el/guides/do-you-need-a-car-in-naxos" },
  // The new editorial layer: hub, an article with a comparison table, and the
  // scooter page. All three introduce surfaces the old routes never covered.
  { name: "naxos-hub-en", path: "/en/naxos" },
  { name: "naxos-article-en", path: "/en/naxos/naxos-vs-paros" },
  { name: "scooters-en", path: "/en/fleet/scooters" },
  { name: "location-en", path: "/en/locations/agios-prokopios" },
  // The rebuilt reviews platform: 185 real Google reviews behind sort/filter
  // controls, with hashed avatar colours that have to clear AA in both themes.
  { name: "reviews-en", path: "/en/reviews" },
  { name: "reviews-el", path: "/el/reviews" },
];
const VIEWPORTS = [
  { name: "desktop", width: 1440, height: 1000 },
  { name: "mobile", width: 390, height: 844 },
];
const THEMES = ["light", "dark"];
const failures = [];

await mkdir(OUTPUT, { recursive: true });
const browser = await puppeteer.launch({ headless: true });

try {
  for (const route of ROUTES) {
    for (const viewport of VIEWPORTS) {
      for (const theme of THEMES) {
        const page = await browser.newPage();
        const runtimeErrors = [];
        page.on("console", (message) => {
          const text = message.text();
          // next start still advertises the HMR socket; the failed handshake is
          // a harness artifact, not a defect in the page.
          if (message.type() === "error" && !/webpack-hmr|WebSocket connection/.test(text)) {
            runtimeErrors.push(text);
          }
        });
        page.on("pageerror", (error) => runtimeErrors.push(error.message));

        await page.setViewport({ width: viewport.width, height: viewport.height });
        await page.setCacheEnabled(false);
        await page.emulateMediaFeatures([
          { name: "prefers-color-scheme", value: theme },
          { name: "prefers-reduced-motion", value: "reduce" },
        ]);
        await page.evaluateOnNewDocument((selectedTheme) => {
          window.localStorage.setItem("fmr-theme", selectedTheme);
          window.localStorage.setItem(
            "fmr-consent",
            JSON.stringify({
              essential: true,
              analytics: false,
              marketing: false,
              ts: Date.now(),
            }),
          );
        }, theme);

        const response = await page.goto(`${ORIGIN}${route.path}`, {
          waitUntil: "networkidle0",
        });
        const label = `${route.name}-${viewport.name}-${theme}`;
        if (!response || (response.status() !== 304 && !response.ok())) {
          failures.push(`${label}: returned ${response?.status()}`);
        }

        await page.addScriptTag({ path: axePath });
        const checks = await page.evaluate(async () => {
          const axeResults = await window.axe.run(document, {
            runOnly: {
              type: "tag",
              values: ["wcag2a", "wcag2aa", "wcag21aa"],
            },
          });
          return {
            violations: axeResults.violations.map((violation) => ({
              id: violation.id,
              impact: violation.impact,
              nodes: violation.nodes.length,
              targets: violation.nodes.slice(0, 3).flatMap((node) => node.target),
            })),
            horizontalOverflow: document.documentElement.scrollWidth > window.innerWidth + 1,
            nextOverlay: Boolean(document.querySelector("[data-nextjs-dialog]")),
            htmlLang: document.documentElement.lang,
            dark: document.documentElement.classList.contains("dark"),
            h1Count: document.querySelectorAll("h1").length,
          };
        });

        if (checks.horizontalOverflow) failures.push(`${label}: horizontal overflow`);
        if (checks.nextOverlay) failures.push(`${label}: Next.js error overlay`);
        if (checks.h1Count !== 1) failures.push(`${label}: expected one h1, found ${checks.h1Count}`);
        if (checks.dark !== (theme === "dark")) failures.push(`${label}: theme mismatch`);
        if (runtimeErrors.length > 0) failures.push(`${label}: console errors: ${runtimeErrors.join(" | ")}`);
        for (const violation of checks.violations) {
          failures.push(
            `${label}: axe ${violation.id} (${violation.impact}, ${violation.nodes} node(s): ${violation.targets.join(", ")})`,
          );
        }

        await page.screenshot({
          path: path.join(OUTPUT, `${label}.png`),
          fullPage: true,
        });
        await page.close();
      }
    }
  }
} finally {
  await browser.close();
}

if (failures.length > 0) {
  console.error(`Visual validation failed with ${failures.length} issue(s):`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`Visual validation passed for ${ROUTES.length * VIEWPORTS.length * THEMES.length} route/viewport/theme combinations.`);
