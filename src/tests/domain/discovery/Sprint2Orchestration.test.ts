import { describe, it, expect, vi, beforeEach } from "vitest";
import { MultilingualExplorer } from "../../../domain/discovery/services/MultilingualExplorer";
import { SearchFacade } from "../../../domain/discovery/services/SearchFacade";
import { DialectCode } from "../../../domain/dialect/types/DialectTypes";

describe("Phase 5 Sprint 2: Orchestration & Facade Specification", () => {
  let mockTranslationService: any;
  let mockMeaningLinker: any;
  let mockDialectResolver: any;
  let searchFacade: SearchFacade;

  beforeEach(() => {
    mockTranslationService = {
      search: vi.fn().mockResolvedValue([
        { id: 'm-en', language: 'EN', term: 'water' }
      ])
    };

    mockMeaningLinker = {
      resolveConcept: vi.fn().mockResolvedValue({
        id: 'CONCEPT_WATER',
        canonicalName: 'WATER'
      })
    };

    mockDialectResolver = {
      resolveVariants: vi.fn().mockResolvedValue([
        { id: 'v-abz', conceptId: 'CONCEPT_WATER', dialectCode: DialectCode.ABZAKH, term: 'псы', isFallback: false }
      ])
    };

    const explorer = new MultilingualExplorer(
      mockTranslationService,
      mockMeaningLinker,
      mockDialectResolver
    );

    searchFacade = new SearchFacade(explorer);
  });

  it("1. Empty Result Safety: Bilinmeyen veya boş sorgularda güvenli boş DTO dönmelidir", async () => {
    mockTranslationService.search.mockResolvedValueOnce([]);
    const result = await searchFacade.search('unknown_term');
    expect(result.query).toBe('unknown_term');
    expect(result.conceptId).toBeFalsy();
    expect(result.meanings).toEqual([]);
    expect(result.variants).toEqual([]);
  });

  it("2. Service Orchestration: Facade üzerinden çağrıda orchestrator bağımlı servisleri doğru tetiklemelidir", async () => {
    const result = await searchFacade.search('water', DialectCode.ABZAKH);

    expect(mockTranslationService.search).toHaveBeenCalledWith('water');
    expect(mockMeaningLinker.resolveConcept).toHaveBeenCalledWith('m-en');
    expect(mockDialectResolver.resolveVariants).toHaveBeenCalled();

    expect(result.conceptId).toBe('CONCEPT_WATER');
  });

  it("3. Projection Integrity: DiscoveryAssembler üretimi tip ve kontrat bütünlüğüne uygun olmalıdır", async () => {
    const result = await searchFacade.search('water');
    expect(result).toHaveProperty('query');
    expect(result).toHaveProperty('conceptId');
    expect(result).toHaveProperty('canonicalName');
    expect(result).toHaveProperty('meanings');
    expect(result).toHaveProperty('variants');
  });
});