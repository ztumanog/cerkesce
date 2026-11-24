import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { verifyAdminCredentials } from '../../lib/auth/credentials';
import { createHash } from 'node:crypto';

/**
 * AUTH-001 — Kimlik doğrulama (credentials.ts, Node çalışma zamanı).
 * Fail-closed: env yoksa giriş yapılamaz.
 */

const EMAIL = 'mimar@cerkesce.org';
const SIFRE = 'Gizli-Sifre-123!';
const SIFRE_HASH = createHash('sha256').update(SIFRE).digest('hex');

const ESKI_ENV: Record<string, string | undefined> = {};

function envYaz(values: Record<string, string | undefined>) {
  for (const [k, v] of Object.entries(values)) {
    if (v === undefined) delete process.env[k];
    else process.env[k] = v;
  }
}

beforeEach(() => {
  for (const k of ['ADMIN_EMAIL', 'ADMIN_PASSWORD_HASH']) ESKI_ENV[k] = process.env[k];
  envYaz({ ADMIN_EMAIL: EMAIL, ADMIN_PASSWORD_HASH: SIFRE_HASH });
});

afterEach(() => {
  envYaz(ESKI_ENV);
});

describe('AUTH-001 - Kimlik dogrulama (credentials.ts)', () => {
  it('AUTH-C1: dogru e-posta + sifre kabul edilir', () => {
    expect(verifyAdminCredentials(EMAIL, SIFRE)).toBe(true);
  });

  it('AUTH-C2: yanlis sifre reddedilir', () => {
    expect(verifyAdminCredentials(EMAIL, 'yanlis-sifre')).toBe(false);
  });

  it('AUTH-C3: yanlis e-posta reddedilir', () => {
    expect(verifyAdminCredentials('baskasi@cerkesce.org', SIFRE)).toBe(false);
  });

  it('AUTH-C4: e-posta buyuk/kucuk harf duyarsiz, bosluk toleransli', () => {
    expect(verifyAdminCredentials('  MIMAR@CERKESCE.ORG ', SIFRE)).toBe(true);
  });

  it('AUTH-C5: env eksikse fail-closed (hicbir giris basarili olmaz)', () => {
    envYaz({ ADMIN_EMAIL: undefined });
    expect(verifyAdminCredentials(EMAIL, SIFRE)).toBe(false);
    envYaz({ ADMIN_EMAIL: EMAIL, ADMIN_PASSWORD_HASH: undefined });
    expect(verifyAdminCredentials(EMAIL, SIFRE)).toBe(false);
  });

  it('AUTH-C6: bos / eksik girdi reddedilir', () => {
    expect(verifyAdminCredentials('', SIFRE)).toBe(false);
    expect(verifyAdminCredentials(EMAIL, '')).toBe(false);
    expect(verifyAdminCredentials('', '')).toBe(false);
  });
});
