/** Services + prices, verbatim from Daisy's Groomore booking page. */

export const TICKER = [
  "One-on-One Grooming",
  "Full Grooms",
  "Baths & Nails",
  "Hand Scissoring",
  "Heart Tails",
  "Bows & Bandanas",
  "Low-Stress Handling",
];

export const ABOUT_POINTS = [
  "One-on-one grooming, start to finish",
  "Quiet, low-stress environment",
  "Comfort, safety and quality care first",
  "Every furry client treated like family",
];

export const SERVICE_POINTS = [
  "Bath & nails on every visit",
  "Full haircut tailored to your pup",
  "Hand scissoring for longer styles",
  "Finishing touches: heart tails & bows",
];

export type Package = {
  name: string;
  blurb: string;
  from: number;
  features: string[];
  featured?: boolean;
};

export const PACKAGES: Package[] = [
  {
    name: "Bath",
    blurb: "A fresh, clean refresh",
    from: 45,
    features: ["Bath & dry", "Nail trim", "1 – 2 hours", "Priced by weight"],
  },
  {
    name: "Full Groom",
    blurb: "Our signature service",
    from: 65,
    featured: true,
    features: ["Bath & dry", "Nail trim", "Full haircut", "2 – 4½ hours"],
  },
  {
    name: "Nail Trim",
    blurb: "Quick in-and-out",
    from: 20,
    features: ["Nail trim only", "About 10 minutes", "Add a nail grind +$5", "Any size pup"],
  },
];

/** Columns: Bath, Full Groom. `plus` = "starts at" pricing. */
export const SIZE_PRICING = [
  { size: "Small", weight: "0 – 20 lb", prices: [45, 65], plus: true },
  { size: "Medium", weight: "21 – 45 lb", prices: [55, 85], plus: true },
  { size: "Large", weight: "45 – 99 lb", prices: [70, 120], plus: true },
  { size: "Extra large", weight: "100 lb +", prices: [85, 135], plus: false },
];
export const SIZE_COLUMNS = ["Bath", "Full Groom"];

export const ADD_ONS = [
  { name: "Hand scissoring", note: "For longer lengths", price: "from $10" },
  { name: "Heart tail", price: "$5" },
  { name: "Nail grind", note: "Smooths fresh-cut nails", price: "$5" },
  { name: "Teeth brushing", price: "$5" },
  { name: "Small bow", price: "$5" },
  { name: "Big bow", price: "$7" },
];
