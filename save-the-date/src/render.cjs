// Renders the save-the-date pieces. Swap the photo by replacing ../assets/event-photo.jpg.
const { chromium } = require('playwright');
const out = (f) => __dirname + '/../' + f;
// Gradient-clipped text renders with stray lines in PDFs; print the gold in solid #DEC000 there.
const PDF_TEXT_FIX = '.goldg{background:none!important;-webkit-background-clip:border-box!important;background-clip:border-box!important;color:#DEC000!important}';

(async () => {
  const b = await chromium.launch();
  for (const [file, w, h, png] of [['flyer.html', 1200, 1965, 'save-the-date-flyer.png'], ['square.html', 1080, 1350, 'save-the-date-1080x1350.png']]) {
    const p = await b.newPage({ viewport: { width: w, height: h } });
    await p.goto('file://' + __dirname + '/' + file); await p.waitForFunction(() => window.__ready); await p.waitForTimeout(500);
    await p.locator('#piece').screenshot({ path: out(png) }); await p.close();
  }
  // PDFs and high-res PNGs come from render-hires-png.cjs (keeps the photo fade).
  await b.close();
})();
