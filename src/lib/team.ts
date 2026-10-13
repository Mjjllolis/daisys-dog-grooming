/**
 * The two owners, shown in the About section with a "Meet …" popup each.
 * TODO: confirm which owner is in groomer.jpg, then real roles, bios and a photo for the second owner.
 */
export type Owner = {
  name: string;
  role: string;
  photo: string | null; // null renders a "photo coming soon" placeholder
  bio: string[];
  favorites?: string[];
};

export const OWNERS: Owner[] = [
  {
    name: "Emily Lolis",
    role: "Co-owner & Groomer",
    photo: "/images/groomer.jpg",
    bio: [
      "Placeholder bio — a few sentences about how they got into grooming, their training and what they love most about the job.",
      "Something personal works well here too: their own pets, favorite breed to groom, or what makes a great groom day.",
    ],
    favorites: ["Favorite cut: placeholder", "Own pets: placeholder"],
  },
  {
    name: "Faith Scott",
    role: "Co-owner",
    photo: null, // TODO: add public/images/owner-2.jpg and point this at it
    bio: [
      "Placeholder bio for the second owner — their role at Daisy's, background and what they bring to the studio.",
      "A second short paragraph — something personal, like their own pets or favorite part of the day.",
    ],
    favorites: ["Favorite breed: placeholder", "Fun fact: placeholder"],
  },
];

/** Copy for the "Meet Daisy" popup. TODO: confirm with the owners and add anything they'd like said about her. */
export const DAISY_INTRO = {
  eyebrow: "The name on the door",
  bio: [
    "This is Daisy, the black miniature schnauzer behind the name.",
    "Here she is in a few of her favourite looks: sweaters, scarves and the occasional leaf pile.",
  ],
};
