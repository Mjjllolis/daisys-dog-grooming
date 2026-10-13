exec(open("badge.py").read().split("\nO = {}")[0])

def badge_a(f, top_size, bot_size, top_tr, bot_tr, uid, top_r=380, bot_r=440):
    # shrink a line until it fits its arc: the top word within ~110°, the bottom line between the two daisies
    def fit(s, size, tr, r, max_deg):
        while glyphs(f, s, size, tr)[1] / r > math.radians(max_deg): size *= .96; tr *= .96
        return size, tr
    ts, tt = fit("DAISY’S", top_size, top_tr, top_r, 110)
    bs, bt = fit("DOG GROOMING", bot_size, bot_tr, bot_r, 140)
    return doc1(
        f'<circle cx="500" cy="500" r="490" fill="{FOREST}"/>' + inner(.7, uid=uid) +
        f'<circle cx="500" cy="500" r="338" fill="none" stroke="{CREAMC}" stroke-width="10"/>' +
        arc_text(f, "DAISY’S", ts, 500, 500, top_r, CREAMC, True, tt) +
        arc_text(f, "DOG GROOMING", bs, 500, 500, bot_r, CREAMC, False, bt) +
        flower(500 - 412 * math.cos(math.radians(8)), 500 + 412 * math.sin(math.radians(8)), 30, CREAMC) +
        flower(500 + 412 * math.cos(math.radians(8)), 500 + 412 * math.sin(math.radians(8)), 30, CREAMC))

FR = font("fonts/Fraunces[SOFT,WONK,opsz,wght].ttf", SOFT=100, WONK=0, opsz=72, wght=650)
JO = font("fonts/JosefinSans[wght].ttf", wght=700)
NU = font("fonts/Nunito[wght].ttf", wght=850)
PL = font("fonts/PlayfairDisplay[wght].ttf", wght=700)
O = {
  "Current · DM Sans": badge_a(SANS, 96, 76, 26, 16, "z"),
  "1 · Fraunces (soft serif)": badge_a(FR, 104, 80, 22, 12, "f"),
  "2 · Josefin Sans (vintage)": badge_a(JO, 110, 86, 26, 16, "j"),
  "3 · Nunito (rounded)": badge_a(NU, 100, 78, 22, 12, "n"),
  "4 · Playfair Display (classic)": badge_a(PL, 104, 80, 20, 12, "p"),
}
os.makedirs("fonts4", exist_ok=True)
for i, (k, v) in enumerate(O.items()): open(f"fonts4/{i}.svg", "w").write(v)
cells = "".join(f'<figure><div class=big><img src="fonts4/{i}.svg"></div><div class=row><img class=m src="fonts4/{i}.svg"><img class=s src="fonts4/{i}.svg"></div><figcaption>{k}</figcaption></figure>' for i, k in enumerate(O))
open("fonts4.html","w").write(f'<style>body{{margin:0;padding:24px;background:#fff;font:600 15px sans-serif;display:grid;grid-template-columns:repeat(5,1fr);gap:20px}}figure{{margin:0}}.big{{padding:14px;border-radius:16px;background:#F8F5EF}}.big img{{width:100%;display:block}}.row{{display:flex;gap:10px;align-items:center;margin-top:8px}}.m{{width:90px}}.s{{width:48px}}figcaption{{margin-top:6px}}</style>{cells}')
