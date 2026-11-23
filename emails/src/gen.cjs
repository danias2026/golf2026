// Email image sections in the Instagram master look, 1200 px wide (shown at 600).
// Each section melts into the email's navy (#00141F) at its edges so live HTML text sits between them seamlessly.
const path=require('path');const {chromium}=require('playwright');
const H=require('../../save-the-date/src/ig.js');
const {sunset,night,svg,hosts,LOGO,tiles}=H;
const NAVY='#00141F', W=1200;
const fade=(h,top,bottom)=>svg(W,h,`<defs><linearGradient id="ft" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${NAVY}"/><stop offset="1" stop-color="${NAVY}" stop-opacity="0"/></linearGradient><linearGradient id="fb" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${NAVY}" stop-opacity="0"/><stop offset="1" stop-color="${NAVY}"/></linearGradient></defs>`
 +(top?`<rect width="${W}" height="${top}" fill="url(#ft)"/>`:'')+(bottom?`<rect y="${h-bottom}" width="${W}" height="${bottom}" fill="url(#fb)"/>`:''));
const sections=[];
const add=(name,h,body)=>{H.page(path.join(__dirname,name+'.html'),W,h,body);sections.push({name,h})};

const hero=(title,size=130)=>`
${sunset(W,1240,900,600,560,150,{seed:21,waveY:1010})}
${fade(1240,0,170)}
${hosts(60)}
<div class="col" style="top:190px;gap:0;z-index:14">
 <div class="disp" style="font-size:${size}px;line-height:1">${title}</div>
 <div class="logo" style="width:860px;margin-top:24px"><img src="${LOGO}" alt=""></div>
 <div class="date" style="font-size:96px;margin-top:30px">March 12, 2027</div>
</div>`;
add('hero-save-the-date',1240,hero('Save the Date'));
add('hero-reminder',1240,hero('Mark Your Calendar',98));

add('games',760,`
${night(W,760,{seed:14,gy:360,rayOp:.18,waveY:600,bk:30})}
<div class="ball" style="width:300px;height:300px;left:150px;top:200px"></div>
${tiles([['中',760,190,190,-12,'#E02850',0,4],['發',930,250,170,12,'#006868',0,4],['白',1080,120,110,18,'#002838',4,3],['北',690,90,100,-20,'#E02850',4,3]])}
<div class="col" style="top:540px;left:0;right:600px"><div class="disp" style="font-size:96px">Golf</div></div>
<div class="col" style="top:540px;left:600px;right:0"><div class="disp" style="font-size:96px">Mahjong</div></div>
${fade(760,110,130)}`);

add('closing',360,`
${night(W,360,{seed:5,gy:160,rayOp:.12,waveY:170,bk:18})}
${fade(360,120,40)}`);

(async()=>{const b=await chromium.launch();
 for(const s of sections){const p=await b.newPage({viewport:{width:W,height:s.h},deviceScaleFactor:1});
  await p.goto('file://'+path.join(__dirname,s.name+'.html'),{waitUntil:'networkidle'});await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(300);
  await p.screenshot({path:path.join(__dirname,'..','assets',s.name+'.jpg'),type:'jpeg',quality:84});await p.close()}
 await b.close()})();
