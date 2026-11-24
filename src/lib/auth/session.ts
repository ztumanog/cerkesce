/**
 * Oturum tokeni — HMAC-SHA256 imzalı, taşınabilir payload (AUTH-001).
 *
 * Edge (middleware) ve Node (API rotaları) çalışma zamanlarının İKİSİNDE de
 * çalışır: yalnızca Web Crypto (crypto.subtle) kullanır, node:crypto YOK.
 *
 * Token biçimi: `<base64url(payload)>.<base64url(hmac)>`
 * Payload: { email, role, exp (unix saniye) }
 */

export type AdminRole = 'YONETICI';

export interface SessionPayload {
  email: string;
  role: AdminRole;
  /** Unix saniyesi — bu zamandan sonra token geçersiz */
  exp: number;
}

export const SESSION_COOKIE = 'cerkesce_session';
export const SESSION_TTL_SECONDS = 8 * 60 * 60; // 8 saat

const encoder = new TextEncoder();

function toBase64Url(bytes: Uint8Array): string {
  let bin = '';
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function fromBase64Url(s: string): Uint8Array {
  const b64 = s.replace(/-/g, '+').replace(/_/g, '/');
  const padded = b64 + '='.repeat((4 - (b64.length % 4)) % 4);
  const bin = atob(padded);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return bytes;
}

async function hmacSign(secret: string, data: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const sig = await crypto.subtle.sign('HMAC', key, encoder.encode(data));
  return toBase64Url(new Uint8Array(sig));
}

/** Sabit süreli karşılaştırma — timing saldırısına karşı */
function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export async function createSessionToken(
  email: string,
  role: AdminRole,
  secret: string,
  ttlSeconds: number = SESSION_TTL_SECONDS
): Promise<string> {
  const payload: SessionPayload = {
    email,
    role,
    exp: Math.floor(Date.now() / 1000) + ttlSeconds,
  };
  const body = toBase64Url(encoder.encode(JSON.stringify(payload)));
  const sig = await hmacSign(secret, body);
  return `${body}.${sig}`;
}

/**
 * Token'ı doğrular. Geçersiz imza / süresi dolmuş / bozuk biçim → null.
 * Rol politikası BURADA değil guard.ts'dedir — burada yalnız şifreleme
 * geçerliliği denetlenir.
 */
export async function verifySessionToken(
  token: string | null | undefined,
  secret: string
): Promise<SessionPayload | null> {
  if (!token || !secret) return null;
  const dot = token.lastIndexOf('.');
  if (dot <= 0) return null;
  const body = token.slice(0, dot);
  const sig = token.slice(dot + 1);

  let expected: string;
  try {
    expected = await hmacSign(secret, body);
  } catch {
    return null;
  }
  if (!timingSafeEqual(sig, expected)) return null;

  try {
    const payload = JSON.parse(new TextDecoder().decode(fromBase64Url(body))) as SessionPayload;
    if (typeof payload?.email !== 'string' || typeof payload?.exp !== 'number' || typeof payload?.role !== 'string') {
      return null;
    }
    if (payload.exp < Math.floor(Date.now() / 1000)) return null;
    return payload;
  } catch {
    return null;
  }
}
