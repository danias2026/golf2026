// Loads the Instagram master-look helpers directly from instagram/src/build.js (no copy, so the look stays identical).
// Pages that use them must live two folders deep (like instagram/src/) so the '../../' asset paths resolve.
const fs=require('fs'),path=require('path');
const IGDIR=path.join(__dirname,'../../instagram/src');
const src=fs.readFileSync(path.join(IGDIR,'build.js'),'utf8');
const helpers=src.slice(0,src.indexOf('const P=[];'));
const tilesLine=src.split('\n').find(l=>l.startsWith('const tiles='));
const H=new Function('require','__dirname',helpers+'\n'+tilesLine+
 '\nreturn {FONTS,A,M,LOGO,hosts,gmjf,plaque,sunset,night,rivals,svg,DEFS,waveFill,waveLine,bokeh,rays,stars,sweepSides,tiles};')(require,IGDIR);
H.BASE_CSS=path.relative(process.cwd(),path.join(IGDIR,'base.css'));
H.page=(file,w,h,body,extraCss='')=>{const css=path.relative(path.dirname(file),path.join(IGDIR,'base.css'));
 fs.writeFileSync(file,`<!doctype html><html><head><meta charset="utf-8"><title>${path.basename(file)}</title>${H.FONTS}<link rel="stylesheet" href="${css}"><style>:root{--w:${w}px;--h:${h}px}${extraCss}</style></head><body>${body}</body></html>`)};
module.exports=H;
