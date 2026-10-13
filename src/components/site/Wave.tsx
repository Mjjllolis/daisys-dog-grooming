/**
 * Soft layered wave used at the bottom/top of colored bands, as in the design.
 * `fill` is the color of the section the wave flows *into*.
 */
export default function Wave({
  fill = "rgb(var(--background))",
  flip = false,
  className = "",
}: {
  fill?: string;
  flip?: boolean;
  className?: string;
}) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
      className={`block h-16 w-full sm:h-24 ${flip ? "rotate-180" : ""} ${className}`}
    >
      <path
        d="M0,64 C240,120 480,8 760,40 C1040,72 1240,110 1440,60 L1440,120 L0,120 Z"
        fill="rgb(var(--sage))"
        opacity="0.45"
      />
      <path d="M0,88 C300,40 560,120 860,82 C1120,50 1300,70 1440,92 L1440,120 L0,120 Z" fill={fill} />
    </svg>
  );
}
