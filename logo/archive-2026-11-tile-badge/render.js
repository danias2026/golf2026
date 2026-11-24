const { chromium } = require('playwright');
(async()=>{
  const b=await chromium.launch(); const p=await b.newPage({viewport:{width:1600,height:1080},deviceScaleFactor:Number(process.argv[3]||1)});
  await p.goto('file://'+__dirname+'/logo.html'); await p.waitForFunction(()=>window.__ready); await p.waitForTimeout(300);
  const bb=await p.evaluate(()=>['golf','amp','games','classic'].map(i=>{const r=document.getElementById(i).getBBox();return i+':'+Math.round(r.x)+'-'+Math.round(r.x+r.width)}));
  console.log(bb.join(' '));
  await p.locator('#logo').screenshot({path:process.argv[2]||'check.png',omitBackground:true});
  await b.close();
})();
