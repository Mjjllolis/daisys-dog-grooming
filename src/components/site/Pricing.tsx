import Wave from "./Wave";
import { PACKAGES, SIZE_PRICING } from "@/lib/services";
import { BOOKING_HREF } from "@/lib/site";

export default function Pricing() {
  return (
    <section id="pricing" className="relative">
      <div className="bg-forest pb-10 pt-20 text-center text-white sm:pt-24">
        <div className="container-x">
          <p className="eyebrow !text-[#f2c9a0] justify-center">Pricing</p>
          <h2 className="mt-4 text-4xl sm:text-5xl">Simple, honest pricing</h2>
          <p className="mt-4 text-white/75">Clear starting prices with no surprises.</p>
        </div>
      </div>
      <Wave fill="rgb(var(--background))" className="-mt-px bg-forest" />

      <div className="container-x pb-20 pt-6 sm:pb-28">
        <div className="text-center">
          <p className="eyebrow justify-center">Packages</p>
          <h3 className="mt-3 text-3xl sm:text-4xl">Simple, transparent packages</h3>
          <p className="mt-3 text-sm text-muted">Starting prices. Final cost depends on your pup&apos;s size, coat and condition.</p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3 md:items-center">
          {PACKAGES.map((p) => (
            <div
              key={p.name}
              className={`relative flex flex-col rounded-3xl p-8 ${
                p.featured
                  ? "bg-forest text-white shadow-2xl md:py-12"
                  : "border border-border bg-surface shadow-[0_20px_40px_-30px_rgba(0,0,0,0.25)]"
              }`}
            >
              {p.featured && (
                <span className="absolute -top-3 left-8 rounded-full bg-accent px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
                  Most Popular
                </span>
              )}
              <h4 className="text-2xl">{p.name}</h4>
              <p className={`mt-1 text-sm ${p.featured ? "text-white/70" : "text-muted"}`}>{p.blurb}</p>
              <p className="mt-6 flex items-start gap-1.5">
                <span className={`mt-2 text-xs ${p.featured ? "text-white/60" : "text-muted"}`}>from</span>
                <span className="font-serif text-5xl">${p.from}</span>
              </p>
              <ul className="mt-6 flex-1 space-y-3 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-3">
                    <span className="grid h-4 w-4 flex-none place-items-center rounded-full bg-accent text-[8px] text-white">✓</span>
                    <span className={p.featured ? "text-white/85" : "text-foreground/80"}>{f}</span>
                  </li>
                ))}
              </ul>
              <a href={BOOKING_HREF} className="btn-primary mt-8 w-full">
                Book {p.name}
              </a>
            </div>
          ))}
        </div>

        {/* Pricing by size */}
        <div className="mt-24 rounded-[2rem] bg-sage-soft/70 px-4 py-14 sm:px-10">
          <div className="text-center">
            <p className="eyebrow justify-center">Pricing by Size</p>
            <h3 className="mt-3 text-3xl sm:text-4xl">Find your pup&apos;s price</h3>
            <p className="mt-3 text-sm text-muted">Starting prices by weight.</p>
          </div>

          <div className="mx-auto mt-10 max-w-4xl">
            <div className="grid grid-cols-4 gap-2 px-4 pb-3 text-[10px] font-semibold uppercase tracking-widest text-muted sm:px-8 sm:text-[11px]">
              <span>Pup size</span>
              {PACKAGES.map((p) => (
                <span key={p.name} className="text-center">{p.name}</span>
              ))}
            </div>
            <div className="space-y-3">
              {SIZE_PRICING.map((row) => (
                <div key={row.size} className="grid grid-cols-4 items-center gap-2 rounded-2xl bg-surface px-4 py-5 shadow-sm sm:px-8">
                  <div>
                    <p className="font-serif text-lg sm:text-xl">{row.size}</p>
                    <p className="text-xs text-muted">{row.weight}</p>
                  </div>
                  {row.prices.map((price, i) => (
                    <p key={i} className="text-center font-serif text-lg text-accent sm:text-xl">${price}</p>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
