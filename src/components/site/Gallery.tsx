import Image from "next/image";
import Cutout from "./Cutout";
import { CircleText, Paw } from "./Shapes";
import { GALLERY, STICKERS } from "@/lib/images";
import { FACEBOOK_HREF } from "@/lib/site";

const SHAPES = [
  "rounded-t-full rounded-b-3xl",
  "rounded-[60%_40%_55%_45%/50%_55%_45%_50%]",
  "rounded-[2rem_6rem_2rem_6rem]",
  "rounded-b-full rounded-t-3xl",
  "rounded-[6rem_2rem_6rem_2rem]",
  "rounded-[3rem]",
];

export default function Gallery() {
  return (
    <section id="gallery" className="container-x relative py-20 sm:py-28">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div className="relative">
          <Cutout
            {...STICKERS.blackPoodle}
            decorative
            sizes="200px"
            className="absolute -right-36 -bottom-4 hidden h-40 w-32 rotate-12 sm:block"
          />
          <p className="eyebrow">Fresh Off the Table</p>
          <h2 className="mt-4 text-4xl sm:text-5xl">
            Recent <span className="italic text-accent">glow-ups</span>
          </h2>
        </div>
        <a href={FACEBOOK_HREF} target="_blank" rel="noopener" className="btn-outline">
          See more on Facebook
        </a>
      </div>

      <div className="relative mt-14 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:gap-8">
        {GALLERY.map((img, i) => (
          <div
            key={img.src}
            className={`group relative aspect-[3/4] overflow-hidden bg-sage-soft ${SHAPES[i % SHAPES.length]} ${
              i % 3 === 1 ? "md:translate-y-12" : ""
            }`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(min-width:768px) 30vw, 48vw"
              className="object-cover object-[center_70%] transition duration-500 group-hover:scale-105"
            />
          </div>
        ))}
        <div className="pointer-events-none absolute -right-6 top-1/3 hidden text-forest xl:block">
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
