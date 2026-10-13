exec(open("ribbon2.py").read().split("\nO = {")[0])

def badge_plain(uid):  # the round15 badge without its ribbon, in a 1000 box
    return (f'<circle cx="500" cy="500" r="490" fill="{FOREST}"/>' + inner(.92, uid=uid) +
            f'<circle cx="500" cy="500" r="450" fill="none" stroke="{CREAMC}" stroke-width="10"/>')

ns, ss = 400, 112; tr = ss * .32
_, nw = text(SERIF, "Daisy’s", ns, 0, 0, FOREST); _, sw_ = text(SANS, "DOG GROOMING", ss, 0, 0, FOREST, tr)
x = 1000 + 90
name = text(SERIF, "Daisy’s", ns, x, 545, FOREST)[0]
sub = text(SANS, "DOG GROOMING", ss, x + (nw - sw_) / 2, 745, FOREST, tr)[0]
W = int(x + max(nw, sw_) + 20)
open("horizontal-badge.svg", "w").write(doc1(f'<g transform="translate(0 0)">{badge_plain("h")}</g>' + name + sub, f"0 0 {W} 1000"))
open("h2.html", "w").write('<body style="margin:0;background:#F8F5EF;padding:40px"><img src="horizontal-badge.svg" style="width:900px"></body>')
