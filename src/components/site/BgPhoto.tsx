import Image from "next/image";

/**
 * A real grooming photo used as a faded section backdrop. `tint` blends it into
 * a coloured band (luminosity blend keeps the shapes, drops the colour); `fade`
 * masks it out towards one side so it never fights the copy.
 */
export default function BgPhoto({
  src,
  className = "",
  opacity = 0.2,
  tint = false,
  fade = "none",
}: {
  src: string;
  className?: string;
  opacity?: number;
  tint?: boolean;
  fade?: "none" | "left" | "right" | "radial";
}) {
  const mask = {
    none: undefined,
    left: "linear-gradient(to left, black 30%, transparent 95%)",
    right: "linear-gradient(to right, black 30%, transparent 95%)",
    radial: "radial-gradient(ellipse at center, black 35%, transparent 75%)",
  }[fade];
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute -z-10 overflow-hidden ${className}`}
      style={{ opacity, maskImage: mask, WebkitMaskImage: mask }}
    >
      <Image src={src} alt="" fill sizes="60vw" className={`object-cover ${tint ? "mix-blend-luminosity" : ""}`} />
    </div>
  );
}
