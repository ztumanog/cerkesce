import { describe, it, expect, beforeEach } from "vitest";
import { InMemoryTranslationRepository } from "../repository/InMemoryTranslationRepository";
import { TranslationService } from "../services/TranslationService";
import { MorphologyAwareMatchingService } from "../services/MorphologyAwareMatchingService";
import { TranslationEntry, TranslationGroup } from "../domain/translation";

const mockGroups: TranslationGroup[] = [
  { id: "g-head", groupName: "BaÅŸ KavramÄ±", entries: [] },
  { id: "TRG_WATER", groupName: "Su KavramÄ±", entries: [] },
];

const mockEntries: TranslationEntry[] = [
  {
    id: "e-1",
    lemma: "ÑˆÑŠÑ…ÑŒÑ",
    normalizedLemma: "ÑˆÑŠÑ…ÑŒÑ",
    dialect: "BATI",
    groupId: "g-head",
    meanings: [
      { id: "m-1", language: "TR", text: "baÅŸ" },
      { id: "m-1b", language: "EN", text: "head" },
    ],
  },
  {
    id: "e-water",
    lemma: "Ğ¿ÑÑ‹",
    normalizedLemma: "Ğ¿ÑÑ‹",
    dialect: "DOGU",
    groupId: "TRG_WATER",
    meanings: [
      { id: "m-water-tr", language: "TR", text: "su" },
      { id: "m-water-en", language: "EN", text: "water" },
      { id: "m-water-ru", language: "RU", text: "Ğ²Ğ¾Ğ´Ğ°" },
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
    const results = await translationService.search("ÑˆÑŠÑ…ÑŒÑ");
    expect(results).toBeDefined();
    expect(Array.isArray(results)).toBe(true);
    expect(results.length).toBeGreaterThan(0);
  });

  it("ters Ã§eviri yapabilmelidir", async () => {
    const result = await translationService.reverseTranslate("baÅŸ");
    expect(result).not.toBeNull();
  });

  it("TÃ¼m 'su / water / Ğ²Ğ¾Ğ´Ğ°' aramalarÄ± aynÄ± TRG_WATER grubuna ait olmalÄ±dÄ±r", async () => {
    const queries = ["Ğ¿ÑÑ‹", "su", "water", "Ğ²Ğ¾Ğ´Ğ°"];

    for (const query of queries) {
      const results =
        query === "Ğ¿ÑÑ‹"
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
