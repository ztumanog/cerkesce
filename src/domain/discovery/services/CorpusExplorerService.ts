/**
 * File: src/domain/discovery/services/CorpusExplorerService.ts
 * Layer: Service
 *
 * P5-004: Corpus Explorer
 *
 * Bir kelimenin hangi sozluklerde gectigini, kac farkli anlam tasidigini,
 * hangi dillerde bulundugunu bulur.
 *
 * Kural: Faz 5'te AI/LLM YOK. Basit metadata kullanilir.
 */

import { CorpusExplorerResult, CorpusDictionaryInfo } from '../dto/CorpusExplorerDTO';

interface DictionaryMetadata {
  file: string;
  title: string;
  sourceLanguage: string;
  targetLanguage: string;
  dialect: string;
  year?: string;
  author?: string;
}

export class CorpusExplorerService {
  private dictionaries: DictionaryMetadata[] = [];

  constructor(dictionaries?: DictionaryMetadata[]) {
    this.dictionaries = dictionaries || [];
  }

  /**
   * Sozluk listesini yukler.
   */
  public loadDictionaries(dictionaries: DictionaryMetadata[]): void {
    this.dictionaries = dictionaries;
  }

  /**
   * Bir kelimenin hangi sozluklerde gectigini bulur.
   */
  public explore(word: string, dictionaryEntries?: Record<string, any>): CorpusExplorerResult {
    const normalizedWord = word.trim();

    // Bos sorgu -> bos sonuc
    if (!normalizedWord) {
      return {
        word: '',
        meaningCount: 0,
        languages: [],
        dictionaries: [],
        totalDictionaries: 0,
      };
    }

    const foundDictionaries: CorpusDictionaryInfo[] = [];
    const languages = new Set<string>();
    let meaningCount = 0;

    for (const dict of this.dictionaries) {
      languages.add(dict.sourceLanguage);
      languages.add(dict.targetLanguage);

      // Sozluk verisinde kelime var mi?
      if (dictionaryEntries && dictionaryEntries[dict.file]) {
        const entries = dictionaryEntries[dict.file];
        const found = this.findWordInEntries(entries, normalizedWord);
        if (found) {
          foundDictionaries.push({
            file: dict.file,
            title: dict.title,
            sourceLanguage: dict.sourceLanguage,
            targetLanguage: dict.targetLanguage,
            dialect: dict.dialect,
            year: dict.year,
            author: dict.author,
          });
          meaningCount += found.meaningCount;
        }
      } else {
        // Metadata varsa ama veri yoksa, yine de ekle
        foundDictionaries.push({
          file: dict.file,
          title: dict.title,
          sourceLanguage: dict.sourceLanguage,
          targetLanguage: dict.targetLanguage,
          dialect: dict.dialect,
          year: dict.year,
          author: dict.author,
        });
        meaningCount += 1;
      }
    }

    return {
      word: normalizedWord,
      meaningCount,
      languages: Array.from(languages),
      dictionaries: foundDictionaries,
      totalDictionaries: foundDictionaries.length,
    };
  }

  /**
   * Bir sozluk entry listesinde kelimeyi arar.
   */
  private findWordInEntries(entries: any, word: string): { meaningCount: number } | null {
    if (!entries) return null;

    // entries bir array veya object olabilir
    const items = Array.isArray(entries) ? entries : Object.values(entries);

    for (const entry of items) {
      if (!entry || typeof entry !== 'object') continue;

      const e = entry as any;
      // Kelime eslesmesi
      if (
        e.lemma === word ||
        e.word === word ||
        e.kbd === word ||
        e.ady === word
      ) {
        const meanings = e.meanings || e.translations || [];
        const meaningCount = Array.isArray(meanings) ? meanings.length : 1;
        return { meaningCount };
      }
    }

    return null;
  }
}
