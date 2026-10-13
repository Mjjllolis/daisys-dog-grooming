import BgPhoto from "./BgPhoto";
import Cutout from "./Cutout";
import { BACKDROPS, STICKERS } from "@/lib/images";
import { TESTIMONIALS } from "@/lib/testimonials";

/** Each review gets its own pup sticker, sitting on top of the card like an avatar. */
const CARD_STICKERS = [STICKERS.jackRussell, STICKERS.corgi, STICKERS.aussie];

export default function Testimonials() {
  return (
    <section className="relative isolate overflow-hidden py-20 sm:py-28">
      <BgPhoto src={BACKDROPS.reviews} opacity={0.14} fade="radial" className="inset-0" />
      <div className="container-x">
        <div className="text-center">
          <p className="eyebrow justify-center">Happy Tails</p>
          <h2 className="mt-4 text-4xl sm:text-5xl">What our pups&apos; people say</h2>
        </div>
        <div className="mt-48 grid gap-x-6 gap-y-56 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <figure key={t.quote} className="relative flex flex-col rounded-3xl border border-border bg-surface/95 p-8 pt-12 shadow-sm">
              <Cutout
                {...CARD_STICKERS[i]}
                decorative
                sizes="300px"
                className="absolute -top-48 left-1/2 h-56 w-48 -translate-x-1/2"
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
      </div>
    </section>
  );
}
