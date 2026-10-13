exec(open("stem2.py").read().split("\nOPTS = {")[0])

def leaves(fill, vein):
    return leaf_shape(705, 430, 35, 210, fill, vein, 8) + leaf_shape(560, 330, 198, 150, fill, vein, 8)

def core(ink, paper, leaf, centre, uid):
    """The ink stamp: circle, two leaves, daisy, dog, in a 1000 box (circle 40..960)."""
    global INK, PAPER
    INK, PAPER = ink, paper
    set_center(centre)
    return f'<path d="{CIRC}" fill="{ink}"/>' + clip(uid, CIRC, leaves(leaf, ink) + real_daisy(675, 330, 205, 16, .19, .26, ring=True) + fur_dog(440, 640, .68, ink, paper))

def scaled(body, s): return f'<g transform="translate({500 - 500*s:.1f} {500 - 500*s:.1f}) scale({s})">{body}</g>'
def badge_body(uid, ink=INKC):
    return (f'<circle cx="500" cy="500" r="490" fill="{ink}"/>' + scaled(core(ink, CREAMC, SAGE, YELLOW, uid), .92) +
            f'<circle cx="500" cy="500" r="450" fill="none" stroke="{CREAMC}" stroke-width="10"/>')

def one_colour_body(uid):
    m = core("#fff", "#000", "#000", "#000", uid + "m")
    return (f'<mask id="{uid}" maskUnits="userSpaceOnUse" x="0" y="0" width="1000" height="1000">{m}</mask>'
            f'<rect width="1000" height="1000" fill="{INKC}" mask="url(#{uid})"/>')

ns, ss = 400, 112; tr = ss * .32
_, NW = text(SERIF, "Daisy’s", ns, 0, 0, INKC); _, SWW = text(SANS, "DOG GROOMING", ss, 0, 0, INKC, tr)
def horizontal(textc, uid):
    x = 1090
    return doc1(badge_body(uid) + text(SERIF, "Daisy’s", ns, x, 545, textc)[0] + text(SANS, "DOG GROOMING", ss, x + (NW - SWW) / 2, 745, textc, tr)[0],
                f"0 0 {int(x + max(NW, SWW) + 20)} 1000")

OUT = {
  "daisys-logo-stamp": doc1(core(INKC, CREAMC, SAGE, YELLOW, "s"), "40 40 920 920"),
  "daisys-logo-badge": doc1(badge_body("b"), "0 0 1000 1000"),
  "daisys-logo-badge-ribbon": doc1(badge_body("r") + ribbon(820).replace(FOREST, INKC), "-50 0 1100 1060"),
  "daisys-logo-horizontal": horizontal(INKC, "h"),
  "daisys-logo-horizontal-reversed": horizontal(CREAMC, "hr"),
  "daisys-logo-stamp-one-colour": doc1(one_colour_body("oc"), "40 40 920 920"),
}
os.makedirs("final_ink", exist_ok=True)
for k, v in OUT.items(): open(f"final_ink/{k}.svg", "w").write(v)
cells = "".join(f'<div class="t {"dark" if "reversed" in k else ""} {"wide" if "horizontal" in k else ""}"><img src="final_ink/{k}.svg"></div>' for k in OUT)
open("final_ink.html", "w").write(f'<style>body{{margin:0;padding:20px;background:#fff;display:grid;grid-template-columns:repeat(4,1fr);gap:14px}}.t{{background:#F8F5EF;border-radius:14px;padding:18px;height:240px;display:grid;place-items:center}}.t.dark{{background:#2A2A24}}.t.wide{{grid-column:span 2}}.t img{{max-width:100%;max-height:100%}}</style>{cells}')
print(list(OUT))
