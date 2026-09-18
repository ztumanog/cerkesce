import { describe, it, test, expect, beforeEach } from 'vitest';
/**
 * File: src/repository/RepositoryIntegration.test.ts
 * Generated: 2026-09-16
 * Layer: Repository
 */

import { InMemoryTranslationRepository } from "./InMemoryTranslationRepository";
import { TranslationEntry, TranslationGroup } from "../domain/translation";
import { getMeaningText } from "./helpers/meaningHelpers";

describe("Repository Integration Tests", () => {
  let repository: InMemoryTranslationRepository;

  const mockEntries: TranslationEntry[] = [
    {
      id: "1",
      sourceWord: "псы",
      lemma: "псы",
      meanings: [{ id: "m1", text: "su", language: "TR" }]
    },
    {
      id: "2",
      sourceWord: "щхьэ",
      lemma: "щхьэ",
      meanings: [{ id: "m2", text: "baş", language: "TR" }]
    }
  ];

  const mockGroups: TranslationGroup[] = [
    {
      groupId: "g-head",
      id: "g-head",
      groupName: "Baş Kavramı",
      entries: mockEntries.filter((e) => e.id === "2")
    },
    {
      groupId: "g-water",
      id: "g-water",
      groupName: "Su ve Sıvı Kavramı",
      entries: mockEntries.filter((e) => e.id === "1")
    }
  ];

  beforeEach(async () => {
    repository = new InMemoryTranslationRepository();
    await repository.saveBatch(mockEntries);
  });

  test("should find entry by source word", async () => {
    const results = await repository.findBySourceWord("псы");
    expect(results.length).toBe(1);
    const result = results[0];
    const firstMeaning = result?.meanings?.[0];
    if (firstMeaning && typeof firstMeaning !== "string") {
      expect(firstMeaning.language).toBe("TR");
    }
  });

  test("should search entries by lemma or meaning", async () => {
    const results = await repository.search("baş");
    expect(results.some((e: TranslationEntry) => (e.lemma ?? "").includes("щхьэ"))).toBe(true);
  });

  test("should search entries by meaning text", async () => {
    const results = await repository.searchByMeaning("baş");
    expect(
      results.some((e) => (e.meanings ?? []).some((m) => getMeaningText(m).includes("baş")))
    ).toBe(true);
  });
});


