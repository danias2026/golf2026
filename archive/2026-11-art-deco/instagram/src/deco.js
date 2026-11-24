// Golf & Games Classic — Instagram pieces in the official Art Deco beige style.
// Usage (from instagram/src):  node deco.js            -> renders every piece
//                              node deco.js 03-golf    -> renders pieces whose name contains the text
// Writes HTML to src/deco/*.html and PNGs to ../posts and ../stories.
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const C = {
  beige: '#F3E7CF', tan: '#EAD7AE', navy: '#002838', navy2: '#0A3346', teal: '#006868', ocean: '#009098',
  red: '#E02850', gold: '#F0B870', goldText: '#8A5F18', goldLine: '#C9963E', goldLight: '#F0C078', pink: '#F89090',
  teamMar: '#006478', teamMarRay: '#0B7088', teamMb: '#4078BC', teamMbRay: '#4A86CC', cream: '#F3E7CF',
};
const A = (f) => 'file://' + path.join(__dirname, 'deco', f);
let uid = 0;
const id = (p) => `${p}${++uid}`;

// ---------- SVG helpers ----------
function wedges(cx, cy, n, r, startDeg, spanDeg, cols) {
  let s = '';
  for (let i = 0; i < n; i++) {
    const a0 = (startDeg + (i * spanDeg) / n) * Math.PI / 180, a1 = (startDeg + ((i + 1) * spanDeg) / n) * Math.PI / 180;
    s += `<path d="M${cx} ${cy} L${cx + Math.cos(a0) * r} ${cy + Math.sin(a0) * r} A${r} ${r} 0 0 1 ${cx + Math.cos(a1) * r} ${cy + Math.sin(a1) * r} Z" fill="${cols[i % cols.length]}"/>`;
  }
  return s;
}
// Top color band: navy sunburst panel + color blocks + scallops + gold double rule.
function band(W, h, x0 = 0) {
  const nav = Math.round(W * 0.38), t = Math.round(W * 0.17), r = Math.round(W * 0.075), g = Math.round(W * 0.24);
  const cid = id('band');
  let s = `<defs><clipPath id="${cid}"><rect x="${x0}" y="0" width="${nav}" height="${h}"/></clipPath></defs>`;
  s += `<rect x="${x0}" y="0" width="${nav}" height="${h}" fill="${C.navy}"/>`;
  s += `<g clip-path="url(#${cid})">${wedges(x0 + nav / 2, h, 14, W, 180, 180, [C.cream, C.navy])}</g>`;
  let x = x0 + nav;
  s += `<rect x="${x}" y="0" width="${t}" height="${h}" fill="${C.teal}"/>`; x += t;
  s += `<rect x="${x}" y="0" width="${r}" height="${h}" fill="${C.red}"/>`; x += r;
  const gx = x;
  s += `<rect x="${x}" y="0" width="${g}" height="${h}" fill="${C.gold}"/>`; x += g;
  s += `<rect x="${x}" y="0" width="${x0 + W - x}" height="${h}" fill="${C.pink}"/>`;
  const R = 18;
  for (let sx = gx; sx < x0 + W; sx += 2 * R) s += `<path d="M${sx} ${h} a${R} ${R} 0 0 1 ${2 * R} 0 z" fill="${C.ocean}"/>`;
  s += `<path d="M${x0} ${h + 7} H${x0 + W} M${x0} ${h + 16} H${x0 + W}" stroke="${C.goldLine}" stroke-width="3"/>`;
  return s;
}
// Continuous double side frame.
function frame(W, y1, y2, inset = 40) {
  const p = (x) => `M${x} ${y1} V${y2}`;
  return `<path d="${p(inset)} ${p(inset + 14)} ${p(W - inset)} ${p(W - inset - 14)}" stroke="${C.goldLine}" stroke-width="3" fill="none"/>`;
}
function hrule(x1, x2, y) {
  return `<path d="M${x1} ${y} H${x2} M${x1} ${y + 9} H${x2}" stroke="${C.goldLine}" stroke-width="3"/>`;
}
// Scallop wave rows (seigaiha) from y0 down; rows overlap.
function scallops(x1, x2, y0, R, rows) {
  let s = '';
  for (let ri = 0; ri < rows; ri++) {
    const y = y0 + R + ri * R * 0.75, off = (ri % 2) * R, col = ri % 2 ? C.teal : C.ocean;
    for (let x = x1 - R + off; x < x2 + R; x += 2 * R) s += `<path d="M${x - R} ${y} A${R} ${R} 0 0 1 ${x + R} ${y} Z" fill="${col}" stroke="${C.goldLine}" stroke-width="2"/>`;
  }
  return s;
}
// Deco arch: double gold outline, tan rays inside, stepped shoulders, base line, keystone.
function arch(cx, top, hw, base, opts = {}) {
  const cy = top + hw, r = hw, cid = id('arch');
  const fill = opts.fill || C.beige, rays = opts.rays || [C.tan, C.beige], rayN = opts.rayN || 20;
  const rayY = opts.rayY ?? base - 60;
  let s = `<defs><clipPath id="${cid}"><path d="M${cx - r} ${base} V${cy} A${r} ${r} 0 0 1 ${cx + r} ${cy} V${base} Z"/></clipPath></defs>`;
  s += `<g clip-path="url(#${cid})"><rect x="${cx - r}" y="${top}" width="${2 * r}" height="${base - top}" fill="${fill}"/>${wedges(cx, rayY, rayN, 2000, 180, 180, rays)}</g>`;
  s += `<path d="M${cx - r} ${base} V${cy} A${r} ${r} 0 0 1 ${cx + r} ${cy} V${base}" fill="none" stroke="${C.goldLine}" stroke-width="6"/>`;
  const r2 = r - 22;
  s += `<path d="M${cx - r2} ${base} V${cy} A${r2} ${r2} 0 0 1 ${cx + r2} ${cy} V${base}" fill="none" stroke="${C.goldLine}" stroke-width="2"/>`;
  if (opts.shoulders !== false) {
    const sh = opts.shoulderY ?? cy + 120, st = opts.step ?? 50;
    s += `<path d="M${cx - r} ${sh} H${cx - r - st} V${sh + 90} H${cx - r - 2 * st} V${base} H${cx + r + 2 * st} V${sh + 90} H${cx + r + st} V${sh} H${cx + r}" fill="none" stroke="${C.goldLine}" stroke-width="3"/>`;
    s += `<path d="M${cx - r} ${sh + 36} H${cx - r - st + 18} V${sh + 126} H${cx - r - 2 * st + 18} V${base - 12} H${cx + r + 2 * st - 18} V${sh + 126} H${cx + r + st - 18} V${sh + 36} H${cx + r}" fill="none" stroke="${C.goldLine}" stroke-width="2"/>`;
  } else {
    s += `<path d="M${cx - r} ${base} H${cx + r}" stroke="${C.goldLine}" stroke-width="6"/>`;
  }
  if (opts.keystone !== false) s += `<path d="M${cx - 28} ${top - 4} H${cx + 28} L${cx + 15} ${top + 26} H${cx - 15} Z" fill="${C.red}"/>`;
  return s;
}
// Stepped navy plaque.
function plaque(cx, y, w, h, fill = C.navy) {
  const x1 = cx - w / 2, x2 = cx + w / 2, s1 = 30, d = 18;
  const pts = (i) => [[x1 + i, y + 2 * d + i], [x1 + s1 + i, y + 2 * d + i], [x1 + s1 + i, y + d + i], [x1 + 2 * s1 + i, y + d + i], [x1 + 2 * s1 + i, y + i],
    [x2 - 2 * s1 - i, y + i], [x2 - 2 * s1 - i, y + d + i], [x2 - s1 - i, y + d + i], [x2 - s1 - i, y + 2 * d + i], [x2 - i, y + 2 * d + i],
    [x2 - i, y + h - 2 * d - i], [x2 - s1 - i, y + h - 2 * d - i], [x2 - s1 - i, y + h - d - i], [x2 - 2 * s1 - i, y + h - d - i], [x2 - 2 * s1 - i, y + h - i],
    [x1 + 2 * s1 + i, y + h - i], [x1 + 2 * s1 + i, y + h - d - i], [x1 + s1 + i, y + h - d - i], [x1 + s1 + i, y + h - 2 * d - i], [x1 + i, y + h - 2 * d - i]]
    .map((p) => p.join(' ')).join(' L');
  return `<path d="M${pts(0)} Z" fill="${fill}" stroke="${C.goldLine}" stroke-width="5"/><path d="M${pts(12)} Z" fill="none" stroke="${C.goldLine}" stroke-width="2"/>`;
}
// Pointed matchup plaque.
function pointed(cx, y, w, h, fill = C.teal) {
  const x1 = cx - w / 2, x2 = cx + w / 2, m = y + h / 2, k = h * 0.55;
  return `<path d="M${x1} ${m} L${x1 + k} ${y} H${x2 - k} L${x2} ${m} L${x2 - k} ${y + h} H${x1 + k} Z" fill="${fill}" stroke="${C.goldLine}" stroke-width="5"/>` +
    `<path d="M${x1 + 22} ${m} L${x1 + k + 8} ${y + 12} H${x2 - k - 8} L${x2 - 22} ${m} L${x2 - k - 8} ${y + h - 12} H${x1 + k + 8} Z" fill="none" stroke="${C.goldLight}" stroke-width="2"/>`;
}
// Fan divider with diamonds.
function fan(cx, y, half = 300) {
  return hrule(cx - half, cx - 70, y - 4) + hrule(cx + 70, cx + half, y - 4) +
    wedges(cx, y + 24, 7, 44, 180, 180, [C.goldLine, C.beige]) +
    `<path d="M${cx - 14} ${y + 24} L${cx} ${y + 10} L${cx + 14} ${y + 24} Z" fill="${C.red}"/>` +
    `<path d="M${cx - 92} ${y} l10 -10 l10 10 l-10 10 Z M${cx + 72} ${y} l10 -10 l10 10 l-10 10 Z" fill="${C.teal}"/>`;
}
// Small rule with a red diamond (used inside cards).
function diamondRule(cx, y, half) {
  return `<path d="M${cx - half} ${y} H${cx + half} M${cx - half} ${y + 10} H${cx + half}" stroke="${C.goldLine}" stroke-width="2"/><path d="M${cx - 15} ${y + 5} L${cx} ${y - 10} L${cx + 15} ${y + 5} L${cx} ${y + 20} Z" fill="${C.red}"/>`;
}
// Navy half-sun.
function halfSun(cx, base, r) {
  const cid = id('sun');
  return `<defs><clipPath id="${cid}"><path d="M${cx - r} ${base} A${r} ${r} 0 0 1 ${cx + r} ${base} Z"/></clipPath></defs>` +
    `<g clip-path="url(#${cid})"><rect x="${cx - r}" y="${base - r}" width="${2 * r}" height="${r}" fill="${C.navy}"/>${wedges(cx, base, 18, r * 1.2, 180, 180, [C.navy2, C.navy])}</g>` +
    `<path d="M${cx - r} ${base} A${r} ${r} 0 0 1 ${cx + r} ${base}" fill="none" stroke="${C.goldLine}" stroke-width="6"/>` +
    `<path d="M${cx - r + 24} ${base} A${r - 24} ${r - 24} 0 0 1 ${cx + r - 24} ${base}" fill="none" stroke="${C.goldLine}" stroke-width="2"/>` +
    `<path d="M${cx - r - 60} ${base} H${cx + r + 60} M${cx - r - 60} ${base + 9} H${cx + r + 60}" stroke="${C.goldLine}" stroke-width="3"/>`;
}
// Arch card (rounded top) with inner rays at the top.
function card(x, y, w, h) {
  const r = w / 2, cx = x + r, cy = y + r;
  let s = `<path d="M${x} ${y + h} V${cy} A${r} ${r} 0 0 1 ${x + w} ${cy} V${y + h} Z" fill="${C.beige}" stroke="${C.goldLine}" stroke-width="5"/>`;
  let rays = '';
  for (let i = 0; i < 9; i += 2) {
    const a0 = (-180 + i * 20) * Math.PI / 180, a1 = (-180 + (i + 1) * 20) * Math.PI / 180, rr = r * 0.82;
    rays += `<path d="M${cx} ${cy} L${cx + Math.cos(a0) * rr} ${cy + Math.sin(a0) * rr} A${rr} ${rr} 0 0 1 ${cx + Math.cos(a1) * rr} ${cy + Math.sin(a1) * rr} Z" fill="${C.tan}"/>`;
  }
  s += rays;
  const i = 18, r2 = r - i;
  s += `<path d="M${x + i} ${y + h - i} V${cy} A${r2} ${r2} 0 0 1 ${x + w - i} ${cy} V${y + h - i} Z" fill="none" stroke="${C.goldLine}" stroke-width="2"/>`;
  return s;
}
// Crossed driver + iron, drawn around a ball centre (cx, cy). Geometry from the email card.
function clubs(cx, cy, s) {
  return `<g transform="translate(${cx} ${cy}) scale(${s}) translate(-350 -222)">
    <line x1="232" y1="96" x2="448" y2="392" stroke="${C.navy}" stroke-width="7" stroke-linecap="round"/>
    <line x1="232" y1="96" x2="268" y2="146" stroke="${C.navy}" stroke-width="16" stroke-linecap="round"/>
    <line x1="262" y1="138" x2="272" y2="152" stroke="${C.goldLine}" stroke-width="18"/>
    <path d="M440 380 L486 384 L494 414 L436 414 Z" fill="${C.navy}" stroke="${C.goldLine}" stroke-width="3" stroke-linejoin="round"/>
    <path d="M446 396 H486 M444 404 H488" stroke="${C.goldLine}" stroke-width="2"/>
    <line x1="468" y1="96" x2="258" y2="388" stroke="${C.navy}" stroke-width="7" stroke-linecap="round"/>
    <line x1="468" y1="96" x2="432" y2="146" stroke="${C.navy}" stroke-width="16" stroke-linecap="round"/>
    <line x1="438" y1="138" x2="428" y2="152" stroke="${C.goldLine}" stroke-width="18"/>
    <path d="M262 380 C 240 374, 206 382, 204 400 C 202 416, 232 420, 262 412 C 272 408, 274 388, 262 380 Z" fill="${C.navy}" stroke="${C.goldLine}" stroke-width="3"/>
    <path d="M214 402 C 230 408, 250 406, 262 400" fill="none" stroke="${C.goldLine}" stroke-width="2"/></g>`;
}
// Medallion with "vs."
function medallion(cx, cy, r) {
  return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${C.navy}" stroke="${C.goldLine}" stroke-width="6"/><circle cx="${cx}" cy="${cy}" r="${r - 14}" fill="none" stroke="${C.goldLight}" stroke-width="2"/>`;
}

// ---------- HTML helpers ----------
// Centered text block across [x, x+w].
function text(str, { x = 0, w, top, size, font = 'display', color = C.navy, ls = 0, lh = 1.1, weight = 700, nowrap = false, extra = '' }) {
  const ff = font === 'display' ? "Limelight, Georgia, serif" : "'Josefin Sans', Arial, sans-serif";
  const caps = font === 'caps';
  return `<div style="position:absolute;left:${x}px;width:${w}px;top:${top}px;text-align:center;font-family:${ff};font-size:${size}px;line-height:${lh};color:${color};` +
    `${caps ? `font-weight:${weight};text-transform:uppercase;letter-spacing:${ls}em;text-indent:${ls}em;` : ''}${nowrap ? 'white-space:nowrap;' : ''}${extra}">${str}</div>`;
}
function img(f, { left, top, height, width, extra = '' }) {
  return `<img src="${A(f)}" style="position:absolute;left:${left}px;top:${top}px;${height ? `height:${height}px;` : ''}${width ? `width:${width}px;` : ''}${extra}">`;
}
// Host logos centered in [x, x+w], one color, no box.
function hosts(x, w, top, h, white = false) {
  const col = white ? '#FFFFFF' : C.teal, suf = white ? 'white' : 'teal';
  return `<div style="position:absolute;left:${x}px;width:${w}px;top:${top}px;height:${h}px;display:flex;justify-content:center;align-items:center;gap:${Math.round(h * 0.36)}px">` +
    `<img src="${A('marjcc-' + suf + '.png')}" style="height:${h}px">` +
    `<span style="width:2px;height:${Math.round(h * 0.86)}px;background:${col};opacity:.5"></span>` +
    `<img src="${A('mbjcc-' + suf + '.png')}" style="height:${Math.round(h * 0.8)}px"></div>`;
}
function gmjf(cx, top, h) {
  const w = Math.round(710 * h / 338);
  return img('gmjf-logo-black.png', { left: Math.round(cx - w / 2), top, height: h });
}
const NAME = 'Golf&nbsp;&amp;&nbsp;Games&nbsp;Classic';

function page(W, H, svg, html) {
  return `<!doctype html><html><head><meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Limelight&family=Josefin+Sans:wght@600;700&display=swap">
<style>html,body{margin:0;background:${C.beige}}#stage{position:relative;width:${W}px;height:${H}px;overflow:hidden;background:${C.beige}}svg{position:absolute;left:0;top:0}</style></head>
<body><div id="stage"><svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">${svg}</svg>${html}</div>
<script>document.fonts.ready.then(()=>setTimeout(()=>window.__ready=true,150))</script></body></html>`;
}

// ---------- Pieces ----------
const pieces = {};
const PW = 1080, PH = 1350, SW = 1080, SH = 1920;

// Shared bottom: scallop rows + GMJF alone at the very bottom.
function postBottom(W, x0 = 0) {
  return { svg: scallops(x0, x0 + W, 1118, 30, 4), html: gmjf(x0 + W / 2, 1258, 66) };
}

pieces['posts/01-save-the-date'] = () => {
  const W = PW, H = PH, cx = W / 2;
  let svg = band(W, 120) + frame(W, 150, 1118);
  svg += arch(cx, 262, 330, 990, { rayY: 930, shoulderY: 640, step: 46 });
  svg += plaque(cx, 800, 600, 116);
  const b = postBottom(W);
  svg += b.svg;
  let html = hosts(0, W, 168, 64);
  html += text('Save the Date', { w: W, top: 340, size: 24, font: 'caps', color: C.goldText, ls: 0.3 });
  html += img('golf-games-classic-logo.png', { left: cx - 270, top: 386, width: 540 });
  html += text('March 12, 2027', { w: W, top: 826, size: 64, color: C.goldLight });
  html += text('Miami Beach Golf Club', { w: W, top: 938, size: 20, font: 'caps', color: C.teal, ls: 0.38 });
  html += text('Golf &amp; Mahjong Tournament', { w: W, top: 1024, size: 24, font: 'caps', color: C.goldText, ls: 0.28 });
  html += text('More details coming soon!', { w: W, top: 1066, size: 18, font: 'caps', color: C.teal, ls: 0.22, weight: 600 });
  html += b.html;
  return page(W, H, svg, html);
};

pieces['posts/02-friendly-rivalry'] = () => {
  const W = PW, H = PH, cx = W / 2;
  let svg = band(W, 120) + frame(W, 150, 1118);
  svg += pointed(cx, 556, 760, 84);
  svg += halfSun(cx, 1074, 380);
  const b = postBottom(W);
  svg += b.svg;
  let html = hosts(0, W, 168, 64);
  html += text('Two JCCs.', { w: W, top: 268, size: 132, color: C.teal, lh: 1 });
  html += text('One Tournament.', { w: W, top: 414, size: 84, color: C.navy, lh: 1 });
  html += text('Team MARJCC <span style="font-family:Limelight,serif;text-transform:none;letter-spacing:0;color:#F0C078">vs.</span> Team MBJCC', { w: W, top: 580, size: 30, font: 'caps', color: C.cream, ls: 0.14 });
  html += text('One Friendly<br>Rivalry!', { w: W, top: 840, size: 78, color: C.goldLight, lh: 1.08 });
  html += b.html;
  return page(W, H, svg, html);
};

function gameCard(kind) {
  const W = PW, H = PH, cx = W / 2;
  let svg = band(W, 120) + frame(W, 150, 1118) + card(cx - 350, 250, 700, 830) + diamondRule(cx, 770, 260);
  let html = hosts(0, W, 168, 64);
  if (kind === 'golf') {
    const bh = 380, bw = Math.round(584 * bh / 744), top = 318, bcy = top + 253 * bh / 744;
    svg += clubs(cx, bcy, 1.25);
    html += img('ball.png', { left: Math.round(cx - bw / 2), top, height: bh });
    html += text('Golf', { w: W, top: 806, size: 30, font: 'caps', color: C.goldText, ls: 0.42 });
    html += text('May the best<br>team win!', { w: W, top: 858, size: 70, color: C.navy, lh: 1.08 });
  } else {
    html += img('tile.png', { left: 280, top: 380, height: 280 });
    html += img('tiles.png', { left: 488, top: 360, height: 300 });
    html += text('Mahjong', { w: W, top: 806, size: 30, font: 'caps', color: C.goldText, ls: 0.42 });
    html += text('Everyone plays<br>together!', { w: W, top: 858, size: 70, color: C.navy, lh: 1.08 });
  }
  const b = postBottom(W);
  svg += b.svg;
  html += b.html;
  return page(W, H, svg, html);
}
pieces['posts/03-golf'] = () => gameCard('golf');
pieces['posts/04-mahjong'] = () => gameCard('mahjong');

function teamArches(W, top, base, hw, gap, title, titleTop, titleSize) {
  const cx = W / 2, c1 = cx - gap / 2 - hw, c2 = cx + gap / 2 + hw;
  let svg = arch(c1, top, hw, base, { fill: C.teamMar, rays: [C.teamMarRay, C.teamMar], rayN: 16, rayY: base - 40, shoulders: false, keystone: false });
  svg += arch(c2, top, hw, base, { fill: C.teamMb, rays: [C.teamMbRay, C.teamMb], rayN: 16, rayY: base - 40, shoulders: false, keystone: false });
  const my = top + hw + (base - top - hw) * 0.42;
  svg += medallion(cx, my, 74);
  let html = text(title, { w: W, top: titleTop, size: titleSize, color: C.navy, lh: 1.05 });
  const ly = top + hw * 0.62;
  html += `<div style="position:absolute;left:${c1 - hw}px;width:${2 * hw}px;top:${ly}px;display:flex;justify-content:center"><img src="${A('marjcc-white.png')}" style="height:${Math.round(hw * 0.5)}px"></div>`;
  html += `<div style="position:absolute;left:${c2 - hw}px;width:${2 * hw}px;top:${ly + hw * 0.08}px;display:flex;justify-content:center"><img src="${A('mbjcc-white.png')}" style="height:${Math.round(hw * 0.38)}px"></div>`;
  const ty = ly + hw * 0.66;
  html += text('Team<br>MARJCC', { x: c1 - hw, w: 2 * hw, top: ty, size: Math.round(hw * 0.17), font: 'caps', color: '#FFFFFF', ls: 0.14, lh: 1.25 });
  html += text('Team<br>MBJCC', { x: c2 - hw, w: 2 * hw, top: ty, size: Math.round(hw * 0.17), font: 'caps', color: '#FFFFFF', ls: 0.14, lh: 1.25 });
  html += text('vs.', { w: W, top: my - 44, size: 64, color: C.goldLight, lh: 1 });
  return { svg, html };
}

pieces['posts/05-pick-your-team'] = () => {
  const W = PW, H = PH;
  let svg = band(W, 120) + frame(W, 150, 1118);
  const t = teamArches(W, 360, 1010, 200, 56, 'Pick Your Team', 196, 96);
  svg += t.svg;
  const b = postBottom(W);
  svg += b.svg;
  let html = t.html + text('Golf &amp; Mahjong &nbsp;·&nbsp; March 12, 2027', { w: W, top: 1040, size: 20, font: 'caps', color: C.goldText, ls: 0.24 });
  html += b.html;
  return page(W, H, svg, html);
};

// Carousel: one 3240 x 1350 composition cut into three slides.
pieces['posts/carousel'] = () => {
  const W = PW * 3, H = PH;
  let svg = band(W, 120) + frame(W, 150, 1118);
  svg += hrule(54, W - 54, 1090);
  svg += scallops(0, W, 1118, 30, 4);
  // slide 1
  let cx = 540;
  svg += arch(cx, 262, 330, 990, { rayY: 930, shoulderY: 640, step: 46 });
  svg += plaque(cx, 800, 600, 116);
  // slide 2: two cards
  const c2 = 1620;
  svg += card(c2 - 450, 250, 420, 790) + card(c2 + 30, 250, 420, 790);
  svg += diamondRule(c2 - 240, 700, 150) + diamondRule(c2 + 240, 700, 150);
  const bcx = c2 - 240, bh = 250, bw = Math.round(584 * bh / 744), btop = 360, bcy = btop + 253 * bh / 744;
  svg += clubs(bcx, bcy, 0.86);
  // slide 3
  const c3 = 2700;
  svg += pointed(c3, 300, 760, 84);
  svg += halfSun(c3, 1000, 400);
  let html = '';
  for (const x of [0, 1080, 2160]) html += hosts(x, 1080, 168, 64);
  html += text('Save the Date', { x: 0, w: 1080, top: 340, size: 24, font: 'caps', color: C.goldText, ls: 0.3 });
  html += img('golf-games-classic-logo.png', { left: cx - 270, top: 386, width: 540 });
  html += text('March 12, 2027', { x: 0, w: 1080, top: 826, size: 64, color: C.goldLight });
  html += text('Miami Beach Golf Club', { x: 0, w: 1080, top: 938, size: 20, font: 'caps', color: C.teal, ls: 0.38 });
  html += text('Golf &amp; Mahjong Tournament', { x: 0, w: 1080, top: 1022, size: 22, font: 'caps', color: C.goldText, ls: 0.28 });
  html += img('ball.png', { left: Math.round(bcx - bw / 2), top: btop, height: bh });
  html += img('tile.png', { left: c2 + 60, top: 400, height: 190 });
  html += img('tiles.png', { left: c2 + 200, top: 384, height: 205 });
  html += text('Golf', { x: c2 - 450, w: 420, top: 736, size: 24, font: 'caps', color: C.goldText, ls: 0.42 });
  html += text('May the best<br>team win!', { x: c2 - 450, w: 420, top: 784, size: 46, color: C.navy, lh: 1.1 });
  html += text('Mahjong', { x: c2 + 30, w: 420, top: 736, size: 24, font: 'caps', color: C.goldText, ls: 0.42 });
  html += text('Everyone plays<br>together!', { x: c2 + 30, w: 420, top: 784, size: 46, color: C.navy, lh: 1.1 });
  html += text('Team MARJCC <span style="font-family:Limelight,serif;text-transform:none;letter-spacing:0;color:#F0C078">vs.</span> Team MBJCC', { x: 2160, w: 1080, top: 324, size: 30, font: 'caps', color: C.cream, ls: 0.14 });
  html += text('Two communities.<br><span style="color:#F0C078">One unforgettable day!</span>', { x: 2160, w: 1080, top: 760, size: 56, color: C.cream, lh: 1.12 });
  html += text('More details coming soon!', { x: 2160, w: 1080, top: 1032, size: 22, font: 'caps', color: C.goldText, ls: 0.26 });
  html += text('Swipe &rarr;', { x: 0, w: 1040, top: 1056, size: 16, font: 'caps', color: C.teal, ls: 0.3, extra: 'text-align:right' });
  html += text('Swipe &rarr;', { x: 1080, w: 1040, top: 1056, size: 16, font: 'caps', color: C.teal, ls: 0.3, extra: 'text-align:right' });
  for (const x of [540, 1620, 2700]) html += gmjf(x, 1258, 66);
  return page(W, H, svg, html);
};

// Stories: keep text between y 250 and 1580.
function storyBottom(W) {
  return { svg: scallops(0, W, 1640, 34, 7), html: gmjf(W / 2, 1494, 78) };
}

pieces['stories/01-save-the-date'] = () => {
  const W = SW, H = SH, cx = W / 2;
  let svg = band(W, 190) + frame(W, 222, 1640);
  svg += arch(cx, 400, 370, 1300, { rayY: 1240, shoulderY: 860, step: 50 });
  svg += plaque(cx, 1062, 660, 128);
  const b = storyBottom(W);
  svg += b.svg;
  let html = hosts(0, W, 270, 76);
  html += text('Save the Date', { w: W, top: 486, size: 26, font: 'caps', color: C.goldText, ls: 0.3 });
  html += img('golf-games-classic-logo.png', { left: cx - 300, top: 540, width: 600 });
  html += text('March 12, 2027', { w: W, top: 1092, size: 70, color: C.goldLight });
  html += text('Miami Beach Golf Club', { w: W, top: 1228, size: 22, font: 'caps', color: C.teal, ls: 0.38 });
  html += text('Golf &amp; Mahjong Tournament', { w: W, top: 1346, size: 26, font: 'caps', color: C.goldText, ls: 0.28 });
  html += text('More details coming soon!', { w: W, top: 1396, size: 20, font: 'caps', color: C.teal, ls: 0.22, weight: 600 });
  html += b.html;
  return page(W, H, svg, html);
};

pieces['stories/02-mark-your-calendar'] = () => {
  const W = SW, H = SH, cx = W / 2;
  let svg = band(W, 190) + frame(W, 222, 1640);
  svg += arch(cx, 600, 400, 1290, { rayY: 1230, shoulders: false, keystone: true });
  svg += plaque(cx, 700, 600, 540);
  svg += hrule(cx - 220, cx + 220, 810);
  svg += fan(cx, 1380, 320);
  const b = storyBottom(W);
  svg += b.svg;
  let html = hosts(0, W, 270, 76);
  html += text('Mark Your', { w: W, top: 382, size: 104, color: C.navy, lh: 1 });
  html += text('Calendar', { w: W, top: 492, size: 104, color: C.teal, lh: 1 });
  html += text('March', { w: W, top: 748, size: 42, font: 'caps', color: C.goldLight, ls: 0.4 });
  html += text('12', { w: W, top: 838, size: 300, color: C.goldLight, lh: 1 });
  html += text('2027', { w: W, top: 1166, size: 34, font: 'caps', color: C.cream, ls: 0.5 });
  html += text(NAME, { w: W, top: 1318, size: 26, font: 'caps', color: C.teal, ls: 0.22, nowrap: true });
  html += text('Golf &amp; Mahjong &nbsp;·&nbsp; Miami Beach Golf Club', { w: W, top: 1420, size: 18, font: 'caps', color: C.goldText, ls: 0.22 });
  html += b.html;
  return page(W, H, svg, html);
};

pieces['stories/03-which-team'] = () => {
  const W = SW, H = SH;
  let svg = band(W, 190) + frame(W, 222, 1640);
  const t = teamArches(W, 620, 1330, 206, 60, 'Which Team<br>Are You On?', 300, 104);
  svg += t.svg;
  const b = storyBottom(W);
  svg += b.svg;
  let html = t.html + text('Golf &amp; Mahjong &nbsp;·&nbsp; Miami Beach Golf Club', { w: W, top: 1366, size: 20, font: 'caps', color: C.goldText, ls: 0.24 });
  html += text('March 12, 2027', { w: W, top: 1410, size: 40, color: C.teal, lh: 1 });
  html += b.html;
  return page(W, H, svg, html);
};

// ---------- Render ----------
(async () => {
  const filter = process.argv[2] || '';
  const outDir = path.join(__dirname, '..');
  const b = await chromium.launch();
  for (const [name, fn] of Object.entries(pieces)) {
    if (!name.includes(filter)) continue;
    uid = 0;
    const html = fn();
    const htmlPath = path.join(__dirname, 'deco', name.replace('/', '-') + '.html');
    fs.writeFileSync(htmlPath, html);
    const isCarousel = name.endsWith('carousel');
    const W = isCarousel ? PW * 3 : (name.startsWith('stories') ? SW : PW), H = name.startsWith('stories') ? SH : PH;
    const p = await b.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });
    await p.goto('file://' + htmlPath);
    await p.waitForFunction(() => window.__ready);
    if (isCarousel) {
      for (let i = 0; i < 3; i++) await p.screenshot({ path: path.join(outDir, 'posts', `carousel-${i + 1}.png`), clip: { x: i * PW, y: 0, width: PW, height: PH } });
    } else {
      await p.screenshot({ path: path.join(outDir, name + '.png'), clip: { x: 0, y: 0, width: W, height: H } });
    }
    await p.close();
    console.log('rendered', name);
  }
  await b.close();
})();
