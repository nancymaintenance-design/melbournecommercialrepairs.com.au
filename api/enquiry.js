'use strict';
const { createHash } = require('node:crypto');
const MAX_BODY = 4200000;
const MAX_PHOTOS = 5;
const MAX_PHOTO_BYTES = 3000000;
const RECIPIENT = 'elliservices.group@gmail.com';
const PRODUCTION_ORIGIN = 'https://melbournecommercialrepairscomau.vercel.app';
// Keep this catalogue aligned with the numeric contact select values in app.js.
const SERVICES = ['Building & General Maintenance', 'Roofing, Waterproofing & Remedial Works', 'Electrical & Lighting', 'Plumbing, Drainage & Gas', 'HVAC & Building Systems', 'Fire, Security & Access', 'Landscaping, Grounds & Irrigation', 'Signage & Wayfinding', 'Façade & High-Access Cleaning', 'Cleaning, Waste & Hygiene', 'Car Parks & External Works', 'Fit-outs, Refurbishments & Make Good'];
const SECTORS = ['Offices & Workplaces', 'Retail & Shopping Centres', 'Hospitality & Accommodation', 'Warehouses & Logistics', 'Industrial & Business Parks', 'Medical & Health Facilities', 'Education & Community', 'Commercial Common Areas'];
function invalid(code = 'invalid_fields') { const error = new Error(code); error.code = code; return error; }
function field(body, key, max, required = false) {
  const value = body[key] ?? '';
  if (typeof value !== 'string' || value.length > max || /[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]/.test(value) || (key !== 'details' && /[\r\n]/.test(value))) throw invalid();
  const clean = value.trim(); if (required && !clean) throw invalid(); return clean;
}
function photoAttachment(photo) {
  if (!photo || typeof photo.filename !== 'string' || photo.filename.length > 160 || typeof photo.content !== 'string' || !/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(photo.content)) throw invalid('invalid_photos');
  const bytes = Buffer.from(photo.content, 'base64');
  if (!bytes.length || bytes.length > MAX_PHOTO_BYTES || bytes.toString('base64') !== photo.content) throw invalid('invalid_photos');
  let extension;
  if (bytes.subarray(0, 3).equals(Buffer.from([0xff, 0xd8, 0xff]))) extension = 'jpg';
  else if (bytes.subarray(0, 8).equals(Buffer.from('89504e470d0a1a0a', 'hex'))) extension = 'png';
  else if (bytes.toString('ascii', 0, 4) === 'RIFF' && bytes.toString('ascii', 8, 12) === 'WEBP') extension = 'webp';
  else throw invalid('invalid_photos');
  const stem = photo.filename.replace(/\.[^.]*$/, '').replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 100) || 'site-photo';
  return { filename: `${stem}.${extension}`, content: photo.content, bytes: bytes.length };
}
function validate(body) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) throw invalid();
  if (body.website) throw invalid();
  const data = Object.fromEntries([['name', 100, true], ['phone', 50], ['email', 150, true], ['address', 250], ['details', 3000, true], ['region', 100], ['area', 100], ['service', 5, true], ['sector', 2], ['requestId', 36, true]].map(([key, max, required]) => [key, field(body, key, max, required)]));
  if (!/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(data.email) || !/^(?:[0-9]|1[01]|multi)$/.test(data.service) || !/^(?:[0-7])?$/.test(data.sector) || !/^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i.test(data.requestId)) throw invalid();
  if (!Array.isArray(body.photos) || body.photos.length > MAX_PHOTOS) throw invalid('invalid_photos');
  data.photos = body.photos.map(photoAttachment);
  if (data.photos.reduce((sum, photo) => sum + photo.bytes, 0) > MAX_PHOTO_BYTES) throw invalid('invalid_photos');
  return data;
}
function createHandler({ env = process.env, fetch: send = globalThis.fetch } = {}) {
  // Best-effort per-instance throttle. Deployments should also use Vercel Firewall rate limiting.
  const attempts = new Map();
  return async function handler(req, res) {
    res.setHeader('Cache-Control', 'no-store'); res.setHeader('X-Content-Type-Options', 'nosniff');
    const reply = (status, error) => res.status(status).json(error ? { ok: false, error } : { ok: true });
    if (req.method !== 'POST') { res.setHeader('Allow', 'POST'); return reply(405, 'method_not_allowed'); }
    const allowed = new Set([PRODUCTION_ORIGIN, ...[env.VERCEL_URL, env.VERCEL_BRANCH_URL, env.VERCEL_PROJECT_PRODUCTION_URL].filter(Boolean).map(host => `https://${host}`), ...(env.ENQUIRY_ALLOWED_ORIGINS || '').split(',').map(s => s.trim()).filter(Boolean)]);
    if (!allowed.has(req.headers.origin)) return reply(403, 'origin_not_allowed');
    if (!(req.headers['content-type'] || '').toLowerCase().startsWith('application/json')) return reply(415, 'json_required');
    if (Number(req.headers['content-length']) > MAX_BODY) return reply(413, 'payload_too_large');
    let body;
    try {
      const raw = typeof req.body === 'string' ? req.body : Buffer.isBuffer(req.body) ? req.body.toString('utf8') : JSON.stringify(req.body);
      if (!raw || Buffer.byteLength(raw) > MAX_BODY) return reply(413, 'payload_too_large');
      body = JSON.parse(raw);
    } catch { return reply(400, 'invalid_json'); }
    let data; try { data = validate(body); } catch (error) { return reply(400, error.code || 'invalid_fields'); }
    const now = Date.now();
    for (const [key, value] of attempts) if (value.until <= now) attempts.delete(key);
    const ipHash = createHash('sha256').update(String(req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown').split(',')[0]).digest('hex');
    const entry = attempts.get(ipHash) || { count: 0, until: now + 600000 };
    if (entry.count >= 5 || attempts.size >= 10000) { res.setHeader('Retry-After', '600'); return reply(429, 'too_many_requests'); }
    entry.count++; attempts.set(ipHash, entry);
    if (!env.RESEND_API_KEY || !env.RESEND_FROM || /[\r\n]/.test(env.RESEND_FROM)) return reply(503, 'email_unavailable');
    const service = data.service === 'multi' ? 'Multiple services / General maintenance' : SERVICES[Number(data.service)];
    const mail = {
      from: env.RESEND_FROM, to: [RECIPIENT], reply_to: data.email,
      subject: `Ellis website enquiry — ${service}`,
      text: ['Ellis Services Group — Website enquiry', '', `Name: ${data.name}`, `Phone: ${data.phone || 'Not supplied'}`, `Email: ${data.email}`, `Address / location: ${data.address || 'Not supplied'}`, `Region: ${data.region || 'Melbourne'}`, `Area: ${data.area || 'Not supplied'}`, `Service: ${service}`, `Property type: ${SECTORS[Number(data.sector)] && data.sector !== '' ? SECTORS[Number(data.sector)] : 'Not supplied'}`, '', 'Project details:', data.details, '', `Photos: ${data.photos.length}`, `Reference: ${data.requestId}`].join('\n'),
      attachments: data.photos.map(({ filename, content }) => ({ filename, content }))
    };
    const idempotency = createHash('sha256').update(JSON.stringify({ ...mail, requestId: data.requestId })).digest('hex');
    try {
      const response = await send('https://api.resend.com/emails', { method: 'POST', headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json', 'Idempotency-Key': `ellis-enquiry/${idempotency}` }, body: JSON.stringify(mail), signal: AbortSignal.timeout(15000) });
      if (!response.ok) return reply(502, 'email_send_failed');
      const result = await response.json();
      if (!result.id) return reply(502, 'email_send_failed');
      // Accepted by Resend; delivery is verified separately in its dashboard.
      return reply(200);
    } catch { return reply(502, 'email_send_failed'); }
  };
}
module.exports = createHandler();
module.exports.createHandler = createHandler;
