/**
 * @file src/loader/DictionaryLoader.ts
 * @description 34-Sözlük ingest boru hattı için ham kayıtları doğrular ve standart TranslationEntry formatına dönüştürür.
 */

import { TranslationEntry, TranslationMeaning, LanguageCode, DialectCode } from "../domain/translation";

export interface RawDictionaryRecord {
  sourceId: string;
  sourceEntryId?: string;
  lemma: string;
  language: string;
  rawMeanings: Array<{ language: string; text: string }>;
  dialect?: string;
  normalizedLemma?: string;
  groupId?: string;
}

export class DictionaryLoader {
  /**
   * Ham sözlük verisini doğrular ve ADR-0008 standartlarına uygun TranslationEntry nesnesine dönüştürür.
   */
  public static normalizeRecord(raw: RawDictionaryRecord): TranslationEntry {
    if (!raw.lemma || raw.lemma.trim() === "") {
      throw new Error("[ADR-0008 Error] Record is missing mandatory lemma.");
    }

    if (!raw.language || raw.language.trim() === "") {
      throw new Error(
        `[ADR-0008 Error] Record lemma '${raw.lemma}' is missing mandatory source language.`
      );
    }

    if (!raw.rawMeanings || raw.rawMeanings.length === 0) {
      throw new Error(
        `[ADR-0008 Error] Record lemma '${raw.lemma}' must have at least one meaning.`
      );
    }

    const meanings: TranslationMeaning[] = raw.rawMeanings.map((m, idx) => {
      if (!m.language || m.language.trim() === "") {
        throw new Error(
          `[ADR-0008 Error] Meaning text '${m.text}' in lemma '${raw.lemma}' missing mandatory target language.`
        );
      }
      return {
        id: `${raw.sourceId}:${raw.lemma}:${idx + 1}`,
        language: m.language.toUpperCase() as LanguageCode,
        text: m.text.trim(),
      };
    });

    const canonicalId = raw.sourceEntryId 
      ? `${raw.sourceId}:${raw.sourceEntryId}` 
      : `${raw.sourceId}:${raw.lemma.trim().toLowerCase()}`;

    return {
      id: canonicalId,
      sourceId: raw.sourceId,
      sourceEntryId: raw.sourceEntryId,
      lemma: raw.lemma.trim(),
      normalizedLemma: raw.normalizedLemma || raw.lemma.trim().toLowerCase(),
      language: raw.language.toLowerCase() as LanguageCode,
      dialect: raw.dialect ? (raw.dialect as DialectCode) : undefined,
      meanings,
      groupId: raw.groupId,
    } as unknown as TranslationEntry;
  }

  /**
   * Toplu ham kayıt dizisini normalize eder.
   */
  public static normalizeBatch(rawRecords: RawDictionaryRecord[]): TranslationEntry[] {
    return rawRecords.map((record) => this.normalizeRecord(record));
  }
}