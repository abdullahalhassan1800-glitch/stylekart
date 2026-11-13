# StyleKart

A Myntra-inspired fashion & lifestyle e-commerce storefront built with **Next.js 16 (App Router)**, **React 19**, **TypeScript** and **Tailwind CSS 4**. StyleKart uses its own branding, mock catalog data and browser storage — no backend required.

## Features

- **Home** — banner-led layout: auto-playing hero carousel, "Shop By Category" circles, two-up promo banner grid, deals grid, shop-by-occasion tiles and brand cards
- **Header** — Figtree typography, Myntra-style navigation (Men, Women, Kids, Home & Living, Beauty, Studio) with full-width hover mega menus, search, and profile/wishlist/bag counters
- **Catalog** — 97 products across Men, Women, Kids, Home & Living and Beauty with a sticky 252px filter rail (Categories, Brand search, Price range slider, Color, Discount Range, Size), 7 sort options and server-side search (`/shop/all?q=...`)
- **Product page** — 50/50 gallery + details layout, size selection, best-price coupon callout, bank offers, pincode delivery check, Size & Fit / Material & Care, trust strip, ratings & reviews, similar products, mobile sticky add-to-bag bar
- **Footer** — light Myntra-style footer with shop/useful/policy columns, app badges, socials, guarantee rows and popular searches
- **Studio** — editorial page at `/studio` with style stories and curated edits linked to products
- **Bag & Checkout** — quantity controls, coupon `SAVE200` (flat ₹200 off on ₹999+), delivery fee logic, address form, 4 payment methods (COD shows not-available at pincode), 90-second payment session timer, order placement
- **Order history** — orders are stored locally and shown at `/orders` with status, items and totals
- **Wishlist** — save products, pick a size and move them to the bag
- **Login** — phone + OTP flow (OTP `1234`)
- **Persistence** — cart, wishlist, login and orders survive reloads via `localStorage`
- **Responsive** — sticky header with mega menu on desktop and a drawer on mobile; Playwright e2e coverage

> Login OTP: **1234** · Coupon: **SAVE200** · Free delivery on orders ≥ ₹999

## Tech stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 16.4 (App Router, Cache Components, Turbopack) |
| UI | React 19, Tailwind CSS 4, inline SVG icon set |
| Language | TypeScript |
| State | React context + `useSyncExternalStore` over a local-storage store |
| Data | Static mock catalog in `src/data` |
| Images | Local, category-matched sample photos (Unsplash) in `public/images` |

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the dev server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |
| `npm run test:e2e` | Run Playwright end-to-end tests |
| `node scripts/download-images.mjs` | Re-download product/banner/category images |

## Project structure

```
src/
├─ app/                  # Routes: home, shop, product, cart, checkout, wishlist, orders, login, studio
├─ components/
│  ├─ home/             # Banner carousel, category strip, promo banners, deals, brands, style edits
│  ├─ layout/           # Header (nav, mega menu, search, badges) and footer
│  ├─ product/          # Product card, grid, detail view, reviews
│  ├─ shop/             # Filter sidebar, sort select, listing client
│  └─ ui/               # Icons, empty state
├─ context/             # Cart, wishlist, auth, toast providers
├─ data/                # Products, categories, banners, reviews
├─ lib/                 # Types, formatting, local store, orders store
e2e/                     # Playwright end-to-end tests
```

Static assets live in `public/images`:

- `banners/` — four hero slide images
- `circles/` — eight shop-by-category images
- `products/` — four gallery photos per product (`p1-1.jpg` … `p97-4.jpg`)

`scripts/download-images.mjs` re-fetches them from Unsplash and redistributes product photos by category.

## Deployment

The app is deploy-ready for [Vercel](https://vercel.com/new):

1. Push this repository to GitHub.
2. Import it in Vercel — the Next.js preset is detected automatically (no extra config needed).
3. Optionally set `NEXT_PUBLIC_SITE_URL` to your production origin (e.g. `https://stylekart.example.com`) so Open Graph metadata resolves absolute URLs.
4. Deploy.

You can also self-host with `npm run build && npm run start` behind any Node.js server. Note that orders/cart/wishlist are stored per-browser in `localStorage`, so they are not shared across devices.

## Notes

- This is an **educational clone**. It is not affiliated with Myntra and does not use Myntra's logo or assets.
- All products, prices, ratings and reviews are mock data.
- Product and banner photos are free sample images from [Unsplash](https://unsplash.com) stored locally in `public/images`; they are illustrative and not exact representations of the listed products.
