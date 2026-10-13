exec(open("final_dog.py").read().rsplit("\nSTAMP = ", 1)[0])
import re, os
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.varLib.instancer import instantiateVariableFont

def font(path, **axes): return instantiateVariableFont(TTFont(path), axes)
SERIF = font("fonts/Newsreader[opsz,wght].ttf", opsz=72, wght=500)
SANS = font("fonts/DMSans[opsz,wght].ttf", opsz=14, wght=600)

def text(f, s, size, x, y, color, tracking=0):
    gs, cmap, hmtx = f.getGlyphSet(), f.getBestCmap(), f["hmtx"]; k = size / f["head"].unitsPerEm
    pen = SVGPathPen(gs); cx = 0
    for ch in s:
        g = cmap[ord(ch)]; gs[g].draw(TransformPen(pen, (k, 0, 0, -k, x + cx, y))); cx += hmtx[g][0] * k + tracking
    d = re.sub(r"(\d+\.\d)\d+", r"\1", pen.getCommands())
    return f'<path d="{d}" fill="{color}"/>', cx - tracking

def width(f, s, size, tracking=0): return text(f, s, size, 0, 0, "#000", tracking)[1]

def mark_body(ink, paper, uid):
    """The round mark in a 1000 box (circle 40..960). `ink` is the circle and line colour, `paper` the dog and daisy."""
    global INK, PAPER
    INK, PAPER = ink, paper
    return f'<path d="{CIRC}" fill="{ink}"/>' + clip(uid, CIRC, real_daisy(675, 330, 205, 16, .19, .26, ring=True) + fur_dog(440, 640, .68, ink, paper))

def one_colour(color, uid):
    # ink areas solid, paper areas knocked out to transparent
    return (f'<mask id="m{uid}" maskUnits="userSpaceOnUse" x="0" y="0" width="1000" height="1000">{mark_body("#fff", "#000", uid + "c")}</mask>'
            f'<rect width="1000" height="1000" fill="{color}" mask="url(#m{uid})"/>')

def doc(w, h, body, vb=None, title="Daisy's Dog Grooming"):
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{vb or f"0 0 {w} {h}"}" role="img"><title>{title}</title>{body}</svg>\n'

def place(body, x, y, s):  # a mark drawn in the 1000 box, positioned so its circle's top-left sits at (x, y) and its diameter is 920*s
    return f'<g transform="translate({x - 40*s:.1f} {y - 40*s:.1f}) scale({s})">{body}</g>'

NAME, SUB = "Daisy\u2019s", "DOG GROOMING"
def horizontal(mark, color):
    D = 920; ns, ss = 400, 112; tr = ss * .32
    nw, sw_ = width(SERIF, NAME, ns), width(SANS, SUB, ss, tr)
    x = D + 90; tw = max(nw, sw_)
    a, _ = text(SERIF, NAME, ns, x, 520, color)
    b, _ = text(SANS, SUB, ss, x + (nw - sw_) / 2 if nw > sw_ else x, 720, color, tr)
    return doc(int(x + tw + 20), D, place(mark, 0, 0, 1) + a + b)

def stacked(mark, color):
    ns, ss = 330, 92; tr = ss * .32
    nw, sw_ = width(SERIF, NAME, ns), width(SANS, SUB, ss, tr)
    W = int(max(nw, sw_, 760) + 80); D = 760
    a, _ = text(SERIF, NAME, ns, (W - nw) / 2, D + 330, color)
    b, _ = text(SANS, SUB, ss, (W - sw_) / 2, D + 500, color, tr)
    return doc(W, D + 560, place(mark, (W - D) / 2, 0, D / 920) + a + b)

FOREST, CREAMC = "#3E4B3A", "#F8F5EF"
main = mark_body(FOREST, CREAMC, "a")
rev = mark_body(CREAMC, FOREST, "b")
out = {
  "logo-mark.svg": doc(0, 0, main, "40 40 920 920"),
  "logo-mark-reversed.svg": doc(0, 0, rev, "40 40 920 920"),
  "logo-mark-one-colour.svg": doc(0, 0, one_colour(FOREST, "c"), "40 40 920 920"),
  "logo-horizontal.svg": horizontal(mark_body(FOREST, CREAMC, "d"), FOREST),
  "logo-horizontal-reversed.svg": horizontal(mark_body(CREAMC, FOREST, "e"), CREAMC),
  "logo-stacked.svg": stacked(mark_body(FOREST, CREAMC, "f"), FOREST),
  "logo-stacked-reversed.svg": stacked(mark_body(CREAMC, FOREST, "g"), CREAMC),
}
os.makedirs("final", exist_ok=True)
for k, v in out.items(): open(f"final/{k}", "w").write(v)
print({k: len(v)//1024 for k, v in out.items()})
