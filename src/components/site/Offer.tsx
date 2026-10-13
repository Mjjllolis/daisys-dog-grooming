import Wave from "./Wave";
import Cutout from "./Cutout";
import BgPhoto from "./BgPhoto";
import { BACKDROPS, STICKERS } from "@/lib/images";
import { ArcText, CircleText, Daisy, Paw, Sparkle } from "./Shapes";
import { BOOKING_HREF, CONTACT, PORTAL_HREF } from "@/lib/site";

export default function Offer() {
  return (
    <section id="book" className="relative bg-background">
      <Wave fill="rgb(var(--forest))" />
      <div className="relative isolate overflow-hidden bg-forest pb-20 pt-10 text-center text-white sm:pt-14 lg:pb-0">
        <BgPhoto src={BACKDROPS.offer} tint opacity={0.2} className="inset-0" />
        <Daisy className="absolute left-[3%] top-4 h-14 w-14 animate-float sm:left-[6%] sm:top-14 sm:h-28 sm:w-28" />
        <Daisy className="absolute bottom-6 left-[8%] h-10 w-10 animate-float [animation-delay:-2s] sm:bottom-20 sm:left-[17%] sm:h-14 sm:w-14" />
        <Daisy className="absolute bottom-24 right-[9%] hidden h-20 w-20 animate-float [animation-delay:-4s] sm:block" />
        <Paw className="absolute right-[3%] top-4 h-14 w-14 sm:right-[6%] sm:top-12 sm:h-24 sm:w-24 rotate-[20deg] text-white/10" />
        <Paw className="absolute right-[14%] top-28 hidden h-14 w-14 rotate-[35deg] text-white/10 sm:block" />
        <Paw className="absolute bottom-10 left-[30%] h-14 w-14 -rotate-12 text-white/10" />
        <Sparkle className="absolute left-[24%] top-24 hidden h-9 w-9 text-accent sm:block" />
        <div className="absolute right-[28%] top-3 hidden xl:block">
          <CircleText id="offer-badge" text="Book 24/7 ✦ book online ✦ book 24/7 ✦ " size={170} textClass="fill-sage">
            <img src="/brand/daisys-logo-stamp.svg" alt="" className="h-24 w-24 drop-shadow-lg" />
          </CircleText>
        </div>
        <div className="container-x relative max-w-2xl">
          <ArcText id="offer-arc" text="new pups welcome" className="mx-auto -mb-4 text-sage" width={300} />
          <p className="eyebrow !text-sage justify-center">Ready When You Are</p>
          <h2 className="mt-5 text-4xl leading-tight sm:text-6xl">
            Treat your pup to a <span className="italic text-accent">spa day</span>
          </h2>
          <p className="mx-auto mt-6 max-w-md text-white/75">
            Book online any time, day or night — or call us at {CONTACT.phone}. Returning clients can manage
            appointments in the client portal.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a href={BOOKING_HREF} target="_blank" rel="noopener" className="btn-primary">
              Book a Groom
            </a>
            <a href={PORTAL_HREF} target="_blank" rel="noopener" className="btn-outline-light">
              Client Login
            </a>
          </div>
        </div>

        {/* Two big pups flanking the call to action, standing on the footer edge */}
        <div className="relative mx-auto hidden h-0 max-w-7xl lg:block">
          <Cutout {...STICKERS.blackPoodle} decorative sizes="420px" className="absolute bottom-0 left-0 h-[26rem] w-80 -rotate-3" />
          <Cutout {...STICKERS.doodle} decorative sizes="420px" className="absolute bottom-0 right-0 h-[26rem] w-80 rotate-3" />
        </div>
        <div className="hidden h-24 lg:block" />
      </div>
    </section>
  );
}
