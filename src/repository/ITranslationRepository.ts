/**
 * @file src/repository/ITranslationRepository.ts
 * @description ADR-0007 standardına uygun Repository Arayüzü - Kapsamlı Versiyon
 * 
 * Bu arayüz çeviri deposunun tüm operasyonlarını tanımlar:
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
  dialect?: string; // BATI, DOGU
  language?: string; // TR, EN, vb.
  groupId?: string;
}

/**
 * Çeviri Deposu Arayüzü
 */
export interface ITranslationRepository {
  /**
   * ===== TEMEL SAKLAMA & SORGULAMA METODLARI =====
   */

  /**
   * Bir çeviri girdisini kaydeder veya günceller
   */
  save(entry: TranslationEntry): Promise<TranslationEntry>;

  /**
   * Yeni çeviri girdisi ekler (save için alias)
   */
  addEntry(entry: TranslationEntry): Promise<TranslationEntry>;

  /**
   * ID ile çeviri girdisini arar
   */
  findById(id: string): Promise<TranslationEntry | null>;

  /**
   * Genel arama yapar (lemma ve meanings içinde)
   */
  search(query: string): Promise<TranslationEntry[]>;

  /**
   * Anlam metni ve opsiyonel dille arama yapar
   */
  findByMeaning(text: string, language?: string): Promise<TranslationEntry[]>;

  /**
   * Çeviri grubunu kaydeder
   */
  saveGroup?(group: TranslationGroup): Promise<TranslationGroup>;

  /**
   * Grup ID'si ile grubu arar
   */
  findGroupById?(groupId: string): Promise<TranslationGroup | null>;

  /**
   * Tüm girdileri döndürür
   */
  findAll?(): Promise<TranslationEntry[]>;

  /**
   * ===== YENİ METODLAR (ADR-0007) =====
   */

  /**
   * Lemma (sözlük başı) ile çeviri girişini arar
   */
  getByLemma?(lemma: string): Promise<TranslationEntry | null>;

  /**
   * Sorgu dizesine göre çevirileri arar (partial match)
   */
  getTranslations?(query: string): Promise<TranslationEntry[]>;

  /**
   * Anlam sorgusu ile ters arama yapar (meanings içinde arama)
   */
  reverseLookup?(meaningQuery: string): Promise<TranslationEntry[]>;

  /**
   * Grup ID'si ile TranslationGroup'u arar
   */
  getByGroup?(groupId: string): Promise<TranslationGroup | null>;

  /**
   * ===== ESKİ METODLAR & ALIASED METODLAR =====
   */

  /**
   * ID ile canonical (kanonik) çeviri girişini arar
   */
  findCanonicalById?(id: string): Promise<TranslationEntry | null>;

  /**
   * Lemma ile çeviri girişini arar
   */
  findByLemma(lemma: string): Promise<TranslationEntry[] | TranslationEntry | null>;

  /**
   * Grup anlamlarını arar (getByGroup'un alias'ı)
   */
  findGroupSenses?(groupId: string): Promise<TranslationGroup | null>;

  /**
   * Çapraz sözlük araması (lemma ve meanings'de)
   */
  searchCrossDictionary?(query: string): Promise<TranslationEntry[]>;

  /**
   * ===== EKLENTİ METODLAR & FİLTRELER =====
   */

  /**
   * Lehçeye göre girdileri filtreler
   */
  filterByDialect?(entries: TranslationEntry[], dialect: string): TranslationEntry[];

  /**
   * Dile göre girdileri filtreler
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
   * Tüm girdileri döndürür
   */
  getAll(): Promise<TranslationEntry[]>;

  /**
   * Tüm grupları döndürür
   */
  getAllGroups?(): Promise<TranslationGroup[]>;

  /**
   * Giriş sayısını döndürür
   */
  count?(): Promise<number>;

  /**
   * Belirli bir lemmanın var olup olmadığını kontrol eder
   */
  exists?(lemma: string): Promise<boolean>;
}