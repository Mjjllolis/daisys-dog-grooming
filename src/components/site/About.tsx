import Image from "next/image";
import CheckList from "./CheckList";
import { IMAGES } from "@/lib/images";
import { ABOUT_POINTS } from "@/lib/services";

export default function About() {
  return (
    <section id="about" className="container-x grid items-center gap-12 py-20 sm:py-28 lg:grid-cols-2 lg:gap-20">
      <div className="relative mx-auto w-full max-w-md lg:max-w-none">
        <div className="relative aspect-[4/5] overflow-hidden rounded-t-full bg-sage-soft shadow-[0_30px_60px_-30px_rgba(62,75,58,0.5)]">
          <Image src={IMAGES.about.src} alt={IMAGES.about.alt} fill sizes="(min-width:1024px) 40vw, 90vw" className="object-cover" />
        </div>
        <div className="absolute -bottom-6 -right-2 rounded-2xl bg-forest px-6 py-5 text-white shadow-xl sm:-right-6">
          <p className="font-serif text-3xl">12+</p>
          <p className="text-xs uppercase tracking-widest text-white/70">Years of grooming</p>
        </div>
      </div>

      <div>
        <p className="eyebrow">About Us</p>
        <h2 className="mt-4 text-4xl leading-tight sm:text-5xl">A calm, cozy space where every pup is family</h2>
        <p className="mt-6 max-w-lg leading-relaxed text-muted">
          Daisy&apos;s is a boutique grooming studio built around patience and care. Every visit starts with a
          meet-and-greet, a relaxed pace and a groom tailored to your dog&apos;s coat, age and personality.
        </p>
        <div className="mt-8">
          <CheckList items={ABOUT_POINTS} />
        </div>
        <a href="#services" className="btn-outline mt-10">
          Learn More
        </a>
      </div>
    </section>
  );
}
