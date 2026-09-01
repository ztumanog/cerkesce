import { describe, it, expect, beforeEach } from "vitest";
import { InMemoryTranslationRepository } from "../repository/InMemoryTranslationRepository";
import { TranslationService } from "../services/TranslationService";
import { MorphologyAwareMatchingService } from "../services/MorphologyAwareMatchingService";
import { TranslationEntry, TranslationGroup } from "../domain/translation";

const mockGroups: TranslationGroup[] = [
  { id: "g-head", groupName: "Baş Kavramı", entries: [] },
  { id: "TRG_WATER", groupName: "Su Kavramı", entries: [] },
];

const mockEntries: TranslationEntry[] = [
  {
    id: "e-1",
    lemma: "шъхьэ",
    normalizedLemma: "шъхьэ",
    dialect: "BATI",
    groupId: "g-head",
    meanings: [
      { id: "m-1", language: "TR", text: "baş" },
      { id: "m-1b", language: "EN", text: "head" },
    ],
  },
  {
    id: "e-water",
    lemma: "псы",
    normalizedLemma: "псы",
    dialect: "DOGU",
    groupId: "TRG_WATER",
    meanings: [
      { id: "m-water-tr", language: "TR", text: "su" },
      { id: "m-water-en", language: "EN", text: "water" },
      { id: "m-water-ru", language: "RU", text: "вода" },
    ],
  },
];

describe("TranslationService Tests", () => {
  let repository: InMemoryTranslationRepository;
  let translationService: TranslationService;

  beforeEach(() => {
    repository = new InMemoryTranslationRepository(mockEntries, mockGroups);
    const matchingService = new MorphologyAwareMatchingService();
    translationService = new TranslationService(repository, matchingService);
  });

  it("arama yapabilmelidir", async () => {
    const results = await translationService.search("шъхьэ");
    expect(results).toBeDefined();
    expect(Array.isArray(results)).toBe(true);
    expect(results.length).toBeGreaterThan(0);
  });

  it("ters çeviri yapabilmelidir", async () => {
    const result = await translationService.reverseTranslate("baş");
    expect(result).not.toBeNull();
  });

  it("Tüm 'su / water / вода' aramaları aynı TRG_WATER grubuna ait olmalıdır", async () => {
    const queries = ["псы", "su", "water", "вода"];

    for (const query of queries) {
      const results =
        query === "псы"
          ? await translationService.search(query)
          : await repository.searchCrossDictionary(query);

      expect(results).toBeDefined();
      expect(results.length).toBeGreaterThan(0);

      const waterEntry = results.find(
        (e: TranslationEntry) => e.groupId === "TRG_WATER"
      );
      expect(waterEntry).toBeDefined();
      expect(waterEntry?.groupId).toBe("TRG_WATER");
    }
  });
});