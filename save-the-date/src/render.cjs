// Renders the save-the-date pieces. Swap the photo by replacing ../assets/event-photo.jpg.
const { chromium } = require('playwright');
const out = (f) => __dirname + '/../' + f;
(async () => {
  const b = await chromium.launch();
  for (const [file, w, h, png] of [['flyer.html', 1200, 1965, 'save-the-date-flyer.png'], ['square.html', 1080, 1350, 'save-the-date-1080x1350.png']]) {
    const p = await b.newPage({ viewport: { width: w, height: h } });
    await p.goto('file://' + __dirname + '/' + file); await p.waitForFunction(() => window.__ready); await p.waitForTimeout(500);
    await p.locator('#piece').screenshot({ path: out(png) }); await p.close();
  }
  const p = await b.newPage({ viewport: { width: 816, height: 1056 } });
  await p.goto('file://' + __dirname + '/letter.html'); await p.waitForFunction(() => window.__ready); await p.waitForTimeout(500);
  await p.pdf({ path: out('save-the-date-flyer-letter.pdf'), width: '8.5in', height: '11in', printBackground: true, pageRanges: '1' });
  await p.screenshot({ path: '/tmp/claude-0/-home-user-golf2026/5f6b10c1-f89f-5b0b-8da6-8bd032f87899/scratchpad/letter-check.png' });
  await b.close();
})();
