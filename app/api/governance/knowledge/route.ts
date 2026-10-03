import { NextResponse } from 'next/server';
import { KnowledgeExplorerViewService } from '@/infra/ui/KnowledgeExplorerViewService';

export async function GET() {
  try {
    const view = KnowledgeExplorerViewService.getView();
    return NextResponse.json(view);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch knowledge view' },
      { status: 500 }
    );
  }
}
