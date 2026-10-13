"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { DAISY } from "@/lib/images";
import { DAISY_INTRO } from "@/lib/team";

const OPEN_EVENT = "open-meet-daisy";
const openDaisy = () => window.dispatchEvent(new Event(OPEN_EVENT));

// The leaf-pile photo with a child stays out of the public gallery.
const PHOTOS = [DAISY.inTheLeaves, DAISY.smiling, DAISY.holidayScarf, DAISY.pinkSweater, DAISY.blackAndWhite];

/** Round photo of Daisy that sits on the owners' arch; opens the popup. */
export function DaisyBadge({ className = "" }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={openDaisy}
      aria-label="Meet Daisy"
      className={`group absolute z-20 grid place-items-center ${className}`}
    >
      <span className="relative block h-full w-full overflow-hidden rounded-full border-[6px] border-background shadow-xl ring-2 ring-sage transition group-hover:scale-105">
        <Image src={DAISY.smiling.src} alt={DAISY.smiling.alt} fill sizes="200px" className="object-cover object-[50%_30%]" />
      </span>
      <span className="absolute -bottom-3 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-foreground shadow-md">
        Meet Daisy +
      </span>
    </button>
  );
}

/** "Meet Daisy" call-to-action button for the About copy. */
export function MeetDaisyButton({ className = "" }: { className?: string }) {
  return (
    <button type="button" onClick={openDaisy} className={`btn-primary ${className}`}>
      Meet Daisy
    </button>
  );
}

/** The popup itself. Mount once; any DaisyBadge or MeetDaisyButton opens it. */
export function DaisyDialog() {
  const [open, setOpen] = useState(false);
  const [i, setI] = useState(0);

  useEffect(() => {
    const show = () => { setI(0); setOpen(true); };
    window.addEventListener(OPEN_EVENT, show);
    return () => window.removeEventListener(OPEN_EVENT, show);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowRight") setI((n) => (n + 1) % PHOTOS.length);
      if (e.key === "ArrowLeft") setI((n) => (n - 1 + PHOTOS.length) % PHOTOS.length);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;
  const photo = PHOTOS[i];
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Meet Daisy"
      className="fixed inset-0 z-[100] grid place-items-center bg-[#2a2a24]/60 p-4 backdrop-blur-sm"
      onClick={() => setOpen(false)}
    >
      <div
        className="relative grid max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-[2rem] bg-background shadow-2xl md:grid-cols-[1.1fr_0.9fr]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative aspect-[4/5] bg-foreground md:aspect-auto md:min-h-[520px]">
          <Image key={photo.src} src={photo.src} alt={photo.alt} fill sizes="(min-width:768px) 480px, 92vw" className="object-cover" />
        </div>
        <div className="flex flex-col p-8 sm:p-10">
          <p className="eyebrow">{DAISY_INTRO.eyebrow}</p>
          <h3 className="mt-3 text-4xl sm:text-5xl">Meet <span className="italic text-forest">Daisy</span></h3>
          <div className="mt-5 space-y-4 leading-relaxed text-muted">
            {DAISY_INTRO.bio.map((p) => <p key={p}>{p}</p>)}
          </div>
          <div className="mt-auto grid grid-cols-5 gap-2 pt-8">
            {PHOTOS.map((p, n) => (
              <button
                key={p.src}
                type="button"
                onClick={() => setI(n)}
                aria-label={`Show photo ${n + 1}`}
                aria-current={n === i}
                className={`relative aspect-square overflow-hidden rounded-xl ring-offset-2 ring-offset-background transition ${n === i ? "ring-2 ring-forest" : "opacity-70 hover:opacity-100"}`}
              >
                <Image src={p.src} alt="" fill sizes="80px" className="object-cover" />
              </button>
            ))}
          </div>
        </div>
        <button
          type="button"
          aria-label="Close"
          autoFocus
          onClick={() => setOpen(false)}
          className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-surface text-xl shadow-md transition hover:bg-accent"
        >
          ×
        </button>
      </div>
    </div>
  );
}
