import re, os
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.varLib.instancer import instantiateVariableFont

def font(path, **axes):
    f = TTFont(path)
    if axes: f = instantiateVariableFont(f, axes)
    return f

def text_path(f, s, size, x, y, tracking=0):
    """Outline `s` with baseline at (x, y); returns (d, advance_width)."""
    gs, cmap, hmtx = f.getGlyphSet(), f.getBestCmap(), f["hmtx"]
    upm = f["head"].unitsPerEm; k = size / upm
    pen = SVGPathPen(gs); cx = 0; text_path.pos = []
    for ch in s:
        text_path.pos.append(x + cx)
        g = cmap[ord(ch)]
        gs[g].draw(TransformPen(pen, (k, 0, 0, -k, x + cx, y)))
        cx += hmtx[g][0] * k + tracking
    return re.sub(r"(\d+\.\d)\d+", r"\1", pen.getCommands()), cx - tracking

SCRIPT = font("fonts/Sacramento-Regular.ttf")
COND = font("fonts/YanoneKaffeesatz[wght].ttf", wght=600)
DOG = re.sub(r"<!--.*?-->\n?", "", open("dog.svg").read())

C = dict(cream="#F8F5EF", ink="#2A2A24", forest="#3E4B3A", terracotta="#C0664A", sage="#A9B29B", sagesoft="#E9EBE1", white="#FFFFFF")

def dog(color, tx=0, ty=0, s=1, weight=20):
    return f'<g transform="translate({tx} {ty}) scale({s})" color="{color}">{DOG.replace('stroke-width="16"', f'stroke-width="{weight}"')}</g>'

def script(color, s, size, x, y):
    d, w = text_path(SCRIPT, s, size, x, y)
    # Sacramento is hairline-thin; a matching stroke gives it the dog's line weight.
    return f'<path d="{d}" fill="{color}" stroke="{color}" stroke-width="{size*0.018:.1f}" stroke-linejoin="round"/>', w

def cond(color, s, size, x, y, tracking=0):
    d, w = text_path(COND, s, size, x, y, tracking)
    return f'<path d="{d}" fill="{color}"/>', w

def svg(w, h, body, bg=None, title="Daisy's Dog Grooming"):
    rect = f'<rect width="{w}" height="{h}" fill="{bg}"/>' if bg else ""
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" role="img"><title>{title}</title>{rect}{body}</svg>\n'

def lockup(word, accent, x, y, ssize, csize, lead):
    """Script "Daisy's" over condensed "Dog Grooming", with the y's tail
    dropping into the word space, as in the original sign."""
    b, bw = cond(word, "Dog Grooming", csize, x, y, csize * 0.015)
    gap = (text_path.pos[3] + text_path.pos[4]) / 2          # middle of the space
    script(accent, "Daisy's", ssize, 0, 0)
    ypos = text_path.pos[4] + SCRIPT["hmtx"][SCRIPT.getBestCmap()[ord("y")]][0] * ssize / SCRIPT["head"].unitsPerEm * 0.35
    ax = gap - ypos
    a, aw = script(accent, "Daisy's", ssize, ax, y - lead)
    left, right = min(x, ax), max(x + bw, ax + aw)
    return a + b, (left, right)

def horizontal(mark, word, accent, bg=None):
    t, (_, r) = lockup(word, accent, 1210, 830, 430, 400, 340)
    return svg(int(r + 40), 1150, dog(mark) + t, bg)

def stacked(mark, word, accent, bg=None):
    W = 1700
    _, (l, r) = lockup(word, accent, 0, 1700, 400, 330, 290)
    t, _ = lockup(word, accent, (W - (r - l)) / 2 - l, 1700, 400, 330, 290)
    return svg(W, 1800, dog(mark, (W - 1020 * 0.92) / 2, 20, 0.92) + t, bg)

def mark(mark_c, ring, bg):
    # Round badge for avatars and the favicon: dog head inside a filled circle.
    # Heavier line and a tight crop so it still reads at favicon size; the neck runs off the circle.
    return svg(1200, 1200, f'<clipPath id="c"><circle cx="600" cy="600" r="600"/></clipPath><circle cx="600" cy="600" r="600" fill="{ring}"/><g clip-path="url(#c)">' + dog(mark_c, 120, 130, 1.0, 46) + '</g>', bg, "Daisy's Dog Grooming mark")

def wordmark(word, accent, bg=None):
    _, (l, r) = lockup(word, accent, 0, 640, 400, 330, 290)
    t, _ = lockup(word, accent, 30 - l, 640, 400, 330, 290)
    return svg(int(r - l + 60), 760, t, bg)

out = "out"; os.makedirs(out, exist_ok=True)
files = {
  "logo-horizontal.svg": horizontal(C["forest"], C["forest"], C["terracotta"]),
  "logo-horizontal-ink.svg": horizontal(C["ink"], C["ink"], C["ink"]),
  "logo-horizontal-reversed.svg": horizontal(C["white"], C["white"], "#F2C9A0"),
  "logo-stacked.svg": stacked(C["forest"], C["forest"], C["terracotta"]),
  "logo-stacked-reversed.svg": stacked(C["white"], C["white"], "#F2C9A0"),
  "logo-wordmark.svg": wordmark(C["forest"], C["terracotta"]),
  "logo-mark.svg": mark(C["forest"], C["sagesoft"], None),
  "logo-mark-forest.svg": mark(C["white"], C["forest"], None),
}
for n, s in files.items(): open(f"{out}/{n}", "w").write(s)
print("\n".join(f"{n} {len(s)//1024}KB" for n, s in files.items()))
