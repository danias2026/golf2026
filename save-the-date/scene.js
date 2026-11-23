// Golf & Games Classic: clean navy ground, a soft glow behind the logo, and sweeping gold lines.
// buildScene(el, {W,H, glow:[cx,cy,r] (px), bundles:[{from:[x,y], c1:[x,y], c2:[x,y], to:[x,y], n, spread, width, opacity}],
//                 fadeToPaper (px), fadeSides (px)})   — all coordinates as fractions of W/H.
(function(){
const NS='http://www.w3.org/2000/svg';
function E(tag,attrs,parent){const e=document.createElementNS(NS,tag);for(const k in attrs)e.setAttribute(k,attrs[k]);if(parent)parent.appendChild(e);return e}
window.buildScene=function(host,o){
  const {W,H,glow=null,bundles=[],fadeToPaper=0,fadeSides=0,ground='#002838',curveBottom=null}=o;
  const svg=E('svg',{width:W,height:H,viewBox:`0 0 ${W} ${H}`});
  svg.style.cssText='position:absolute;inset:0;display:block';
  const d=E('defs',{},svg);
  E('rect',{x:0,y:0,width:W,height:H,fill:ground},svg);
  if(glow){const g=E('radialGradient',{id:'glow',cx:.5,cy:.5,r:.5},d);
    [[0,'#F0C078',.22],[.45,'#F0C078',.08],[1,'#F0C078',0]].forEach(([a,c,op])=>E('stop',{offset:a,'stop-color':c,'stop-opacity':op},g));
    E('circle',{cx:glow[0]*W,cy:glow[1]*H,r:glow[2]*W,fill:'url(#glow)'},svg)}
  const gl=E('filter',{id:'gl',x:'-10%',y:'-50%',width:'120%',height:'200%'},d);
  E('feGaussianBlur',{stdDeviation:2.4,result:'b'},gl);const m=E('feMerge',{},gl);E('feMergeNode',{in:'b'},m);E('feMergeNode',{in:'SourceGraphic'},m);
  bundles.forEach((b,bi)=>{
    const lg=E('linearGradient',{id:'g'+bi,gradientUnits:'userSpaceOnUse',x1:b.from[0]*W,y1:b.from[1]*H,x2:b.to[0]*W,y2:b.to[1]*H},d);
    [[0,'#C98F3A',0],[.18,'#F0C078',.9],[.5,'#FFF1C9',1],[.82,'#F0C078',.9],[1,'#C98F3A',0]].forEach(([a,c,op])=>E('stop',{offset:a,'stop-color':c,'stop-opacity':op},lg));
    const n=b.n||5, sp=(b.spread||.012)*H;
    for(let i=0;i<n;i++){const t=i-(n-1)/2, k=t*sp, k2=t*sp*(1.8+((i*7)%3)*.35);
      const P=(p,off)=>`${p[0]*W},${p[1]*H+off}`;
      E('path',{d:`M${P(b.from,k*.4)} C${P(b.c1,k2)} ${P(b.c2,-k2*.8)} ${P(b.to,k*.3)}`,fill:'none',stroke:`url(#g${bi})`,
        'stroke-width':(b.width||1.4)*(i===Math.floor(n/2)?1.6:1),opacity:(b.opacity||.9)*(1-Math.abs(t)/(n)),'stroke-linecap':'round',filter:'url(#gl)'},svg)}
  });
  if(curveBottom){const [a,c1,c2,b]=curveBottom.map(v=>v*H);
    const path=`M0,${a} C${W*.33},${c1} ${W*.66},${c2} ${W},${b}`;
    E('path',{d:path+` L${W},${H} L0,${H} Z`,fill:'#FFF9EE'},svg);
    const cg=E('linearGradient',{id:'cg',x1:0,y1:0,x2:1,y2:0},d);
    [[0,'#C98F3A',.2],[.5,'#FFE3A6',1],[1,'#C98F3A',.2]].forEach(([o2,c,op])=>E('stop',{offset:o2,'stop-color':c,'stop-opacity':op},cg));
    E('path',{d:path,fill:'none',stroke:'url(#cg)','stroke-width':2.2,filter:'url(#gl)'},svg)}
  if(fadeToPaper){const fp=E('linearGradient',{id:'fp',x1:0,y1:0,x2:0,y2:1},d);
    [[0,'#FFF9EE',0],[.6,'#FFF9EE',.75],[1,'#FFF9EE',1]].forEach(([a,c,op])=>E('stop',{offset:a,'stop-color':c,'stop-opacity':op},fp));
    E('rect',{x:0,y:H-fadeToPaper,width:W,height:fadeToPaper,fill:'url(#fp)'},svg)}
  if(fadeSides){[['l',1,0],['r',0,1]].forEach(([id,a1,a2])=>{const g=E('linearGradient',{id:'fs'+id,x1:0,y1:0,x2:1,y2:0},d);
      E('stop',{offset:0,'stop-color':'#FFF9EE','stop-opacity':a1},g);E('stop',{offset:1,'stop-color':'#FFF9EE','stop-opacity':a2},g);
      E('rect',{x:id==='l'?0:W-fadeSides,y:0,width:fadeSides,height:H,fill:`url(#fs${id})`},svg)})}
  host.prepend(svg);
};
})();
