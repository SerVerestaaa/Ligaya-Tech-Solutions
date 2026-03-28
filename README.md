# ⚡ Ligaya Technology Solutions — Website

A premium, interactive tech company website built with React + Vite, Three.js (via React Three Fiber), Tailwind CSS, and Framer Motion.

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn

### 1. Install dependencies
```bash
npm install
```

### 2. Run development server
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Build for production
```bash
npm run build
npm run preview   # Preview the production build locally
```

---

## 📁 Project Structure

```
ligaya-tech/
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── package.json
└── src/
    ├── main.jsx              # Entry point
    ├── App.jsx               # Root component + preloader gate
    ├── index.css             # Global styles, CSS utilities
    ├── utils/
    │   └── animations.js     # Shared Framer Motion variants
    └── components/
        ├── Preloader.jsx     # Animated loading screen
        ├── CustomCursor.jsx  # Dot + ring cursor (desktop)
        ├── Navbar.jsx        # Glass navbar, scroll-aware
        ├── Hero.jsx          # 3D scene (React Three Fiber) + headline
        ├── Marquee.jsx       # Infinite scrolling ticker
        ├── About.jsx         # Brand story, mission, vision
        ├── Services.jsx      # 5 service cards + CTA card
        ├── Portfolio.jsx     # 4 case studies, filterable
        ├── WhyUs.jsx         # Advantages + process timeline
        ├── Testimonials.jsx  # Auto-advancing testimonial carousel
        ├── CTA.jsx           # Closing CTA with 3D knot
        ├── Contact.jsx       # Form + contact info sidebar
        └── Footer.jsx        # Links, newsletter, credits
```

---

## 🎨 Brand Identity

### Company Name
**Ligaya Technology Solutions**
*Ligaya* (Filipino) — joy, happiness, delight

### Color Palette
| Token     | Hex       | Usage                    |
|-----------|-----------|--------------------------|
| `cyan`    | `#00D4FF` | Primary accent, CTAs     |
| `purple`  | `#7B2FFF` | Secondary accent, glow   |
| `pink`    | `#FF2FBB` | Tertiary, POS service    |
| `void`    | `#03020F` | Deepest background       |
| `deep`    | `#07051A` | Section backgrounds      |
| `surface` | `#0D0B2A` | Card backgrounds         |

### Typography
- **Display:** Syne 800 — headlines, brand name, buttons
- **Body:** DM Sans — body copy, UI text
- **Mono:** JetBrains Mono — labels, tags, code snippets

---

## ✨ Features

### 3D / WebGL
- Distorted sphere with `MeshDistortMaterial` as hero focal point
- Three orbiting rings (cyan, purple, pink)
- Five floating wireframe icosahedra
- 400-particle field
- Mouse-reactive camera rig
- 3D TorusKnot in CTA section
- Star field via `@react-three/drei`

### Animations
- **Preloader:** Logo reveal + animated progress bar
- **Hero:** Staggered text entry
- **Sections:** Scroll-triggered `fadeUp`, `scaleIn`, `stagger`
- **Service cards:** 3D hover lift + glow
- **Portfolio:** Filter with `AnimatePresence` layout
- **Testimonials:** Auto-advancing with manual override
- **CTA 3D:** Continuous rotation

### UX
- Custom dot + ring cursor with link hover reaction
- Glassmorphism cards throughout
- Smooth scroll to section
- Mobile hamburger with animated icon
- Contact form with loading + success states
- Responsive on all screen sizes

---

## 🛠️ Tech Stack

| Library                  | Purpose                     |
|--------------------------|-----------------------------|
| React 18                 | UI framework                |
| Vite 4                   | Build tool                  |
| `@react-three/fiber`     | React renderer for Three.js |
| `@react-three/drei`      | R3F helpers / utilities     |
| Three.js                 | 3D engine                   |
| Framer Motion            | Animations                  |
| Tailwind CSS             | Utility-first styling       |
| `react-intersection-observer` | Scroll-trigger         |

---

## 🌐 Deployment

### Vercel (recommended)
```bash
npm i -g vercel
vercel
```

### Netlify
```bash
npm run build
# Drag the `dist/` folder to Netlify's deploy UI
```

### GitHub Pages
```bash
npm run build
# Push dist/ contents to gh-pages branch
```

---

## 📝 Customization Checklist

- [ ] Replace placeholder contact info in `Contact.jsx`
- [ ] Update social links in `Footer.jsx` and `Contact.jsx`
- [ ] Swap portfolio projects in `Portfolio.jsx` with real work
- [ ] Add real testimonials in `Testimonials.jsx`
- [ ] Connect form to backend (Formspree, EmailJS, or custom API)
- [ ] Add favicon to `/public/favicon.svg`
- [ ] Update meta tags in `index.html`

---

## 📄 License
MIT — free to use and modify for commercial projects.

Built with ♥ in the Philippines.
