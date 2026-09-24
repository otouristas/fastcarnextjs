# Fast Motor Rental Naxos — redesign and search research

24 September 2026 · Redesign and research handoff

Run the app locally to review the redesign (development: `npm run dev -- --port 3100`; production preview after building: `npm run start -- --port 3101`). This change set is prepared on `codex/naxos-redesign-seo` for pull-request review. Production deployment is outside the verified scope.

The 24-sheet research workbook is committed at [`docs/seo/research/naxos-keyword-research-2026-09-24.xlsx`](../seo/research/naxos-keyword-research-2026-09-24.xlsx). The repository contains the new components, images, video and asset provenance.

## What changed

All existing page families use the new editorial design system: homepage, fleet and vehicle profiles, vehicle collections, pickup locations, pricing, insurance, reviews, FAQs, booking, contact, company, travel guides, destination articles and legal pages. Inter and Inter Tight replace the previous global typography. The brand logo is preserved.

The desktop mega-menu spans the viewport. The mobile menu fills the screen and includes marketing indicators, locale controls and booking/contact actions. The footer includes the specified AnotherSEOGuru, Touristas AI and Discover Cyclades credits. The mobile glass dock contains booking, calling and WhatsApp. The existing disabled AI-widget flag remains disabled.

The desktop WhatsApp button uses the original SVG artwork stored locally, without a surrounding decorative button. That same artwork appears in the mobile dock and menu. Default WhatsApp messages are Greek on `/el` and English on `/en`, `/it`, `/fr` and `/de`, including vehicle enquiries. Links were checked; no messages were sent.

All 24 vehicle profiles have regenerated images in one consistent warm cinematic studio style. Images are explicitly presented as illustrations rather than proof of the exact supplied vehicle. The inventory currently marks 16 profiles bookable and eight reference-only. Reference profiles do not present booking offers. The fleet specification contradiction for the manual Hyundai i10 was corrected; historical SEO copy no longer overrides current vehicle specifications.

Seven selected Naxos photographs and a 6.4-second Portara film were integrated from Pexels with visible source credits. Video loads only after the visitor selects play. The API key is absent from the implementation package and browser code.

## Research findings

Reviews default to highest rating first across all locales and surfaces, with newest first within equal ratings. The reviews page retains explicit newest/oldest sorting and rating filters. Vehicle quotes continue to use genuine model-specific reviews.

The workbook contains **162 deduplicated keyword-country pairs, 66 clusters, 51 excluded candidates, eight observed PAA questions, 47 SERP rows and eight observed AI Overview citation URLs**, across 24 sheets. It covers eight markets and seven languages: English, Greek, Italian, French and German are existing locales; Spanish and Dutch remain expansion proposals.

Ahrefs research consumed **4,325 API units** against the conservative 10,000-unit ceiling. Search volume is a vendor estimate, not a forecast of achievable traffic. Overlapping variants must not be summed.

| Market | Representative query | Estimated monthly volume | Decision |
|---|---|---:|---|
| Italy | noleggio auto naxos | 500 | Prioritize core and ferry-port intent; port query 150 |
| France | location voiture naxos | 350 | Prioritize port 200 and airport intent; variants overlap |
| Greece | ενοικιαση αυτοκινητου ναξος | 500 | Strengthen the complete Greek commercial journey; KD varies sharply by variant |
| United States | naxos car rental | 450 | Serve through the existing English locale |
| United Kingdom | naxos car rental | 150 | Serve through English; airport and port intent support conversion |
| Germany | mietwagen naxos | 200 | Strengthen German arrival and vehicle-selection journeys |
| Spain | alquiler coche naxos | 150 | Consider only after existing locale quality and measurement are complete |
| Netherlands | auto huren naxos | 60 | Lower-priority expansion; validate delivery capacity first |

Exact query-country metrics, dates and source IDs are retained in the workbook's Keyword Universe and Sources sheets. One UK query's average is distorted by an extreme May spike, so it is excluded from any implied steady-demand forecast. The workbook separates observations, estimates, inferences and proposals.

The German AI Overview snapshot contains eight source URLs and does not include this domain. This is one dated observation, not evidence of universal AI invisibility. A current ChatGPT answer cohort could not be obtained through the available provider access. No ranking or AI-citation guarantee is made.

The archived first-party Search Console export records 253 clicks and 10,032 impressions for its historical period. It is not a current performance baseline. Current GSC, GA4 and completed-booking data are still needed before assigning a defensible revenue or traffic forecast.

## First ten actions

### 1. Validate current facts and measurement — Days1–7

- **Page/cluster:** All commercial pages
- **Work:** Reconfirm inventory, images, prices, cover, deposit and handover. Connect current GSC, GA4 and provider conversion reporting.
- **Why:** Archived data and inventory contradictions limit decisions.
- **Evidence:** SRC-GSC-PAGES; SRC-REPO (workbook source IDs)
- **Business contribution:** Prevents incorrect booking expectations and creates a qualified baseline
- **Effort:** Medium; operator + analyst
- **Success measure:** Current signed facts and separate handoff/completed-booking events

### 2. Review the global redesign — Days1–10

- **Page/cluster:** Five locales, shared components
- **Work:** Review local visual implementation on real mobile and desktop, then approve release separately.
- **Why:** Common hierarchy and vehicle detail support comparison and booking.
- **Evidence:** SRC-REPO; WEB-ENJOY (workbook source IDs)
- **Business contribution:** Clearer conversion journey
- **Effort:** Medium; design + developer
- **Success measure:** Accessible navigation, responsive layout and functioning booking handoff

### 3. Optimize Italian homepage and port — Days7–20

- **Page/cluster:** C-it-core; C-it-port
- **Work:** Publish native-reviewed copy and actual ferry pickup evidence.
- **Why:** Core500, port150 and observed commercial SERP.
- **Evidence:** kw-it; serp-IT (workbook source IDs)
- **Business contribution:** Qualified Italian rental demand
- **Effort:** Medium
- **Success measure:** Locale landing engagement and confirmed booking outcomes

### 4. Optimize French pickup pages — Days7–20

- **Page/cluster:** C-fr-port; C-fr-airport
- **Work:** Complete port/airport instructions, title, photographs, return and delay process.
- **Why:** Port200; airport variants150/100; observed port questions.
- **Evidence:** kw-fr; discover-fr; serp-FR (workbook source IDs)
- **Business contribution:** Arrival-intent bookings
- **Effort:** Medium
- **Success measure:** Pickup-page qualified handoffs and policy/contact questions

### 5. Strengthen Greek core journey — Days10–25

- **Page/cluster:** C-el-core
- **Work:** Native-review homepage, pickup, pricing and payment journey.
- **Why:** Core500 but query variants show unstable KD.
- **Evidence:** kw-gr; kw-el-enrich; serp-GR (workbook source IDs)
- **Business contribution:** Domestic qualified booking demand
- **Effort:** Medium
- **Success measure:** Greek nonbrand GSC and provider bookings

### 6. Improve English core and decision guide — Days15–30

- **Page/cluster:** C-en-core; C-en-need-car
- **Work:** Serve GB and US on /en, add itinerary-led car-versus-bus evidence.
- **Why:** US450 core, GB150 core and observed PAA.
- **Evidence:** kw-us; kw-gb; serp-GB (workbook source IDs)
- **Business contribution:** International consideration and bookings
- **Effort:** Medium
- **Success measure:** Consistent country/locale cohorts, assisted bookings

### 7. Reconcile fleet and collections — Days20–40

- **Page/cluster:** C-en-fleet; automatic/family/SUV across locales
- **Work:** Confirm bookable models, transmission, luggage and correct image mapping. Photograph seven-seat luggage capacity.
- **Why:** Inventory is first-party advantage; old prose/images can mislead.
- **Evidence:** SRC-REPO; WEB-ENJOY (workbook source IDs)
- **Business contribution:** Better vehicle fit and fewer booking mismatches
- **Effort:** Medium / high
- **Success measure:** No spec contradictions; collection-to-booking engagement

### 8. Create an approved insurance reference — Days25–50

- **Page/cluster:** C-de-insurance and other locales
- **Work:** Publish accurate cover/excess/exclusions with effective date and direct source policy.
- **Why:** German AIO cites rental comparison sources.
- **Evidence:** serp-DE (workbook source IDs)
- **Business contribution:** Trust, informed bookings and possible reference value
- **Effort:** Medium; owner/policy review
- **Success measure:** Policy engagement; fixed-cohort observed citations

### 9. Finish inherited language gaps — Days31–60

- **Page/cluster:** Five existing locales
- **Work:** Remove English fallback strings, expand abbreviated arrival/guide copy and obtain native review before expanding locales.
- **Why:** Content validator still flags inherited fallbacks.
- **Evidence:** SRC-REPO (workbook source IDs)
- **Business contribution:** Complete multilingual visitor journey
- **Effort:** High editorial
- **Success measure:** Zero unintended English fallback and equal factual coverage

### 10. Evaluate then expand selectively — Days61–90

- **Page/cluster:** Portfolio; ES/NL candidates
- **Work:** Compare complete post-release periods and consistent AI cohorts; consider Spanish only after language capability exists.
- **Why:** ES150 representative; NL60. Current conversion baseline missing.
- **Evidence:** kw-es; kw-nl; DOC-GSC; DOC-BING (workbook source IDs)
- **Business contribution:** Evidence-led allocation and controlled market growth
- **Effort:** Medium
- **Success measure:** First-party qualified demand and repeatable citation/referral metrics

## Verification and limits

Theme and consent startup now run in Next.js client instrumentation before hydration. This removes the React script-tag warning during client refreshes. A one-time guard preserves consent state during Fast Refresh. Fresh-page, theme persistence and client navigation checks produced no console errors; isolated startup scenarios verify denied defaults and storage failure isolation.

ESLint, TypeScript and the production build pass. The route validator passes 410 sitemap URLs and 450 internal paths. Browser checks cover representative desktop and mobile layouts, the full-width mega-menu, fullscreen mobile menu, keyboard Escape and focus restoration, mobile dock, original WhatsApp SVG and click-to-play film. This is representative visual testing plus automated route coverage, not a screenshot audit of every locale URL.

Five inherited island-guide modules still contain English fallback values: `arrive`, `eat-stay`, `explore`, `plan-extra` and `plan`. The shared interface, new homepage and collection copy, fleet labels/features and location highlights have five-language coverage. The entire content library must not yet be described as fully localized. Native review remains appropriate before release.

Operator confirmation remains necessary for current fleet availability, prices, insurance, deposit/payment rules and pickup processes. The displayed review aggregate is an existing stored snapshot, not newly verified provider data. Production deployment, current rankings, field Core Web Vitals, analytics events, completed provider bookings and ongoing AI citations are NOT TESTED in this local handoff.

## Sources and provenance

The workbook contains source-level retrieval dates, evidence classes and the API cost ledger. The source evidence archive preserves provider responses, the live-page audit and image metadata. Historical first-party exports are retained in the repository's `docs/seo/blueprint` directory.

- [Google AI optimization guidance](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)
- [Google generative AI performance reports](https://developers.google.com/search/blog/2026/06/gen-ai-performance-reports)
- [OpenAI publisher and developer guidance](https://help.openai.com/en/articles/12627856-publishers-and-developers-faq)
- [Bing AI visibility reporting](https://blogs.bing.com/search/2026/6/New-AI-Visibility-Insights-in-Bing-Webmaster-Tools-Intents-Topics-Citation-Share-Compare/)
- [Pexels](https://www.pexels.com/), with individual photograph and video credits in the implementation
- [WhatsApp SVG source](https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg)

Crawler accessibility, structured data and useful localized content support discoverability; none establishes a guaranteed ranking or recommendation by an AI assistant. `llms.txt` is documentation, not a proven ranking factor.
