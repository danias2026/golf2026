const { chromium } = require('playwright');
(async()=>{const b=await chromium.launch();
for(const [w,f] of [[680,'preview.png'],[390,'preview-mobile.png']]){const p=await b.newPage({viewport:{width:w,height:900},deviceScaleFactor:1});
await p.goto('file://'+__dirname+'/index.html');await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(500);
await p.screenshot({path:__dirname+'/'+f,fullPage:true});await p.close();}
await b.close();})();
