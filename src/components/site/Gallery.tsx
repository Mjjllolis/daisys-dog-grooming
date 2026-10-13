"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { GALLERY } from "@/lib/images";
import { FACEBOOK_HREF } from "@/lib/site";

/** Two rows of four matching tiles; clicking one opens a lightbox. */
export default function Gallery() {
  const [open, setOpen] = useState<number | null>(null);
  const count = GALLERY.length;
  const step = useCallback((d: number) => setOpen((i) => (i === null ? i : (i + d + count) % count)), [count]);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, step]);

  return (
    <section id="gallery" className="container-x relative py-20 sm:py-28">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="eyebrow">Fresh Off the Table</p>
          <h2 className="mt-4 text-4xl sm:text-5xl">
            Recent <span className="italic text-forest">glow-ups</span>
          </h2>
        </div>
        <a href={FACEBOOK_HREF} target="_blank" rel="noopener" className="btn-outline">
          See more on Facebook
        </a>
      </div>

      <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-5">
        {GALLERY.map((img, i) => (
          <button
            key={img.src}
            type="button"
            onClick={() => setOpen(i)}
            aria-label={`Open photo: ${img.alt}`}
            className="group relative aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-sage-soft shadow-[0_20px_40px_-30px_rgba(42,42,36,0.45)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-forest"
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(min-width:1024px) 280px, 46vw"
              className="object-cover object-[center_70%] transition duration-500 group-hover:scale-105"
            />
            <span className="absolute bottom-3 right-3 grid h-9 w-9 place-items-center rounded-full bg-background/90 text-lg text-foreground opacity-0 shadow-md transition group-hover:opacity-100">
              +
            </span>
          </button>
        ))}
      </div>

      {open !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#2a2a24]/90 p-4 backdrop-blur-sm"
          onClick={() => setOpen(null)}
        >
          <figure className="relative flex max-h-full w-full max-w-3xl flex-col items-center" onClick={(e) => e.stopPropagation()}>
            <div className="relative h-[78vh] w-full">
              <Image
                key={GALLERY[open].src}
                src={GALLERY[open].src}
                alt={GALLERY[open].alt}
                fill
                sizes="(min-width:768px) 768px, 100vw"
                className="rounded-[1.5rem] object-contain"
                priority
              />
            </div>
            <figcaption className="mt-4 text-center text-sm text-white/80">
              {GALLERY[open].alt} <span className="ml-2 text-white/50">{open + 1} / {count}</span>
            </figcaption>
          </figure>

          <button
            type="button"
            aria-label="Previous photo"
            onClick={(e) => { e.stopPropagation(); step(-1); }}
            className="absolute left-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-background text-2xl text-foreground shadow-lg transition hover:bg-accent sm:left-8"
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="Next photo"
            onClick={(e) => { e.stopPropagation(); step(1); }}
            className="absolute right-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-background text-2xl text-foreground shadow-lg transition hover:bg-accent sm:right-8"
          >
            ›
          </button>
          <button
            type="button"
            aria-label="Close"
            autoFocus
            onClick={() => setOpen(null)}
            className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-background text-xl text-foreground shadow-lg transition hover:bg-accent sm:right-8 sm:top-8"
          >
            ×
          </button>
        </div>
      )}
    </section>
  );
}
