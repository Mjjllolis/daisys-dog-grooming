import math, random, re

FOREST, TERRA, CREAM, SAGE, SOFT, GOLD, BG = "#3E4B3A", "#C0664A", "#FFFAF0", "#A9B29B", "#E9EBE1", "#E0A24A", "#F8F5EF"

def petal(cx, cy, ang, r0, length, width, notch, rnd):
    """One petal: a long teardrop from the disc edge with a small notched tip, like a real daisy."""
    a = math.radians(ang)
    ux, uy = math.cos(a), math.sin(a)            # along the petal
    px, py = -uy, ux                              # across it
    def P(t, s):                                  # t along (0..1 of length), s across (px)
        return (cx + ux * (r0 + t * length) + px * s, cy + uy * (r0 + t * length) + py * s)
    w = width; bend = rnd.uniform(-0.12, 0.12) * w
    b0 = P(0, -w * .2); b1 = P(0, w * .2)
    l1 = P(.62, -w / 2 + bend); r1 = P(.62, w / 2 + bend)
    tl = P(.985, -w * .2 + bend); tr = P(.985, w * .2 + bend); tn = P(1 - notch, bend)
    f = lambda p: f"{p[0]:.1f},{p[1]:.1f}"
    c = lambda t, s: f(P(t, s + bend * t))
    d = (f"M{f(b0)} C{c(.2,-w*.36)} {c(.4,-w*.5)} {f(l1)} C{c(.82,-w*.5)} {c(.97,-w*.4)} {f(tl)} "
         f"Q{c(.98,-w*.12)} {f(tn)} Q{c(.98,w*.12)} {f(tr)} C{c(.97,w*.4)} {c(.82,w*.5)} {f(r1)} "
         f"C{c(.4,w*.5)} {c(.2,w*.36)} {f(b1)} Z")
    vein = f"M{c(.12,0)} Q{c(.4,w*.05)} {c(.62,0)}"
    return d, vein

def daisy(cx, cy, R, n=14, seed=7, stroke=FOREST, sw=None, petal_fill=CREAM, center=GOLD, veins=True, center_r=None, texture=True):
    rnd = random.Random(seed); sw = sw or R * 0.026
    cr = center_r or R * 0.26
    out = []
    order = list(range(n))
    # back layer of petals first (offset half a step) so petals overlap like a real flower
    for layer, k in ((0, .5), (1, 0)):
        for i in range(n if layer else n // 2):
            ang = (i + k) * 360 / (n if layer else n // 2) + rnd.uniform(-6, 6) - 90
            L = R * rnd.uniform(.66, .78) - cr * .55
            W = R * rnd.uniform(.19, .23) * (0.9 if layer == 0 else 1)
            d, v = petal(cx, cy, ang, cr * .55, L, W, rnd.uniform(.015, .03), rnd)
            fill = petal_fill if layer else SOFT if petal_fill != "none" else "none"
            out.append(f'<path d="{d}" fill="{fill}" stroke="{stroke}" stroke-width="{sw:.1f}" stroke-linejoin="round"/>')
            if veins and layer:
                out.append(f'<path d="{v}" fill="none" stroke="{stroke}" stroke-width="{sw*.55:.1f}" stroke-linecap="round" opacity=".55"/>')
    if center:
        out.append(f'<circle cx="{cx}" cy="{cy}" r="{cr:.1f}" fill="{center}" stroke="{stroke}" stroke-width="{sw:.1f}"/>')
        if texture:
            # florets: a sunflower spiral of dots, denser toward the middle
            for j in range(1, 60):
                rr = cr * .82 * math.sqrt(j / 60); th = j * 2.39996
                out.append(f'<circle cx="{cx+rr*math.cos(th):.1f}" cy="{cy+rr*math.sin(th):.1f}" r="{cr*.045:.1f}" fill="{stroke}" opacity=".35"/>')
    return "".join(out)

def paw(cx, cy, s, fill):
    return (f'<g transform="translate({cx-50*s} {cy-50*s}) scale({s})" fill="{fill}">'
            '<ellipse cx="50" cy="64" rx="21" ry="17"/><ellipse cx="25" cy="40" rx="8.5" ry="11.5" transform="rotate(-20 25 40)"/>'
            '<ellipse cx="41.5" cy="25" rx="8.5" ry="11.5" transform="rotate(-6 41.5 25)"/><ellipse cx="58.5" cy="25" rx="8.5" ry="11.5" transform="rotate(6 58.5 25)"/>'
            '<ellipse cx="75" cy="40" rx="8.5" ry="11.5" transform="rotate(20 75 40)"/></g>')

DOG = re.sub(r"<!--.*?-->\n?", "", open("dog.svg").read())
def dog(cx, cy, size, color, weight):
    s = size / 1150
    return f'<g transform="translate({cx-510*s} {cy-575*s}) scale({s})" color="{color}">{DOG.replace("stroke-width=\"16\"", f"stroke-width=\"{weight}\"")}</g>'

def leaf(x, y, ang, L, stroke, fill):
    return (f'<g transform="translate({x} {y}) rotate({ang})"><path d="M0,0 C{L*.3},{-L*.28} {L*.75},{-L*.26} {L},0 C{L*.75},{L*.24} {L*.3},{L*.26} 0,0 Z" fill="{fill}" stroke="{stroke}" stroke-width="9" stroke-linejoin="round"/>'
            f'<path d="M{L*.08},0 Q{L*.5},{-L*.03} {L*.9},0" fill="none" stroke="{stroke}" stroke-width="5" stroke-linecap="round" opacity=".6"/></g>')

def svg(body, w=1000, h=1000):
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}">{body}</svg>\n'

concepts = {
  "A-daisy": svg(daisy(500, 500, 470, seed=7)),
  "B-paw-daisy": svg(daisy(500, 500, 470, seed=11, center=TERRA, texture=False, center_r=150) + paw(500, 505, 2.3, CREAM)),
  "C-dog-daisy": svg(daisy(500, 500, 470, seed=3, center=SOFT, texture=False, center_r=190) + f'<clipPath id="cc"><circle cx="500" cy="500" r="186"/></clipPath><g clip-path="url(#cc)">{dog(492, 560, 400, FOREST, 26)}</g>'),
  "D-arch-daisy": svg(
      f'<path d="M190,960 V420 A310,310 0 0 1 810,420 V960 Z" fill="{SOFT}" stroke="{FOREST}" stroke-width="16"/>'
      f'<path d="M500,960 C505,860 490,760 500,640" fill="none" stroke="{FOREST}" stroke-width="16" stroke-linecap="round"/>'
      + leaf(498, 830, -35, 190, FOREST, SAGE) + leaf(502, 760, 210, 150, FOREST, SAGE)
      + daisy(500, 440, 270, seed=5)),
}
import os; os.makedirs("concepts", exist_ok=True)
for k, v in concepts.items(): open(f"concepts/{k}.svg", "w").write(v)
cells = "".join(f'<figure><div class=big style="background:{BG}"><img src="concepts/{k}.svg"></div><div class=row><div class=t style="background:#fff"><img src="concepts/{k}.svg"></div><div class=t style="background:{FOREST}"><img src="concepts/{k}.svg"></div><img class=fav src="concepts/{k}.svg"><img class=fav2 src="concepts/{k}.svg"></div><figcaption>{k}</figcaption></figure>' for k in concepts)
open("concepts.html","w").write(f'<style>body{{margin:0;padding:24px;background:#fff;font:600 16px sans-serif;display:grid;grid-template-columns:repeat(4,1fr);gap:24px}}figure{{margin:0}}.big{{padding:20px;border-radius:16px}}.big img{{width:100%;display:block}}.row{{display:flex;gap:10px;align-items:center;margin-top:10px}}.t{{padding:8px;border-radius:10px}}.t img{{width:70px;display:block}}.fav{{width:32px}}.fav2{{width:16px}}figcaption{{margin-top:8px}}</style>{cells}')
