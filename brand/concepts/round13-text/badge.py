exec(open("final.py").read().split("\nFOREST, CREAMC =")[0])
import math
FOREST, CREAMC = "#3E4B3A", "#F8F5EF"

def glyphs(f, s, size, tracking):
    gs, cmap, hmtx = f.getGlyphSet(), f.getBestCmap(), f["hmtx"]; k = size / f["head"].unitsPerEm
    out = []
    for ch in s:
        g = cmap[ord(ch)]; pen = SVGPathPen(gs); gs[g].draw(TransformPen(pen, (k, 0, 0, -k, 0, 0)))
        out.append((re.sub(r"(\d+\.\d)\d+", r"\1", pen.getCommands()), hmtx[g][0] * k))
    total = sum(a for _, a in out) + tracking * (len(out) - 1)
    return out, total

def arc_text(f, s, size, cx, cy, r, color, top=True, tracking=0, centre=None):
    """Set `s` along a circle. Top text runs clockwise over the top; bottom text runs along the bottom, upright."""
    gl, total = glyphs(f, s, size, tracking); span = total / r
    centre = math.radians(-90 if top else 90) if centre is None else math.radians(centre)
    pos = 0; out = []
    for d, adv in gl:
        mid = pos + adv / 2
        th = centre - span / 2 + mid / r if top else centre + span / 2 - mid / r
        x, y = cx + r * math.cos(th), cy + r * math.sin(th)
        rot = math.degrees(th) + (90 if top else -90)
        out.append(f'<path d="{d}" transform="translate({x:.1f} {y:.1f}) rotate({rot:.2f}) translate({-adv/2:.1f} 0)" fill="{color}"/>')
        pos += adv + tracking
    return "".join(out)

def flower(cx, cy, r, color):  # tiny daisy used as a separator in the ring
    petals = "".join(f'<ellipse cx="{cx}" cy="{cy - r*.55:.1f}" rx="{r*.2:.1f}" ry="{r*.45:.1f}" transform="rotate({i*45} {cx} {cy})" fill="{color}"/>' for i in range(8))
    return petals + f'<circle cx="{cx}" cy="{cy}" r="{r*.22:.1f}" fill="{FOREST}"/>'

def inner(s, ink=FOREST, paper=CREAMC, uid="i"):  # the stamp scaled into a smaller circle, centred
    return f'<g transform="translate({500 - 500*s:.1f} {500 - 500*s:.1f}) scale({s})">{mark_body(ink, paper, uid)}</g>'

def doc1(body, vb="0 0 1000 1000"): return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{vb}" role="img"><title>Daisy’s Dog Grooming</title>{body}</svg>\n'

O = {}
# A: ring with DAISY'S on top, DOG GROOMING underneath, little daisies between
O["A  Ring: name over, trade under"] = doc1(
    f'<circle cx="500" cy="500" r="490" fill="{FOREST}"/>' + inner(.7, uid="a") +
    f'<circle cx="500" cy="500" r="338" fill="none" stroke="{CREAMC}" stroke-width="10"/>' +
    arc_text(SANS, "DAISY’S", 96, 500, 500, 380, CREAMC, True, 26) +
    arc_text(SANS, "DOG GROOMING", 76, 500, 500, 440, CREAMC, False, 16) +
    flower(500 - 412 * math.cos(math.radians(8)), 500 + 412 * math.sin(math.radians(8)), 30, CREAMC) +
    flower(500 + 412 * math.cos(math.radians(8)), 500 + 412 * math.sin(math.radians(8)), 30, CREAMC))
# B: whole name round the top, one daisy at the bottom
O["B  Ring: full name over the top"] = doc1(
    f'<circle cx="500" cy="500" r="490" fill="{FOREST}"/>' + inner(.7, uid="b") +
    f'<circle cx="500" cy="500" r="338" fill="none" stroke="{CREAMC}" stroke-width="10"/>' +
    arc_text(SANS, "DAISY’S DOG GROOMING", 74, 500, 500, 384, CREAMC, True, 14) +
    flower(500, 912, 40, CREAMC) + flower(330, 875, 22, CREAMC) + flower(670, 875, 22, CREAMC))
# C: cream ribbon across the bottom of the stamp
rib = "M40,640 L960,640 L1000,700 L960,760 L960,860 L40,860 L40,760 L0,700 Z"
nm, nw = text(SERIF, "Daisy’s", 150, 0, 0, FOREST)
sub, sw_ = text(SANS, "DOG GROOMING", 54, 0, 0, FOREST, 17)
O["C  Ribbon banner"] = doc1(
    f'<g transform="translate(0 -40)">{mark_body(FOREST, CREAMC, "c")}</g>' +
    f'<path d="M20,690 L-40,690 L0,760 L-40,830 L60,830 Z M980,690 L1040,690 L1000,760 L1040,830 L940,830 Z" fill="{FOREST}"/>' +
    f'<rect x="20" y="660" width="960" height="200" rx="18" fill="{CREAMC}" stroke="{FOREST}" stroke-width="14"/>' +
    text(SERIF, "Daisy’s", 150, 500 - nw / 2, 785, FOREST)[0] + text(SANS, "DOG GROOMING", 54, 500 - sw_ / 2, 840, FOREST, 17)[0],
    "-60 0 1120 900")
# D: name set inside the stamp, under the dog
nm2, nw2 = text(SERIF, "Daisy’s", 150, 0, 0, CREAMC)
_, sw2 = text(SANS, "DOG GROOMING", 50, 0, 0, CREAMC, 16)
O["D  Name inside the stamp"] = doc1(
    f'<circle cx="500" cy="500" r="490" fill="{FOREST}"/>' +
    f'<clipPath id="dtop"><rect x="0" y="0" width="1000" height="640"/></clipPath><g clip-path="url(#dtop)"><g transform="translate(110 30) scale(.78)">{mark_body(FOREST, CREAMC, "d")}</g></g>' +
    f'<line x1="150" y1="640" x2="850" y2="640" stroke="{CREAMC}" stroke-width="10" stroke-linecap="round"/>' +
    text(SERIF, "Daisy’s", 150, 500 - nw2 / 2, 790, CREAMC)[0] + text(SANS, "DOG GROOMING", 50, 500 - sw2 / 2, 865, CREAMC, 16)[0])

os.makedirs("badge", exist_ok=True)
for i, (k, v) in enumerate(O.items()): open(f"badge/{i+1}.svg", "w").write(v)
cells = "".join(f'<figure><div class=big><img src="badge/{i+1}.svg"></div><div class=row><div class=t><img src="badge/{i+1}.svg"></div><img class=fav src="badge/{i+1}.svg"></div><figcaption>{k}</figcaption></figure>' for i, k in enumerate(O))
open("badge.html","w").write(f'<style>body{{margin:0;padding:24px;background:#fff;font:600 16px sans-serif;display:grid;grid-template-columns:repeat(4,1fr);gap:24px}}figure{{margin:0}}.big{{padding:16px;border-radius:16px;background:#F8F5EF}}.big img{{width:100%;display:block}}.row{{display:flex;gap:10px;align-items:center;margin-top:8px}}.t{{padding:6px;border-radius:10px;background:#F8F5EF}}.t img{{width:90px;display:block}}.fav{{width:40px}}figcaption{{margin-top:6px}}</style>{cells}')
