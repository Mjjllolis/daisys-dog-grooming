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
- Dog photos in `public/images/` are Daisy's own (the Groomore banner). `groomer.jpg` is the Facebook profile photo.
- `public/logo-dark.png` / `logo-light.png` were cut out of the Groomore avatar — ask for the original vector logo.

## Before launch
- Reviews in `src/lib/testimonials.ts` are **placeholders** — replace with real Google/Facebook reviews.
- Confirm the person in `groomer.jpg` is the groomer and that they're happy to be featured.
- Domain in `src/lib/site.ts` is a guess (TODO).
- Facebook is login-walled, so only the profile photo was pulled from it; more photos need to be supplied.
