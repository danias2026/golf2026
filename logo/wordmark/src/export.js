const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
const D = path.resolve(__dirname, '..'); const felt = require('./felt');
const svgs = ['golf-games-classic-wordmark','golf-games-classic-wordmark-white','golf-games-classic-wordmark-gold','golf-games-classic-wordmark-kicker','golf-games-classic-wordmark-kicker-white'];
const dims = f => { const m = /viewBox="([-\d.]+) ([-\d.]+) ([-\d.]+) ([-\d.]+)"/.exec(fs.readFileSync(path.join(D,f+'.svg'),'utf8')); return [+m[3], +m[4]]; };
(async () => {
  const b = await chromium.launch();
  for (const n of svgs) {
    const [vw, vh] = dims(n); const W = 4000, H = Math.round(W * vh / vw);
    const p = await b.newPage({ viewport: { width: W, height: H } });
    const hf=path.join(__dirname,'_tmp.html'); fs.writeFileSync(hf,`<html><body style="margin:0;background:transparent"><img src="file://${D}/${n}.svg" style="display:block;width:${W}px;height:${H}px"></body></html>`); await p.goto('file://'+hf);
    await p.waitForTimeout(300);
    await p.screenshot({ path: path.join(D, n + '.png'), omitBackground: true, clip: { x: 0, y: 0, width: W, height: H } });
    if (!n.includes('white')) await p.pdf({ path: path.join(D, n + '.pdf'), width: (vw/1000*2)+'in', height: (vh/1000*2)+'in', printBackground: false, pageRanges: '1' });
    await p.close();
  }
  // on felt (JPG) and Instagram avatar
  const [vw, vh] = dims('golf-games-classic-wordmark-kicker');
  const page = async (w, h, inner, out, fmt) => { const p = await b.newPage({ viewport: { width: w, height: h } });
    const hf=path.join(__dirname,'_tmp.html'); fs.writeFileSync(hf,`<html><body style="margin:0"><div style="position:relative;width:${w}px;height:${h}px;overflow:hidden">${felt(w,h,3)}${inner}</div></body></html>`); await p.goto('file://'+hf);
    await p.waitForTimeout(300); await p.screenshot({ path: path.join(D, out), type: fmt, quality: fmt==='jpeg'?92:undefined }); await p.close(); };
  const fw = 3000, fh = 1600, lw = 2400;
  await page(fw, fh, `<div style="position:absolute;inset:60px;border:6px solid #D8C012"></div><img src="file://${D}/golf-games-classic-wordmark-kicker.svg" style="position:absolute;left:${(fw-lw)/2}px;top:${(fh-lw*vh/vw)/2}px;width:${lw}px">`, 'golf-games-classic-wordmark-on-felt.jpg', 'jpeg');
  const [aw, ah] = dims('golf-games-classic-wordmark'); const al = 900;
  await page(1080, 1080, `<div style="position:absolute;left:30px;top:30px;width:1020px;height:1020px;border-radius:50%;border:5px solid #D8C012;box-sizing:border-box"></div><div style="position:absolute;left:50px;top:50px;width:980px;height:980px;border-radius:50%;border:2px solid #D8C012;box-sizing:border-box;opacity:.6"></div><img src="file://${D}/golf-games-classic-wordmark.svg" style="position:absolute;left:${(1080-al)/2}px;top:${(1080-al*ah/aw)/2}px;width:${al}px">`, 'instagram-avatar-1080.png', 'png');
  await b.close(); try{fs.unlinkSync(path.join(__dirname,'_tmp.html'))}catch(e){}
})();
