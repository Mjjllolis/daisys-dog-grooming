const u = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=900&q=80`;

export const POSTS = [
  {
    category: "Pet Care",
    date: "October 9, 2026",
    title: "Brushing Basics: Keeping Coats Tangle-Free Between Visits",
    excerpt: "A few minutes of brushing a week keeps mats away, spreads natural oils and makes every groom more comfortable.",
    image: u("1583337130417-3346a1be7dee"),
  },
  {
    category: "Grooming Tips",
    date: "October 6, 2026",
    title: "How Often Should You Bathe Your Dog?",
    excerpt: "There's no one-size-fits-all bath schedule. Here's how coat type, lifestyle and skin health shape the right routine.",
    image: u("1552053831-71594a27632d"),
  },
  {
    category: "Grooming Tips",
    date: "October 3, 2026",
    title: "5 Tips for a Stress-Free First Groom",
    excerpt: "A little preparation goes a long way. These simple steps help puppies and nervous pets feel safe and happy.",
    image: u("1561037404-61cd46aa615b"),
  },
];
