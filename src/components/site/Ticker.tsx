import { TICKER } from "@/lib/services";
import { Daisy, Paw } from "./Shapes";

function Ribbon({ reverse = false, className = "" }: { reverse?: boolean; className?: string }) {
  const items = [...TICKER, ...TICKER];
  return (
    <div className={`overflow-hidden py-4 ${className}`}>
      <div
        className={`flex w-max gap-10 whitespace-nowrap ${reverse ? "animate-marquee-rev" : "animate-marquee"}`}
      >
        {items.map((t, i) => (
          <span key={i} className="flex items-center gap-10 font-serif text-xl sm:text-2xl">
            {t}
            {i % 2 ? <Paw className="h-5 w-5 opacity-80" /> : <Daisy className="h-6 w-6" />}
          </span>
        ))}
      </div>
    </div>
  );
}

/** Two ribbons crossing at opposite angles. */
export default function Ticker() {
  return (
    <div className="relative -mt-6 h-40 overflow-hidden sm:h-44" aria-label="What we do">
      <Ribbon reverse className="absolute inset-x-[-5%] top-12 rotate-[2.5deg] bg-sage text-forest" />
      <Ribbon className="absolute inset-x-[-5%] top-12 -rotate-[2.5deg] bg-accent text-white shadow-lg" />
    </div>
  );
}
