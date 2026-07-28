# Fast Motor Rental Naxos

Multilingual marketing + booking website for **Fast Motor Rental Naxos** — rental cars on Naxos with free delivery to the airport, port and hotel.

Built with **Next.js 16 (App Router, Turbopack)**, **React 19**, **TypeScript** and **Tailwind CSS 4**. Fully SSR/SSG, SEO-optimised with per-page canonicals on `https://naxos-carrentals.com/`, hreflang for 5 locales, JSON-LD (Organization, LocalBusiness, AutoRental, Vehicle/Product, FAQPage, Article, BreadcrumbList, WebSite + SearchAction), dynamic OG images, sitemap, robots, manifest and `llms.txt`.

## Tech stack

- **Framework**: Next.js 16.2 (App Router, Turbopack)
- **UI**: React 19, Tailwind CSS 4, lucide-react, Radix primitives
- **i18n**: 5 locales (`en`, `el`, `it`, `fr`, `de`) with locale-prefixed routing and an `accept-language` redirect via `proxy.ts`
- **Theme**: light/dark/system with no-flash inline script, persisted in `localStorage("fmr-theme")`
- **SEO**: per-page metadata via `lib/seo.ts` + `lib/seoCopy.ts`, JSON-LD via `lib/schema.ts`
- **Deployment target**: Vercel

## Getting started

```bash
npm install
npm run dev          # http://localhost:3000
npm run typecheck    # tsc --noEmit
npm run build        # production build (Turbopack)
npm run start        # serve the production build locally
```

## Project structure

```
src/
├── app/
│   ├── robots.ts                      # /robots.txt
│   ├── sitemap.ts                     # /sitemap.xml (with hreflang alternates)
│   ├── manifest.ts                    # /manifest.webmanifest
│   ├── llms.txt/                      # LLM index for AI crawlers
│   ├── llms-full.txt/                 # full content dump for AI crawlers
│   ├── api/og/                        # dynamic OG image (next/og)
│   └── [locale]/
│       ├── layout.tsx                 # localized root layout, consent, header, footer, JSON-LD
│       ├── page.tsx                   # home
│       ├── fleet/                     # hub + category + vehicle detail
│       ├── locations/                 # hub + per-location detail
│       ├── pricing/  insurance/  faq/ guides/ about/ contact/ terms/ book/
├── components/
│   ├── layout/                        # Header, Footer, MobileMenu, ThemeToggle, Breadcrumbs, WhatsAppFab
│   ├── fleet/VehicleCard.tsx
│   ├── faq/ContextualFaq.tsx
│   └── seo/JsonLd.tsx
├── content/                           # fleet, locations, faqs, guides, reviews (multilingual)
├── i18n/                              # Dict type + locale dictionaries
├── proxy.ts                           # Next.js 16 proxy (locale auto-redirect)
├── lib/
│   ├── site.ts                        # SITE constants, LOCALES
│   ├── seo.ts                         # buildMetadata + seoFor helpers
│   ├── seoCopy.ts                     # per-page metadata for all 5 locales
│   ├── schema.ts                      # JSON-LD generators
│   └── whatsapp.ts
├── types/content.ts
public/logo-final.svg
```

## Deploy on Vercel

1. Push this repo to GitHub.
2. Go to <https://vercel.com/new>, import the repo, and accept the auto-detected Next.js settings.
3. Add the production domain `naxos-carrentals.com` in **Project Settings → Domains**.
4. No environment variables are required for the current build. (If you later wire analytics or an email provider, add them in **Project Settings → Environment Variables**.)
5. Trigger a deploy. Vercel will run `next build` (Turbopack) and serve the statically generated localized routes.

### Vercel build settings

| Setting              | Value             |
| -------------------- | ----------------- |
| Framework Preset     | Next.js           |
| Build Command        | `next build`      |
| Install Command      | `npm install`     |
| Output Directory     | (default)         |
| Node.js Version      | 20.x              |

## SEO highlights

- Per-page absolute canonicals on `https://naxos-carrentals.com/`
- hreflang for `en`, `el`, `it`, `fr`, `de` + `x-default = en`
- Hand-written `<title>` (≤65 chars) and `<meta description>` (≤160 chars) for every page in all 5 locales (see `src/lib/seoCopy.ts`)
- Dynamic OG images at `/api/og?title=...`
- JSON-LD: `Organization`, `LocalBusiness/AutoRental`, `WebSite + SearchAction`, `BreadcrumbList`, `FAQPage`, `Product/Vehicle`, `Article` for guides, `Place` for locations
- `robots.txt` allows all major search engines and AI crawlers (GPTBot, Google-Extended, ClaudeBot, PerplexityBot, CCBot)
- `sitemap.xml` with alternates per locale

## License

Proprietary — © Fast Motor Rental Naxos. All rights reserved.
