// Send the Golf & Games Classic emails with Resend.
//
// Test to one person:
//   node send.mjs --template save-the-date --to you@example.org --from "Golf & Games Classic <events@yourdomain.org>"
// Broadcast to a Resend audience:
//   node send.mjs --template save-the-date --audience <AUDIENCE_ID> --from "Golf & Games Classic <events@yourdomain.org>" [--send]
//
// Env: RESEND_API_KEY, ASSET_BASE_URL (public folder that holds the images in ./assets, no trailing slash)

import { readFile } from 'node:fs/promises';
import { Resend } from 'resend';

const SUBJECTS = {
  'save-the-date': 'Save the date: Golf & Games Classic, March 12',
  reminder: 'Reminder: Save March 12 for the Golf & Games Classic',
};

function args() {
  const out = {};
  const a = process.argv.slice(2);
  for (let i = 0; i < a.length; i++) {
    if (!a[i].startsWith('--')) continue;
    const key = a[i].slice(2);
    const next = a[i + 1];
    if (next === undefined || next.startsWith('--')) out[key] = true;
    else { out[key] = next; i++; }
  }
  return out;
}

const opt = args();
const template = opt.template || 'save-the-date';
if (!SUBJECTS[template]) throw new Error(`Unknown --template "${template}". Use save-the-date or reminder.`);
if (!opt.from) throw new Error('Missing --from, e.g. --from "Golf & Games Classic <events@yourdomain.org>"');
if (!opt.to && !opt.audience) throw new Error('Give --to <email> for a test, or --audience <id> for a broadcast.');

const { RESEND_API_KEY, ASSET_BASE_URL } = process.env;
if (!RESEND_API_KEY) throw new Error('Set RESEND_API_KEY.');
if (!ASSET_BASE_URL) throw new Error('Set ASSET_BASE_URL to the public URL of the images folder.');

const base = ASSET_BASE_URL.replace(/\/$/, '');
const dir = new URL(`./${template}/`, import.meta.url);
const fill = (s) => s.replaceAll('{{ASSET_BASE_URL}}', base);
const html = fill(await readFile(new URL('index.html', dir), 'utf8'));
const text = fill(await readFile(new URL('index.txt', dir), 'utf8'));
const subject = opt.subject || SUBJECTS[template];

const resend = new Resend(RESEND_API_KEY);

if (opt.audience) {
  const { data, error } = await resend.broadcasts.create({
    audienceId: opt.audience, from: opt.from, subject, html, text, name: `${template} ${new Date().toISOString().slice(0, 10)}`,
  });
  if (error) throw new Error(JSON.stringify(error));
  console.log(`Broadcast created: ${data.id}`);
  if (opt.send) {
    const res = await resend.broadcasts.send(data.id);
    if (res.error) throw new Error(JSON.stringify(res.error));
    console.log('Broadcast sent.');
  } else {
    console.log('Not sent yet. Review it in the Resend dashboard, or run again with --send.');
  }
} else {
  // A single test email: the unsubscribe placeholder only works in broadcasts, so show a note instead.
  const testHtml = html.replaceAll('{{{RESEND_UNSUBSCRIBE_URL}}}', '#');
  const testText = text.replaceAll('{{{RESEND_UNSUBSCRIBE_URL}}}', '(unsubscribe link appears in the real broadcast)');
  const { data, error } = await resend.emails.send({
    from: opt.from, to: String(opt.to).split(','), subject: `[TEST] ${subject}`, html: testHtml, text: testText,
  });
  if (error) throw new Error(JSON.stringify(error));
  console.log(`Test sent: ${data.id}`);
}
