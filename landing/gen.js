// Golf & Games Classic landing page generator.
// Writes index.html and og.html. The output is plain static HTML: run `node gen.js` only
// when you change this file. Scene helpers mirror instagram/src/build.js so the page
// matches the Instagram posts exactly.
const fs = require('fs');

let seed = 7;
const rnd = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };

const sine = (w, y, amp, wl, ph, step = 12) => { let d = ''; for (let x = -20; x <= w + 20; x += step) { const yy = y + amp * Math.sin((x / wl) * 2 * Math.PI + ph) + amp * .35 * Math.sin((x / (wl * .43)) * 2 * Math.PI + ph * 1.7); d += (d ? ' L' : 'M') + x.toFixed(1) + ' ' + yy.toFixed(1); } return d; };
const waveFill = (w, h, y, amp, wl, ph, fill, op = 1) => `<path d="${sine(w, y, amp, wl, ph)} L${w + 20} ${h} L-20 ${h} Z" fill="${fill}" opacity="${op}"/>`;
const waveLine = (w, y, amp, wl, ph, stroke, sw, op, cls = 'draw') => `<path class="${cls}" pathLength="1" d="${sine(w, y, amp, wl, ph, 8)}" fill="none" stroke="${stroke}" stroke-width="${sw}" opacity="${op}" stroke-linecap="round"/>`;
const bokeh = (x0, y0, w, h, n, cols, rmin = 6, rmax = 40) => { let s = ''; for (let i = 0; i < n; i++) { const r = rmin + rnd() * (rmax - rmin); s += `<circle class="bk bk${i % 3}" cx="${(x0 + rnd() * w).toFixed(0)}" cy="${(y0 + rnd() * h).toFixed(0)}" r="${r.toFixed(1)}" fill="${cols[i % cols.length]}" opacity="${(.12 + rnd() * .3).toFixed(2)}" filter="url(#b${r > 22 ? '8' : '3'})"/>`; } return `<g class="bokeh">${s}</g>`; };
const stars = (x0, y0, w, h, n) => { let s = ''; for (let i = 0; i < n; i++) s += `<circle class="st st${i % 3}" cx="${(x0 + rnd() * w).toFixed(0)}" cy="${(y0 + rnd() * h).toFixed(0)}" r="${(.8 + rnd() * 2.2).toFixed(1)}" fill="#FFF3CF" opacity="${(.3 + rnd() * .6).toFixed(2)}"/>`; return s; };
const rays = (cx, cy, n, len, a0, a1, op) => { let s = ''; for (let i = 0; i < n; i++) { const a = (a0 + (a1 - a0) * (i + .5) / n) * Math.PI / 180, da = ((a1 - a0) / n) * .32 * Math.PI / 180; s += `<polygon points="${cx},${cy} ${cx + len * Math.cos(a - da)},${cy + len * Math.sin(a - da)} ${cx + len * Math.cos(a + da)},${cy + len * Math.sin(a + da)}" fill="url(#ray)" opacity="${op * (.55 + rnd() * .45)}"/>`; } return `<g class="rays" style="transform-origin:${cx}px ${cy}px" filter="url(#b8)">${s}</g>`; };
const sweepSides = (w, h, y0) => { let s = ''; const L = [[0, y0, w * .28, y0 - h * .22, w * .06, y0 - h * .42], [w, y0, w * .72, y0 - h * .22, w * .94, y0 - h * .42]]; for (const [x, y, cx, cy, ex, ey] of L) for (let i = 0; i < 4; i++) { const o = i * 14; s += `<path class="draw" pathLength="1" d="M${x} ${y + o} Q${cx} ${cy + o} ${ex} ${ey + o * 1.6}" fill="none" stroke="#F0C078" stroke-width="${i ? 1.6 : 3}" opacity="${.8 - i * .17}" filter="url(#glow)" stroke-linecap="round"/>`; } return s; };

const DEFS = `<defs>
<filter id="b3" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="3"/></filter>
<filter id="b8" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="8"/></filter>
<filter id="b30" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="30"/></filter>
<filter id="b80" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="80"/></filter>
<filter id="glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="6" result="g"/><feMerge><feMergeNode in="g"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
<radialGradient id="ray" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="scale(1400)"><stop offset="0" stop-color="#FFF3CF" stop-opacity=".9"/><stop offset="1" stop-color="#F0C078" stop-opacity="0"/></radialGradient>
<radialGradient id="sun"><stop offset="0" stop-color="#FFFBEA"/><stop offset=".35" stop-color="#FFE9A8"/><stop offset=".62" stop-color="#F9C27E" stop-opacity=".75"/><stop offset="1" stop-color="#F89090" stop-opacity="0"/></radialGradient>
<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0B3A55"/><stop offset=".16" stop-color="#2A7FA0"/><stop offset=".34" stop-color="#C68FA8"/><stop offset=".5" stop-color="#F59497"/><stop offset=".68" stop-color="#F9A982"/><stop offset=".85" stop-color="#FFCB8E"/><stop offset="1" stop-color="#FFE7B0"/></linearGradient>
<linearGradient id="sea" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F7B48C" stop-opacity="0"/><stop offset=".05" stop-color="#F2A88E" stop-opacity=".9"/><stop offset=".16" stop-color="#4FA9B6"/><stop offset=".42" stop-color="#0B6573"/><stop offset=".74" stop-color="#003040"/><stop offset="1" stop-color="#00141F"/></linearGradient>
<linearGradient id="deepwave" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#009098"/><stop offset=".5" stop-color="#004E5E"/><stop offset="1" stop-color="#00141F"/></linearGradient>
<linearGradient id="gline" x1="0" x2="1"><stop offset="0" stop-color="#F0C078" stop-opacity="0"/><stop offset=".25" stop-color="#F0C078"/><stop offset=".5" stop-color="#FFF3CF"/><stop offset=".75" stop-color="#F0C078"/><stop offset="1" stop-color="#F0C078" stop-opacity="0"/></linearGradient>
<linearGradient id="streak" x1="0" x2="1"><stop offset="0" stop-color="#FFE9A8" stop-opacity="0"/><stop offset=".5" stop-color="#FFF3CF"/><stop offset="1" stop-color="#FFE9A8" stop-opacity="0"/></linearGradient>
<linearGradient id="fadeTop" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#00141F"/><stop offset="1" stop-color="#00141F" stop-opacity="0"/></linearGradient>
<linearGradient id="fadeBot" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#00141F" stop-opacity="0"/><stop offset="1" stop-color="#00141F"/></linearGradient>
</defs>`;
const svg = (w, h, inner, cls = 'scene') => `<svg class="${cls}" viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">${DEFS}${inner}</svg>`;

// HERO: the sunset sea, same recipe as post 01, ends in the page navy
function hero(w, h) {
  seed = 21; const k = h / 1100, hz = h * .58, sx = w / 2, sy = h * .36, sr = 150 * k;
  let s = `<rect width="${w}" height="${h}" fill="url(#sky)"/>`;
  s += `<g class="sunglow"><circle cx="${sx}" cy="${sy}" r="${sr * 3.2}" fill="url(#sun)" opacity=".55" filter="url(#b80)"/><circle cx="${sx}" cy="${sy}" r="${sr * 1.7}" fill="url(#sun)" opacity=".9" filter="url(#b30)"/></g>`;
  s += rays(sx, sy, 20, 1900 * Math.max(k, .7), -180, 0, .22);
  s += `<rect y="${hz - 60}" width="${w}" height="${h - hz + 60}" fill="url(#sea)"/>`;
  let st = ''; for (let i = 0; i < 34; i++) { const t = i / 34, yy = hz + 10 + t * t * (h - hz) * .7, ww = (sr * 1.8) * (1 - t * .6) * (.5 + rnd() * .7); st += `<rect class="streak s${i % 4}" x="${sx - ww / 2 + (rnd() - .5) * 30 * t}" y="${yy}" width="${ww}" height="${3 + t * 7}" rx="4" fill="url(#streak)" opacity="${(.75 - t * .6).toFixed(2)}" filter="url(#b3)"/>`; }
  s += `<g>${st}</g>`;
  const base = h * .73;
  s += `<g class="wave w1">${waveFill(w, h, base, 22, 520, .3, 'url(#deepwave)', .55)}${waveLine(w, base - 6, 22, 520, .3, 'url(#gline)', 3, .8)}</g>`;
  s += `<g class="wave w2">${waveFill(w, h, base + 90, 28, 700, 2.1, 'url(#deepwave)', .8)}${waveLine(w, base + 84, 28, 700, 2.1, 'url(#gline)', 2, .55)}</g>`;
  s += `<g class="wave w3">${waveFill(w, h, base + 190, 20, 440, 4, '#00141F', .92)}</g>`;
  s += `<rect y="${h - 120}" width="${w}" height="120" fill="url(#fadeBot)"/>`;
  s += bokeh(0, hz - 260, w, h - hz, 34, ['#FFE9A8', '#7FD6DA', '#F89090']);
  s += sweepSides(w, h, h - 170);
  return svg(w, h, s, 'scene hero-scene');
}

// NIGHT: deep navy, rays from above, stars, bokeh, gold ribbons; top and bottom fade into page navy
function night(w, h, o = {}) {
  seed = o.seed || 5;
  let s = `<rect width="${w}" height="${h}" fill="#001A27"/>`;
  s += `<ellipse cx="${o.gx || w / 2}" cy="${o.gy || h * .45}" rx="${w * .6}" ry="${h * .45}" fill="#0B5266" opacity=".7" filter="url(#b80)"/>`;
  s += `<ellipse cx="${o.gx || w / 2}" cy="${o.gy || h * .45}" rx="${w * .26}" ry="${h * .2}" fill="#F0C078" opacity=".18" filter="url(#b80)"/>`;
  s += stars(0, 0, w, h * .7, 80);
  s += rays(o.rx || w / 2, o.ry || -160, 22, h * 1.6, 20, 160, o.rayOp || .14);
  s += bokeh(0, 0, w, h, o.bk || 36, ['#F0C078', '#7FD6DA', '#FF6B88', '#FFF3CF']);
  const b = o.waveY || h - 220;
  s += `<g class="wave w1">${waveLine(w, b - 120, 40, 900, 1.2, 'url(#gline)', 3, .55)}${waveLine(w, b - 90, 30, 640, 2.4, 'url(#gline)', 1.5, .4)}</g>`;
  s += `<g class="wave w2">${waveFill(w, h, b, 30, 620, .6, 'url(#deepwave)', .45)}${waveLine(w, b - 4, 30, 620, .6, 'url(#gline)', 2.5, .6)}</g>`;
  s += `<rect width="${w}" height="160" fill="url(#fadeTop)"/><rect y="${h - 200}" width="${w}" height="200" fill="url(#fadeBot)"/>`;
  return svg(w, h, s);
}

// RIVALS: team teal and team blue flowing into each other along a glowing gold S-curve
function rivals(w, h) {
  seed = 3; const vy = h * .52;
  const c = `M${w * .66} -60 C${w * .3} ${h * .3}, ${w * .72} ${h * .62}, ${w * .36} ${h + 60}`;
  let s = `<rect width="${w}" height="${h}" fill="#006478"/>`;
  s += `<path d="M${w * .66} -160 C${w * .3} ${h * .3}, ${w * .72} ${h * .62}, ${w * .36} ${h + 160} L${w + 160} ${h + 160} L${w + 160} -160 Z" fill="#4078BC" filter="url(#b30)"/>`;
  s += `<ellipse cx="${w * .2}" cy="${h * .4}" rx="${w * .35}" ry="${h * .3}" fill="#0A8FA0" opacity=".45" filter="url(#b80)"/>`;
  s += `<ellipse cx="${w * .82}" cy="${h * .6}" rx="${w * .35}" ry="${h * .3}" fill="#6C9BE0" opacity=".45" filter="url(#b80)"/>`;
  s += `<ellipse cx="${w / 2}" cy="${vy}" rx="${h * .4}" ry="${h * .4}" fill="#F0C078" opacity=".26" filter="url(#b80)"/>`;
  s += `<path d="${c}" stroke="#F0C078" stroke-width="16" fill="none" opacity=".35" filter="url(#b8)"/>`;
  s += `<path class="draw" pathLength="1" d="${c}" stroke="url(#gline)" stroke-width="4" fill="none" filter="url(#glow)"/>`;
  s += rays(w / 2, vy, 24, h, 0, 360, .1);
  s += bokeh(0, 0, w, h, 34, ['#FFF3CF', '#F0C078', '#7FD6DA']);
  s += `<rect width="${w}" height="${h * .22}" fill="url(#fadeTop)"/><rect y="${h * .78}" width="${w}" height="${h * .22}" fill="url(#fadeBot)"/>`;
  return svg(w, h, s);
}

// A glowing gold ribbon that crosses the seam between two sections
const seam = (seed0, flip) => { seed = seed0; const w = 1440, h = 220; const a = flip ? `M-20 150 C 380 40, 760 200, 1100 90 S 1400 60, 1460 110` : `M-20 80 C 300 190, 700 30, 1080 140 S 1380 160, 1460 70`; return `<svg class="seam" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" aria-hidden="true" focusable="false">${DEFS}<path d="${a}" stroke="#F0C078" stroke-width="14" fill="none" opacity=".28" filter="url(#b8)"/><path class="draw" pathLength="1" d="${a}" stroke="url(#gline)" stroke-width="3" fill="none" filter="url(#glow)"/><path class="draw" pathLength="1" d="${a.replace(/(\d+) /g, (m, n) => (+n + 16) + ' ')}" stroke="url(#gline)" stroke-width="1.4" fill="none" opacity=".6"/></svg>`; };

const GCAL = 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=' + encodeURIComponent('Golf & Games Classic: MARJCC vs. MBJCC') + '&dates=20270312/20270313&location=' + encodeURIComponent('Miami Beach Golf Club') + '&details=' + encodeURIComponent('Golf & Mahjong Tournament. Team MARJCC vs. Team MBJCC. More details coming soon!');

const hosts = `<div class="hosts"><img src="assets/marjcc-white.png" alt="MARJCC, Michael-Ann Russell JCC" width="120" height="75"><span class="hdiv" aria-hidden="true"></span><img class="mb" src="assets/mbjcc-white.png" alt="MBJCC, The Galbut Family Miami Beach JCC" width="185" height="64"></div>`;
const logoPic = (cls, lazy) => `<picture class="${cls}"><source srcset="assets/golf-games-classic-logo.webp" type="image/webp"><img src="assets/golf-games-classic-logo.png" alt="Golf &amp; Games Classic, MARJCC vs MBJCC" width="1600" height="1080"${lazy ? ' loading="lazy"' : ' fetchpriority="high"'}></picture>`;

const tiles = (list) => list.map(([ch, x, y, w, r, col, blur, z, d]) => `<div class="tile${blur ? ' far' : ''}" style="--x:${x}%;--y:${y}%;--w:${w};--r:${r}deg;--d:${d}s;color:${col};z-index:${z}" aria-hidden="true"><span>${ch}</span></div>`).join('');

const FONTS = `<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Limelight&family=Josefin+Sans:wght@600;700&family=Mulish:wght@400;600;700&family=Playfair+Display:ital,wght@1,700&family=Noto+Serif+TC:wght@900&display=swap">`;

const page = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>Golf &amp; Games Classic 2027 | MARJCC vs. MBJCC</title>
<meta name="description" content="Golf &amp; Mahjong Tournament. Two JCCs. One tournament. One friendly rivalry! Friday, March 12, 2027 at Miami Beach Golf Club.">
<meta name="theme-color" content="#00141F">
<meta property="og:type" content="website">
<meta property="og:title" content="Golf &amp; Games Classic 2027: MARJCC vs. MBJCC">
<meta property="og:description" content="Golf &amp; Mahjong Tournament. Friday, March 12, 2027. Miami Beach Golf Club. More details coming soon!">
<meta property="og:image" content="og-image.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="assets/favicon.png">
${FONTS}
<link rel="stylesheet" href="styles.css">
</head>
<body>
<a class="skip" href="#main">Skip to content</a>

<header class="top">${hosts}</header>

<main id="main">
<section class="hero" aria-labelledby="hero-title">
  <div class="bg" data-parallax="0.25">${hero(1440, 1100)}</div>
  <div class="hero-inner">
    <p class="eb">Save the date</p>
    <h1 id="hero-title" class="sr-only">Golf &amp; Games Classic</h1>
    ${logoPic('hero-logo', false)}
    <p class="date">March 12, 2027</p>
    <span class="hair" aria-hidden="true"></span>
    <p class="caps big">Golf &amp; Mahjong Tournament</p>
    <p class="caps aqua">Friday &middot; Miami Beach Golf Club</p>
    <div class="cta">
      <a class="btn btn-red" href="assets/golf-games-classic-2027.ics" download>Save the date</a>
      <a class="btn btn-ghost" href="${GCAL}" target="_blank" rel="noopener">Add to Google Calendar</a>
    </div>
  </div>
</section>

<section class="rivalry-intro" aria-labelledby="t-rivalry">
  <div class="bg" data-parallax="0.12">${night(1440, 1000, { seed: 9, gy: 420, waveY: 820 })}</div>
  <div class="inner reveal">
    <p class="eb">March 12, 2027</p>
    <h2 id="t-rivalry" class="disp xl">Two JCCs.</h2>
    <p class="disp lg goldtxt">One Tournament.</p>
    <p class="disp lg red">One Friendly Rivalry!</p>
    <p class="plaque">Team MARJCC <span class="vs">vs.</span> Team MBJCC</p>
  </div>
</section>

${seam(4, false)}

<section class="teams" aria-labelledby="t-teams">
  <div class="bg">${rivals(1440, 1000)}</div>
  <div class="inner">
    <h2 id="t-teams" class="disp lg reveal">Pick Your Team</h2>
    <div class="team-row">
      <div class="team reveal"><img src="assets/marjcc-white.png" alt="MARJCC" width="160" height="100" loading="lazy"><p class="caps">Team<br>MARJCC</p></div>
      <p class="vs big-vs reveal" aria-label="versus">vs.</p>
      <div class="team reveal"><img class="mb" src="assets/mbjcc-white.png" alt="MBJCC" width="230" height="80" loading="lazy"><p class="caps">Team<br>MBJCC</p></div>
    </div>
  </div>
</section>

${seam(8, true)}

<section class="games" aria-labelledby="t-games">
  <div class="bg">${night(1440, 1100, { seed: 14, gy: 480, waveY: 900, rayOp: .18 })}</div>
  ${tiles([['發', 4, 14, 0.75, -24, '#006868', 1, 1, 0], ['北', 88, 10, 0.7, 20, '#E02850', 1, 1, 1.2], ['白', 62, 6, 0.85, 4, '#002838', 1, 1, 2.1]])}
  <div class="inner">
    <div class="game reveal">
      <div class="ball" aria-hidden="true"></div>
      <h2 id="t-games" class="disp lg">Golf:</h2>
      <p class="disp md goldtxt">May the best team win!</p>
    </div>
    <div class="game reveal">
      <div class="tiles-hero" aria-hidden="true">${tiles([['中', 18, 0, 1.25, -12, '#E02850', 0, 3, .4], ['發', 54, 4, 1.25, 10, '#006868', 0, 3, 1.4]])}</div>
      <h2 class="disp lg">Mahjong:</h2>
      <p class="disp md red">Everyone plays together!</p>
    </div>
  </div>
</section>

${seam(12, false)}

<section class="details" aria-labelledby="t-details">
  <div class="bg">${night(1440, 1000, { seed: 31, gy: 380, waveY: 2000, rayOp: .12, bk: 26 })}</div>
  <div class="inner">
    <h2 id="t-details" class="disp lg reveal">Two communities.<br><span class="goldtxt">One unforgettable day!</span></h2>
    <div class="info">
      <article class="reveal"><h3 class="caps gold">Schedule</h3><span class="hair" aria-hidden="true"></span><p>More details coming soon!</p></article>
      <article class="reveal"><h3 class="caps gold">Registration</h3><span class="hair" aria-hidden="true"></span><p>More details coming soon!</p></article>
      <article class="reveal"><h3 class="caps gold">Sponsorship</h3><span class="hair" aria-hidden="true"></span><p>More details coming soon!</p></article>
    </div>
  </div>
</section>

<section class="signup" aria-labelledby="t-signup">
  <div class="bg">${hero(1440, 1100).replace('hero-scene', 'signup-scene')}</div>
  <div class="inner reveal">
    <h2 id="t-signup" class="disp lg">Stay in the loop</h2>
    <p class="lead">Be the first to hear when registration opens.</p>
    <!--
      TODO (Resend): this form has no backend yet. To collect emails, deploy a small
      serverless function (Netlify/Vercel) at /api/subscribe that calls
      POST https://api.resend.com/audiences/{AUDIENCE_ID}/contacts with the RESEND_API_KEY
      kept as a server environment variable (never in this page), then change
      form.js to fetch('/api/subscribe', {method:'POST', body: JSON.stringify({email})}).
    -->
    <form class="form" id="signup" novalidate>
      <label for="email" class="caps">Email</label>
      <div class="row">
        <input id="email" name="email" type="email" autocomplete="email" required placeholder="you@example.com">
        <button class="btn btn-red" type="submit">Keep me posted</button>
      </div>
      <p class="msg" id="signup-msg" role="status" aria-live="polite"></p>
    </form>
  </div>
</section>
</main>

<footer class="foot">
  <p class="caps small">Golf &amp; Games Classic &middot; Friday, March 12, 2027 &middot; Miami Beach Golf Club</p>
  <img class="gmjf" src="assets/gmjf-logo-white.png" alt="Greater Miami Jewish Federation" width="200" height="95">
</footer>
<script src="main.js" defer></script>
</body>
</html>
`;
fs.writeFileSync(__dirname + '/index.html', page);

// Open Graph image source (rendered to og-image.png by render.js)
const og = `<!doctype html><html><head><meta charset="utf-8">${FONTS}<link rel="stylesheet" href="styles.css">
<style>html,body{margin:0;width:1200px;height:630px;overflow:hidden;background:#00141F}
.og{position:relative;width:1200px;height:630px;overflow:hidden}.og .scene{position:absolute;inset:0;width:100%;height:100%}
.og .hosts{position:absolute;top:26px;left:0;right:0;justify-content:center}.og .hosts img{height:54px}.og .hosts img.mb{height:42px}
.og .c{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:30px 0 40px}
.og .c img{width:560px;height:auto;filter:drop-shadow(0 18px 40px rgba(0,20,31,.45)) drop-shadow(0 0 40px rgba(255,214,150,.35))}
.og .date{font-size:66px;margin-top:8px}.og .caps{font-size:22px;letter-spacing:.24em;margin-top:6px}
.og *{animation:none!important}.og .draw{stroke-dasharray:none!important}</style></head><body>
<div class="og">${hero(1200, 630)}${hosts}<div class="c"><img src="assets/golf-games-classic-logo.png" alt=""><p class="date">March 12, 2027</p><p class="caps aqua">Miami Beach Golf Club</p></div><img src="assets/gmjf-logo-white.png" alt="" style="position:absolute;bottom:14px;left:50%;transform:translateX(-50%);height:40px"></div></body></html>`;
fs.writeFileSync(__dirname + '/og.html', og);
console.log('wrote index.html, og.html');
