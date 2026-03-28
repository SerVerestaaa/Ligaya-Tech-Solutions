# Ligaya Technology Solutions — Tech Stack & Project Guide

This document describes the languages, tools, folder layout, and every `src` JSX file in the project. You can open this file in **Notepad**, **Word**, **VS Code**, or **Cursor**.

**Prefer a non-technical overview?** See **`Ligaya-Website-Plain-English.md`** in the same folder.

---

## 1. Core stack (languages & runtimes)

| Layer | What we use |
|--------|-------------|
| **Language** | **JavaScript (ES modules)** — `package.json` has `"type": "module"`. There is **no TypeScript** in `src`; UI files are **`.jsx`**. |
| **UI library** | **React 18** (`react`, `react-dom`) — component-based UI. |
| **Framework** | **Next.js 14** (App Router) — `src/app/` for routes, file-based routing, server API routes. |
| **React entry** | **`src/app/layout.jsx`** — root layout, fonts, metadata, wraps `ClientRoot`. |
| **Routing** | **Next.js routing** — `src/app/**/page.jsx` maps to URLs; `next/link` + `next/navigation` (no React Router). |
| **Styling** | **Tailwind CSS 3** + **PostCSS** + **Autoprefixer** — utility classes in JSX; brand tokens (colors, fonts, animations) in `tailwind.config.js`. Global styles in **`src/app/globals.css`**. Root layout imports **`lenis/dist/lenis.css`**. |
| **Motion** | **Framer Motion** — page transitions, hero motion, `MotionConfig` with `reducedMotion: "user"`. |
| **Smooth scroll** | **Lenis** (`ReactLenis` on `HomePage`) — smooth/inertial scrolling. |
| **3D / WebGL** | **Three.js** + **React Three Fiber** (`@react-three/fiber`) + **Drei** (`@react-three/drei`) — e.g. `Canvas`, `useTexture`, `OrbitControls`, `Environment`. |
| **Charts** | **Recharts** — metrics / charts where used (e.g. performance proof). |
| **Icons** | **react-icons**. |
| **SEO / document head** | **Next.js Metadata API** — `export const metadata` / `generateMetadata` in `app` routes; `viewport` in root layout. |
| **Scroll / visibility** | **react-scroll**, **react-intersection-observer** — anchors and in-view detection where used. |
| **Chat (optional backend)** | **`server/`** — shared LLM logic. **`src/app/api/chat/route.js`** — Next.js Route Handler at **`/api/chat`**. |

**In plain terms:** JavaScript + **Next.js 14** + React + Tailwind, with Framer Motion, Lenis, and Three.js (via React Three Fiber) for motion and 3D.

---

## 2. npm scripts & dependencies (summary)

From `package.json`:

- **Scripts:** `dev` (`next dev`), `build` (`next build`), `start` (`next start`), `lint`.
- **Main dependencies:** `next`, `@react-three/drei`, `@react-three/fiber`, `framer-motion`, `lenis`, `react`, `react-dom`, `react-icons`, `react-intersection-observer`, `react-scroll`, `recharts`, `three`.
- **Dev dependencies:** `eslint`, `eslint-config-next`, `autoprefixer`, `postcss`, `tailwindcss`.

---

## 3. Top-level folders

| Path | Role |
|------|------|
| **`src/`** | Application source: `app/`, `components/`, `site-pages/`, hooks, context, data, utils. |
| **`public/`** | Static files at the site root (e.g. `/cta-laptop-screen.png`, `/robots.txt`). Next serves them as-is in dev and copies them into the deploy output. |
| **`next.config.mjs`** | Next.js config (`transpilePackages: ['three']`, optional `NEXT_PUBLIC_BASE_PATH` / `NEXT_PUBLIC_ASSET_PREFIX` for subpath or CDN asset URLs). |
| **`jsconfig.json`** | Path alias `@/*` → `src/*`. |
| **`tailwind.config.js`** | Tailwind theme: Ligaya colors (`void`, `cyan`, `purple`, …), fonts, keyframe animations. |
| **`postcss.config.js`** | PostCSS pipeline (Tailwind + Autoprefixer). |
| **`package.json` / `package-lock.json`** | Dependencies and lockfile. |
| **`.next/`** | Next.js build output (`npm run build`) — do not edit by hand. |
| **`node_modules/`** | Installed packages. |
| **`server/`** | Server-side chat / LLM code imported by **`src/app/api/chat/route.js`**. |
| **`src/app/api/`** | Next.js Route Handlers (e.g. `chat/route.js` → `GET`/`POST` `/api/chat`). |
| **`docs/`** | Project documentation (including this file). |

---

## 4. Inside `src/`

| Path | Role |
|------|------|
| **`app/layout.jsx`** | Root layout: metadata, viewport, fonts, **`globals.css`**, small **inline critical CSS** (fallback if main CSS fails), `ClientRoot`. |
| **`app/client-root.jsx`** | Client shell: booking modal, cookie consent, analytics loader, chat, cursors, sound toggle, skip link — **no full-screen boot preloader** (page content mounts immediately). |
| **`app/globals.css`** | Tailwind layers + global/custom CSS. |
| **`siteConfig.js`** | (JavaScript) Site name, URL helpers, default meta description, OG image helper. |
| **`components/`** | Reusable UI sections and widgets. |
| **`components/three/`** | WebGL scenes (hero `Canvas`, CTA laptop, legacy energy scene). |
| **`app/**/page.jsx`** | Route entries (thin wrappers + `metadata`). |
| **`site-pages/`** | Full-page React views imported by `app` routes (renamed from `pages` to avoid conflicting with Next’s Pages Router). |
| **`context/`** | React Context: booking modal, section scroll helpers. |
| **`hooks/`** | Custom hooks (focus trap, UI sound, **`useMounted`** for `createPortal` after hydration, …). |
| **`utils/`** | (JavaScript) Animations helpers, calendar, chat client helpers, UI feedback. |
| **`constants/`** | (JavaScript) e.g. consent-related constants. |
| **`data/`** | (JavaScript) Static data: FAQs, case studies, etc. |

---

## 5. JSX modules under `src` (inventory)

### Entry & app shell

| File | Purpose |
|------|---------|
| **`app/layout.jsx`** | Root HTML, fonts, default metadata, wraps children with `ClientRoot`. |
| **`app/client-root.jsx`** | Global overlays: booking modal, consent, analytics, chat, cursors, sound, skip link (see above). |
| **`app/error.jsx`** | App Router **error boundary** — friendly fallback if a client segment throws. |

### Site pages (`src/site-pages/`)

| File | Purpose |
|------|---------|
| **`HomePage.jsx`** | Full homepage: Lenis, section scroll context, stacks all main sections + JSON-LD. |
| **`BookPage.jsx`** | Booking page. |
| **`FaqPage.jsx`** | Standalone FAQ page. |
| **`InsightsPage.jsx`** | Insights content page. |
| **`CaseStudyPage.jsx`** | Case study detail by URL `slug`. |
| **`app/services/[[...slug]]/page.jsx`** | Client redirect from `/services/*` to `/#services`. |
| **`PrivacyPolicyPage.jsx`** | Privacy policy. |
| **`TermsOfServicePage.jsx`** | Terms of service. |
| **`RefundPolicyPage.jsx`** | Refund policy. |
| **`CookiePolicyPage.jsx`** | Cookie policy. |
| **`SitemapPage.jsx`** | Sitemap page for users. |
| **`NotFoundPage.jsx`** | 404 fallback route. |

### Layout & global UI (`src/components/`)

| File | Purpose |
|------|---------|
| **`Navbar.jsx`** | Site navigation. |
| **`Footer.jsx`** | Site footer. |
| **`SkipLink.jsx`** | Accessibility: skip to main content. |
| **`PageTransition.jsx`** | Framer Motion transitions for routed content. |
| **`Preloader.jsx`** | Boot-sequence UI **component file** (timers + motion) — **not currently mounted** from `ClientRoot`; kept for optional reuse. |
| **`BackToTop.jsx`** | Scroll-to-top control. |
| **`SoundToggle.jsx`** | UI sound toggle. |
| **`CustomCursor.jsx`** | Custom cursor (desktop). |
| **`CursorSpotlight.jsx`** | Cursor-following spotlight. |
| **`OrganizationJsonLd.jsx`** | Organization structured data (JSON-LD). |
| **`CookieConsent.jsx`** | Cookie / consent banner. |
| **`AnalyticsLoader.jsx`** | Loads analytics according to consent. |
| **`ChatAssistant.jsx`** | Chat UI wired to `/api/chat`. |
| **`BookingModal.jsx`** | Booking modal container. |
| **`BookingPanel.jsx`** | Booking form / panel content. |
| **`PolicyPageLayout.jsx`** | Shared layout for long policy pages. |

### Homepage sections (`src/components/`)

| File | Purpose |
|------|---------|
| **`Main.jsx`** | Hero: lazy `HeroCanvas`, motion, CTAs, overlays. |
| **`TrustSignals.jsx`** | Trust strip (logos / signals). |
| **`Marquee.jsx`** | Scrolling marquee. |
| **`ProcessStrip.jsx`** | Process / steps strip. |
| **`About.jsx`** | About section. |
| **`TeamSection.jsx`** | Team section. |
| **`CeoMessage.jsx`** | CEO message block. |
| **`Services.jsx`** | Services overview. |
| **`PricingTeaser.jsx`** | Pricing teaser. |
| **`Portfolio.jsx`** | Portfolio / projects preview. |
| **`PerformanceProof.jsx`** | Proof / metrics (charts). |
| **`WhyUs.jsx`** | Why choose us. |
| **`Testimonials.jsx`** | Testimonials. |
| **`CTA.jsx`** | “Ready to build?” CTA with 3D laptop `Canvas`. |
| **`FAQ.jsx`** | Homepage FAQ block. |
| **`FaqAccordion.jsx`** | Accordion rows for FAQs. |
| **`Contact.jsx`** | Contact section / form. |

### Three.js (`src/components/three/`)

| File | Purpose |
|------|---------|
| **`HeroCanvas.jsx`** | Hero WebGL scene (lazy-loaded from `Main.jsx`). |
| **`CtaLaptopScene.jsx`** | CTA gaming laptop: texture screen, lights, `OrbitControls`, auto-rotate. |
| **`CtaEnergyScene.jsx`** | Legacy abstract CTA scene (may be unused if CTA only imports laptop). |

### Context (`src/context/`)

| File | Purpose |
|------|---------|
| **`BookingModalContext.jsx`** | Booking modal open/close state. |
| **`SectionScrollContext.jsx`** | Helpers to scroll to section IDs. |

---

## 6. Request flow (how the app boots)

1. Next serves **`src/app`** routes (SSR/SSG as configured).
2. **`layout.jsx`** applies global + **critical** styles; **`ClientRoot`** wraps **page `children`** immediately (overlays on top: modal, chat, cursors, etc.).
3. **`/`** → **`app/page.jsx`** → **`HomePage`**: Lenis + stacked sections.
4. **`Main`** lazy-loads **`HeroCanvas`** inside **`Suspense`**.
5. **`CTA`** renders another **`Canvas`** with **`CtaLaptopScene`**; screen image from **`public/`** (e.g. `/cta-laptop-screen.png`).
6. Chat calls **`/api/chat`** via **`src/app/api/chat/route.js`**, using **`server/`** code.

**Note:** **`BookingModal`** and **`ChatAssistant`** portal to `document.body` only **after** `useMounted()` flips true, so the first client render matches SSR (avoids hydration mismatches).

---

## 7. What this project is not

- **Not TypeScript** (app source is JS/JSX).
- **Next.js App Router** — not a Vite SPA; use **`npm run dev`** / **`npm run build`**.
- **No primary CSS-in-JS library** — Tailwind + **`globals.css`** carry most styling.

---

## 8. Opening this file

| App | How |
|-----|-----|
| **Notepad** | File → Open → choose `docs\Ligaya-Tech-Stack-Guide.md` (opens as plain text). |
| **Word** | Open the `.md` file, or copy all content into a new `.docx` and save. |
| **Cursor / VS Code** | Open the file for Markdown preview (optional). |

---

*Generated as a project reference for Ligaya Technology Solutions.*
