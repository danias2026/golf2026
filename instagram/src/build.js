const fs=require('fs'),path=require('path');
const A='../../brand/assets/',LOGO='../../logo/golf-games-classic-logo.png';
const FONTS='<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Limelight&family=Josefin+Sans:wght@600;700&family=Mulish:wght@400;600;700&family=Playfair+Display:ital,wght@1,700&family=Noto+Serif+TC:wght@900&display=swap">';
const M=A+'mono/';
const hosts=(white,top,s=1)=>`<div class="hosts ${white?'w':'t'}" style="top:${top}px;transform:scale(${s})"><img class="mar" src="${M}marjcc-${white?'white':'teal'}.png" alt="MARJCC"><span class="div"></span><img class="mb" src="${M}mbjcc-${white?'white':'teal'}.png" alt="MBJCC"></div>`;
const gmjf=(night,bottom)=>`<div class="gmjf" style="bottom:${bottom}px"><img src="${A}gmjf-logo-${night?'white':'black'}.png" alt="Greater Miami Jewish Federation"></div>`;
const plaque=(t1,t2,size=40)=>`<span class="plaque-f"><span class="plaque" style="font-size:${size}px">${t1} <span class="vs">vs.</span> ${t2}</span></span>`;
const P=[]; // {dir,name,w,h,cls,body}
// ---------- POSTS 1080x1350 ----------
const post=(name,cls,body)=>P.push({dir:'posts',name,w:1080,h:1350,cls,body});
// post footer: GMJF bottom 52, waves above
post('01-save-the-date','day',`
<div class="frame"></div>
${hosts(false,66)}
<div class="col" style="top:205px;gap:22px">
 <div class="eb">Save the date</div>
 <img src="${LOGO}" style="width:860px" alt="Golf & Games Classic">
 <div class="date">March 12, 2027</div>
 <div class="rule" style="width:620px"></div>
 <div class="caps" style="font-size:34px">Golf &amp; Mahjong Tournament</div>
 <div class="caps teal" style="font-size:26px;letter-spacing:.2em">Miami Beach Golf Club</div>
</div>
${gmjf(false,62)}`);
post('02-friendly-rivalry','night',`
<div class="frame"></div>
${hosts(true,66)}
<div class="col" style="top:240px;gap:30px">
 <div class="eb">March 12, 2027</div>
 <div class="disp" style="font-size:96px">Two JCCs.<br><span class="gold">One Tournament.</span><br><span class="red">One Friendly<br>Rivalry!</span></div>
 <div class="rule" style="width:640px;margin-top:10px"></div>
 ${plaque('Team MARJCC','Team MBJCC',34)}
</div>
${gmjf(true,62)}`);
post('03-golf','day',`
<div class="sunset" style="position:absolute;left:0;right:0;top:0;height:660px"></div>
<div class="sun" style="width:300px;height:300px;left:640px;top:330px"></div>
<div class="waves" style="top:570px"></div>
<div class="ball" style="width:250px;height:250px;left:180px;top:250px"></div>
<div class="tee" style="width:120px;height:150px;left:245px;top:490px"></div>
<div class="frame"></div>
${hosts(true,66)}
<div class="col" style="top:690px;gap:14px">
 <div class="eb">Golf &amp; Games Classic</div>
 <div class="disp" style="font-size:124px">Golf:</div>
 <div class="disp teal" style="font-size:78px">May the best team win!</div>
 <div class="caps" style="font-size:30px;letter-spacing:.14em">March 12, 2027 &middot; Miami Beach Golf Club</div>
</div>
${gmjf(false,50)}`);
post('04-mahjong','night',`
<div class="frame"></div>
${hosts(true,66)}
<div class="tile" style="width:220px;height:280px;left:235px;top:225px;font-size:170px;transform:rotate(-10deg)">中</div>
<div class="tile" style="width:220px;height:280px;left:620px;top:225px;font-size:150px;transform:rotate(9deg);color:var(--teal)">發</div>
<div class="col" style="top:560px;gap:16px">
 <div class="eb">Golf &amp; Games Classic</div>
 <div class="disp" style="font-size:140px">Mahjong:</div>
 <div class="disp red" style="font-size:72px">Everyone plays together!</div>
 <div class="caps" style="font-size:30px;letter-spacing:.14em">March 12, 2027 &middot; Miami Beach Golf Club</div>
</div>
${gmjf(true,50)}`);
const split=(h,top)=>`<div style="position:absolute;left:0;top:0;bottom:0;width:50%;background:var(--tm)"></div><div style="position:absolute;right:0;top:0;bottom:0;width:50%;background:var(--tb)"></div>`;
const teamHalf=(x,w,top,label,img,ih)=>`<div class="col" style="left:${x}px;right:auto;width:${w}px;top:${top}px;gap:26px">
 <img src="${A}mono/${img}" style="height:${ih}px;display:block" alt="">
 <div class="caps" style="color:#fff;font-size:56px;line-height:1.1">${label}</div></div>`;
post('05-pick-your-team','day',`
${split()}
<div style="position:absolute;left:0;right:0;bottom:0;height:200px;background:var(--cream)"></div>
<div class="frame"></div>
<div class="col" style="top:110px;gap:16px"><div class="eb" style="color:var(--gold)">March 12, 2027</div><div class="disp" style="font-size:104px;color:#fff">Pick Your Team</div></div>
${teamHalf(0,540,420,'Team<br>MARJCC','marjcc-white.png',150)}
${teamHalf(540,540,440,'Team<br>MBJCC','mbjcc-white.png',100)}
<div style="position:absolute;left:470px;top:880px;width:140px;height:140px;border-radius:50%;background:var(--cream2);border:5px solid var(--golddk);display:flex;align-items:center;justify-content:center"><span class="vs" style="font-size:72px">vs.</span></div>
<div class="col" style="top:1070px"><div class="caps" style="color:#fff;font-size:30px;letter-spacing:.14em">Golf &amp; Mahjong &middot; Miami Beach Golf Club</div></div>
${gmjf(false,62)}`);
// carousel
post('carousel-1','night',`
<div class="frame"></div>
${hosts(true,66)}
<div class="col" style="top:205px;gap:24px">
 <div class="eb">Save the date</div>
 <img src="${LOGO}" style="width:880px">
 <div class="date gold">March 12, 2027</div>
 <div class="caps" style="font-size:32px">Golf &amp; Mahjong Tournament</div>
</div>
<div class="arrow" style="bottom:170px">Swipe &rarr;</div>
${gmjf(true,62)}`);
post('carousel-2','day',`
<div class="frame"></div>
${hosts(false,66)}
<div style="position:absolute;left:70px;right:70px;top:210px;height:800px;display:grid;grid-template-columns:1fr 1fr;gap:28px">
 <div style="background:var(--navy);color:var(--cream);position:relative;overflow:hidden;display:flex;flex-direction:column;align-items:center;text-align:center;padding:290px 28px 0;gap:18px">
  <div class="ball" style="width:190px;height:190px;left:126px;top:60px"></div>
  <div class="disp" style="font-size:88px">Golf</div>
  <div class="caps" style="font-size:36px;color:var(--gold);line-height:1.25">May the best team win!</div>
 </div>
 <div style="background:var(--teal);color:var(--cream);position:relative;overflow:hidden;display:flex;flex-direction:column;align-items:center;text-align:center;padding:290px 28px 0;gap:18px">
  <div class="tile" style="width:170px;height:215px;left:136px;top:60px;font-size:130px;box-shadow:14px 14px 0 var(--navy)">中</div>
  <div class="disp" style="font-size:88px">Mahjong</div>
  <div class="caps" style="font-size:36px;color:var(--sun);line-height:1.25">Everyone plays together!</div>
 </div>
</div>
<div class="col" style="top:1045px"><div class="caps" style="font-size:30px;letter-spacing:.12em">Two communities. One unforgettable day!</div></div>
<div class="arrow" style="bottom:170px">Swipe &rarr;</div>
${gmjf(false,62)}`);
post('carousel-3','night',`
<div class="frame"></div>
${hosts(true,66)}
<div class="col" style="top:250px;gap:28px">
 <div class="eb">March 12, 2027</div>
 <div class="disp" style="font-size:122px">More details<br><span class="gold">coming soon!</span></div>
 <div class="rule" style="width:620px"></div>
 <div class="caps" style="font-size:36px;letter-spacing:.16em">Miami Beach Golf Club</div>
 ${plaque('Team MARJCC','Team MBJCC',30)}
</div>
${gmjf(true,62)}`);
// ---------- STORIES 1080x1920 (safe 250..1580) ----------
const story=(name,cls,body)=>P.push({dir:'stories',name,w:1080,h:1920,cls,body});
story('01-save-the-date','night',`
<div class="sunset" style="position:absolute;left:0;right:0;bottom:0;height:340px"></div>
<div class="waves" style="bottom:0;height:150px;background-size:120px 90px,120px 150px"></div>
${hosts(true,272)}
<div class="col" style="top:420px;gap:26px">
 <div class="eb" style="font-size:36px">Save the date</div>
 <img src="${LOGO}" style="width:960px">
 <div class="date gold" style="font-size:96px">March 12, 2027</div>
 <div class="rule" style="width:700px"></div>
 <div class="caps" style="font-size:38px">Golf &amp; Mahjong Tournament</div>
 <div class="caps" style="font-size:30px;letter-spacing:.2em;color:#4FC3C9">Miami Beach Golf Club</div>
</div>
${gmjf(true,360)}`);
story('02-mark-your-calendar','day',`
<div class="waves" style="bottom:0;height:150px;background-size:120px 90px,120px 150px"></div>
${hosts(false,272)}
<div class="col" style="top:420px;gap:30px">
 <div class="disp" style="font-size:118px">Mark Your<br><span class="teal">Calendar</span></div>
 <div style="width:560px;background:var(--cream2);border:4px solid var(--navy);box-shadow:22px 22px 0 var(--golddk)">
  <div class="caps" style="background:var(--red);color:#fff;font-size:56px;letter-spacing:.2em;padding:26px 0">March</div>
  <div class="disp" style="font-size:300px;line-height:1.1;padding-top:10px">12</div>
  <div class="caps" style="font-size:44px;letter-spacing:.3em;padding-bottom:30px;color:var(--goldtx)">2027</div>
 </div>
 <div class="caps" style="font-size:36px;margin-top:10px">Golf &amp; Games Classic</div>
 <div class="caps teal" style="font-size:28px;letter-spacing:.18em">Golf &amp; Mahjong &middot; Miami Beach Golf Club</div>
</div>
${gmjf(false,360)}`);
story('03-which-team','day',`
<div style="position:absolute;left:0;top:0;bottom:0;width:50%;background:var(--tm)"></div><div style="position:absolute;right:0;top:0;bottom:0;width:50%;background:var(--tb)"></div>
<div style="position:absolute;left:0;right:0;bottom:0;height:520px;background:var(--cream)"></div>
<div class="col" style="top:290px;gap:18px"><div class="eb" style="color:var(--gold);font-size:34px">March 12, 2027</div><div class="disp" style="font-size:112px;color:#fff">Which Team<br>Are You On?</div></div>
${teamHalf(0,540,700,'Team<br>MARJCC','marjcc-white.png',160)}
${teamHalf(540,540,720,'Team<br>MBJCC','mbjcc-white.png',106)}
<div style="position:absolute;left:465px;top:1120px;width:150px;height:150px;border-radius:50%;background:var(--cream2);border:5px solid var(--golddk);display:flex;align-items:center;justify-content:center"><span class="vs" style="font-size:76px">vs.</span></div>
<div class="col" style="top:1440px"><div class="caps" style="font-size:30px;letter-spacing:.14em">Golf &amp; Mahjong &middot; Miami Beach Golf Club</div></div>
${gmjf(false,360)}`);
for(const p of P){
  fs.writeFileSync(path.join(__dirname,`${p.dir}-${p.name}.html`),`<!doctype html><html><head><meta charset="utf-8"><title>${p.name}</title>${FONTS}<link rel="stylesheet" href="base.css"><style>:root{--w:${p.w}px;--h:${p.h}px}</style></head><body class="${p.cls}">${p.body}</body></html>`);
}
module.exports=P;
