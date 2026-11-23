import { NextRequest, NextResponse } from 'next/server';
import { DiscoveryFacade } from '@/domain/discovery/services/DiscoveryFacade';
import { FileBasedConceptGraphRepository } from '@/repository/FileBasedConceptGraphRepository';
import type { DiscoveryResultDTO } from '@/domain/discovery/dto/DiscoveryResultDTO';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ name: string }> }
) {
  try {
    const { name } = await params;
    const decodedName = decodeURIComponent(name);

    // DUZELTME (Gorev 1): GraphTraversalService.traverse() IConceptGraphRepository.getNeighbors()
    // cagirir (GraphTraversalService.ts:60); LexemeConceptLookupAdapter yalnizca ConceptLookupPort
    // implement eder, getNeighbors yoktu — rota cagrilsaydi traversal'de hata uretirdi.
    // Kurulum: FileBasedConceptGraphRepository (Gorev 1b) - kürasyon tohumları + lexemes.json
    // veri katmanindan turetilmis komsuluklar.
    // QuerySemanticMapper'i facade kendi icinde createLexemeLookupAdapter ile kurar.
    const facade = new DiscoveryFacade(new FileBasedConceptGraphRepository());

    const result: DiscoveryResultDTO = await facade.explore(decodedName);

    return NextResponse.json<{
      success: boolean;
      concept: string;
      data: DiscoveryResultDTO;
    }>({
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
