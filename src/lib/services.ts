export const TICKER = [
  "Spa Baths",
  "Breed-Specific Cuts",
  "Natural Shampoos",
  "Happy Tails",
  "Gentle Grooming",
  "Fear-Free Handling",
  "Puppy Intros",
];

export const ABOUT_POINTS = [
  "Certified, pet-first groomers",
  "Fear-free, low-stress handling",
  "Gentle, pet-safe products",
  "One-on-one attention, never cages",
];

export const SERVICE_POINTS = [
  "Bath, blow-dry & brush-out",
  "Breed-standard or custom haircut",
  "Ear cleaning & nail trim",
  "Finishing spritz & bandana",
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
    name: "Bath & Brush",
    blurb: "A fresh, fluffy refresh",
    from: 45,
    features: ["Shampoo & conditioner", "Blow-dry & brush-out", "Ear cleaning", "Nail trim"],
  },
  {
    name: "Full Groom",
    blurb: "Our most popular service",
    from: 85,
    featured: true,
    features: ["Everything in Bath & Brush", "Haircut or breed trim", "Sanitary & paw trim", "Finishing spritz & bandana"],
  },
  {
    name: "Spa Day",
    blurb: "The ultimate pamper",
    from: 120,
    features: ["Everything in Full Groom", "Blueberry facial", "Teeth brushing", "Paw pad balm & massage"],
  },
];

export const SIZE_PRICING = [
  { size: "Small", weight: "Up to 20 lb", prices: [45, 85, 95] },
  { size: "Medium", weight: "21 – 50 lb", prices: [55, 95, 120] },
  { size: "Large", weight: "51 – 90 lb", prices: [70, 105, 145] },
  { size: "Extra large", weight: "90 lb +", prices: [85, 130, 170] },
];
