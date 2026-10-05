/**
 * @file src/services/TranslationService.ts
 * @description Çeviri ve arama operasyonlarını yöneten servis sınıfı.
 * @layer Application
 * @generated 2026-09-19
 * @lastUpdated 2026-10-05
 */

import { ITranslationRepository } from '../repository/ITranslationRepository';
import { TranslationEntry } from '../domain/translation';

export class TranslationService {
  constructor(
    private repository: ITranslationRepository,
    private matchingService?: any
  ) {}

  async search(query: string): Promise<TranslationEntry[]> {
    return this.repository.search(query);
  }

  async searchByMeaning(meaningQuery: string, languageFilter?: string): Promise<TranslationEntry[]> {
    return this.repository.searchByMeaning(meaningQuery, languageFilter);
  }

  async getById(id: string): Promise<TranslationEntry | null> {
    const entry = await this.repository.findCanonicalById!(id);
    if (entry) return entry;
    const entries = await this.repository.findByLemma(id);
    return entries.length > 0 ? entries[0] : null;
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
    return this.repository.searchCrossDictionary!(query);
  }

  async findSimilarTerms(lemma: string): Promise<TranslationEntry[]> {
    return this.repository.findByLemma(lemma);
  }

  async getDialectVariations(lemma: string, fromDialect?: string): Promise<TranslationEntry[]> {
    return this.repository.findByLemma(lemma);
  }

  filterByLanguage(entries: TranslationEntry[], language: string): TranslationEntry[] {
    const lang = language.toUpperCase();
    return entries.filter((e) =>
      e.meanings?.some((m: any) => m.language?.toUpperCase() === lang)
    );
  }
}
