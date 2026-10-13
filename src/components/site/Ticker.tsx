"use client";

import { useEffect, useRef } from "react";
import { TICKER } from "@/lib/services";

/**
 * Two stacked ribbons that follow the same gentle wave, with the text flowing
 * along the curve (SVG textPath) in opposite directions.
 *
 * The loop is seamless because `textLength` pins one repetition of the phrases
 * to exactly UNIT user units, and startOffset animates by exactly UNIT. UNIT must
 * stay longer than the path's arc length so the ribbon never shows a gap.
 *
 * Every other separator is the logo stamp. An image can't sit inside a textPath,
 * so the text keeps an invisible placeholder glyph there and each frame a stamp
 * is moved onto that glyph's current position and angle.
 */
const UNIT = 1750;
const WAVE = "M-120,110 Q240,50 600,110 T1320,110 T2040,110";
const ICON = 36;
const SLOT = " "; // em space: the gap the stamp sits in

type Part = { text: string; slot?: boolean };
const PARTS: Part[] = TICKER.flatMap((t, i): Part[] =>
  i % 2 ? [{ text: `${t}  ❀  ` }] : [{ text: `${t}  ` }, { text: SLOT, slot: true }, { text: "  " }],
);
const RUN: Part[] = [...PARTS, ...PARTS];

// Character index of every placeholder within the text element
const SLOTS: number[] = [];
RUN.reduce((at, p) => {
  if (p.slot) SLOTS.push(at);
  return at + p.text.length;
}, 0);

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
  const textRef = useRef<SVGTextElement>(null);
  const iconsRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const text = textRef.current;
    const icons = iconsRef.current;
    if (!text || !icons) return;
    let frame = 0;
    const place = () => {
      const count = text.getNumberOfChars();
      SLOTS.forEach((ci, k) => {
        const icon = icons.children[k] as SVGGraphicsElement | undefined;
        if (!icon) return;
        try {
          if (ci >= count) throw 0;
          const box = text.getExtentOfChar(ci);
          if (!box.width) throw 0;
          const angle = text.getRotationOfChar(ci);
          icon.setAttribute(
            "transform",
            `translate(${box.x + box.width / 2} ${box.y + box.height / 2}) rotate(${angle}) translate(${-ICON / 2} ${-ICON / 2})`,
          );
          icon.style.opacity = "1";
        } catch {
          icon.style.opacity = "0";
        }
      });
      frame = requestAnimationFrame(place);
    };
    place();
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <g transform={`translate(0 ${dy})`}>
      <path d={WAVE} fill="none" stroke={band} strokeWidth="54" />
      <path id={id} d={WAVE} fill="none" />
      <text ref={textRef} className="font-serif" fontSize="25" fill={ink} dy="0.35em" style={{ whiteSpace: "pre" }}>
        <textPath href={`#${id}`} textLength={UNIT * 2} lengthAdjust="spacing">
          {RUN.map((p, i) => (
            <tspan key={i} fillOpacity={p.slot ? 0 : undefined}>
              {p.text}
            </tspan>
          ))}
          <animate
            attributeName="startOffset"
            from={reverse ? -UNIT : 0}
            to={reverse ? 0 : -UNIT}
            dur={dur}
            repeatCount="indefinite"
          />
        </textPath>
      </text>
      <g ref={iconsRef}>
        {SLOTS.map((ci) => (
          <image key={ci} href="/brand/daisys-logo-stamp.svg" width={ICON} height={ICON} style={{ opacity: 0 }} />
        ))}
      </g>
    </g>
  );
}

export default function Ticker() {
  return (
    <div className="relative -mt-4 overflow-hidden" aria-label={TICKER.join(", ")}>
      <svg
        viewBox="0 0 1440 230"
        preserveAspectRatio="xMidYMid slice"
        className="block aspect-[1440/230] min-h-[170px] w-full"
        aria-hidden
      >
        <Ribbon id="wave-back" dy={46} band="rgb(var(--sage))" ink="rgb(var(--forest))" reverse dur="60s" />
        <Ribbon id="wave-front" dy={0} band="rgb(var(--accent))" ink="rgb(var(--foreground))" dur="50s" />
      </svg>
    </div>
  );
}
