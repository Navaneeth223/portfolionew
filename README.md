# Navaneeth KV — Full Stack Developer Portfolio

[![Next.js](https://img.shields.io/badge/Next.js-16.3-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Three.js](https://img.shields.io/badge/Three.js-WebGL-black?style=for-the-badge&logo=threedotjs&logoColor=white)](https://threejs.org/)
[![GSAP](https://img.shields.io/badge/GSAP-ScrollTrigger-88CE02?style=for-the-badge&logo=greensock&logoColor=white)](https://greensock.com/gsap/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

> A single-page, award-tier developer portfolio built for **Navaneeth KV** — Junior Full Stack / MERN Stack Developer at Druv360 and freelance software engineer. Designed with a persistent 3D WebGL node-network scene, deliberate motion, terminal boot preloader, left progress rail, and 100% verbatim production data.

---

## ⚡ Key Highlights & Architecture

- **Persistent 3D Node Network (`ThreeBackground.tsx`)**:
  - Full-viewport WebGL canvas powered directly by **Three.js** (client-only `ssr: false`).
  - ~200 particles arranged in a spherical cloud volume connected by thin lines to nearest neighbors, featuring a central wireframe icosahedron core.
  - Scroll-scrubbed rotation via GSAP ScrollTrigger, mouse parallax drift, and click burst pulse uniform.
  - Mobile optimized (reduces node count under 768px viewports).
- **Deploy Log Boot Sequence (`Preloader.tsx`)**:
  - Terminal-style boot narration (`booting portfolio.exe...`, `connecting druv360...`).
  - Animated `0 → 100` progress counter with a signal green indicator line.
  - Respects `prefers-reduced-motion`.
- **Persistent Progress Rail (`ProgressRail.tsx`)**:
  - Left vertical navigation rail filled proportionally to actual scroll position.
  - Section path ticks (`~/about`, `~/stack`, `~/work`, `~/timeline`, `~/contact`) with active signal green highlight and click-to-scroll functionality.
- **Custom Precision Physics Cursor (`CustomCursor.tsx`)**:
  - Precision signal green dot + elastic trailing velocity ring.
  - Interactive element hover scaling with contextual micro-labels (`VIEW`, `TALK`, `OPEN`) and click shockwave.
  - Cross-platform support (trackpads, mice, touchscreen laptops, and multi-monitor setups).
- **Text Scramble / Decrypt (`useScramble.ts`)**:
  - Per-character cycling glyph reveal algorithm (`!<>-_\/[]{}—=+*^?#0123456789`) on hero name, section headings, and contact heading.
- **Strict Color & Typography System**:
  - **Color**: `#0B0D0A` (Near-black bg), `#14170F`/`#1A1D14` (Surfaces), `#F2F0E6` (Bone text), `#7CFF9E` (Signal accent).
  - **Typography**: **Bricolage Grotesque** (Headlines), **IBM Plex Sans** (Body), **JetBrains Mono** (HUD readouts, path ticks, micro-labels). Strictly **NO Inter font**.

---

## 📁 Repository Structure

```
src/
├── app/
│   ├── globals.css           # Design tokens, fonts, custom animations & scrollbar
│   ├── layout.tsx            # Root layout with Google Fonts & hydration fixes
│   └── page.tsx              # Single-page layout composing all sections
├── components/
│   ├── CustomCursor.tsx      # Precision dot + elastic trailing physics ring
│   ├── Footer.tsx            # Copyright, socials & back-to-top button
│   ├── Icons.tsx             # Inline SVG icons for GitHub & LinkedIn
│   ├── Nav.tsx               # Monogram logo mark, magnetic CTA & mobile drawer
│   ├── Preloader.tsx         # Deploy sequence boot log & counter
│   ├── ProgressRail.tsx      # Fixed left section path navigation rail
│   ├── RevealOnScroll.tsx    # GSAP ScrollTrigger reveal wrapper
│   ├── ThreeBackground.tsx   # Fixed WebGL 3D node network canvas (Three.js)
│   └── sections/
│       ├── About.tsx         # Bio paragraph & 4 animated count-up stat cards
│       ├── Contact.tsx       # Scramble heading, magnetic email CTA & phone lines
│       ├── Experience.tsx    # Scroll-scrubbed timeline & credentials panel
│       ├── Hero.tsx          # Asymmetric left-aligned hero with scramble title
│       ├── Marquee.tsx       # Infinite continuous horizontal tech stack loop
│       ├── MoreWork.tsx      # 20+ shipped projects categorized into 3 grids
│       ├── Projects.tsx      # 5 featured 3D tilt cards with generative CSS visuals
│       └── Skills.tsx        # 6 skill clusters with border-glow tags
├── hooks/
│   ├── useCountUp.ts         # Numeric count-up animation hook
│   ├── useMagnetic.ts        # Magnetic hover button translation hook
│   ├── useScramble.ts        # Text decrypt/scramble glyph hook
│   └── useTilt.ts            # 3D card tilt physics hook
└── lib/
    ├── data.ts               # 100% verbatim profile, skills & project data
    └── gsap.ts               # GSAP & ScrollTrigger client registration
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v18.0.0 or higher (v24.x recommended)
- **npm**: v9.0.0 or higher

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Navaneeth223/portfolionew.git
   cd portfolionew
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. Build for production:
   ```bash
   npm run build
   npm run start
   ```

---

## 🛠️ Stack & Technologies

| Category | Technology |
| :--- | :--- |
| **Framework** | Next.js 14+ (App Router, Turbopack) |
| **UI Library** | React 19, TypeScript |
| **Styling** | Tailwind CSS v4 |
| **3D / WebGL** | Three.js |
| **Animation** | GSAP, ScrollTrigger |
| **Icons** | Lucide React, Custom SVGs |
| **Fonts** | Bricolage Grotesque, IBM Plex Sans, JetBrains Mono |
| **Deployment** | Vercel |

---

## 👤 Profile & Contact

- **Name**: Navaneeth KV
- **Role**: Junior Full Stack / MERN Stack Developer
- **Company**: Druv360 (Muscat, Oman) / Freelance (Worldwide)
- **Email**: navaneethkv1002@gmail.com
- **GitHub**: [github.com/Navaneeth223](https://github.com/Navaneeth223)
- **LinkedIn**: [linkedin.com/in/navaneeth-kv-270386214](https://www.linkedin.com/in/navaneeth-kv-270386214)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
