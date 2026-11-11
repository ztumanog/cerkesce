import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q') || '';
  const normalized = q.trim().toLowerCase();

  const queryDto = {
    rawQuery: q,
    normalizedText: normalized,
  };

  const mockSuggestions = [
    { label: `${normalized} (Kök)`, type: 'CONCEPT', confidence: 0.95 },
    { label: `${normalized}-шхо`, type: 'COMPOUND', confidence: 0.88 },
  ];

  return NextResponse.json({
    query: queryDto,
    suggestions: mockSuggestions,
  });
}