import { NextResponse, type NextRequest } from 'next/server';
import { verifySessionToken, SESSION_COOKIE } from '@/lib/auth/session';
import { evaluateAccess } from '@/lib/auth/guard';

/**
 * AUTH-001 — Tek erişim guard'ı (Next.js "proxy", eski adıyla middleware).
 *
 * Katman ayrımı:
 * - Politika:  src/lib/auth/guard.ts   (saf fonksiyon, birim testli — AUTH-G*)
 * - Şifreleme: src/lib/auth/session.ts (HMAC-SHA256, Web Crypto — edge+node)
 * - Uygulama:  BU DOSYA (tek yer; her /admin sayfasına ayrı kod YOK)
 *
 * Kapsam: /admin/** sayfaları + /api/admin|curation|governance/** +
 * /api/moderasyon (PATCH kilitli; GET+POST vatandaş Kelime Öner akışına açık).
 *
 * Bu dosya eskiden Basic Auth içeriyordu ve .gitignore'da tutuluyordu;
 * AUTH-001 ile oturum tabanlı tasarımla değiştirildi ve repoya alındı
 * (gizli bilgi içermez — kimlik bilgileri .env.local'dadır).
 */

export const config = {
  matcher: [
    '/admin/:path*',
    '/yonetim/:path*', // kalıcı redirect öncesi eski adresler (savunma derinliği)
    '/api/admin/:path*',
    '/api/curation/:path*',
    '/api/governance/:path*',
    '/api/moderasyon',
  ],
};

export async function proxy(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  // Fail-closed: secret yoksa oturum hiç doğrulanamaz → girişşiz değerlendirilir.
  // (Giriş rotası da secret olmadan çerez üretemez; korumalı alan kapalı kalır.)
  const secret = process.env.AUTH_SECRET || '';
  const token = req.cookies.get(SESSION_COOKIE)?.value ?? null;
  const session = secret ? await verifySessionToken(token, secret) : null;

  const decision = evaluateAccess(pathname, req.method, session);
  if (decision.allow) return NextResponse.next();

  const isApi = pathname.startsWith('/api/');
  if (isApi) {
    return NextResponse.json(
      {
        error:
          decision.kind === 'LOGIN_REQUIRED'
            ? 'Bu işlem için yönetici girişi gerekir'
            : 'Yetkiniz yok',
      },
      { status: decision.kind === 'LOGIN_REQUIRED' ? 401 : 403 }
    );
  }

  const url = req.nextUrl.clone();
  url.pathname = decision.redirectTo;
  if (decision.kind === 'LOGIN_REQUIRED') {
    // Giriş sonrası kaldığı yere dönebilsin — yalnız dahili /admin yolları
    const next = pathname + search;
    url.search = next.startsWith('/admin') ? `?next=${encodeURIComponent(next)}` : '';
  } else {
    url.search = '';
  }
  return NextResponse.redirect(url);
}
