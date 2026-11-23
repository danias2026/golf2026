// Golf & Games Classic — Instagram set (fluid, full-bleed scenes)
const fs=require('fs'),path=require('path');
const A='../../brand/assets/',M=A+'mono/',LOGO='../../logo/golf-games-classic-logo.png';
const FONTS='<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Limelight&family=Josefin+Sans:wght@600;700&family=Mulish:wght@400;600;700&family=Playfair+Display:ital,wght@1,700&family=Noto+Serif+TC:wght@900&display=swap">';

// ---------- helpers ----------
let seed=7;const rnd=()=>{seed=(seed*16807)%2147483647;return (seed-1)/2147483646};
const hosts=(top,teal=false)=>`<div class="hosts ${teal?'t':'w'}" style="top:${top}px"><img class="mar" src="${M}marjcc-${teal?'teal':'white'}.png" alt="MARJCC"><span class="div"></span><img class="mb" src="${M}mbjcc-${teal?'teal':'white'}.png" alt="MBJCC"></div>`;
const gmjf=b=>`<div class="gmjf" style="bottom:${b}px"><img src="${A}gmjf-logo-white.png" alt="Greater Miami Jewish Federation"></div>`;
const plaque=(size=36)=>`<span class="plaque" style="font-size:${size}px">Team MARJCC <span class="vs">vs.</span> Team MBJCC</span>`;

const sine=(w,y,amp,wl,ph,step=12)=>{let d='';for(let x=-20;x<=w+20;x+=step){const yy=y+amp*Math.sin((x/wl)*2*Math.PI+ph)+amp*.35*Math.sin((x/(wl*.43))*2*Math.PI+ph*1.7);d+=(d?' L':'M')+x.toFixed(1)+' '+yy.toFixed(1)}return d};
const waveFill=(w,h,y,amp,wl,ph,fill,op=1)=>`<path d="${sine(w,y,amp,wl,ph)} L${w+20} ${h} L-20 ${h} Z" fill="${fill}" opacity="${op}"/>`;
const waveLine=(w,y,amp,wl,ph,stroke,sw,op)=>`<path d="${sine(w,y,amp,wl,ph,8)}" fill="none" stroke="${stroke}" stroke-width="${sw}" opacity="${op}" stroke-linecap="round"/>`;
const bokeh=(x0,y0,w,h,n,cols,rmin=6,rmax=40)=>{let s='';for(let i=0;i<n;i++){const r=rmin+rnd()*(rmax-rmin);s+=`<circle cx="${(x0+rnd()*w).toFixed(0)}" cy="${(y0+rnd()*h).toFixed(0)}" r="${r.toFixed(1)}" fill="${cols[i%cols.length]}" opacity="${(.12+rnd()*.3).toFixed(2)}" filter="url(#b${r>22?'8':'3'})"/>`}return s};
const stars=(x0,y0,w,h,n)=>{let s='';for(let i=0;i<n;i++)s+=`<circle cx="${(x0+rnd()*w).toFixed(0)}" cy="${(y0+rnd()*h).toFixed(0)}" r="${(.8+rnd()*2.2).toFixed(1)}" fill="#FFF3CF" opacity="${(.3+rnd()*.6).toFixed(2)}"/>`;return s};
const rays=(cx,cy,n,len,a0,a1,col,op)=>{let s='';for(let i=0;i<n;i++){const a=(a0+(a1-a0)*(i+.5)/n)*Math.PI/180,da=((a1-a0)/n)*.32*Math.PI/180;s+=`<polygon points="${cx},${cy} ${cx+len*Math.cos(a-da)},${cy+len*Math.sin(a-da)} ${cx+len*Math.cos(a+da)},${cy+len*Math.sin(a+da)}" fill="url(#ray)" opacity="${op*(.55+rnd()*.45)}"/>`}return `<g filter="url(#b8)" style="mix-blend-mode:screen">${s}</g>`};
const palm=(x,y,H,lean,s,fill,op=1)=>{const tx=x+lean,ty=y-H;let d=`<path d="M${x} ${y} Q${x+lean*.2} ${y-H*.55} ${tx} ${ty}" stroke="${fill}" stroke-width="${22*s}" fill="none" stroke-linecap="round"/>`;
 const angs=[-178,-150,-122,-95,-70,-42,-12,15,-200];for(const g of angs){const a=g*Math.PI/180,L=(230+rnd()*60)*s,ex=tx+L*Math.cos(a),ey=ty+L*Math.sin(a)+L*.42,mx=tx+L*.55*Math.cos(a),my=ty+L*.55*Math.sin(a)-30*s,nx=-Math.sin(a)*24*s,ny=Math.cos(a)*24*s;
 d+=`<path d="M${tx} ${ty} Q${mx+nx} ${my+ny} ${ex} ${ey} Q${mx-nx} ${my-ny} ${tx} ${ty} Z" fill="${fill}"/>`;
 for(let k=1;k<7;k++){const t=k/7,px=(1-t)*(1-t)*tx+2*(1-t)*t*mx+t*t*ex,py=(1-t)*(1-t)*ty+2*(1-t)*t*my+t*t*ey;d+=`<path d="M${px} ${py} l${(Math.cos(a+.9)*40*s).toFixed(1)} ${(Math.sin(a+.9)*40*s+18*s).toFixed(1)}" stroke="${fill}" stroke-width="${7*s}" stroke-linecap="round"/>`}}
 return `<g opacity="${op}">${d}</g>`};
const DEFS=`<defs>
<filter id="b3" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="3"/></filter>
<filter id="b8" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="8"/></filter>
<filter id="b30" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="30"/></filter>
<filter id="b80" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="80"/></filter>
<filter id="glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="6" result="g"/><feMerge><feMergeNode in="g"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
<radialGradient id="ray" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="scale(1400)"><stop offset="0" stop-color="#FFF3CF" stop-opacity=".9"/><stop offset="1" stop-color="#F0C078" stop-opacity="0"/></radialGradient>
<radialGradient id="sun"><stop offset="0" stop-color="#FFFBEA"/><stop offset=".35" stop-color="#FFE9A8"/><stop offset=".62" stop-color="#F9C27E" stop-opacity=".75"/><stop offset="1" stop-color="#F89090" stop-opacity="0"/></radialGradient>
<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0B3A55"/><stop offset=".16" stop-color="#2A7FA0"/><stop offset=".34" stop-color="#C68FA8"/><stop offset=".5" stop-color="#F59497"/><stop offset=".68" stop-color="#F9A982"/><stop offset=".85" stop-color="#FFCB8E"/><stop offset="1" stop-color="#FFE7B0"/></linearGradient>
<linearGradient id="sea" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F7B48C" stop-opacity="0"/><stop offset=".05" stop-color="#F2A88E" stop-opacity=".9"/><stop offset=".16" stop-color="#4FA9B6"/><stop offset=".42" stop-color="#0B6573"/><stop offset=".74" stop-color="#003040"/><stop offset="1" stop-color="#00141F"/></linearGradient>
<linearGradient id="deepwave" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#009098"/><stop offset=".5" stop-color="#004E5E"/><stop offset="1" stop-color="#00141F"/></linearGradient>
<linearGradient id="gline" x1="0" x2="1"><stop offset="0" stop-color="#F0C078" stop-opacity="0"/><stop offset=".25" stop-color="#F0C078"/><stop offset=".5" stop-color="#FFF3CF"/><stop offset=".75" stop-color="#F0C078"/><stop offset="1" stop-color="#F0C078" stop-opacity="0"/></linearGradient>
<linearGradient id="streak" x1="0" x2="1"><stop offset="0" stop-color="#FFE9A8" stop-opacity="0"/><stop offset=".5" stop-color="#FFF3CF"/><stop offset="1" stop-color="#FFE9A8" stop-opacity="0"/></linearGradient>
</defs>`;
const svg=(w,h,inner)=>`<svg class="layer" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${DEFS}${inner}</svg>`;

// sunset sea scene: sky melts into a glowing sea, sun bloom, reflection, palms, flowing waves
function sunset(w,h,hz,sx,sy,sr,o={}){seed=o.seed||11;
 let s=`<rect width="${w}" height="${h}" fill="url(#sky)"/>`;
 s+=`<circle cx="${sx}" cy="${sy}" r="${sr*3.2}" fill="url(#sun)" opacity=".55" filter="url(#b80)"/>`;
 s+=`<circle cx="${sx}" cy="${sy}" r="${sr*1.7}" fill="url(#sun)" opacity=".9" filter="url(#b30)"/>`;
 if(!o.noSunDisc) s+=`<circle cx="${sx}" cy="${sy}" r="${sr}" fill="#FFF1C4" filter="url(#b3)"/>`;
 s+=rays(sx,sy,18,Math.max(w,h)*1.3,-180,0,'',o.rayOp||.22);
 s+=`<rect y="${hz-60}" width="${w}" height="${h-hz+60}" fill="url(#sea)"/>`;
 // reflection streaks
 for(let i=0;i<34;i++){const t=i/34,yy=hz+10+t*t*(h-hz)*.75,ww=(sr*1.6)*(1-t*.6)*(.5+rnd()*.7);s+=`<rect x="${sx-ww/2+(rnd()-.5)*30*t}" y="${yy}" width="${ww}" height="${3+t*7}" rx="4" fill="url(#streak)" opacity="${(.75-t*.6).toFixed(2)}" filter="url(#b3)"/>`}
 // flowing waves + gold lines
 const base=o.waveY||h-260;
 s+=waveFill(w,h,base,22,520,0.3,'url(#deepwave)',.55);
 s+=waveLine(w,base-6,22,520,0.3,'url(#gline)',3,.8);
 s+=waveFill(w,h,base+80,28,700,2.1,'url(#deepwave)',.8);
 s+=waveLine(w,base+74,28,700,2.1,'url(#gline)',2,.55);
 s+=waveFill(w,h,base+170,20,440,4,'#00141F',.85);
 s+=bokeh(0,hz-200,w,h-hz,o.bk||26,['#FFE9A8','#7FD6DA','#F89090']);
 if(o.palms!==false){s+=palm(-40,h-120,h*.62,170,1.25,'#001822',.92);s+=palm(w+30,h-80,h*.55,-150,1.1,'#001822',.92);s+=palm(w-90,h-60,h*.38,-60,.75,'#002838',.75)}
 return svg(w,h,s)}

// night scene: deep navy, light rays from above, bokeh, stars, flowing gold ribbons and waves
function night(w,h,o={}){seed=o.seed||5;
 let s=`<rect width="${w}" height="${h}" fill="#001A27"/>`;
 s+=`<ellipse cx="${o.gx||w/2}" cy="${o.gy||h*.38}" rx="${w*.75}" ry="${h*.45}" fill="#0B5266" opacity=".8" filter="url(#b80)"/>`;
 s+=`<ellipse cx="${o.gx||w/2}" cy="${o.gy||h*.38}" rx="${w*.32}" ry="${h*.2}" fill="#F0C078" opacity=".22" filter="url(#b80)"/>`;
 s+=stars(0,0,w,h*.6,90);
 s+=rays(o.rx||w/2,o.ry||-120,22,h*1.6,20,160,'',o.rayOp||.16);
 s+=bokeh(0,0,w,h,o.bk||40,['#F0C078','#7FD6DA','#FF6B88','#FFF3CF']);
 const b=o.waveY||h-300;
 s+=waveLine(w,b-120,40,900,1.2,'url(#gline)',3,.55);
 s+=waveLine(w,b-90,30,640,2.4,'url(#gline)',1.5,.4);
 s+=waveFill(w,h,b,30,620,.6,'url(#deepwave)',.6);
 s+=waveLine(w,b-4,30,620,.6,'url(#gline)',2.5,.7);
 s+=waveFill(w,h,b+110,24,800,2.6,'url(#deepwave)',.85);
 s+=waveFill(w,h,b+210,18,500,4.2,'#00101A',.9);
 if(o.palms){s+=palm(-30,h-140,h*.55,160,1.15,'#000E16',.95);s+=palm(w+20,h-120,h*.5,-140,1.05,'#000E16',.95)}
 return svg(w,h,s)}

// two team colors flowing into each other along an S-curve, with a gold ribbon on the seam
function rivals(w,h,o={}){seed=o.seed||3;
 const c=(f)=>`M${w*.5+w*.22} -50 C${w*.15} ${h*.25}, ${w*.9} ${h*.55}, ${w*.32} ${h+50}`;
 let s=`<rect width="${w}" height="${h}" fill="#006478"/>`;
 s+=`<path d="M${w*.72} -100 C${w*.15} ${h*.25}, ${w*.9} ${h*.55}, ${w*.32} ${h+100} L${w+100} ${h+100} L${w+100} -100 Z" fill="#4078BC" filter="url(#b30)"/>`;
 s+=`<ellipse cx="${w*.2}" cy="${h*.35}" rx="${w*.4}" ry="${h*.3}" fill="#0A8FA0" opacity=".45" filter="url(#b80)"/>`;
 s+=`<ellipse cx="${w*.85}" cy="${h*.6}" rx="${w*.4}" ry="${h*.3}" fill="#6C9BE0" opacity=".45" filter="url(#b80)"/>`;
 s+=`<ellipse cx="${w/2}" cy="${o.vy||h*.6}" rx="${w*.32}" ry="${w*.32}" fill="#F0C078" opacity=".28" filter="url(#b80)"/>`;
 s+=`<path d="${c()}" stroke="#F0C078" stroke-width="16" fill="none" opacity=".35" filter="url(#b8)"/>`;
 s+=`<path d="${c()}" stroke="url(#gline)" stroke-width="4" fill="none" filter="url(#glow)"/>`;
 s+=rays(w/2,o.vy||h*.6,24,h,0,360,'',.12);
 s+=bokeh(0,0,w,h,36,['#FFF3CF','#F0C078','#7FD6DA']);
 const b=h-230;
 s+=waveFill(w,h,b,24,600,.4,'url(#deepwave)',.55);s+=waveLine(w,b-4,24,600,.4,'url(#gline)',2.5,.7);
 s+=waveFill(w,h,b+100,18,420,2.2,'#00141F',.85);
 return svg(w,h,s)}

const P=[];
const add=(dir,name,w,h,body,extra='')=>P.push({dir,name,w,h,body,extra});

// ---------------- POSTS 1080x1350 ----------------
add('posts','01-save-the-date',1080,1350,`
${sunset(1080,1350,860,540,560,150,{seed:21,waveY:1110})}
${hosts(64)}
<div class="col" style="top:205px;gap:0">
 <div class="eb" style="font-size:34px">Save the date</div>
 <div class="logo" style="width:1000px;margin-top:22px"><img src="${LOGO}" alt="Golf & Games Classic"></div>
 <div class="date" style="font-size:112px;margin-top:40px">March 12, 2027</div>
 <div class="hair" style="width:720px;margin:26px 0 22px"></div>
 <div class="caps" style="font-size:34px;letter-spacing:.2em">Golf &amp; Mahjong Tournament</div>
 <div class="caps aqua" style="font-size:26px;letter-spacing:.3em;margin-top:12px">Miami Beach Golf Club</div>
</div>
${gmjf(44)}`);

add('posts','02-friendly-rivalry',1080,1350,`
${night(1080,1350,{seed:9,ry:-200,rayOp:.22,waveY:1120})}
${hosts(64)}
<div class="col" style="top:200px;gap:0">
 <div class="eb">March 12, 2027</div>
 <div class="disp" style="font-size:210px;line-height:.92;margin-top:26px">Two<br>JCCs.</div>
 <div class="disp goldtxt" style="font-size:104px;margin-top:20px;line-height:1">One Tournament.</div>
 <div class="disp red" style="font-size:96px;line-height:1;margin-top:14px">One Friendly<br>Rivalry!</div>
 <div style="margin-top:44px">${plaque(32)}</div>
</div>
${gmjf(44)}`);

add('posts','03-golf',1080,1350,`
${sunset(1080,1350,880,540,700,0,{seed:33,noSunDisc:true,waveY:1120,rayOp:.3})}
<div class="ball" style="width:520px;height:520px;left:280px;top:440px"></div>
<svg class="layer" width="1080" height="1350" style="z-index:3">${DEFS}<rect x="0" y="820" width="1080" height="530" fill="url(#sea)" opacity=".95"/>${waveLine(1080,884,10,300,.5,'url(#gline)',3,.9)}${waveFill(1080,1350,1120,22,520,.3,'url(#deepwave)',.7)}${waveFill(1080,1350,1200,18,700,2.1,'#00141F',.85)}</svg>
${hosts(64)}
<div class="col" style="top:190px;z-index:11">
 <div class="eb">Golf &amp; Games Classic</div>
 <div class="disp" style="font-size:250px;line-height:.9;margin-top:12px;text-shadow:0 10px 60px rgba(0,30,45,.55)">Golf:</div>
</div>
<div class="col" style="top:930px;gap:18px;z-index:11">
 <div class="disp goldtxt" style="font-size:86px">May the best<br>team win!</div>
 <div class="caps" style="font-size:26px;letter-spacing:.24em">March 12, 2027 &middot; Miami Beach Golf Club</div>
</div>
${gmjf(44)}`);

const tiles=(list)=>list.map(([ch,x,y,w,r,col,blur,z])=>`<div class="tile" style="width:${w}px;height:${w*1.27}px;left:${x}px;top:${y}px;font-size:${w*.72}px;transform:rotate(${r}deg);color:${col};filter:blur(${blur}px);z-index:${z};opacity:${blur?0.7:1}">${ch}</div>`).join('');
add('posts','04-mahjong',1080,1350,`
${night(1080,1350,{seed:14,gy:500,rayOp:.2,waveY:1130})}
${tiles([['發',-40,230,150,-24,'#006868',5,2],['北',870,180,140,20,'#E02850',6,2],['中',170,330,280,-13,'#E02850',0,4],['發',600,300,280,11,'#006868',0,4],['白',430,170,170,4,'#002838',3,3]])}
${hosts(64)}
<div class="col" style="top:720px;gap:0">
 <div class="disp" style="font-size:190px;line-height:.95">Mahjong:</div>
 <div class="disp red" style="font-size:78px;margin-top:18px">Everyone plays<br>together!</div>
 <div class="caps" style="font-size:26px;letter-spacing:.24em;margin-top:30px">March 12, 2027 &middot; Miami Beach Golf Club</div>
</div>
${gmjf(44)}`);

add('posts','05-pick-your-team',1080,1350,`
${rivals(1080,1350,{vy:760})}
<div class="col" style="top:90px;gap:14px">
 <div class="eb" style="color:#FFF3CF">March 12, 2027</div>
 <div class="disp" style="font-size:150px;line-height:.92">Pick<br>Your Team</div>
</div>
<div class="col" style="left:40px;right:auto;width:460px;top:520px;gap:22px"><img src="${M}marjcc-white.png" style="height:150px" alt="MARJCC"><div class="caps" style="font-size:52px;line-height:1.05">Team<br>MARJCC</div></div>
<div class="col" style="left:auto;right:40px;width:460px;top:860px;gap:22px"><img src="${M}mbjcc-white.png" style="height:104px" alt="MBJCC"><div class="caps" style="font-size:52px;line-height:1.05">Team<br>MBJCC</div></div>
<div class="col" style="top:690px"><span class="vs" style="font-size:170px;color:#FFF3CF;text-shadow:0 0 40px rgba(240,192,120,.9),0 0 90px rgba(255,107,136,.6)">vs.</span></div>
<div class="col" style="top:1150px"><div class="caps" style="font-size:24px;letter-spacing:.24em">Golf &amp; Mahjong &middot; Miami Beach Golf Club</div></div>
${gmjf(40)}`);

// ---------------- CAROUSEL: one 3240px panorama ----------------
function pano(w,h){seed=41;
 let s=`<linearGradient id="pz" x1="0" x2="1"><stop offset="0" stop-color="#00141F" stop-opacity="0"/><stop offset=".3" stop-color="#00141F" stop-opacity="0"/><stop offset=".62" stop-color="#001A27" stop-opacity=".85"/><stop offset="1" stop-color="#001A27" stop-opacity="1"/></linearGradient>`;
 let g=`<rect width="${w}" height="${h}" fill="url(#sky)"/>`;
 g+=`<circle cx="540" cy="640" r="520" fill="url(#sun)" opacity=".6" filter="url(#b80)"/><circle cx="540" cy="640" r="250" fill="url(#sun)" filter="url(#b30)"/>`;
 g+=rays(540,640,20,2600,-180,0,'',.22);
 g+=`<rect y="${860-60}" width="${w}" height="${h-800}" fill="url(#sea)"/>`;
 for(let i=0;i<30;i++){const t=i/30,yy=870+t*t*400,ww=300*(1-t*.6)*(.5+rnd()*.7);g+=`<rect x="${540-ww/2}" y="${yy}" width="${ww}" height="${3+t*7}" rx="4" fill="url(#streak)" opacity="${(.75-t*.6).toFixed(2)}" filter="url(#b3)"/>`}
 g+=`<rect width="${w}" height="${h}" fill="url(#pz)"/>`;
 g+=stars(1700,0,1540,700,140);
 g+=`<ellipse cx="2700" cy="520" rx="700" ry="420" fill="#F0C078" opacity=".14" filter="url(#b80)"/>`;
 g+=bokeh(0,0,w,h,70,['#FFE9A8','#7FD6DA','#F89090','#F0C078']);
 // one continuous gold ribbon that flows across all three slides
 const rib=`M-20 1180 C 420 1110, 760 1150, 1240 1080 S 2300 1010, 2700 1060 S 3100 1110, 3260 1040`;
 g+=`<path d="${rib}" stroke="#F0C078" stroke-width="18" fill="none" opacity=".3" filter="url(#b8)"/><path d="${rib}" stroke="#FFF3CF" stroke-width="4" fill="none" filter="url(#glow)"/>`;
 g+=waveFill(w,h,1120,24,640,.4,'url(#deepwave)',.6)+waveLine(w,1116,24,640,.4,'url(#gline)',2.5,.7)+waveFill(w,h,1210,18,480,2.2,'#00141F',.88);
 g+=palm(-40,h-100,820,170,1.25,'#001822',.92)+palm(1080+20,h-70,700,-90,1,'#001822',.85)+palm(3240+20,h-90,760,-160,1.2,'#000E16',.95);
 return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${DEFS.replace('</defs>',s+'</defs>')}${g}</svg>`}
const PANO=pano(3240,1350);
const slide=(i,content)=>`<div class="pano" style="--pw:3240px;--px:${-1080*i}px">${PANO}</div>${content}`;
add('posts','carousel-1',1080,1350,slide(0,`${hosts(64)}
<div class="col" style="top:205px;gap:0">
 <div class="eb" style="font-size:34px">Save the date</div>
 <div class="logo" style="width:1000px;margin-top:22px"><img src="${LOGO}" alt="Golf & Games Classic"></div>
 <div class="date" style="font-size:108px;margin-top:40px">March 12, 2027</div>
 <div class="caps" style="font-size:32px;letter-spacing:.2em;margin-top:20px">Golf &amp; Mahjong Tournament</div>
</div>
<div class="swipe" style="bottom:150px">Swipe &rarr;</div>${gmjf(44)}`));
add('posts','carousel-2',1080,1350,slide(1,`${hosts(64)}
<div class="ball" style="width:300px;height:300px;left:110px;top:250px"></div>
<div class="tile" style="width:230px;height:292px;left:700px;top:240px;font-size:166px;transform:rotate(9deg)">中</div>
<div class="col" style="left:0;right:auto;width:540px;top:600px;gap:12px"><div class="disp" style="font-size:118px">Golf</div><div class="caps gold" style="font-size:34px;line-height:1.25">May the best<br>team win!</div></div>
<div class="col" style="left:auto;right:0;width:540px;top:600px;gap:12px"><div class="disp" style="font-size:118px">Mahjong</div><div class="caps" style="font-size:34px;line-height:1.25;color:#FFB3C2">Everyone plays<br>together!</div></div>
<div class="col" style="top:880px"><div class="disp" style="font-size:58px;line-height:1.1">Two communities.<br><span class="goldtxt">One unforgettable day!</span></div></div>
<div class="swipe" style="bottom:150px">Swipe &rarr;</div>${gmjf(44)}`));
add('posts','carousel-3',1080,1350,slide(2,`${hosts(64)}
<div class="col" style="top:230px;gap:0">
 <div class="eb">March 12, 2027</div>
 <div class="disp" style="font-size:156px;line-height:.95;margin-top:28px">More<br>details</div>
 <div class="disp goldtxt" style="font-size:118px;margin-top:10px">coming soon!</div>
 <div class="caps aqua" style="font-size:30px;letter-spacing:.26em;margin-top:44px">Miami Beach Golf Club</div>
 <div style="margin-top:36px">${plaque(30)}</div>
</div>${gmjf(44)}`));

// ---------------- STORIES 1080x1920 (safe 250..1580) ----------------
add('stories','01-save-the-date',1080,1920,`
${sunset(1080,1920,1130,540,820,190,{seed:55,waveY:1560,bk:34})}
${hosts(272)}
<div class="col" style="top:430px;gap:0">
 <div class="eb" style="font-size:38px">Save the date</div>
 <div class="logo" style="width:940px;margin-top:24px"><img src="${LOGO}" alt="Golf & Games Classic"></div>
 <div class="date" style="font-size:112px;margin-top:40px">March 12, 2027</div>
 <div class="hair" style="width:760px;margin:30px 0 26px"></div>
 <div class="caps" style="font-size:38px;letter-spacing:.18em">Golf &amp; Mahjong Tournament</div>
 <div class="caps aqua" style="font-size:30px;letter-spacing:.3em;margin-top:14px">Miami Beach Golf Club</div>
</div>
${gmjf(362)}`);

add('stories','02-mark-your-calendar',1080,1920,`
${night(1080,1920,{seed:61,gy:900,rayOp:.26,waveY:1500,palms:true})}
${hosts(272)}
<div class="col" style="top:420px;gap:0">
 <div class="disp" style="font-size:128px;line-height:.95">Mark Your<br><span class="aqua">Calendar</span></div>
 <div class="caps red" style="font-size:72px;letter-spacing:.42em;margin-top:60px;padding-left:.42em">March</div>
 <div class="disp goldtxt" style="font-size:520px;line-height:.86;margin-top:6px">12</div>
 <div class="caps gold" style="font-size:52px;letter-spacing:.5em;padding-left:.5em;margin-top:6px">2027</div>
 <div class="hair" style="width:700px;margin:40px 0 28px"></div>
 <div class="caps" style="font-size:34px;letter-spacing:.16em">Golf &amp; Games Classic</div>
 <div class="caps aqua" style="font-size:26px;letter-spacing:.24em;margin-top:14px">Golf &amp; Mahjong &middot; Miami Beach Golf Club</div>
</div>
${gmjf(362)}`);

add('stories','03-which-team',1080,1920,`
${rivals(1080,1920,{vy:990})}
<div class="col" style="top:290px;gap:16px">
 <div class="eb" style="color:#FFF3CF;font-size:34px">March 12, 2027</div>
 <div class="disp" style="font-size:150px;line-height:.95">Which Team<br>Are You On?</div>
</div>
<div class="col" style="left:30px;right:auto;width:480px;top:665px;gap:24px"><img src="${M}marjcc-white.png" style="height:170px" alt="MARJCC"><div class="caps" style="font-size:58px;line-height:1.05">Team<br>MARJCC</div></div>
<div class="col" style="left:auto;right:30px;width:480px;top:1130px;gap:24px"><img src="${M}mbjcc-white.png" style="height:116px" alt="MBJCC"><div class="caps" style="font-size:58px;line-height:1.05">Team<br>MBJCC</div></div>
<div class="col" style="top:880px"><span class="vs" style="font-size:190px;color:#FFF3CF;text-shadow:0 0 40px rgba(240,192,120,.9),0 0 90px rgba(255,107,136,.6)">vs.</span></div>
<div class="col" style="top:1415px"><div class="caps" style="font-size:28px;letter-spacing:.22em">Golf &amp; Mahjong &middot; Miami Beach Golf Club</div></div>
${gmjf(362)}`);

for(const p of P){fs.writeFileSync(path.join(__dirname,`${p.dir}-${p.name}.html`),`<!doctype html><html><head><meta charset="utf-8"><title>${p.name}</title>${FONTS}<link rel="stylesheet" href="base.css"><style>:root{--w:${p.w}px;--h:${p.h}px}</style></head><body>${p.body}</body></html>`)}
module.exports=P;
