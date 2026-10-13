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
  (498, 1104, None), (150, 900, None), (62, 800, T(3, 46, .1)), (52, 640, None), (100, 505, None), (150, 410, None),
  # back ear, rounded tip
  (168, 300, None), (190, 190, None), (228, 138, None), (270, 158, None), (298, 215, None), (325, 262, None),
  (360, 246, None),
  # front ear, same size and shape
  (385, 178, None), (410, 82, None), (450, 36, None), (490, 58, None), (512, 120, None), (528, 205, None),
  # forehead into a bushy brow that overhangs the eye
  (640, 250, None), (722, 290, T(4, 40, .25)), (800, 352, None), (738, 372, None),
  # muzzle to the nose
  (752, 428, None), (880, 488, None), (978, 540, None), (996, 585, None), (958, 632, T(3, 40, .1)),
  # scruffy beard, then back along its bottom
  (952, 770, T(6, 46, .05)), (560, 818, T(2, 40, .1)),
  # throat and chest
  (528, 900, None), (526, 1000, None), (520, 1088, None),
]
FUR = outline(DOG_SPEC)

def details(ink, paper):
    return (
      f'<path d="M205,250 Q228,190 262,232" fill="none" stroke="{ink}" stroke-width="26" stroke-linecap="round"/>'
      f'<path d="M425,150 Q450,92 482,132" fill="none" stroke="{ink}" stroke-width="26" stroke-linecap="round"/>'
      # eye with a glint
      f'<path d="M540,418 Q585,380 630,412 Q590,445 540,418 Z" fill="{ink}"/>'
      f'<circle cx="598" cy="405" r="11" fill="{paper}"/>'
      # brow line
      f'<path d="M500,430 C540,414 562,392 584,364 C620,384 668,382 712,366" fill="none" stroke="{ink}" stroke-width="28" stroke-linecap="round" stroke-linejoin="round"/>'
      # nose with a highlight
      f'<path d="M928,530 C968,516 1004,540 998,578 C992,610 946,614 930,590 C916,568 912,540 928,530 Z" fill="{ink}"/>'
      f'<path d="M944,544 Q966,534 980,550" fill="none" stroke="{paper}" stroke-width="13" stroke-linecap="round"/>'
      # jaw line and beard parting
      f'<path d="M446,634 C452,700 474,764 520,808" fill="none" stroke="{ink}" stroke-width="28" stroke-linecap="round"/>'
      f'<path d="M905,650 C920,700 914,760 890,800" fill="none" stroke="{ink}" stroke-width="22" stroke-linecap="round"/>'
      f'<path d="M820,640 C812,690 818,740 836,790" fill="none" stroke="{ink}" stroke-width="18" stroke-linecap="round"/>'
      # neck fur
      f'<path d="M210,700 q44,40 34,100 M300,820 q40,36 30,92 M420,900 q34,30 26,86" fill="none" stroke="{ink}" stroke-width="20" stroke-linecap="round"/>'
    )

def fur_dog(cx, cy, s, ink=INK, paper=PAPER):
    tx, ty = cx - 520 * s, cy - 575 * s
    return f'<g transform="translate({tx:.1f} {ty:.1f}) scale({s})"><path d="{FUR}" fill="{paper}" stroke="{ink}" stroke-width="30" stroke-linejoin="round" paint-order="stroke"/>{details(ink, paper)}</g>'

STAMP = f'<path d="{CIRC}" fill="{INK}"/>'
logo = STAMP + clip("st", CIRC, real_daisy(675, 330, 205, 16, .19, .26, ring=True) + fur_dog(440, 640, .68))
open("dog2.svg", "w").write(svg(logo))
open("dog2.html", "w").write(f'<body style="margin:0;background:{BG};display:flex;gap:30px;align-items:center;padding:30px"><img src="dog2.svg" width=560><img src="dog2.svg" width=120><img src="dog2.svg" width=48><img src="dog2.svg" width=24></body>')
