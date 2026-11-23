const {chromium}=require('playwright');const P=require('./build.js');
(async()=>{const b=await chromium.launch();
 for(const p of P){const pg=await b.newPage({viewport:{width:p.w,height:p.h},deviceScaleFactor:1});
  await pg.goto('file://'+__dirname+`/${p.dir}-${p.name}.html`,{waitUntil:'networkidle'});await pg.evaluate(()=>document.fonts.ready);await pg.waitForTimeout(200);
  await pg.screenshot({path:`${__dirname}/../${p.dir}/${p.name}.png`});await pg.close();}
 await b.close();})();
