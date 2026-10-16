"""Shared AWS group styles + SVG icon inliner for the diagrams scripts."""
import base64
import os
import re

import diagrams

# ponytail: diagrams sizes nodes for 13pt labels; taller box keeps 19pt labels off the icon
diagrams.Node._height = 2.2
diagrams.Edge._default_edge_attrs["fontsize"] = "18"

OUT_DIR = os.path.join(os.path.dirname(__file__), "..", "..", "public", "assets", "diagrams")

GRAPH = {"bgcolor": "white", "pad": "0.4", "nodesep": "0.5", "ranksep": "0.55",
         "fontname": "Helvetica", "fontsize": "20", "splines": "spline", "newrank": "true"}
NODE = {"fontname": "Helvetica", "fontsize": "19"}
EDGE = {"fontname": "Helvetica", "fontsize": "18", "color": "#545B64", "fontcolor": "#232F3E"}


def group(color, bg="white", style="solid"):
    """AWS Architecture Icons group box: colored border, label top-left."""
    return {"bgcolor": bg, "pencolor": color, "fontcolor": color, "style": style,
            "penwidth": "1.6", "labeljust": "l", "fontname": "Helvetica Bold",
            "fontsize": "19", "margin": "20"}


AWS_CLOUD = group("#232F3E")
REGION = group("#00A4A6", style="dashed")
VPC = group("#8C4FFF")
PUBLIC_SUBNET = group("#7AA116", bg="#F2F6E8")
PRIVATE_SUBNET = group("#00A4A6", bg="#E6F6F7")
GENERIC = group("#7D8998", style="dashed")


def inline_icons(svg_path):
    """Replace local file icon refs with base64 data URIs so <img> renders them."""
    base = os.path.dirname(svg_path)

    def repl(m):
        path = m.group(2)
        if path.startswith("data:"):
            return m.group(0)
        full = path if os.path.isabs(path) else os.path.join(base, path)
        with open(full, "rb") as f:
            data = base64.b64encode(f.read()).decode()
        return f'{m.group(1)}="data:image/png;base64,{data}"'

    with open(svg_path) as f:
        svg = f.read()
    svg = re.sub(r'(xlink:href|href)="([^"]+\.png)"', repl, svg)
    assert "file://" not in svg and not re.search(r'href="(?!data:)[^"#]+\.png"', svg)
    with open(svg_path, "w") as f:
        f.write(svg)
