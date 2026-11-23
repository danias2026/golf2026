// Renders the previews and the Open Graph image. Usage: node render.js
const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const b = await chromium.launch();
  const url = 'file://' + path.join(__dirname, 'index.html');
  const settle = async (p) => {
    await p.goto(url, { waitUntil: 'load' });
    await p.evaluate(() => document.fonts.ready);
    // show the finished state: lines drawn, sections revealed
    await p.addStyleTag({ content: '*{animation-delay:-60s!important;animation-play-state:running!important;transition:none!important}.js .reveal{opacity:1!important;transform:none!important}.js .divider .draw{stroke-dashoffset:0!important}.js .divider .fan path{transform:scale(1)!important}' });
    await p.waitForTimeout(600);
  };
  for (const [name, w, h] of [['preview-desktop', 1440, 900], ['preview-mobile', 390, 844]]) {
    const p = await b.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
    await settle(p);
    await p.screenshot({ path: path.join(__dirname, name + '.png'), fullPage: true });
    await p.close();
  }
  const og = await b.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  await og.goto('file://' + path.join(__dirname, 'og.html'), { waitUntil: 'load' });
  await og.evaluate(() => document.fonts.ready);
  await og.waitForTimeout(400);
  await og.screenshot({ path: path.join(__dirname, 'og-image.png') });
  await b.close();
  console.log('rendered previews and og-image.png');
})();
