/**
 * File: src/repository/InMemoryTranslationRepository.ts
 * Generated: 2026-09-16
 * Layer: Repository
 */

import { TranslationEntry, TranslationGroup, TranslationRepository } from "../domain/translation";
import { getMeaningText, getMeaningLanguage } from "./helpers/meaningHelpers";

export class InMemoryTranslationRepository implements TranslationRepository {
  private entries: Map<string, TranslationEntry> = new Map();
  private groups: Map<string, TranslationGroup> = new Map();
  private searchIndex: Map<string, Set<string>> = new Map();

  private normalizeForSearch(text: string): string {
    return text.toLowerCase().trim();
  }

  private indexEntry(entry: TranslationEntry): void {
    const addTokenVariants = (token: string) => {
      const norm = this.normalizeForSearch(token);
      if (!norm) return;
      if (!this.searchIndex.has(norm)) {
        this.searchIndex.set(norm, new Set());
      }
      this.searchIndex.get(norm)!.add(entry.id);
    };

    if (entry.sourceWord) addTokenVariants(entry.sourceWord);
    if (entry.lemma) addTokenVariants(entry.lemma);

    entry.meanings?.forEach((meaning) => {
      const text = getMeaningText(meaning);
      if (text) {
        addTokenVariants(text);
      }
    });
  }

  async findById(id: string): Promise<TranslationEntry | null> {
    return this.entries.get(id) || null;
  }

  async findBySourceWord(word: string): Promise<TranslationEntry[]> {
    const normalized = this.normalizeForSearch(word);
    return Array.from(this.entries.values()).filter(
      (e) => this.normalizeForSearch(e.sourceWord ?? "") === normalized
    );
  }

  async search(query: string, targetLang?: string): Promise<TranslationEntry[]> {
    const queryNormalized = this.normalizeForSearch(query);
    if (!queryNormalized) return [];

    return Array.from(this.entries.values()).filter((e) => {
      const matchesSource = this.normalizeForSearch(e.sourceWord ?? "").includes(queryNormalized);
      const matchesLemma = e.lemma ? this.normalizeForSearch(e.lemma).includes(queryNormalized) : false;
      const matchesMeaning = e.meanings?.some((m) => {
        const matchesText = this.normalizeForSearch(getMeaningText(m)).includes(queryNormalized);
        const lang = getMeaningLanguage(m);
        const matchesLang = targetLang ? (lang ? lang.toUpperCase() === targetLang : false) : true;
        return matchesText && matchesLang;
      });

      return matchesSource || matchesLemma || matchesMeaning;
    });
  }

  async findByLanguage(language: string): Promise<TranslationEntry[]> {
    return Array.from(this.entries.values()).filter((e) =>
      e.meanings?.some((m) => getMeaningLanguage(m) === language)
    );
  }

  async searchByMeaning(meaningText: string): Promise<TranslationEntry[]> {
    const normalized = this.normalizeForSearch(meaningText);
    return Array.from(this.entries.values()).filter((e) =>
      e.meanings?.some((m) => this.normalizeForSearch(getMeaningText(m)).includes(normalized))
    );
  }

  async findGroupById(groupId: string): Promise<TranslationGroup | null> {
    const group = this.groups.get(groupId);
    if (!group) return null;
    return {
      groupId: group.groupId || group.id,
      id: group.id,
      groupName: group.groupName,
      entries: group.entries
    };
  }

  async searchGroups(query: string): Promise<TranslationGroup[]> {
    const normalized = this.normalizeForSearch(query);
    return Array.from(this.groups.values()).filter((g) =>
      this.normalizeForSearch(g.groupName ?? "").includes(normalized) ||
      g.entries.some((e) =>
        this.normalizeForSearch(e.sourceWord ?? "").includes(normalized) ||
        e.meanings?.some((m) => this.normalizeForSearch(getMeaningText(m)).includes(normalized))
      )
    );
  }

  async save(entry: TranslationEntry): Promise<void> {
    this.entries.set(entry.id, entry);
    this.indexEntry(entry);
  }

  async saveBatch(entries: TranslationEntry[]): Promise<void> {
    for (const entry of entries) {
      await this.save(entry);
    }
  }

  async clear(): Promise<void> {
    this.entries.clear();
    this.groups.clear();
    this.searchIndex.clear();
  }

  loadGroups(groups: TranslationGroup[]): void {
    groups.forEach((group) => {
      this.groups.set(group.groupId || group.id, group);
    });
  }

  loadEntries(entries: TranslationEntry[]): void {
    entries.forEach((entry) => this.indexEntry(entry));
  }
}
