// Golf & Games Classic: cinematic golden-hour scene, drawn as one full-bleed SVG.
// buildScene(el, {W,H, horizon (px), sunR, fadeToPaper (px or 0), palms:true, seed})
(function(){
const NS='http://www.w3.org/2000/svg';
function rng(seed){let s=seed>>>0;return()=>{s=(s*1664525+1013904223)>>>0;return s/4294967296}}
function E(tag,attrs,parent){const e=document.createElementNS(NS,tag);for(const k in attrs)e.setAttribute(k,attrs[k]);if(parent)parent.appendChild(e);return e}
function smooth(pts){let d=`M${pts[0][0]},${pts[0][1]}`;for(let i=0;i<pts.length-1;i++){const p0=pts[i-1]||pts[i],p1=pts[i],p2=pts[i+1],p3=pts[i+2]||p2;
  const c1=[p1[0]+(p2[0]-p0[0])/6,p1[1]+(p2[1]-p0[1])/6],c2=[p2[0]-(p3[0]-p1[0])/6,p2[1]-(p3[1]-p1[1])/6];d+=` C${c1[0]},${c1[1]} ${c2[0]},${c2[1]} ${p2[0]},${p2[1]}`}return d}
window.buildScene=function(host,o){
  const {W,H,horizon:hz,sunR=90,fadeToPaper=0,palms=true,seed=7,ribbons=[.35,.63],calm=null}=o, r=rng(seed);
  const svg=E('svg',{width:W,height:H,viewBox:`0 0 ${W} ${H}`,preserveAspectRatio:'none'});
  svg.style.cssText='position:absolute;inset:0;display:block';
  const d=E('defs',{},svg), f=hz/H;
  const sky=E('linearGradient',{id:'sky',x1:0,y1:0,x2:0,y2:1},d);
  [[0,'#010F18'],[f*.30,'#03263A'],[f*.55,'#0B4660'],[f*.74,'#7A6A8E'],[f*.86,'#F48A86'],[f*.96,'#FFC98A'],[f,'#FFE3A6'],
   [f+.002,'#2B7486'],[f+.06,'#0D4A5C'],[Math.min(1,f+.25),'#032536'],[1,'#011520']].forEach(([o2,c])=>E('stop',{offset:o2,'stop-color':c},sky));
  const glow=E('radialGradient',{id:'glow',cx:.5,cy:.5,r:.5},d);
  [[0,'#FFE7B0',.95],[.18,'#FFC98A',.6],[.45,'#F48A86',.25],[1,'#F48A86',0]].forEach(([a,c,op])=>E('stop',{offset:a,'stop-color':c,'stop-opacity':op},glow));
  const sun=E('radialGradient',{id:'sun',cx:.5,cy:.5,r:.5},d);
  [[0,'#FFFBEA',1],[.55,'#FFE6A8',1],[.8,'#F8C478',.9],[1,'#F8C478',0]].forEach(([a,c,op])=>E('stop',{offset:a,'stop-color':c,'stop-opacity':op},sun));
  const ray=E('linearGradient',{id:'ray',x1:0,y1:1,x2:0,y2:0},d);
  [[0,'#FFE3A6',.55],[1,'#FFE3A6',0]].forEach(([a,c,op])=>E('stop',{offset:a,'stop-color':c,'stop-opacity':op},ray));
  const gold=E('linearGradient',{id:'goldline',x1:0,y1:0,x2:1,y2:0},d);
  [[0,'#F0C078',0],[.2,'#F0C078',.9],[.5,'#FFF1C9',1],[.8,'#F0C078',.9],[1,'#F0C078',0]].forEach(([a,c,op])=>E('stop',{offset:a,'stop-color':c,'stop-opacity':op},gold));
  const b1=E('filter',{id:'blur6',x:'-50%',y:'-50%',width:'200%',height:'200%'},d);E('feGaussianBlur',{stdDeviation:6},b1);
  const b2=E('filter',{id:'blur2',x:'-50%',y:'-50%',width:'200%',height:'200%'},d);E('feGaussianBlur',{stdDeviation:2},b2);
  const gl=E('filter',{id:'glowline',x:'-20%',y:'-200%',width:'140%',height:'500%'},d);E('feGaussianBlur',{stdDeviation:3,result:'b'},gl);
  const m=E('feMerge',{},gl);E('feMergeNode',{in:'b'},m);E('feMergeNode',{in:'SourceGraphic'},m);
  const cx=W/2;
  E('rect',{x:0,y:0,width:W,height:H,fill:'url(#sky)'},svg);
  // light rays
  const rays=E('g',{style:'mix-blend-mode:screen'},svg); const L=Math.hypot(W,H);
  for(let i=0;i<22;i++){const a=Math.PI*(1.04+i*(0.92/21)), w=0.012+r()*0.03, len=L*(.6+r()*.4);
    const p=(ang)=>`${cx+Math.cos(ang)*len},${hz+Math.sin(ang)*len}`;
    E('polygon',{points:`${cx},${hz} ${p(a-w)} ${p(a+w)}`,fill:'url(#ray)',opacity:(.18+r()*.3).toFixed(2)},rays)}
  // glow + sun
  E('ellipse',{cx,cy:hz,rx:W*.75,ry:W*.55,fill:'url(#glow)',style:'mix-blend-mode:screen'},svg);
  const sg=E('g',{},svg); const cp=E('clipPath',{id:'abovehz'},d);E('rect',{x:0,y:0,width:W,height:hz},cp);
  E('circle',{cx,cy:hz,r:sunR,fill:'url(#sun)','clip-path':'url(#abovehz)'},sg);
  // ocean: sun path shimmer
  const sh=E('g',{style:'mix-blend-mode:screen'},svg);
  for(let k=0;k<70;k++){const t=r(), y=hz+4+Math.pow(t,1.7)*(H-hz)*.9, spread=sunR*.6+t*W*.28, x=cx+(r()-.5)*2*spread, w=8+t*70*r();
    E('rect',{x:x-w/2,y,width:w,height:1.2+t*2.2,rx:1,fill:'#FFE3A6',opacity:(.25+.55*(1-t)*r()).toFixed(2)},sh)}
  // flowing waves with gold crests
  const waves=E('g',{},svg);
  for(let i=0;i<6;i++){const t=i/5, y0=hz+(H-hz)*(.08+t*.62), amp=6+t*26, n=7, pts=[];const ph=r()*6;
    for(let j=0;j<=n;j++){const x=-40+j*(W+80)/n;pts.push([x,y0+Math.sin(j*1.3+ph)*amp+(r()-.5)*amp*.6])}
    const dd=smooth(pts);
    E('path',{d:dd+` L${W+40},${H+10} L-40,${H+10} Z`,fill:i%2?'#0A4B5C':'#05364A',opacity:(.35+t*.25).toFixed(2)},waves);
    E('path',{d:dd,fill:'none',stroke:'url(#goldline)','stroke-width':(.8+t*1.6).toFixed(1),opacity:(.18+t*.22).toFixed(2),filter:'url(#glowline)'},waves)}
  // two big flowing gold ribbons
  for(let i=0;i<ribbons.length;i++){const y0=hz+(H-hz)*ribbons[i], pts=[];for(let j=0;j<=5;j++){pts.push([-60+j*(W+120)/5,y0+Math.sin(j*1.1+i*2+r())*((H-hz)*.07)])}
    E('path',{d:smooth(pts),fill:'none',stroke:'url(#goldline)','stroke-width':i?2.2:3,opacity:.8,filter:'url(#glowline)'},svg)}
  if(calm){const cg=E('radialGradient',{id:'calm',cx:.5,cy:.5,r:.5},d);[[0,'#011520',.78],[.6,'#011520',.5],[1,'#011520',0]].forEach(([a,c,op])=>E('stop',{offset:a,'stop-color':c,'stop-opacity':op},cg));
    E('ellipse',{cx:W/2,cy:calm[0],rx:calm[1],ry:calm[2],fill:'url(#calm)'},svg)}
  // palms
  if(palms){const pg=E('g',{fill:'#010C13',stroke:'#010C13','stroke-linecap':'round'},svg);
    const palm=(bx,by,tx,ty,s)=>{ // trunk
      const pts=[];for(let i=0;i<=12;i++){const t=i/12;pts.push([bx+(tx-bx)*t+Math.sin(t*Math.PI)*(tx-bx)*.25,by+(ty-by)*t])}
      for(let i=0;i<pts.length-1;i++)E('line',{x1:pts[i][0],y1:pts[i][1],x2:pts[i+1][0],y2:pts[i+1][1],'stroke-width':(38-24*i/12)*s},pg);
      for(let k=0;k<11;k++){const a=-Math.PI*(0.02+k*0.096)+(r()-.5)*.15, len=(200+r()*90)*s, droop=(.35+r()*.35);
        const ex=tx+Math.cos(a)*len, ey=ty+Math.sin(a)*len*.55+len*droop*.75, mx=tx+Math.cos(a)*len*.55, my=ty+Math.sin(a)*len*.55-len*.08;
        E('path',{d:`M${tx},${ty} Q${mx},${my} ${ex},${ey}`,fill:'none','stroke-width':6*s},pg);
        for(let q=1;q<16;q++){const t=q/16, ix=(1-t)*(1-t)*tx+2*(1-t)*t*mx+t*t*ex, iy=(1-t)*(1-t)*ty+2*(1-t)*t*my+t*t*ey;
          const dx=2*(1-t)*(mx-tx)+2*t*(ex-mx), dy=2*(1-t)*(my-ty)+2*t*(ey-my), nl=Math.hypot(dx,dy), nx=-dy/nl, ny=dx/nl, ll=(44-30*t)*s;
          E('line',{x1:ix,y1:iy,x2:ix+nx*ll+dx/nl*ll*.6,y2:iy+ny*ll+dy/nl*ll*.6+ll*.5,'stroke-width':4.5*s},pg);
          E('line',{x1:ix,y1:iy,x2:ix-nx*ll+dx/nl*ll*.6,y2:iy-ny*ll+dy/nl*ll*.6+ll*.5,'stroke-width':4.5*s},pg)}}};
    const s=W/1080;
    palm(-30*s,H+20,120*s,hz-H*.34,1.05*s*1.0); palm(-80*s,H+20,30*s,hz-H*.12,.8*s);
    palm(W+30*s,H+20,W-130*s,hz-H*.30,1.0*s); palm(W+90*s,H+20,W-20*s,hz-H*.05,.75*s);}
  // bokeh
  const bk=E('g',{style:'mix-blend-mode:screen'},svg);
  for(let i=0;i<46;i++){const x=r()*W,y=r()*H*.95,rad=2+Math.pow(r(),3)*26*W/1080;
    E('circle',{cx:x,cy:y,r:rad,fill:r()<.75?'#FFE3A6':'#F89090',opacity:(.12+r()*.4).toFixed(2),filter:rad>8?'url(#blur6)':'url(#blur2)'},bk)}
  // melt into paper
  if(fadeToPaper){const fp=E('linearGradient',{id:'fp',x1:0,y1:0,x2:0,y2:1},d);
    [[0,'#FFF9EE',0],[.55,'#FFF9EE',.7],[1,'#FFF9EE',1]].forEach(([a,c,op])=>E('stop',{offset:a,'stop-color':c,'stop-opacity':op},fp));
    E('rect',{x:0,y:H-fadeToPaper,width:W,height:fadeToPaper,fill:'url(#fp)'},svg)}
  host.prepend(svg);
};
})();
