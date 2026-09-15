/**
 * @file src/services/TranslationService.ts
 * @description Ã‡eviri, arama, filtreleme, ters sÃ¶zlÃ¼k bakma ve kayÄ±t iÅŸlemlerini yÃ¶neten servis katmanÄ±.
 */

import { ITranslationRepository, SearchFilters } from "../repository/ITranslationRepository";
import { TranslationEntry, TranslationGroup, TranslationMeaning } from "../domain/translation";
import { MorphologyAwareMatchingService } from "./MorphologyAwareMatchingService";

// Register iÅŸlemi sÄ±rasÄ±nda opsiyonel source id alanlarÄ±nÄ± destekleyen tip tanÄ±mÄ±
export type RegisterTranslationEntryInput = Omit<TranslationEntry, "id"> & {
  id?: string;
  sourceId?: string;
  sourceEntryId?: string;
};

// ==========================================
// DÄ±ÅŸa AktarÄ±lan ArayÃ¼z ve DÃ¶nÃ¼ÅŸ Tipleri
// ==========================================

export interface TranslationResult {
  entry: TranslationEntry;
  translations: TranslationEntry[];
}

export interface SearchResult {
  entries: TranslationEntry[];
  total: number;
}

export interface ReverseLookupResult {
  lemma: string;
  entry: TranslationEntry;
  matches: TranslationMeaning[];
}

export class TranslationService {
  private cacheStats = { size: 0, entries: [] as string[] };

  constructor(
    private readonly repository: ITranslationRepository,
    private readonly matchingService?: MorphologyAwareMatchingService | any
  ) {}

  /**
   * Sorguyu temizler ve TÃ¼rkÃ§e harf duyarlÄ±lÄ±ÄŸÄ±yla kÃ¼Ã§Ã¼k harfe dÃ¶nÃ¼ÅŸtÃ¼rÃ¼r.
   */
  private normalizeQuery(query: string): string {
    return query.trim().toLocaleLowerCase("tr");
  }

  /**
   * Yeni Ã§eviri girdisi kaydeder veya var olan girdiye yeni anlamlar ekler.
   */
  async registerEntry(
    entryData: RegisterTranslationEntryInput
  ): Promise<TranslationEntry> {
    const inputWithSource = entryData as RegisterTranslationEntryInput;

    if (inputWithSource.sourceEntryId && inputWithSource.sourceId) {
      const existingId = `${inputWithSource.sourceId}:${inputWithSource.sourceEntryId}`;

      const repoAny = this.repository as any;
      const existingEntry: TranslationEntry | null =
        typeof repoAny.getById === "function"
          ? await repoAny.getById(existingId)
          : typeof repoAny.findById === "function"
          ? await repoAny.findById(existingId)
          : null;

      if (existingEntry) {
        existingEntry.meanings = [
          ...existingEntry.meanings,
          ...entryData.meanings,
        ];

        if (typeof repoAny.save === "function") {
          await repoAny.save(existingEntry);
        }
        return existingEntry;
      }
    }

    const entryToSave: TranslationEntry = {
      ...entryData,
      id: entryData.id || "",
    } as TranslationEntry;

    if (typeof (this.repository as any).save === "function") {
      return await (this.repository as any).save(entryToSave);
    }

    return entryToSave;
  }

  /**
   * KimliÄŸe (id) gÃ¶re kayÄ±t getirir.
   */
  async getById(id: string): Promise<TranslationEntry | null> {
    const repoAny = this.repository as any;
    if (typeof repoAny.findById === "function") {
      return await repoAny.findById(id);
    }
    if (typeof repoAny.getById === "function") {
      return await repoAny.getById(id);
    }
    return null;
  }

  /**
   * BirleÅŸik Ã‡oklu Dil ve Ã‡apraz Arama (Unified Cross-Dictionary & MultiLanguage Search)
   */
  async search(query: string): Promise<TranslationEntry[]> {
    if (!query || !query.trim()) {
      return [];
    }

    const normalizedQuery = this.normalizeQuery(query);

    const allEntries = await this.repository.search(normalizedQuery);

    if (!allEntries || allEntries.length === 0) {
      return [];
    }

    return allEntries.filter((entry) => {
      const matchLemma =
        entry.normalizedLemma?.toLocaleLowerCase("tr").includes(normalizedQuery) ||
        entry.lemma?.toLocaleLowerCase("tr").includes(normalizedQuery);

      const matchMeaning = entry.meanings?.some((m) =>
        m.text.toLocaleLowerCase("tr").includes(normalizedQuery)
      );

      return matchLemma || matchMeaning;
    });
  }

  /**
   * Lemma (kelime) bazlÄ± Ã§apraz arama yapar.
   */
  async searchCrossDictionary(lemma: string): Promise<TranslationEntry[]> {
    if (!lemma || !lemma.trim()) return [];

    if (typeof (this.repository as any).findManyByLemma === "function") {
      return await (this.repository as any).findManyByLemma(lemma);
    }

    const singleResult = await this.repository.findByLemma(lemma);
    if (singleResult) {
      return Array.isArray(singleResult) ? singleResult : [singleResult];
    }

    return this.search(lemma);
  }

  /**
   * Anlam metnine gÃ¶re filtreli arama yapar.
   */
  async searchByMeaning(text: string, language?: string): Promise<TranslationEntry[]> {
    if (!text || !text.trim()) return [];

    if (typeof (this.repository as any).findByMeaning === "function") {
      return await (this.repository as any).findByMeaning(text, language);
    }

    const results = await this.search(text);
    if (!language) return results;

    const targetLang = language.trim().toUpperCase();
    return results.filter((entry) =>
      entry.meanings?.some((m) => m.language.toUpperCase() === targetLang)
    );
  }

  /**
   * Anlam sorgusu Ã¼zerinden eÅŸleÅŸen kelimelerin ve eÅŸleÅŸen anlamlarÄ±n detaylÄ± listesini dÃ¶ner.
   */
  async reverseLookup(meaning: string, language?: string): Promise<ReverseLookupResult[]> {
    const entries = await this.searchByMeaning(meaning, language);
    const targetQuery = meaning.trim().toLocaleLowerCase("tr");

    return entries.map((entry) => ({
      lemma: entry.lemma,
      entry,
      matches: (entry.meanings || []).filter((m) =>
        m.text.toLocaleLowerCase("tr").includes(targetQuery)
      ),
    }));
  }

  /**
   * Anlam metninden tek bir kelimeye ters arama yapar.
   */
  async reverseTranslate(meaningQuery: string): Promise<TranslationEntry | null> {
    if (!meaningQuery || !meaningQuery.trim()) {
      return null;
    }

    const normalizedQuery = this.normalizeQuery(meaningQuery);

    const results = await this.search(normalizedQuery);

    const matchedMeaningEntry = results.find((entry) =>
      entry.meanings?.some((m) =>
        m.text.toLocaleLowerCase("tr").includes(normalizedQuery)
      )
    );

    if (matchedMeaningEntry) {
      return matchedMeaningEntry;
    }

    if (typeof (this.repository as any).getAllEntries === "function") {
      const allEntries: TranslationEntry[] = await (this.repository as any).getAllEntries();
      const directMatch = allEntries.find((entry) =>
        entry.meanings?.some((m) =>
          m.text.toLocaleLowerCase("tr").includes(normalizedQuery)
        )
      );
      if (directMatch) return directMatch;
    }

    return results.length > 0 ? results[0] : null;
  }

  /**
   * Takma ad (Alias): reverseTranslate ile aynÄ± mantÄ±kta Ã§alÄ±ÅŸÄ±r.
   */
  async reverseTranslationSearch(query: string): Promise<TranslationEntry | null> {
    return this.reverseTranslate(query);
  }

  /**
   * Kelimeyi arayÄ±p, seÃ§ilen diyalektlere gÃ¶re Ã§eviri eÅŸleÅŸmeleriyle birlikte nesne listesi olarak dÃ¶ner.
   */
  async translate(query: string, fromDialect?: string, toDialect?: string): Promise<TranslationResult[]> {
    let entries = await this.searchCrossDictionary(query);

    if (fromDialect) {
      entries = this.filterByDialect(entries, fromDialect);
    }

    return entries.map((entry) => {
      let otherTranslations = entries.filter((e) => e.id !== entry.id);
      if (toDialect) {
        otherTranslations = this.filterByDialect(otherTranslations, toDialect);
      }
      return {
        entry,
        translations: otherTranslations,
      };
    });
  }

  /**
   * YakÄ±n kelimeleri veya benzer terimleri getirir.
   */
  async findSimilarTerms(lemma: string, threshold = 0.8): Promise<TranslationEntry[]> {
    return await this.searchCrossDictionary(lemma);
  }

  /**
   * Bir kelimenin belirli bir diyalekteki varyasyonlarÄ±nÄ± dÃ¶ner.
   */
  async getDialectVariations(lemma: string, dialect: string): Promise<TranslationEntry[]> {
    const entries = await this.searchCrossDictionary(lemma);
    return this.filterByDialect(entries, dialect);
  }

  /**
   * Filtrelerle geliÅŸmiÅŸ arama desteÄŸi saÄŸlar (dictionaryActions desteÄŸi iÃ§in).
   */
  async searchWithFilters(query: string, filters: SearchFilters): Promise<SearchResult> {
    const repoAny = this.repository as any;
    if (typeof repoAny.searchWithFilters === "function") {
      const entries = await repoAny.searchWithFilters(query, filters);
      return { entries, total: entries.length };
    }

    let entries = await this.search(query);
    if (filters.dialect) {
      entries = this.filterByDialect(entries, filters.dialect);
    }
    if (filters.language) {
      entries = this.filterByLanguage(entries, filters.language);
    }
    if (filters.groupId) {
      entries = entries.filter((e) => e.groupId === filters.groupId);
    }
    return { entries, total: entries.length };
  }

  /**
   * TÃ¼m kayÄ±tlarÄ± dÃ¶ner (dictionaryActions desteÄŸi iÃ§in).
   */
  async getAllEntries(): Promise<TranslationEntry[]> {
    const repoAny = this.repository as any;
    if (typeof repoAny.findAll === "function") {
      return await repoAny.findAll();
    }
    if (typeof repoAny.getAll === "function") {
      return await repoAny.getAll();
    }
    return [];
  }

  /**
   * TÃ¼m gruplarÄ± dÃ¶ner (dictionaryActions desteÄŸi iÃ§in).
   */
  async getAllGroups(): Promise<TranslationGroup[]> {
    const repoAny = this.repository as any;
    if (typeof repoAny.getAllGroups === "function") {
      return await repoAny.getAllGroups();
    }
    return [];
  }

  // ==========================================
  // Helper & Action MetodlarÄ± (dictionaryActions iÃ§in)
  // ==========================================

  /**
   * Verilen liste iÃ§erisinden sadece hedef dilde anlamÄ± olan kayÄ±tlarÄ± filtreler.
   */
  public filterByLanguage(entries: TranslationEntry[], language: string): TranslationEntry[] {
    if (!language || !language.trim()) return entries;
    const targetLang = language.trim().toUpperCase();
    return entries.filter((entry) =>
      entry.meanings?.some((m) => m.language.toUpperCase() === targetLang)
    );
  }

  /**
   * Verilen liste iÃ§erisinden sadece hedef diyalekte ait kayÄ±tlarÄ± filtreler.
   */
  public filterByDialect(entries: TranslationEntry[], dialect: string): TranslationEntry[] {
    if (!dialect || !dialect.trim()) return entries;
    const targetDialect = dialect.trim().toLowerCase();
    return entries.filter((entry) => entry.dialect?.toLowerCase() === targetDialect);
  }

  /**
   * Grup kimliÄŸine gÃ¶re Ã§eviri grubunu (TranslationGroup) dÃ¶ner.
   */
  public async getByGroup(groupId: string): Promise<TranslationGroup | null> {
    const repoAny = this.repository as any;
    if (typeof repoAny.findGroupById === "function") {
      return await repoAny.findGroupById(groupId);
    }
    if (typeof repoAny.getByGroup === "function") {
      return await repoAny.getByGroup(groupId);
    }
    return null;
  }

  /**
   * Servis Ã¶nbellek istatistiklerini sÄ±fÄ±rlar.
   */
  public clearCache(): void {
    this.cacheStats = { size: 0, entries: [] };
  }

  /**
   * Servis Ã¶nbellek istatistiklerini dÃ¶ner.
   */
  public getCacheStats(): { size: number; entries: string[] } {
    return this.cacheStats;
  }
}
