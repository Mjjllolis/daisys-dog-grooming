import math
exec(open("round6.py").read().rsplit("\nSTAMP = ", 1)[0])

def cr_points(pts, i, steps):
    """Sample the closed Catmull-Rom spline segment pts[i] -> pts[i+1]."""
    n = len(pts); p0, p1, p2, p3 = (pts[(i + k) % n] for k in (-1, 0, 1, 2))
    out = []
    for s in range(steps + 1):
        t = s / steps; t2, t3 = t * t, t * t * t
        out.append(tuple(.5 * ((2 * p1[j]) + (-p0[j] + p2[j]) * t + (2*p0[j] - 5*p1[j] + 4*p2[j] - p3[j]) * t2 + (-p0[j] + 3*p1[j] - 3*p2[j] + p3[j]) * t3) for j in (0, 1)))
    return out

def outline(spec):
    """spec: list of (x, y, tuft) — tuft = None or (count, depth, lean) for the segment to the next point.
    Smooth segments become cubic Béziers; tufted ones become flicks of fur pointing outward."""
    pts = [(x, y) for x, y, _ in spec]; n = len(pts); d = f"M{pts[0][0]:.1f},{pts[0][1]:.1f}"
    for i in range(n):
        p0, p1, p2, p3 = (pts[(i + k) % n] for k in (-1, 0, 1, 2))
        tuft = spec[i][2]
        if not tuft:
            c1 = (p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6)
            c2 = (p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6)
            d += f" C{c1[0]:.1f},{c1[1]:.1f} {c2[0]:.1f},{c2[1]:.1f} {p2[0]:.1f},{p2[1]:.1f}"
            continue
        count, depth, lean = tuft
        samples = cr_points(pts, i, count)
        for a, b in zip(samples, samples[1:]):
            dx, dy = b[0] - a[0], b[1] - a[1]; L = math.hypot(dx, dy) or 1
            ux, uy = dx / L, dy / L; ox, oy = uy, -ux           # outward normal (clockwise outline)
            tip = (a[0] + dx * (.55 + lean) + ox * depth, a[1] + dy * (.55 + lean) + oy * depth)
            c1 = (a[0] + dx * .2 + ox * depth * .55, a[1] + dy * .2 + oy * depth * .55)
            c2 = (a[0] + dx * .8 + ox * depth * .15, a[1] + dy * .8 + oy * depth * .15)
            d += f" Q{c1[0]:.1f},{c1[1]:.1f} {tip[0]:.1f},{tip[1]:.1f} Q{c2[0]:.1f},{c2[1]:.1f} {b[0]:.1f},{b[1]:.1f}"
    return d + " Z"

T = lambda n, dep, lean=0: (n, dep, lean)
# In the original drawing's coordinates (1020 x 1150), clockwise from the bottom of the neck.
DOG_SPEC = [
  (498, 1104, None), (150, 900, None), (62, 800, None), (44, 700, None), (80, 560, None), (150, 410, None),
  # back ear: the original drawing's ear, unchanged
  (145, 344, None),
  (146, 253, None),
  (158, 153, None),
  (173, 80, None),
  (182, 46, None),
  (202, 63, None),
  (238, 103, None),
  (279, 163, None),
  (318, 232, None),
  (336, 236, None),
  # front ear: a copy of the back ear at 85% size
  (372, 236, None),
  (382, 223, None),
  (392, 138, None),
  (405, 76, None),
  (412, 47, None),
  (429, 61, None),
  (460, 95, None),
  (495, 146, None),
  (528, 205, None),
  # forehead and the brow hook from the original drawing
  (640, 250, None), (730, 292, None), (790, 336, None), (780, 356, None), (722, 364, None),
  # muzzle to the nose
  (748, 428, None), (880, 490, None), (978, 540, None), (996, 585, None), (956, 632, None),
  # the original wavy beard
  (960, 700, None), (944, 772, None), (895, 820, None), (830, 850, None), (780, 836, None), (752, 788, None),
  (722, 830, None), (676, 842, None), (632, 826, None), (606, 790, None), (580, 826, None), (546, 830, None),
  (526, 900, None), (524, 1000, None), (520, 1088, None),
]
FUR = outline(DOG_SPEC)

def details(ink, paper):
    w = 34
    return (
      # inner-ear highlight lines
      f'<path d="M172,236 Q186,130 214,104" fill="none" stroke="{ink}" stroke-width="{w*.8:.0f}" stroke-linecap="round"/>'
      f'<path d="M398,211 Q410,121 434,99" fill="none" stroke="{ink}" stroke-width="{w*.8:.0f}" stroke-linecap="round"/>'
      # ear-base crease from the original
      f'<path d="M154,418 C180,450 200,470 218,488" fill="none" stroke="{ink}" stroke-width="{w}" stroke-linecap="round"/>'
      # brow and eye (with a glint), as in the original
      f'<path d="M502,430 C540,414 562,392 580,362 C612,384 662,382 702,360" fill="none" stroke="{ink}" stroke-width="{w}" stroke-linecap="round" stroke-linejoin="round"/>'
      f'<path d="M548,414 C570,392 600,394 610,420 C596,438 562,436 548,414 Z" fill="{ink}"/>'
      f'<circle cx="590" cy="408" r="9" fill="{paper}"/>'
      # nose with a highlight
      f'<path d="M928,530 C968,516 1004,540 998,578 C992,610 946,614 930,590 C916,568 912,540 928,530 Z" fill="{ink}"/>'
      f'<path d="M944,544 Q966,534 980,550" fill="none" stroke="{paper}" stroke-width="13" stroke-linecap="round"/>'
      # nostril curl, inner beard and jaw line from the original
      f'<path d="M930,620 C906,612 888,592 886,562" fill="none" stroke="{ink}" stroke-width="{w}" stroke-linecap="round"/>'
      f'<path d="M924,692 C918,730 910,770 902,796" fill="none" stroke="{ink}" stroke-width="{w}" stroke-linecap="round"/>'
      f'<path d="M446,634 C452,700 474,764 524,800" fill="none" stroke="{ink}" stroke-width="{w}" stroke-linecap="round"/>'
    )

def fur_dog(cx, cy, s, ink=INK, paper=PAPER):
    tx, ty = cx - 520 * s, cy - 575 * s
    return f'<g transform="translate({tx:.1f} {ty:.1f}) scale({s})"><path d="{FUR}" fill="{paper}" stroke="{ink}" stroke-width="30" stroke-linejoin="round" paint-order="stroke"/>{details(ink, paper)}</g>'

STAMP = f'<path d="{CIRC}" fill="{INK}"/>'
logo = STAMP + clip("st", CIRC, real_daisy(675, 330, 205, 16, .19, .26, ring=True) + fur_dog(440, 640, .68))
open("dog3.svg", "w").write(svg(logo))
open("dog3.html", "w").write(f'<body style="margin:0;background:{BG};display:flex;gap:30px;align-items:center;padding:30px"><img src="dog3.svg" width=560><img src="dog3.svg" width=120><img src="dog3.svg" width=48><img src="dog3.svg" width=24></body>')
