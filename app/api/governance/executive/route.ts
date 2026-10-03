import { NextResponse } from 'next/server';
import { ExecutiveViewService } from '@/infra/ui/ExecutiveViewService';

export async function GET() {
  try {
    const view = ExecutiveViewService.getView();
    return NextResponse.json(view);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch executive view' },
      { status: 500 }
    );
  }
}
