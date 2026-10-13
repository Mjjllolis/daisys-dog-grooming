import { TICKER } from "@/lib/services";

/**
 * Two stacked ribbons that follow the same gentle wave, with the text flowing
 * along the curve (SVG textPath) in opposite directions.
 *
 * The loop is seamless because `textLength` pins one repetition of the phrases
 * to exactly UNIT user units, and startOffset animates by exactly UNIT. UNIT must
 * stay longer than the path's arc length so the ribbon never shows a gap.
 */
const UNIT = 1750;
const WAVE = "M-120,110 Q240,50 600,110 T1320,110 T2040,110";
const RUN = TICKER.map((t, i) => `${t}  ${i % 2 ? "❀" : "✦"}  `).join("");

function Ribbon({
  id,
  dy,
  band,
  ink,
  reverse = false,
  dur,
}: {
  id: string;
  dy: number;
  band: string;
  ink: string;
  reverse?: boolean;
  dur: string;
}) {
  return (
    <g transform={`translate(0 ${dy})`}>
      <path d={WAVE} fill="none" stroke={band} strokeWidth="54" />
      <path id={id} d={WAVE} fill="none" />
      <text className="font-serif" fontSize="25" fill={ink} dy="0.35em">
        <textPath href={`#${id}`} textLength={UNIT * 2} lengthAdjust="spacing">
          {RUN + RUN}
          <animate
            attributeName="startOffset"
            from={reverse ? -UNIT : 0}
            to={reverse ? 0 : -UNIT}
            dur={dur}
            repeatCount="indefinite"
          />
        </textPath>
      </text>
    </g>
  );
}

export default function Ticker() {
  return (
    <div className="relative -mt-4 overflow-hidden" aria-label={TICKER.join(", ")}>
      <svg
        viewBox="0 0 1440 220"
        preserveAspectRatio="xMidYMid slice"
        className="block h-[170px] w-full sm:h-[220px]"
        aria-hidden
      >
        <Ribbon id="wave-back" dy={46} band="rgb(var(--sage))" ink="rgb(var(--forest))" reverse dur="60s" />
        <Ribbon id="wave-front" dy={0} band="rgb(var(--accent))" ink="#ffffff" dur="50s" />
      </svg>
    </div>
  );
}
