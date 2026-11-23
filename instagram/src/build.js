// Golf & Games Classic — Instagram set. Clean grounds, logo as hero, flowing gold lines as the signature.
const fs=require('fs'),path=require('path');
const A='../../brand/assets/',M=A+'mono/',LOGO='../../logo/golf-games-classic-logo.png';
const FONTS='<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Limelight&family=Josefin+Sans:wght@600;700&family=Mulish:wght@400;600;700&family=Playfair+Display:ital,wght@1,700&family=Noto+Serif+TC:wght@900&display=swap">';

const hosts=(top,dark)=>`<div class="hosts ${dark?'w':'t'}" style="top:${top}px"><img class="mar" src="${M}marjcc-${dark?'white':'teal'}.png" alt="MARJCC"><span class="div"></span><img class="mb" src="${M}mbjcc-${dark?'white':'teal'}.png" alt="MBJCC"></div>`;
const gmjf=(b,dark)=>`<div class="gmjf" style="bottom:${b}px"><img src="${A}gmjf-logo-${dark?'white':'black'}.png" alt="Greater Miami Jewish Federation"></div>`;
const plaque=(size,dark)=>`<span class="plaque ${dark?'':'lt'}" style="font-size:${size}px">Team MARJCC <span class="vs">vs.</span> Team MBJCC</span>`;

const DEFS=`<defs>
<filter id="soft" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="7"/></filter>
<filter id="glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="120"/></filter>
<linearGradient id="gN" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="1080" y2="0"><stop offset="0" stop-color="#F0C078" stop-opacity="0"/><stop offset=".18" stop-color="#F0C078"/><stop offset=".5" stop-color="#FFF6D8"/><stop offset=".82" stop-color="#F0C078"/><stop offset="1" stop-color="#F0C078" stop-opacity="0"/></linearGradient>
<linearGradient id="gC" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="1080" y2="0"><stop offset="0" stop-color="#C9963E" stop-opacity="0"/><stop offset=".18" stop-color="#C9963E"/><stop offset=".5" stop-color="#E7BC6A"/><stop offset=".82" stop-color="#B9852F"/><stop offset="1" stop-color="#B9852F" stop-opacity="0"/></linearGradient>
<linearGradient id="gP" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="3240" y2="0"><stop offset="0" stop-color="#F0C078" stop-opacity="0"/><stop offset=".06" stop-color="#F0C078"/><stop offset=".2" stop-color="#FFF6D8"/><stop offset=".5" stop-color="#F0C078"/><stop offset=".8" stop-color="#FFF6D8"/><stop offset=".94" stop-color="#F0C078"/><stop offset="1" stop-color="#F0C078" stop-opacity="0"/></linearGradient>
</defs>`;
// a bundle of parallel sweeping lines: glow + crisp stroke
const sweep=(d,dark,{w=3,n=3,gap=16,grad}={})=>{const g=grad||(dark?'gN':'gC');let s='';for(let i=0;i<n;i++){const t=`translate(0 ${i*gap})`,o=1-i*.28,sw=Math.max(1.2,w-i*.8);
 s+=`<path d="${d}" transform="${t}" fill="none" stroke="${dark?'#F0C078':'#E7BC6A'}" stroke-width="${sw*5}" opacity="${(dark?.28:.22)*o}" filter="url(#soft)" stroke-linecap="round"/>`;
 s+=`<path d="${d}" transform="${t}" fill="none" stroke="url(#${g})" stroke-width="${sw}" opacity="${o}" stroke-linecap="round"/>`}return s};
const ground=(w,h,dark,glows=[],lines='')=>`<svg class="layer" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${DEFS}<rect width="${w}" height="${h}" fill="${dark?'#002838':'#F8F0E0'}"/>${glows.map(([x,y,r,c,o])=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${c}" opacity="${o}" filter="url(#glow)"/>`).join('')}${lines}</svg>`;
const linesTop=(w,h,inner)=>`<svg class="layer" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" style="z-index:11">${DEFS}${inner}</svg>`;
// circular crop of the golf ball from the logo artwork (ball: center 2400,900 r354 in the 4800px PNG)
const ball=(x,y,D)=>{const R=362,k=D/(2*R);return `<div class="ballcrop" style="left:${x}px;top:${y}px;width:${D}px;height:${D}px"><img src="${LOGO}" style="width:${4800*k}px;left:${-(2400-R)*k}px;top:${-(900-R)*k}px" alt=""></div>`};
const tile=(ch,x,y,w,r,col)=>`<div class="tile" style="width:${w}px;height:${Math.round(w*1.27)}px;left:${x}px;top:${y}px;font-size:${Math.round(w*.7)}px;transform:rotate(${r}deg);color:${col}">${ch}</div>`;
const logo=(w)=>`<div class="logo" style="width:${w}px"><img src="${LOGO}" alt="Golf & Games Classic"></div>`;

const P=[];const add=(dir,name,w,h,cls,body)=>P.push({dir,name,w,h,cls,body});
const NAVY_GLOW='#0E5A6E',GOLD_GLOW='#F0C078';

// ---------------- POSTS 1080x1350 ----------------
add('posts','01-save-the-date',1080,1350,'dark',`
${ground(1080,1350,true,[[540,520,420,NAVY_GLOW,.9],[540,520,260,GOLD_GLOW,.16]],
 sweep('M-40 980 C 260 860, 420 1060, 640 1000 S 980 860, 1120 930',true,{n:3,gap:14}))}
${hosts(64,true)}
<div class="col" style="top:200px;gap:0">
 <div class="eb" style="font-size:34px">Save the date</div>
 <div style="margin-top:20px">${logo(1000)}</div>
 <div class="date" style="font-size:112px;margin-top:20px">March 12, 2027</div>
</div>
<div class="col" style="top:1070px;gap:12px">
 <div class="caps" style="font-size:34px;letter-spacing:.2em">Golf &amp; Mahjong Tournament</div>
 <div class="caps aqua" style="font-size:26px;letter-spacing:.3em">Miami Beach Golf Club</div>
</div>
${gmjf(46,true)}`);

add('posts','02-friendly-rivalry',1080,1350,'light',`
${ground(1080,1350,false,[[540,640,460,'#F6C9A8',.5]],
 sweep('M-40 560 C 240 470, 520 650, 760 560 S 1020 440, 1120 500',false,{n:2,gap:14})+
 sweep('M-40 905 C 300 1000, 560 830, 820 920 S 1040 1000, 1120 960',false,{n:2,gap:14}))}
${hosts(64,false)}
<div class="col" style="top:190px;gap:0">
 <div class="eb dk">March 12, 2027</div>
 <div class="disp navy" style="font-size:220px;line-height:.9;margin-top:24px">Two JCCs.</div>
 <div class="disp teal" style="font-size:112px;line-height:1;margin-top:120px">One Tournament.</div>
 <div class="disp redd" style="font-size:100px;line-height:1;margin-top:120px">One Friendly Rivalry!</div>
</div>
<div class="col" style="top:1110px">${plaque(30,false)}</div>
${gmjf(46,false)}`);

add('posts','03-golf',1080,1350,'dark',`
${ground(1080,1350,true,[[600,640,360,NAVY_GLOW,1],[600,640,240,GOLD_GLOW,.22]])}
${ball(330,370,540)}
${linesTop(1080,1350,sweep('M-40 1180 C 120 1100, 220 820, 330 700',true,{n:3,gap:16})+sweep('M870 640 C 960 520, 1040 470, 1120 450',true,{n:3,gap:16}))}
${hosts(64,true)}
<div class="col" style="top:170px;z-index:12"><div class="eb">Golf &amp; Games Classic</div><div class="disp" style="font-size:210px;line-height:.9;margin-top:10px">Golf:</div></div>
<div class="col" style="top:960px;gap:16px;z-index:12">
 <div class="disp goldtxt" style="font-size:96px">May the best team win!</div>
 <div class="caps" style="font-size:26px;letter-spacing:.24em">March 12, 2027 &middot; Miami Beach Golf Club</div>
</div>
${gmjf(46,true)}`);

add('posts','04-mahjong',1080,1350,'light',`
${ground(1080,1350,false,[[540,470,420,'#F6C9A8',.55]],sweep('M-40 360 C 200 250, 380 520, 560 430 S 900 240, 1120 330',false,{n:3,gap:16}))}
${tile('中',150,250,270,-12,'#E02850')}${tile('發',640,230,270,10,'#006868')}
${hosts(64,false)}
<div class="col" style="top:690px;gap:0">
 <div class="disp navy" style="font-size:190px;line-height:.95">Mahjong:</div>
 <div class="disp redd" style="font-size:84px;margin-top:20px">Everyone plays together!</div>
</div>
${linesTop(1080,1350,sweep('M-40 1080 C 260 1000, 600 1120, 1120 1030',false,{n:2,gap:14}))}
<div class="col" style="top:1120px"><div class="caps navy" style="font-size:26px;letter-spacing:.24em">March 12, 2027 &middot; Miami Beach Golf Club</div></div>
${gmjf(46,false)}`);

const team=(w,h,d)=>`<svg class="layer" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${DEFS}<rect width="${w}" height="${h}" fill="#006478"/><path d="${d} L${w+50} ${h+50} L${w+50} -50 Z" fill="#4078BC"/>${sweep(d,true,{n:1,w:5,grad:'gT'}).replace(/url\(#gT\)/g,'#FFE2A6')}</svg>`;
add('posts','05-pick-your-team',1080,1350,'dark',`
${team(1080,1350,'M720 -50 C 300 380, 860 760, 380 1400')}
<div class="col" style="top:90px;gap:12px"><div class="eb" style="color:#FFF3CF">March 12, 2027</div><div class="disp" style="font-size:150px;line-height:.92">Pick<br>Your Team</div></div>
<div class="col" style="left:30px;right:auto;width:460px;top:520px;gap:22px"><img src="${M}marjcc-white.png" style="height:150px" alt="MARJCC"><div class="caps" style="font-size:52px;line-height:1.05">Team<br>MARJCC</div></div>
<div class="col" style="left:auto;right:30px;width:460px;top:860px;gap:22px"><img src="${M}mbjcc-white.png" style="height:104px" alt="MBJCC"><div class="caps" style="font-size:52px;line-height:1.05">Team<br>MBJCC</div></div>
<div class="col" style="top:690px"><span class="vs" style="font-size:170px;color:#FFF3CF;text-shadow:0 0 30px rgba(240,192,120,.8)">vs.</span></div>
<div class="col" style="top:1170px"><div class="caps" style="font-size:24px;letter-spacing:.24em">Golf &amp; Mahjong &middot; Miami Beach Golf Club</div></div>
${gmjf(40,true)}`);

// ---------------- CAROUSEL: one 3240px navy panorama, one continuous line ----------------
const PANO=`<svg width="3240" height="1350" viewBox="0 0 3240 1350">${DEFS}<rect width="3240" height="1350" fill="#002838"/>
${[[540,520,420,NAVY_GLOW,.9],[540,520,250,GOLD_GLOW,.15],[1620,560,420,NAVY_GLOW,.8],[2700,560,420,NAVY_GLOW,.8],[2700,560,240,GOLD_GLOW,.12]].map(([x,y,r,c,o])=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${c}" opacity="${o}" filter="url(#glow)"/>`).join('')}
${sweep('M-40 1000 C 300 880, 520 1080, 820 1010 S 1180 760, 1420 840 S 1760 1080, 2000 990 S 2380 720, 2620 800 S 3000 1060, 3280 960',true,{n:3,gap:16,grad:'gP'})}</svg>`;
const slide=(i,c)=>`<div class="pano" style="--pw:3240px;--px:${-1080*i}px">${PANO}</div>${c}`;
add('posts','carousel-1',1080,1350,'dark',slide(0,`${hosts(64,true)}
<div class="col" style="top:200px;gap:0"><div class="eb" style="font-size:34px">Save the date</div><div style="margin-top:20px">${logo(1000)}</div><div class="date" style="font-size:108px;margin-top:20px">March 12, 2027</div></div>
<div class="col" style="top:1090px"><div class="caps" style="font-size:32px;letter-spacing:.2em">Golf &amp; Mahjong Tournament</div></div>
<div class="swipe" style="bottom:160px">Swipe &rarr;</div>${gmjf(46,true)}`));
add('posts','carousel-2',1080,1350,'dark',slide(1,`${hosts(64,true)}
${ball(90,230,330)}${tile('中',690,215,250,9,'#E02850')}
<div class="col" style="left:0;right:auto;width:540px;top:590px;gap:10px"><div class="disp" style="font-size:124px">Golf</div><div class="caps gold" style="font-size:32px;line-height:1.25">May the best<br>team win!</div></div>
<div class="col" style="left:auto;right:0;width:540px;top:590px;gap:10px"><div class="disp" style="font-size:124px">Mahjong</div><div class="caps" style="font-size:32px;line-height:1.25;color:#FFB3C2">Everyone plays<br>together!</div></div>
<div class="col" style="top:1060px"><div class="disp" style="font-size:54px;line-height:1.1">Two communities. <span class="goldtxt">One unforgettable day!</span></div></div>
<div class="swipe" style="bottom:160px">Swipe &rarr;</div>${gmjf(46,true)}`));
add('posts','carousel-3',1080,1350,'dark',slide(2,`${hosts(64,true)}
<div class="col" style="top:220px;gap:0"><div class="eb">March 12, 2027</div><div class="disp" style="font-size:170px;line-height:.92;margin-top:26px">More<br>details</div><div class="disp goldtxt" style="font-size:120px;margin-top:10px">coming soon!</div></div>
<div class="col" style="top:1080px;gap:26px"><div class="caps aqua" style="font-size:28px;letter-spacing:.26em">Miami Beach Golf Club</div>${plaque(28,true)}</div>${gmjf(46,true)}`));

// ---------------- STORIES 1080x1920 (safe 250..1580) ----------------
add('stories','01-save-the-date',1080,1920,'dark',`
${ground(1080,1920,true,[[540,760,460,NAVY_GLOW,.95],[540,760,280,GOLD_GLOW,.16]],
 sweep('M-40 1230 C 260 1100, 460 1330, 700 1240 S 980 1120, 1120 1170',true,{n:3,gap:16})+sweep('M-40 400 C 300 330, 700 470, 1120 380',true,{n:2,gap:14}))}
${hosts(272,true)}
<div class="col" style="top:470px;gap:0"><div class="eb" style="font-size:38px">Save the date</div><div style="margin-top:24px">${logo(1020)}</div><div class="date" style="font-size:116px;margin-top:30px">March 12, 2027</div></div>
<div class="col" style="top:1330px;gap:14px"><div class="caps" style="font-size:38px;letter-spacing:.18em">Golf &amp; Mahjong Tournament</div><div class="caps aqua" style="font-size:30px;letter-spacing:.3em">Miami Beach Golf Club</div></div>
${gmjf(362,true)}`);

add('stories','02-mark-your-calendar',1080,1920,'light',`
${ground(1080,1920,false,[[540,960,460,'#F6C9A8',.55]],
 sweep('M-40 760 C 260 640, 520 880, 780 780 S 1020 660, 1120 700',false,{n:3,gap:16})+sweep('M-40 1250 C 300 1350, 620 1170, 1120 1290',false,{n:3,gap:16}))}
${hosts(272,false)}
<div class="col" style="top:430px;gap:0">
 <div class="disp navy" style="font-size:124px;line-height:.95">Mark Your<br><span class="teal">Calendar</span></div>
 <div class="caps redd" style="font-size:70px;letter-spacing:.42em;padding-left:.42em;margin-top:90px">March</div>
 <div class="disp navy" style="font-size:500px;line-height:.86;margin-top:0">12</div>
 <div class="caps golddk" style="font-size:52px;letter-spacing:.5em;padding-left:.5em;margin-top:70px">2027</div>
 <div class="caps navy" style="font-size:34px;letter-spacing:.16em;margin-top:34px">Golf &amp; Games Classic</div>
 <div class="caps teal" style="font-size:26px;letter-spacing:.22em;margin-top:12px">Golf &amp; Mahjong &middot; Miami Beach Golf Club</div>
</div>
${gmjf(362,false)}`);

add('stories','03-which-team',1080,1920,'dark',`
${team(1080,1920,'M740 -50 C 260 560, 900 1100, 360 1980')}
<div class="col" style="top:290px;gap:16px"><div class="eb" style="color:#FFF3CF;font-size:34px">March 12, 2027</div><div class="disp" style="font-size:150px;line-height:.95">Which Team<br>Are You On?</div></div>
<div class="col" style="left:30px;right:auto;width:480px;top:665px;gap:24px"><img src="${M}marjcc-white.png" style="height:170px" alt="MARJCC"><div class="caps" style="font-size:58px;line-height:1.05">Team<br>MARJCC</div></div>
<div class="col" style="left:auto;right:30px;width:480px;top:1130px;gap:24px"><img src="${M}mbjcc-white.png" style="height:116px" alt="MBJCC"><div class="caps" style="font-size:58px;line-height:1.05">Team<br>MBJCC</div></div>
<div class="col" style="top:880px"><span class="vs" style="font-size:190px;color:#FFF3CF;text-shadow:0 0 30px rgba(240,192,120,.8)">vs.</span></div>
<div class="col" style="top:1415px"><div class="caps" style="font-size:28px;letter-spacing:.22em">Golf &amp; Mahjong &middot; Miami Beach Golf Club</div></div>
${gmjf(362,true)}`);

for(const p of P){fs.writeFileSync(path.join(__dirname,`${p.dir}-${p.name}.html`),`<!doctype html><html><head><meta charset="utf-8"><title>${p.name}</title>${FONTS}<link rel="stylesheet" href="base.css"><style>:root{--w:${p.w}px;--h:${p.h}px}</style></head><body class="${p.cls}">${p.body}</body></html>`)}
module.exports=P;
