# NovaNest — Luxury Real Estate Landing Page

A modern, high-fidelity luxury real estate landing page built with **Next.js 16 (App Router)**, **React 19**, and **Tailwind CSS v4**, faithfully implementing the Figma design specifications.

---

## 🌟 Overview & Implemented Features

### 1. Navigation & Layout
- **Fixed Translucent Glass Navbar (`src/components/layout/Navbar.jsx`)**:
  - Translucent dark glass (`bg-brand-forest-900/60` to `85%` with `backdrop-blur-md`).
  - Dynamic scroll effect responding to page position.
  - Inline SVG NovaNest logo mark with stylized architectural towers, orbital swoop rings, and star sparkles.
  - Smooth-scrolling anchor navigation (`#categories`, `#exclusive-offers`, `#popular-ads`, `#testimonials`).
  - Dual CTAs: *"Explore Properties"* (primary pill) and *"Contact Us"* (outline pill).
  - Responsive mobile drawer menu with hamburger toggle.
- **Multi-Column Footer (`src/components/layout/Footer.jsx`)**:
  - Brand identity statement and logo.
  - Quick Links, Company Info, and Popular Searches columns.
  - Designer credit: **"Design by Seda Sen"**.
  - Social media vector links: X (Twitter), YouTube, Instagram, and LinkedIn.

### 2. Hero Section (`src/components/sections/Hero.jsx`)
- High-impact display headline: *"Discover your nest in the nova of luxury living."*
- Curated editorial copy and dual call-to-action buttons.
- Isometric 3D luxury villa illustration with warm lighting and landscaping.
- Decorative solid gold accent circle (`#FFCB4A`) and concentric translucent sage rings.
- Subtle background gradient (`linear-gradient(135deg, #26433E 0%, #1F3833 55%, #162928 100%)`).

### 3. Explore Categories (`src/components/sections/ExploreCategories.jsx`)
- Horizontally scrollable snap carousel with smooth scroll physics (`snap-x snap-mandatory`).
- Interactive circular arrow navigation controls (Left / Right).
- **Category Cards (`src/components/ui/CategoryCard.jsx`)**:
  - `brand-cream-50` background with rounded corners (`rounded-[24px]`).
  - Aspect ratio cover images with smooth hover scale effects.
  - Categories: *Apartment Residences (7,200 Properties)*, *Modern Villas (966 Properties)*, *Farm Houses (245 Properties)*, and more.

### 4. Exclusive Offers (`src/components/sections/ExclusiveOffers.jsx`)
- Alternating feature blocks highlighting discounted properties:
  - **Feature 1**: *Elegant Apartment* — $600,000 (discounted from $625,000) in Downtown Metropolitan Area.
  - **Feature 2**: *Coastal Villa Retreat* — $1,200,000 (discounted from $1,350,000) on Beachfront Boulevard.
- Fanned / stacked multi-layer property photo cards with rotation and shadow depth.
- Property specification badges with custom vector icons (Area `m²`, Bedrooms, Bathrooms).
- Decorative gold circle and concentric rings.

### 5. Popular Ads of This Week (`src/components/sections/PopularAds.jsx`)
- **2×2 Property Grid (`src/components/ui/PropertyCard.jsx`)**:
  - *Urban Oasis* ($500,000 · 120m² · 2 Beds · 2 Baths)
  - *Coastal Serenity* ($1,200,000 · 250m² · 4 Beds · 3 Baths)
  - *Contemporary Haven* ($2,000,000 · 400m² · 5 Beds · 4 Baths)
  - *Tranquil Farmstead* ($800,000 · 800m² · 3 Beds · 2 Baths)
- **Tall Newsletter Subscription Panel**:
  - Rich gold-to-sage textured gradient (`linear-gradient(160deg, #FFBE17 0%, #6A9285 100%)`).
  - NovaNest logo badge and persuasive copy (*"The most intriguing, unique, and novel offers."*).
  - Interactive email subscription form with state feedback.

### 6. Mobile Application (`src/components/sections/MobileApp.jsx`)
- Dual overlapping modern smartphone mockups showing NovaNest app screens.
- App overview copy.
- Pill-shaped store download buttons in dark ink finish (`bg-ink-900`):
  - Apple App Store button with official Apple glyph.
  - Google Play Store button with multi-color triangle mark.

### 7. Testimonials (`src/components/sections/Testimonials.jsx`)
- Interactive client quote carousel with previous/next controls.
- Active slide on `brand-cream-50` card:
  - Property photo on the left.
  - Large quotation mark outline glyph (`99` style).
  - Property title, community, and specification stats.
  - Reviewer avatar (Emily Johnson) and testimonial quote.
- Peeking adjacent property photo with interactive click-to-advance preview.

### 8. Final Call-to-Action (`src/components/sections/FinalCta.jsx`)
- Floating cream card (*"Begin your property listing or purchasing journey with NovaNest."*).
- Striking black modern A-frame house breaking outside the top edge of the card.
- Primary *"Get Started"* CTA button.

---

## 🎨 Design System & Tokens

### Color Palette

| Token | Hex | Usage |
|---|---|---|
| `brand-forest-900` | `#162928` | Navbar glass base / darkest gradient stop |
| `brand-forest-800` | `#1F3833` | Primary page background (mid) |
| `brand-forest-700` | `#26433E` | Primary page background (lighter stop) |
| `brand-forest-600` | `#345850` | Dividers and borders on dark surfaces |
| `brand-sage-500` | `#5E8479` | Primary button fill (*"Explore Properties"*), hover states |
| `brand-sage-400` | `#749D90` | Button hover accents and subtle borders |
| `brand-sage-300` | `#9DC9BB` | Secondary / muted text on dark backgrounds |
| `brand-cream-50` | `#F4FFFB` | Card surfaces, headings on dark bg, body copy |
| `brand-gold-400` | `#FFCB4A` | Accent decorative circles and highlight numerals |
| `brand-gold-300` | `#FFD15D` | Newsletter gradient start |
| `text-on-light` | `#24423D` | Primary title and body text on cream cards |
| `text-on-light-muted` | `#4B6F67` | Secondary text and stats on cream cards |
| `ink-900` | `#1C1C1C` | App Store / Google Play download buttons |

### Typography
- **Typeface**: `Plus_Jakarta_Sans` via `next/font/google` (geometric grotesque sans-serif matching Satoshi / General Sans).

---

## 📁 Architecture & File Structure

```
novanest-landingpage/
├── public/
│   └── images/                       # Extracted high-resolution assets & mockups
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── properties/
│   │   │       └── route.js          # Secure server route handler (proxies external API / caches)
│   │   ├── globals.css               # Tailwind v4 theme variables, gradients, scroll utilities
│   │   ├── layout.js                 # Root layout with font configuration & metadata
│   │   └── page.js                   # Landing page composing all sections
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.jsx            # Glass header with links & mobile menu
│   │   │   └── Footer.jsx            # Multi-column footer & social links
│   │   ├── sections/
│   │   │   ├── Hero.jsx              # Hero section with 3D villa & CTAs
│   │   │   ├── ExploreCategories.jsx # Category carousel with scroll controls
│   │   │   ├── ExclusiveOffers.jsx   # Alternating stacked card discount blocks
│   │   │   ├── PopularAds.jsx        # 2x2 property grid + newsletter block
│   │   │   ├── MobileApp.jsx         # Smartphone showcase & download buttons
│   │   │   ├── Testimonials.jsx      # Client quote slider with flanking preview
│   │   │   └── FinalCta.jsx          # Overlapping card with A-frame house
│   │   └── ui/
│   │       ├── AccentCircle.jsx      # Reusable gold circle & concentric rings
│   │       ├── Button.jsx            # Primary, outline, icon, and dark button variants
│   │       ├── CategoryCard.jsx      # Card for category items
│   │       ├── NovaNestLogo.jsx      # Crisp SVG brand mark & wordmark
│   │       ├── PropertyCard.jsx      # Card for property listings with specs row
│   │       └── StatIcon.jsx          # Area, bedroom, and bathroom SVG icons
│   └── lib/
│       ├── api.js                    # Client fetch wrapper for internal /api/properties
│       └── types.js                  # JSDoc type definitions
├── .env.example                      # Template for private API credentials
├── package.json
└── tailwind.config.js                # Tailwind configuration with design tokens
```

---

## 🔐 API Key & Data Handling

To keep provider credentials secure:
1. Keys are stored server-side only in `.env.local` (never prefixed with `NEXT_PUBLIC_`):
   ```env
   REAL_ESTATE_API_KEY=your_key_here
   REAL_ESTATE_API_BASE_URL=https://api.yourprovider.com
   ```
2. The internal Route Handler at `src/app/api/properties/route.js` securely proxies calls to the external provider with 5-minute caching (`next: { revalidate: 300 }`) and provides fallback data when no external provider is set.
3. Client components consume data via `src/lib/api.js`, preventing any sensitive keys from reaching the browser bundle.

Photo mapping (Zillow-style `originalPhotos.mixedSources` and Realtor `photos`/`primary_photo`) is documented in [`docs/API-IMAGE-FETCHING.md`](./docs/API-IMAGE-FETCHING.md).

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
pnpm install
```

### 2. Configure Environment (Optional)
```bash
cp .env.example .env.local
```

### 3. Build & Run
```bash
# Development server
pnpm dev

# Production build
pnpm build

# Production server
pnpm start
```
# NovaNest-LandingPage
