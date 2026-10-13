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

def flower(cx, cy, R, op):
    d = daisy(cx, cy, R, stroke=CREAM_, sw=R * .022, petal_fill=INK, center=INK, veins=False, texture=False)
    return f'<g opacity="{op}">' + d.replace(f'fill="{SOFT}"', f'fill="{INK}"') + "</g>"

def page(body, bg): return f'<svg xmlns="http://www.w3.org/2000/svg" width="3.75in" height="2.25in" viewBox="0 0 {W} {H}"><rect width="{W}" height="{H}" fill="{bg}"/>{body}</svg>'

def front():
    lw = 740
    body = flower(1050, 650, 260, .16) + flower(105, 85, 110, .12)
    body += logo("daisys-logo-horizontal-reversed", (W - lw) / 2, 150, lw)
    body += f'<rect x="{W/2-30}" y="482" width="60" height="5" rx="2.5" fill="{YEL}"/>'
    body += centred(SANS, "ONE-ON-ONE DOG GROOMING  ·  ADDIS, LA", 20, 540, SAGE_, 5.5)
    return page(body, INK)

def back(p):
    x = 100; body = ""
    # sage + forest waves along the bottom edge, like the website
    body += f'<path d="M0,598 Q280,560 560,598 T1125,598 V675 H0Z" fill="{SAGE_}"/>'
    body += f'<path d="M0,622 Q300,592 600,618 T1125,612 V675 H0Z" fill="{FOR}"/>'
    body += logo("daisys-logo-stamp", 745, 120, 300)
    body += text(SERIF, p["name"], 80, x, 200, INK)[0]
    body += text(SANS, p["title"], 19, x + 3, 250, FOR, 5)[0]
    body += f'<rect x="{x+3}" y="282" width="60" height="5" rx="2.5" fill="{YEL}"/>'
    rows = [("CALL", p["phone"]), ("EMAIL", p["email"]), ("WEB", p["web"]), ("VISIT", p["addr"])]
    for i, (k, v) in enumerate(rows):
        y = 362 + i * 52
        body += text(SANS, k, 14, x + 3, y - 1, FOR, 3.5)[0] + text(SANS4, v, 26, x + 105, y, INK)[0]
    return page(body, CREAM_)

out = sys.argv[1]; os.makedirs(out, exist_ok=True)
slug = PERSON["name"].lower().replace(" ", "-")
files = {f"{slug}-card-front": front(), f"{slug}-card-back": back(PERSON)}
for k, v in files.items(): open(f"{out}/{k}.svg", "w").write(v)
css = "<style>@page{size:3.75in 2.25in;margin:0}html,body{margin:0}svg{display:block;page-break-after:always}</style>"
for k, v in files.items(): open(f"{out}/{k}.html", "w").write(css + v)
open(f"{out}/{slug}-cards-print.html", "w").write(css + "".join(files.values()))
guide = f'<rect x="{B}" y="{B}" width="{W-2*B}" height="{H-2*B}" fill="none" stroke="#e5484d" stroke-width="2" stroke-dasharray="8 6"/><rect x="{2*B}" y="{2*B}" width="{W-4*B}" height="{H-4*B}" fill="none" stroke="#3e8ed0" stroke-width="2" stroke-dasharray="4 6"/>'
prev = "".join(f'<div style="margin:20px"><div style="width:700px;box-shadow:0 10px 30px rgba(0,0,0,.2)">{v.replace("</svg>", guide + "</svg>", 1) if False else v}</div></div>' for v in files.values())
open(f"{out}/preview.html", "w").write('<body style="background:#ddd;margin:0;display:flex;flex-wrap:wrap">' + prev.replace('width="3.75in" height="2.25in"', 'width="700" height="420"') + "</body>")
print("ok")
