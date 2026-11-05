import { NextRequest, NextResponse } from 'next/server';
import { CollaborativeModerationService } from '@/domain/collaboration/services/CollaborativeModerationService';

export async function POST(req: NextRequest) {
  const body = await req.json();
  try {
    const proposal = CollaborativeModerationService.submitProposal(body);
    return NextResponse.json(proposal, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'id gerekli' }, { status: 400 });
  const proposal = CollaborativeModerationService.getProposal(id);
  if (!proposal) return NextResponse.json({ error: 'bulunamadi' }, { status: 404 });
  return NextResponse.json(proposal);
}