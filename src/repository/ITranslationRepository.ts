import { TranslationEntry, TranslationMeaning } from '../domain/translation';

/**
 * ADR-0007 TranslationRepository Kontratı.
 * Bu katman sadece deterministik veri erişimi sağlar;
 * iş kuralları (grouping, concept matching) çalıştırmaz.
 */
export interface ITranslationRepository {
  /**
   * Benzersiz deterministik ID ile kayıt getirir.
   */
  getById(entryId: string): Promise<TranslationEntry | null>;

  /**
   * Verilen dil ve lemmaya göre tam eşleşen kayıtları döndürür.
   */
  getByLemma(language: string, lemma: string): Promise<TranslationEntry[]>;

  /**
   * Belirtilen dil ve lemmaya ait anlam listesini döndürür.
   */
  getTranslations(language: string, lemma: string): Promise<TranslationMeaning[]>;

  /**
   * Hedef dildeki anlam metni üzerinden arama yapar.
   */
  searchByMeaning(text: string): Promise<TranslationEntry[]>;

  /**
   * Tersine arama (Reverse Lookup) gerçekleştirir.
   */
  reverseLookup(targetLanguage: string, text: string): Promise<TranslationEntry[]>;
}