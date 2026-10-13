import CheckList from "./CheckList";
import Owners from "./Owners";
import { CircleText, Daisy, Paw, Sparkle } from "./Shapes";
import { ABOUT_POINTS } from "@/lib/services";

export default function About() {
  return (
    <section id="about" className="container-x grid items-center gap-12 py-20 sm:py-28 lg:grid-cols-2 lg:gap-20">
      <div className="relative mx-auto w-full max-w-md lg:max-w-none">
        <div className="absolute -left-8 -top-8 h-[85%] w-[90%] animate-morph bg-sage/40" />
        <div className="absolute -bottom-6 right-[10%] h-48 w-48 animate-morph rounded-full bg-accent/15 [animation-delay:-5s]" />
        <Daisy className="absolute -top-4 right-10 z-10 h-14 w-14 animate-float" petal="#ffffff" />
        <div className="absolute -left-6 top-1/3 z-10 hidden sm:block">
          <CircleText id="about-badge" text="Pet-first ✦ fear-free ✦ cage-free ✦ " size={130} textClass="fill-forest">
            <span className="grid h-14 w-14 place-items-center rounded-full bg-background shadow-md">
              <Paw className="h-7 w-7 text-accent" />
            </span>
          </CircleText>
        </div>
        <Owners />
      </div>

      <div>
        <p className="eyebrow">About Us · Meet the Owners</p>
        <h2 className="mt-4 text-4xl leading-tight sm:text-5xl">
          A calm, cozy space where every pup is{" "}
          <span className="relative whitespace-nowrap italic text-forest">
            family
            <Sparkle className="absolute -right-6 -top-2 h-5 w-5 text-sage" />
          </span>
        </h2>
        <p className="mt-6 max-w-lg leading-relaxed text-muted">
          At Daisy&apos;s, we believe grooming should be a calm, personalized experience — not a stressful one. That&apos;s
          why we offer one-on-one grooming tailored to each pet&apos;s individual needs. Whether it&apos;s a simple bath
          or a full groom, every furry client is treated like family.
        </p>
        <div className="mt-8">
          <CheckList items={ABOUT_POINTS} />
        </div>
        <a href="#services" className="btn-outline mt-10">
          Our Services
        </a>
      </div>
    </section>
  );
}
