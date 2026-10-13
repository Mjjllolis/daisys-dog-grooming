import Image from "next/image";
import CheckList from "./CheckList";
import Cutout from "./Cutout";
import { CircleText, Daisy, Paw, Sparkle } from "./Shapes";
import { CUTOUTS, IMAGES } from "@/lib/images";
import { ABOUT_POINTS } from "@/lib/services";

export default function About() {
  return (
    <section id="about" className="container-x grid items-center gap-12 py-20 sm:py-28 lg:grid-cols-2 lg:gap-20">
      <div className="relative mx-auto w-full max-w-md lg:max-w-none">
        <div className="absolute -left-8 -top-8 h-[85%] w-[90%] animate-morph bg-sage/40" />
        <div className="absolute -bottom-10 right-6 h-40 w-40 animate-morph rounded-full bg-accent/15 [animation-delay:-5s]" />
        <Daisy className="absolute -top-4 right-10 z-10 h-14 w-14 animate-float" petal="#ffffff" />
        <div className="absolute -left-6 top-1/3 z-10 hidden sm:block">
          <CircleText id="about-badge" text="Pet-first ✦ fear-free ✦ cage-free ✦ " size={130} textClass="fill-forest">
            <span className="grid h-14 w-14 place-items-center rounded-full bg-background shadow-md">
              <Paw className="h-7 w-7 text-accent" />
            </span>
          </CircleText>
        </div>
        <div className="relative aspect-[4/5] overflow-hidden rounded-t-full bg-sage-soft shadow-[0_30px_60px_-30px_rgba(62,75,58,0.5)]">
          <Image src={IMAGES.about.src} alt={IMAGES.about.alt} fill sizes="(min-width:1024px) 40vw, 90vw" className="object-cover object-top" />
        </div>
        {/* Say hi to Daisy */}
        <div className="absolute -bottom-12 -left-4 z-20 sm:-left-16">
          <p className="mb-1 ml-10 flex -rotate-6 items-center gap-1 font-serif text-xl italic text-accent">
            Say hi to Daisy
            <Paw className="h-4 w-4" />
          </p>
          <Cutout {...CUTOUTS.daisy} sizes="260px" className="h-36 w-52 sm:h-40 sm:w-60" />
        </div>
        <div className="absolute -bottom-6 -right-2 hidden rounded-[40px_40px_40px_8px] sm:block bg-forest px-6 py-5 text-white shadow-xl sm:-right-6">
          <p className="font-serif text-3xl">1 : 1</p>
          <p className="text-xs uppercase tracking-widest text-white/70">One groomer, one pup</p>
        </div>
      </div>

      <div>
        <p className="eyebrow">About Us</p>
        <h2 className="mt-4 text-4xl leading-tight sm:text-5xl">
          A calm, cozy space where every pup is{" "}
          <span className="relative whitespace-nowrap italic text-accent">
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
