exec(open("ribbon.py").read().split("\ndef ribbon_badge")[0])

def r1(scale, ring_r, ribbon_y, uid):
    return doc1(f'<circle cx="500" cy="500" r="490" fill="{FOREST}"/>' + inner(scale, uid=uid) +
                f'<circle cx="500" cy="500" r="{ring_r}" fill="none" stroke="{CREAMC}" stroke-width="10"/>' + ribbon(ribbon_y),
                "-50 0 1100 1060")

O = {
  "Bigger stamp, ribbon lower": r1(.86, 420, 790, "a"),
  "Biggest stamp, ribbon at the bottom": r1(.92, 450, 820, "b"),
}
os.makedirs("ribbon2", exist_ok=True)
for i, (k, v) in enumerate(O.items()): open(f"ribbon2/{i+1}.svg", "w").write(v)
cells = "".join(f'<figure><div class=big><img src="ribbon2/{i+1}.svg"></div><div class=row><img class=m src="ribbon2/{i+1}.svg"><img class=s src="ribbon2/{i+1}.svg"></div><figcaption>{k}</figcaption></figure>' for i, k in enumerate(O))
open("ribbon2.html","w").write(f'<style>body{{margin:0;padding:24px;background:#fff;font:600 15px sans-serif;display:grid;grid-template-columns:repeat(2,1fr);gap:24px}}figure{{margin:0}}.big{{padding:20px;border-radius:16px;background:#F8F5EF}}.big img{{width:100%;display:block}}.row{{display:flex;gap:10px;align-items:center;margin-top:8px}}.m{{width:110px}}.s{{width:56px}}figcaption{{margin-top:6px}}</style>{cells}')
