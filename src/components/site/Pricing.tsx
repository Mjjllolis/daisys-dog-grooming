import Wave from "./Wave";
import Cutout from "./Cutout";
import BgPhoto from "./BgPhoto";
import { BACKDROPS, STICKERS } from "@/lib/images";
import { CircleText, Daisy, Paw, Sparkle } from "./Shapes";
import { ADD_ONS, PACKAGES, SIZE_COLUMNS, SIZE_PRICING } from "@/lib/services";
import { BOOKING_HREF } from "@/lib/site";

export default function Pricing() {
  return (
    <section id="pricing" className="relative">
      <div className="relative isolate overflow-hidden bg-forest pb-10 pt-20 text-center text-white sm:pt-24">
        <BgPhoto src={BACKDROPS.pricing} tint opacity={0.22} className="inset-0" />
        <Paw className="absolute left-[6%] top-10 h-16 w-16 -rotate-12 text-white/10" />
        <Paw className="absolute left-[12%] top-28 h-10 w-10 rotate-12 text-white/10" />
        <Daisy className="absolute right-[8%] top-12 h-14 w-14 animate-float opacity-90" />
        <Sparkle className="absolute right-[18%] top-32 h-5 w-5 text-[#f2c9a0]" />
        <div className="container-x relative">
          <p className="eyebrow !text-[#f2c9a0] justify-center">Pricing</p>
          <h2 className="mt-4 text-4xl sm:text-5xl">Simple, honest pricing</h2>
          <p className="mt-4 text-white/75">Clear starting prices, by size. No surprises.</p>
        </div>
      </div>
      <Wave fill="rgb(var(--background))" className="-mt-px bg-forest" />

      <div className="container-x pb-20 pt-6 sm:pb-28">
        <div className="text-center">
          <p className="eyebrow justify-center">Packages</p>
          <h3 className="mt-3 text-3xl sm:text-4xl">Simple, transparent packages</h3>
          <p className="mt-3 text-sm text-muted">Starting prices for small pups. Final cost depends on size, coat and condition.</p>
        </div>

        <div className="mt-72 grid gap-x-6 gap-y-72 md:grid-cols-3 md:items-end">
          {PACKAGES.map((p) => (
            <div
              key={p.name}
              className={`relative flex flex-col p-8 ${
                p.featured
                  ? "rounded-t-[160px] rounded-b-[32px] bg-forest pt-16 text-white shadow-2xl md:pb-12 md:pt-20"
                  : "rounded-[32px] border border-border bg-surface shadow-[0_20px_40px_-30px_rgba(0,0,0,0.25)]"
              }`}
            >
              <Cutout
                {...p.dog}
                sizes="360px"
                className={`absolute h-72 w-64 ${p.featured ? "-top-[17rem] left-1/2 -translate-x-1/2" : "-top-[17.5rem] left-1/2 -translate-x-1/2"}`}
              />
              {p.featured && (
                <div className="absolute -right-6 top-6 text-white">
                  <CircleText id="popular-badge" text="Most popular ✦ most popular ✦ " size={104} textClass="fill-white">
                    <span className="absolute inset-0 -z-10 m-auto h-[104px] w-[104px] rounded-full bg-accent shadow-lg" />
                    <Daisy className="h-9 w-9" />
                  </CircleText>
                </div>
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
              <a href={BOOKING_HREF} target="_blank" rel="noopener" className="btn-primary mt-8 w-full">
                Book {p.name}
              </a>
            </div>
          ))}
        </div>

        {/* Pricing by size */}
        <div className="relative mt-24 rounded-[3rem_3rem_3rem_3rem] bg-sage-soft/70 px-4 py-14 sm:rounded-[6rem_2rem_6rem_2rem] sm:px-10">
          <Paw className="absolute -top-6 right-10 h-14 w-14 rotate-12 text-accent" />
          <div className="text-center">
            <p className="eyebrow justify-center">Pricing by Size</p>
            <h3 className="mt-3 text-3xl sm:text-4xl">
              Find your pup&apos;s <span className="italic text-accent">price</span>
            </h3>
            <p className="mt-3 text-sm text-muted">Starting prices by weight.</p>
          </div>

          {/* Size lineup: one pup per size, drawn roughly to scale */}
          <div className="mx-auto mt-10 flex max-w-3xl items-end justify-center gap-2 sm:gap-8">
            {SIZE_PRICING.map((row, i) => (
              <div key={row.size} className="flex flex-col items-center">
                <Cutout
                  {...row.dog}
                  sizes="(min-width:640px) 260px, 120px"
                  className={["h-24 w-20 sm:h-40 sm:w-32", "h-32 w-24 sm:h-52 sm:w-40", "h-40 w-24 sm:h-64 sm:w-44", "h-48 w-28 sm:h-80 sm:w-48"][i]}
                />
                <span className="mt-2 rounded-full bg-surface px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-muted shadow-sm sm:text-[11px]">
                  {row.size}
                </span>
              </div>
            ))}
          </div>

          <div className="mx-auto mt-10 max-w-3xl">
            <div className="grid grid-cols-3 gap-2 px-4 pb-3 text-[10px] font-semibold uppercase tracking-widest text-muted sm:px-8 sm:text-[11px]">
              <span>Pup size</span>
              {SIZE_COLUMNS.map((c) => (
                <span key={c} className="text-center">{c}</span>
              ))}
            </div>
            <div className="space-y-3">
              {SIZE_PRICING.map((row) => (
                <div key={row.size} className="grid grid-cols-3 items-center gap-2 rounded-full bg-surface px-6 py-4 shadow-sm sm:px-10">
                  <div>
                    <p className="font-serif text-lg sm:text-xl">{row.size}</p>
                    <p className="text-xs text-muted">{row.weight}</p>
                  </div>
                  {row.prices.map((price, i) => (
                    <p key={i} className="text-center font-serif text-lg text-accent sm:text-xl">
                      ${price}
                      {row.plus && <sup className="ml-0.5 text-xs">+</sup>}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Add-ons as pill "tags" */}
          <div className="mx-auto mt-16 grid max-w-4xl items-center gap-6 lg:grid-cols-[auto_1fr]">
            {/* Party-hat pup = bows, heart tails and other finishing touches */}
            <Cutout {...STICKERS.shihTzu} decorative sizes="(min-width:1024px) 320px, 220px" className="mx-auto h-64 w-52 -rotate-6 lg:h-80 lg:w-64" />
            <div className="text-center lg:text-left">
            <p className="eyebrow justify-center lg:justify-start">Finishing Touches</p>
            <h4 className="mt-3 text-2xl sm:text-3xl">Add-ons &amp; extras</h4>
            <div className="mt-7 flex flex-wrap justify-center gap-3 lg:justify-start">
              {ADD_ONS.map((a, i) => (
                <span
                  key={a.name}
                  className={`inline-flex items-center gap-3 rounded-full border border-border bg-surface px-5 py-2.5 text-sm shadow-sm ${
                    i % 2 ? "rotate-[1.5deg]" : "-rotate-[1.5deg]"
                  }`}
                >
                  <span className="font-medium">{a.name}</span>
                  <span className="font-serif text-accent">{a.price}</span>
                </span>
              ))}
            </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
