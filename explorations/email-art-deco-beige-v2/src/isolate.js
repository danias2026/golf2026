const { chromium } = require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1600,height:1080},deviceScaleFactor:2});
await p.goto('file:///home/user/golf2026/logo/logo.html');await p.waitForFunction(()=>window.__ready);await p.waitForTimeout(400);
const shots={ball:['.ball','path.navy'],tile:['.tile'],tiles:['.cards']};
for(const [name,keep] of Object.entries(shots)){
  await p.evaluate((keep)=>{const svg=document.getElementById('logo');[...svg.children].forEach(el=>{if(el.tagName==='defs')return;el.style.visibility=keep.some(k=>el.matches(k))?'visible':'hidden';});},keep);
  const box=await p.evaluate((keep)=>{let r=null;keep.forEach(k=>document.querySelectorAll('#logo '+k).forEach(el=>{const b=el.getBoundingClientRect();r=r?{x:Math.min(r.x,b.x),y:Math.min(r.y,b.y),r:Math.max(r.r,b.right),b:Math.max(r.b,b.bottom)}:{x:b.x,y:b.y,r:b.right,b:b.bottom};}));return r;},keep);
  await p.screenshot({path:__dirname+'/'+name+'.png',omitBackground:true,clip:{x:box.x-6,y:box.y-6,width:box.r-box.x+12,height:box.b-box.y+12}});
}
await b.close();})();
