const { chromium } = require('playwright');
const S=process.argv[2]||'';
(async()=>{
  const b=await chromium.launch();
  const shot=async(f,w,h,scale,out,pdf)=>{
    const p=await b.newPage({viewport:{width:w,height:h},deviceScaleFactor:scale});
    await p.goto('file://'+__dirname+'/'+f); await p.evaluate(()=>document.fonts.ready);
    await p.waitForLoadState('networkidle'); await p.waitForTimeout(400);
    await p.locator('.page').screenshot({path:out});
    if(pdf) await p.pdf({path:pdf,width:'8.5in',height:'11in',printBackground:true,preferCSSPageSize:true});
    await p.close();
  };
  if(S==='check'){
    await shot('flyer.html',816,1056,0.6,'/tmp/claude-0/-home-user-golf2026/5f6b10c1-f89f-5b0b-8da6-8bd032f87899/scratchpad/std-flyer.png');
    await shot('square.html',1080,1350,0.45,'/tmp/claude-0/-home-user-golf2026/5f6b10c1-f89f-5b0b-8da6-8bd032f87899/scratchpad/std-sq.png');
    await shot('email-header.html',600,400,1,'/tmp/claude-0/-home-user-golf2026/5f6b10c1-f89f-5b0b-8da6-8bd032f87899/scratchpad/std-em.png');
  } else {
    await shot('flyer.html',816,1056,3.125,'save-the-date-flyer.png','save-the-date-flyer.pdf');
    await shot('square.html',1080,1350,1,'save-the-date-1080x1350.png');
    await shot('email-header.html',600,400,2,'save-the-date-email-header.png');
  }
  await b.close();
})();
