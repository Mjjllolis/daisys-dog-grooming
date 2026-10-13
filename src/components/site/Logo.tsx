import Image from "next/image";
import { SITE_NAME } from "@/lib/site";

/** Daisy's own logo (schnauzer line drawing + script), cut out from the Groomore avatar. */
export default function Logo({ light = false, className = "h-12 w-auto sm:h-14" }: { light?: boolean; className?: string }) {
  return (
    <a href="#top" className="flex items-center" aria-label={`${SITE_NAME} — home`}>
      <Image
        src={light ? "/logo-light.png" : "/logo-dark.png"}
        alt={SITE_NAME}
        width={900}
        height={383}
        priority
        className={className}
      />
    </a>
  );
}
