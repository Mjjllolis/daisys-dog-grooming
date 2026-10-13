/**
 * The two owners, shown in the About section with a "Meet …" popup each.
 * TODO: real names, roles, bios and a photo for the second owner.
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
    name: "Owner Name",
    role: "Co-owner & Groomer",
    photo: "/images/groomer.jpg",
    bio: [
      "Placeholder bio — a few sentences about how they got into grooming, their training and what they love most about the job.",
      "Something personal works well here too: their own pets, favorite breed to groom, or what makes a great groom day.",
    ],
    favorites: ["Favorite cut: placeholder", "Own pets: placeholder"],
  },
  {
    name: "Owner Name",
    role: "Co-owner",
    photo: null, // TODO: add public/images/owner-2.jpg and point this at it
    bio: [
      "Placeholder bio for the second owner — their role at Daisy's, background and what they bring to the studio.",
      "A second short paragraph — something personal, like their own pets or favorite part of the day.",
    ],
    favorites: ["Favorite breed: placeholder", "Fun fact: placeholder"],
  },
];
