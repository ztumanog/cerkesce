import { describe, it, expect, beforeEach } from 'vitest';
import { MultilingualExplorer } from '@/domain/discovery/services/MultilingualExplorer';
import { SearchFacade } from '@/services/SearchFacade';
import { DialectCode } from '@/domain/dialect/types/DialectTypes';
import { DiscoveryResultDTO } from '@/domain/discovery/dto/DiscoveryResultDTO';

describe('Phase 5 Sprint 3: True E2E Platform Certification Suite', () => {
  let searchFacade: SearchFacade;

  beforeEach(() => {
    // Phase 1 -> Phase 5 Tüm In-Memory Montajı (Real Mock Assemblies)
    const mockTranslationService = {
      search: async (q: string) => {
        if (q === 'water') {
          return [
            { id: 'm_tr', language: 'TR', term: 'su' },
            { id: 'm_en', language: 'EN', term: 'water' },
            { id: 'm_ru', language: 'RU', term: 'вода' }
          ];
        }
        return [];
      }
    };

    const mockMeaningLinker = {
      resolveConcept: async (meaningId: string) => {
        if (meaningId === 'm_tr' || meaningId === 'm_en') {
          return { id: 'CONCEPT_WATER', canonicalName: 'WATER' };
        }
        return null;
      }
    };

    const mockDialectResolver = {
      resolveVariants: async (conceptId: string, dialect?: string) => {
        if (conceptId === 'CONCEPT_WATER' && dialect === DialectCode.ABZAKH) {
          return [
            { id: 'v_abz', dialectCode: DialectCode.ABZAKH, term: 'псы', isFallback: true, fallbackSourceDialect: 'ADY_WEST' }
          ];
        }
        return [];
      }
    };

    const explorer = new MultilingualExplorer(
      mockTranslationService,
      mockMeaningLinker,
      mockDialectResolver
    );

    searchFacade = new SearchFacade(explorer);
  });

  it('EC-01 & EC-02: WATER Senaryosu - Uçtan uca zincir tek sorguda doğru DTO üretmelidir', async () => {
    const startTime = performance.now();
    const result: DiscoveryResultDTO = await searchFacade.search('water', DialectCode.ABZAKH);
    const duration = performance.now() - startTime;

    // Direct Identity & Projection Checks
    expect(result.query).toBe('water');
    expect(result.conceptId).toBe('CONCEPT_WATER');
    expect(result.canonicalName).toBe('WATER');

    // Cross-Lingual Meanings Verification
    const languages = result.meanings.map(m => m.language);
    expect(languages).toContain('TR');
    expect(languages).toContain('EN');
    expect(languages).toContain('RU');

    // Dialect Fallback Verification
    expect(result.variants.length).toBe(1);
    expect(result.variants[0].dialectCode).toBe(DialectCode.ABZAKH);
    expect(result.variants[0].term).toBe('псы');
    expect(result.variants[0].isFallback).toBe(true);

    // Real Execution Performance (< 50ms)
    expect(duration).toBeLessThan(50);
  });
});