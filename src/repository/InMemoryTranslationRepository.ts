/**
 * @file src/repository/InMemoryTranslationRepository.ts
 * @description Bellek içi çeviri deposu - Kiril/Latin normalize araması, Inverted Index, Canonical ID ve dil filtreli anlam araması desteği ile.
 */

import { ITranslationRepository, PaginatedResult, PaginationParams } from "./ITranslationRepository";
import { TranslationEntry, TranslationGroup } from "../domain/translation";
import { DialectRule } from "../domain/dialect";

export interface TranslationRepository {
  save(entry: TranslationEntry): Promise<TranslationEntry>;
  findById(id: string): Promise<TranslationEntry | null>;
  findByLemma(lemma: string): Promise<TranslationEntry | null>;
  findManyByLemma(lemma: string): Promise<TranslationEntry[]>;
  findByMeaning(text: string, language?: string): Promise<TranslationEntry[]>;
  saveGroup(group: TranslationGroup): Promise<TranslationGroup>;
  findGroupById(groupId: string): Promise<TranslationGroup | null>;
  findAll(): Promise<TranslationEntry[]>;
}

export class InMemoryTranslationRepository implements TranslationRepository, ITranslationRepository {
  private entries: TranslationEntry[] = [];
  private groups: TranslationGroup[] = [];
  private rules: DialectRule[] = [];

  private searchIndex: Map<string, Set<TranslationEntry>> = new Map();
  private fallbackIndexes: Map<string, number> = new Map();

  constructor(
    entries: TranslationEntry[] = [],
    groups: TranslationGroup[] = [],
    rules: DialectRule[] = []
  ) {
    this.groups = [...groups];
    this.rules = [...rules];
    this.loadEntries(entries);
  }

  public generateCanonicalId(
    sourceId: string,
    sourceEntryId?: string,
    lemma?: string
  ): string {
    if (sourceEntryId && sourceEntryId.trim() !== "") {
      return `${sourceId}:${sourceEntryId.trim()}`;
    }
    const normalizedLemma = (lemma || "unknown").trim().toLowerCase();
    const key = `${sourceId}:${normalizedLemma}`;
    const currentIndex = (this.fallbackIndexes.get(key) || 0) + 1;
    this.fallbackIndexes.set(key, currentIndex);

    return `${sourceId}:${normalizedLemma}:${currentIndex}`;
  }

  public loadGroups(groups: TranslationGroup[]): void {
    this.groups.push(...groups);
  }

  public loadEntries(entries: TranslationEntry[]): void {
    for (const entry of entries) {
      if (!entry.id) {
        entry.id = this.generateCanonicalId(
          (entry as any).sourceId || "default",
          (entry as any).sourceEntryId,
          entry.lemma || (entry as any).term
        );
      }
      this.entries.push(entry);
      this.indexEntry(entry);
    }
  }

  private indexEntry(entry: TranslationEntry): void {
    const tokens = new Set<string>();

    const addTokenVariants = (text?: string) => {
      if (!text) return;
      const rawLower = text.trim().toLowerCase();
      const normalized = this.normalizeString(text);
      const searchNorm = this.normalizeForSearch(text);

      if (rawLower) tokens.add(rawLower);
      if (normalized) tokens.add(normalized);
      if (searchNorm) tokens.add(searchNorm);
    };

    addTokenVariants(entry.lemma);
    addTokenVariants((entry as any).term);
    addTokenVariants(entry.normalizedLemma);

    entry.meanings?.forEach((meaning) => {
      if (meaning.text) {
        addTokenVariants(meaning.text);

        meaning.text
          .split(/[\s,.\-!?:;"'()\[\]{}–—]+/)
          .filter(Boolean)
          .forEach((t) => addTokenVariants(t));
      }
    });

    tokens.forEach((token) => {
      if (!this.searchIndex.has(token)) {
        this.searchIndex.set(token, new Set());
      }
      this.searchIndex.get(token)!.add(entry);
    });
  }

  private rebuildIndex(): void {
    this.searchIndex.clear();
    for (const entry of this.entries) {
      this.indexEntry(entry);
    }
  }

  public normalizeString(str: string): string {
    if (!str) return "";
    return str
      .trim()
      .toLowerCase()
      .replace(/[\u04C0\u04C1\u04CF\u04D01ӀIӏ]/gi, "ь")
      .replace(/ş/gi, "ш");
  }

  private normalizeForSearch(text: string): string {
    if (!text) return "";
    return text
      .trim()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  async getAllRules(): Promise<DialectRule[]> {
    return this.rules;
  }

  async getRuleById(id: string): Promise<DialectRule | null> {
    return this.rules.find((r) => r.id === id) || null;
  }

  async addRule(rule: DialectRule): Promise<void> {
    this.rules.push(rule);
  }

  async save(entry: TranslationEntry): Promise<TranslationEntry> {
    if (!entry.id) {
      entry.id = this.generateCanonicalId(
        (entry as any).sourceId || "default",
        (entry as any).sourceEntryId,
        entry.lemma || (entry as any).term
      );
    }
    const existingIndex = this.entries.findIndex((e) => e.id === entry.id);
    if (existingIndex !== -1) {
      this.entries[existingIndex] = entry;
      this.rebuildIndex();
    } else {
      this.entries.push(entry);
      this.indexEntry(entry);
    }
    return entry;
  }

  async findById(id: string): Promise<TranslationEntry | null> {
    return this.getById(id);
  }

  async findByLemma(lemma: string): Promise<TranslationEntry | null> {
    const results = await this.findManyByLemma(lemma);
    return results.length > 0 ? results[0] : null;
  }

  async findManyByLemma(lemma: string): Promise<TranslationEntry[]> {
    const key = this.normalizeString(lemma);
    const rawKey = lemma.trim().toLowerCase();
    if (!key && !rawKey) return [];

    const results: TranslationEntry[] = [];
    const candidates = this.searchIndex.get(key) || this.searchIndex.get(rawKey);

    if (candidates) {
      for (const entry of candidates) {
        const lemmaVal = entry.lemma || (entry as any).term || "";
        if (
          this.normalizeString(lemmaVal) === key ||
          lemmaVal.toLowerCase() === rawKey ||
          (entry.normalizedLemma && this.normalizeString(entry.normalizedLemma) === key)
        ) {
          results.push(entry);
        }
      }
    }

    if (results.length > 0) return results;

    return this.entries.filter((e) => {
      const lemmaVal = e.lemma || (e as any).term || "";
      return (
        this.normalizeString(lemmaVal) === key ||
        lemmaVal.toLowerCase() === rawKey ||
        (e.normalizedLemma && this.normalizeString(e.normalizedLemma) === key)
      );
    });
  }

  async findByMeaning(text: string, language?: string): Promise<TranslationEntry[]> {
    if (!text || !text.trim()) return [];

    const queryNormalized = this.normalizeForSearch(text);
    const targetLang = language?.trim().toUpperCase();

    return this.entries.filter((entry) => {
      return entry.meanings?.some((m) => {
        const matchesText = this.normalizeForSearch(m.text).includes(queryNormalized);
        const matchesLang = targetLang ? m.language.toUpperCase() === targetLang : true;
        return matchesText && matchesLang;
      });
    });
  }

  async saveGroup(group: TranslationGroup): Promise<TranslationGroup> {
    const targetId = group.id || (group as any).groupId;
    const index = this.groups.findIndex((g) => (g.id || (g as any).groupId) === targetId);
    if (index !== -1) {
      this.groups[index] = group;
    } else {
      this.groups.push(group);
    }
    return group;
  }

  async findGroupById(groupId: string): Promise<TranslationGroup | null> {
    return this.getByGroup(groupId);
  }

  async findAll(): Promise<TranslationEntry[]> {
    return this.entries;
  }

  async getAll(): Promise<TranslationEntry[]> {
    return this.entries;
  }

  public getAllEntries(): TranslationEntry[] {
    return this.entries;
  }

  async getById(id: string): Promise<TranslationEntry | null> {
    return this.entries.find((e) => e.id === id) || null;
  }

  async add(entry: TranslationEntry): Promise<void> {
    await this.save(entry);
  }

  async addEntry(entry: TranslationEntry): Promise<TranslationEntry> {
    return this.save(entry);
  }

  async update(entry: TranslationEntry): Promise<void> {
    await this.save(entry);
  }

  async delete(id: string): Promise<void> {
    const lengthBefore = this.entries.length;
    this.entries = this.entries.filter((e) => e.id !== id);
    if (this.entries.length !== lengthBefore) {
      this.rebuildIndex();
    }
  }

  filterByDialect(entries: TranslationEntry[], dialect: string): TranslationEntry[] {
    return entries.filter((e) => e.dialect === dialect);
  }

  filterByLanguage(entries: TranslationEntry[], language: string): TranslationEntry[] {
    return entries.filter((e) =>
      e.meanings?.some((m) => m.language === language)
    );
  }

  async getWithPagination(
    query: string,
    params: PaginationParams
  ): Promise<PaginatedResult<TranslationEntry>> {
    const filtered = await this.searchCrossDictionary(query);

    const page = params.page || 1;
    const limit = params.limit || 10;
    const start = (page - 1) * limit;
    const data = filtered.slice(start, start + limit);

    return {
      data,
      total: filtered.length,
      page,
      limit,
      totalPages: Math.ceil(filtered.length / limit) || 1,
    };
  }

  async searchWithFilters(query: string, filters?: any): Promise<TranslationEntry[]> {
    return this.searchCrossDictionary(query);
  }

  async getAllGroups(): Promise<TranslationGroup[]> {
    return this.groups;
  }

  async count(): Promise<number> {
    return this.entries.length;
  }

  async exists(id: string): Promise<boolean> {
    return this.entries.some((e) => e.id === id);
  }

  async getByLemma(lemma: string): Promise<TranslationEntry | null> {
    return this.findByLemma(lemma);
  }

  async getTranslations(query: string): Promise<TranslationEntry[]> {
    if (!query || !query.trim()) return [];

    const normalized = this.normalizeForSearch(query);
    return this.entries.filter((entry) => {
      const lemmaVal = entry.lemma || (entry as any).term || "";
      const entryNormalized = this.normalizeForSearch(lemmaVal);
      const meaningMatch = entry.meanings?.some((m) =>
        this.normalizeForSearch(m.text).includes(normalized)
      );
      return entryNormalized.includes(normalized) || meaningMatch;
    });
  }

  async search(query: string): Promise<TranslationEntry[]> {
    if (!query || !query.trim()) {
      return this.entries;
    }
    return this.getTranslations(query);
  }

  async reverseLookup(meaningQuery: string): Promise<TranslationEntry[]> {
    return this.findByMeaning(meaningQuery);
  }

  async getByGroup(groupId: string): Promise<TranslationGroup | null> {
    const groupEntries = this.entries.filter((e) => e.groupId === groupId);
    const group = this.groups.find((g) => g.id === groupId || (g as any).groupId === groupId);

    if (!group && groupEntries.length === 0) return null;

    return {
      id: groupId,
      groupName: group?.groupName || "Bilinmeyen Grup",
      entries: groupEntries.length > 0 ? groupEntries : (group?.entries || []),
    };
  }

  async findCanonicalById(id: string): Promise<TranslationEntry | null> {
    return this.getById(id);
  }

  async findGroupSenses(groupId: string): Promise<TranslationGroup | null> {
    return this.getByGroup(groupId);
  }

  async searchCrossDictionary(query: string): Promise<TranslationEntry[]> {
    if (!query || !query.trim()) {
      return this.entries;
    }

    const normalized = this.normalizeForSearch(query);

    return this.entries.filter((entry) => {
      const lemmaVal = entry.lemma || (entry as any).term || "";
      const lemmaMatch = this.normalizeForSearch(lemmaVal).includes(normalized);
      const meaningMatch = entry.meanings?.some((m) =>
        this.normalizeForSearch(m.text).includes(normalized)
      );
      return lemmaMatch || meaningMatch;
    });
  }

  public clear(): void {
    this.entries = [];
    this.groups = [];
    this.rules = [];
    this.searchIndex.clear();
    this.fallbackIndexes.clear();
  }
}