"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import Wave from "./Wave";
import Cutout from "./Cutout";
import { CircleText, Daisy, Paw, Sparkle, Squiggle } from "./Shapes";
import { CUTOUTS, IMAGES } from "@/lib/images";
import { BOOKING_HREF, CONTACT } from "@/lib/site";

const SLIDES = IMAGES.heroSlides;

export default function Hero() {
  const [index, setIndex] = useState(0);
  const go = useCallback((d: number) => setIndex((i) => (i + d + SLIDES.length) % SLIDES.length), []);

  useEffect(() => {
    const t = setInterval(() => go(1), 5000);
    return () => clearInterval(t);
  }, [index, go]);

  return (
    <section id="top" className="relative isolate overflow-hidden bg-olive text-white">
      {/* Soft background blobs + doodles */}
      <div className="absolute -left-40 -top-40 -z-10 h-[520px] w-[520px] animate-morph bg-[#676a57]" />
      <div className="absolute -bottom-32 right-[30%] -z-10 h-80 w-80 animate-morph bg-[#4f5243] [animation-delay:-6s]" />
      <Paw className="absolute left-[44%] top-28 -z-10 hidden h-24 w-24 rotate-12 text-white/5 lg:block" />
      <Sparkle className="absolute left-[6%] top-32 h-5 w-5 animate-float text-accent" />
      <Sparkle className="absolute bottom-44 left-[44%] hidden h-3 w-3 animate-float text-white/60 sm:block" />

      <div className="container-x relative grid items-center gap-12 pb-36 pt-32 lg:min-h-[820px] lg:grid-cols-[1.05fr_1fr] lg:gap-8 lg:pt-36">
        <div className="max-w-xl">
          <p className="eyebrow !text-sage">One-on-One Grooming · Addis, LA</p>
          <h1 className="mt-5 text-[44px] leading-[1.05] sm:text-6xl lg:text-7xl">
            Spa days for the pups you{" "}
            <span className="relative inline-block italic text-accent">
              love
              <Squiggle className="absolute -bottom-2 left-0 h-3 w-full text-sage sm:-bottom-3 sm:h-4" />
            </span>
          </h1>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-white/85 sm:text-lg">
            Grooming should be calm and personal — not stressful. One groomer works with your pup from start to finish in a
            quiet, low-stress space, so they leave looking and feeling their best.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <a href={BOOKING_HREF} target="_blank" rel="noopener" className="btn-primary">
              Book a Groom
            </a>
            <a href="#services" className="btn-outline-light">
              View Services
            </a>
          </div>
          <p className="mt-8 text-sm text-white/70">
            Or call{" "}
            <a href={`tel:${CONTACT.phone.replace(/\D/g, "")}`} className="font-semibold text-white underline-offset-4 hover:underline">
              {CONTACT.phone}
            </a>
          </p>
        </div>

        {/* Arched photo frame with crossfading real grooms */}
        <div className="relative mx-auto w-full max-w-[440px] lg:mr-0 lg:max-w-[500px]">
          <div className="absolute inset-0 translate-x-5 translate-y-5 rounded-t-full rounded-b-[2.5rem] border-2 border-accent/50" />
          <div className="relative aspect-[3/4] overflow-hidden rounded-t-full rounded-b-[2.5rem] bg-[#4f5243] shadow-2xl">
            {SLIDES.map((slide, i) => (
              <Image
                key={slide.src}
                src={slide.src}
                alt={slide.alt}
                fill
                priority={i === 0}
                sizes="(min-width:1024px) 500px, 90vw"
                className={`object-cover object-[center_70%] transition-opacity duration-1000 ${i === index ? "opacity-100" : "opacity-0"}`}
              />
            ))}
          </div>

          <a
            href={BOOKING_HREF}
            target="_blank"
            rel="noopener"
            aria-label="Book a groom"
            className="absolute -left-14 top-16 hidden text-white transition-transform hover:scale-105 sm:block"
          >
            <CircleText id="hero-badge" text="Book a groom ✦ spa days ✦ happy tails ✦ " size={150} textClass="fill-white/90">
              <span className="grid h-16 w-16 place-items-center rounded-full bg-accent shadow-lg">
                <Daisy className="h-11 w-11" center="#3e4b3a" />
              </span>
            </CircleText>
          </a>

          <Daisy className="absolute -right-5 top-1/3 h-12 w-12 animate-float" />

          {/* Cut-out pup "stepping out" of the frame */}
          <Cutout
            {...CUTOUTS.pomeranian}
            sizes="(min-width:640px) 340px, 220px"
            className="absolute -bottom-14 -left-8 h-64 w-52 sm:-left-36 sm:h-[26rem] sm:w-80 lg:-left-52"
          />

          <div className="absolute -bottom-6 -right-2 rotate-[-3deg] rounded-[28px_28px_28px_6px] bg-white px-5 py-4 text-foreground shadow-xl sm:-right-8">
            <p className="font-serif text-lg">
              <span className="text-accent">✦</span> Book online 24/7
            </p>
            <p className="mt-0.5 text-xs text-muted">Pick a time that works for you</p>
          </div>

          <div className="absolute -bottom-14 left-1/2 flex -translate-x-1/2 items-center gap-2">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                aria-label={`Show photo ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-2 rounded-full transition-all ${i === index ? "w-8 bg-[#f8f5ef]" : "w-2 bg-accent"}`}
              />
            ))}
          </div>
        </div>
      </div>

      <Wave className="absolute inset-x-0 -bottom-px" />
    </section>
  );
}
