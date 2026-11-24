/**
 * Yönetici kimlik doğrulama — AUTH-001 (yalnız Node çalışma zamanı, API rotaları).
 *
 * Kimlik bilgileri .env.local'dan okunur, ASLA koda veya repoya girmez:
 * - ADMIN_EMAIL: yönetici e-postası
 * - ADMIN_PASSWORD_HASH: şifrenin SHA-256 hex'i
 *
 * Hash üretimi: node -e "console.log(require('crypto').createHash('sha256').update('ŞİFRENİZ').digest('hex'))"
 *
 * Kayıt olma / şifre sıfırlama / sosyal giriş YOK (Baş Mimar kararı).
 * Fail-closed: env değişkenleri yoksa giriş hiç yapılamaz.
 */

import { createHash, timingSafeEqual } from 'node:crypto';

function sha256Hex(input: string): string {
  return createHash('sha256').update(input, 'utf8').digest('hex');
}

/** Uzunluk sızdırmayan, sabit süreli hex karşılaştırma */
function hexTimingSafe(a: string, b: string): boolean {
  if (a.length !== 64 || b.length !== 64) return false;
  return timingSafeEqual(Buffer.from(a, 'hex'), Buffer.from(b, 'hex'));
}

export function verifyAdminCredentials(email: string, password: string): boolean {
  const envEmail = process.env.ADMIN_EMAIL;
  const envHash = process.env.ADMIN_PASSWORD_HASH;
  if (!envEmail || !envHash || !email || !password) return false; // fail-closed

  // E-posta karşılaştırması: büyük/küçük harf duyarsız (hex üzerinden → sabit süreli)
  const emailOk = hexTimingSafe(sha256Hex(email.trim().toLowerCase()), sha256Hex(envEmail.trim().toLowerCase()));
  const passwordOk = hexTimingSafe(sha256Hex(password), envHash);

  return emailOk && passwordOk;
}
