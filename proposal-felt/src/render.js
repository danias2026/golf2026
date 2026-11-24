const { chromium } = require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1200,height:1965}});
await p.goto('file://'+__dirname+'/flyer.html');await p.waitForFunction(()=>window.__ready);await p.waitForTimeout(600);
await p.locator('#flyer').screenshot({path:__dirname+'/../save-the-date-flyer.png'});
await p.screenshot({path:__dirname+'/../email/images/hero.png',clip:{x:0,y:0,width:1200,height:1668}});
await b.close();})();
