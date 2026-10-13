"use client";

import { useEffect, useState } from "react";
import Logo from "./Logo";
import { NAV } from "@/lib/nav";
import { BOOKING_HREF } from "@/lib/site";

/** Transparent over the hero, turns solid cream once the page scrolls. */
export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid ? "bg-background/95 shadow-[0_1px_0_rgb(var(--border))] backdrop-blur" : "bg-transparent"
      }`}
    >
      <div className="container-x flex h-20 items-center justify-between gap-6">
        <Logo light={!solid} />

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              className={`relative text-sm font-medium transition-colors ${
                solid ? "text-foreground/80 hover:text-accent" : "text-white/85 hover:text-white"
              } ${i === 0 ? (solid ? "text-accent" : "text-[#f2c9a0]") : ""}`}
            >
              {item.label}
              {i === 0 && <span className="absolute -bottom-1.5 left-0 h-0.5 w-full rounded bg-current" />}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a href={BOOKING_HREF} className="btn-primary !px-5 !py-2.5">
            Book Now
          </a>
          <button
            type="button"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className={`grid h-10 w-10 place-items-center rounded-full lg:hidden ${solid ? "text-foreground" : "text-white"}`}
          >
            <span className="relative block h-3.5 w-5">
              <span className={`absolute left-0 h-0.5 w-5 bg-current transition-all ${open ? "top-1.5 rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 top-1.5 h-0.5 w-5 bg-current transition-opacity ${open ? "opacity-0" : ""}`} />
              <span className={`absolute left-0 h-0.5 w-5 bg-current transition-all ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
            </span>
          </button>
        </div>
      </div>

      {open && (
        <nav className="container-x flex flex-col border-t border-border pb-6 pt-2 lg:hidden">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="border-b border-border py-3.5 font-serif text-xl text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
