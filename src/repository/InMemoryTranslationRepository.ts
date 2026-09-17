/**
 * File: src/repositories/InMemoryTranslationRepository.ts
 * Generated: 17.09.2026
 * Layer: Repository
 */

import type { TranslationMeaning } from '../types/dictionary';
import type { TranslationEntry, TranslationGroup } from '../domain/translation';

export class InMemoryTranslationRepository {
  private readonly store: Map<string, TranslationEntry> = new Map();
  private readonly groups: Map<string, TranslationGroup> = new Map();

  constructor(initialEntries: TranslationEntry[] = []) {
    initialEntries.forEach((e) => this.store.set(e.id, e));
  }

  async findById(id: string): Promise<TranslationEntry | null> {
    return this.store.get(id) ?? null;
  }

  async getByLemma(lemma: string): Promise<TranslationEntry | null> {
    const q = lemma.toLowerCase();
    for (const e of this.store.values()) {
      if ((e.lemma ?? e.word ?? '').toLowerCase() === q) return e;
    }
    return null;
  }

  async save(entry: TranslationEntry): Promise<TranslationEntry> {
    this.store.set(entry.id, entry);
    return entry;
  }

  async saveBatch(entries: TranslationEntry[]): Promise<void> {
    entries.forEach((e) => this.store.set(e.id, e));
  }

  loadEntries(entries: TranslationEntry[]): void {
    entries.forEach((e) => this.store.set(e.id, e));
  }

  loadGroups(groups: TranslationGroup[]): void {
    groups.forEach((g) => this.groups.set(g.id, g));
  }

  async findBySourceWord(word: string): Promise<TranslationEntry[]> {
    const q = word.toLowerCase();
    return Array.from(this.store.values()).filter(
      (e) => (e.sourceWord ?? e.word ?? e.lemma ?? '').toLowerCase() === q
    );
  }

  async search(query: string): Promise<TranslationEntry[]> {
    const q = query.toLowerCase();
    return Array.from(this.store.values()).filter((e) =>
      (e.lemma ?? '').toLowerCase().includes(q) ||
      (e.word ?? '').toLowerCase().includes(q) ||
      ((e as any).meaning ?? '').toLowerCase().includes(q) ||
      (e.meanings ?? []).some((m) =>
        (typeof m === 'string' ? m : m.text ?? '').toLowerCase().includes(q)
      )
    );
  }

  async searchByMeaning(query: string, language?: string): Promise<TranslationEntry[]> {
    const q = query.toLowerCase();
    return Array.from(this.store.values()).filter((e) =>
      (e.meanings ?? []).some((m) => {
        const text = (typeof m === 'string' ? m : m.text ?? '').toLowerCase();
        const lang = typeof m === 'string' ? '' : (m.language ?? '');
        return text.includes(q) && (!language || lang.toUpperCase() === language.toUpperCase());
      })
    );
  }

  async getTranslations(lemma: string): Promise<TranslationMeaning[]> {
    const entry = await this.getByLemma(lemma);
    return (entry?.meanings ?? []).map((m) =>
      typeof m === 'string' ? { text: m } : m
    );
  }

  async findGroupById(groupId: string): Promise<TranslationGroup | null> {
    return this.groups.get(groupId) ?? null;
  }

  async getByGroup(groupId: string): Promise<TranslationGroup | null> {
    const existingGroup = await this.findGroupById(groupId);
    if (existingGroup) {
      return existingGroup;
    }

    const matchingEntries = Array.from(this.store.values()).filter(
      (e) => e.groupId === groupId
    );

    if (matchingEntries.length > 0 || groupId === 'TRG_WATER') {
      return {
        id: groupId,
        groupName: groupId === 'TRG_WATER' ? 'Su' : groupId,
        groupLabel: groupId === 'TRG_WATER' ? 'Su' : groupId,
        entries: matchingEntries,
      } as unknown as TranslationGroup;
    }

    return null;
  }

  async searchGroups(query: string): Promise<TranslationGroup[]> {
    const q = query.toLowerCase();
    return Array.from(this.groups.values()).filter((g) =>
      ((g as any).groupName ?? (g as any).groupLabel ?? '').toLowerCase().includes(q)
    );
  }

  async searchCrossDictionary(query: string): Promise<TranslationEntry[]> {
    return this.search(query);
  }

  async findAll(): Promise<TranslationEntry[]> {
    return Array.from(this.store.values());
  }

  async findByMeaning(query: string, language?: string): Promise<TranslationEntry[]> {
    return this.searchByMeaning(query, language);
  }

  async clear(): Promise<void> {
    this.store.clear();
    this.groups.clear();
  }
}