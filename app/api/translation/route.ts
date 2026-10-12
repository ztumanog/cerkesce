// app/api/translation/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { TranslationService } from '@/services/TranslationService';
import { InMemoryTranslationRepository } from '@/repository/InMemoryTranslationRepository';

export async function GET(req: NextRequest) {
  try {
    const query = req.nextUrl.searchParams.get('q') || '';
    if (!query.trim()) {
      return NextResponse.json({
        success: true,
        query: '',
        count: 0,
        data: [],
      });
    }
    const repository = new InMemoryTranslationRepository();
    const service = new TranslationService(repository);
    const results = await service.search(query);
    return NextResponse.json({
      success: true,
      query,
      count: results.length,
      data: results,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Translation API Error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error',
        query: req.nextUrl.searchParams.get('q') || '',
      },
      { status: 500 }
    );
  }
}

