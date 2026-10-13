exec(open("round4.py").read().split("V = {")[0])

def simple_daisy(cx, cy, R, ink=INK, paper=PAPER, n=13, rot=-90, sw=None):
    """Clip-art daisy: one solid scalloped flower shape (petals merged, no gaps), short petal lines, solid centre."""
    sw = sw or max(R * .075, 12)
    petals = "".join(f'<ellipse cx="{cx}" cy="{cy - R*.56:.1f}" rx="{R*.2:.1f}" ry="{R*.44:.1f}" transform="rotate({rot + 90 + i*360/n:.1f} {cx} {cy})"/>' for i in range(n))
    out = [f'<g fill="{ink}" stroke="{ink}" stroke-width="{sw*2:.1f}">{petals}</g>',   # outline of the union
           f'<g fill="{paper}">{petals}</g>']                                                # fill over it: no inner overlaps
    for i in range(n):
        a = math.radians(rot + (i + .5) * 360 / n)
        r1, r2 = R * .3, R * .62
        out.append(f'<line x1="{cx + r1*math.cos(a):.1f}" y1="{cy + r1*math.sin(a):.1f}" x2="{cx + r2*math.cos(a):.1f}" y2="{cy + r2*math.sin(a):.1f}" stroke="{ink}" stroke-width="{sw*.8:.1f}" stroke-linecap="round"/>')
    out.append(f'<circle cx="{cx}" cy="{cy}" r="{R*.32:.1f}" fill="{ink}"/>')
    return "".join(out)

def silhouette(cx, cy, s, w=36):
    # solid dog, paper details; re-stroke the outline in ink so no paper edge shows
    tx, ty = cx - 520 * s, cy - 575 * s
    return head(tx, ty, s, PAPER, INK, weight=w) + f'<path d="{SIL}" transform="translate({tx} {ty}) scale({s})" fill="none" stroke="{INK}" stroke-width="{w+6}" stroke-linejoin="round"/>'

STAMP = f'<path d="{CIRC}" fill="{INK}"/>'
V = {
  "A1  Stamp, daisy above":      STAMP + clip("a1", CIRC, H(450, 640, .62)) + simple_daisy(705, 265, 135),
  "A2  Stamp, daisy at the ear": STAMP + clip("a2", CIRC, H(470, 630, .64)) + simple_daisy(372, 330, 115),
  "A3  Stamp, daisy at the chin":STAMP + clip("a3", CIRC, H(450, 600, .62)) + simple_daisy(690, 760, 120),
  "A4  Stamp, daisy behind the face": STAMP + clip("a4", CIRC, simple_daisy(690, 330, 170) + H(440, 630, .64)),
  "B1  Silhouette, daisy above": silhouette(430, 600, .7) + simple_daisy(770, 230, 160),
  "B2  Silhouette, daisy at the ear": silhouette(470, 560, .74) + simple_daisy(340, 260, 125),
  "B3  Silhouette, daisy at the chin": silhouette(420, 520, .7) + simple_daisy(770, 800, 140),
  "B4  Silhouette, daisy behind the face": simple_daisy(700, 320, 230) + silhouette(420, 590, .7),
}
import os
os.makedirs("r5", exist_ok=True)
for i, (k, v) in enumerate(V.items()): open(f"r5/{i+1}.svg", "w").write(svg(v))
cells = "".join(f'<figure><div class=big><img src="r5/{i+1}.svg"></div><div class=row><div class=t style="background:{INK}"><img src="r5/{i+1}.svg"></div><div class=t style="background:#fff"><img src="r5/{i+1}.svg"></div><img class=fav src="r5/{i+1}.svg"><img class=fav2 src="r5/{i+1}.svg"></div><figcaption>{k}</figcaption></figure>' for i, k in enumerate(V))
open("r5.html","w").write(f'<style>body{{margin:0;padding:24px;background:#fff;font:600 16px sans-serif;display:grid;grid-template-columns:repeat(4,1fr);gap:24px}}figure{{margin:0}}.big{{padding:16px;border-radius:16px;background:{BG}}}.big img{{width:100%;display:block}}.row{{display:flex;gap:10px;align-items:center;margin-top:8px}}.t{{padding:6px;border-radius:10px}}.t img{{width:56px;display:block}}.fav{{width:32px}}.fav2{{width:16px}}figcaption{{margin-top:6px}}</style>{cells}')
