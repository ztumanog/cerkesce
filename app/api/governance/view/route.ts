import { NextResponse } from 'next/server';
import { GovernanceDashboardViewService } from '@/infra/ui/GovernanceDashboardViewService';

export async function GET() {
  try {
    const view = GovernanceDashboardViewService.getView();
    return NextResponse.json(view);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch governance view' },
      { status: 500 }
    );
  }
}
