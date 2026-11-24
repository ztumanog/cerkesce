import { describe, it, expect } from 'vitest';
import { createSessionToken, verifySessionToken, SessionPayload } from '../../lib/auth/session';

/**
 * AUTH-001 — Oturum tokeni şifreleme katmanı (Web Crypto, edge+node uyumlu).
 * Politika testleri AuthGuard.test.ts'te.
 */

const SECRET = 'test-secret-auth-001';
const BASKA_SECRET = 'baska-secret';

describe('AUTH-001 - Oturum tokeni (session.ts)', () => {
  it('AUTH-S1: olusturulan token dogrulanir ve payload geri okunur', async () => {
    const token = await createSessionToken('mimar@cerkesce.org', 'YONETICI', SECRET);
    const payload = await verifySessionToken(token, SECRET);
    expect(payload).not.toBeNull();
    expect(payload!.email).toBe('mimar@cerkesce.org');
    expect(payload!.role).toBe('YONETICI');
    expect(payload!.exp).toBeGreaterThan(Math.floor(Date.now() / 1000));
  });

  it('AUTH-S2: baska secret ile uretilmis token reddedilir', async () => {
    const token = await createSessionToken('mimar@cerkesce.org', 'YONETICI', BASKA_SECRET);
    expect(await verifySessionToken(token, SECRET)).toBeNull();
  });

  it('AUTH-S3: kurcalanmis payload reddedilir (imza eslesmez)', async () => {
    const token = await createSessionToken('mimar@cerkesce.org', 'YONETICI', SECRET);
    const [body, sig] = token.split('.');
    // payload'ı değiştir (rol sahteciliği denemesi)
    const sahte = Buffer.from(
      JSON.stringify({ email: 'saldirgan@kotu.com', role: 'YONETICI', exp: Math.floor(Date.now() / 1000) + 9999 })
    ).toString('base64url');
    expect(await verifySessionToken(`${sahte}.${sig}`, SECRET)).toBeNull();
    expect(await verifySessionToken(`${body}x.${sig}`, SECRET)).toBeNull();
  });

  it('AUTH-S4: suresi dolmus token reddedilir', async () => {
    const token = await createSessionToken('mimar@cerkesce.org', 'YONETICI', SECRET, -10);
    expect(await verifySessionToken(token, SECRET)).toBeNull();
  });

  it('AUTH-S5: bozuk / bos token red (null-guvenli)', async () => {
    expect(await verifySessionToken(null, SECRET)).toBeNull();
    expect(await verifySessionToken('', SECRET)).toBeNull();
    expect(await verifySessionToken('bozuk-token', SECRET)).toBeNull();
    expect(await verifySessionToken('a.b.c.d', SECRET)).toBeNull();
    expect(await verifySessionToken('token', '')).toBeNull();
  });

  it('AUTH-S6: Turkcce / ASCII olmayan e-posta guvenle tasiyabilir', async () => {
    const token = await createSessionToken('yönetim@çerkesçe.org', 'YONETICI', SECRET);
    const payload = await verifySessionToken(token, SECRET);
    expect(payload!.email).toBe('yönetim@çerkesçe.org');
  });
});
