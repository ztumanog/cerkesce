/**
 * @file src/tests/MatchingService.test.ts
 * @description MorphologyAwareMatchingService birim testleri
 */

import { describe, test, expect, beforeEach } from "vitest";
// âœ… Hata kaynaÄŸÄ± olan re-export ifadesi kaldÄ±rÄ±ldÄ± ve doÄŸrudan servis dosyasÄ±ndan import edildi.
import { MorphologyAwareMatchingService } from "../services/MorphologyAwareMatchingService";
import { TranslationEntry } from "../domain/translation";

const makeEntry = (id: string, lemma: string, dialect: "DOGU" | "BATI" = "DOGU"): TranslationEntry => ({
  id,
  lemma,
  normalizedLemma: lemma,
  dialect,
  groupId: "g-test",
  meanings: [{ id: `m-${id}`, language: "TR", text: "test" }],
});

describe("MorphologyAwareMatchingService Testleri", () => {
  let service: MorphologyAwareMatchingService;

  beforeEach(() => {
    service = new MorphologyAwareMatchingService();
  });

  describe("matchEntries() - Girdi EÅŸleÅŸtirme", () => {
    test("aynÄ± lemma iÃ§in EXACT eÅŸleÅŸme dÃ¶ndÃ¼rmelidir", async () => {
      const a = makeEntry("e-1", "Ğ¿ÑÑ‹");
      const b = makeEntry("e-2", "Ğ¿ÑÑ‹");
      const result = await service.matchEntries(a, b);
      expect(result.matchType).toBe("EXACT");
      expect(result.score).toBe(1.0);
    });

    test("bÃ¼yÃ¼k/kÃ¼Ã§Ã¼k harf duyarsÄ±z EXACT eÅŸleÅŸme yapabilmelidir (Ã–rn: ĞŸĞ¡Ğ« ve Ğ¿ÑÑ‹)", async () => {
      const a = makeEntry("e-1", "ĞŸĞ¡Ğ«");
      const b = makeEntry("e-2", "Ğ¿ÑÑ‹");
      const result = await service.matchEntries(a, b);
      expect(result.matchType).toBe("EXACT");
      expect(result.score).toBe(1.0);
    });

    test("farklÄ± lemma iÃ§in NONE dÃ¶ndÃ¼rmelidir", async () => {
      const a = makeEntry("e-1", "Ğ¿ÑÑ‹");
      const b = makeEntry("e-2", "Ñ‰Ñ…ÑŒÑ");
      const result = await service.matchEntries(a, b);
      expect(result.matchType).toBe("NONE");
      expect(result.score).toBe(0.0);
    });

    test("kÄ±smi eÅŸleÅŸme iÃ§in FUZZY dÃ¶ndÃ¼rmelidir", async () => {
      const a = makeEntry("e-1", "Ğ¿ÑÑ‹");
      const b = makeEntry("e-2", "Ğ¿ÑÑ‹Ñ…ÑŠĞ¾");
      const result = await service.matchEntries(a, b);
      expect(result.matchType).toBe("FUZZY");
      expect(result.score).toBeGreaterThan(0);
    });

    test("boÅŸ lemma iÃ§in NONE dÃ¶ndÃ¼rmelidir", async () => {
      const a = makeEntry("e-1", "");
      const b = makeEntry("e-2", "Ğ¿ÑÑ‹");
      const result = await service.matchEntries(a, b);
      expect(result.matchType).toBe("NONE");
      expect(result.score).toBe(0.0);
    });
  });

  describe("matchEntries() - Kural UygulamasÄ±", () => {
    test("kural ile lehÃ§e varyasyonu eÅŸleÅŸtirmelidir", async () => {
      service.setRules([
        { 
          id: "r-1", 
          name: "ÑˆÑŠÑ…ÑŒÑâ†’Ñ‰Ñ…ÑŒÑ", 
          sourcePattern: "ÑˆÑŠÑ…ÑŒÑ", 
          targetPattern: "Ñ‰Ñ…ÑŒÑ", 
          confidenceScore: 0.9,
          fromDialect: "BATI",
          toDialect: "DOGU"
        },
      ]);
      const a = makeEntry("e-1", "ÑˆÑŠÑ…ÑŒÑ", "BATI");
      const b = makeEntry("e-2", "Ñ‰Ñ…ÑŒÑ", "DOGU");
      const result = await service.matchEntries(a, b);
      expect(result.matchType).toBe("MORPHOLOGY_DIALECT_VARIANT");
      expect(result.score).toBeCloseTo(0.9);
    });

    test("kural eÅŸleÅŸmesinde matchedRuleId dolu olmalÄ±dÄ±r", async () => {
      service.setRules([
        { 
          id: "r-1", 
          sourcePattern: "ÑˆÑŠÑ…ÑŒÑ", 
          targetPattern: "Ñ‰Ñ…ÑŒÑ", 
          confidenceScore: 0.9,
          fromDialect: "BATI",
          toDialect: "DOGU"
        },
      ]);
      const a = makeEntry("e-1", "ÑˆÑŠÑ…ÑŒÑ");
      const b = makeEntry("e-2", "Ñ‰Ñ…ÑŒÑ");
      const result = await service.matchEntries(a, b);
      expect(result.matchedRuleId).toBe("r-1");
    });
  });

  describe("setRules() - Kural Listesini GÃ¼ncelleme", () => {
    test("mevcut kurallarÄ± tamamen sÄ±fÄ±rlayÄ±p yenilerini atamalÄ±dÄ±r", async () => {
      service.addRule({ 
        id: "r-old", 
        sourcePattern: "Ğ¿ÑÑ‹", 
        targetPattern: "Ğ¿ÑĞ°",
        fromDialect: "BATI",
        toDialect: "DOGU"
      });
      service.setRules([]); // KurallarÄ± sÄ±fÄ±rla

      const a = makeEntry("e-1", "Ğ¿ÑÑ‹");
      const b = makeEntry("e-2", "Ğ¿ÑĞ°");
      const result = await service.matchEntries(a, b);

      expect(result.matchType).not.toBe("MORPHOLOGY_DIALECT_VARIANT");
    });
  });

  describe("calculateSimilarity() - Benzerlik Skoru", () => {
    test("aynÄ± girdi iÃ§in 1.0 dÃ¶ndÃ¼rmelidir", async () => {
      const a = makeEntry("e-1", "Ğ¿ÑÑ‹");
      const score = await service.calculateSimilarity(a, a);
      expect(score).toBe(1.0);
    });

    test("farklÄ± girdi iÃ§in 0.0 dÃ¶ndÃ¼rmelidir", async () => {
      const a = makeEntry("e-1", "Ğ¿ÑÑ‹");
      const b = makeEntry("e-2", "Ñ‰Ñ…ÑŒÑ");
      const score = await service.calculateSimilarity(a, b);
      expect(score).toBe(0.0);
    });
  });

  describe("applyRule() - Kural Uygulama", () => {
    test("kaynak deseni hedef ile deÄŸiÅŸtirmelidir", () => {
      const entry = makeEntry("e-1", "ÑˆÑŠÑ…ÑŒÑ");
      const result = service.applyRule(entry, {
        id: "r-1", 
        sourcePattern: "ÑˆÑŠÑ…ÑŒÑ", 
        targetPattern: "Ñ‰Ñ…ÑŒÑ",
        fromDialect: "BATI",
        toDialect: "DOGU"
      });
      expect(result).toBe("Ñ‰Ñ…ÑŒÑ");
    });

    test("eÅŸleÅŸme yoksa orijinal lemma dÃ¶ndÃ¼rmelidir", () => {
      const entry = makeEntry("e-1", "Ğ¿ÑÑ‹");
      const result = service.applyRule(entry, {
        id: "r-1", 
        sourcePattern: "ÑˆÑŠÑ…ÑŒÑ", 
        targetPattern: "Ñ‰Ñ…ÑŒÑ",
        fromDialect: "BATI",
        toDialect: "DOGU"
      });
      expect(result).toBe("Ğ¿ÑÑ‹");
    });
  });

  describe("evaluateRule() - Kural DeÄŸerlendirme", () => {
    test("kural adÄ±nÄ± dÃ¶ndÃ¼rmelidir", () => {
      const result = service.evaluateRule({ id: "r-1", name: "Test Kural", confidenceScore: 0.8 });
      expect(result.name).toBe("Test Kural");
    });

    test("gÃ¼ven skorunu dÃ¶ndÃ¼rmelidir", () => {
      const result = service.evaluateRule({ id: "r-1", confidenceScore: 0.75 });
      expect(result.score).toBe(0.75);
    });

    test("isim yoksa varsayÄ±lan isim Ã¼retmelidir", () => {
      const result = service.evaluateRule({ id: "r-42" });
      expect(result.name).toContain("42");
    });
  });

  describe("matchMeanings() - Anlam EÅŸleÅŸtirme", () => {
    test("eÅŸleÅŸen anlam iÃ§in true dÃ¶ndÃ¼rmelidir", () => {
      const entry: TranslationEntry = {
        id: "e-1", lemma: "Ğ¿ÑÑ‹", normalizedLemma: "Ğ¿ÑÑ‹", dialect: "DOGU", groupId: "g-test",
        meanings: [{ id: "m-1", language: "TR", text: "su, nehir" }],
      };
      expect(service.matchMeanings(entry, "su")).toBe(true);
    });

    test("eÅŸleÅŸmeyen anlam iÃ§in false dÃ¶ndÃ¼rmelidir", () => {
      const entry: TranslationEntry = {
        id: "e-1", lemma: "Ğ¿ÑÑ‹", normalizedLemma: "Ğ¿ÑÑ‹", dialect: "DOGU", groupId: "g-test",
        meanings: [{ id: "m-1", language: "TR", text: "su" }],
      };
      expect(service.matchMeanings(entry, "baÅŸ")).toBe(false);
    });

    test("boÅŸ meanings iÃ§in false dÃ¶ndÃ¼rmelidir", () => {
      const entry: TranslationEntry = {
        id: "e-1", lemma: "Ğ¿ÑÑ‹", normalizedLemma: "Ğ¿ÑÑ‹", dialect: "DOGU", groupId: "g-test",
        meanings: [],
      };
      expect(service.matchMeanings(entry, "su")).toBe(false);
    });
  });

  describe("addRule() - Kural Ekleme", () => {
    test("kural eklenebilmelidir", async () => {
      service.addRule({ 
        id: "r-new", 
        sourcePattern: "Ğ¿ÑÑ‹", 
        targetPattern: "Ğ¿ÑĞ°", 
        confidenceScore: 0.85,
        fromDialect: "BATI",
        toDialect: "DOGU"
      });
      const a = makeEntry("e-1", "Ğ¿ÑÑ‹");
      const b = makeEntry("e-2", "Ğ¿ÑĞ°");
      const result = await service.matchEntries(a, b);
      expect(result.matchType).toBe("MORPHOLOGY_DIALECT_VARIANT");
    });
  });
});
