const { chromium } = require('playwright');
// Inner pieces are cropped to x 62..1138 (1076px = 538 at 1x) to sit inside the HTML frame.
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1200,height:1600}});
await p.goto('file://'+__dirname+'/parts.html');await p.waitForFunction(()=>window.__ready);await p.waitForTimeout(400);
const box=async id=>p.locator('#'+id).boundingBox();
const out=n=>__dirname+'/../images/'+n+'.png';
const t=await box('top');
await p.screenshot({fullPage:true,path:out('band'),clip:{x:t.x,y:t.y,width:1200,height:214}});
await p.screenshot({fullPage:true,path:out('hero'),clip:{x:t.x+62,y:t.y+214,width:1076,height:t.height-214}});
for(const id of ['fan','plaque','cards','closing']){const bb=await box(id);await p.screenshot({fullPage:true,path:out(id),clip:{x:bb.x+62,y:bb.y,width:1076,height:bb.height}});}
await p.locator('#waves').screenshot({path:out('waves')});
await b.close();})();
