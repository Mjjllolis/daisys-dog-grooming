/**
 * Every photo on the site is referenced from here. Dog photos are Daisy's own
 * (from the Groomore booking page banner); groomer.jpg is the Facebook profile photo.
 */
export const DOGS = [
  { src: "/images/pomeranian.jpg", alt: "Fluffy Pomeranian after a full groom at Daisy's", name: "Pomeranian" },
  { src: "/images/doodle-cream.jpg", alt: "Cream doodle with a fresh teddy-bear cut", name: "Doodle" },
  { src: "/images/schnauzer.jpg", alt: "Miniature Schnauzer with a classic schnauzer trim", name: "Schnauzer" },
  { src: "/images/doodle-red.jpg", alt: "Red doodle freshly groomed on the table", name: "Red doodle" },
  { src: "/images/yorkie.jpg", alt: "Yorkie with a tidy puppy cut", name: "Yorkie" },
  { src: "/images/maltese.jpg", alt: "Little white pup with a short summer cut", name: "Maltese mix" },
];

export const IMAGES = {
  heroSlides: [DOGS[0], DOGS[1], DOGS[3], DOGS[2]],
  about: { src: "/images/groomer.jpg", alt: "Your groomer at Daisy's Dog Grooming" },
  services: DOGS[4],
};
