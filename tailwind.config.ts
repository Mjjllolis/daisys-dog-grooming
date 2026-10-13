import type { Config } from "tailwindcss";

// Brand tokens are declared as CSS variables in src/app/globals.css and surfaced
// to Tailwind here. Palette (brand guide): Ink, Cream, Sage, Daisy Yellow (accent), Forest.
const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        background: "rgb(var(--background) / <alpha-value>)",
        foreground: "rgb(var(--foreground) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        border: "rgb(var(--border) / <alpha-value>)",
        accent: "rgb(var(--accent) / <alpha-value>)",
        "accent-dark": "rgb(var(--accent-dark) / <alpha-value>)",
        forest: "rgb(var(--forest) / <alpha-value>)",
        olive: "rgb(var(--olive) / <alpha-value>)",
        sage: "rgb(var(--sage) / <alpha-value>)",
        "sage-soft": "rgb(var(--sage-soft) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
      keyframes: {
        marquee: { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
        "marquee-rev": { from: { transform: "translateX(-50%)" }, to: { transform: "translateX(0)" } },
        float: { "0%,100%": { transform: "translateY(0) rotate(var(--r,0deg))" }, "50%": { transform: "translateY(-10px) rotate(var(--r,0deg))" } },
        morph: {
          "0%,100%": { borderRadius: "58% 42% 55% 45% / 48% 60% 40% 52%" },
          "50%": { borderRadius: "42% 58% 45% 55% / 60% 44% 56% 40%" },
        },
      },
      animation: {
        marquee: "marquee 40s linear infinite",
        "marquee-rev": "marquee-rev 45s linear infinite",
        "spin-slow": "spin 22s linear infinite",
        float: "float 6s ease-in-out infinite",
        morph: "morph 14s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
