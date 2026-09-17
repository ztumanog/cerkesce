import { describe, it, expect, beforeEach } from "vitest";
import { InMemoryTranslationRepository } from "../repository/InMemoryTranslationRepository";
import { TranslationService } from "../services/TranslationService";
import { LanguageCode, TranslationEntry } from "../domain/translation";

describe("ADR-0008 Type Safety & Multi-Language Filter Validation", () => {
  let repository: InMemoryTranslationRepository;
  let service: TranslationService;

  const LANGUAGES: LanguageCode[] = ["TR", "EN", "RU", "AR"];

  beforeEach(async () => {
    repository = new InMemoryTranslationRepository();
    service = new TranslationService(repository);

    // Seed 10 test entries, each with meanings in TR, EN, RU, AR
    for (let i = 1; i <= 10; i++) {
      const entry: TranslationEntry = {
        id: `e-${i}`,
        sourceId: "test_dict",
        sourceEntryId: `${100 + i}`,
        lemma: `lemma_${i}`,
        language: "kbd" as LanguageCode,
        meanings: [
          { id: `m_tr_${i}`, language: "TR" as LanguageCode, text: `test_su_${i}` },
          { id: `m_en_${i}`, language: "EN" as LanguageCode, text: `test_water_${i}` },
          { id: `m_ru_${i}`, language: "RU" as LanguageCode, text: `test_voda_${i}` },
          { id: `m_ar_${i}`, language: "AR" as LanguageCode, text: `test_maa_${i}` },
        ],
      };
      await repository.save(entry);
    }
  });

  it("Zorunlu dil filtresi (TR/EN/RU/AR) izolasyonunu tam doğrulamalı", async () => {
    for (const lang of LANGUAGES) {
      const results = await service.searchByMeaning("test_", lang);
      expect(results.length).toBe(10);
      results.forEach((entry) => {
        const matches = entry.meanings.filter((m) => m.language === lang);
        expect(matches.length).toBeGreaterThan(0);
      });
    }
  });

  it("Filtresiz aramada tüm dillerdeki eşleşmeler dönmeli", async () => {
    const results = await service.searchByMeaning("test_");
    expect(results.length).toBe(10);
  });

  it("Yanlış dil filtresinde boş dizi dönmeli", async () => {
    // "test_water_1" only exists in EN, so searching for it in TR should return []
    const results = await service.searchByMeaning("test_water_1", "TR");
    expect(results.length).toBe(0);
  });
});