/**
 * Placeholder imagery (Unsplash). Every photo on the site is referenced from
 * here, so swapping in Daisy's own photos is a one-file change.
 */
const u = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1800&q=80`;

export const IMAGES = {
  heroSlides: [
    { src: u("1581888227599-779811939961"), alt: "Freshly groomed dog relaxing in a soft bed" },
    { src: u("1596492784531-6e6eb5ea9993"), alt: "Fluffy white Samoyed after a spa bath" },
    { src: u("1534361960057-19889db9621e"), alt: "Fluffy white dog bounding across the grass" },
  ],
  about: { src: u("1516734212186-a967f81ad0d7"), alt: "Groomer gently brushing a golden retriever" },
  services: { src: u("1633722715463-d30f4f325e24"), alt: "Happy golden retriever after a full groom" },
  offer: { src: u("1507146426996-ef05306b995a"), alt: "Golden puppy ready for a first groom" },
};
