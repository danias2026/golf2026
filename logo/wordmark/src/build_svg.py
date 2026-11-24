# Builds the Golf & Games Classic wordmark as pure vector paths (no fonts needed).
import sys
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.boundsPen import BoundsPen
from fontTools.pens.transformPen import TransformPen

GOLD, SILVER, WHITE = '#DEC000', '#B4BAB4', '#F4F3EE'
PF = TTFont('src/PlayfairDisplay-Regular.ttf'); BB = TTFont('src/BebasNeue-Regular.ttf')

def run(font, text, size, x, y, tracking=0.0):
    """Return (paths, advance) for text at baseline (x,y), size in px, tracking in em."""
    gs, cmap, hmtx = font.getGlyphSet(), font.getBestCmap(), font['hmtx']
    upm = font['head'].unitsPerEm; k = size / upm
    out, bounds = [], BoundsPen(gs); cx = x
    for ch in text:
        g = cmap.get(ord(ch))
        if g is None: continue
        sp = SVGPathPen(gs)
        t = (k, 0, 0, -k, cx, y)
        gs[g].draw(TransformPen(sp, t)); gs[g].draw(TransformPen(bounds, t))
        d = sp.getCommands()
        if d: out.append(d)
        cx += hmtx[g][0] * k + tracking * size
    return out, cx - x, bounds.bounds

def width(font, text, size, tracking=0.0):
    return run(font, text, size, 0, 0, tracking)[1]

S = 1000.0
amp_s = S * 1.2
w_golf, w_amp, w_games = width(PF, 'GOLF', S), width(PF, '&', amp_s), width(PF, 'GAMES', S)
m = -0.05 * S
line1 = w_golf + m + w_amp + m + w_games
x0 = -line1 / 2
golf, _, b1 = run(PF, 'GOLF', S, x0, 0)
amp, _, b2 = run(PF, '&', amp_s, x0 + w_golf + m, 0.08 * S)
games, _, b3 = run(PF, 'GAMES', S, x0 + w_golf + m + w_amp + m, 0)
w_cl = width(PF, 'CLASSIC', S)
classic, _, b4 = run(PF, 'CLASSIC', S, -w_cl / 2, 0.84 * S)

def build(kicker, gold, silver, kick_col):
    parts = [f'<path fill="{gold}" d="{" ".join(golf + games + classic)}"/>',
             f'<path fill="{silver}" d="{" ".join(amp)}"/>']
    bxs = [b1, b2, b3, b4]
    if kicker:
        ks, tr = 0.30 * S, 0.34
        txt = 'TWO JCCS. ONE TOURNAMENT.'
        kw = width(BB, txt, ks, tr) - tr * ks
        kp, _, kb = run(BB, txt, ks, -kw / 2, min(b[1] for b in bxs) - 0.22 * S, tr)
        parts.insert(0, f'<path fill="{kick_col}" d="{" ".join(kp)}"/>'); bxs.append(kb)
    minx = min(b[0] for b in bxs); miny = min(b[1] for b in bxs); maxx = max(b[2] for b in bxs); maxy = max(b[3] for b in bxs)
    pad = 0.04 * S
    vb = (minx - pad, miny - pad, maxx - minx + 2 * pad, maxy - miny + 2 * pad)
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{vb[0]:.1f} {vb[1]:.1f} {vb[2]:.1f} {vb[3]:.1f}" '
            f'width="{vb[2]:.0f}" height="{vb[3]:.0f}"><title>Golf &amp; Games Classic</title>{"".join(parts)}</svg>')

variants = {
  'golf-games-classic-wordmark': (False, GOLD, SILVER, WHITE),
  'golf-games-classic-wordmark-white': (False, WHITE, WHITE, WHITE),
  'golf-games-classic-wordmark-gold': (False, GOLD, GOLD, GOLD),
  'golf-games-classic-wordmark-kicker': (True, GOLD, SILVER, WHITE),
  'golf-games-classic-wordmark-kicker-white': (True, WHITE, WHITE, WHITE),
}
for name, args in variants.items():
    open(f'{name}.svg', 'w').write(build(*args))
    print(name)
