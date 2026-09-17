/**
 * File: src/tests/DebugRepository.test.ts
 * Purpose: Repository.findByMeaning() debug
 */

import { describe, it, expect, beforeAll } from "vitest";
import { InMemoryTranslationRepository } from "../repository/InMemoryTranslationRepository";
import type { TranslationEntry, TranslationGroup } from "../domain/translation";

describe("Debug Repository", () => {
  let repo: InMemoryTranslationRepository;

  beforeAll(() => {
    const groups: TranslationGroup[] = [
      {
        id: "TRG_WATER",
        groupName: "Su Kavramı",
        entries: [],
      },
    ];

    const entries: TranslationEntry[] = [
      {
        id: "ENTRY_WATER",
        lemma: "вода",
        normalizedLemma: "вода",
        dialect: "KBD",
        groupId: "TRG_WATER",
        meanings: [
          { id: "m-1", language: "EN", text: "water" },
          { id: "m-1b", language: "TR", text: "su" },
          { id: "m-1c", language: "RU", text: "вода" },
        ],
      },
    ];

    repo = new InMemoryTranslationRepository(entries, groups);
  });

  it("repo.findAll() çalışmalı", async () => {
    const all = await repo.findAll();
    console.log("findAll():", all);
    expect(all.length).toBe(1);
  });

  it("repo.findByMeaning('water') çalışmalı", async () => {
    const results = await repo.findByMeaning("water");
    console.log("findByMeaning('water'):", results);
    expect(results.length).toBeGreaterThan(0);
    expect(results[0]?.lemma).toBe("вода");
  });

  it("repo.search('water') çalışmalı", async () => {
    const results = await repo.search("water");
    console.log("search('water'):", results);
    expect(results.length).toBeGreaterThan(0);
    expect(results[0]?.lemma).toBe("вода");
  });
});