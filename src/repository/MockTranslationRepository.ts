/**
 * File: src/repository/MockTranslationRepository.ts
 * Generated: 2026-09-17
 * Layer: Repository
 */

import { TranslationEntry, TranslationGroup } from "../domain/translation";

export class MockTranslationRepository {
  private mockEntries: TranslationEntry[] = [
    {
      id: "e-1",
      lemma: "шъхьэ",
      normalizedLemma: "шъхьэ",
      dialect: "ADY",
      groupId: "g-head",
      meanings: [{ id: "m-1", language: "TR", text: "baş" }],
    },
    {
      id: "e-2",
      lemma: "щхьэ",
      normalizedLemma: "щхьэ",
      dialect: "KBD",
      groupId: "g-head",
      meanings: [{ id: "m-2", language: "TR", text: "baş" }],
    },
    {
      id: "e-3",
      lemma: "псы",
      normalizedLemma: "псы",
      dialect: "KBD",
      groupId: "g-water",
      meanings: [{ id: "m-3", language: "TR", text: "su" }],
    },
  ];

  private mockGroups: TranslationGroup[] = [
    { id: "g-head", groupName: "Baş Kavramı", entries: [] },
  ];

  async findByLemma(lemma: string): Promise<TranslationEntry | null> {
    const lower = lemma.toLowerCase();
    return (
      this.mockEntries.find((e) => e.lemma.toLowerCase() === lower) ?? null
    );
  }

  async getByLemma(lemma: string): Promise<TranslationEntry | null> {
    return this.findByLemma(lemma);
  }

  async searchCrossDictionary(query: string): Promise<TranslationEntry[]> {
    const trimmed = query.trim();
    if (!trimmed) return this.mockEntries;
    const lower = trimmed.toLowerCase();
    return this.mockEntries.filter(
      (e) =>
        e.lemma.toLowerCase().includes(lower) ||
        (e.meanings ?? []).some((m) => (typeof m === "string" ? m : m.text).toLowerCase().includes(lower))
    );
  }

  async search(query: string, targetLang?: string): Promise<TranslationEntry[]> {
    const results = await this.searchCrossDictionary(query);
    if (!targetLang) return results;

    const targetLower = targetLang.toLowerCase();
    return results.filter((entry) =>
      (entry.meanings ?? []).some((m) => (typeof m === "string" ? "" : (typeof m === "string" ? "" : m.language ?? "")).toLowerCase() === targetLower)
    );
  }

  async getTranslations(query: string): Promise<TranslationEntry[]> {
    return this.searchCrossDictionary(query);
  }

  async reverseLookup(query: string): Promise<TranslationEntry[]> {
    return this.searchCrossDictionary(query);
  }

  async findGroupSenses(groupId: string): Promise<TranslationGroup | null> {
    const group = this.mockGroups.find((g) => g.id === groupId);
    if (!group) return null;
    const entries = this.mockEntries.filter((e) => e.groupId === groupId);
    return { ...group, entries };
  }

  async getByGroup(groupId: string): Promise<TranslationGroup | null> {
    return this.findGroupSenses(groupId);
  }
}

