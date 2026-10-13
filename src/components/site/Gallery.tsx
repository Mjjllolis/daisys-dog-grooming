import Image from "next/image";
import { CircleText, Paw } from "./Shapes";
import { GALLERY } from "@/lib/images";
import { FACEBOOK_HREF } from "@/lib/site";

const SHAPES = [
  "rounded-t-full rounded-b-3xl",
  "rounded-[60%_40%_55%_45%/50%_55%_45%_50%]",
  "rounded-[2rem_6rem_2rem_6rem]",
  "rounded-b-full rounded-t-3xl",
  "rounded-[6rem_2rem_6rem_2rem]",
  "rounded-[3rem]",
  "rounded-t-3xl rounded-b-full",
  "rounded-[45%_55%_40%_60%/55%_45%_55%_45%]",
];

export default function Gallery() {
  return (
    <section id="gallery" className="relative py-20 sm:py-28">
      <div className="container-x flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="eyebrow">Fresh Off the Table</p>
          <h2 className="mt-4 text-4xl sm:text-5xl">
            Recent <span className="italic text-forest">glow-ups</span>
          </h2>
        </div>
        <a href={FACEBOOK_HREF} target="_blank" rel="noopener" className="btn-outline">
          See more on Facebook
        </a>
      </div>

      <div className="relative mt-14 grid grid-cols-2 gap-3 px-4 sm:gap-5 sm:px-6 lg:grid-cols-4 lg:gap-6 lg:px-8">
        {GALLERY.map((img, i) => (
          <div
            key={img.src}
            className={`group relative aspect-[3/4] overflow-hidden bg-sage-soft ${SHAPES[i % SHAPES.length]} ${
              i % 2 === 1 ? "lg:translate-y-10" : ""
            }`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(min-width:1024px) 25vw, 50vw"
              className="object-cover object-[center_70%] transition duration-500 group-hover:scale-105"
            />
          </div>
        ))}
        <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 text-forest xl:block">
          <CircleText id="gallery-badge" text="Fresh ✦ fluffy ✦ happy ✦ fresh ✦ fluffy ✦ " size={130} textClass="fill-forest">
            <span className="grid h-14 w-14 place-items-center rounded-full bg-accent shadow-md">
              <Paw className="h-7 w-7 text-foreground" />
            </span>
          </CircleText>
        </div>
      </div>
    </section>
  );
}
