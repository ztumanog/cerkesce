/**
 * Erişim politikası — AUTH-001. Tek karar noktası (middleware burayı çağırır).
 *
 * Saf fonksiyondur: Next bağımlılığı yok, birim testleri doğrudan çalışır.
 * Şifreleme session.ts'te, politika burada, uygulama middleware.ts'te.
 *
 * Kapsam (Baş Mimar onayı, 2026-11-25):
 * - Kilitli sayfalar: /admin/** (giriş ve yetkisiz sayfaları hariç)
 * - Kilitli API'ler: /api/admin/**, /api/curation/**, /api/governance/**, /api/moderasyon
 * - İstisna: /api/moderasyon GET+POST vatandaş akışında açık (Kelime Öner sayfası
 *   öneri gönderir ve durum izler — sayfaya dokunulmaması kuralı). Moderasyon
 *   EYLEMİ (PATCH: onayla/reddet) kilitlidir.
 * - Açık: geri kalan her şey (/, /sozluk/*, /api/search, /api/morphology, ...)
 */

import type { SessionPayload } from './session';

/** Giriş yapmadan erişilebilen /admin altı sayfalar */
export const PUBLIC_ADMIN_PATHS = new Set(['/admin/giris', '/admin/yetkisiz']);

/** Vatandaş akışının açık kullandığı API istisnaları (method bazlı) */
const OPEN_API_EXCEPTIONS: { prefix: string; methods: string[] }[] = [
  { prefix: '/api/moderasyon', methods: ['GET', 'POST'] },
];

/** Kilitli API önekleri */
const PROTECTED_API_PREFIXES = ['/api/admin', '/api/curation', '/api/governance', '/api/moderasyon'];

export type GuardDecision =
  | { allow: true }
  | { allow: false; kind: 'LOGIN_REQUIRED'; redirectTo: '/admin/giris' }
  | { allow: false; kind: 'YETKISIZ'; redirectTo: '/admin/yetkisiz' };

function matchesPrefix(path: string, prefix: string): boolean {
  return path === prefix || path.startsWith(prefix + '/');
}

function isProtectedApi(path: string, method: string): boolean {
  if (!PROTECTED_API_PREFIXES.some((p) => matchesPrefix(path, p))) return false;
  // Vatandaş istisnası: method bazlı açık uçlar
  return !OPEN_API_EXCEPTIONS.some((e) => matchesPrefix(path, e.prefix) && e.methods.includes(method));
}

/**
 * Verilen istek için erişim kararı.
 * @param path  URL yolu (ör. /admin/yonetim, /api/curation/lexemes)
 * @param method HTTP methodu (GET, POST, ...)
 * @param session Doğrulanmış oturum payload'ı veya null (girişsiz)
 */
export function evaluateAccess(path: string, method: string, session: SessionPayload | null): GuardDecision {
  const isAdminPage = path === '/admin' || path.startsWith('/admin/');
  if (isAdminPage) {
    if (PUBLIC_ADMIN_PATHS.has(path)) return { allow: true };
    if (!session) return { allow: false, kind: 'LOGIN_REQUIRED', redirectTo: '/admin/giris' };
    if (session.role !== 'YONETICI') return { allow: false, kind: 'YETKISIZ', redirectTo: '/admin/yetkisiz' };
    return { allow: true };
  }

  if (isProtectedApi(path, method)) {
    if (!session) return { allow: false, kind: 'LOGIN_REQUIRED', redirectTo: '/admin/giris' };
    if (session.role !== 'YONETICI') return { allow: false, kind: 'YETKISIZ', redirectTo: '/admin/yetkisiz' };
    return { allow: true };
  }

  return { allow: true };
}
