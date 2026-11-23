const { chromium } = require('playwright');
const fs=require('fs'),path=require('path'),{execSync}=require('child_process');
// node render2.js v out.mp4 | node render2.js v --still t out.png | node render2.js v --stills "t1,t2" prefix
(async()=>{
  const [v,a2,a3,a4]=process.argv.slice(2);
  const H=v==='loop'?1350:1920;
  const b=await chromium.launch(); const p=await b.newPage({viewport:{width:1080,height:H},deviceScaleFactor:1});
  p.on('pageerror',e=>console.error('PAGEERR',e.message));
  await p.goto('file://'+__dirname+'/stage2.html?v='+v); await p.waitForFunction(()=>window.__ready,null,{timeout:60000}); await p.waitForTimeout(400);
  if(a2==='--still'){ await p.evaluate(t=>render(t),Number(a3)); await p.screenshot({path:a4}); await b.close(); return; }
  if(a2==='--stills'){ for(const t of a3.split(',')){await p.evaluate(t=>render(t),Number(t)); await p.screenshot({path:`${a4}_${t}.png`});} await b.close(); return; }
  const dur=await p.evaluate(()=>window.__dur), fps=30, sub=4, n=Math.round(dur*fps*sub);
  const dir=path.join(__dirname,'frames2-'+v); fs.rmSync(dir,{recursive:true,force:true}); fs.mkdirSync(dir);
  const t0=Date.now();
  for(let i=0;i<n;i++){ await p.evaluate(t=>render(t),i/(fps*sub)); await p.screenshot({path:path.join(dir,String(i).padStart(5,'0')+'.jpg'),type:'jpeg',quality:92}); if(i%240==0)console.log(v,i,'/',n,((Date.now()-t0)/1000|0)+'s'); }
  await b.close();
  execSync(`ffmpeg -y -loglevel error -framerate ${fps*sub} -i ${dir}/%05d.jpg -f lavfi -i anullsrc=r=48000:cl=stereo -vf "tmix=frames=${sub},select='eq(mod(n\\,${sub})\\,${sub-1})',setpts=N/${fps}/TB" -r ${fps} -shortest -c:v libx264 -preset slow -crf 18 -pix_fmt yuv420p -c:a aac -b:a 128k -movflags +faststart ${a2}`);
  fs.rmSync(dir,{recursive:true,force:true});
  console.log('done',a2,dur+'s');
})();
