import Image from "next/image";

/**
 * A transparent cut-out or sticker, sized by its box (Tailwind classes) and
 * anchored to the bottom so dogs "stand" on whatever edge they're placed on.
 */
export default function Cutout({
  src,
  alt,
  className = "",
  sizes = "200px",
  decorative = false,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  decorative?: boolean;
}) {
  return (
    // Positioning comes from the caller; fall back to `relative` (needed by
    // next/image `fill`) only when none is given, so the two never conflict.
    <div className={`pointer-events-none ${/\b(absolute|fixed)\b/.test(className) ? "" : "relative"} ${className}`}>
      <Image
        src={src}
        alt={decorative ? "" : alt}
        fill
        sizes={sizes}
        className="object-contain object-bottom drop-shadow-[0_12px_14px_rgba(42,42,36,0.18)]"
      />
    </div>
  );
}
