/**
 * @file src/repository/ITranslationRepository.ts
 * @description ADR-0007 standardÄ±na uygun Repository ArayÃ¼zÃ¼ - KapsamlÄ± Versiyon
 * 
 * Bu arayÃ¼z Ã§eviri deposunun tÃ¼m operasyonlarÄ±nÄ± tanÄ±mlar:
 * - Temel metodlar: save, findById, search, addEntry
 * - Yeni metodlar (ADR-0007): getByLemma, getTranslations, reverseLookup, getByGroup
 * - Eski metodlar (Backward Compatibility): findByLemma, findCanonicalById, findGroupSenses, searchCrossDictionary
 * - Filtreler: filterByDialect, filterByLanguage
 * - Pagination: getWithPagination
 */

import { TranslationEntry, TranslationGroup } from "../domain/translation";

/**
 * Pagination parametreleri
 */
export interface PaginationParams {
  page: number;
  limit: number;
}

/**
 * Pagination sonucu
 */
export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

/**
 * Arama filtreleri
 */
export interface SearchFilters {
  dialect?: string; // ADY, KBD
  language?: string; // TR, EN, vb.
  groupId?: string;
}

/**
 * Ã‡eviri Deposu ArayÃ¼zÃ¼
 */
export interface ITranslationRepository {
  /**
   * ===== TEMEL SAKLAMA & SORGULAMA METODLARI =====
   */

  /**
   * Bir Ã§eviri girdisini kaydeder veya gÃ¼nceller
   */
  save(entry: TranslationEntry): Promise<TranslationEntry>;

  /**
   * Yeni Ã§eviri girdisi ekler (save iÃ§in alias)
   */
  addEntry(entry: TranslationEntry): Promise<TranslationEntry>;

  /**
   * ID ile Ã§eviri girdisini arar
   */
  findById(id: string): Promise<TranslationEntry | null>;

  /**
   * Genel arama yapar (lemma ve meanings iÃ§inde)
   */
  search(query: string): Promise<TranslationEntry[]>;

  /**
   * Anlam metni ve opsiyonel dille arama yapar
   */
  findByMeaning(text: string, language?: string): Promise<TranslationEntry[]>;

  /**
   * Ã‡eviri grubunu kaydeder
   */
  saveGroup?(group: TranslationGroup): Promise<TranslationGroup>;

  /**
   * Grup ID'si ile grubu arar
   */
  findGroupById?(groupId: string): Promise<TranslationGroup | null>;

  /**
   * TÃ¼m girdileri dÃ¶ndÃ¼rÃ¼r
   */
  findAll?(): Promise<TranslationEntry[]>;

  /**
   * ===== YENÄ° METODLAR (ADR-0007) =====
   */

  /**
   * Lemma (sÃ¶zlÃ¼k baÅŸÄ±) ile Ã§eviri giriÅŸini arar
   */
  getByLemma?(lemma: string): Promise<TranslationEntry | null>;

  /**
   * Sorgu dizesine gÃ¶re Ã§evirileri arar (partial match)
   */
  getTranslations?(query: string): Promise<TranslationEntry[]>;

  /**
   * Anlam sorgusu ile ters arama yapar (meanings iÃ§inde arama)
   */
  reverseLookup?(meaningQuery: string): Promise<TranslationEntry[]>;

  /**
   * Grup ID'si ile TranslationGroup'u arar
   */
  getByGroup?(groupId: string): Promise<TranslationGroup | null>;

  /**
   * ===== ESKÄ° METODLAR & ALIASED METODLAR =====
   */

  /**
   * ID ile canonical (kanonik) Ã§eviri giriÅŸini arar
   */
  findCanonicalById?(id: string): Promise<TranslationEntry | null>;

  /**
   * Lemma ile Ã§eviri giriÅŸini arar
   */
  findByLemma(lemma: string): Promise<TranslationEntry[] | TranslationEntry | null>;

  /**
   * Grup anlamlarÄ±nÄ± arar (getByGroup'un alias'Ä±)
   */
  findGroupSenses?(groupId: string): Promise<TranslationGroup | null>;

  /**
   * Ã‡apraz sÃ¶zlÃ¼k aramasÄ± (lemma ve meanings'de)
   */
  searchCrossDictionary?(query: string): Promise<TranslationEntry[]>;

  /**
   * ===== EKLENTÄ° METODLAR & FÄ°LTRELER =====
   */

  /**
   * LehÃ§eye gÃ¶re girdileri filtreler
   */
  filterByDialect?(entries: TranslationEntry[], dialect: string): TranslationEntry[];

  /**
   * Dile gÃ¶re girdileri filtreler
   */
  filterByLanguage?(entries: TranslationEntry[], language: string): TranslationEntry[];

  /**
   * Filtreleri uygulayarak arama yapar
   */
  searchWithFilters?(query: string, filters: SearchFilters): Promise<TranslationEntry[]>;

  /**
   * Pagination ile arama yapar
   */
  getWithPagination?(query: string, params: PaginationParams): Promise<PaginatedResult<TranslationEntry>>;

  /**
   * TÃ¼m girdileri dÃ¶ndÃ¼rÃ¼r
   */
  getAll(): Promise<TranslationEntry[]>;

  /**
   * TÃ¼m gruplarÄ± dÃ¶ndÃ¼rÃ¼r
   */
  getAllGroups?(): Promise<TranslationGroup[]>;

  /**
   * GiriÅŸ sayÄ±sÄ±nÄ± dÃ¶ndÃ¼rÃ¼r
   */
  count?(): Promise<number>;

  /**
   * Belirli bir lemmanÄ±n var olup olmadÄ±ÄŸÄ±nÄ± kontrol eder
   */
  exists?(lemma: string): Promise<boolean>;
}
