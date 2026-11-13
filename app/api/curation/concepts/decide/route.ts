import { verifyCurationAccess } from '@/lib/security/curationGuard';
import { NextRequest, NextResponse } from 'next/server';
export async function POST(req: NextRequest) {
  const denied = verifyCurationAccess(req);
  if (denied) return denied;

  const body = await req.json();
  return NextResponse.json({ ok:true, ...body, ts:new Date().toISOString() });
}
