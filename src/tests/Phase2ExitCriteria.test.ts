import { describe, it, expect, beforeEach } from "vitest";
import { InMemoryTranslationRepository } from "../repository/InMemoryTranslationRepository";
import { TranslationService } from "../services/TranslationService";
import { MorphologyAwareMatchingService } from "../services/MorphologyAwareMatchingService";
import { TranslationEntry, TranslationGroup } from "../domain/translation";

// 1. Mock Veri Seti (TR, EN, RU, AR dillerini kapsayan tam matris)
const mockGroups: TranslationGroup[] = [
  { id: "TRG_WATER", groupName: "Su KavramÄ±", entries: [] },
];

const mockEntries: TranslationEntry[] = [
  {
    id: "e-water",
    lemma: "Ğ¿ÑÑ‹",
    normalizedLemma: "Ğ¿ÑÑ‹",
    dialect: "KBD",
    groupId: "TRG_WATER",
    meanings: [
      { id: "m-tr", language: "TR", text: "su" },
      { id: "m-en", language: "EN", text: "water" },
      { id: "m-ru", language: "RU", text: "Ğ²Ğ¾Ğ´Ğ°" },
      { id: "m-ar", language: "AR", text: "Ù…Ø§Ø¡" },
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

  describe("1. Reverse Search (water / su / Ğ²Ğ¾Ğ´Ğ° â†’ Ğ¿ÑÑ‹)", () => {
    it("TÃ¼m hedef dillerdeki sorgular 'Ğ¿ÑÑ‹' lemmaya ulaÅŸmalÄ±dÄ±r", async () => {
      const targetQueries = ["water", "su", "Ğ²Ğ¾Ğ´Ğ°", "Ù…Ø§Ø¡"];

      for (const query of targetQueries) {
        const results = await repository.searchCrossDictionary(query);
        expect(results.length).toBeGreaterThan(0);
        
        const hasPsyLemma = results.some((e: TranslationEntry) => e.lemma === "Ğ¿ÑÑ‹");
        expect(hasPsyLemma).toBe(true);
      }
    });
  });

  describe("2. MultiLanguage Search (AynÄ± grubun sonuÃ§larÄ±nÄ± dÃ¶ndÃ¼rme)", () => {
    it("'water', 'su', 'Ğ²Ğ¾Ğ´Ğ°', 'Ğ¿ÑÑ‹' sorgularÄ± aynÄ± TRG_WATER grubunu dÃ¶ndÃ¼rmelidir", async () => {
      const queries = ["Ğ¿ÑÑ‹", "water", "su", "Ğ²Ğ¾Ğ´Ğ°"];

      for (const query of queries) {
        const results = query === "Ğ¿ÑÑ‹" 
          ? await service.search(query)
          : await repository.searchCrossDictionary(query);

        expect(results.length).toBeGreaterThan(0);
        expect(results[0].groupId).toBe("TRG_WATER");
      }
    });
  });

  describe("3. TranslationTable Matrisi (TR, EN, RU, AR Dillerinin Eksiksiz Matrisi)", () => {
    it("'Ğ¿ÑÑ‹' lemmaya ait TranslationEntry iÃ§in TR, EN, RU, AR matrisi Ã¼retilebilmelidir", async () => {
      const entries = await service.search("Ğ¿ÑÑ‹");
      expect(entries.length).toBeGreaterThan(0);

      const entry = entries[0];
      const languagesInEntry = entry.meanings.map((m) => m.language);

      // TR, EN, RU, AR dillerinin tÃ¼mÃ¼nÃ¼n mevcut olduÄŸunu doÄŸrula
      expect(languagesInEntry).toContain("TR");
      expect(languagesInEntry).toContain("EN");
      expect(languagesInEntry).toContain("RU");
      expect(languagesInEntry).toContain("AR");
    });
  });
});
