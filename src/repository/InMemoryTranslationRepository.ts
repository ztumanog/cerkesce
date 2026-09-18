/**
 * File: src/repositories/InMemoryTranslationRepository.ts
 * Generated: 18.09.2026
 * Layer: Repository
 */

import type { TranslationMeaning } from '../types/dictionary';
import type { TranslationEntry, TranslationGroup } from '../domain/translation';

export class InMemoryTranslationRepository {
  private readonly store: Map<string, TranslationEntry> = new Map();
  private readonly groups: Map<string, TranslationGroup> = new Map();

  constructor(initialEntries: TranslationEntry[] = [], initialGroups: TranslationGroup[] = []) {
    initialEntries.forEach((e) => this.store.set(e.id, e));
    initialGroups.forEach((g) => this.groups.set(g.id, g));
  }

  async findById(id: string): Promise<TranslationEntry | null> {
    return this.store.get(id) ?? null;
  }

  async findCanonicalById(id: string): Promise<TranslationEntry | null> {
    return this.findById(id);
  }

  async getByLemma(lemma: string): Promise<TranslationEntry | null> {
    return this.findByLemma(lemma);
  }

  async findByLemma(lemma: string): Promise<TranslationEntry | null> {
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
    return this.findGroupById(groupId);
  }

  async findGroupSenses(groupId: string): Promise<TranslationMeaning[]> {
    const group = await this.getByGroup(groupId);
    if (!group || !group.entries) return [];
    return group.entries.flatMap((e) =>
      (e.meanings ?? []).map((m) => (typeof m === 'string' ? { text: m } : m))
    );
  }

  async searchGroups(query: string): Promise<TranslationGroup[]> {
    const q = query.toLowerCase();
    return Array.from(this.groups.values()).filter((g) =>
      (g.groupName ?? g.groupLabel ?? '').toLowerCase().includes(q)
    );
  }

  async searchCrossDictionary(query: string): Promise<TranslationEntry[]> {
    return this.search(query);
  }

  async findAll(): Promise<TranslationEntry[]> {
    return Array.from(this.store.values());
  }

  async getAll(): Promise<TranslationEntry[]> {
    return this.findAll();
  }

  async findByMeaning(query: string, language?: string): Promise<TranslationEntry[]> {
    return this.searchByMeaning(query, language);
  }


  async findGroupSenses(groupId: string): Promise<TranslationGroup | null> {
    const group = this.groups.get(groupId);
    if (!group) return null;
    const entries = Array.from(this.store.values()).filter(
      (e) => e.groupId === groupId
    );
    return { ...group, entries };
  }

  async searchCrossDictionary(query: string): Promise<TranslationEntry[]> {
    if (!query || !query.trim()) return this.findAll();
    return this.search(query);
  }

  async getByGroup(groupId: string): Promise<TranslationGroup | null> {
    return this.findGroupSenses(groupId);
  }
  async clear(): Promise<void> {
    this.store.clear();
    this.groups.clear();
  }
}


