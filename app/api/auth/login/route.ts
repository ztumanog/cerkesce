import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminCredentials } from '@/lib/auth/credentials';
import { createSessionToken, SESSION_COOKIE, SESSION_TTL_SECONDS } from '@/lib/auth/session';

/**
 * Yönetici girişi — AUTH-001.
 * E-posta + şifre sunucuda kontrol edilir ( credentials.ts, .env.local ).
 * Başarıda HttpOnly imzalı oturum çerezi verilir. Kayıt olma / sıfırlama yok.
 */
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const email = typeof body?.email === 'string' ? body.email : '';
  const password = typeof body?.password === 'string' ? body.password : '';

  if (!email || !password) {
    return NextResponse.json({ error: 'E-posta ve şifre gerekli' }, { status: 400 });
  }

  if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD_HASH || !process.env.AUTH_SECRET) {
    return NextResponse.json(
      { error: 'Giriş yapılandırılmamış — .env.local: ADMIN_EMAIL, ADMIN_PASSWORD_HASH, AUTH_SECRET' },
      { status: 500 }
    );
  }

  if (!verifyAdminCredentials(email, password)) {
    return NextResponse.json({ error: 'E-posta veya şifre hatalı' }, { status: 401 });
  }

  const token = await createSessionToken(process.env.ADMIN_EMAIL, 'YONETICI', process.env.AUTH_SECRET, SESSION_TTL_SECONDS);
  const res = NextResponse.json({ ok: true, role: 'YONETICI' });
  res.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: SESSION_TTL_SECONDS,
  });
  return res;
}
