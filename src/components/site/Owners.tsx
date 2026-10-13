"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { DaisyBadge } from "./MeetDaisy";
import { Paw } from "./Shapes";
import { OWNERS, type Owner } from "@/lib/team";

function Portrait({ owner, sizes, className = "" }: { owner: Owner; sizes: string; className?: string }) {
  return (
    <div className={`relative overflow-hidden bg-sage-soft ${className}`}>
      {owner.photo ? (
        <Image src={owner.photo} alt={`${owner.name}, ${owner.role}`} fill sizes={sizes} className="object-cover object-top" />
      ) : (
        <div className="absolute inset-0 grid place-items-center bg-[radial-gradient(circle_at_50%_40%,rgb(var(--sage)/0.45),rgb(var(--sage-soft)))]">
          <div className="text-center text-forest/70">
            <Paw className="mx-auto h-12 w-12" />
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-widest">Photo coming soon</p>
          </div>
        </div>
      )}
    </div>
  );
}

function MeetButton({ owner, onClick, className = "" }: { owner: Owner; onClick: () => void; className?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`absolute left-1/2 z-30 -translate-x-1/2 whitespace-nowrap rounded-full bg-surface px-5 py-2.5 text-sm font-semibold text-foreground shadow-lg transition hover:bg-accent ${className}`}
    >
      Meet {owner.name} <span className="ml-1 text-forest">+</span>
    </button>
  );
}

/** Two arched owner portraits; each opens a popup with their bio. */
export default function Owners() {
  const [open, setOpen] = useState<Owner | null>(null);
  const [first, second] = OWNERS;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <div className="grid grid-cols-2 items-start gap-4 pb-6 sm:gap-8">
        {/* Owner one */}
        <div className="relative">
          <Portrait
            owner={first}
            sizes="(min-width:1024px) 30vw, 48vw"
            className="aspect-[3/4] rounded-t-full shadow-[0_30px_60px_-30px_rgba(62,75,58,0.5)]"
          />
          <MeetButton owner={first} onClick={() => setOpen(first)} className="-bottom-4" />
        </div>

        {/* Owner two — set a little lower, with a pup lounging on top */}
        <div className="relative mt-24 sm:mt-28">
          <DaisyBadge className="-top-[6.5rem] left-1/2 h-36 w-36 -translate-x-1/2 sm:-top-28 sm:h-44 sm:w-44" />
          <Portrait
            owner={second}
            sizes="(min-width:1024px) 30vw, 48vw"
            className="aspect-[3/4] rounded-t-full shadow-[0_30px_60px_-30px_rgba(62,75,58,0.5)]"
          />
          <MeetButton owner={second} onClick={() => setOpen(second)} className="-bottom-4" />
        </div>
      </div>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`About ${open.name}`}
          className="fixed inset-0 z-[100] grid place-items-center bg-[#2a2a24]/60 p-4 backdrop-blur-sm"
          onClick={() => setOpen(null)}
        >
          <div
            className="relative grid max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-[2rem] bg-background shadow-2xl sm:grid-cols-[0.9fr_1.1fr]"
            onClick={(e) => e.stopPropagation()}
          >
            <Portrait owner={open} sizes="400px" className="aspect-[4/3] sm:aspect-auto sm:min-h-[420px]" />
            <div className="p-8 sm:p-10">
              <p className="eyebrow">{open.role}</p>
              <h3 className="mt-3 text-4xl">{open.name}</h3>
              <div className="mt-5 space-y-4 leading-relaxed text-muted">
                {open.bio.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
              {open.favorites && (
                <ul className="mt-6 flex flex-wrap gap-2">
                  {open.favorites.map((f) => (
                    <li key={f} className="rounded-full border border-border bg-surface px-4 py-1.5 text-sm">
                      {f}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <button
              type="button"
              aria-label="Close"
              autoFocus
              onClick={() => setOpen(null)}
              className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-surface text-xl shadow-md transition hover:bg-accent"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </>
  );
}
