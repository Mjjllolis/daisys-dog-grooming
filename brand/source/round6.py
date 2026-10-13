exec(open("round5.py").read().split("STAMP =")[0])

def petal_shape(cx, cy, R, a, w, inner):
    """A daisy petal: narrow at the base, widest near the tip, rounded end."""
    ux, uy = math.cos(a), math.sin(a); px, py = -uy, ux
    P = lambda t, s: (cx + ux * R * t + px * R * s, cy + uy * R * t + py * R * s)
    f = lambda p: f"{p[0]:.1f},{p[1]:.1f}"
    b0, b1 = P(inner, -w * .35), P(inner, w * .35)
    m0, m1 = P(.72, -w / 2), P(.72, w / 2)
    return (f"M{f(b0)} C{f(P(.45,-w*.45))} {f(P(.6,-w*.52))} {f(m0)} C{f(P(.86,-w*.48))} {f(P(1.0,-w*.32))} {f(P(1.0,0))} "
            f"C{f(P(1.0,w*.32))} {f(P(.86,w*.48))} {f(m1)} C{f(P(.6,w*.52))} {f(P(.45,w*.45))} {f(b1)} Z")

def real_daisy(cx, cy, R, n=18, w=.26, center=.27, ring=False, seed=4):
    rnd = random.Random(seed); sw = max(R * .06, 12)
    ps = "".join(f'<path d="{petal_shape(cx, cy, R * rnd.uniform(.93, 1.0), math.radians(-90 + (i + rnd.uniform(-.12, .12)) * 360 / n), w, .1)}"/>' for i in range(n))
    out = [f'<g fill="{INK}" stroke="{INK}" stroke-width="{sw*2:.1f}" stroke-linejoin="round">{ps}</g>', f'<g fill="{PAPER}">{ps}</g>',
           f'<circle cx="{cx}" cy="{cy}" r="{R*center:.1f}" fill="{INK}"/>']
    if ring:  # a thin paper ring gives the centre its dome
        out.append(f'<circle cx="{cx - R*center*.18:.1f}" cy="{cy - R*center*.18:.1f}" r="{R*center*.5:.1f}" fill="none" stroke="{PAPER}" stroke-width="{sw*.7:.1f}" stroke-dasharray="{R*center*.5:.1f} 999" transform="rotate(180 {cx - R*center*.18:.1f} {cy - R*center*.18:.1f})" stroke-linecap="round"/>')
    return "".join(out)

STAMP = f'<path d="{CIRC}" fill="{INK}"/>'
def A4(d): return STAMP + clip("a" + str(abs(hash(d)) % 999), CIRC, d + H(440, 630, .64))
V = {
  "1  Classic daisy (16 petals)":       A4(real_daisy(680, 320, 215, 16, .19, .24)),
  "2  Fuller daisy (22 slim petals)":   A4(real_daisy(680, 320, 220, 22, .14, .22, seed=8)),
  "3  Daisy with a highlighted center": A4(real_daisy(680, 320, 215, 16, .19, .26, ring=True)),
}
import os; os.makedirs("r6", exist_ok=True)
for i, (k, v) in enumerate(V.items()): open(f"r6/{i+1}.svg", "w").write(svg(v))
cells = "".join(f'<figure><div class=big><img src="r6/{i+1}.svg"></div><div class=row><div class=t style="background:#fff"><img src="r6/{i+1}.svg"></div><img class=fav src="r6/{i+1}.svg"><img class=fav2 src="r6/{i+1}.svg"></div><figcaption>{k}</figcaption></figure>' for i, k in enumerate(V))
open("r6.html","w").write(f'<style>body{{margin:0;padding:24px;background:#fff;font:600 16px sans-serif;display:grid;grid-template-columns:repeat(3,1fr);gap:24px}}figure{{margin:0}}.big{{padding:16px;border-radius:16px;background:{BG}}}.big img{{width:100%;display:block}}.row{{display:flex;gap:10px;align-items:center;margin-top:8px}}.t{{padding:6px;border-radius:10px}}.t img{{width:64px;display:block}}.fav{{width:32px}}.fav2{{width:16px}}figcaption{{margin-top:6px}}</style>{cells}')
