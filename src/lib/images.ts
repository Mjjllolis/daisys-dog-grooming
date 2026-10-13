/**
 * Every image on the site is referenced from here. All dog imagery is Daisy's
 * own (supplied "Web Ready" set): table photos, transparent cut-outs and
 * illustrated stickers. groomer.jpg is the Facebook profile photo.
 */
type Img = { src: string; alt: string };

const photo = (n: number, alt = "Freshly groomed pup on the table at Daisy's"): Img => ({
  src: `/images/photos/img-${n}.webp`,
  alt,
});
const cutout = (name: string, alt: string): Img => ({ src: `/images/cutouts/${name}.webp`, alt });
const sticker = (name: string, alt: string): Img => ({ src: `/images/stickers/${name}.webp`, alt });

export const CUTOUTS = {
  dachshund: cutout("daisy-dachshund", "Speckled dachshund mix lounging"),
  toy: cutout("curious-fluffy-toy", "Fluffy little toy-breed pup"),
  charcoal: cutout("fluffy-charcoal", "Fluffy charcoal pup lying down"),
  maltese: cutout("fluffy-maltese", "Happy white Maltese with a wagging tail"),
  pomeranian: cutout("fluffy-pomeranian", "Fluffy cream Pomeranian"),
  sitting: cutout("fluffy-sitting", "Freshly groomed pup sitting pretty"),
  tricolor: cutout("friendly-tricolor", "Friendly tricolor pup"),
  goldenDoodle: cutout("golden-brown-doodle", "Golden-brown doodle sitting tall"),
  chocolateDoodle: cutout("seated-chocolate-doodle", "Chocolate doodle sitting"),
};

export const STICKERS = {
  aussie: sticker("aussie", "Cheeky Aussie sticker with hearts"),
  blackPoodle: sticker("black-poodle", "Black poodle sticker"),
  corgi: sticker("corgi", "Corgi sticker"),
  shihTzu: sticker("shih-tzu-party", "Shih Tzu in a party hat sticker"),
  brownDog: sticker("brown-dog", "Brown and white doodle sticker"),
  doodle: sticker("doodle", "Doodle portrait sticker"),
  doodleSparkles: sticker("doodle-sparkles", "Freshly groomed doodle sticker with sparkles"),
  jackRussell: sticker("jack-russell", "Jack Russell pup sticker"),
};

/**
 * Every photo is used exactly once across the site — hero slideshow, services,
 * faded section backdrops, then the gallery gets what's left.
 */
export const IMAGES = {
  heroSlides: [photo(4316), photo(4371), photo(4388), photo(3938), photo(4442)],
  about: { src: "/images/groomer.jpg", alt: "Your groomer at Daisy's Dog Grooming" },
  services: photo(4230, "Apricot doodle with a fresh teddy-bear face"),
};

export const BACKDROPS = {
  pricing: photo(4296).src,
  reviews: photo(4405).src,
  faq: photo(4340).src,
  offer: photo(4358).src,
};

export const GALLERY: Img[] = [3812, 4061, 3836, 4088, 4452, 4066].map((n) => photo(n));

/** Daisy herself, the black miniature schnauzer the studio is named after. Not yet placed on the page. */
const daisy = (name: string, alt: string): Img => ({ src: `/images/daisy/${name}.webp`, alt });
export const DAISY = {
  inTheLeaves: daisy("daisy-in-the-leaves", "Daisy, a black schnauzer, grinning out of a pile of autumn leaves"),
  smiling: daisy("daisy-smiling-portrait", "Daisy smiling up at the camera"),
  holidayScarf: daisy("daisy-holiday-scarf", "Daisy lying down in a striped holiday scarf"),
  pinkSweater: daisy("daisy-pink-sweater-leaves", "Daisy in a pink sweater sitting in the leaves"),
  blackAndWhite: daisy("daisy-black-and-white-portrait", "Black-and-white portrait of Daisy's bearded face"),
  leafPile: daisy("daisy-leaf-pile-with-friend", "Daisy in a leaf pile with a young friend"),
};
