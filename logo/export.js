const { chromium } = require('playwright');
(async()=>{
  const b=await chromium.launch();
  const p=await b.newPage({viewport:{width:1600,height:1080},deviceScaleFactor:3});
  await p.goto('file://'+__dirname+'/logo.html'); await p.waitForFunction(()=>window.__ready); await p.waitForTimeout(500);
  await p.locator('#logo').screenshot({path:'golf-games-classic-logo.png',omitBackground:true});
  await p.pdf({path:'golf-games-classic-logo.pdf',width:'1600px',height:'1080px',printBackground:true,pageRanges:'1'});
  // standalone SVG with fonts referenced
  const svg=await p.evaluate(()=>{const s=document.getElementById('logo').cloneNode(true);
    const st=document.createElementNS('http://www.w3.org/2000/svg','style');
    st.textContent="@import url('https://fonts.googleapis.com/css2?family=Limelight&family=Josefin+Sans:wght@600;700&family=Playfair+Display:ital,wght@1,700;1,900&family=Noto+Serif+TC:wght@900&display=swap');";
    s.insertBefore(st,s.firstChild); return new XMLSerializer().serializeToString(s);});
  require('fs').writeFileSync('golf-games-classic-logo.svg',svg);
  await b.close();
})();
