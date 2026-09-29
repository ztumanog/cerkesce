/**
 * File: src/domain/discovery/dto/CorpusExplorerDTO.ts
 * Layer: DTO
 *
 * P5-004: Corpus Explorer
 *
 * Bir kelimenin hangi sozluklerde gectigi, kac farkli anlam tasidigi,
 * hangi dillerde bulundugu sorusunu cevaplar.
 */

export interface CorpusExplorerResult {
  /** Aranan kelime */
  word: string;
  /** Kac farkli anlam */
  meaningCount: number;
  /** Hangi dillerde bulundugu */
  languages: string[];
  /** Hangi sozluklerde gectigi */
  dictionaries: CorpusDictionaryInfo[];
  /** Toplam kac sozlukte gectigi */
  totalDictionaries: number;
}

export interface CorpusDictionaryInfo {
  /** Sozluk ID (file adi) */
  file: string;
  /** Sozluk basligi */
  title: string;
  /** Kaynak dil */
  sourceLanguage: string;
  /** Hedef dil */
  targetLanguage: string;
  /** Lehce */
  dialect: string;
  /** Yil */
  year?: string;
  /** Yazar */
  author?: string;
}
