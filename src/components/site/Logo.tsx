import { SITE_SHORT_NAME } from "@/lib/site";

export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <a href="#top" className={`group flex items-baseline gap-1.5 font-serif ${light ? "text-white" : "text-foreground"}`}>
      <span className="text-2xl font-medium tracking-tight sm:text-[28px]">{SITE_SHORT_NAME}</span>
      <span className="text-2xl italic text-accent sm:text-[28px]">✿</span>
      <span className={`hidden text-[10px] font-sans font-semibold uppercase tracking-[0.25em] sm:inline ${light ? "text-white/70" : "text-muted"}`}>
        Dog Grooming
      </span>
    </a>
  );
}
