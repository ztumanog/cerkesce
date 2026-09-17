/**
 * File: src/services/TranslationService.ts
 * Generated: 17.09.2026
 * Layer: Service
 */

import type { DictionaryEntry, TranslationMeaning } from "../types/dictionary";
import type { MorphologyAwareMatchingService } from "./MorphologyAwareMatchingService";

export interface ITranslationRepository {
  searchByMeaning?(query: string, targetLanguage?: string): Promise<DictionaryEntry[]>;
  search?(query: string, targetLanguage?: string): Promise<DictionaryEntry[]>;
  findByMeaning?(query: string, targetLanguage?: string): Promise<DictionaryEntry[]>;
  findAll?(): Promise<DictionaryEntry[]>;
  searchCrossDictionary?(query: string): Promise<DictionaryEntry[]>;
  save?(entry: DictionaryEntry): Promise<void>;
}

export interface ReverseLookupResult {
  lemma: string;
  entry: DictionaryEntry;
  matches: TranslationMeaning[];
}

export class TranslationService {
  constructor(
    private readonly repository: ITranslationRepository,
    private readonly matchingService?: MorphologyAwareMatchingService
  ) {
    if (this.repository) {
      const repo = this.repository as unknown as Record<string, unknown>;
      const self = this;

      if (typeof repo.searchCrossDictionary !== "function") {
        repo.searchCrossDictionary = (q: string) => self.search(q);
      }

      const proto = Object.getPrototypeOf(repo);
      if (proto && typeof proto.searchCrossDictionary !== "function") {
        proto.searchCrossDictionary = function (query: string) {
          if (typeof this.search === "function") return this.search(query);
          if (typeof this.findByMeaning === "function") return this.findByMeaning(query);
          if (typeof this.searchByMeaning === "function") return this.searchByMeaning(query);
          return [];
        };
      }
    }
  }

  public async search(query: string, targetLanguage?: string): Promise<DictionaryEntry[]> {
    const normalizedQuery = this.normalize(query);
    if (!normalizedQuery) return [];

    const repo = this.repository as unknown as Record<string, Function>;
    let results: DictionaryEntry[] = [];

    if (typeof repo.search === "function") {
      try {
        results = await repo.search(normalizedQuery, targetLanguage);
      } catch {
        results = [];
      }
    }

    if ((!results || results.length === 0) && typeof repo.findByMeaning === "function") {
      try {
        results = await repo.findByMeaning(normalizedQuery, targetLanguage);
      } catch {
        results = [];
      }
    }

    if ((!results || results.length === 0) && typeof repo.searchByMeaning === "function") {
      try {
        results = await repo.searchByMeaning(normalizedQuery, targetLanguage);
      } catch {
        results = [];
      }
    }

    if ((!results || results.length === 0) && typeof repo.findAll === "function") {
      try {
        const all = await repo.findAll();
        if (Array.isArray(all)) {
          const q = normalizedQuery.toLowerCase();
          results = all.filter((entry: DictionaryEntry) => {
            const word = (entry.word ?? entry.lemma ?? "").toLowerCase();
            if (word.includes(q)) return true;
            return (entry.meanings ?? []).some((m) => {
              const txt = this.getMeaningText(m);
              return txt.toLowerCase().includes(q);
            });
          });
        }
      } catch {
        results = [];
      }
    }

    if (targetLanguage && results.length > 0) {
      return this.filterByTargetLanguage(results, targetLanguage);
    }

    return results ?? [];
  }

  public async searchByMeaning(query: string, targetLang?: string): Promise<DictionaryEntry[]> {
    const normalizedQuery = this.normalize(query);
    if (!normalizedQuery) return [];

    let entries: DictionaryEntry[] = [];
    const repo = this.repository as unknown as Record<string, Function>;

    if (typeof repo.findByMeaning === "function") {
      entries = await repo.findByMeaning(normalizedQuery, targetLang);
    } else if (typeof repo.searchByMeaning === "function") {
      entries = await repo.searchByMeaning(normalizedQuery, targetLang);
    } else {
      entries = await this.search(normalizedQuery, targetLang);
    }

    if (!targetLang) {
      return entries;
    }

    const target = targetLang.trim().toUpperCase();
    return entries.filter((entry) =>
      (entry.meanings ?? []).some((m) => {
        const text = this.getMeaningText(m).toLowerCase();
        const lang = this.getMeaningLanguage(m).toUpperCase();
        return lang === target && text.includes(normalizedQuery);
      })
    );
  }

  public async searchCrossDictionary(query: string): Promise<DictionaryEntry[]> {
    const normalizedQuery = this.normalize(query);
    if (!normalizedQuery) return [];

    const repo = this.repository as unknown as Record<string, Function>;

    if (
      typeof repo.searchCrossDictionary === "function" &&
      repo.searchCrossDictionary !== this.searchCrossDictionary
    ) {
      try {
        const res = await repo.searchCrossDictionary(normalizedQuery);
        if (res && res.length > 0) return res;
      } catch {
        // Fallback
      }
    }

    return this.search(normalizedQuery);
  }

  public async reverseTranslate(query: string): Promise<DictionaryEntry | null> {
    const normalizedQuery = this.normalize(query);
    if (!normalizedQuery) return null;

    const candidates = await this.search(normalizedQuery);
    if (!candidates.length) return null;

    const ranked = candidates
      .map((entry: DictionaryEntry) => ({
        entry,
        score: this.scoreEntryMatch(entry, normalizedQuery),
      }))
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score);

    return ranked[0]?.entry ?? null;
  }

  public async filterByTargetLanguage(entries: DictionaryEntry[], targetLang: string): Promise<DictionaryEntry[]> {
    if (!targetLang) return entries;
    const target = targetLang.trim().toUpperCase();
    return entries.filter((entry: DictionaryEntry) =>
      (entry.meanings ?? []).some((meaning) =>
        this.getMeaningLanguage(meaning).toUpperCase() === target
      )
    );
  }

  public async reverseLookup(targetQuery: string): Promise<ReverseLookupResult[]> {
    const normalizedQuery = this.normalize(targetQuery);
    if (!normalizedQuery) return [];

    const entries = await this.search(normalizedQuery);

    return entries.map((entry: DictionaryEntry) => ({
      lemma: entry.word ?? entry.lemma ?? "",
      entry,
      matches: (entry.meanings ?? []).filter((meaning) => {
        const text = this.getMeaningText(meaning).toLowerCase();
        return text.includes(normalizedQuery.toLowerCase());
      }) as TranslationMeaning[],
    }));
  }

  public async registerEntry(
    entry: Partial<DictionaryEntry> & { sourceId?: string; sourceEntryId?: string }
  ): Promise<DictionaryEntry> {
    const meanings = Array.isArray(entry.meanings) ? entry.meanings : [];
    const fallbackDefinition = meanings.length > 0 ? this.getMeaningText(meanings[0]) : "";

    const normalizedEntry: DictionaryEntry = {
      id: entry.id ?? `${entry.sourceId ?? "entry"}-${entry.sourceEntryId ?? "0"}`,
      word: entry.word ?? entry.lemma ?? "",
      lemma: entry.lemma ?? entry.word ?? "",
      normalizedLemma: entry.normalizedLemma ?? entry.lemma ?? entry.word ?? "",
      definition: entry.definition ?? fallbackDefinition,
      dialect: entry.dialect,
      meanings: meanings as TranslationMeaning[],
      groupId: entry.groupId,
    };

    if (typeof this.repository.save === "function") {
      await this.repository.save(normalizedEntry);
    }
    return normalizedEntry;
  }

  private normalize(text?: string): string {
    return text ? text.trim().toLowerCase() : "";
  }

  private getMeaningText(
    meaning: TranslationMeaning | { text?: string; value?: string } | string | undefined
  ): string {
    if (!meaning) return "";
    if (typeof meaning === "string") return meaning;
    if (typeof meaning === "object") {
      return (meaning as { text?: string; value?: string }).text ?? (meaning as { text?: string; value?: string }).value ?? "";
    }
    return "";
  }

  private getMeaningLanguage(
    meaning: TranslationMeaning | { language?: string; lang?: string } | string | undefined
  ): string {
    if (!meaning) return "";
    if (typeof meaning === "string") return "";
    if (typeof meaning === "object") {
      const obj = meaning as Record<string, unknown>;
      return (obj.language as string) ?? (obj.lang as string) ?? "";
    }
    return "";
  }

  private scoreEntryMatch(entry: DictionaryEntry, query: string): number {
    const normalizedQuery = this.normalize(query);
    if (!normalizedQuery) return 0;

    if (this.matchingService) {
      const score = this.matchingService.match(entry, query);
      if (score > 0) return score;
    }

    const lemma = this.normalize(entry.word ?? entry.lemma ?? "");
    if (lemma.includes(normalizedQuery)) return 0.9;

    for (const meaning of entry.meanings ?? []) {
      const text = this.normalize(this.getMeaningText(meaning));
      if (text.includes(normalizedQuery)) return 0.8;
    }

    return 0;
  }
}