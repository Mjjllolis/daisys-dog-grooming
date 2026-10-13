exec(open("stem.py").read().split("\nos.makedirs(\"stem\"")[0])

SW = 22
def S(d): return f'<path d="{d}" fill="none" stroke="{SAGE}" stroke-width="{SW}" stroke-linecap="round"/>'
def Lf(x, y, a, l): return leaf_shape(x, y, a, l, SAGE, INKC, 8)

OPTS = {
  "Stem · half curve, two leaves": S("M700,505 C800,560 845,670 805,775 C775,855 710,905 640,975") + Lf(828, 640, -15, 120) + Lf(740, 880, 160, 110),
  "Stem · deep C curve, one leaf": S("M705,505 C850,590 850,780 720,880 C680,910 640,940 600,985") + Lf(812, 690, -25, 115),
  "Stem · S curve, one leaf": S("M700,505 C760,580 700,650 740,740 C780,830 760,900 700,985") + Lf(745, 760, -35, 125),
  "Leaf only · one leaf": Lf(705, 440, 40, 230),
  "Leaf only · two leaves": Lf(705, 430, 35, 210) + Lf(560, 330, 198, 150),
  "Leaf only · side leaf": Lf(790, 400, 22, 140),
}
def make(extra, uid):
    global INK, PAPER
    INK, PAPER = INKC, CREAMC
    return doc1(f'<path d="{CIRC}" fill="{INKC}"/>' + clip(uid, CIRC, extra + real_daisy(675, 330, 205, 16, .19, .26, ring=True) + fur_dog(440, 640, .68, INKC, CREAMC)), "40 40 920 920")
os.makedirs("stem2", exist_ok=True)
for i, (k, v) in enumerate(OPTS.items(), 1): open(f"stem2/{i}.svg", "w").write(make(v, f"o{i}"))
cells = "".join(f'<figure><div class=art><img src="stem2/{i}.svg"></div><figcaption><b>{i}</b> {k}</figcaption></figure>' for i, k in enumerate(OPTS, 1))
open("stem2.html", "w").write('<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;600&family=Newsreader:wght@500&display=swap">'
  '<style>body{margin:0;padding:48px;background:#F8F5EF;font-family:"DM Sans",sans-serif;color:#2A2A24}h1{font:500 36px/1.1 Newsreader,serif;margin:0 0 6px}p{margin:0 0 30px;color:#6E6B62}'
  '.g{display:grid;grid-template-columns:repeat(3,1fr);gap:28px}figure{margin:0}.art{background:#fff;border-radius:26px;padding:26px}.art img{width:100%;display:block}'
  'figcaption{margin-top:10px;font-size:15px}figcaption b{font:500 20px Newsreader,serif;margin-right:6px}</style>'
  f'<h1>Ink stamp · Sage stem and leaf options</h1><p>Ink #2A2A24 · Sage #A9B29B · Daisy Yellow #E0A24A</p><div class=g>{cells}</div>')
