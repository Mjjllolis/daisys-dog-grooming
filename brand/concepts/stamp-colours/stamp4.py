exec(open("variants.py").read().split("\nos.makedirs(\"variants\"")[0])
set_center(YELLOW)
SAGE, INKC = "#A9B29B", "#2A2A24"
def stamp(line, circle, uid):
    s = mark_body(line, CREAMC, uid)
    s = s.replace(f'<path d="{CIRC}" fill="{line}"/>', f'<path d="{CIRC}" fill="{circle}"/>', 1)
    return doc1(s, "40 40 920 920")
OPTS = [("Forest", FOREST, FOREST), ("Leaf", LEAF, LEAF), ("Sage + Forest", FOREST, SAGE), ("Ink", INKC, INKC)]
os.makedirs("stamp4", exist_ok=True)
for i, (n, line, circ) in enumerate(OPTS, 1): open(f"stamp4/{i}.svg", "w").write(stamp(line, circ, f"s{i}"))
cells = "".join(f'<figure><div class=art><img src="stamp4/{i}.svg"></div><figcaption><b>{n}</b><span>{(circ + " · " + line) if circ != line else circ} + #E0A24A</span></figcaption></figure>' for i, (n, line, circ) in enumerate(OPTS, 1))
open("stamp4.html", "w").write('<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;600&family=Newsreader:wght@500&display=swap">'
  '<style>body{margin:0;padding:56px 56px 48px;background:#F8F5EF;font-family:"DM Sans",sans-serif;color:#2A2A24}'
  'h1{font:500 40px/1.1 Newsreader,serif;margin:0 0 6px}p{margin:0 0 36px;color:#6E6B62}'
  '.g{display:grid;grid-template-columns:repeat(4,1fr);gap:32px}figure{margin:0}.art{background:#fff;border-radius:28px;padding:28px}.art img{width:100%;display:block}'
  'figcaption{margin-top:14px;display:grid;gap:2px}figcaption b{font:500 24px/1.2 Newsreader,serif}figcaption span{font-size:14px;color:#6E6B62;letter-spacing:.02em}</style>'
  f'<h1>Daisy’s Dog Grooming · Stamp colour options</h1><p>Same Daisy Yellow centre, four greens and inks.</p><div class=g>{cells}</div>')
