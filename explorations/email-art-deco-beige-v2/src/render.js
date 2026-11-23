const { chromium } = require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1200,height:1600}});
await p.goto('file://'+__dirname+'/parts.html');await p.waitForFunction(()=>window.__ready);await p.waitForTimeout(400);
for(const id of ['top','fan','plaque','cards','closing','waves']) await p.locator('#'+id).screenshot({path:__dirname+'/../images/'+id+'.png'});
await b.close();})();
