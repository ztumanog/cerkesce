import { NextResponse } from 'next/server';
import { OperationsDashboardViewService } from '@/infra/ui/OperationsDashboardViewService';

export async function GET() {
  try {
    const view = OperationsDashboardViewService.getView();
    return NextResponse.json(view);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch operations view' },
      { status: 500 }
    );
  }
}
