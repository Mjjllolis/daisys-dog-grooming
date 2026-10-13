import Image from "next/image";
import { CircleText, Paw } from "./Shapes";
import { DOGS } from "@/lib/images";
import { FACEBOOK_HREF } from "@/lib/site";

const SHAPES = [
  "rounded-t-full rounded-b-3xl",
  "rounded-[60%_40%_55%_45%/50%_55%_45%_50%]",
  "rounded-[2rem_6rem_2rem_6rem]",
  "rounded-full",
  "rounded-[6rem_2rem_6rem_2rem]",
  "rounded-b-full rounded-t-3xl",
];

export default function Gallery() {
  return (
    <section id="gallery" className="container-x relative py-20 sm:py-28">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="eyebrow">Fresh Off the Table</p>
          <h2 className="mt-4 text-4xl sm:text-5xl">
            Recent <span className="italic text-accent">glow-ups</span>
          </h2>
        </div>
        <a href={FACEBOOK_HREF} target="_blank" rel="noopener" className="btn-outline">
          See more on Facebook
        </a>
      </div>

      <div className="relative mt-14 grid grid-cols-2 gap-5 sm:gap-8 md:grid-cols-3">
        {DOGS.map((d, i) => (
          <figure key={d.src} className={`group ${i % 3 === 1 ? "md:translate-y-12" : ""}`}>
            <div className={`relative aspect-[3/4] overflow-hidden ${SHAPES[i % SHAPES.length]}`}>
              <Image
                src={d.src}
                alt={d.alt}
                fill
                sizes="(min-width:768px) 30vw, 45vw"
                className="object-cover object-[center_75%] transition duration-500 group-hover:scale-105"
              />
            </div>
            <figcaption className="mt-3 flex items-center gap-2 font-serif text-lg">
              <Paw className="h-4 w-4 text-accent" /> {d.name}
            </figcaption>
          </figure>
        ))}
        <div className="pointer-events-none absolute -right-4 top-1/3 hidden text-forest lg:block">
          <CircleText id="gallery-badge" text="Fresh ✦ fluffy ✦ happy ✦ fresh ✦ fluffy ✦ " size={130} textClass="fill-forest">
            <span className="grid h-14 w-14 place-items-center rounded-full bg-accent shadow-md">
              <Paw className="h-7 w-7 text-white" />
            </span>
          </CircleText>
        </div>
      </div>
    </section>
  );
}
