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
        groupName: "Su KavramÄ±",
        entries: [],
      },
      {
        id: "TRG_HOPE",
        groupName: "Umut KavramÄ±",
        entries: [],
      },
      {
        id: "TRG_HEAD",
        groupName: "BaÅŸ KavramÄ±",
        entries: [],
      },
    ];

    const entries: TranslationEntry[] = [
      {
        id: "ENTRY_WATER",
        lemma: "Ğ¿ÑÑ‹",
        normalizedLemma: "Ğ¿ÑÑ‹",
        dialect: "KBD",
        groupId: "TRG_WATER",
        meanings: [
          { id: "m-1", language: "TR", text: "water" },
          { id: "m-1b", language: "TR", text: "su" },
        ],
      },
      {
        id: "ENTRY_HOPE",
        lemma: "Ğ³ÑƒĞ³ÑŠÑ",
        normalizedLemma: "Ğ³ÑƒĞ³ÑŠÑ",
        dialect: "ADY",
        groupId: "TRG_HOPE",
        meanings: [
          { id: "m-2", language: "TR", text: "hope" },
          { id: "m-2b", language: "TR", text: "umut" },
        ],
      },
      {
        id: "ENTRY_HEAD",
        lemma: "ÑˆÑŠÑ…ÑŒÑ",
        normalizedLemma: "ÑˆÑŠÑ…ÑŒÑ",
        dialect: "ADY",
        groupId: "TRG_HEAD",
        meanings: [
          { id: "m-3", language: "TR", text: "head" },
          { id: "m-3b", language: "TR", text: "baÅŸ" },
        ],
      },
    ];

    repository = new InMemoryTranslationRepository(entries, groups);
    matchingService = new MorphologyAwareMatchingService();
    service = new TranslationService(repository, matchingService);
  });

  describe("Temel Reverse Arama", () => {
    test("water â†’ Ğ¿ÑÑ‹", async () => {
      const result = await service.reverseTranslate("water");

      expect(result).not.toBeNull();
      expect(result?.lemma).toBe("Ğ¿ÑÑ‹");
      expect(result?.meanings.some((m) => m.text === "water")).toBe(true);
    });

    test("hope â†’ Ğ³ÑƒĞ³ÑŠÑ", async () => {
      const result = await service.reverseTranslate("hope");

      expect(result).not.toBeNull();
      expect(result?.lemma).toBe("Ğ³ÑƒĞ³ÑŠÑ");
      expect(result?.meanings.some((m) => m.text === "hope")).toBe(true);
    });

    test("head â†’ ÑˆÑŠÑ…ÑŒÑ", async () => {
      const result = await service.reverseTranslate("head");

      expect(result).not.toBeNull();
      expect(result?.lemma).toBe("ÑˆÑŠÑ…ÑŒÑ");
      expect(result?.meanings.some((m) => m.text === "head")).toBe(true);
    });
  });

  describe("TÃ¼rkÃ§e Anlam AramasÄ±", () => {
    test("su â†’ Ğ¿ÑÑ‹", async () => {
      const result = await service.reverseTranslate("su");

      expect(result).not.toBeNull();
      expect(result?.lemma).toBe("Ğ¿ÑÑ‹");
    });

    test("umut â†’ Ğ³ÑƒĞ³ÑŠÑ", async () => {
      const result = await service.reverseTranslate("umut");

      expect(result).not.toBeNull();
      expect(result?.lemma).toBe("Ğ³ÑƒĞ³ÑŠÑ");
    });

    test("baÅŸ â†’ ÑˆÑŠÑ…ÑŒÑ", async () => {
      const result = await service.reverseTranslate("baÅŸ");

      expect(result).not.toBeNull();
      expect(result?.lemma).toBe("ÑˆÑŠÑ…ÑŒÑ");
    });
  });

  describe("Case Insensitive Arama", () => {
    test("WATER (bÃ¼yÃ¼k harf) â†’ Ğ¿ÑÑ‹", async () => {
      const result = await service.reverseTranslate("WATER");

      expect(result).not.toBeNull();
      expect(result?.lemma).toBe("Ğ¿ÑÑ‹");
    });

    test("HoPe (karÄ±ÅŸÄ±k harf) â†’ Ğ³ÑƒĞ³ÑŠÑ", async () => {
      const result = await service.reverseTranslate("HoPe");

      expect(result).not.toBeNull();
      expect(result?.lemma).toBe("Ğ³ÑƒĞ³ÑŠÑ");
    });
  });

  describe("Edge Cases", () => {
    test("boÅŸ string sorgusu null dÃ¶ndÃ¼rmelidir", async () => {
      const result = await service.reverseTranslate("");

      expect(result).toBeNull();
    });

    test("sadece boÅŸluk sorgusu null dÃ¶ndÃ¼rmelidir", async () => {
      const result = await service.reverseTranslate("   ");

      expect(result).toBeNull();
    });

    test("var olmayan anlam null dÃ¶ndÃ¼rmelidir", async () => {
      const result = await service.reverseTranslate("nonexistent");

      expect(result).toBeNull();
    });

    test("kÄ±smi eÅŸleÅŸme (partial match) Ã§alÄ±ÅŸmalÄ±dÄ±r", async () => {
      const result = await service.reverseTranslate("wat");

      expect(result).not.toBeNull();
      expect(result?.lemma).toBe("Ğ¿ÑÑ‹");
    });
  });

  describe("LehÃ§e DoÄŸrulamasÄ±", () => {
    test("dÃ¶ndÃ¼rÃ¼len sonuÃ§ dialect bilgisini iÃ§ermelidir", async () => {
      const result = await service.reverseTranslate("water");

      expect(result?.dialect).toBeDefined();
      expect(["KBD", "ADY"]).toContain(result?.dialect);
    });

    test("dÃ¶ndÃ¼rÃ¼len sonuÃ§ groupId bilgisini iÃ§ermelidir", async () => {
      const result = await service.reverseTranslate("hope");

      expect(result?.groupId).toBeDefined();
      expect(result?.groupId).toBe("TRG_HOPE");
    });
  });
});

