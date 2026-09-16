/**
 * File: src/repository/MockTranslationRepository.ts
 * Generated: 2026-09-16
 * Layer: Repository
 */

import { TranslationEntry, TranslationGroup, TranslationRepository } from "../domain/translation";
import { getMeaningText, getMeaningLanguage } from "./helpers/meaningHelpers";

export class MockTranslationRepository implements TranslationRepository {
  private entries: TranslationEntry[] = [];
  private groups: TranslationGroup[] = [
    { groupId: "g-head", id: "g-head", groupName: "Baş Kavramı", entries: [] },
    { groupId: "g-water", id: "g-water", groupName: "Su ve Sıvı Kavramı", entries: [] }
  ];

  async findById(id: string): Promise<TranslationEntry | null> {
    return this.entries.find((e) => e.id === id) || null;
  }

  async findBySourceWord(word: string): Promise<TranslationEntry[]> {
    return this.entries.filter((e) => (e.sourceWord ?? "").toLowerCase() === word.toLowerCase());
  }

  async search(query: string, targetLang?: string): Promise<TranslationEntry[]> {
    const q = query.toLowerCase();
    return this.entries.filter((e) => {
      const matchSource = (e.sourceWord ?? "").toLowerCase().includes(q);
      const matchLemma = e.lemma ? e.lemma.toLowerCase().includes(q) : false;
      const matchMeaning = e.meanings?.some((m) => {
        const textMatch = getMeaningText(m).toLowerCase().includes(q);
        const lang = getMeaningLanguage(m);
        const langMatch = targetLang ? (lang ? lang.toUpperCase() === targetLang : false) : true;
        return textMatch && langMatch;
      });
      return matchSource || matchLemma || matchMeaning;
    });
  }

  async findByLanguage(language: string): Promise<TranslationEntry[]> {
    return this.entries.filter((e) =>
      e.meanings?.some((m) => getMeaningLanguage(m) === language)
    );
  }

  async searchByMeaning(meaningText: string): Promise<TranslationEntry[]> {
    const q = meaningText.toLowerCase();
    return this.entries.filter((e) =>
      e.meanings?.some((m) => getMeaningText(m).toLowerCase().includes(q))
    );
  }

  async findGroupById(groupId: string): Promise<TranslationGroup | null> {
    return this.groups.find((g) => g.groupId === groupId || g.id === groupId) || null;
  }

  async searchGroups(query: string): Promise<TranslationGroup[]> {
    const q = query.toLowerCase();
    return this.groups.filter((g) => (g.groupName ?? "").toLowerCase().includes(q));
  }

  async save(entry: TranslationEntry): Promise<void> {
    this.entries.push(entry);
  }

  async saveBatch(entries: TranslationEntry[]): Promise<void> {
    this.entries.push(...entries);
  }

  async clear(): Promise<void> {
    this.entries = [];
  }
}

