/**
 * @file src/tests/StressAndPerformance.test.ts
 * @description Aşama 4 - Yüksek Hacimli Veri Yükleme ve Stres Testleri (50.000 Kayıt)
 */

import { describe, it, expect, beforeEach } from "vitest";
import { InMemoryTranslationRepository } from "../repository/InMemoryTranslationRepository";
import { TranslationService } from "../services/TranslationService";
import { DataChunkLoader } from "../loader/DataChunkLoader";
import { TranslationEntry, LanguageCode } from "../domain/translation";
import { MorphologyAwareMatchingService } from "../services/MorphologyAwareMatchingService";

describe("Aşama 4 - Yüksek Hacimli Veri Yükleme ve Stres Testleri", () => {
  let repository: InMemoryTranslationRepository;
  let matchingService: MorphologyAwareMatchingService;
  let service: TranslationService;
  let loader: DataChunkLoader;

  beforeEach(() => {
    repository = new InMemoryTranslationRepository();
    matchingService = new MorphologyAwareMatchingService();
    service = new TranslationService(repository, matchingService);
    loader = new DataChunkLoader(repository);
  });

  function generateSyntheticData(count: number): TranslationEntry[] {
    const entries: TranslationEntry[] = [];
    const prefixes = ["щхьэ", "псы", "шъхьэ", "лъэ", "бзэ", "къэ", "гу"];

    // Tam kelime eşleşmesi (exact match) aramaları için doğrudan "щхьэ" lemmalı ilk kayıtlar
    for (let i = 0; i < Math.min(count, 50); i++) {
      entries.push({
        id: `EXACT_MATCH_${i}`,
        sourceId: "stress_dict",
        sourceEntryId: `exact_${i}`,
        lemma: "щхьэ",
        normalizedLemma: "щхьэ",
        language: "kbd" as LanguageCode,
        dialect: "DOGU",
        groupId: "exact-group",
        meanings: [
          {
            id: `m_exact_${i}`,
            language: "TR" as LanguageCode,
            text: "baş, kafatası",
          },
        ],
      } as TranslationEntry);
    }

    // Geri kalan 50.000'e tamamlayan stres verileri
    const startIndex = entries.length;
    for (let i = startIndex; i < count; i++) {
      const prefix = prefixes[i % prefixes.length];
      const lemmaValue = `${prefix}_${i}`;

      entries.push({
        id: `STRESS_${i}`,
        sourceId: "stress_dict",
        sourceEntryId: `${i}`,
        lemma: lemmaValue,
        normalizedLemma: lemmaValue.toLowerCase(),
        language: "kbd" as LanguageCode,
        dialect: i % 2 === 0 ? "DOGU" : "BATI",
        groupId: `group-${Math.floor(i / 1000)}`,
        meanings: [
          {
            id: `m_${i}_1`,
            language: "TR" as LanguageCode,
            text: `baş_${i}`,
          },
          {
            id: `m_${i}_2`,
            language: "RU" as LanguageCode,
            text: `голова_${i}`,
          },
        ],
      } as TranslationEntry);
    }

    return entries;
  }

  it("1. 50.000 kayıt parça parça (chunked) başarıyla yüklenmelidir", async () => {
    const largeDataset = generateSyntheticData(50000);
    let lastProgressPercentage = 0;

    await loader.loadChunked({ entries: largeDataset }, 10000, (progress) => {
      lastProgressPercentage = progress.percentage;
    });

    expect(lastProgressPercentage).toBe(100);

    const allEntries = await repository.getAll();
    expect(allEntries.length).toBe(50000);

    const result = await service.searchCrossDictionary("щхьэ");
    expect(result.length).toBeGreaterThan(0);
  }, 60000);

  it("2. 50.000 kayıt arasından yapılan arama 1 saniye altında yanıt vermelidir", async () => {
    const largeDataset = generateSyntheticData(50000);
    await loader.loadChunked({ entries: largeDataset }, 10000);

    const startTime = performance.now();
    const searchResult = await service.searchCrossDictionary("щхьэ");
    const duration = performance.now() - startTime;

    expect(searchResult.length).toBeGreaterThan(0);
    expect(duration).toBeLessThan(1000);
  }, 60000);

  it("3. Çoklu eşzamanlı (Concurrent) 100 arama sorgusu sistemi kilitlememelidir", async () => {
    const largeDataset = generateSyntheticData(20000);
    await loader.loadChunked({ entries: largeDataset }, 5000);

    const queries = Array.from({ length: 100 }, (_, i) =>
      i < 10 ? "щхьэ" : `щхьэ_${i * 100}`
    );

    const startTime = performance.now();
    const results = await Promise.all(
      queries.map((q) => service.searchCrossDictionary(q))
    );
    const totalDuration = performance.now() - startTime;

    expect(results.length).toBe(100);
    expect(totalDuration).toBeLessThan(10000);
  }, 60000);
});