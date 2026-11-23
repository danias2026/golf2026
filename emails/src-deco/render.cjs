// Renders the email images into ../assets/ (inner pieces are 1076px wide = 538px inside the HTML frame).
const { chromium } = require('playwright');
(async()=>{const b=await chromium.launch();
const out=n=>__dirname+'/../assets/'+n+'.png';
for(const v of ['save-the-date','reminder']){
  const p=await b.newPage({viewport:{width:1200,height:1600}});
  await p.goto('file://'+__dirname+'/parts.html'+(v==='reminder'?'#reminder':''));await p.waitForFunction(()=>window.__ready);await p.waitForTimeout(400);
  const box=async id=>p.locator('#'+id).boundingBox();
  const t=await box('top');
  await p.screenshot({fullPage:true,path:out('hero-'+v),clip:{x:t.x+62,y:t.y+214,width:1076,height:t.height-214}});
  if(v==='save-the-date'){
    await p.screenshot({fullPage:true,path:out('band'),clip:{x:t.x,y:t.y,width:1200,height:214}});
    for(const id of ['fan','plaque','cards','closing']){const bb=await box(id);await p.screenshot({fullPage:true,path:out(id),clip:{x:bb.x+62,y:bb.y,width:1076,height:bb.height}});}
    await p.locator('#waves').screenshot({path:out('waves')});
  }
  await p.close();
}
await b.close();})();
