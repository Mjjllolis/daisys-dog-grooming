import re
exec(open("daisy.py").read().split("concepts = {")[0])

SIL = ("M498,1104 C400,1060 260,990 150,900 C80,840 40,790 42,730 C46,640 90,520 150,420 C140,330 140,190 182,46 "
       "C240,90 285,170 318,232 L318,214 C370,206 420,200 446,192 C462,170 474,150 486,130 C496,155 506,180 510,204 "
       "C600,232 720,270 786,336 C796,350 760,358 712,362 C716,396 728,414 748,428 C820,462 900,500 978,540 "
       "C998,556 994,572 982,590 C970,612 958,624 944,628 L954,632 C962,690 962,738 940,770 C924,792 906,800 890,812 "
       "C860,840 820,848 790,830 C770,815 760,800 752,796 C735,812 712,826 690,826 C655,828 630,815 610,800 "
       "C590,804 568,812 548,812 L524,800 C530,880 528,980 520,1080 C514,1096 506,1104 498,1104 Z")

def head(tx, ty, s, ink=FOREST, fill=CREAM, weight=34, nose=True):
    """The schnauzer from the original logo: a filled silhouette (so it can sit over things) plus its line work."""
    lines = DOG.replace('stroke-width="16"', f'stroke-width="{weight}"')
    n = f'<ellipse cx="968" cy="566" rx="30" ry="24" fill="{ink}"/>' if nose else ""
    return f'<g transform="translate({tx} {ty}) scale({s})" color="{ink}"><path d="{SIL}" fill="{fill}"/>{lines}{n}</g>'

def arch(x0, x1, top, bottom, fill, ink, sw):
    r = (x1 - x0) / 2
    return f'M{x0},{bottom} V{top + r} A{r},{r} 0 0 1 {x1},{top + r} V{bottom} Z'

def stem(x1, y1, x2, y2, ink, sw):
    mx, my = (x1 + x2) / 2 + 40, (y1 + y2) / 2
    return f'<path d="M{x1},{y1} Q{mx},{my} {x2},{y2}" fill="none" stroke="{ink}" stroke-width="{sw}" stroke-linecap="round"/>'

SW = 22
def D(cx, cy, R, seed=7, **k): return daisy(cx, cy, R, seed=seed, sw=k.pop("sw", R * .05), **k)

A = (head(60, 60, .8) + D(330, 215, 185))
ARCH = arch(140, 860, 40, 960, SOFT, FOREST, SW)
F = (f'<clipPath id="ar"><path d="{ARCH}"/></clipPath><path d="{ARCH}" fill="{SOFT}"/>'
     f'<g clip-path="url(#ar)">{head(160, 290, .68)}</g><path d="{ARCH}" fill="none" stroke="{FOREST}" stroke-width="{SW}"/>'
     + D(390, 430, 125, seed=5))
G = (f'<clipPath id="ar2"><path d="{ARCH}"/></clipPath><path d="{ARCH}" fill="{SOFT}"/>'
     f'<g clip-path="url(#ar2)">{head(120, 300, .72)}'
     + leaf(760, 640, -60, 120, FOREST, SAGE).replace('stroke-width="9"', 'stroke-width="14"')
     + stem(770, 815, 735, 330, FOREST, 18) + '</g>'
     + f'<path d="{ARCH}" fill="none" stroke="{FOREST}" stroke-width="{SW}"/>' + D(735, 300, 125, seed=9))
H = (D(660, 330, 290, seed=7) + head(10, 220, .68))

concepts = {"E-dog-with-daisy": svg(A, 1000, 1000), "F-arch-dog-daisy": svg(F), "G-arch-dog-holding-daisy": svg(G), "H-dog-sniffing-daisy": svg(H)}
for k, v in concepts.items(): open(f"concepts/{k}.svg", "w").write(v)
cells = "".join(f'<figure><div class=big style="background:{BG}"><img src="concepts/{k}.svg"></div><div class=row><div class=t style="background:#fff"><img src="concepts/{k}.svg"></div><div class=t style="background:{FOREST}"><img src="concepts/{k}.svg"></div><img class=fav src="concepts/{k}.svg"><img class=fav2 src="concepts/{k}.svg"></div><figcaption>{k}</figcaption></figure>' for k in concepts)
open("concepts2.html","w").write(f'<style>body{{margin:0;padding:24px;background:#fff;font:600 16px sans-serif;display:grid;grid-template-columns:repeat(4,1fr);gap:24px}}figure{{margin:0}}.big{{padding:20px;border-radius:16px}}.big img{{width:100%;display:block}}.row{{display:flex;gap:10px;align-items:center;margin-top:10px}}.t{{padding:8px;border-radius:10px}}.t img{{width:70px;display:block}}.fav{{width:32px}}.fav2{{width:16px}}figcaption{{margin-top:8px}}</style>{cells}')
