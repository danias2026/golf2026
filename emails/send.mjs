// Send the Golf & Games Classic emails with Resend (REST API, no SDK needed).
//
// RULE: every email is tested first. A test goes ONLY to DaniaS@marjcc.org. A real send
// (to anyone else, or to an audience) is refused until Dania approved that exact test
// (same HTML, subject and sender) and you pass --approved.
//
//   node send.mjs --template save-the-date --test
//   node send.mjs --template save-the-date --to persona@ejemplo.org --approved
//   node send.mjs --template save-the-date --audience <AUDIENCE_ID> --approved [--send]
//
// Options:
//   --template save-the-date|reminder   (default save-the-date)
//   --sender info|roxana                (default info) · --from "Name <x@y>" overrides it
//   --subject "..."                     override the default subject
//   --inline-images / --no-inline-images  attach ./assets as inline images (cid:). Default on for --test.
//   --dry-run                           show what would happen; call no API and record nothing
//
// Env: RESEND_API_KEY (injected by the network proxy; defaults to "proxy-injected"),
//      ASSET_BASE_URL (public folder with ./assets, no trailing slash; needed without inline images)

import { readFile, writeFile, mkdir, appendFile, readdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';

const TEST_ADDRESS = 'DaniaS@marjcc.org';
const SENDERS = {
  info: 'Golf & Games Classic <info@marjcc.org>',
  roxana: 'Roxana · MARJCC <roxanam@marjcc.org>',
};
const SUBJECTS = {
  'save-the-date': 'Save the date: Golf & Games Classic, March 12',
  reminder: 'Reminder: Save March 12 for the Golf & Games Classic',
};
const DEFAULT_SENDER = { 'save-the-date': 'info', reminder: 'info' };
const API = 'https://api.resend.com';
const HERE = new URL('./', import.meta.url);
const APPROVALS = new URL('./.approvals/', HERE);
const PENDING = new URL('pending.json', APPROVALS);
const SENT_LOG = new URL('sent.log', APPROVALS);

function fail(msg) { console.error(`\n✗ ${msg}\n`); process.exit(1); }

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
if (!SUBJECTS[template]) fail(`Plantilla desconocida "${template}". Usa save-the-date o reminder.`);

const senderKey = opt.sender || DEFAULT_SENDER[template];
if (!opt.from && !SENDERS[senderKey]) fail(`Remitente desconocido "${senderKey}". Usa --sender info o --sender roxana, o --from "Nombre <correo>".`);
const from = typeof opt.from === 'string' ? opt.from : SENDERS[senderKey];
const subject = typeof opt.subject === 'string' ? opt.subject : SUBJECTS[template];

const toList = typeof opt.to === 'string' ? opt.to.split(',').map((s) => s.trim()).filter(Boolean) : [];
const isTestAddress = (a) => a.toLowerCase() === TEST_ADDRESS.toLowerCase();
const isTest = Boolean(opt.test) || (toList.length > 0 && toList.every(isTestAddress) && !opt.audience);
if (opt.test && (opt.audience || toList.some((a) => !isTestAddress(a)))) {
  fail(`--test solo envía a ${TEST_ADDRESS}. Quita --to / --audience.`);
}
if (!isTest && !toList.length && !opt.audience) {
  fail(`Primero envía una prueba con --test y espera la aprobación de Dania.\n  node send.mjs --template ${template} --test`);
}

const dir = new URL(`./${template}/`, HERE);
const rawHtml = await readFile(new URL('index.html', dir), 'utf8');
const rawText = await readFile(new URL('index.txt', dir), 'utf8');

// The approval fingerprint: the template's HTML as built, the subject and the sender.
const hash = createHash('sha256').update(rawHtml).update('\n--subject--\n').update(subject).update('\n--from--\n').update(from).digest('hex');

async function readPending() {
  try { return JSON.parse(await readFile(PENDING, 'utf8')); } catch { return []; }
}

// ---- real send: approval gate ----
const pending = isTest ? [] : await readPending();
const match = pending.find((p) => p.template === template && p.hash === hash);
if (!isTest && !opt.approved) {
  fail(`Envío real bloqueado. Primero envía una prueba con --test y espera la aprobación de Dania.\nCuando Dania la apruebe, vuelve a correr este comando con --approved.`);
}
if (!isTest && !match) {
  fail(`No hay una prueba aprobada para esta versión exacta (plantilla, HTML, asunto y remitente).\n` +
    `Si cambiaste algo después de la prueba, primero envía una prueba con --test y espera la aprobación de Dania.\n` +
    `  node send.mjs --template ${template}${opt.sender ? ` --sender ${opt.sender}` : ''} --test`);
}

// ---- images ----
const inline = opt['no-inline-images'] ? false : (opt['inline-images'] ? true : isTest);
if (opt.audience && inline) fail('Los broadcasts no admiten imágenes adjuntas. Quita --inline-images y define ASSET_BASE_URL.');
const base = (process.env.ASSET_BASE_URL || '').replace(/\/$/, '');
if (!inline && !base) fail('Define ASSET_BASE_URL con la URL pública de la carpeta assets/ (o usa --inline-images para un envío individual).');

let html = rawHtml;
let text = rawText;
const attachments = [];
if (inline) {
  const files = (await readdir(new URL('./assets/', HERE))).filter((f) => /\.(png|jpe?g|gif)$/i.test(f));
  for (const f of files) {
    const token = `{{ASSET_BASE_URL}}/${f}`;
    if (!html.includes(token)) continue;
    const cid = f.replace(/[^a-z0-9]/gi, '-').toLowerCase();
    html = html.replaceAll(token, `cid:${cid}`);
    const content = (await readFile(new URL(`./assets/${f}`, HERE))).toString('base64');
    attachments.push({ filename: f, content, content_id: cid });
  }
  text = text.replaceAll('{{ASSET_BASE_URL}}', '');
} else {
  html = html.replaceAll('{{ASSET_BASE_URL}}', base);
  text = text.replaceAll('{{ASSET_BASE_URL}}', base);
}
if (html.includes('{{ASSET_BASE_URL}}')) fail('Quedó una imagen sin resolver en el HTML. Revisa assets/.');

// ---- API ----
const KEY = process.env.RESEND_API_KEY || 'proxy-injected';
async function api(path, body) {
  const res = await fetch(`${API}${path}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) fail(`Resend respondió ${res.status}: ${JSON.stringify(data)}`);
  return data;
}

const summary = (to) => [
  `  Plantilla: ${template}`,
  `  De:        ${from}`,
  `  Para:      ${to}`,
  `  Asunto:    ${isTest ? '[TEST] ' : ''}${subject}`,
  `  Imágenes:  ${inline ? `adjuntas (${attachments.length})` : base}`,
  `  Huella:    ${hash.slice(0, 12)}`,
].join('\n');

// ---- test send ----
if (isTest) {
  const testHtml = html.replaceAll('{{{RESEND_UNSUBSCRIBE_URL}}}', '#');
  const testText = text.replaceAll('{{{RESEND_UNSUBSCRIBE_URL}}}', '(el link para darse de baja aparece en el envío real)');
  console.log(`Prueba para ${TEST_ADDRESS}\n${summary(TEST_ADDRESS)}`);
  if (opt['dry-run']) { console.log('\n(dry-run: no se envió nada ni se registró la prueba)'); process.exit(0); }
  const data = await api('/emails', {
    from, to: [TEST_ADDRESS], subject: `[TEST] ${subject}`, html: testHtml, text: testText,
    ...(attachments.length ? { attachments } : {}),
  });
  await mkdir(APPROVALS, { recursive: true });
  const pending = (await readPending()).filter((p) => !(p.template === template && p.hash === hash));
  pending.push({ template, hash, subject, from, testedAt: new Date().toISOString(), emailId: data.id });
  await writeFile(PENDING, JSON.stringify(pending, null, 2) + '\n');
  console.log(`\n✓ Prueba enviada a ${TEST_ADDRESS} (id ${data.id}).`);
  console.log('Espera la aprobación de Dania. Cuando la apruebe, repite el envío real con --approved,');
  console.log('sin cambiar el HTML, el asunto ni el remitente.');
  process.exit(0);
}

async function markSent(detail) {
  await mkdir(APPROVALS, { recursive: true });
  await writeFile(PENDING, JSON.stringify(pending.filter((p) => p !== match), null, 2) + '\n');
  await appendFile(SENT_LOG, JSON.stringify({ ...match, approved: true, sentAt: new Date().toISOString(), ...detail }) + '\n');
}

if (opt.audience) {
  console.log(`Broadcast aprobado (prueba del ${match.testedAt})\n${summary(`audience ${opt.audience}`)}`);
  if (opt['dry-run']) { console.log('\n(dry-run: no se creó ni envió nada)'); process.exit(0); }
  const data = await api('/broadcasts', {
    audience_id: opt.audience, from, subject, html, text, name: `${template} ${new Date().toISOString().slice(0, 10)}`,
  });
  console.log(`✓ Broadcast creado: ${data.id}`);
  if (opt.send) {
    await api(`/broadcasts/${data.id}/send`, {});
    await markSent({ broadcastId: data.id, audience: opt.audience });
    console.log('✓ Broadcast enviado. Quedó registrado en .approvals/sent.log.');
  } else {
    console.log('Quedó como borrador en Resend. Revísalo allí, o vuelve a correr con --approved --send para enviarlo.');
  }
} else {
  const realHtml = html.replaceAll('{{{RESEND_UNSUBSCRIBE_URL}}}', '#');
  const realText = text.replaceAll('{{{RESEND_UNSUBSCRIBE_URL}}}', '');
  console.log(`Envío aprobado (prueba del ${match.testedAt})\n${summary(toList.join(', '))}`);
  if (opt['dry-run']) { console.log('\n(dry-run: no se envió nada)'); process.exit(0); }
  const data = await api('/emails', {
    from, to: toList, subject, html: realHtml, text: realText, ...(attachments.length ? { attachments } : {}),
  });
  await markSent({ emailId: data.id, to: toList });
  console.log(`✓ Enviado (id ${data.id}). Quedó registrado en .approvals/sent.log.`);
}
