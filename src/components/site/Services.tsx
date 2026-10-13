import Image from "next/image";
import CheckList from "./CheckList";
import { IMAGES } from "@/lib/images";
import { SERVICE_POINTS } from "@/lib/services";
import { BOOKING_HREF } from "@/lib/site";

export default function Services() {
  return (
    <section id="services" className="bg-sage-soft/60 py-20 sm:py-28">
      <div className="container-x grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="order-2 lg:order-1">
          <p className="eyebrow">Dog Grooming</p>
          <h2 className="mt-4 text-4xl leading-tight sm:text-5xl">Baths, cuts &amp; breed styling</h2>
          <p className="mt-6 max-w-lg leading-relaxed text-muted">
            From a tidy-up to a full breed-specific groom, we tailor every cut to your dog&apos;s coat, size and
            lifestyle.
          </p>
          <div className="mt-8">
            <CheckList items={SERVICE_POINTS} />
          </div>
          <div className="mt-10 flex items-center gap-6">
            <p className="font-serif text-3xl text-accent">from $45</p>
            <a href={BOOKING_HREF} className="btn-primary">
              Book Now
            </a>
          </div>
        </div>
        <div className="relative order-1 mx-auto w-full max-w-md lg:order-2 lg:max-w-none">
          <div className="relative aspect-[5/4] overflow-hidden rounded-t-[999px] rounded-b-3xl">
            <Image src={IMAGES.services.src} alt={IMAGES.services.alt} fill sizes="(min-width:1024px) 45vw, 90vw" className="object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}
