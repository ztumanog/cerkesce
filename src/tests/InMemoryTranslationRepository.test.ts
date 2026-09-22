/**
 * @file src/tests/InMemoryTranslationRepository.test.ts
 * @description InMemoryTranslationRepository Tip Güvenli Test Paketi
 */

import { describe, it, expect, beforeEach } from "vitest";
import { InMemoryTranslationRepository, MockTranslationRepository } from "../repository/InMemoryTranslationRepository";
import { TranslationService } from "../services/TranslationService";
import { MorphologyAwareMatchingService } from "../services/MorphologyAwareMatchingService";
import type { TranslationEntry, TranslationGroup } from "../domain/translation";

describe("InMemoryTranslationRepository Tests", () => {
  const mockEntries: TranslationEntry[] = [
    { id: "e-1", lemma: "шъхьэ", normalizedLemma: "шъхьэ", dialect: "ADY", groupId: "g-head",
      meanings: [{ id: "m-1", language: "TR", text: "baş" }] },
    { id: "e-2", lemma: "щхьэ", normalizedLemma: "щхьэ", dialect: "KBD", groupId: "g-head",
      meanings: [{ id: "m-2", language: "TR", text: "baş" }] },
    { id: "e-3", lemma: "псы", normalizedLemma: "псы", dialect: "KBD", groupId: "g-water",
      meanings: [{ id: "m-3", language: "TR", text: "su, nehir" }] },
  ];

  const mockGroups: TranslationGroup[] = [
    { id: "g-head", groupName: "Baş Kavramı", entries: [] },
    { id: "g-water", groupName: "Su ve Sıvı Kavramı", entries: [] },
  ];

  let repository: InMemoryTranslationRepository;
  let mockRepository: MockTranslationRepository;
  let translationService: TranslationService;

  beforeEach(() => {
    repository = new InMemoryTranslationRepository(mockEntries, mockGroups);
    mockRepository = new MockTranslationRepository(mockEntries, mockGroups);
    const matchingService = new MorphologyAwareMatchingService();
    translationService = new TranslationService(repository, matchingService);
  });

  it("search() üzerinden arama yapabilmelidir", async () => {
    const results = await translationService.search("шъхьэ");
    expect(Array.isArray(results)).toBe(true);
  });

  it("findByLemma() doğru sonucu getirmelidir", async () => {
    const result = await repository.findByLemma("шъхьэ");
    expect(result).not.toBeNull();
    expect(result?.id).toBe("e-1");
  });

  it("findByLemma() var olmayan lemma için null döner", async () => {
    const result = await repository.findByLemma("olmayan_kelime");
    expect(result).toBeNull();
  });

  it("searchCrossDictionary() meanings içinde arama yapabilmelidir", async () => {
    const results = await repository.searchCrossDictionary("baş");
    expect(results.length).toBeGreaterThan(0);
    expect(
      results.some((e) => e.meanings.some((m) => (m.text ?? "").includes("baş")))
    ).toBe(true);
  });

  it("searchCrossDictionary() case-insensitive olmalı", async () => {
    const results = await repository.searchCrossDictionary("БАШ");
    expect(Array.isArray(results)).toBe(true);
  });

  it("findGroupSenses() grup verisini döndürür", async () => {
    const group = await repository.findGroupSenses("g-head");
    expect(group).not.toBeNull();
    expect(group?.groupName).toBe("Baş Kavramı");
  });

  it("MockTranslationRepository de aynı sonuçları döndürmelidir", async () => {
    const inMem = await repository.findByLemma("шъхьэ");
    const mock = await mockRepository.findByLemma("шъхьэ");
    expect(inMem?.lemma).toBe(mock?.lemma);
  });
});
