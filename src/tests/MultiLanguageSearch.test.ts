import { describe, it, expect, beforeEach } from "vitest";
import { TranslationService } from "../services/TranslationService";
import { MorphologyAwareMatchingService } from "../services/MorphologyAwareMatchingService";
import { TranslationEntry, TranslationGroup, LanguageCode } from "../domain/translation";

describe("MultiLanguageSearch Tests", () => {
  let translationService: TranslationService;
  let matchingService: MorphologyAwareMatchingService;
  let mockRepository: any;

  beforeEach(() => {
    const storage: TranslationEntry[] = [];
    mockRepository = {
      addEntry: async (entry: TranslationEntry) => {
        storage.push(entry);
        return entry;
      },
      getAll: async () => storage,
      search: async (query: string) => storage,
    };

    matchingService = new MorphologyAwareMatchingService();
    translationService = new TranslationService(mockRepository, matchingService);
  });

  it("should initialize correctly and search across multiple language entries", async () => {
    const mockGroup1: TranslationGroup = {
      id: "group-1",
      groupName: "Elma Grubu",
      entries: [],
    };

    const mockGroup2: TranslationGroup = {
      id: "group-2",
      groupName: "Ev Grubu",
      entries: [],
    };

    const entry1: TranslationEntry = {
      id: "1",
      lemma: "мыӀэрысе",
      groupId: mockGroup1.id,
      meanings: [{ id: "m1", text: "elma", value: "elma", language: "TR" as LanguageCode }],
    };

    const entry2: TranslationEntry = {
      id: "2",
      lemma: "унэ",
      groupId: mockGroup2.id,
      meanings: [{ id: "m2", text: "ev", value: "ev", language: "TR" as LanguageCode }],
    };

    await mockRepository.addEntry(entry1);
    await mockRepository.addEntry(entry2);

    const searchQueries = ["elma", "ev", "мыӀэрысе", "унэ", "apple"];

    for (const query of searchQueries) {
      // Artık search metodu doğrudan TranslationEntry[] dönüyor
      const items = await translationService.search(query);

      expect(items).toBeDefined();
      expect(Array.isArray(items)).toBe(true);

      if (query === "elma" || query === "мыӀэрысе") {
        expect(items.length).toBeGreaterThan(0);
        expect(
          items.some(
            (r: TranslationEntry) =>
              r.lemma === "мыӀэрысе" ||
              r.meanings?.some((m) => m.text === "elma")
          )
        ).toBe(true);
      }

      if (query === "ev" || query === "унэ") {
        expect(items.length).toBeGreaterThan(0);
        expect(
          items.some(
            (r: TranslationEntry) =>
              r.lemma === "унэ" ||
              r.meanings?.some((m) => m.text === "ev")
          )
        ).toBe(true);
      }
    }
  });
});