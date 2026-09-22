/**
 * @file src/services/TranslationService.ts
 * @description Çeviri ve arama operasyonlarını yöneten servis sınıfı.
 */

import { InMemoryTranslationRepository } from '../repository/InMemoryTranslationRepository';
import { TranslationEntry } from '../domain/translation';

export class TranslationService {
  /**
   * TranslationService Kurucu Metodu
   * 
   * @param repository - Veri erişim katmanı (InMemoryTranslationRepository)
   * @param matchingService - Morfolojik eşleştirme servisi (Opsiyonel / Test Uyumluluğu İçin)
   */
  constructor(
    private repository: InMemoryTranslationRepository,
    private matchingService?: any
  ) {}
  async search(query: string): Promise<TranslationEntry[]> {
    return this.repository.search(query);
  }

  async searchByMeaning(meaningQuery: string, languageFilter?: string): Promise<TranslationEntry[]> {
    return this.repository.searchByMeaning(meaningQuery, languageFilter);
  }

  async getById(id: string): Promise<TranslationEntry | null> {
    const entry = await this.repository.findCanonicalById(id);
    if (entry) return entry;
    return this.repository.findByLemma(id);
  }

  async reverseLookup(meaning: string): Promise<TranslationEntry | null> {
    if (!meaning || !meaning.trim()) return null;
    const entries = await this.repository.searchByMeaning(meaning);
    if (!entries || entries.length === 0) return null;
    return entries[0];
  }

  async reverseTranslate(meaning: string): Promise<TranslationEntry | null> {
    return this.reverseLookup(meaning);
  }

  async searchCrossDictionary(query: string): Promise<TranslationEntry[]> {
    return this.repository.searchCrossDictionary(query);
  }

  async findSimilarTerms(lemma: string): Promise<TranslationEntry[]> {
    const entry = await this.repository.findByLemma(lemma);
    return entry ? [entry] : [];
  }

  async getDialectVariations(lemma: string, fromDialect?: string): Promise<TranslationEntry[]> {
    const entry = await this.repository.findByLemma(lemma);
    return entry ? [entry] : [];
  }

  filterByLanguage(entries: TranslationEntry[], language: string): TranslationEntry[] {
    const lang = language.toUpperCase();
    return entries.filter((e) =>
      e.meanings?.some((m) => m.language?.toUpperCase() === lang)
    );
  }

  filterByDialect(entries: TranslationEntry[], dialect: string): TranslationEntry[] {
    return entries.filter((e) => e.dialect?.toLowerCase() === dialect.toLowerCase());
  }

  async getAllEntries(): Promise<TranslationEntry[]> {
    return this.repository.findAll();
  }
}
