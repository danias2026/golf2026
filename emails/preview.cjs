const { chromium } = require('playwright');
const fs = require('fs');
(async () => {
  const b = await chromium.launch();
  for (const t of ['save-the-date', 'reminder']) {
    const html = fs.readFileSync(`${__dirname}/${t}/index.html`, 'utf8').replaceAll('{{ASSET_BASE_URL}}', 'file://' + __dirname + '/assets');
    fs.writeFileSync(`/tmp/claude-0/-home-user-golf2026/5f6b10c1-f89f-5b0b-8da6-8bd032f87899/scratchpad/email-${t}.html`, html);
    const p = await b.newPage({ viewport: { width: 680, height: 900 }, deviceScaleFactor: 1 });
    await p.goto(`file:///tmp/claude-0/-home-user-golf2026/5f6b10c1-f89f-5b0b-8da6-8bd032f87899/scratchpad/email-${t}.html`);
    await p.waitForTimeout(300);
    await p.screenshot({ path: `${__dirname}/${t}/preview.png`, fullPage: true });
    const m = await b.newPage({ viewport: { width: 390, height: 800 } });
    await m.goto(`file:///tmp/claude-0/-home-user-golf2026/5f6b10c1-f89f-5b0b-8da6-8bd032f87899/scratchpad/email-${t}.html`);
    await m.waitForTimeout(300);
    await m.screenshot({ path: `${__dirname}/${t}/preview-mobile.png`, fullPage: true });
  }
  await b.close();
})();
