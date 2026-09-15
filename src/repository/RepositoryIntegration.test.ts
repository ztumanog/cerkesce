/**
 * @file src/repository/RepositoryIntegration.test.ts
 * @description Repository Entegrasyon Testleri - ADR-0007 StandardÄ±
 */

import { InMemoryTranslationRepository } from "./InMemoryTranslationRepository";
import { TranslationEntry, TranslationMeaning, TranslationGroup } from "@/domain/translation";

// Testlerde kullanÄ±lacak Ã¶rnek veri seti
const mockEntries: (TranslationEntry & { groupId?: string })[] = [
  {
    id: "1",
    lemma: "ÑˆÑŠÑ…ÑŒÑ",
    normalizedLemma: "ÑˆÑŠÑ…ÑŒÑ",
    dialect: "BATI",
    groupId: "g-head",
    meanings: [
      { id: "m1", text: "baÅŸ, kafa", language: "TR" }
    ]
  },
  {
    id: "2",
    lemma: "Ñ‰Ñ…ÑŒÑ",
    normalizedLemma: "Ñ‰Ñ…ÑŒÑ",
    dialect: "DOGU",
    groupId: "g-head",
    meanings: [
      { id: "m2", text: "baÅŸ, kafa", language: "TR" }
    ]
  },
  {
    id: "3",
    lemma: "Ğ¿ÑÑ‹",
    normalizedLemma: "Ğ¿ÑÑ‹",
    dialect: "BATI",
    groupId: "g-water",
    meanings: [
      { id: "m3", text: "su", language: "TR" }
    ]
  },
  {
    id: "4",
    lemma: "Ğ¿ÑÑ‹Ñ…ÑŠĞ¾",
    normalizedLemma: "Ğ¿ÑÑ‹Ñ…ÑŠĞ¾",
    dialect: "BATI",
    groupId: "g-water",
    meanings: [
      { id: "m4", text: "nehir, Ä±rmak", language: "TR" }
    ]
  }
];

const mockGroups: TranslationGroup[] = [
  {
    id: "g-head",
    groupName: "BaÅŸ KavramÄ±",
    entries: mockEntries.filter((e) => e.groupId === "g-head")
  },
  {
    id: "g-water",
    groupName: "Su KavramÄ±",
    entries: mockEntries.filter((e) => e.groupId === "g-water")
  }
];

describe("ITranslationRepository Integration", () => {
  let repository: InMemoryTranslationRepository;

  beforeEach(() => {
    repository = new InMemoryTranslationRepository(mockEntries, mockGroups);
  });

  describe("getByLemma() - Lemma ile Arama", () => {
    test("getByLemma kelimeyi doÄŸru dÃ¶ndÃ¼rmelidir", async () => {
      const result = await repository.getByLemma("ÑˆÑŠÑ…ÑŒÑ");
      expect(result).not.toBeNull();
      expect(result?.lemma).toBe("ÑˆÑŠÑ…ÑŒÑ");
      expect(result?.meanings[0].language).toBe("TR");
    });

    test("olmayan lemma iÃ§in null dÃ¶nmelidir", async () => {
      const result = await repository.getByLemma("olmayan-kelime");
      expect(result).toBeNull();
    });

    test("normalizedLemma alanÄ± doÄŸru ayarlanmÄ±ÅŸ olmalÄ±dÄ±r", async () => {
      const result = await repository.getByLemma("Ñ‰Ñ…ÑŒÑ");
      expect(result?.normalizedLemma).toBe("Ñ‰Ñ…ÑŒÑ");
    });

    test("dialect bilgisi doÄŸru dÃ¶ndÃ¼rÃ¼lmelidir", async () => {
      const result = await repository.getByLemma("ÑˆÑŠÑ…ÑŒÑ");
      expect(result?.dialect).toBe("BATI");
    });
  });

  describe("getTranslations() - Sorgu ile Arama", () => {
    test("sorgu dizesini iÃ§eren tÃ¼m girdileri dÃ¶ndÃ¼rmelidir", async () => {
      const results = await repository.getTranslations("Ğ¿Ñ");
      expect(results.length).toBeGreaterThan(0);
      expect(results.some((e: TranslationEntry) => e.lemma.includes("Ğ¿Ñ"))).toBe(true);
    });

    test("boÅŸ sonuÃ§ iÃ§in boÅŸ dizi dÃ¶ndÃ¼rmelidir", async () => {
      const results = await repository.getTranslations("xyz-olmayan");
      expect(results).toEqual([]);
    });

    test("case-insensitive arama yapmalÄ±dÄ±r", async () => {
      const results = await repository.getTranslations("ĞŸĞ¡");
      expect(results.length).toBeGreaterThan(0);
    });
  });

  describe("reverseLookup() - Anlam ile Ters Arama", () => {
    test("reverseLookup anlam Ã¼zerinden arama yapmalÄ±dÄ±r", async () => {
      const results = await repository.reverseLookup("baÅŸ");
      expect(results.length).toBeGreaterThan(0);
      expect(
        results.some((e: TranslationEntry) =>
          e.meanings.some((m: TranslationMeaning) => m.text.includes("baÅŸ"))
        )
      ).toBe(true);
    });

    test("birden fazla lehÃ§ede aynÄ± anlama sahip girdileri dÃ¶ndÃ¼rmelidir", async () => {
      const results = await repository.reverseLookup("baÅŸ");
      expect(results.length).toBeGreaterThanOrEqual(2);
    });

    test("olmayan anlam iÃ§in boÅŸ dizi dÃ¶ndÃ¼rmelidir", async () => {
      const results = await repository.reverseLookup("olmayan-anlam");
      expect(results).toEqual([]);
    });

    test("case-insensitive anlam aramasÄ± yapmalÄ±dÄ±r", async () => {
      const results = await repository.reverseLookup("BAÅ");
      expect(results.length).toBeGreaterThan(0);
    });
  });

  describe("getByGroup() - Grup ile Arama", () => {
    test("getByGroup grup ID'sine gÃ¶re TranslationGroup dÃ¶ndÃ¼rmelidir", async () => {
      const result = await repository.getByGroup("g-head");
      expect(result).not.toBeNull();
      expect(result?.id).toBe("g-head");
      expect(result?.groupName).toBe("BaÅŸ KavramÄ±");
    });

    test("grup iÃ§inde birden fazla giriÅŸ olmalÄ±dÄ±r", async () => {
      const result = await repository.getByGroup("g-head");
      expect(result?.entries.length).toBeGreaterThanOrEqual(2);
    });

    test("olmayan grup ID'si iÃ§in null dÃ¶nmelidir", async () => {
      const result = await repository.getByGroup("olmayan-grup");
      expect(result).toBeNull();
    });

    test("su grubu doÄŸru girdileri iÃ§ermelidir", async () => {
      const result = await repository.getByGroup("g-water");
      expect(result?.entries.some((e: TranslationEntry) => e.lemma === "Ğ¿ÑÑ‹")).toBe(true);
      expect(result?.entries.some((e: TranslationEntry) => e.lemma === "Ğ¿ÑÑ‹Ñ…ÑŠĞ¾")).toBe(true);
    });

    test("grup iÃ§indeki tÃ¼m girdiler aynÄ± groupId'ye sahip olmalÄ±dÄ±r", async () => {
      const result = await repository.getByGroup("g-head");
      expect(
        result?.entries.every(
          (e: TranslationEntry & { groupId?: string }) => e.groupId === "g-head"
        )
      ).toBe(true);
    });
  });

  describe("LehÃ§e Filtreleme", () => {
    test("BATI lehÃ§esi girdileri doÄŸru dÃ¶ndÃ¼rÃ¼lmelidir", async () => {
      const result = await repository.getByLemma("ÑˆÑŠÑ…ÑŒÑ");
      expect(result?.dialect).toBe("BATI");
    });

    test("DOGU lehÃ§esi girdileri doÄŸru dÃ¶ndÃ¼rÃ¼lmelidir", async () => {
      const result = await repository.getByLemma("Ñ‰Ñ…ÑŒÑ");
      expect(result?.dialect).toBe("DOGU");
    });
  });

  describe("Meanings YapÄ±sÄ±", () => {
    test("meanings dizisi language alanÄ±nÄ± iÃ§ermelidir", async () => {
      const result = await repository.getByLemma("ÑˆÑŠÑ…ÑŒÑ");
      expect(result?.meanings[0]).toHaveProperty("language");
      expect(result?.meanings[0].language).toBe("TR");
    });

    test("meanings dizisi id ve text alanlarÄ±nÄ± iÃ§ermelidir", async () => {
      const result = await repository.getByLemma("ÑˆÑŠÑ…ÑŒÑ");
      expect(result?.meanings[0]).toHaveProperty("id");
      expect(result?.meanings[0]).toHaveProperty("text");
    });
  });
});
