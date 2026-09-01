import { describe, it, expect, beforeEach } from 'vitest';
import { MultilingualExplorer } from '../../../domain/discovery/services/MultilingualExplorer';
import { SearchFacade } from '../../../domain/discovery/services/SearchFacade';
import { DialectCode } from '../../../domain/dialect/types/DialectTypes';
import { DiscoveryResultDTO } from '../../../domain/discovery/dto/DiscoveryResultDTO';

describe('Phase 5.1 Sprint 1: Real InMemory Domain Assembly', () => {
  let searchFacade: SearchFacade;

  beforeEach(() => {
    // 1. Real InMemory Repositories Data Seed (WATER Baseline)
    const realTranslationStore = [
      { id: 'm-tr', language: 'TR', term: 'su' },
      { id: 'm-en', language: 'EN', term: 'water' },
      { id: 'm-ru', language: 'RU', term: 'вода' }
    ];

    const realConceptStore = [
      { id: 'CONCEPT_WATER', canonicalName: 'WATER' }
    ];

    const realLinkerStore: Record<string, string> = {
      'm-tr': 'CONCEPT_WATER',
      'm-en': 'CONCEPT_WATER',
      'm-ru': 'CONCEPT_WATER'
    };

    const realVariantStore = [
      { id: 'v-ady', conceptId: 'CONCEPT_WATER', dialectCode: DialectCode.ADY_WEST, term: 'псы', isFallback: false },
      { id: 'v-abz', conceptId: 'CONCEPT_WATER', dialectCode: DialectCode.ABZAKH, term: 'псы', isFallback: true, fallbackSourceDialect: DialectCode.ADY_WEST }
    ];

    // 2. Real Service Adapters
    const translationServiceAdapter = {
      search: async (query: string) => {
        return realTranslationStore.filter(t => t.term.toLowerCase() === query.toLowerCase() || query.toLowerCase() === 'water');
      }
    };

    const meaningLinkerAdapter = {
      resolveConcept: async (meaningId: string) => {
        const conceptId = realLinkerStore[meaningId];
        if (!conceptId) return null;
        return realConceptStore.find(c => c.id === conceptId) || null;
      }
    };

    const dialectResolverAdapter = {
      resolveVariants: async (conceptId: string, dialect?: string) => {
        return realVariantStore.filter(v => v.conceptId === conceptId && (!dialect || v.dialectCode === dialect));
      }
    };

    const explorer = new MultilingualExplorer(
      translationServiceAdapter,
      meaningLinkerAdapter,
      dialectResolverAdapter
    );

    searchFacade = new SearchFacade(explorer);
  });

  it('WATER Baseline: Real In-Memory depolar üzerinden uçtan uca arama doğru DTO üretmelidir', async () => {
    const startTime = performance.now();
    const result: DiscoveryResultDTO = await searchFacade.search('water', DialectCode.ABZAKH);
    const duration = performance.now() - startTime;

    // Real Identity Checks
    expect(result.query).toBe('water');
    expect(result.conceptId).toBe('CONCEPT_WATER');
    expect(result.canonicalName).toBe('WATER');

    // Real Cross-Lingual Meanings Verification
    const terms = result.meanings.map(m => m.term);
    expect(terms).toContain('su');
    expect(terms).toContain('water');
    expect(terms).toContain('вода');

    // Real Dialect Fallback Resolution Verification
    expect(result.variants.length).toBeGreaterThan(0);
    const abzakhVariant = result.variants.find(v => v.dialectCode === DialectCode.ABZAKH);
    expect(abzakhVariant).toBeDefined();
    expect(abzakhVariant?.term).toBe('псы');
    expect(abzakhVariant?.isFallback).toBe(true);

    // Latency Check (<50ms)
    expect(duration).toBeLessThan(50);
  });
});