"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import Wave from "./Wave";
import { IMAGES } from "@/lib/images";
import { BOOKING_HREF, RATING } from "@/lib/site";

const SLIDES = IMAGES.heroSlides;

export default function Hero() {
  const [index, setIndex] = useState(0);
  const go = useCallback((d: number) => setIndex((i) => (i + d + SLIDES.length) % SLIDES.length), []);

  useEffect(() => {
    const t = setInterval(() => go(1), 6500);
    return () => clearInterval(t);
  }, [index, go]);

  return (
    <section id="top" className="relative isolate overflow-hidden bg-olive text-white">
      {SLIDES.map((slide, i) => (
        <Image
          key={slide.src}
          src={slide.src}
          alt={slide.alt}
          fill
          priority={i === 0}
          sizes="100vw"
          className={`-z-20 object-cover object-[70%_center] transition-opacity duration-1000 ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      {/* Olive wash: strong on the left for legibility, clear on the right for the dog. */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#4f5243]/95 via-[#5a5c4c]/75 to-[#5a5c4c]/10" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#4f5243]/60 via-transparent to-[#4f5243]/40 lg:hidden" />

      <div className="container-x relative flex min-h-[640px] flex-col justify-center pb-36 pt-32 sm:min-h-[720px] lg:min-h-[780px]">
        <div className="max-w-xl">
          <p className="eyebrow !text-[#f2c9a0]">Dog Grooming Studio</p>
          <h1 className="mt-5 text-[44px] leading-[1.05] sm:text-6xl lg:text-7xl">
            Spa days for the pups you love
          </h1>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-white/85 sm:text-lg">
            Calm hands, gentle products and breed-savvy cuts. We make grooming a stress-free treat so your best friend
            leaves fresh, fluffy and happy.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <a href={BOOKING_HREF} className="btn-primary">
              Book a Groom
            </a>
            <a href="#services" className="btn-outline-light">
              View Services
            </a>
          </div>
        </div>

        <div className="absolute bottom-36 right-5 hidden rounded-2xl bg-white px-6 py-4 text-foreground shadow-xl sm:right-8 md:block">
          <p className="font-serif text-xl">
            <span className="text-accent">★</span> {RATING.score} rating
          </p>
          <p className="mt-0.5 text-xs text-muted">{RATING.label}</p>
        </div>

        <div className="absolute bottom-28 left-1/2 flex -translate-x-1/2 items-center gap-2">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              aria-label={`Slide ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-2 rounded-full transition-all ${i === index ? "w-8 bg-[#f8f5ef]" : "w-2 bg-accent"}`}
            />
          ))}
        </div>
      </div>

      <button
        aria-label="Previous slide"
        onClick={() => go(-1)}
        className="absolute left-4 top-1/2 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-accent text-white shadow-lg transition hover:bg-accent-dark xl:grid"
      >
        ←
      </button>
      <button
        aria-label="Next slide"
        onClick={() => go(1)}
        className="absolute right-4 top-1/2 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-accent text-white shadow-lg transition hover:bg-accent-dark xl:grid"
      >
        →
      </button>

      <Wave className="absolute inset-x-0 bottom-0" />
    </section>
  );
}
