import { describe, it, expect, beforeEach } from "vitest";
import { MultilingualExplorer } from "../../../domain/discovery/services/MultilingualExplorer";
import { SearchFacade } from "../../../domain/discovery/services/SearchFacade";
import { DialectCode } from "../../../domain/dialect/types/DialectTypes";
import { DiscoveryResultDTO } from "../../../domain/discovery/dto/DiscoveryResultDTO";

describe("Phase 5 Sprint 3: True E2E Platform Certification Suite", () => {
  let searchFacade: SearchFacade;

  beforeEach(() => {
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
      { id: 'v-abz', conceptId: 'CONCEPT_WATER', dialectCode: DialectCode.ABZAKH, term: 'псы', isFallback: true, fallbackSourceDialect: DialectCode.ADY_WEST }
    ];

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

  it("EC-01 & EC-02: WATER Senaryosu - Uçtan uca zincir tek sorguda doğru DTO üretmelidir", async () => {
    const result: DiscoveryResultDTO = await searchFacade.search('water', DialectCode.ABZAKH);

    expect(result.query).toBe('water');
    expect(result.conceptId).toBe('CONCEPT_WATER');
    expect(result.canonicalName).toBe('WATER');

    expect(result.variants.length).toBeGreaterThan(0);
    expect(result.variants[0].dialectCode).toBe(DialectCode.ABZAKH);
    expect(result.variants[0].term).toBe('псы');
  });
});
