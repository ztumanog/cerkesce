import { NextRequest, NextResponse } from 'next/server';
import { verifySessionToken, SESSION_COOKIE } from '@/lib/auth/session';

/**
 * Oturum durumu (AUTH-001) — giriş sayfası "oturum açık" görünümü için.
 * Herkese açık: yalnızca oturum VAR/YOK ve e-posta döner, başka bilgi sızdırmaz.
 */
export async function GET(req: NextRequest) {
  const secret = process.env.AUTH_SECRET || '';
  const token = req.cookies.get(SESSION_COOKIE)?.value ?? null;
  const session = secret ? await verifySessionToken(token, secret) : null;

  if (!session) return NextResponse.json({ authenticated: false });
  return NextResponse.json({ authenticated: true, email: session.email, role: session.role });
}
