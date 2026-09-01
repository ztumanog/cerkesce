/**
 * @file src/repository/RepositoryIntegration.test.ts
 * @description Repository Entegrasyon Testleri - ADR-0007 Standardı
 */

import { InMemoryTranslationRepository } from "./InMemoryTranslationRepository";
import { TranslationEntry, TranslationMeaning, TranslationGroup } from "@/domain/translation";

// Testlerde kullanılacak örnek veri seti
const mockEntries: (TranslationEntry & { groupId?: string })[] = [
  {
    id: "1",
    lemma: "шъхьэ",
    normalizedLemma: "шъхьэ",
    dialect: "BATI",
    groupId: "g-head",
    meanings: [
      { id: "m1", text: "baş, kafa", language: "TR" }
    ]
  },
  {
    id: "2",
    lemma: "щхьэ",
    normalizedLemma: "щхьэ",
    dialect: "DOGU",
    groupId: "g-head",
    meanings: [
      { id: "m2", text: "baş, kafa", language: "TR" }
    ]
  },
  {
    id: "3",
    lemma: "псы",
    normalizedLemma: "псы",
    dialect: "BATI",
    groupId: "g-water",
    meanings: [
      { id: "m3", text: "su", language: "TR" }
    ]
  },
  {
    id: "4",
    lemma: "псыхъо",
    normalizedLemma: "псыхъо",
    dialect: "BATI",
    groupId: "g-water",
    meanings: [
      { id: "m4", text: "nehir, ırmak", language: "TR" }
    ]
  }
];

const mockGroups: TranslationGroup[] = [
  {
    id: "g-head",
    groupName: "Baş Kavramı",
    entries: mockEntries.filter((e) => e.groupId === "g-head")
  },
  {
    id: "g-water",
    groupName: "Su Kavramı",
    entries: mockEntries.filter((e) => e.groupId === "g-water")
  }
];

describe("ITranslationRepository Integration", () => {
  let repository: InMemoryTranslationRepository;

  beforeEach(() => {
    repository = new InMemoryTranslationRepository(mockEntries, mockGroups);
  });

  describe("getByLemma() - Lemma ile Arama", () => {
    test("getByLemma kelimeyi doğru döndürmelidir", async () => {
      const result = await repository.getByLemma("шъхьэ");
      expect(result).not.toBeNull();
      expect(result?.lemma).toBe("шъхьэ");
      expect(result?.meanings[0].language).toBe("TR");
    });

    test("olmayan lemma için null dönmelidir", async () => {
      const result = await repository.getByLemma("olmayan-kelime");
      expect(result).toBeNull();
    });

    test("normalizedLemma alanı doğru ayarlanmış olmalıdır", async () => {
      const result = await repository.getByLemma("щхьэ");
      expect(result?.normalizedLemma).toBe("щхьэ");
    });

    test("dialect bilgisi doğru döndürülmelidir", async () => {
      const result = await repository.getByLemma("шъхьэ");
      expect(result?.dialect).toBe("BATI");
    });
  });

  describe("getTranslations() - Sorgu ile Arama", () => {
    test("sorgu dizesini içeren tüm girdileri döndürmelidir", async () => {
      const results = await repository.getTranslations("пс");
      expect(results.length).toBeGreaterThan(0);
      expect(results.some((e: TranslationEntry) => e.lemma.includes("пс"))).toBe(true);
    });

    test("boş sonuç için boş dizi döndürmelidir", async () => {
      const results = await repository.getTranslations("xyz-olmayan");
      expect(results).toEqual([]);
    });

    test("case-insensitive arama yapmalıdır", async () => {
      const results = await repository.getTranslations("ПС");
      expect(results.length).toBeGreaterThan(0);
    });
  });

  describe("reverseLookup() - Anlam ile Ters Arama", () => {
    test("reverseLookup anlam üzerinden arama yapmalıdır", async () => {
      const results = await repository.reverseLookup("baş");
      expect(results.length).toBeGreaterThan(0);
      expect(
        results.some((e: TranslationEntry) =>
          e.meanings.some((m: TranslationMeaning) => m.text.includes("baş"))
        )
      ).toBe(true);
    });

    test("birden fazla lehçede aynı anlama sahip girdileri döndürmelidir", async () => {
      const results = await repository.reverseLookup("baş");
      expect(results.length).toBeGreaterThanOrEqual(2);
    });

    test("olmayan anlam için boş dizi döndürmelidir", async () => {
      const results = await repository.reverseLookup("olmayan-anlam");
      expect(results).toEqual([]);
    });

    test("case-insensitive anlam araması yapmalıdır", async () => {
      const results = await repository.reverseLookup("BAŞ");
      expect(results.length).toBeGreaterThan(0);
    });
  });

  describe("getByGroup() - Grup ile Arama", () => {
    test("getByGroup grup ID'sine göre TranslationGroup döndürmelidir", async () => {
      const result = await repository.getByGroup("g-head");
      expect(result).not.toBeNull();
      expect(result?.id).toBe("g-head");
      expect(result?.groupName).toBe("Baş Kavramı");
    });

    test("grup içinde birden fazla giriş olmalıdır", async () => {
      const result = await repository.getByGroup("g-head");
      expect(result?.entries.length).toBeGreaterThanOrEqual(2);
    });

    test("olmayan grup ID'si için null dönmelidir", async () => {
      const result = await repository.getByGroup("olmayan-grup");
      expect(result).toBeNull();
    });

    test("su grubu doğru girdileri içermelidir", async () => {
      const result = await repository.getByGroup("g-water");
      expect(result?.entries.some((e: TranslationEntry) => e.lemma === "псы")).toBe(true);
      expect(result?.entries.some((e: TranslationEntry) => e.lemma === "псыхъо")).toBe(true);
    });

    test("grup içindeki tüm girdiler aynı groupId'ye sahip olmalıdır", async () => {
      const result = await repository.getByGroup("g-head");
      expect(
        result?.entries.every(
          (e: TranslationEntry & { groupId?: string }) => e.groupId === "g-head"
        )
      ).toBe(true);
    });
  });

  describe("Lehçe Filtreleme", () => {
    test("BATI lehçesi girdileri doğru döndürülmelidir", async () => {
      const result = await repository.getByLemma("шъхьэ");
      expect(result?.dialect).toBe("BATI");
    });

    test("DOGU lehçesi girdileri doğru döndürülmelidir", async () => {
      const result = await repository.getByLemma("щхьэ");
      expect(result?.dialect).toBe("DOGU");
    });
  });

  describe("Meanings Yapısı", () => {
    test("meanings dizisi language alanını içermelidir", async () => {
      const result = await repository.getByLemma("шъхьэ");
      expect(result?.meanings[0]).toHaveProperty("language");
      expect(result?.meanings[0].language).toBe("TR");
    });

    test("meanings dizisi id ve text alanlarını içermelidir", async () => {
      const result = await repository.getByLemma("шъхьэ");
      expect(result?.meanings[0]).toHaveProperty("id");
      expect(result?.meanings[0]).toHaveProperty("text");
    });
  });
});