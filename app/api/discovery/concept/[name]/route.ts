import { NextRequest, NextResponse } from 'next/server';
import { DiscoveryFacade } from '@/domain/discovery/services/DiscoveryFacade';
import { createLexemeLookupAdapter } from '@/domain/discovery/adapters/createLexemeLookupAdapter';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ name: string }> }
) {
  try {
    const { name } = await params;
    const decodedName = decodeURIComponent(name);

    const lookupAdapter = createLexemeLookupAdapter();
    const facade = new DiscoveryFacade(lookupAdapter);

    const result = await facade.explore(decodedName);

    return NextResponse.json({
      success: true,
      concept: decodedName,
      data: result,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error?.message || 'Kavram ağ verisi alınırken sunucu hatası oluştu',
      },
      { status: 500 }
    );
  }
}