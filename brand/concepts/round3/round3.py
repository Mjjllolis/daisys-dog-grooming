exec(open("dogdaisy.py").read().split("SW = 22")[0])
import math, random

INK, PAPER = FOREST, CREAM

def daisy2(cx, cy, R, seed):
    """Two-colour daisy: paper petals with ink outlines, ink centre with paper florets."""
    rnd = random.Random(seed); sw = max(R * .055, 14); cr = R * .27; out = []
    for layer, k in ((0, .5), (1, 0)):
        n = 14 if layer else 7
        for i in range(n):
            ang = (i + k) * 360 / n + rnd.uniform(-6, 6) - 90
            d, v = petal(cx, cy, ang, cr * .55, R * rnd.uniform(.66, .78) - cr * .55, R * rnd.uniform(.19, .23), rnd.uniform(.015, .03), rnd)
            out.append(f'<path d="{d}" fill="{PAPER}" stroke="{INK}" stroke-width="{sw:.1f}" stroke-linejoin="round"/>')
            if layer: out.append(f'<path d="{v}" fill="none" stroke="{INK}" stroke-width="{sw*.5:.1f}" stroke-linecap="round"/>')
    out.append(f'<circle cx="{cx}" cy="{cy}" r="{cr:.1f}" fill="{INK}"/>')
    for j in range(1, 34):
        rr = cr * .78 * math.sqrt(j / 34); th = j * 2.39996
        out.append(f'<circle cx="{cx+rr*math.cos(th):.1f}" cy="{cy+rr*math.sin(th):.1f}" r="{cr*.06:.1f}" fill="{PAPER}"/>')
    return "".join(out)

def make(daisies, tx=157, ty=150, s=.66):
    return svg("".join(daisy2(*d) for d in daisies) + head(tx, ty, s, INK, PAPER, weight=46))

V = {
  "1 behind the face (H)":     make([(690, 330, 290, 7)], 40, 170),
  "2 halo":                    make([(500, 430, 480, 3)], 215, 250, .54),
  "3 behind the ears":         make([(250, 230, 250, 11)], 200, 200),
  "4 behind the neck":         make([(260, 690, 280, 5)], 230, 120),
  "5 under the chin":          make([(760, 790, 230, 9)], 90, 90),
  "6 two daisies":             make([(720, 300, 260, 7), (215, 760, 170, 12)], 150, 140),
  "7 peeking over the head":   make([(560, 230, 230, 21)], 140, 230),
  "8 rising sun":              make([(700, 640, 330, 4)], 40, 140, .62),
}
import os, json
os.makedirs("r3", exist_ok=True)
for i, (k, v) in enumerate(V.items()): open(f"r3/{i+1}.svg", "w").write(v)
cells = "".join(f'<figure><div class=big><img src="r3/{i+1}.svg"></div><div class=row><div class=t style="background:{INK}"><img src="r3/{i+1}.svg"></div><img class=fav src="r3/{i+1}.svg"><img class=fav2 src="r3/{i+1}.svg"></div><figcaption>{k}</figcaption></figure>' for i, k in enumerate(V))
open("r3.html","w").write(f'<style>body{{margin:0;padding:24px;background:#fff;font:600 16px sans-serif;display:grid;grid-template-columns:repeat(4,1fr);gap:24px}}figure{{margin:0}}.big{{padding:16px;border-radius:16px;background:{BG}}}.big img{{width:100%;display:block}}.row{{display:flex;gap:10px;align-items:center;margin-top:8px}}.t{{padding:6px;border-radius:10px}}.t img{{width:56px;display:block}}.fav{{width:32px}}.fav2{{width:16px}}figcaption{{margin-top:6px}}</style>{cells}')
