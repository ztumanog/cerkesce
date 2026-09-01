import { describe, it, expect, beforeEach } from "vitest";
import { InMemoryTranslationRepository } from "../repository/InMemoryTranslationRepository";
import { TranslationService } from "../services/TranslationService";
import { MorphologyAwareMatchingService } from "../services/MorphologyAwareMatchingService";
import { TranslationEntry, TranslationGroup } from "../domain/translation";

// 1. Mock Veri Seti (TR, EN, RU, AR dillerini kapsayan tam matris)
const mockGroups: TranslationGroup[] = [
  { id: "TRG_WATER", groupName: "Su Kavramı", entries: [] },
];

const mockEntries: TranslationEntry[] = [
  {
    id: "e-water",
    lemma: "псы",
    normalizedLemma: "псы",
    dialect: "DOGU",
    groupId: "TRG_WATER",
    meanings: [
      { id: "m-tr", language: "TR", text: "su" },
      { id: "m-en", language: "EN", text: "water" },
      { id: "m-ru", language: "RU", text: "вода" },
      { id: "m-ar", language: "AR", text: "ماء" },
    ],
  },
];

describe("Phase 2 Exit Criteria Validation", () => {
  let repository: InMemoryTranslationRepository;
  let service: TranslationService;

  beforeEach(() => {
    repository = new InMemoryTranslationRepository(mockEntries, mockGroups);
    const matchingService = new MorphologyAwareMatchingService();
    service = new TranslationService(repository, matchingService);
  });

  describe("1. Reverse Search (water / su / вода → псы)", () => {
    it("Tüm hedef dillerdeki sorgular 'псы' lemmaya ulaşmalıdır", async () => {
      const targetQueries = ["water", "su", "вода", "ماء"];

      for (const query of targetQueries) {
        const results = await repository.searchCrossDictionary(query);
        expect(results.length).toBeGreaterThan(0);
        
        const hasPsyLemma = results.some((e: TranslationEntry) => e.lemma === "псы");
        expect(hasPsyLemma).toBe(true);
      }
    });
  });

  describe("2. MultiLanguage Search (Aynı grubun sonuçlarını döndürme)", () => {
    it("'water', 'su', 'вода', 'псы' sorguları aynı TRG_WATER grubunu döndürmelidir", async () => {
      const queries = ["псы", "water", "su", "вода"];

      for (const query of queries) {
        const results = query === "псы" 
          ? await service.search(query)
          : await repository.searchCrossDictionary(query);

        expect(results.length).toBeGreaterThan(0);
        expect(results[0].groupId).toBe("TRG_WATER");
      }
    });
  });

  describe("3. TranslationTable Matrisi (TR, EN, RU, AR Dillerinin Eksiksiz Matrisi)", () => {
    it("'псы' lemmaya ait TranslationEntry için TR, EN, RU, AR matrisi üretilebilmelidir", async () => {
      const entries = await service.search("псы");
      expect(entries.length).toBeGreaterThan(0);

      const entry = entries[0];
      const languagesInEntry = entry.meanings.map((m) => m.language);

      // TR, EN, RU, AR dillerinin tümünün mevcut olduğunu doğrula
      expect(languagesInEntry).toContain("TR");
      expect(languagesInEntry).toContain("EN");
      expect(languagesInEntry).toContain("RU");
      expect(languagesInEntry).toContain("AR");
    });
  });
});