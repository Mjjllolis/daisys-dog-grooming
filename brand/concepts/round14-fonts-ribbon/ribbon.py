exec(open("fonts4.py").read().split("\nFR = font")[0])

def ribbon(y=725, h=175, name=True):
    x0, x1 = 70, 930
    tails = (f'<path d="M{x0+40},{y+40} L-30,{y+40} L15,{y+40+(h)/2} L-30,{y+40+h} L{x0+40},{y+40+h} Z" fill="{CREAMC}" stroke="{FOREST}" stroke-width="12" stroke-linejoin="round"/>'
             f'<path d="M{x1-40},{y+40} L1030,{y+40} L985,{y+40+h/2} L1030,{y+40+h} L{x1-40},{y+40+h} Z" fill="{CREAMC}" stroke="{FOREST}" stroke-width="12" stroke-linejoin="round"/>'
             f'<path d="M{x0},{y+h} L{x0+40},{y+40+h} L{x0+40},{y+h} Z M{x1},{y+h} L{x1-40},{y+40+h} L{x1-40},{y+h} Z" fill="{FOREST}"/>')
    band = f'<rect x="{x0}" y="{y}" width="{x1-x0}" height="{h}" rx="10" fill="{CREAMC}" stroke="{FOREST}" stroke-width="12"/>'
    _, nw = text(SERIF, "Daisy’s", 118, 0, 0, FOREST); _, sw_ = text(SANS, "DOG GROOMING", 40, 0, 0, FOREST, 14)
    words = text(SERIF, "Daisy’s", 118, 500 - nw / 2, y + 102, FOREST)[0] + text(SANS, "DOG GROOMING", 40, 500 - sw_ / 2, y + 151, FOREST, 14)[0]
    return tails + band + words

def ribbon_badge(top=None, top_font=SANS, top_size=70, top_tr=14, dots=True, uid="r"):
    ring_text = arc_text(top_font, top, top_size, 500, 500, 384, CREAMC, True, top_tr) if top else ""
    deco = ""
    if not top and dots:  # a row of little daisies round the top of the ring
        deco = "".join(flower(500 + 412 * math.cos(math.radians(a)), 500 + 412 * math.sin(math.radians(a)), 28, CREAMC) for a in range(-160, -15, 24))
    side = "".join(flower(500 + 412 * math.cos(math.radians(a)), 500 + 412 * math.sin(math.radians(a)), 28, CREAMC) for a in (-178, -2)) if top else ""
    return doc1(f'<circle cx="500" cy="500" r="490" fill="{FOREST}"/>' + inner(.7, uid=uid) +
                f'<circle cx="500" cy="500" r="338" fill="none" stroke="{CREAMC}" stroke-width="10"/>' + ring_text + deco + side + ribbon(),
                "-50 0 1100 1000")

O = {
  "R1 · Ribbon, daisies round the ring": ribbon_badge(None, uid="r1"),
  "R2 · Ribbon + DOG GROOMING on the ring": ribbon_badge("DOG GROOMING", uid="r2"),
  "R3 · Ribbon + ONE-ON-ONE GROOMING": ribbon_badge("ONE-ON-ONE GROOMING", top_size=62, top_tr=12, uid="r3"),
  "R4 · Ribbon + ADDIS, LOUISIANA": ribbon_badge("ADDIS · LOUISIANA", uid="r4"),
}
os.makedirs("ribbon", exist_ok=True)
for i, (k, v) in enumerate(O.items()): open(f"ribbon/{i+1}.svg", "w").write(v)
cells = "".join(f'<figure><div class=big><img src="ribbon/{i+1}.svg"></div><div class=row><img class=m src="ribbon/{i+1}.svg"><img class=s src="ribbon/{i+1}.svg"></div><figcaption>{k}</figcaption></figure>' for i, k in enumerate(O))
open("ribbon.html","w").write(f'<style>body{{margin:0;padding:24px;background:#fff;font:600 15px sans-serif;display:grid;grid-template-columns:repeat(4,1fr);gap:20px}}figure{{margin:0}}.big{{padding:14px;border-radius:16px;background:#F8F5EF}}.big img{{width:100%;display:block}}.row{{display:flex;gap:10px;align-items:center;margin-top:8px}}.m{{width:100px}}.s{{width:52px}}figcaption{{margin-top:6px}}</style>{cells}')
