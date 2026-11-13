import { verifyCurationAccess } from '@/lib/security/curationGuard';
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
export async function GET(req: Request) {
  const denied = verifyCurationAccess(req);
  if (denied) return denied;

  const p = path.join(process.cwd(), '_scripts', '2ca-001-review.json');
  const data = JSON.parse(fs.readFileSync(p, 'utf-8'));
  return NextResponse.json(data);
}

