const { chromium } = require('playwright');
const fs=require('fs'),path=require('path'),{execSync}=require('child_process');
// usage: node render.js v out.mp4 [fps] | node render.js v --still t out.png
(async()=>{
  const [v,a2,a3,a4]=process.argv.slice(2);
  const H=v==='loop'?1350:1920;
  const b=await chromium.launch(); const p=await b.newPage({viewport:{width:1080,height:H},deviceScaleFactor:1});
  await p.goto('file://'+__dirname+'/stage.html?v='+v); await p.waitForFunction(()=>window.__ready,null,{timeout:60000}); await p.waitForTimeout(300);
  if(a2==='--still'){ await p.evaluate(t=>render(t),Number(a3)); await p.screenshot({path:a4}); await b.close(); return; }
  const dur=await p.evaluate(()=>window.__dur), fps=30, n=Math.round(dur*fps);
  const dir=path.join(__dirname,'frames-'+v); fs.rmSync(dir,{recursive:true,force:true}); fs.mkdirSync(dir);
  for(let i=0;i<n;i++){ await p.evaluate(t=>render(t),i/fps); await p.screenshot({path:path.join(dir,String(i).padStart(5,'0')+'.jpg'),type:'jpeg',quality:95}); }
  await b.close();
  execSync(`ffmpeg -y -loglevel error -framerate ${fps} -i ${dir}/%05d.jpg -f lavfi -i anullsrc=r=48000:cl=stereo -shortest -c:v libx264 -preset slow -crf 18 -pix_fmt yuv420p -c:a aac -b:a 128k -movflags +faststart ${a2}`);
  fs.rmSync(dir,{recursive:true,force:true});
  console.log('done',a2,dur+'s');
})();
