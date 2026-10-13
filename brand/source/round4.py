exec(open("round3.py").read().split("def make(")[0])
import math

def H(cx, cy, s, ink=INK, paper=PAPER, w=46):
    return head(cx - 520 * s, cy - 575 * s, s, ink, paper, weight=w)

def daisy_c(cx, cy, R, seed, ink=INK, paper=PAPER):
    return daisy2(cx, cy, R, seed).replace(INK, "#INK#").replace(PAPER, paper).replace("#INK#", ink)

def scallop(cx, cy, r, n, bump):
    pts = []
    for i in range(n):
        a0 = 2 * math.pi * i / n; a1 = 2 * math.pi * (i + 1) / n
        x1, y1 = cx + r * math.cos(a1), cy + r * math.sin(a1)
        if not pts: pts.append(f"M{cx + r * math.cos(a0):.1f},{cy + r * math.sin(a0):.1f}")
        pts.append(f"A{bump},{bump} 0 0 1 {x1:.1f},{y1:.1f}")
    return "".join(pts) + "Z"

def petal_ring(cx, cy, r0, L, W, n, seed):
    rnd = random.Random(seed); out = []
    for layer, k in ((0, .5), (1, 0)):
        for i in range(n):
            ang = (i + k) * 360 / n + rnd.uniform(-3, 3) - 90
            d, v = petal(cx, cy, ang, r0, L * rnd.uniform(.9, 1.0) * (.92 if not layer else 1), W, .02, rnd)
            out.append(f'<path d="{d}" fill="{PAPER}" stroke="{INK}" stroke-width="22" stroke-linejoin="round"/>')
            if layer: out.append(f'<path d="{v}" fill="none" stroke="{INK}" stroke-width="11" stroke-linecap="round"/>')
    return "".join(out)

def clip(id, d, body): return f'<clipPath id="{id}"><path d="{d}"/></clipPath><g clip-path="url(#{id})">{body}</g>'
CIRC = "M500,40 A460,460 0 1 1 499.9,40 Z"
ARCH = "M150,960 V390 A350,350 0 0 1 850,390 V960 Z"
TILE = "M140,40 H860 A100,100 0 0 1 960,140 V860 A100,100 0 0 1 860,960 H140 A100,100 0 0 1 40,860 V140 A100,100 0 0 1 140,40 Z"
SC = scallop(500, 500, 430, 16, 95)

V = {
  "A  Stamp":            f'<path d="{CIRC}" fill="{INK}"/>' + clip("a", CIRC, daisy_c(700, 330, 230, 7, INK, PAPER) + H(470, 620, .66)),
  "B  Silhouette":       daisy2(700, 320, 270, 7) + H(450, 560, .7, PAPER, INK, 40),
  "C  Petal frame":      petal_ring(500, 500, 230, 245, 92, 20, 2) + f'<circle cx="500" cy="500" r="262" fill="{PAPER}" stroke="{INK}" stroke-width="40"/>' + clip("c", "M500,258 A242,242 0 1 1 499.9,258 Z", H(500, 600, .42)),
  "D  Arch window":      f'<path d="{ARCH}" fill="{INK}"/>' + clip("d", ARCH, daisy_c(300, 300, 190, 11, INK, PAPER) + H(530, 640, .62)),
  "E  Scalloped badge":  f'<path d="{SC}" fill="{PAPER}" stroke="{INK}" stroke-width="40"/>' + clip("e", "M500,120 A380,380 0 1 1 499.9,120 Z", daisy2(660, 330, 190, 9) + H(470, 600, .56)) + f'<circle cx="500" cy="500" r="380" fill="none" stroke="{INK}" stroke-width="22"/>',
  "F  Tile":             f'<path d="{TILE}" fill="{INK}"/>' + clip("f", TILE, daisy_c(250, 760, 260, 5, INK, PAPER) + H(560, 560, .74)),
  "G  Silhouette stamp": f'<path d="{CIRC}" fill="{PAPER}" stroke="{INK}" stroke-width="40"/>' + clip("g", CIRC, daisy2(690, 300, 210, 21) + H(470, 640, .66, PAPER, INK, 36)),
  "H  Holding a daisy":  H(430, 520, .76) + f'<path d="M705,770 C780,700 820,560 800,380" fill="none" stroke="{INK}" stroke-width="34" stroke-linecap="round"/>'
                         + f'<path d="M790,560 C850,520 900,520 930,540 C890,590 840,600 790,560 Z" fill="{PAPER}" stroke="{INK}" stroke-width="28" stroke-linejoin="round"/>' + daisy2(800, 300, 170, 13),
}
import os
os.makedirs("r4", exist_ok=True)
for i, (k, v) in enumerate(V.items()): open(f"r4/{i+1}.svg", "w").write(svg(v))
cells = "".join(f'<figure><div class=big><img src="r4/{i+1}.svg"></div><div class=row><div class=t style="background:{INK}"><img src="r4/{i+1}.svg"></div><img class=fav src="r4/{i+1}.svg"><img class=fav2 src="r4/{i+1}.svg"></div><figcaption>{k}</figcaption></figure>' for i, k in enumerate(V))
open("r4.html","w").write(f'<style>body{{margin:0;padding:24px;background:#fff;font:600 16px sans-serif;display:grid;grid-template-columns:repeat(4,1fr);gap:24px}}figure{{margin:0}}.big{{padding:16px;border-radius:16px;background:{BG}}}.big img{{width:100%;display:block}}.row{{display:flex;gap:10px;align-items:center;margin-top:8px}}.t{{padding:6px;border-radius:10px}}.t img{{width:56px;display:block}}.fav{{width:32px}}.fav2{{width:16px}}figcaption{{margin-top:6px;white-space:pre}}</style>{cells}')
