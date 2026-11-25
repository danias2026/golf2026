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
  // High-res PDF of the main 1200 x 1965 flyer: 12.5 x 20.47 in, vector text, felt at print resolution.
  const pf = await b.newPage({ viewport: { width: 1200, height: 1965 } });
  await pf.goto('file://' + __dirname + '/flyer.html'); await pf.waitForFunction(() => window.__ready); await pf.waitForTimeout(500);
  // Bake the felt texture into a 300 dpi JPEG so the PDF stays small (vector text stays vector).
  const fp = await b.newPage({ viewport: { width: 1200, height: 1965 }, deviceScaleFactor: 300 / 96 });
  await fp.goto('file://' + __dirname + '/flyer.html'); await fp.waitForFunction(() => window.__ready);
  await fp.evaluate(() => { document.querySelectorAll('#piece > :not(svg.felt)').forEach(e => e.style.visibility = 'hidden'); });
  await fp.waitForTimeout(300);
  const feltJpg = __dirname + '/../assets/felt-flyer-300dpi.jpg';
  await fp.locator('#piece').screenshot({ path: feltJpg, type: 'jpeg', quality: 90 }); await fp.close();
  await pf.evaluate((src) => { const f = document.querySelector('#piece svg.felt'); const img = document.createElement('img');
    img.src = src; img.style.cssText = 'position:absolute;inset:0;width:100%;height:100%'; f.replaceWith(img); }, 'file://' + feltJpg);
  await pf.waitForFunction(() => [...document.images].every(i => i.complete)); await pf.waitForTimeout(300);
  await pf.addStyleTag({ content: '@page{size:1200px 1965px;margin:0}html,body{margin:0}' + PDF_TEXT_FIX });
  await pf.pdf({ path: out('save-the-date-flyer-hires.pdf'), width: '1200px', height: '1965px', printBackground: true, pageRanges: '1' });
  await pf.close();
  const p = await b.newPage({ viewport: { width: 816, height: 1056 } });
  await p.goto('file://' + __dirname + '/letter.html'); await p.waitForFunction(() => window.__ready); await p.waitForTimeout(500);
  await p.addStyleTag({ content: PDF_TEXT_FIX });
  await p.pdf({ path: out('save-the-date-flyer-letter.pdf'), width: '8.5in', height: '11in', printBackground: true, pageRanges: '1' });
  await p.screenshot({ path: '/tmp/claude-0/-home-user-golf2026/5f6b10c1-f89f-5b0b-8da6-8bd032f87899/scratchpad/letter-check.png' });
  await b.close();
})();
