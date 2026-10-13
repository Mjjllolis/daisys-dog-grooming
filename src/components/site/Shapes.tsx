/**
 * Decorative shapes: rotating circular text badges, daisy + paw doodles,
 * a hand-drawn squiggle underline and text set along an arc. All aria-hidden
 * except the badge label, which is real text for screen readers.
 */

/** Text running around a circle, with an optional centre graphic. Spins slowly. */
export function CircleText({
  id,
  text,
  size = 150,
  className = "",
  textClass = "fill-current",
  children,
}: {
  id: string;
  text: string;
  size?: number;
  className?: string;
  textClass?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className={`relative grid place-items-center ${className}`} style={{ width: size, height: size }}>
      <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full animate-spin-slow" aria-label={text}>
        <defs>
          <path id={id} d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
        </defs>
        <text className={`${textClass} font-sans text-[15px] font-semibold uppercase`} style={{ letterSpacing: "0.32em" }}>
          <textPath href={`#${id}`} textLength="480">
            {text}
          </textPath>
        </text>
      </svg>
      <div className="relative">{children}</div>
    </div>
  );
}

/** Text along a gentle upward arc — used as a playful heading accent. */
export function ArcText({ id, text, className = "", width = 420 }: { id: string; text: string; className?: string; width?: number }) {
  return (
    <svg viewBox="0 0 400 110" width={width} className={`max-w-full ${className}`} aria-label={text}>
      <defs>
        <path id={id} d="M20,100 Q200,-10 380,100" />
      </defs>
      <text className="fill-current font-serif text-[30px] italic">
        <textPath href={`#${id}`} startOffset="50%" textAnchor="middle">
          {text}
        </textPath>
      </text>
    </svg>
  );
}

export function Daisy({ className = "", petal = "#fffaf0", center = "#e0a24a" }: { className?: string; petal?: string; center?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden>
      {Array.from({ length: 10 }).map((_, i) => (
        <ellipse key={i} cx="50" cy="24" rx="9.5" ry="22" fill={petal} transform={`rotate(${i * 36} 50 50)`} />
      ))}
      <circle cx="50" cy="50" r="13" fill={center} />
    </svg>
  );
}

export function Paw({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="currentColor" aria-hidden>
      <ellipse cx="50" cy="66" rx="22" ry="18" />
      <ellipse cx="24" cy="40" rx="9" ry="12" transform="rotate(-20 24 40)" />
      <ellipse cx="41" cy="24" rx="9" ry="12" transform="rotate(-6 41 24)" />
      <ellipse cx="59" cy="24" rx="9" ry="12" transform="rotate(6 59 24)" />
      <ellipse cx="76" cy="40" rx="9" ry="12" transform="rotate(20 76 40)" />
    </svg>
  );
}

/** Hand-drawn underline that sits beneath a highlighted word. */
export function Squiggle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 300 24" preserveAspectRatio="none" className={className} aria-hidden>
      <path
        d="M4,16 C40,4 70,22 105,12 S170,4 205,14 S265,20 296,8"
        fill="none"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Four-point sparkle. */
export function Sparkle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M12 0 C13 8 16 11 24 12 C16 13 13 16 12 24 C11 16 8 13 0 12 C8 11 11 8 12 0Z" />
    </svg>
  );
}
