// Renders the email hero images into ../assets. Swap the photo by replacing assets/event-photo.jpg here.
const { chromium } = require('playwright');
const fs = require('fs');
(async () => {
  const b = await chromium.launch();
  for (const [hash, out] of [['', 'hero-save-the-date.jpg'], ['#reminder', 'hero-reminder.jpg']]) {
    const p = await b.newPage({ viewport: { width: 1200, height: 1965 } });
    await p.goto('file://' + __dirname + '/hero.html' + hash); await p.waitForFunction(() => window.__ready); await p.waitForTimeout(500);
    await p.screenshot({ path: __dirname + '/../assets/' + out, clip: { x: 0, y: 0, width: 1200, height: 1668 }, type: 'jpeg', quality: 86 }); await p.close();
  }
  fs.copyFileSync(__dirname + '/assets/gmjf-logo-white.png', __dirname + '/../assets/gmjf-logo-white.png');
  await b.close();
})();
