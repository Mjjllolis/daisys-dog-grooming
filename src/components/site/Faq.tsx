import Cutout from "./Cutout";
import BgPhoto from "./BgPhoto";
import { BACKDROPS, STICKERS } from "@/lib/images";
import { FAQS } from "@/lib/faqs";
import { CONTACT } from "@/lib/site";

export default function Faq() {
  return (
    <section className="relative isolate overflow-hidden bg-sage-soft/60 py-20 sm:py-28">
      <BgPhoto src={BACKDROPS.faq} opacity={0.14} fade="left" className="inset-y-0 right-0 w-1/2" />
      <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.7fr] lg:gap-16">
        <div>
          <p className="eyebrow">FAQ</p>
          <h2 className="mt-4 text-5xl sm:text-6xl">Good to know</h2>
          <p className="mt-5 max-w-sm text-lg leading-relaxed text-muted">
            Can&apos;t find what you need? Reach out and we&apos;ll be happy to help.
          </p>
          <a href={`mailto:${CONTACT.email}`} className="btn-outline mt-8">
            Contact Us
          </a>
          {/* Curious head-tilt pup for the questions section */}
          <Cutout {...STICKERS.brownDog} decorative sizes="360px" className="mt-10 hidden h-96 w-72 -rotate-3 lg:block" />
        </div>
        <div className="self-start divide-y divide-border rounded-[2rem] bg-surface px-6 py-2 shadow-[0_30px_60px_-40px_rgba(62,75,58,0.45)] sm:px-12 sm:py-4">
          {FAQS.map((f, i) => (
            <details key={f.q} className="group py-6 sm:py-8" open={i === 0}>
              <summary className="flex cursor-pointer list-none items-center gap-5 font-serif text-xl text-foreground marker:hidden group-open:text-forest sm:text-[1.75rem] sm:leading-snug [&::-webkit-details-marker]:hidden">
                <span className="w-6 flex-none text-center text-2xl text-forest">
                  <span className="group-open:hidden">+</span>
                  <span className="hidden group-open:inline">–</span>
                </span>
                {f.q}
              </summary>
              <p className="pl-11 pt-4 text-base leading-relaxed text-muted sm:text-lg">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
