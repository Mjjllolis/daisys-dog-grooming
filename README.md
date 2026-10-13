# Daisy's Dog Grooming

Marketing site for Daisy's Dog Grooming. Next 14 App Router + TypeScript + Tailwind.

```bash
npm install
npm run dev   # http://localhost:3000
```

**Editing content never means touching a component.** Copy, prices, FAQs, reviews,
blog cards, contact info and image URLs all live in typed config under `src/lib/`.
Brand tokens (cream / forest / sage / terracotta) are in `src/app/globals.css`.

## Before launch
- All photos are Unsplash placeholders (`src/lib/images.ts`, `src/lib/blog.ts`). Swap for real photos in `/public`, then drop the `remotePatterns` entry in `next.config.mjs`.
- Contact, address, hours, domain and booking link in `src/lib/site.ts` are placeholders (marked TODO).
- Reviews in `src/lib/testimonials.ts` and prices in `src/lib/services.ts` are placeholders.
