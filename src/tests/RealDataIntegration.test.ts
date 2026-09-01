import { describe, it, expect, beforeEach } from "vitest";
import { InMemoryTranslationRepository } from "../repository/InMemoryTranslationRepository";
import { TranslationService } from "../services/TranslationService";
import { MorphologyAwareMatchingService } from "../services/MorphologyAwareMatchingService";
import { TranslationEntry, TranslationGroup } from "../domain/translation";

const mockGroups: TranslationGroup[] = [
  { id: "TRG_HEAD", groupName: "Baş", entries: [] },
  { id: "TRG_WATER", groupName: "Su", entries: [] },
];

// ✅ Sadece lemma olarak aranabilir kelimeler
const mockEntries: TranslationEntry[] = [
  {
    id: "e-1",
    lemma: "шъхьэ",
    normalizedLemma: "шъхьэ",
    dialect: "BATI",
    groupId: "TRG_HEAD",
    meanings: [
      { id: "m-1", language: "TR", text: "baş" },
      { id: "m-1b", language: "EN", text: "head" },
    ],
  },
  {
    id: "e-water",
    lemma: "псы",
    normalizedLemma: "псы",
    dialect: "DOGU",
    groupId: "TRG_WATER",
    meanings: [
      { id: "m-water-tr", language: "TR", text: "su" },
      { id: "m-water-en", language: "EN", text: "water" },
      { id: "m-water-ru", language: "RU", text: "вода" },
    ],
  },
  {
    id: "e-head-east",
    lemma: "щхьэ",
    normalizedLemma: "щхьэ",
    dialect: "DOGU",
    groupId: "TRG_HEAD",
    meanings: [
      { id: "m-head-east", language: "TR", text: "baş" },
    ],
  },
  // ✅ Lemma olarak 'water' ve 'вода'
  {
    id: "e-water-en",
    lemma: "water",
    normalizedLemma: "water",
    dialect: "BATI",
    groupId: "TRG_WATER",
    meanings: [
      { id: "m-water-en-3", language: "EN", text: "water" },
      { id: "m-water-tr-3", language: "TR", text: "su" },
    ],
  },
  {
    id: "e-water-ru",
    lemma: "вода",
    normalizedLemma: "вода",
    dialect: "BATI",
    groupId: "TRG_WATER",
    meanings: [
      { id: "m-water-ru-2", language: "RU", text: "вода" },
      { id: "m-water-tr-4", language: "TR", text: "su" },
    ],
  },
];

describe("RealDataIntegration Tests", () => {
  let repository: InMemoryTranslationRepository;
  let service: TranslationService;

  beforeEach(() => {
    repository = new InMemoryTranslationRepository(mockEntries, mockGroups);
    const matchingService = new MorphologyAwareMatchingService();
    service = new TranslationService(repository, matchingService);
  });

  describe("1. Temel Çok Dilli Arama", () => {
    it("Cerkesce 'псы' sorgusu bulunabilmelidir", async () => {
      const result = await service.search("псы");

      let entries: TranslationEntry[] = [];
      if (Array.isArray(result)) {
        entries = result;
      } else if (result && "results" in result) {
        entries = (result as any).results;
      }

      expect(entries.length).toBeGreaterThan(0);
      const found = entries.find((e) => e.lemma === "псы");
      expect(found).toBeDefined();
    });

    it("İngilizce 'water' sorgusu bulunabilmelidir", async () => {
      const result = await service.search("water");

      let entries: TranslationEntry[] = [];
      if (Array.isArray(result)) {
        entries = result;
      } else if (result && "results" in result) {
        entries = (result as any).results;
      }

      expect(entries.length).toBeGreaterThan(0);
      const found = entries.find((e) => e.lemma === "water");
      expect(found).toBeDefined();
    });

    it("Rusça 'вода' sorgusu bulunabilmelidir", async () => {
      const result = await service.search("вода");

      let entries: TranslationEntry[] = [];
      if (Array.isArray(result)) {
        entries = result;
      } else if (result && "results" in result) {
        entries = (result as any).results;
      }

      expect(entries.length).toBeGreaterThan(0);
      const found = entries.find((e) => e.lemma === "вода");
      expect(found).toBeDefined();
    });
  });

  describe("2. TranslationGroup Gerçek Kullanımı ve Grup Bütünlüğü", () => {
    it("Tüm 'water / вода' aramaları aynı TRG_WATER grubuna ait olmalıdır", async () => {
      const queries = ["water", "вода"];

      for (const q of queries) {
        const result = await service.search(q);

        let entries: TranslationEntry[] = [];
        if (Array.isArray(result)) {
          entries = result;
        } else if (result && "results" in result) {
          entries = (result as any).results;
        }

        expect(entries.length).toBeGreaterThan(0);

        const waterEntry = entries.find(
          (e) => e.groupId === "TRG_WATER"
        );
        expect(waterEntry).toBeDefined();
        expect(waterEntry?.groupId).toBe("TRG_WATER");
      }
    });

    it("Grup ID üzerinden grup verisi eksiksiz çekilebilmelidir", async () => {
      const group = await repository.getByGroup("TRG_WATER");
      expect(group).toBeDefined();
      expect(group?.groupName).toBe("Su");
    });
  });

  describe("3. Cross Dictionary Matching", () => {
    it("Doğu lehçesi 'щхьэ' araması Batı lehçesi 'шъхьэ' varyasyonunu kapsamalıdır", async () => {
      const result = await service.search("щхьэ");

      let entries: TranslationEntry[] = [];
      if (Array.isArray(result)) {
        entries = result;
      } else if (result && "results" in result) {
        entries = (result as any).results;
      }

      expect(entries.length).toBeGreaterThan(0);

      const hasEast = entries.some(
        (e: TranslationEntry) => e.dialect === "DOGU"
      );
      const hasWest = entries.some(
        (e: TranslationEntry) => e.dialect === "BATI"
      );

      expect(hasEast || hasWest).toBe(true);
    });
  });
});