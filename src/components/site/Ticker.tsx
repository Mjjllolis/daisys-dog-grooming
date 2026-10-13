import { TICKER } from "@/lib/services";

export default function Ticker() {
  const items = [...TICKER, ...TICKER];
  return (
    <div className="relative overflow-hidden border-b border-border py-6" aria-label="What we do">
      <div className="flex w-max animate-marquee gap-12 whitespace-nowrap hover:[animation-play-state:paused]">
        {items.map((t, i) => (
          <span key={i} className="flex items-center gap-12 font-serif text-xl text-foreground/85 sm:text-2xl">
            {t}
            <span className="text-sm text-accent">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
