// src/tests/InMemoryTranslationRepository.test.ts
import { describe, it, expect, beforeEach } from "vitest";

import { InMemoryTranslationRepository } from "../repository/InMemoryTranslationRepository";
import { MockTranslationRepository } from "../repository/MockTranslationRepository";
import { TranslationService } from "../services/TranslationService";
import { MorphologyAwareMatchingService } from "../services/MorphologyAwareMatchingService";

import { TranslationEntry, TranslationGroup } from "../domain/translation";

describe("InMemoryTranslationRepository Tests", () => {
  const mockGroups: TranslationGroup[] = [
    {
      id: "g-head",
      groupName: "BaÅŸ KavramÄ±",
      entries: [],
    },
    {
      id: "g-water",
      groupName: "Su ve SÄ±vÄ± KavramÄ±",
      entries: [],
    },
    {
      id: "g-heart",
      groupName: "Kalp KavramÄ±",
      entries: [],
    },
    {
      id: "g-head-tr",
      groupName: "BaÅŸ/Kafa Hibrit",
      entries: [],
    },
    {
      id: "g-soul",
      groupName: "Can/Ruh KavramÄ±",
      entries: [],
    },
  ];

  const mockEntries: TranslationEntry[] = [
    {
      id: "e-1",
      lemma: "ÑˆÑŠÑ…ÑŒÑ",
      normalizedLemma: "ÑˆÑŠÑ…ÑŒÑ",
      dialect: "BATI",
      groupId: "g-head",
      meanings: [
        {
          id: "m-1",
          language: "TR",
          text: "baÅŸ",
        },
      ],
    },
    {
      id: "e-2",
      lemma: "Ñ‰Ñ…ÑŒÑ",
      normalizedLemma: "Ñ‰Ñ…ÑŒÑ",
      dialect: "DOGU",
      groupId: "g-head",
      meanings: [
        {
          id: "m-2",
          language: "TR",
          text: "baÅŸ",
        },
      ],
    },
    {
      id: "e-3",
      lemma: "Ğ¿ÑÑ‹",
      normalizedLemma: "Ğ¿ÑÑ‹",
      dialect: "DOGU",
      groupId: "g-water",
      meanings: [
        {
          id: "m-3",
          language: "TR",
          text: "su, nehir",
        },
      ],
    },
    {
      id: "e-4",
      lemma: "Ğ¿ÑÑ‹Ñ…ÑŠĞ¾",
      normalizedLemma: "Ğ¿ÑÑ‹Ñ…ÑŠĞ¾",
      dialect: "BATI",
      groupId: "g-water",
      meanings: [
        {
          id: "m-4",
          language: "TR",
          text: "Ä±rmak, bÃ¼yÃ¼k su",
        },
      ],
    },
    {
      id: "e-5",
      lemma: "Ğ¶ÑŠÑ‹",
      normalizedLemma: "Ğ¶ÑŠÑ‹",
      dialect: "BATI",
      groupId: "g-head",
      meanings: [
        {
          id: "m-5",
          language: "TR",
          text: "eski",
        },
      ],
    },
    {
      id: "e-6",
      lemma: "Ğ³Ñƒ",
      normalizedLemma: "Ğ³Ñƒ",
      dialect: "DOGU",
      groupId: "g-heart",
      meanings: [
        {
          id: "m-6",
          language: "TR",
          text: "kalp",
        },
      ],
    },
    {
      id: "e-7",
      lemma: "Ğ±Ğ°Ñˆ",
      normalizedLemma: "Ğ±Ğ°Ñˆ",
      dialect: "BATI",
      groupId: "g-head-tr",
      meanings: [
        {
          id: "m-7",
          language: "TR",
          text: "baÅŸ, kafa",
        },
      ],
    },
    {
      id: "e-8",
      lemma: "Ğ¿ÑÑ",
      normalizedLemma: "Ğ¿ÑÑ",
      dialect: "DOGU",
      groupId: "g-soul",
      meanings: [
        {
          id: "m-8",
          language: "TR",
          text: "can, ruh",
        },
      ],
    },
  ];

  let repository: InMemoryTranslationRepository;
  let mockRepository: MockTranslationRepository;
  let translationService: TranslationService;

  beforeEach(() => {
    repository = new InMemoryTranslationRepository(mockEntries, mockGroups);
    mockRepository = new MockTranslationRepository();
    
    const matchingService = new MorphologyAwareMatchingService();
    // âœ… DÃœZELTME: mockRepository yerine repository kullanÄ±lÄ±yor
    translationService = new TranslationService(repository, matchingService);
  });

 describe("TranslationService Arama Testleri", () => {
    it("search() Ã¼zerinden arama yapabilmelidir", async () => {
      const results = await translationService.search("ÑˆÑŠÑ…ÑŒÑ");
      expect(results).toBeDefined();
      expect(Array.isArray(results)).toBe(true);
      expect(results.length).toBeGreaterThan(0);
    });

    it("var olmayan arama iÃ§in boÅŸ sonuÃ§ dÃ¶ndÃ¼rmelidir", async () => {
      const results = await translationService.search("olmayan_sorgu_123");
      expect(results).toBeDefined();
      expect(results).toEqual([]);
    });
  });
  describe("findByLemma() - Lemma ile Arama", () => {
    it("verilen lemma iÃ§in doÄŸru tekil girdiyi getirmelidir", async () => {
      const result = await repository.findByLemma("ÑˆÑŠÑ…ÑŒÑ");
      expect(result).not.toBeNull();
      expect(result?.id).toBe("e-1");
      expect(result?.meanings[0].text).toBe("baÅŸ");
    });

    it("bÃ¼yÃ¼k/kÃ¼Ã§Ã¼k harf duyarsÄ±z arama yapabilmelidir", async () => {
      const result = await repository.findByLemma("Ğ¨ĞªĞ¥\u04C0Ğ­");
      expect(result).not.toBeNull();
      expect(result?.id).toBe("e-1");
    });

    it("var olmayan bir lemma arandÄ±ÄŸÄ±nda null dÃ¶nmelidir", async () => {
      const result = await repository.findByLemma("olmayan_kelime");
      expect(result).toBeNull();
    });

    it("language alanÄ± doÄŸru dÃ¶ndÃ¼rÃ¼lmelidir", async () => {
      const result = await repository.findByLemma("ÑˆÑŠÑ…ÑŒÑ");
      expect(result?.meanings[0].language).toBe("TR");
    });
  });

  describe("findCanonicalById() - ID ile Arama", () => {
    it("geÃ§erli bir ID verildiÄŸinde doÄŸru nesneyi dÃ¶nmelidir", async () => {
      const entry = await repository.findCanonicalById("e-1");
      expect(entry).not.toBeNull();
      expect(entry?.lemma).toBe("ÑˆÑŠÑ…ÑŒÑ");
    });

    it("geÃ§ersiz bir ID iÃ§in null dÃ¶nmelidir", async () => {
      const entry = await repository.findCanonicalById("INVALID_ID");
      expect(entry).toBeNull();
    });

    it("dÃ¶ndÃ¼rÃ¼len giriÅŸ tÃ¼m alanlarÄ± iÃ§ermelidir", async () => {
      const entry = await repository.findCanonicalById("e-1");
      expect(entry).toHaveProperty("id");
      expect(entry).toHaveProperty("lemma");
      expect(entry).toHaveProperty("normalizedLemma");
      expect(entry).toHaveProperty("dialect");
      expect(entry).toHaveProperty("groupId");
      expect(entry).toHaveProperty("meanings");
    });
  });

  describe("findGroupSenses() - Grup ile Arama", () => {
    it("geÃ§erli bir groupId ile grup verisini getirmelidir", async () => {
      const group = await repository.findGroupSenses("g-head");
      expect(group).not.toBeNull();
      expect(group?.groupName).toBe("BaÅŸ KavramÄ±");
    });

    it("var olmayan bir groupId iÃ§in null dÃ¶nmelidir", async () => {
      const group = await repository.findGroupSenses("g-nonexistent");
      expect(group).toBeNull();
    });

    it("grup iÃ§inde doÄŸru girdileri iÃ§ermelidir", async () => {
      const group = await repository.findGroupSenses("g-head");
      expect(group?.entries.length).toBeGreaterThan(0);
      expect(
        group?.entries.every((e: TranslationEntry) => e.groupId === "g-head")
      ).toBe(true);
    });

    it("groupName alanÄ± doÄŸru ayarlanmÄ±ÅŸ olmalÄ±dÄ±r", async () => {
      const group = await repository.findGroupSenses("g-water");
      expect(group?.groupName).toBe("Su ve SÄ±vÄ± KavramÄ±");
    });
  });

  describe("searchCrossDictionary() - Ã‡apraz Arama", () => {
    it("meanings (anlam) dizisi iÃ§inde arama yapabilmelidir", async () => {
      const results = await repository.searchCrossDictionary("baÅŸ");
      expect(results.length).toBeGreaterThan(0);
      expect(
        results.some((e: TranslationEntry) =>
          e.meanings.some((m) => m.text.includes("baÅŸ"))
        )
      ).toBe(true);
    });

    it("lemma parÃ§asÄ± ile Ã§apraz arama yapabilmelidir", async () => {
      const results = await repository.searchCrossDictionary("Ğ¿Ñ");
      expect(results.length).toBeGreaterThanOrEqual(2);
    });

    it("bÃ¼yÃ¼k Kiril harfleri ile arama yapabilmelidir (Ã–rn: Ğ‘ĞĞ¨)", async () => {
      const results = await repository.searchCrossDictionary("Ğ‘ĞĞ¨");
      expect(results.length).toBeGreaterThan(0);
      expect(results.some((e: TranslationEntry) => e.id === "e-7")).toBe(true);
    });

    it("karma bÃ¼yÃ¼k/kÃ¼Ã§Ã¼k ve Kiril karakterler ile duyarsÄ±z arama yapabilmelidir", async () => {
      const results = await repository.searchCrossDictionary("Ğ‘ĞĞ¨");
      expect(results.length).toBeGreaterThan(0);
    });

    it("var olmayan sorgu iÃ§in boÅŸ dizi dÃ¶nmelidir", async () => {
      const results = await repository.searchCrossDictionary("olmayan_sorgu_xyz");
      expect(results).toEqual([]);
    });

    it("boÅŸ veya boÅŸluk karakterli sorgu iÃ§in tÃ¼m girdileri dÃ¶ndÃ¼rmelidir", async () => {
      const results = await repository.searchCrossDictionary("   ");
      expect(results.length).toBe(mockEntries.length);
    });
  });

  describe("MockTranslationRepository - getByLemma()", () => {
    it("MockRepository getByLemma() doÄŸru sonuÃ§ dÃ¶ndÃ¼rmelidir", async () => {
      const result = await mockRepository.getByLemma("ÑˆÑŠÑ…ÑŒÑ");
      expect(result).not.toBeNull();
      expect(result?.lemma).toBe("ÑˆÑŠÑ…ÑŒÑ");
      expect(result?.meanings[0].language).toBe("TR");
    });

    it("MockRepository olmayan lemma iÃ§in null dÃ¶nmelidir", async () => {
      const result = await mockRepository.getByLemma("olmayan");
      expect(result).toBeNull();
    });
  });

  describe("MockTranslationRepository - getTranslations()", () => {
    it("MockRepository getTranslations() sorguyu iÃ§eren girdileri dÃ¶ndÃ¼rmelidir", async () => {
      const results = await mockRepository.getTranslations("Ğ¿Ñ");
      expect(results.length).toBeGreaterThan(0);
    });

    it("MockRepository case-insensitive arama yapmalÄ±dÄ±r", async () => {
      const results = await mockRepository.getTranslations("ĞŸĞ¡");
      expect(results.length).toBeGreaterThan(0);
    });
  });

  describe("MockTranslationRepository - reverseLookup()", () => {
    it("MockRepository reverseLookup() anlam Ã¼zerinden arama yapmalÄ±dÄ±r", async () => {
      const results = await mockRepository.reverseLookup("baÅŸ");
      expect(results.length).toBeGreaterThan(0);
    });

    it("MockRepository reverseLookup() birden fazla sonuÃ§ dÃ¶ndÃ¼rebilmelidir", async () => {
      const results = await mockRepository.reverseLookup("baÅŸ");
      expect(results.length).toBeGreaterThanOrEqual(2);
    });
  });

  describe("MockTranslationRepository - getByGroup()", () => {
    it("MockRepository getByGroup() TranslationGroup dÃ¶ndÃ¼rmelidir", async () => {
      const result = await mockRepository.getByGroup("g-head");
      expect(result).not.toBeNull();
      expect(result?.id).toBe("g-head");
      expect(result?.groupName).toBe("BaÅŸ KavramÄ±");
    });

    it("MockRepository getByGroup() olmayan grup iÃ§in null dÃ¶nmelidir", async () => {
      const result = await mockRepository.getByGroup("olmayan-grup");
      expect(result).toBeNull();
    });
  });

  describe("LehÃ§e Filtreleme", () => {
    it("BATI lehÃ§esi girdileri doÄŸru dÃ¶ndÃ¼rÃ¼lmelidir", async () => {
      const result = await repository.findByLemma("ÑˆÑŠÑ…ÑŒÑ");
      expect(result?.dialect).toBe("BATI");
    });

    it("DOGU lehÃ§esi girdileri doÄŸru dÃ¶ndÃ¼rÃ¼lmelidir", async () => {
      const result = await repository.findByLemma("Ñ‰Ñ…ÑŒÑ");
      expect(result?.dialect).toBe("DOGU");
    });

    it("aynÄ± grup iÃ§inde farklÄ± lehÃ§eler olabilmelidir", async () => {
      const group = await repository.findGroupSenses("g-head");
      const dialects = new Set(group?.entries.map((e: TranslationEntry) => e.dialect));
      expect(dialects.size).toBeGreaterThan(1);
    });
  });

  describe("Meanings YapÄ±sÄ± DoÄŸrulamasÄ±", () => {
    it("tÃ¼m Ã¶ÄŸelerde language alanÄ± tanÄ±mlÄ± olmalÄ±dÄ±r", async () => {
      mockEntries.forEach((entry) => {
        expect(entry.meanings[0].language).toBe("TR");
      });
    });

    it("meanings dizisi id ve text alanlarÄ±nÄ± iÃ§ermelidir", async () => {
      const result = await repository.findByLemma("ÑˆÑŠÑ…ÑŒÑ");
      expect(result?.meanings[0]).toHaveProperty("id");
      expect(result?.meanings[0]).toHaveProperty("text");
      expect(result?.meanings[0]).toHaveProperty("language");
    });

    it("meanings dizisi boÅŸ olmamalÄ±dÄ±r", async () => {
      const result = await repository.findByLemma("ÑˆÑŠÑ…ÑŒÑ");
      expect(result?.meanings.length).toBeGreaterThan(0);
    });
  });

  describe("normalizedLemma AlanÄ±", () => {
    it("normalizedLemma alanÄ± lemma ile eÅŸleÅŸmelidir", async () => {
      const result = await repository.findByLemma("ÑˆÑŠÑ…ÑŒÑ");
      expect(result?.normalizedLemma).toBe(result?.lemma);
    });

    it("tÃ¼m girdilerde normalizedLemma tanÄ±mlÄ± olmalÄ±dÄ±r", async () => {
      mockEntries.forEach((entry) => {
        expect(entry.normalizedLemma).toBeDefined();
        expect(entry.normalizedLemma!.length).toBeGreaterThan(0);
      });
    });
  });

  describe("groupId AlanÄ±", () => {
    it("tÃ¼m girdilerde groupId tanÄ±mlÄ± olmalÄ±dÄ±r", async () => {
      mockEntries.forEach((entry) => {
        expect(entry.groupId).toBeDefined();
      });
    });

    it("groupId geÃ§erli bir grup referansÄ± olmalÄ±dÄ±r", async () => {
      const result = await repository.findByLemma("ÑˆÑŠÑ…ÑŒÑ");
      const group = await repository.findGroupSenses(result?.groupId || "");
      expect(group).not.toBeNull();
    });
  });

  describe("Repository UyumluluÄŸu", () => {
    it("InMemoryTranslationRepository ve MockTranslationRepository aynÄ± sonuÃ§larÄ± dÃ¶ndÃ¼rmelidir", async () => {
      const inMemResult = await repository.findByLemma("ÑˆÑŠÑ…ÑŒÑ");
      const mockResult = await mockRepository.getByLemma("ÑˆÑŠÑ…ÑŒÑ");

      expect(inMemResult?.lemma).toBe(mockResult?.lemma);
      expect(inMemResult?.meanings[0].text).toBe(mockResult?.meanings[0].text);
    });

    it("Her iki repository de case-insensitive arama yapmalÄ±dÄ±r", async () => {
      const inMemResults = await repository.searchCrossDictionary("Ğ‘ĞĞ¨");
      const mockResults = await mockRepository.getTranslations("ĞŸĞ¡");

      expect(inMemResults.length).toBeGreaterThan(0);
      expect(mockResults.length).toBeGreaterThan(0);
    });
  });
});
