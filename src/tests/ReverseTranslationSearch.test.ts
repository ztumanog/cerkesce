/**
 * @file src/tests/ReverseTranslationSearch.test.ts
 * @description Reverse Translation Search (Anlamdan Lemmaya Arama) Testleri
 */

import { describe, expect, test, beforeEach } from "vitest";
import { InMemoryTranslationRepository } from "../repository/InMemoryTranslationRepository";
import { ITranslationRepository } from "../repository/ITranslationRepository";
import { TranslationService } from "../services/TranslationService";
import { MorphologyAwareMatchingService } from "../services/MorphologyAwareMatchingService";
import type { TranslationEntry, TranslationGroup } from "../domain/translation";

describe("Reverse Translation Search - Anlamdan Lemmaya Arama", () => {
  let service: TranslationService;
  let repository: ITranslationRepository;
  let matchingService: MorphologyAwareMatchingService;

  beforeEach(() => {
    const groups: TranslationGroup[] = [
      {
        id: "TRG_WATER",
        groupName: "Su Kavramı",
        entries: [],
      },
      {
        id: "TRG_HOPE",
        groupName: "Umut Kavramı",
        entries: [],
      },
      {
        id: "TRG_HEAD",
        groupName: "Baş Kavramı",
        entries: [],
      },
    ];

    const entries: TranslationEntry[] = [
      {
        id: "ENTRY_WATER",
        lemma: "псы",
        normalizedLemma: "псы",
        dialect: "DOGU",
        groupId: "TRG_WATER",
        meanings: [
          { id: "m-1", language: "TR", text: "water" },
          { id: "m-1b", language: "TR", text: "su" },
        ],
      },
      {
        id: "ENTRY_HOPE",
        lemma: "гугъэ",
        normalizedLemma: "гугъэ",
        dialect: "BATI",
        groupId: "TRG_HOPE",
        meanings: [
          { id: "m-2", language: "TR", text: "hope" },
          { id: "m-2b", language: "TR", text: "umut" },
        ],
      },
      {
        id: "ENTRY_HEAD",
        lemma: "шъхьэ",
        normalizedLemma: "шъхьэ",
        dialect: "BATI",
        groupId: "TRG_HEAD",
        meanings: [
          { id: "m-3", language: "TR", text: "head" },
          { id: "m-3b", language: "TR", text: "baş" },
        ],
      },
    ];

    repository = new InMemoryTranslationRepository(entries, groups);
    matchingService = new MorphologyAwareMatchingService();
    service = new TranslationService(repository, matchingService);
  });

  describe("Temel Reverse Arama", () => {
    test("water → псы", async () => {
      const result = await service.reverseTranslate("water");

      expect(result).not.toBeNull();
      expect(result?.lemma).toBe("псы");
      expect(result?.meanings.some((m) => m.text === "water")).toBe(true);
    });

    test("hope → гугъэ", async () => {
      const result = await service.reverseTranslate("hope");

      expect(result).not.toBeNull();
      expect(result?.lemma).toBe("гугъэ");
      expect(result?.meanings.some((m) => m.text === "hope")).toBe(true);
    });

    test("head → шъхьэ", async () => {
      const result = await service.reverseTranslate("head");

      expect(result).not.toBeNull();
      expect(result?.lemma).toBe("шъхьэ");
      expect(result?.meanings.some((m) => m.text === "head")).toBe(true);
    });
  });

  describe("Türkçe Anlam Araması", () => {
    test("su → псы", async () => {
      const result = await service.reverseTranslate("su");

      expect(result).not.toBeNull();
      expect(result?.lemma).toBe("псы");
    });

    test("umut → гугъэ", async () => {
      const result = await service.reverseTranslate("umut");

      expect(result).not.toBeNull();
      expect(result?.lemma).toBe("гугъэ");
    });

    test("baş → шъхьэ", async () => {
      const result = await service.reverseTranslate("baş");

      expect(result).not.toBeNull();
      expect(result?.lemma).toBe("шъхьэ");
    });
  });

  describe("Case Insensitive Arama", () => {
    test("WATER (büyük harf) → псы", async () => {
      const result = await service.reverseTranslate("WATER");

      expect(result).not.toBeNull();
      expect(result?.lemma).toBe("псы");
    });

    test("HoPe (karışık harf) → гугъэ", async () => {
      const result = await service.reverseTranslate("HoPe");

      expect(result).not.toBeNull();
      expect(result?.lemma).toBe("гугъэ");
    });
  });

  describe("Edge Cases", () => {
    test("boş string sorgusu null döndürmelidir", async () => {
      const result = await service.reverseTranslate("");

      expect(result).toBeNull();
    });

    test("sadece boşluk sorgusu null döndürmelidir", async () => {
      const result = await service.reverseTranslate("   ");

      expect(result).toBeNull();
    });

    test("var olmayan anlam null döndürmelidir", async () => {
      const result = await service.reverseTranslate("nonexistent");

      expect(result).toBeNull();
    });

    test("kısmi eşleşme (partial match) çalışmalıdır", async () => {
      const result = await service.reverseTranslate("wat");

      expect(result).not.toBeNull();
      expect(result?.lemma).toBe("псы");
    });
  });

  describe("Lehçe Doğrulaması", () => {
    test("döndürülen sonuç dialect bilgisini içermelidir", async () => {
      const result = await service.reverseTranslate("water");

      expect(result?.dialect).toBeDefined();
      expect(["DOGU", "BATI"]).toContain(result?.dialect);
    });

    test("döndürülen sonuç groupId bilgisini içermelidir", async () => {
      const result = await service.reverseTranslate("hope");

      expect(result?.groupId).toBeDefined();
      expect(result?.groupId).toBe("TRG_HOPE");
    });
  });
});
