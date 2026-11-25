// Felt-design Instagram posts & stories. Usage: node src/build.js [name]
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
const A = path.resolve(__dirname, '../../brand/assets/felt');
const OUT = path.resolve(__dirname, '..');

const css = `
:root{--gold:#DEC000;--frame:#D8C012;--silver:#B4BAB4;--white:#F4F3EE}
*{box-sizing:border-box}html,body{margin:0}
.c{position:relative;overflow:hidden;color:var(--white);font-family:'Bebas Neue',Impact,sans-serif}
.felt{position:absolute;inset:0;width:100%;height:100%}
.frame{position:absolute;border:3px solid var(--frame)}
.abs{position:absolute;left:0;right:0;text-align:center}
.caps{letter-spacing:.32em;text-indent:.32em}
.serif{font-family:'Playfair Display',Georgia,serif;font-weight:400;line-height:.95}
.gold{color:var(--gold)}
.goldg{background:linear-gradient(100deg,#C9A800 0%,#DEC000 35%,#FFF3A0 47%,#DEC000 58%,#B99A00 100%);-webkit-background-clip:text;background-clip:text;color:transparent}
.amp{font-family:'Playfair Display',Georgia,serif;color:var(--silver)}
.rule{position:absolute;height:2px;background:rgba(244,243,238,.55)}
.photo{position:absolute;background-image:url(${A}/photo-temp.jpg);background-repeat:no-repeat;
 -webkit-mask-image:radial-gradient(ellipse 50% 50% at 50% 50%,#000 62%,transparent 100%);mask-image:radial-gradient(ellipse 50% 50% at 50% 50%,#000 62%,transparent 100%)}
.nowrap{white-space:nowrap}
.dust{position:absolute;inset:0;pointer-events:none}
`;
const felt = (w,h,seed=7) => `<svg class="felt" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none">
<filter id="n${seed}"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="${seed}"/><feColorMatrix values="0 0 0 0 .30  0 0 0 0 .34  0 0 0 0 .29  0 0 0 .55 0"/></filter>
<radialGradient id="v${seed}" cx="50%" cy="45%" r="72%"><stop offset="0" stop-color="#555C4F"/><stop offset=".55" stop-color="#4B5247"/><stop offset="1" stop-color="#343A34"/></radialGradient>
<rect width="${w}" height="${h}" fill="url(#v${seed})"/><rect width="${w}" height="${h}" filter="url(#n${seed})" opacity=".45"/></svg>`;
const dust = (w,h,n=26,seed=3) => { let s='',r=seed; const rnd=()=>{r=(r*9301+49297)%233280;return r/233280};
  for(let i=0;i<n;i++){const x=rnd()*w,y=rnd()*h,rr=1+rnd()*2.4,o=.25+rnd()*.5; s+=`<circle cx="${x}" cy="${y}" r="${rr}" fill="#F3E08A" opacity="${o}"/>`;}
  return `<svg class="dust" viewBox="0 0 ${w} ${h}">${s}</svg>`; };
const logosTop = (w,y=70,inset=70,h1=76,h2=60) => `<img src="${A}/marjcc-white.png" style="position:absolute;left:${inset}px;top:${y}px;height:${h1}px"><img src="${A}/mbjcc-white.png" style="position:absolute;right:${inset}px;top:${y+8}px;height:${h2}px">`;
const gmjf = (w,y,h=46) => `<img src="${A}/gmjf-logo-white.png" style="position:absolute;left:${(w-h*2.1)/2}px;top:${y}px;height:${h}px">`;
const title = (y,size) => `<div class="abs serif goldg nowrap" style="top:${y}px;font-size:${size}px">GOLF<span class="amp" style="font-size:${size*1.2}px;margin:0 -${size*.05}px;position:relative;top:${size*.08}px">&amp;</span>GAMES</div><div class="abs serif goldg" style="top:${y+size*.84}px;font-size:${size}px">CLASSIC</div>`;
const photo = (x,y,w,h,size,pos) => `<div class="photo" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px;background-size:${size};background-position:${pos}"></div>`;
const spot = (x,y,r) => `<div style="position:absolute;left:${x-r}px;top:${y-r}px;width:${2*r}px;height:${2*r}px;border-radius:50%;background:radial-gradient(circle,rgba(255,248,220,.16),transparent 70%)"></div>`;

const P = {W:1080,H:1350}, S = {W:1080,H:1920};
const pieces = {
'posts/01-save-the-date': [P, () => `${felt(1080,1350,1)}<div class="frame" style="inset:36px"></div>${logosTop(1080,64,72,70,54)}
 <div class="abs caps" style="top:160px;font-size:30px">Two JCCs. One Tournament.</div>
 ${title(196,92)}
 <div class="abs caps" style="top:386px;font-size:30px">MARJCC <span class="gold">vs.</span> MBJCC</div>
 ${spot(540,640,260)}${photo(60,430,960,430,'960px auto','center')}
 <div class="abs serif nowrap" style="top:860px;font-size:112px">SAVE THE DATE</div>
 <div class="abs caps gold" style="top:990px;font-size:50px;letter-spacing:.12em;text-indent:.12em">Friday &nbsp;|&nbsp; March 12, 2027</div>
 <div class="abs caps" style="top:1056px;font-size:30px;letter-spacing:.16em;text-indent:.16em">Miami Beach Golf Club</div>
 <div class="rule" style="left:300px;right:300px;top:1118px"></div>
 <div class="abs caps" style="top:1134px;font-size:26px;letter-spacing:.2em;text-indent:.2em">Golf &nbsp;•&nbsp; Mahjong</div>
 ${gmjf(1080,1236,44)}${dust(1080,1350)}`],
'posts/02-friendly-rivalry': [P, () => `${felt(1080,1350,2)}<div class="frame" style="inset:36px"></div>${logosTop(1080,64,72,70,54)}
 <div class="abs serif" style="top:220px;font-size:150px;color:var(--white)">Two JCCs.</div>
 <div class="abs serif goldg" style="top:390px;font-size:118px">One Tournament.</div>
 <div class="abs serif" style="top:540px;font-size:92px;font-style:italic;color:var(--silver)">One Friendly Rivalry!</div>
 <div class="rule" style="left:180px;right:180px;top:700px"></div>
 <div class="abs caps" style="top:722px;font-size:40px">Team MARJCC &nbsp;<span class="gold">vs.</span>&nbsp; Team MBJCC</div>
 <div class="rule" style="left:180px;right:180px;top:784px"></div>
 ${photo(40,820,1000,400,'1000px auto','center 55%')}
 ${gmjf(1080,1236,44)}${dust(1080,1350,30,9)}`],
'posts/03-golf': [P, () => `${felt(1080,1350,3)}<div class="frame" style="inset:36px"></div>${logosTop(1080,64,72,70,54)}
 ${spot(540,560,420)}${photo(40,170,1000,820,'2050px auto','50% 58%')}
 <div class="abs caps gold" style="top:960px;font-size:54px;letter-spacing:.5em;text-indent:.5em">Golf</div>
 <div class="abs serif" style="top:1036px;font-size:80px">May the best team win!</div>
 <div class="abs caps" style="top:1150px;font-size:26px;letter-spacing:.2em;text-indent:.2em">Golf &amp; Games Classic &nbsp;•&nbsp; March 12, 2027</div>
 ${gmjf(1080,1236,44)}${dust(1080,1350,22,4)}`],
'posts/04-mahjong': [P, () => `${felt(1080,1350,4)}<div class="frame" style="inset:36px"></div>${logosTop(1080,64,72,70,54)}
 ${spot(540,560,420)}${photo(40,170,1000,820,'2500px auto','2% 78%')}
 <div class="abs caps gold" style="top:960px;font-size:54px;letter-spacing:.5em;text-indent:.5em">Mahjong</div>
 <div class="abs serif" style="top:1036px;font-size:74px">Everyone plays together!</div>
 <div class="abs caps" style="top:1150px;font-size:26px;letter-spacing:.2em;text-indent:.2em">Golf &amp; Games Classic &nbsp;•&nbsp; March 12, 2027</div>
 ${gmjf(1080,1236,44)}${dust(1080,1350,22,5)}`],
'posts/05-pick-your-team': [P, () => `${felt(1080,1350,5)}<div class="frame" style="inset:36px"></div>
 <div class="abs serif goldg" style="top:110px;font-size:128px">Pick Your Team</div>
 <div class="abs caps" style="top:270px;font-size:30px">Golf &amp; Games Classic &nbsp;•&nbsp; March 12, 2027</div>
 <div style="position:absolute;left:539px;top:380px;width:2px;height:620px;background:linear-gradient(transparent,var(--frame),transparent)"></div>
 <img src="${A}/marjcc-white.png" style="position:absolute;left:150px;top:470px;height:150px">
 <div style="position:absolute;left:60px;width:420px;top:680px;text-align:center" class="caps"><div style="font-size:40px">Team</div><div class="gold" style="font-size:84px;letter-spacing:.14em;text-indent:.14em">MARJCC</div></div>
 <img src="${A}/mbjcc-white.png" style="position:absolute;left:615px;top:500px;height:110px">
 <div style="position:absolute;left:600px;width:420px;top:680px;text-align:center" class="caps"><div style="font-size:40px">Team</div><div class="gold" style="font-size:84px;letter-spacing:.14em;text-indent:.14em">MBJCC</div></div>
 <div style="position:absolute;left:465px;top:600px;width:150px;height:150px;border-radius:50%;background:#3E453C;border:3px solid var(--frame);display:flex;align-items:center;justify-content:center" class="serif"><span class="goldg" style="font-size:78px;font-style:italic;position:relative;top:-6px">vs.</span></div>
 <div class="abs serif" style="top:1060px;font-size:60px;font-style:italic;color:var(--silver)">Which team are you on?</div>
 ${gmjf(1080,1236,44)}${dust(1080,1350,24,6)}`],
};
// carousel: one 3240x1350 panorama cut into three slides
pieces['posts/carousel'] = [{W:3240,H:1350,split:3}, () => `${felt(3240,1350,8)}
 <div style="position:absolute;left:36px;right:36px;top:36px;height:3px;background:var(--frame)"></div><div style="position:absolute;left:36px;right:36px;bottom:36px;height:3px;background:var(--frame)"></div>
 <div style="position:absolute;left:36px;top:36px;bottom:36px;width:3px;background:var(--frame)"></div><div style="position:absolute;right:36px;top:36px;bottom:36px;width:3px;background:var(--frame)"></div>
 ${[0,1080,2160].map(x=>`<div style="position:absolute;left:${x}px;width:1080px;top:0;height:1350px">${logosTop(1080,64,72,70,54)}${gmjf(1080,1236,44)}</div>`).join('')}
 <div style="position:absolute;left:0;width:1080px;top:0;height:1350px">
  <div class="abs caps" style="top:240px;font-size:32px">Two JCCs. One Tournament.</div>${title(290,104)}
  <div class="abs caps" style="top:500px;font-size:32px">MARJCC <span class="gold">vs.</span> MBJCC</div>
  <div class="abs serif nowrap" style="top:640px;font-size:118px">SAVE THE</div><div class="abs serif nowrap" style="top:770px;font-size:118px">DATE</div>
  <div class="abs caps gold" style="top:930px;font-size:44px;letter-spacing:.14em;text-indent:.14em">Swipe &nbsp;&rarr;</div>
 </div>
 ${spot(1620,700,520)}${photo(1060,260,1120,720,'1120px auto','center')}
 <div style="position:absolute;left:1080px;width:1080px;top:0;height:1350px">
  <div class="abs caps gold" style="top:150px;font-size:44px;letter-spacing:.3em;text-indent:.3em">Golf &nbsp;•&nbsp; Mahjong</div>
  <div class="abs serif" style="top:1000px;font-size:58px">Golf: <span style="color:var(--silver);font-style:italic">May the best team win!</span></div>
  <div class="abs serif" style="top:1090px;font-size:58px">Mahjong: <span style="color:var(--silver);font-style:italic">Everyone plays together!</span></div>
 </div>
 <div style="position:absolute;left:2160px;width:1080px;top:0;height:1350px">
  <div class="abs caps" style="top:250px;font-size:44px;letter-spacing:.3em;text-indent:.3em">Friday</div>
  <div class="abs caps gold" style="top:300px;font-size:60px;letter-spacing:.3em;text-indent:.3em">March</div>
  <div class="abs serif goldg" style="top:360px;font-size:330px;line-height:1">12</div>
  <div class="abs caps gold" style="top:690px;font-size:60px;letter-spacing:.3em;text-indent:.3em">2027</div>
  <div class="rule" style="left:240px;right:240px;top:790px"></div>
  <div class="abs caps" style="top:812px;font-size:40px;letter-spacing:.16em;text-indent:.16em">Miami Beach Golf Club</div>
  <div class="abs caps" style="top:870px;font-size:30px;letter-spacing:.16em;text-indent:.16em">Team MARJCC <span class="gold">vs.</span> Team MBJCC</div>
  <div class="rule" style="left:240px;right:240px;top:924px"></div>
  <div class="abs serif" style="top:970px;font-size:50px;font-style:italic;color:var(--silver)">Two communities. One unforgettable day!</div>
  <div class="abs caps gold" style="top:1056px;font-size:26px;letter-spacing:.12em;text-indent:.12em">More details and sponsorship information coming soon!</div>
 </div>${dust(3240,1350,70,11)}`];
// stories
pieces['stories/01-save-the-date'] = [S, () => `${felt(1080,1920,12)}<div class="frame" style="left:40px;right:40px;top:230px;bottom:320px"></div>
 ${logosTop(1080,262,80,80,62)}
 <div class="abs caps" style="top:372px;font-size:34px">Two JCCs. One Tournament.</div>${title(418,104)}
 <div class="abs caps" style="top:630px;font-size:34px">MARJCC <span class="gold">vs.</span> MBJCC</div>
 ${spot(540,900,330)}${photo(50,680,980,500,'980px auto','center')}
 <div class="abs serif nowrap" style="top:1180px;font-size:122px">SAVE THE DATE</div>
 <div class="abs caps gold" style="top:1318px;font-size:56px;letter-spacing:.12em;text-indent:.12em">Friday &nbsp;|&nbsp; March 12, 2027</div>
 <div class="abs caps" style="top:1390px;font-size:34px;letter-spacing:.16em;text-indent:.16em">Miami Beach Golf Club</div>
 <div class="abs caps gold" style="top:1450px;font-size:25px;letter-spacing:.1em;text-indent:.1em">More details and sponsorship information coming soon!</div>
 ${gmjf(1080,1530,48)}${dust(1080,1920,34,13)}`];
pieces['stories/02-mark-your-calendar'] = [S, () => `${felt(1080,1920,14)}<div class="frame" style="left:40px;right:40px;top:230px;bottom:320px"></div>
 ${logosTop(1080,262,80,80,62)}
 <div class="abs serif" style="top:400px;font-size:112px">Mark Your</div><div class="abs serif goldg" style="top:510px;font-size:112px">Calendar</div>
 <div class="rule" style="left:260px;right:260px;top:660px"></div>
 <div class="abs caps" style="top:690px;font-size:48px;letter-spacing:.3em;text-indent:.3em">Friday</div>
 <div class="abs caps gold" style="top:750px;font-size:66px;letter-spacing:.3em;text-indent:.3em">March</div>
 ${spot(540,1000,300)}<div class="abs serif goldg" style="top:800px;font-size:400px;line-height:1">12</div>
 <div class="abs caps gold" style="top:1200px;font-size:66px;letter-spacing:.3em;text-indent:.3em">2027</div>
 <div class="rule" style="left:260px;right:260px;top:1290px"></div>
 <div class="abs caps" style="top:1316px;font-size:36px;letter-spacing:.14em;text-indent:.14em" ><span class="nowrap">Golf &amp; Games Classic</span></div>
 <div class="abs caps" style="top:1368px;font-size:32px;letter-spacing:.16em;text-indent:.16em">Miami Beach Golf Club</div>
 ${gmjf(1080,1530,48)}${dust(1080,1920,40,15)}`];
pieces['stories/03-which-team'] = [S, () => `${felt(1080,1920,16)}<div class="frame" style="left:40px;right:40px;top:230px;bottom:320px"></div>
 <div class="abs serif" style="top:300px;font-size:104px">Which Team</div><div class="abs serif goldg" style="top:410px;font-size:104px">Are You On?</div>
 <div class="abs caps" style="top:560px;font-size:30px">Golf &amp; Games Classic &nbsp;•&nbsp; March 12, 2027</div>
 <img src="${A}/marjcc-white.png" style="position:absolute;left:${(1080-260)/2}px;top:660px;height:162px">
 <div class="abs caps gold" style="top:840px;font-size:64px;letter-spacing:.16em;text-indent:.16em">Team MARJCC</div>
 <div style="position:absolute;left:465px;top:950px;width:150px;height:150px;border-radius:50%;background:#3E453C;border:3px solid var(--frame);display:flex;align-items:center;justify-content:center" class="serif"><span class="goldg" style="font-size:78px;font-style:italic;position:relative;top:-6px">vs.</span></div>
 <img src="${A}/mbjcc-white.png" style="position:absolute;left:${(1080-350)/2}px;top:1150px;height:120px">
 <div class="abs caps gold" style="top:1290px;font-size:64px;letter-spacing:.16em;text-indent:.16em">Team MBJCC</div>
 <div class="abs serif" style="top:1400px;font-size:44px;font-style:italic;color:var(--silver)">May the best team win!</div>
 ${gmjf(1080,1530,48)}${dust(1080,1920,30,17)}`];

(async () => {
  const only = process.argv[2];
  const b = await chromium.launch();
  for (const [name, [dim, fn]] of Object.entries(pieces)) {
    if (only && !name.includes(only)) continue;
    const html = `<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;1,400&family=Bebas+Neue&display=swap"><style>${css}</style></head><body><div class="c" id="c" style="width:${dim.W}px;height:${dim.H}px">${fn()}</div></body></html>`;
    const f = path.join(__dirname, name.replace('/', '-') + '.html'); fs.writeFileSync(f, html);
    const p = await b.newPage({ viewport: { width: dim.W, height: dim.H } });
    await p.goto('file://' + f); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(400);
    if (dim.split) { for (let i = 0; i < dim.split; i++) await p.screenshot({ path: path.join(OUT, `${name}-${i + 1}.png`), clip: { x: i * 1080, y: 0, width: 1080, height: dim.H } }); }
    else await p.screenshot({ path: path.join(OUT, name + '.png'), clip: { x: 0, y: 0, width: dim.W, height: dim.H } });
    await p.close();
  }
  await b.close();
})();
