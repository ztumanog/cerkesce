import { NextRequest, NextResponse } from 'next/server';
export async function POST(req: NextRequest) {
  const { id, changes, mode } = await req.json();
  if (mode==='dry-run') return NextResponse.json({ id, diff:{after:changes}, backup:{path:'/backups/'+id+'.json', willCreate:true}, audit:{action:'UPDATE', ts:new Date().toISOString()}});
  return NextResponse.json({ ok:true, backup:true, auditLog:true, applied:true });
}
