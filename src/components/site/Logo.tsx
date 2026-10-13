import { SITE_NAME } from "@/lib/site";

/** Daisy's logo: the ink stamp (schnauzer, daisy, sage leaves) with the name in Newsreader + DM Sans. Source in /brand/final. */
export default function Logo({ light = false, className = "h-12 w-auto sm:h-14" }: { light?: boolean; className?: string }) {
  return (
    <a href="#top" className="flex items-center" aria-label={`${SITE_NAME} — home`}>
      {/* eslint-disable-next-line @next/next/no-img-element -- vector logo, nothing to optimise */}
      <img
        src={light ? "/brand/daisys-logo-horizontal-reversed.svg" : "/brand/daisys-logo-horizontal.svg"}
        alt={SITE_NAME}
        width={2420}
        height={1000}
        className={className}
      />
    </a>
  );
}
