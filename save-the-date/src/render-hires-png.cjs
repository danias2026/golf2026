// High-res renders that keep every effect (photo fade, gold sheen) exactly as on screen.
// The PDFs simply hold a high-quality JPEG of the render, so they look identical to the PNGs.
// Outputs: save-the-date-flyer-hires.png/.pdf (3600x5895, 12.5x20.5 in) and save-the-date-flyer-letter.png/.pdf (2550x3300, 8.5x11 in, 300 dpi).
const { chromium } = require('playwright');
const fs = require('fs');
const out = (f) => __dirname + '/../' + f;
const jobs = [
  { html: 'flyer.html', w: 1200, h: 1965, scale: 3, base: 'save-the-date-flyer-hires' },
  { html: 'letter.html', w: 816, h: 1056, scale: 300 / 96, base: 'save-the-date-flyer-letter' },
];
(async () => {
  const b = await chromium.launch();
  for (const j of jobs) {
    const p = await b.newPage({ viewport: { width: j.w, height: j.h }, deviceScaleFactor: j.scale });
    await p.goto('file://' + __dirname + '/' + j.html); await p.waitForFunction(() => window.__ready); await p.waitForTimeout(800);
    await p.locator('#piece').screenshot({ path: out(j.base + '.png') });
    await p.locator('#piece').screenshot({ path: __dirname + '/_print.jpg', type: 'jpeg', quality: 95 });
    await p.close();
    const wrap = __dirname + '/_wrap.html';
    fs.writeFileSync(wrap, `<html><head><style>@page{size:${j.w}px ${j.h}px;margin:0}html,body{margin:0}</style></head><body><img src="_print.jpg" style="display:block;width:${j.w}px;height:${j.h}px"></body></html>`);
    const q = await b.newPage({ viewport: { width: j.w, height: j.h } });
    await q.goto('file://' + wrap); await q.waitForFunction(() => [...document.images].every(i => i.complete && i.naturalWidth));
    await q.pdf({ path: out(j.base + '.pdf'), width: j.w + 'px', height: j.h + 'px', printBackground: true, pageRanges: '1' });
    await q.close(); fs.unlinkSync(wrap); fs.unlinkSync(__dirname + '/_print.jpg');
  }
  await b.close();
})();
