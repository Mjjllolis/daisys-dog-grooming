"""Turn the full-colour ink stamp into a true one-colour vector: ink areas kept, everything else cut out."""
import re, math, sys
import xml.etree.ElementTree as ET
import pathops
from pathops import Path, PathOp, LineCap, LineJoin, op
from fontTools.svgLib.path import parse_path
from fontTools.pens.transformPen import TransformPen
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.misc.transform import Transform, Identity

INK = "#2A2A24"
NS = "{http://www.w3.org/2000/svg}"

def parse_transform(s):
    t = Identity
    for name, args in re.findall(r"(\w+)\(([^)]*)\)", s or ""):
        a = [float(v) for v in re.split(r"[ ,]+", args.strip()) if v]
        if name == "translate": t = t.translate(a[0], a[1] if len(a) > 1 else 0)
        elif name == "scale": t = t.scale(a[0], a[1] if len(a) > 1 else a[0])
        elif name == "rotate":
            if len(a) == 3: t = t.translate(a[1], a[2]).rotate(math.radians(a[0])).translate(-a[1], -a[2])
            else: t = t.rotate(math.radians(a[0]))
    return t

def shape_path(el, tr):
    p = Path(); pen = TransformPen(p.getPen(), tr)
    tag = el.tag.replace(NS, "")
    if tag == "path":
        parse_path(el.get("d"), pen)
    elif tag in ("circle", "ellipse"):
        cx, cy = float(el.get("cx")), float(el.get("cy"))
        rx = float(el.get("r") or el.get("rx")); ry = float(el.get("r") or el.get("ry"))
        k = .5522847498
        pen.moveTo((cx + rx, cy))
        pen.curveTo((cx + rx, cy + ry*k), (cx + rx*k, cy + ry), (cx, cy + ry))
        pen.curveTo((cx - rx*k, cy + ry), (cx - rx, cy + ry*k), (cx - rx, cy))
        pen.curveTo((cx - rx, cy - ry*k), (cx - rx*k, cy - ry), (cx, cy - ry))
        pen.curveTo((cx + rx*k, cy - ry), (cx + rx, cy - ry*k), (cx + rx, cy))
        pen.closePath()
    else:
        return None
    return p

def stroke_area(p, width, tr):
    s = Path(); s.addPath(p)
    scale = math.sqrt(abs(tr[0] * tr[3] - tr[1] * tr[2]))   # the path is already transformed, so scale the width too
    s.stroke(width * scale, LineCap.ROUND_CAP, LineJoin.ROUND_JOIN, 4)
    s.convertConicsToQuads()
    return s

def walk(el, tr, style, out):
    tag = el.tag.replace(NS, "")
    if tag in ("clipPath", "mask", "title", "defs"): return
    tr = tr.transform(parse_transform(el.get("transform"))) if el.get("transform") else tr
    st = dict(style)
    for k in ("fill", "stroke", "stroke-width", "paint-order", "stroke-dasharray", "opacity"):
        if el.get(k) is not None: st[k] = el.get(k)
    if tag in ("svg", "g"):
        for c in el: walk(c, tr, st, out)
        return
    p = shape_path(el, tr)
    if p is None: return
    fill, stroke = st.get("fill", "#000"), st.get("stroke", "none")
    width = float(st.get("stroke-width", 1))
    paints = []
    if fill != "none": paints.append(("fill", fill))
    if stroke != "none" and "stroke-dasharray" not in st: paints.append(("stroke", stroke))
    if st.get("paint-order") == "stroke": paints.reverse()
    for kind, colour in paints:
        area = p if kind == "fill" else stroke_area(p, width, tr)
        out.append((area, colour.upper() == INK))

def knockout(svg_text):
    root = ET.fromstring(svg_text)
    shapes = []
    walk(root, Identity, {}, shapes)
    ink = Path()
    for area, is_ink in shapes:
        ink = op(ink, area, PathOp.UNION if is_ink else PathOp.DIFFERENCE)
    # clip to the stamp's circle (the first shape)
    circle = shapes[0][0]
    ink = op(ink, circle, PathOp.INTERSECTION)
    pen = SVGPathPen(None); ink.draw(pen)
    d = re.sub(r"(\d+\.\d)\d+", r"\1", pen.getCommands())
    vb = root.get("viewBox")
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{vb}" role="img"><title>Daisy’s Dog Grooming</title><path d="{d}" fill="{INK}"/></svg>\n'

if __name__ == "__main__":
    open(sys.argv[2], "w").write(knockout(open(sys.argv[1]).read()))
