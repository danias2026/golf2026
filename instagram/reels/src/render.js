// Usage (from instagram/reels/):
//   node src/render.js std|riv|loop out.mp4        render a video (4 subframes per frame, 30 fps)
//   node src/render.js std|riv|loop --still T out.png   render one frame at time T (seconds)
// Frames go to a temp folder outside the repo and are deleted after encoding.
const { chromium } = require('playwright');
const { execFileSync } = require('child_process');
const fs = require('fs'), path = require('path'), os = require('os');

const DUR = { std: 14, riv: 12, loop: 6 };
const SIZE = { std: [1080, 1920], riv: [1080, 1920], loop: [1080, 1350] };
const SUB = 4, FPS = 30;

(async () => {
  const [mode, a2, a3, a4] = process.argv.slice(2);
  const [w, h] = SIZE[mode];
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: w, height: h } });
  await p.goto('file://' + path.join(__dirname, 'stage.html') + '?m=' + mode);
  await p.waitForFunction(() => window.__ready);
  await p.waitForTimeout(500);
  if (a2 === '--still') {
    await p.evaluate(t => window.renderAt(t), parseFloat(a3));
    await p.screenshot({ path: a4, clip: { x: 0, y: 0, width: w, height: h } });
    await b.close(); return;
  }
  const out = path.resolve(a2);
  const tmp = fs.mkdtempSync(path.join(process.env.FRAMES_DIR || os.tmpdir(), 'frames-' + mode + '-'));
  const n = Math.round(DUR[mode] * FPS * SUB);
  for (let i = 0; i < n; i++) {
    const t = i / (FPS * SUB);
    await p.evaluate(t => window.renderAt(t), t);
    await p.screenshot({ path: path.join(tmp, String(i).padStart(5, '0') + '.jpg'), type: 'jpeg', quality: 94, clip: { x: 0, y: 0, width: w, height: h } });
    if (i % 240 === 0) console.log(mode, i, '/', n);
  }
  await b.close();
  execFileSync('ffmpeg', ['-loglevel', 'error', '-y', '-framerate', String(FPS * SUB), '-i', path.join(tmp, '%05d.jpg'),
    '-f', 'lavfi', '-i', 'anullsrc=r=48000:cl=stereo',
    '-vf', `tmix=frames=${SUB},select='not(mod(n+1\\,${SUB}))',setpts=N/${FPS}/TB`, '-r', String(FPS),
    '-c:v', 'libx264', '-preset', 'slow', '-crf', '18', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '128k',
    '-shortest', '-movflags', '+faststart', out], { stdio: 'inherit' });
  fs.rmSync(tmp, { recursive: true, force: true });
  console.log('done', out);
})();
