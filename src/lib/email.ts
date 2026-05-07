import crypto from 'node:crypto';
import { Resend } from 'resend';

export const FROM_ADDRESS = 'career-ops <notifications@career-ops.org>';
export const REPLY_TO = 'notifications@career-ops.org';
export const TOKEN_TTL_MS = 24 * 60 * 60 * 1000;

let cachedClient: Resend | null = null;

export function resendClient() {
  if (!cachedClient) {
    const key = process.env.RESEND_API_KEY;
    if (!key) throw new Error('RESEND_API_KEY is not set');
    cachedClient = new Resend(key);
  }
  return cachedClient;
}

export function audienceId() {
  const id = process.env.RESEND_AUDIENCE_ID;
  if (!id) throw new Error('RESEND_AUDIENCE_ID is not set');
  return id;
}

function secret() {
  const s = process.env.CONFIRM_SECRET;
  if (!s) throw new Error('CONFIRM_SECRET is not set');
  return s;
}

function base64url(buf: Buffer | string) {
  return Buffer.from(buf)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

function fromBase64url(s: string) {
  const pad = s.length % 4 === 0 ? '' : '='.repeat(4 - (s.length % 4));
  return Buffer.from(s.replace(/-/g, '+').replace(/_/g, '/') + pad, 'base64');
}

export function signConfirmToken(email: string, now = Date.now()): string {
  const payload = base64url(JSON.stringify({ email: email.toLowerCase(), exp: now + TOKEN_TTL_MS }));
  const sig = base64url(crypto.createHmac('sha256', secret()).update(payload).digest());
  return `${payload}.${sig}`;
}

export function verifyConfirmToken(token: string): { email: string } | null {
  const [payload, sig] = token.split('.');
  if (!payload || !sig) return null;
  const expected = base64url(crypto.createHmac('sha256', secret()).update(payload).digest());
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
  let parsed: { email?: unknown; exp?: unknown };
  try {
    parsed = JSON.parse(fromBase64url(payload).toString('utf8'));
  } catch {
    return null;
  }
  if (typeof parsed.email !== 'string' || typeof parsed.exp !== 'number') return null;
  if (parsed.exp < Date.now()) return null;
  return { email: parsed.email };
}
