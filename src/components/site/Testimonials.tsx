import Cutout from "./Cutout";
import { STICKERS } from "@/lib/images";
import { TESTIMONIALS } from "@/lib/testimonials";

const CARD_STICKERS = [STICKERS.jackRussell, STICKERS.corgi, STICKERS.aussie];

export default function Testimonials() {
  return (
    <section className="container-x py-20 sm:py-28">
      <div className="text-center">
        <p className="eyebrow justify-center">Happy Tails</p>
        <h2 className="mt-4 text-4xl sm:text-5xl">What our pups&apos; people say</h2>
      </div>
      <div className="mt-20 grid gap-x-6 gap-y-16 md:grid-cols-3">
        {TESTIMONIALS.map((t, i) => (
          <figure key={t.quote} className="relative flex flex-col rounded-3xl border border-border bg-surface p-8">
            <Cutout
              {...CARD_STICKERS[i % CARD_STICKERS.length]}
              decorative
              sizes="120px"
              className={`absolute -right-4 -top-14 h-28 w-24 ${i % 2 ? "-rotate-6" : "rotate-6"}`}
            />
            <span className="font-serif text-5xl leading-none text-accent">&ldquo;</span>
            <blockquote className="mt-2 flex-1 font-serif text-xl leading-snug">{t.quote}</blockquote>
            <figcaption className="mt-6 border-t border-border pt-5 text-sm">
              <p className="font-semibold">{t.name}</p>
              <p className="text-muted">{t.pet}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
