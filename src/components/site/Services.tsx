import Image from "next/image";
import CheckList from "./CheckList";
import Cutout from "./Cutout";
import { ArcText, Daisy, Paw, Sparkle } from "./Shapes";
import { IMAGES, STICKERS } from "@/lib/images";
import { SERVICE_POINTS } from "@/lib/services";
import { BOOKING_HREF } from "@/lib/site";

export default function Services() {
  return (
    <section id="services" className="relative overflow-hidden bg-sage-soft/60 py-20 sm:py-28">
      <Paw className="absolute -left-10 top-10 h-40 w-40 -rotate-12 text-sage/30" />
      <div className="container-x grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="order-2 lg:order-1">
          <p className="eyebrow">Dog Grooming</p>
          <h2 className="mt-4 text-4xl leading-tight sm:text-5xl">
            Baths, cuts &amp; <span className="italic text-forest">breed styling</span>
          </h2>
          <p className="mt-6 max-w-lg leading-relaxed text-muted">
            From a quick bath to a full haircut, every groom is tailored to your dog&apos;s coat, size and personality —
            finished with a heart tail or bow if you like.
          </p>
          <div className="mt-8">
            <CheckList items={SERVICE_POINTS} />
          </div>
          <div className="mt-10 flex items-center gap-6">
            <p className="relative grid h-24 w-24 -rotate-6 place-items-center rounded-full bg-forest text-center font-serif leading-none text-white shadow-lg">
              <span>
                <span className="block text-[10px] font-sans uppercase tracking-widest text-white/70">from</span>
                <span className="text-3xl">$45</span>
              </span>
              <Sparkle className="absolute -right-2 -top-2 h-8 w-8 text-accent" />
            </p>
            <a href={BOOKING_HREF} target="_blank" rel="noopener" className="btn-primary">
              Book Now
            </a>
          </div>
        </div>
        <div className="relative order-1 mx-auto w-full max-w-md lg:order-2 lg:max-w-xl">
          <ArcText id="services-arc" text="fresh · fluffy · happy" className="mx-auto -mb-6 text-forest" width={380} />
          <div className="relative aspect-square">
            <div className="absolute inset-[-6%] animate-spin-slow rounded-full border-2 border-dashed border-accent/40" />
            <div className="absolute inset-0 animate-morph overflow-hidden shadow-[0_30px_60px_-30px_rgba(62,75,58,0.6)]">
              <Image src={IMAGES.services.src} alt={IMAGES.services.alt} fill sizes="(min-width:1024px) 40vw, 90vw" className="object-cover object-[center_75%]" />
            </div>
            <Daisy className="absolute -left-3 top-8 h-16 w-16 animate-float" />
            <Daisy className="absolute bottom-6 right-0 h-16 w-16 animate-float [animation-delay:-3s]" petal="#ffffff" />
            <Cutout
              {...STICKERS.doodleSparkles}
              decorative
              sizes="(min-width:640px) 340px, 200px"
              className="absolute -bottom-16 -left-6 h-64 w-48 animate-float [--r:-6deg] sm:-left-28 sm:h-[26rem] sm:w-80"
            />
            <Sparkle className="absolute -right-4 top-1/3 h-6 w-6 text-forest" />
          </div>
        </div>
      </div>
    </section>
  );
}
