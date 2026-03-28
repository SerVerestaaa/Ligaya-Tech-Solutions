# How This Ligaya Website Works — Plain English

This guide is for **anyone** who wants to understand what the project does **without** deep programming knowledge.  
For the **technical / engineer-level** map (tools, every file name, stack details), open **`Ligaya-Tech-Stack-Guide.md`**.

---

## The big picture

Think of this project as a **digital brochure and office** for **Ligaya Technology Solutions**:

- Visitors see **pages** (home, booking, FAQ, legal pages, case studies, and more).
- Behind the scenes, **instructions written in code** tell the computer how to draw those pages, handle forms, run optional chat, and show things like the **3D animations**.

The code is organized into **folders** (like drawers in a filing cabinet). Each drawer has a job.

---

## What you see in the browser vs what is “under the hood”

| What a normal visitor sees | What that usually is, in simple terms |
|----------------------------|----------------------------------------|
| The long **homepage** with sections (about, services, portfolio, etc.) | One main screen built by stacking many **blocks** (components). |
| Separate addresses like `/book`, `/faq`, `/privacy` | **Different pages** — each is its own screen. |
| **Dark background right away** | The layout includes a small **inline safety stylesheet** so the page isn’t a blank white screen if the main CSS bundle fails to load (wrong URL / deploy path). There is **no** full-screen “boot” overlay anymore — the homepage shows as soon as the app loads. |
| **Menu, footer, contact form** | Reusable **blocks** used in more than one place. |
| **Moving 3D graphics** (hero + laptop) | Special **3D scenes** — like a video game style drawing — that run in the browser. |
| **Chat bubble** (if enabled) | A **helper panel** that can talk to AI on the server (needs setup and keys). |
| **Cookie banner** | Asks permission before loading things like analytics. |

---

## Main folders (the “filing cabinet”)

### `src/app/` — **Address book for the website**

Each **route** (URL path) lives here. These files are mostly **thin**: they say “this address shows **this** screen” and set **search-engine title/description** for that address.  
They do **not** hold all the paragraph text and layout by themselves — they usually **point to** the bigger files in `site-pages/`.

### `src/site-pages/` — **Full page layouts**

These files are where **whole screens** are assembled: for example the **full homepage**, **book-a-call page**, **FAQ page**, **policy pages**, **case study** screen, **404** page.

If someone says “change the Book page,” you’re often looking **here** (or in `components/` that page uses).

### `src/components/` — **Reusable building blocks**

**Components** are UI **pieces** used in one or many pages: navigation bar, footer, testimonials strip, “Ready to build?” section, contact form area, modals, etc.

- **`components/three/`** — The **3D-only** pieces: the **big hero** graphic and the **laptop** in the CTA section (with optional picture on the screen).

### `public/` — **Plain files anyone can download**

Images the site links to directly, **robots** instructions for search engines, maybe a **company profile** PDF/HTML, etc. Not “logic” — just **files** the browser requests by URL.

### `docs/` — **Human explanations**

**This plain-English file** and the **detailed technical guide** live here. They are **not** shown on the public website unless you deploy them on purpose.

### `server/` — **Private “brain” for the chat (optional)**

Instructions that run **on the server** so **API keys stay secret**. The **chat** on the site can call the server; the visitor never sees the keys.

### `.next/` — **Machine-generated output**

When you **build** the site for production, Next.js writes compiled files here. **Don’t edit** this folder; it is recreated when you build.

---

## Common files at the project root (still simple)

| File / folder | In one sentence |
|---------------|-----------------|
| **`package.json`** | **Recipe list**: what tools the project depends on and scripts like “start dev server” / “build.” |
| **`next.config.mjs`** | **Settings** for how Next.js builds and runs this project. |
| **`tailwind.config.js`** | **Brand style shortcuts** — colors, fonts, animations used across the site. |
| **`jsconfig.json`** | Lets developers import with short paths like `@/components/...`. |
| **`.env.example`** | **Checklist** of secret/settings names (copy to `.env` for your machine). |

---

## Special features, explained simply

### Smooth scrolling (Lenis)

Makes **mouse wheel** scrolling feel softer and more “premium.” Only used on the **homepage** flow where it fits best.

### Motion (Framer Motion)

**Fades, slides, small movements** when sections appear or when you change pages — polish, not required for the words to exist.

### 3D (Three.js)

**Hardware-heavy graphics**: the **hero** background object and the **gaming laptop** in the “ready to build” area. You can **drag** to rotate the laptop; it may also **spin slowly** on its own. The **picture on the laptop screen** is an image file from **`public/`**.

### Forms (contact / booking)

Forms send data through **Web3Forms** (or demo mode if no key). Booking can embed a **calendar** link when configured.

### Chat assistant

A **floating help** widget. If the server has **AI keys** set up, answers can come from a real model; otherwise it can fall back to **FAQ-style** answers. This touches **`/api/chat`** in the app.

### SEO (search engines)

**Titles, descriptions, and sharing previews** are set per page so Google and social apps show sensible text when someone shares a link.

---

## How the two docs work together

| Document | Who it’s for |
|----------|----------------|
| **`Ligaya-Website-Plain-English.md`** (this file) | **Everyone** — big picture, folders, “what does this do?” |
| **`Ligaya-Tech-Stack-Guide.md`** | **Developers / engineers** — exact tools, file lists, stack tables |

---

## How you actually open the site (local)

| Step | What to do |
|------|------------|
| 1 | In the project folder, run **`npm install`** once (or after dependencies change). |
| 2 | Run **`npm run dev`**. |
| 3 | In the browser, open **`http://localhost:3000`**. |

To put the site on the **public internet**, use a host such as **Vercel** (import the Git repo) or any Node host that runs **`npm run build`** then **`npm run start`**. If the site lives in a **subfolder** of a domain, the project supports optional env vars **`NEXT_PUBLIC_BASE_PATH`** / **`NEXT_PUBLIC_ASSET_PREFIX`** (see `next.config.mjs`).

---

## Quick “where do I change X?”

| I want to… | Start looking… |
|------------|----------------|
| Change homepage sections order or add a block | `src/site-pages/HomePage.jsx` and `src/components/` |
| Change colors or fonts sitewide | `tailwind.config.js` + `src/app/globals.css` |
| Change navbar or footer | `src/components/Navbar.jsx`, `Footer.jsx` |
| Change legal wording | `src/site-pages/*Policy*.jsx` and related |
| Change FAQ text | `src/data/faq.js` and/or FAQ components |
| Change case studies | `src/data/caseStudies.js` + case study page |
| Change 3D laptop or screen image | `src/components/three/CtaLaptopScene.jsx` + image in `public/` |
| Change site name / default description for Google | `src/siteConfig.js` and app `metadata` in `src/app/` |
| Change **team** names / roles on the homepage | `src/components/TeamSection.jsx` |

---

*This is a plain-language companion to the technical stack guide — not a legal or business document.*
