// Save the Date in the Instagram master look: letter flyer (PDF + PNG) and 1080x1350.
const path=require('path');const {chromium}=require('playwright');const H=require('./ig.js');
const {sunset,hosts,gmjf,plaque,LOGO}=H;
const out=f=>path.join(__dirname,'..',f);

// Letter flyer: designed at 1080 x 1398 (8.5 x 11), printed at scale 816/1080.
const FW=1080,FH=1398;
H.page(path.join(__dirname,'flyer.html'),FW,FH,`
${sunset(FW,FH,690,540,460,130,{seed:21,waveY:1010,bk:30})}
${hosts(56)}
<div class="col" style="top:168px;gap:0">
 <div class="disp" style="font-size:104px;line-height:1">Save the Date</div>
 <div class="logo" style="width:660px;margin-top:16px"><img src="${LOGO}" alt="Golf & Games Classic"></div>
 <div class="date" style="font-size:72px;margin-top:22px">Friday, March 12, 2027</div>
 <div class="caps aqua" style="font-size:24px;letter-spacing:.3em;margin-top:12px">Miami Beach Golf Club</div>
 <div class="hair" style="width:720px;margin:20px 0 16px"></div>
 <div class="eb" style="font-size:22px">Golf &amp; Mahjong Tournament</div>
 <div class="disp" style="font-size:44px;margin-top:12px">Two JCCs. One Tournament.<br><span class="red">One Friendly Rivalry!</span></div>
 <div class="caps" style="font-size:22px;letter-spacing:.14em;margin-top:14px">Team MARJCC <span class="vs">vs.</span> Team MBJCC</div>
 <div style="display:flex;gap:64px;margin-top:18px;align-items:flex-start">
  <div><div class="eb" style="font-size:20px">Golf</div><div class="disp goldtxt" style="font-size:34px;margin-top:6px">May the best team win!</div></div>
  <div><div class="eb" style="font-size:20px">Mahjong</div><div class="disp goldtxt" style="font-size:34px;margin-top:6px">Everyone plays together!</div></div>
 </div>
 <div class="caps" style="font-size:22px;letter-spacing:.14em;margin-top:18px">Two communities. One unforgettable day!</div>
 <div style="font-size:20px;margin-top:6px;opacity:.85">More details coming soon!</div>
</div>
${gmjf(34)}`);

// 1080 x 1350
H.page(path.join(__dirname,'square.html'),1080,1350,`
${sunset(1080,1350,860,540,560,150,{seed:21,waveY:1110})}
${hosts(64)}
<div class="col" style="top:190px;gap:0">
 <div class="disp" style="font-size:132px;line-height:1">Save the Date</div>
 <div class="logo" style="width:900px;margin-top:22px"><img src="${LOGO}" alt="Golf & Games Classic"></div>
 <div class="date" style="font-size:104px;margin-top:34px">March 12, 2027</div>
 <div class="hair" style="width:720px;margin:24px 0 20px"></div>
 <div class="caps" style="font-size:32px;letter-spacing:.2em">Golf &amp; Mahjong Tournament</div>
 <div class="caps aqua" style="font-size:26px;letter-spacing:.3em;margin-top:12px">Miami Beach Golf Club</div>
</div>
${gmjf(44)}`);

(async()=>{const b=await chromium.launch();const check=process.argv[2]==='check';
 const shot=async(f,w,h,scale,png,pdf)=>{const p=await b.newPage({viewport:{width:w,height:h},deviceScaleFactor:scale});
  await p.goto('file://'+path.join(__dirname,f),{waitUntil:'networkidle'});await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(300);
  await p.screenshot({path:png});
  if(pdf)await p.pdf({path:pdf,width:'8.5in',height:'11in',scale:816/1080,printBackground:true,pageRanges:'1'});await p.close()};
 const S='/tmp/claude-0/-home-user-golf2026/5f6b10c1-f89f-5b0b-8da6-8bd032f87899/scratchpad/';
 if(check){await shot('flyer.html',FW,FH,.5,S+'f.png');await shot('square.html',1080,1350,.5,S+'s.png')}
 else{await shot('flyer.html',FW,FH,2550/1080,out('save-the-date-flyer.png'),out('save-the-date-flyer.pdf'));await shot('square.html',1080,1350,1,out('save-the-date-1080x1350.png'))}
 await b.close()})();
