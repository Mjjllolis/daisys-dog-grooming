"""Business cards: 3.5 x 2 in trim + 0.125 in bleed. 1 unit = 1/300 in."""
import os, re, sys
os.chdir(os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "logo"))
exec(open("final_ink.py").read().split("\nOUT = {")[0])
SANS4 = font("fonts/DMSans[opsz,wght].ttf", opsz=14, wght=400)
FINAL = "/Users/mishawnlolis/Documents/DevRepo/daisys-dog-grooming/brand/final"
W, H, B = 1125, 675, 37.5
INK, CREAM_, SAGE_, YEL, FOR = "#2A2A24", "#F8F5EF", "#A9B29B", "#E0A24A", "#3E4B3A"

PERSON = dict(name="Emily Lolis", title="CO-OWNER & GROOMER", phone="(225) 508-9814",
              email="Emily.Lolis@DaisyDogGroom.com", web="DaisyDogGroom.com", addr="3747 Quarter Horse Ln, Addis, LA")

def logo(name, x, y, w):
    s = open(f"{FINAL}/{name}.svg").read()
    vb = re.search(r'viewBox="([^"]+)"', s).group(1); vw, vh = map(float, vb.split()[2:])
    inner = re.sub(r"^.*?<svg[^>]*>|</svg>\s*$", "", s, flags=re.S)
    inner = re.sub(r"<title>.*?</title>", "", inner)
    return f'<svg x="{x}" y="{y}" width="{w}" height="{w*vh/vw:.1f}" viewBox="{vb}">{inner}</svg>'

def centred(f, s, size, cy, color, tr=0):
    return text(f, s, size, (W - width(f, s, size, tr)) / 2, cy, color, tr)[0]

SERIF_I = font("fonts/Newsreader-Italic[opsz,wght].ttf", opsz=72, wght=500)

def flower(cx, cy, R, centre=YEL, rot=0, seed=7):
    d = daisy(cx, cy, R, seed=seed, stroke=INK, sw=max(3, R * .035), petal_fill=CREAM_, center=centre, veins=False, texture=False)
    return f'<g transform="rotate({rot} {cx} {cy})">' + d.replace(f'fill="{SOFT}"', f'fill="{CREAM_}"') + "</g>"

def bubble(cx, cy, r, edge=CREAM_):
    return (f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="#FFFFFF" fill-opacity=".28" stroke="{edge}" stroke-width="{max(2.5, r*.07):.1f}"/>'
            f'<path d="M{cx-r*.55:.1f},{cy-r*.15:.1f} A{r*.58:.1f},{r*.58:.1f} 0 0 1 {cx-r*.1:.1f},{cy-r*.58:.1f}" fill="none" stroke="#FFFFFF" stroke-width="{max(2.5, r*.12):.1f}" stroke-linecap="round"/>')

def sparkle(cx, cy, s, color):
    return f'<path d="M{cx},{cy-s} Q{cx},{cy} {cx+s},{cy} Q{cx},{cy} {cx},{cy+s} Q{cx},{cy} {cx-s},{cy} Q{cx},{cy} {cx},{cy-s}Z" fill="{color}"/>'

def heart(cx, cy, s, color, rot=0):
    return (f'<path transform="translate({cx} {cy}) rotate({rot}) scale({s/20})" d="M0,18 C-14,8 -22,0 -22,-8 C-22,-16 -15,-21 -9,-21 C-4,-21 -1,-18 0,-15 C1,-18 4,-21 9,-21 C15,-21 22,-16 22,-8 C22,0 14,8 0,18Z" fill="{color}"/>')

def trail(points, s, color, op):
    out = ""
    for i, (x, y, a) in enumerate(points):
        out += f'<g transform="rotate({a} {x} {y})" opacity="{op}">' + paw(x, y, s, color) + "</g>"
    return out

def icon(kind, cx, cy):
    st = f'fill="none" stroke="{INK}" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"'
    g = {
      "phone": f'<rect x="-7.5" y="-12" width="15" height="24" rx="3.5" {st}/><path d="M-2.5,7.5 H2.5" {st}/>',
      "mail": f'<rect x="-12" y="-8.5" width="24" height="17" rx="3" {st}/><path d="M-11,-7 L0,1.5 L11,-7" {st}/>',
      "web": f'<circle r="11.5" {st}/><ellipse rx="5" ry="11.5" {st}/><path d="M-11.5,0 H11.5" {st}/>',
      "pin": f'<path d="M0,12.5 C-5,7 -10,2 -10,-3 A10,10 0 1 1 10,-3 C10,2 5,7 0,12.5Z" {st}/><circle cy="-3" r="3.2" {st}/>',
    }[kind]
    return f'<circle cx="{cx}" cy="{cy}" r="23" fill="{YEL}"/><g transform="translate({cx} {cy})">{g}</g>'

def page(body, bg): return f'<svg xmlns="http://www.w3.org/2000/svg" width="3.75in" height="2.25in" viewBox="0 0 {W} {H}"><rect width="{W}" height="{H}" fill="{bg}"/>{body}</svg>'

def front():
    b = ""
    # paw prints wandering in from the bottom-left and out the top-right
    b += trail([(70, 640, 40), (150, 600, 55), (195, 520, 35), (880, 140, 50), (960, 95, 35), (1010, 20, 50)], .42, INK, .16)
    # bath bubbles
    for cx, cy, r in [(120, 150, 46), (205, 85, 22), (80, 265, 17), (980, 520, 52), (1065, 430, 24), (880, 600, 19), (300, 600, 14), (845, 220, 13)]:
        b += bubble(cx, cy, r)
    b += flower(205, 430, 105, rot=-12) + flower(285, 205, 52, rot=20, seed=3) + flower(930, 300, 78, rot=8, seed=11) + flower(830, 545, 40, rot=-25, seed=5)
    b += sparkle(330, 105, 22, INK) + sparkle(110, 400, 14, CREAM_) + sparkle(1040, 230, 20, INK) + sparkle(800, 400, 13, CREAM_) + sparkle(965, 615, 15, INK)
    b += heart(255, 585, 18, CREAM_, -15) + heart(810, 120, 20, CREAM_, 12) + heart(1060, 330, 13, INK, 18)
    lw = 470
    b += logo("daisys-logo-badge-ribbon", (W - lw) / 2, 112, lw)
    return page(b, SAGE_)

def back(p):
    x = 100; b = ""
    # yellow panel with a wavy edge on the right, holding the stamp
    b += f'<path d="M800,0 C735,120 860,230 790,345 C725,455 845,560 785,675 H1125 V0Z" fill="{SAGE_}"/>'
    for cx, cy, r in [(870, 95, 30), (1050, 625, 30), (840, 590, 16), (1075, 90, 15)]:
        b += bubble(cx, cy, r)
    b += f'<g transform="rotate(-7 925 330)">' + logo("daisys-logo-stamp", 805, 210, 240) + "</g>"
    b += flower(1010, 525, 46, rot=15, seed=3) + sparkle(865, 470, 18, INK) + sparkle(1050, 330, 12, CREAM_) + heart(895, 190, 15, CREAM_, -12)
    # greeting, name and a pill for the title
    hi = text(SERIF_I, "Hi, I’m", 42, x, 145, FOR)
    b += hi[0] + heart(x + hi[1] + 26, 132, 15, YEL, 10)
    b += text(SERIF, p["name"], 86, x - 3, 228, INK)[0]
    tw = width(SANS, p["title"], 17, 4)
    b += f'<rect x="{x}" y="256" width="{tw + 44:.1f}" height="44" rx="22" fill="{FOR}"/>' + text(SANS, p["title"], 17, x + 22, 284, CREAM_, 4)[0]
    rows = [("phone", p["phone"]), ("mail", p["email"]), ("web", p["web"]), ("pin", p["addr"])]
    for i, (k, v) in enumerate(rows):
        y = 370 + i * 57
        b += icon(k, x + 23, y) + text(SANS4, v, 25, x + 62, y + 9, INK)[0]
    b += trail([(560, 640, 80), (640, 610, 95), (715, 645, 80)], .3, INK, .12)
    return page(b, CREAM_)

out = sys.argv[1]; os.makedirs(out, exist_ok=True)
slug = PERSON["name"].lower().replace(" ", "-")
files = {f"{slug}-card-front": front(), f"{slug}-card-back": back(PERSON)}
for k, v in files.items(): open(f"{out}/{k}.svg", "w").write(v)
css = "<style>@page{size:3.75in 2.25in;margin:0}html,body{margin:0}svg{display:block;page-break-after:always}</style>"
for k, v in files.items(): open(f"{out}/{k}.html", "w").write(css + v)
open(f"{out}/{slug}-cards-print.html", "w").write(css + "".join(files.values()))
guide = f'<rect x="{B}" y="{B}" width="{W-2*B}" height="{H-2*B}" fill="none" stroke="#e5484d" stroke-width="2" stroke-dasharray="8 6"/><rect x="{2*B}" y="{2*B}" width="{W-4*B}" height="{H-4*B}" fill="none" stroke="#3e8ed0" stroke-width="2" stroke-dasharray="4 6"/>'
prev = "".join(f'<div style="margin:20px"><div style="width:700px;box-shadow:0 10px 30px rgba(0,0,0,.2)">{v.replace("</svg>", guide + "</svg>", 1) if False else v}</div></div>' for v in files.values())
open(f"{out}/preview.html", "w").write('<body style="background:#ddd;margin:0;display:flex;flex-direction:column">' + prev.replace('width="3.75in" height="2.25in"', 'width="700" height="420"') + "</body>")
print("ok")
