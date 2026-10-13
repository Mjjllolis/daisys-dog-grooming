exec(open("horiz2.py").read().split("\nns, ss = 400")[0])

YELLOW, LEAF = "#E0A24A", "#6E805F"
CENTER = None  # daisy centre colour; None = the ink colour

def real_daisy(cx, cy, R, n=18, w=.26, center=.27, ring=False, seed=4):
    rnd = random.Random(seed); sw = max(R * .06, 12)
    ps = "".join(f'<path d="{petal_shape(cx, cy, R * rnd.uniform(.93, 1.0), math.radians(-90 + (i + rnd.uniform(-.12, .12)) * 360 / n), w, .1)}"/>' for i in range(n))
    c = CENTER or INK
    out = [f'<g fill="{INK}" stroke="{INK}" stroke-width="{sw*2:.1f}" stroke-linejoin="round">{ps}</g>', f'<g fill="{PAPER}">{ps}</g>',
           f'<circle cx="{cx}" cy="{cy}" r="{R*center:.1f}" fill="{c}" stroke="{INK}" stroke-width="{sw*.9 if CENTER else 0:.1f}"/>']
    if ring:
        hx, hy, hr = cx - R*center*.18, cy - R*center*.18, R*center*.5
        out.append(f'<circle cx="{hx:.1f}" cy="{hy:.1f}" r="{hr:.1f}" fill="none" stroke="{PAPER}" stroke-width="{sw*.7:.1f}" stroke-dasharray="{hr:.1f} 999" transform="rotate(180 {hx:.1f} {hy:.1f})" stroke-linecap="round"/>')
    return "".join(out)

def set_center(c):
    global CENTER; CENTER = c

def badge(outer, uid):
    return (f'<circle cx="500" cy="500" r="490" fill="{outer}"/>' + inner(.92, uid=uid) +
            f'<circle cx="500" cy="500" r="450" fill="none" stroke="{CREAMC}" stroke-width="10"/>')

def ribbon_c(outline, y=820, h=175):
    s = ribbon(y, h)
    return s.replace(f'stroke="{FOREST}"', f'stroke="{outline}"').replace(f'Z" fill="{FOREST}"/>', f'Z" fill="{outline}"/>')

def build(scheme):
    center, outer = {"A": (None, FOREST), "B": (YELLOW, FOREST), "C": (YELLOW, LEAF)}[scheme]
    set_center(center)
    u = scheme.lower()
    plain = doc1(badge(outer, u + "1"), "0 0 1000 1000")
    rib = doc1(badge(outer, u + "2") + ribbon_c(LEAF if scheme == "C" else FOREST), "-50 0 1100 1060")
    stamp = doc1((f'<circle cx="500" cy="500" r="490" fill="{LEAF}"/>' if scheme == "C" else "") + mark_body(FOREST, CREAMC, u + "3"), "10 10 980 980" if scheme == "C" else "40 40 920 920")
    ns, ss = 400, 112; tr = ss * .32
    _, nw = text(SERIF, "Daisy’s", ns, 0, 0, FOREST); _, sw_ = text(SANS, "DOG GROOMING", ss, 0, 0, FOREST, tr)
    x = 1090
    hz = doc1(badge(outer, u + "4") + text(SERIF, "Daisy’s", ns, x, 545, FOREST)[0] +
              text(SANS, "DOG GROOMING", ss, x + (nw - sw_) / 2, 745, LEAF if scheme == "C" else FOREST, tr)[0], f"0 0 {int(x + max(nw, sw_) + 20)} 1000")
    return {"badge": plain, "badge-ribbon": rib, "horizontal": hz, "stamp": stamp}

os.makedirs("variants", exist_ok=True)
for sc in "ABC":
    for k, v in build(sc).items(): open(f"variants/{sc}-{k}.svg", "w").write(v)
labels = {"A": "A · Forest + cream", "B": "B · + yellow daisy centre", "C": "C · + yellow + leaf green"}
rows = "".join(f'<div class=lab>{labels[sc]}</div>' + "".join(f'<div class="t {k}"><img src="variants/{sc}-{k}.svg"></div>' for k in ("badge", "badge-ribbon", "stamp", "horizontal")) for sc in "ABC")
open("variants.html", "w").write(f'<style>body{{margin:0;padding:20px;background:#fff;font:600 14px sans-serif;display:grid;grid-template-columns:150px 1fr 1fr 1fr 2.2fr;gap:14px;align-items:center}}.t{{background:#F8F5EF;border-radius:14px;padding:14px;height:220px;display:grid;place-items:center}}.t img{{max-width:100%;max-height:100%}}</style>{rows}')
