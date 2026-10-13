exec(open("stamp4.py").read().split("\nOPTS = ")[0])

def leaf_shape(x, y, ang, L, fill, ink, sw):
    return (f'<g transform="translate({x} {y}) rotate({ang})"><path d="M0,0 C{L*.3},{-L*.34} {L*.72},{-L*.3} {L},0 C{L*.72},{L*.26} {L*.3},{L*.3} 0,0 Z" fill="{fill}"/>'
            f'<path d="M{L*.1},0 Q{L*.5},{-L*.04} {L*.86},0" fill="none" stroke="{ink}" stroke-width="{sw}" stroke-linecap="round" opacity=".45"/></g>')

def stem_stamp(ink, sage, variant, uid):
    global INK, PAPER
    INK, PAPER = ink, CREAMC
    stems = {
      # 1: one long curve down past the nose, two leaves
      1: (f'<path d="M700,500 C760,560 830,650 860,760 C880,840 880,900 870,980" fill="none" stroke="{sage}" stroke-width="22" stroke-linecap="round"/>'
          + leaf_shape(842, 700, -25, 120, sage, ink, 7) + leaf_shape(866, 830, 200, 110, sage, ink, 7)),
      # 2: a gentler stem, one big leaf
      2: (f'<path d="M700,500 C780,580 820,680 830,980" fill="none" stroke="{sage}" stroke-width="22" stroke-linecap="round"/>'
          + leaf_shape(812, 690, -40, 150, sage, ink, 8)),
      # 3: half curve the other way: swings out to the right edge, then sweeps back in under the beard
      3: (f'<path d="M700,505 C820,560 900,690 880,800 C866,880 820,930 760,980" fill="none" stroke="{sage}" stroke-width="22" stroke-linecap="round"/>'
          + leaf_shape(880, 720, -20, 120, sage, ink, 7) + leaf_shape(842, 880, 150, 105, sage, ink, 7)),
      # 4: half curve the other way, gentler: one smooth arc bowing right and back, one leaf
      4: (f'<path d="M700,505 C860,600 880,820 770,980" fill="none" stroke="{sage}" stroke-width="22" stroke-linecap="round"/>'
          + leaf_shape(858, 760, -30, 140, sage, ink, 8)),
    }[variant]
    body = f'<path d="{CIRC}" fill="{ink}"/>' + clip(uid, CIRC, stems + real_daisy(675, 330, 205, 16, .19, .26, ring=True) + fur_dog(440, 640, .68, ink, CREAMC))
    return doc1(body, "40 40 920 920")

os.makedirs("stem", exist_ok=True)
for v in (1, 3, 4): open(f"stem/{v}.svg", "w").write(stem_stamp(INKC, SAGE, v, f"st{v}"))
open("stem.html", "w").write('<body style="margin:0;padding:30px;background:#F8F5EF;display:flex;gap:40px;align-items:center">'
  '<img src="stem/1.svg" width=360><img src="stem/3.svg" width=360><img src="stem/4.svg" width=360></body>')
