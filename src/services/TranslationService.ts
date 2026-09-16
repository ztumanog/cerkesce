/**
 * File: src/services/TranslationService.ts
 * Generated: 2026-09-16
 * Layer: Service
 */

import { TranslationEntry, TranslationMeaning, TranslationRepository } from "../domain/translation";
import { getMeaningText, getMeaningLanguage } from "../repository/helpers/meaningHelpers";

export interface ReverseLookupResult {
  lemma: string;
  entry: TranslationEntry;
  matches: (string | TranslationMeaning)[];
}

export class TranslationService {
  constructor(private readonly repo: TranslationRepository) {}

  async addMeaningToEntry(entryId: string, meaning: TranslationMeaning): Promise<TranslationEntry | null> {
    const existingEntry = await this.repo.findById(entryId);
    if (!existingEntry) return null;

    const updatedMeanings = [...(existingEntry.meanings ?? []), meaning];
    const updatedEntry: TranslationEntry = {
      ...existingEntry,
      meanings: updatedMeanings
    };

    await this.repo.save(updatedEntry);
    return updatedEntry;
  }

  async searchByQuery(query: string, targetLang?: string): Promise<TranslationEntry[]> {
    const normalizedQuery = query.toLowerCase().trim();
    const results = await this.repo.search(query, targetLang);

    return results.filter((entry) => {
      const matchesWord = (entry.sourceWord ?? "").toLowerCase().includes(normalizedQuery);
      const matchesMeaning = entry.meanings?.some((m) =>
        getMeaningText(m).toLocaleLowerCase("tr").includes(normalizedQuery)
      );
      return matchesWord || matchesMeaning;
    });
  }

  async filterByTargetLanguage(entries: TranslationEntry[], targetLang: string): Promise<TranslationEntry[]> {
    return entries.filter((entry) =>
      entry.meanings?.some((m) => getMeaningLanguage(m)?.toUpperCase() === targetLang.toUpperCase())
    );
  }

  async reverseLookup(targetQuery: string): Promise<ReverseLookupResult[]> {
    const queryNormalized = targetQuery.toLowerCase().trim();
    const entries = await this.repo.searchByMeaning(targetQuery);

    return entries.map((entry) => ({
      lemma: entry.lemma ?? entry.sourceWord ?? "",
      entry,
      matches: (entry.meanings ?? []).filter((m) =>
        getMeaningText(m).toLocaleLowerCase("tr").includes(queryNormalized)
      )
    }));
  }
}

