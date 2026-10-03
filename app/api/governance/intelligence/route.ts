import { NextResponse } from 'next/server';
import { IntelligenceDashboardViewService } from '@/infra/ui/IntelligenceDashboardViewService';

export async function GET() {
  try {
    const view = IntelligenceDashboardViewService.getView();
    return NextResponse.json(view);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch intelligence view' },
      { status: 500 }
    );
  }
}
