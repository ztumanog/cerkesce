import { describe, it, expect, vi } from 'vitest';
import { MultilingualExplorer } from '@/domain/discovery/services/MultilingualExplorer';
import { SearchFacade } from '@/services/SearchFacade';
import { DialectCode } from '@/domain/dialect/types/DialectTypes';

describe('Phase 5 Sprint 2: Orchestration & Facade Specification', () => {

  it('1. Empty Result Safety: Bilinmeyen veya boş sorgularda güvenli boş DTO dönmelidir', async () => {
    const explorer = new MultilingualExplorer();
    const facade = new SearchFacade(explorer);

    const result = await facade.search('unknown_query_123');

    expect(result.query).toBe('unknown_query_123');
    expect(result.meanings).toEqual([]);
    expect(result.variants).toEqual([]);
    expect(result.relatedConcepts).toEqual([]);
    expect(result.executionTimeMs).toBeGreaterThanOrEqual(0);
  });

  it('2. Service Orchestration: Facade üzerinden çağrıda orchestrator bağımlı servisleri doğru tetiklemelidir', async () => {
    const mockTranslationService = {
      search: vi.fn().mockResolvedValue([{ id: 'm1', language: 'TR', term: 'su' }])
    };

    const mockMeaningLinker = {
      resolveConcept: vi.fn().mockResolvedValue({ id: 'CONCEPT_WATER', canonicalName: 'WATER' })
    };

    const mockDialectResolver = {
      resolveVariants: vi.fn().mockResolvedValue([
        { id: 'v1', dialectCode: DialectCode.ABZAKH, term: 'псы', isFallback: false }
      ])
    };

    const explorer = new MultilingualExplorer(
      mockTranslationService,
      mockMeaningLinker,
      mockDialectResolver
    );
    const facade = new SearchFacade(explorer);

    const result = await facade.search('water', DialectCode.ABZAKH);

    expect(mockTranslationService.search).toHaveBeenCalledWith('water');
    expect(mockMeaningLinker.resolveConcept).toHaveBeenCalledWith('m1');
    expect(mockDialectResolver.resolveVariants).toHaveBeenCalledWith('CONCEPT_WATER', DialectCode.ABZAKH);

    expect(result.conceptId).toBe('CONCEPT_WATER');
    expect(result.canonicalName).toBe('WATER');
    expect(result.meanings.length).toBe(1);
    expect(result.variants.length).toBe(1);
    expect(result.variants[0].dialectCode).toBe(DialectCode.ABZAKH);
  });

  it('3. Projection Integrity: DiscoveryAssembler üretimi tip ve kontrat bütünlüğüne uygun olmalıdır', async () => {
    const mockTranslation = { search: vi.fn().mockResolvedValue([{ id: 'm1', language: 'TR', term: 'deniz' }]) };
    const explorer = new MultilingualExplorer(mockTranslation);

    const result = await explorer.explore('deniz');
    
    expect(result).toHaveProperty('query');
    expect(result).toHaveProperty('meanings');
    expect(result).toHaveProperty('variants');
    expect(result).toHaveProperty('relatedConcepts');
    expect(result).toHaveProperty('executionTimeMs');
  });
});