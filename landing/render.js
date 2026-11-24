// Renders the previews, the Open Graph image and the favicon. Usage: node render.js
// Swap the photo by replacing assets/event-photo.jpg (same name).
const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const b = await chromium.launch();
  const url = 'file://' + path.join(__dirname, 'index.html');
  for (const [name, w, h] of [['preview-desktop', 1440, 900], ['preview-mobile', 390, 844]]) {
    const p = await b.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 1, reducedMotion: 'reduce' });
    await p.goto(url, { waitUntil: 'load' }); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(500);
    await p.screenshot({ path: path.join(__dirname, name + '.png'), fullPage: true }); await p.close();
  }
  const og = await b.newPage({ viewport: { width: 1200, height: 630 } });
  await og.goto('file://' + path.join(__dirname, 'og.html'), { waitUntil: 'load' }); await og.evaluate(() => document.fonts.ready); await og.waitForTimeout(400);
  await og.screenshot({ path: path.join(__dirname, 'og-image.png') });
  const fav = await b.newPage({ viewport: { width: 128, height: 128 } });
  await fav.setContent(`<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Playfair+Display&display=swap"><body style="margin:0"><div style="width:128px;height:128px;background:radial-gradient(#555C4F,#343A34);border:6px solid #D8C012;box-sizing:border-box;display:grid;place-items:center;font:96px 'Playfair Display',serif;color:#DEC000;line-height:1"><span style="position:relative;top:4px">&amp;</span></div></body>`);
  await fav.evaluate(() => document.fonts.ready); await fav.waitForTimeout(300);
  await fav.screenshot({ path: path.join(__dirname, 'assets/favicon.png') });
  await b.close();
  console.log('rendered previews, og-image.png and favicon.png');
})();
