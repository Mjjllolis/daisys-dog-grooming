import { SITE_NAME } from "@/lib/site";

/** Daisy's logo: the schnauzer line drawing with the script/condensed lockup. Source in /brand. */
export default function Logo({ light = false, className = "h-12 w-auto sm:h-14" }: { light?: boolean; className?: string }) {
  return (
    <a href="#top" className="flex items-center" aria-label={`${SITE_NAME} — home`}>
      {/* eslint-disable-next-line @next/next/no-img-element -- vector logo, nothing to optimise */}
      <img
        src={light ? "/brand/logo-horizontal-reversed.svg" : "/brand/logo-horizontal.svg"}
        alt={SITE_NAME}
        width={2956}
        height={1150}
        className={className}
      />
    </a>
  );
}
