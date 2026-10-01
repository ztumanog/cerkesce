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
 *
 * DUZELTME (2026-10-01):
 * - else blogu kaldirildi (hayali sozluk eklemesi onlendi)
 * - languages Set'i sadece bulunan sozluklerden ekleniyor
 * - findWordInEntries artik anahtar (key) bazli arama yapiyor
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
      // Sozluk verisi yoksa atla (hayali kayit ekleme)
      if (!dictionaryEntries || !dictionaryEntries[dict.file]) {
        continue;
      }

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

        // Sadece bulunan sozlugun dilleri eklenir
        languages.add(dict.sourceLanguage);
        languages.add(dict.targetLanguage);
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
   *
   * DUZELTME: Artik anahtar (key) bazli arama yapiyor.
   * Sozluk JSON yapisi: { "kelime": { ... } }
   */
  private findWordInEntries(entries: any, word: string): { meaningCount: number } | null {
    if (!entries || typeof entries !== 'object') return null;

    // ============================================
    // Durum 1: Object (anahtar-deger) — asil sozluk formati
    // Ornek: { "Ӏэнэмыв": { meanings: [...] } }
    // ============================================
    if (!Array.isArray(entries)) {
      // Dogrudan anahtar arama
      const entry = entries[word];
      if (entry && typeof entry === 'object') {
        const meanings =
          entry.meanings ||
          entry.translations ||
          entry.senses ||
          entry.definitions ||
          [];
        const meaningCount = Array.isArray(meanings)
          ? meanings.length
          : (meanings ? 1 : 0);
        return { meaningCount };
      }
      return null;
    }

    // ============================================
    // Durum 2: Array — eski format (fallback)
    // Ornek: [ { lemma: "Ӏэнэмыв", meanings: [...] } ]
    // ============================================
    for (const entry of entries) {
      if (!entry || typeof entry !== 'object') continue;

      const e = entry as any;
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
