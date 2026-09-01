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
      groupName: "Baş Kavramı",
      entries: [],
    },
    {
      id: "g-water",
      groupName: "Su ve Sıvı Kavramı",
      entries: [],
    },
    {
      id: "g-heart",
      groupName: "Kalp Kavramı",
      entries: [],
    },
    {
      id: "g-head-tr",
      groupName: "Baş/Kafa Hibrit",
      entries: [],
    },
    {
      id: "g-soul",
      groupName: "Can/Ruh Kavramı",
      entries: [],
    },
  ];

  const mockEntries: TranslationEntry[] = [
    {
      id: "e-1",
      lemma: "шъхьэ",
      normalizedLemma: "шъхьэ",
      dialect: "BATI",
      groupId: "g-head",
      meanings: [
        {
          id: "m-1",
          language: "TR",
          text: "baş",
        },
      ],
    },
    {
      id: "e-2",
      lemma: "щхьэ",
      normalizedLemma: "щхьэ",
      dialect: "DOGU",
      groupId: "g-head",
      meanings: [
        {
          id: "m-2",
          language: "TR",
          text: "baş",
        },
      ],
    },
    {
      id: "e-3",
      lemma: "псы",
      normalizedLemma: "псы",
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
      lemma: "псыхъо",
      normalizedLemma: "псыхъо",
      dialect: "BATI",
      groupId: "g-water",
      meanings: [
        {
          id: "m-4",
          language: "TR",
          text: "ırmak, büyük su",
        },
      ],
    },
    {
      id: "e-5",
      lemma: "жъы",
      normalizedLemma: "жъы",
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
      lemma: "гу",
      normalizedLemma: "гу",
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
      lemma: "баш",
      normalizedLemma: "баш",
      dialect: "BATI",
      groupId: "g-head-tr",
      meanings: [
        {
          id: "m-7",
          language: "TR",
          text: "baş, kafa",
        },
      ],
    },
    {
      id: "e-8",
      lemma: "псэ",
      normalizedLemma: "псэ",
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
    // ✅ DÜZELTME: mockRepository yerine repository kullanılıyor
    translationService = new TranslationService(repository, matchingService);
  });

 describe("TranslationService Arama Testleri", () => {
    it("search() üzerinden arama yapabilmelidir", async () => {
      const results = await translationService.search("шъхьэ");
      expect(results).toBeDefined();
      expect(Array.isArray(results)).toBe(true);
      expect(results.length).toBeGreaterThan(0);
    });

    it("var olmayan arama için boş sonuç döndürmelidir", async () => {
      const results = await translationService.search("olmayan_sorgu_123");
      expect(results).toBeDefined();
      expect(results).toEqual([]);
    });
  });
  describe("findByLemma() - Lemma ile Arama", () => {
    it("verilen lemma için doğru tekil girdiyi getirmelidir", async () => {
      const result = await repository.findByLemma("шъхьэ");
      expect(result).not.toBeNull();
      expect(result?.id).toBe("e-1");
      expect(result?.meanings[0].text).toBe("baş");
    });

    it("büyük/küçük harf duyarsız arama yapabilmelidir", async () => {
      const result = await repository.findByLemma("ШЪХ\u04C0Э");
      expect(result).not.toBeNull();
      expect(result?.id).toBe("e-1");
    });

    it("var olmayan bir lemma arandığında null dönmelidir", async () => {
      const result = await repository.findByLemma("olmayan_kelime");
      expect(result).toBeNull();
    });

    it("language alanı doğru döndürülmelidir", async () => {
      const result = await repository.findByLemma("шъхьэ");
      expect(result?.meanings[0].language).toBe("TR");
    });
  });

  describe("findCanonicalById() - ID ile Arama", () => {
    it("geçerli bir ID verildiğinde doğru nesneyi dönmelidir", async () => {
      const entry = await repository.findCanonicalById("e-1");
      expect(entry).not.toBeNull();
      expect(entry?.lemma).toBe("шъхьэ");
    });

    it("geçersiz bir ID için null dönmelidir", async () => {
      const entry = await repository.findCanonicalById("INVALID_ID");
      expect(entry).toBeNull();
    });

    it("döndürülen giriş tüm alanları içermelidir", async () => {
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
    it("geçerli bir groupId ile grup verisini getirmelidir", async () => {
      const group = await repository.findGroupSenses("g-head");
      expect(group).not.toBeNull();
      expect(group?.groupName).toBe("Baş Kavramı");
    });

    it("var olmayan bir groupId için null dönmelidir", async () => {
      const group = await repository.findGroupSenses("g-nonexistent");
      expect(group).toBeNull();
    });

    it("grup içinde doğru girdileri içermelidir", async () => {
      const group = await repository.findGroupSenses("g-head");
      expect(group?.entries.length).toBeGreaterThan(0);
      expect(
        group?.entries.every((e: TranslationEntry) => e.groupId === "g-head")
      ).toBe(true);
    });

    it("groupName alanı doğru ayarlanmış olmalıdır", async () => {
      const group = await repository.findGroupSenses("g-water");
      expect(group?.groupName).toBe("Su ve Sıvı Kavramı");
    });
  });

  describe("searchCrossDictionary() - Çapraz Arama", () => {
    it("meanings (anlam) dizisi içinde arama yapabilmelidir", async () => {
      const results = await repository.searchCrossDictionary("baş");
      expect(results.length).toBeGreaterThan(0);
      expect(
        results.some((e: TranslationEntry) =>
          e.meanings.some((m) => m.text.includes("baş"))
        )
      ).toBe(true);
    });

    it("lemma parçası ile çapraz arama yapabilmelidir", async () => {
      const results = await repository.searchCrossDictionary("пс");
      expect(results.length).toBeGreaterThanOrEqual(2);
    });

    it("büyük Kiril harfleri ile arama yapabilmelidir (Örn: БАШ)", async () => {
      const results = await repository.searchCrossDictionary("БАШ");
      expect(results.length).toBeGreaterThan(0);
      expect(results.some((e: TranslationEntry) => e.id === "e-7")).toBe(true);
    });

    it("karma büyük/küçük ve Kiril karakterler ile duyarsız arama yapabilmelidir", async () => {
      const results = await repository.searchCrossDictionary("БАШ");
      expect(results.length).toBeGreaterThan(0);
    });

    it("var olmayan sorgu için boş dizi dönmelidir", async () => {
      const results = await repository.searchCrossDictionary("olmayan_sorgu_xyz");
      expect(results).toEqual([]);
    });

    it("boş veya boşluk karakterli sorgu için tüm girdileri döndürmelidir", async () => {
      const results = await repository.searchCrossDictionary("   ");
      expect(results.length).toBe(mockEntries.length);
    });
  });

  describe("MockTranslationRepository - getByLemma()", () => {
    it("MockRepository getByLemma() doğru sonuç döndürmelidir", async () => {
      const result = await mockRepository.getByLemma("шъхьэ");
      expect(result).not.toBeNull();
      expect(result?.lemma).toBe("шъхьэ");
      expect(result?.meanings[0].language).toBe("TR");
    });

    it("MockRepository olmayan lemma için null dönmelidir", async () => {
      const result = await mockRepository.getByLemma("olmayan");
      expect(result).toBeNull();
    });
  });

  describe("MockTranslationRepository - getTranslations()", () => {
    it("MockRepository getTranslations() sorguyu içeren girdileri döndürmelidir", async () => {
      const results = await mockRepository.getTranslations("пс");
      expect(results.length).toBeGreaterThan(0);
    });

    it("MockRepository case-insensitive arama yapmalıdır", async () => {
      const results = await mockRepository.getTranslations("ПС");
      expect(results.length).toBeGreaterThan(0);
    });
  });

  describe("MockTranslationRepository - reverseLookup()", () => {
    it("MockRepository reverseLookup() anlam üzerinden arama yapmalıdır", async () => {
      const results = await mockRepository.reverseLookup("baş");
      expect(results.length).toBeGreaterThan(0);
    });

    it("MockRepository reverseLookup() birden fazla sonuç döndürebilmelidir", async () => {
      const results = await mockRepository.reverseLookup("baş");
      expect(results.length).toBeGreaterThanOrEqual(2);
    });
  });

  describe("MockTranslationRepository - getByGroup()", () => {
    it("MockRepository getByGroup() TranslationGroup döndürmelidir", async () => {
      const result = await mockRepository.getByGroup("g-head");
      expect(result).not.toBeNull();
      expect(result?.id).toBe("g-head");
      expect(result?.groupName).toBe("Baş Kavramı");
    });

    it("MockRepository getByGroup() olmayan grup için null dönmelidir", async () => {
      const result = await mockRepository.getByGroup("olmayan-grup");
      expect(result).toBeNull();
    });
  });

  describe("Lehçe Filtreleme", () => {
    it("BATI lehçesi girdileri doğru döndürülmelidir", async () => {
      const result = await repository.findByLemma("шъхьэ");
      expect(result?.dialect).toBe("BATI");
    });

    it("DOGU lehçesi girdileri doğru döndürülmelidir", async () => {
      const result = await repository.findByLemma("щхьэ");
      expect(result?.dialect).toBe("DOGU");
    });

    it("aynı grup içinde farklı lehçeler olabilmelidir", async () => {
      const group = await repository.findGroupSenses("g-head");
      const dialects = new Set(group?.entries.map((e: TranslationEntry) => e.dialect));
      expect(dialects.size).toBeGreaterThan(1);
    });
  });

  describe("Meanings Yapısı Doğrulaması", () => {
    it("tüm öğelerde language alanı tanımlı olmalıdır", async () => {
      mockEntries.forEach((entry) => {
        expect(entry.meanings[0].language).toBe("TR");
      });
    });

    it("meanings dizisi id ve text alanlarını içermelidir", async () => {
      const result = await repository.findByLemma("шъхьэ");
      expect(result?.meanings[0]).toHaveProperty("id");
      expect(result?.meanings[0]).toHaveProperty("text");
      expect(result?.meanings[0]).toHaveProperty("language");
    });

    it("meanings dizisi boş olmamalıdır", async () => {
      const result = await repository.findByLemma("шъхьэ");
      expect(result?.meanings.length).toBeGreaterThan(0);
    });
  });

  describe("normalizedLemma Alanı", () => {
    it("normalizedLemma alanı lemma ile eşleşmelidir", async () => {
      const result = await repository.findByLemma("шъхьэ");
      expect(result?.normalizedLemma).toBe(result?.lemma);
    });

    it("tüm girdilerde normalizedLemma tanımlı olmalıdır", async () => {
      mockEntries.forEach((entry) => {
        expect(entry.normalizedLemma).toBeDefined();
        expect(entry.normalizedLemma!.length).toBeGreaterThan(0);
      });
    });
  });

  describe("groupId Alanı", () => {
    it("tüm girdilerde groupId tanımlı olmalıdır", async () => {
      mockEntries.forEach((entry) => {
        expect(entry.groupId).toBeDefined();
      });
    });

    it("groupId geçerli bir grup referansı olmalıdır", async () => {
      const result = await repository.findByLemma("шъхьэ");
      const group = await repository.findGroupSenses(result?.groupId || "");
      expect(group).not.toBeNull();
    });
  });

  describe("Repository Uyumluluğu", () => {
    it("InMemoryTranslationRepository ve MockTranslationRepository aynı sonuçları döndürmelidir", async () => {
      const inMemResult = await repository.findByLemma("шъхьэ");
      const mockResult = await mockRepository.getByLemma("шъхьэ");

      expect(inMemResult?.lemma).toBe(mockResult?.lemma);
      expect(inMemResult?.meanings[0].text).toBe(mockResult?.meanings[0].text);
    });

    it("Her iki repository de case-insensitive arama yapmalıdır", async () => {
      const inMemResults = await repository.searchCrossDictionary("БАШ");
      const mockResults = await mockRepository.getTranslations("ПС");

      expect(inMemResults.length).toBeGreaterThan(0);
      expect(mockResults.length).toBeGreaterThan(0);
    });
  });
});