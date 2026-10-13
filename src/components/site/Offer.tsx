import Wave from "./Wave";
import { ArcText, CircleText, Daisy, Paw, Sparkle } from "./Shapes";
import { BOOKING_HREF, CONTACT, PORTAL_HREF } from "@/lib/site";

export default function Offer() {
  return (
    <section id="book" className="relative bg-background">
      <Wave fill="rgb(var(--forest))" />
      <div className="relative overflow-hidden bg-forest pb-24 pt-10 text-center text-white sm:pt-14">
        <Daisy className="absolute left-[7%] top-16 h-16 w-16 animate-float" />
        <Daisy className="absolute left-[16%] bottom-20 h-9 w-9 animate-float [animation-delay:-2s]" petal="#f2c9a0" center="#c0664a" />
        <Daisy className="absolute right-[10%] bottom-24 h-12 w-12 animate-float [animation-delay:-4s]" />
        <Paw className="absolute right-[6%] top-12 h-14 w-14 rotate-[20deg] text-white/10" />
        <Paw className="absolute right-[14%] top-28 h-9 w-9 rotate-[35deg] text-white/10" />
        <Paw className="absolute bottom-10 left-[30%] h-8 w-8 -rotate-12 text-white/10" />
        <Sparkle className="absolute left-[24%] top-24 h-5 w-5 text-[#f2c9a0]" />
        <div className="absolute right-[18%] top-1/2 hidden -translate-y-1/2 xl:block">
          <CircleText id="offer-badge" text="Book 24/7 ✦ book online ✦ book 24/7 ✦ " size={160} textClass="fill-[#f2c9a0]">
            <span className="grid h-20 w-20 place-items-center rounded-full bg-accent shadow-lg"><Daisy className="h-12 w-12" /></span>
          </CircleText>
        </div>
        <div className="container-x relative max-w-2xl">
          <ArcText id="offer-arc" text="new pups welcome" className="mx-auto -mb-4 text-[#f2c9a0]" width={300} />
          <p className="eyebrow !text-[#f2c9a0] justify-center">Ready When You Are</p>
          <h2 className="mt-5 text-4xl leading-tight sm:text-6xl">
            Treat your pup to a <span className="italic text-[#f2c9a0]">spa day</span>
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
      </div>
    </section>
  );
}
