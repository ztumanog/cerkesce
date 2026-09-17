/**
 * @file src/tests/MatchingService.test.ts
 * @description MorphologyAwareMatchingService birim testleri
 */

import { describe, test, expect, beforeEach } from "vitest";
import { MorphologyAwareMatchingService } from "../services/MorphologyAwareMatchingService";
import { TranslationEntry } from "../domain/translation";

const makeEntry = (
  id: string,
  lemma: string,
  dialect: "DOGU" | "BATI" = "DOGU"
): TranslationEntry => ({
  id,
  lemma,
  normalizedLemma: lemma.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
  dialect,
  groupId: "g-test",
  meanings: [{ id: `m-${id}`, language: "TR", text: "test" }],
});

describe("MorphologyAwareMatchingService Testleri", () => {
  let service: MorphologyAwareMatchingService;

  beforeEach(() => {
    service = new MorphologyAwareMatchingService();
  });

  describe("matchEntries() - Girdi Eşleştirme", () => {
    test("aynı lemma için EXACT eşleşme döndürmelidir", async () => {
      const a = makeEntry("e-1", "psı");
      const b = makeEntry("e-2", "psı");
      const result = await service.matchEntries(a, b);
      expect(result.matchType).toBe("EXACT");
      expect(result.score).toBe(1.0);
    });

    test("büyük/küçük harf duyarsız EXACT eşleşme yapabilmelidir (Örn: PSı ve psı)", async () => {
      const a = makeEntry("e-1", "PSı");
      const b = makeEntry("e-2", "psı");
      const result = await service.matchEntries(a, b);
      expect(result.matchType).toBe("EXACT");
      expect(result.score).toBe(1.0);
    });

    test("farklı lemma için NONE döndürmelidir", async () => {
      const a = makeEntry("e-1", "psı");
      const b = makeEntry("e-2", "şx́ó");
      const result = await service.matchEntries(a, b);
      expect(result.matchType).toBe("NONE");
      expect(result.score).toBe(0.0);
    });

    test("kısmi eşleşme için FUZZY döndürmelidir", async () => {
      const a = makeEntry("e-1", "psı");
      const b = makeEntry("e-2", "psıx́ó");
      const result = await service.matchEntries(a, b);
      expect(result.matchType).toBe("FUZZY");
      expect(result.score).toBeGreaterThan(0);
    });

    test("boş lemma için NONE döndürmelidir", async () => {
      const a = makeEntry("e-1", "");
      const b = makeEntry("e-2", "psı");
      const result = await service.matchEntries(a, b);
      expect(result.matchType).toBe("NONE");
      expect(result.score).toBe(0.0);
    });
  });

  describe("matchEntries() - Kural Uygulaması", () => {
    test("kural ile lehçe varyasyonu eşleştirmelidir", async () => {
      service.setRules([
        {
          id: "r-1",
          name: "şx́ó → şx́ó",
          sourcePattern: "şx́ó",
          targetPattern: "şx́ó",
          confidenceScore: 0.9,
          fromDialect: "BATI",
          toDialect: "DOGU",
        },
      ]);
      const a = makeEntry("e-1", "şx́ó", "BATI");
      const b = makeEntry("e-2", "şx́ó", "DOGU");
      const result = await service.matchEntries(a, b);
      expect(result.matchType).toBe("MORPHOLOGY_DIALECT_VARIANT");
      expect(result.score).toBeCloseTo(0.9);
    });

    test("kural eşleşmesinde matchedRuleId dolu olmalıdır", async () => {
      service.setRules([
        {
          id: "r-1",
          sourcePattern: "şx́ó",
          targetPattern: "şx́ó",
          confidenceScore: 0.9,
          fromDialect: "BATI",
          toDialect: "DOGU",
        },
      ]);
      const a = makeEntry("e-1", "şx́ó");
      const b = makeEntry("e-2", "şx́ó");
      const result = await service.matchEntries(a, b);
      expect(result.matchedRuleId).toBe("r-1");
    });
  });

  describe("setRules() - Kural Listesini Güncelleme", () => {
    test("mevcut kuralları tamamen sıfırlayıp yenilerini atamalıdır", async () => {
      service.addRule({
        id: "r-old",
        sourcePattern: "psı",
        targetPattern: "psa",
        fromDialect: "BATI",
        toDialect: "DOGU",
      });
      service.setRules([]); // Kuralları sıfırla

      const a = makeEntry("e-1", "psı");
      const b = makeEntry("e-2", "psa");
      const result = await service.matchEntries(a, b);

      expect(result.matchType).not.toBe("MORPHOLOGY_DIALECT_VARIANT");
    });
  });

  describe("calculateSimilarity() - Benzerlik Skoru", () => {
    test("aynı girdi için 1.0 döndürmelidir", async () => {
      const a = makeEntry("e-1", "psı");
      const score = await service.calculateSimilarity(a, a);
      expect(score).toBe(1.0);
    });

    test("farklı girdi için 0.0 döndürmelidir", async () => {
      const a = makeEntry("e-1", "psı");
      const b = makeEntry("e-2", "şx́ó");
      const score = await service.calculateSimilarity(a, b);
      expect(score).toBe(0.0);
    });
  });

  describe("applyRule() - Kural Uygulama", () => {
    test("kaynak deseni hedef ile değiştirmelidir", () => {
      const entry = makeEntry("e-1", "şx́ó");
      const result = service.applyRule(entry, {
        id: "r-1",
        sourcePattern: "şx́ó",
        targetPattern: "şx́ó",
        fromDialect: "BATI",
        toDialect: "DOGU",
      });
      expect(result).toBe("şx́ó");
    });

    test("eşleşme yoksa orijinal lemma döndürmelidir", () => {
      const entry = makeEntry("e-1", "psı");
      const result = service.applyRule(entry, {
        id: "r-1",
        sourcePattern: "şx́ó",
        targetPattern: "şx́ó",
        fromDialect: "BATI",
        toDialect: "DOGU",
      });
      expect(result).toBe("psı");
    });
  });

  describe("evaluateRule() - Kural Değerlendirme", () => {
    test("kural adını döndürmelidir", () => {
      const result = service.evaluateRule({
        id: "r-1",
        name: "Test Kural",
        confidenceScore: 0.8,
      });
      expect(result.name).toBe("Test Kural");
    });

    test("güven skorunu döndürmelidir", () => {
      const result = service.evaluateRule({
        id: "r-1",
        confidenceScore: 0.75,
      });
      expect(result.score).toBe(0.75);
    });

    test("isim yoksa varsayılan isim üretmelidir", () => {
      const result = service.evaluateRule({ id: "r-42" });
      expect(result.name).toContain("42");
    });
  });

  describe("matchMeanings() - Anlam Eşleştirme", () => {
    test("eşleşen anlam için true döndürmelidir", () => {
      const entry: TranslationEntry = {
        id: "e-1",
        lemma: "psı",
        normalizedLemma: "psı",
        dialect: "DOGU",
        groupId: "g-test",
        meanings: [{ id: "m-1", language: "TR", text: "su, nehir" }],
      };
      expect(service.matchMeanings(entry, "su")).toBe(true);
    });

    test("eşleşmeyen anlam için false döndürmelidir", () => {
      const entry: TranslationEntry = {
        id: "e-1",
        lemma: "psı",
        normalizedLemma: "psı",
        dialect: "DOGU",
        groupId: "g-test",
        meanings: [{ id: "m-1", language: "TR", text: "su" }],
      };
      expect(service.matchMeanings(entry, "baş")).toBe(false);
    });

    test("boş meanings için false döndürmelidir", () => {
      const entry: TranslationEntry = {
        id: "e-1",
        lemma: "psı",
        normalizedLemma: "psı",
        dialect: "DOGU",
        groupId: "g-test",
        meanings: [],
      };
      expect(service.matchMeanings(entry, "su")).toBe(false);
    });
  });

  describe("addRule() - Kural Ekleme", () => {
    test("kural eklenebilmelidir", async () => {
      service.addRule({
        id: "r-new",
        sourcePattern: "psı",
        targetPattern: "psa",
        confidenceScore: 0.85,
        fromDialect: "BATI",
        toDialect: "DOGU",
      });
      const a = makeEntry("e-1", "psı");
      const b = makeEntry("e-2", "psa");
      const result = await service.matchEntries(a, b);
      expect(result.matchType).toBe("MORPHOLOGY_DIALECT_VARIANT");
    });
  });
});