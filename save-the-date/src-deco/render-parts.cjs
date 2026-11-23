// High-res (3x) parts from the shared email sources, for print and social.
const { chromium } = require('playwright');
const SRC = __dirname + '/../../emails/src-deco/parts.html';
(async()=>{const b=await chromium.launch();
const p=await b.newPage({viewport:{width:1200,height:1600},deviceScaleFactor:3});
await p.goto('file://'+SRC);await p.waitForFunction(()=>window.__ready);await p.waitForTimeout(500);
const box=async id=>p.locator('#'+id).boundingBox();
const out=n=>__dirname+'/parts/'+n+'.png';
const t=await box('top');
await p.screenshot({fullPage:true,path:out('band'),clip:{x:t.x,y:t.y,width:1200,height:214}});
await p.screenshot({fullPage:true,path:out('hero'),clip:{x:t.x+62,y:t.y+214,width:1076,height:t.height-214}});
const c=await box('cards');
await p.screenshot({fullPage:true,path:out('card-golf'),clip:{x:c.x+126,y:c.y+26,width:448,height:708}});
await p.screenshot({fullPage:true,path:out('card-mahjong'),clip:{x:c.x+626,y:c.y+26,width:448,height:708}});
for(const id of ['fan','plaque','closing']){const bb=await box(id);await p.screenshot({fullPage:true,path:out(id),clip:{x:bb.x+62,y:bb.y,width:1076,height:bb.height}});}
await p.locator('#waves').screenshot({path:out('waves')});
await b.close();})();
