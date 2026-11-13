import { NextResponse } from 'next/server';

export function verifyCurationAccess(req: Request): NextResponse | null {
  const url = new URL(req.url);
  const origin = req.headers.get('origin');
  const referer = req.headers.get('referer');

  // 1. CSRF / Cross-Origin koruması
  if (origin && origin !== url.origin) {
    return NextResponse.json(
      { success: false, error: 'Farklı kaynaktan yazma isteği engellendi (CSRF Guard).' },
      { status: 403 }
    );
  }

  if (!origin && referer) {
    try {
      const refUrl = new URL(referer);
      if (refUrl.origin !== url.origin) {
        return NextResponse.json(
          { success: false, error: 'Geçersiz referer kaynağı engellendi.' },
          { status: 403 }
        );
      }
    } catch {
      return NextResponse.json({ success: false, error: 'Geçersiz referer başlığı.' }, { status: 403 });
    }
  }

  // 2. Yönetici Yetki Kontrolü (Token veya Admin Oturum Çerezi)
  const expectedSecret = process.env.ADMIN_CURATION_SECRET;
  const authHeader = req.headers.get('x-admin-token') || req.headers.get('authorization')?.replace(/^Bearer\s+/i, '');
  const cookieHeader = req.headers.get('cookie') || '';
  const hasAdminCookie = /(?:^|;\s*)cerkesce_admin=1(?:;|$)/.test(cookieHeader);

  if (expectedSecret) {
    if (authHeader !== expectedSecret && !hasAdminCookie) {
      return NextResponse.json(
        { success: false, error: 'Yetkisiz erişim: Bu işlem için yönetici yetkisi gereklidir.' },
        { status: 401 }
      );
    }
  } else if (process.env.NODE_ENV === 'production' && !hasAdminCookie) {
    return NextResponse.json(
      { success: false, error: 'Üretim ortamında ADMIN_CURATION_SECRET veya yönetici oturumu zorunludur.' },
      { status: 401 }
    );
  }

  // 3. Yalnızca /admin altından gelen istemci çağrılarına izin ver (herkese açık /sozluk sayfalarından çağrıyı reddet)
  if (referer) {
    try {
      const refPath = new URL(referer).pathname;
      if (!refPath.startsWith('/admin') && !refPath.startsWith('/yonetim')) {
        return NextResponse.json(
          { success: false, error: 'Kürasyon mutasyonları yalnızca yönetim panelinden tetiklenebilir.' },
          { status: 403 }
        );
      }
    } catch {
      // ignore
    }
  }

  return null;
}
