# Daisy's Dog Grooming

Marketing site for Daisy's Dog Grooming. Next 14 App Router + TypeScript + Tailwind.

```bash
npm install
npm run dev   # http://localhost:3000
```

**Editing content never means touching a component.** Copy, prices, FAQs, reviews,
blog cards, contact info and image URLs all live in typed config under `src/lib/`.
Brand tokens (cream / forest / sage / terracotta) are in `src/app/globals.css`.

## Sources
- Contact, address, hours, about copy and **all prices** come from Daisy's Groomore booking page
  (https://daisysdoggrooming.groomore.com/). Book buttons link there; "Client Login" links to `/portal/login`.
- Dog imagery is Daisy's own "Web Ready" set: `public/images/photos` (table shots), `cutouts` (transparent
  dogs, rendered via `components/site/Cutout.tsx`) and `stickers`. All wired up in `src/lib/images.ts`.
  `groomer.jpg` is the Facebook profile photo.
- `public/logo-dark.png` / `logo-light.png` were cut out of the Groomore avatar — ask for the original vector logo.

## Before launch
- Reviews in `src/lib/testimonials.ts` are **placeholders** — replace with real Google/Facebook reviews.
- Confirm the person in `groomer.jpg` is the groomer and that they're happy to be featured.
- Domain in `src/lib/site.ts` is a guess (TODO).

## Brand

- Brand palette: Ink `#2A2A24`, Cream `#F8F5EF`, Sage `#A9B29B`, Daisy Yellow `#E0A24A` (the `accent` token: buttons and small pops, never text on cream), Forest `#3E4B3A` (text highlights and labels on cream, deep bands). Fonts: Newsreader + DM Sans.
- Logo files: `public/brand/daisys-logo-*.svg` (badge, badge with ribbon, horizontal, horizontal reversed, stamp, one-colour stamp). Favicon: `src/app/icon.svg`, `src/app/apple-icon.png`.
- Logo source: `brand/final/` (`final_ink.py` builds the set, `knockout.py` makes the one-colour cut-out). Every concept round is in `brand/concepts/`.
- Brand guide: https://claude.ai/artifact/NdiGFdEnFenSjJf8Qi3cEE · Colour guide: https://claude.ai/artifact/AXRJszAGCjGaTiWhAq42UW · Logo journey: https://claude.ai/artifact/FyMPSKBSwRk3hAei64toN4
