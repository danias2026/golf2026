// Sends ONLY a test of this exploration to DaniaS@marjcc.org (images inline).
import fs from 'node:fs'; import path from 'node:path';
const dir = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
let html = fs.readFileSync(path.join(dir, 'index.html'), 'utf8');
const attachments = [];
for (const f of fs.readdirSync(path.join(dir, 'images'))) {
  const token = `images/${f}`; if (!html.includes(token)) continue;
  const cid = f.replace(/[^a-z0-9]/gi, '-');
  html = html.replaceAll(token, `cid:${cid}`);
  attachments.push({ filename: f, content: fs.readFileSync(path.join(dir, 'images', f)).toString('base64'), content_id: cid });
}
html = html.replace('{{{RESEND_UNSUBSCRIBE_URL}}}', '#');
// Usage: node src/send-test.mjs [--to a@x,b@y] [--subject "..."]  (defaults: Dania only, [TEST] subject)
const arg = (k) => { const i = process.argv.indexOf(k); return i > -1 ? process.argv[i + 1] : null; };
const to = (arg('--to') || 'DaniaS@marjcc.org').split(',').map(s => s.trim());
const subject = arg('--subject') || '[TEST] Art Deco v2 · Save the date: Golf & Games Classic, March 12';
console.log('To:', to.join(', '), '| Subject:', subject);
const body = { from: 'Golf & Games Classic <info@marjcc.org>', to, subject, html, attachments };
const r = await fetch('https://api.resend.com/emails', { method: 'POST',
  headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY || 'proxy-injected'}`, 'Content-Type': 'application/json' },
  body: JSON.stringify(body) });
console.log(r.status, await r.text());
