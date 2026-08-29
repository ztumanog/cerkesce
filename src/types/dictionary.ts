/**
 * @file src/types/dictionary.ts
 * @description Çerkesçe Sözlük projesinin tüm Zod şemaları, TypeScript tipleri 
 * ve tip koruma (type guard) fonksiyonlarını içeren merkezi tip dosyası.
 */
import type { Dispatch, SetStateAction, RefObject } from "react";
import { z } from "zod";

// ============================================================================
// 1. HELPER & UTILITY FUNCTIONS
// ============================================================================

export function assertNever(x: never): never {
  throw new Error(`Beklenmeyen değer ile karşılaşıldı: ${JSON.stringify(x)}`);
}

// ============================================================================
// 2. ZOD SCHEMAS (Çalışma Zamanı Doğrulamaları)
// ============================================================================

/** 
 * Çerkesçe Lehçe Seçenekleri (Veri dönüştürme - Preprocess)
 * JSON'dan "eastern" gelse bile bunu "DOGU" tipine çevirir, tipleri temiz tutar.
 */
export const CircassianDialectSchema = z.preprocess((val) => {
  if (typeof val === "string") {
    const kucuk = val.toLowerCase();
    if (kucuk === "eastern" || kucuk === "dogu") return "DOGU";
    if (kucuk === "western" || kucuk === "bati") return "BATI";
  }
  return val;
}, z.enum(["DOGU", "BATI"]));

/** Sözlük Hedef Dilleri */
export const TargetLanguageSchema = z.enum(["turkish", "russian", "english"]);

/** Arama Modları */
export const SearchModeSchema = z.enum(["exact", "prefix", "contains", "fuzzy"]);

/** Arama Modu Enum Tanımı */
export enum AramaModuEnum {
  EXACT = "exact",
  PREFIX = "prefix",
  CONTAINS = "contains",
  FUZZY = "fuzzy",
}

/** Filtreleme için Lehçe Seçenekleri */
export const LehceTipiSchema = z.enum(["TUMU", "DOGU", "BATI"]);

/**
 * Tek bir sözlük kelimesi/kaydının Zod şeması.
 */
export const DictionaryItemSchema = z
  .object({
    id: z.string().optional(),
    word: z.string().optional(),
    definition: z.string().optional(),
    meaning: z.string().optional(),
    dictionaryId: z.string().optional(),
    dialect: CircassianDialectSchema.optional(),
    targetLanguage: TargetLanguageSchema.optional(),
    kelime: z.string().optional(),
    tanim: z.string().optional(),
    hedefDil: z.string().optional(),
    kaynak_sozluk: z.string().optional(),
    kaynakSozluk: z.string().optional(),
    file: z.string().optional(),
    birincilTanim: z.string().optional(),
    full_definition_in_html: z.string().optional(),
    definitions: z
      .array(
        z
          .object({
            meaning: z.string().optional(),
          })
          .catchall(z.unknown())
      )
      .optional(),
    language: z.string().optional(),
    fromLang: z.string().optional(),
    toLang: z.string().optional(),
    normalizedKelime: z.string().optional(),
    normalizedTanim: z.string().optional(),
  })
  .catchall(z.unknown());

/**
 * Sözlük üst verisi (Manifest objesi) Zod Şeması.
 */
export const DictionaryMetaSchema = z.object({
  file: z.string(),
  title: z.string(),
  author: z.string().optional(),
  editor: z.string().optional(),
  year: z.union([z.string(), z.number()]).optional(),
  dialect: CircassianDialectSchema,
  total_words: z.number().optional(),
  description: z.string().optional(),
  category: z.string().optional(),
  wordCount: z.number().optional(),
  count: z.number().optional(),
  active: z.boolean().optional(),
});

// ============================================================================
// 3. TYPES & INTERFACES (Zod Üzerinden Türetilen ve Ek Tipler)
// ============================================================================

export type CircassianDialect = z.infer<typeof CircassianDialectSchema>;
export type TargetLanguage = z.infer<typeof TargetLanguageSchema>;
export type SearchMode = z.infer<typeof SearchModeSchema>;
export type AramaModu = SearchMode;
export type LehceTipi = z.infer<typeof LehceTipiSchema>;

export type DictionaryItem = z.infer<typeof DictionaryItemSchema>;
export type NormalizedDictionaryItem = DictionaryItem;
export type DictionaryMeta = z.infer<typeof DictionaryMetaSchema>;

export interface EnrichedDictionary extends DictionaryMeta {
  description?: string;
  category?: string;
  wordCount?: number;
}

export interface RawDefinition {
  meaning?: string;
  [key: string]: unknown;
}

export interface RawDefinitionItem {
  kelime: string;
  tanim: string;
  [key: string]: unknown;
}

export interface RawDictionaryData {
  readonly [key: string]: unknown;
}

export interface BatchLoadResult {
  success: boolean;
  loadedCount: number;
  failedCount: number;
  errors: readonly string[];
  entries: Record<string, unknown>;
}

export interface GruplanmisKelime {
  anaKelime?: string;
  kelime?: string;
  anlamlar: readonly string[] | DictionaryItem[];
  kaynaklar?: readonly string[];
  lehce?: LehceTipi;
  [key: string]: unknown;
}

export interface ConceptDetail {
  id?: string;
  concept?: string;
  kaynakSozluk?: string;
  tanim?: string;
  meaning?: string;
  language?: string;
  [key: string]: unknown;
}

export interface ConceptRow {
  id: string;
  concept: string;
  [key: string]: unknown;
}

export interface UseDictionaryReturn {
  loading: boolean;
  error: string | null;
  wordsCount: number;
  aktifSozlukler: DictionaryMeta[];
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  hedefDil: string;
  setHedefDil: Dispatch<SetStateAction<string>>;
  seciliLehce: LehceTipi;
  setSeciliLehce: Dispatch<SetStateAction<LehceTipi>>;
  seciliDosya: string;
  setSeciliDosya: Dispatch<SetStateAction<string>>;
  aramaModu: AramaModu;
  setAramaModu: Dispatch<SetStateAction<AramaModu>>;
  
  mod?: AramaModu;
  setMod?: Dispatch<SetStateAction<AramaModu>>;
  limit?: number;
  setLimit?: Dispatch<SetStateAction<number>>;

  filtrelenmisSonuclar: DictionaryItem[];
  inputRef?: RefObject<HTMLInputElement | null>;
}

/**
 * AkilliKlavyeProps Interface
 */
export interface AkilliKlavyeProps {
  inputRef?: RefObject<HTMLInputElement | null>;
  sorgu: string;
  setSorgu: (sorgu: string) => void;
  metinBoyutu?: number | string;
  karanlikMod?: boolean;
}

/**
 * SearchBoxProps Interface
 */
export interface SearchBoxProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  hedefDil: string;
  setHedefDil: (dil: string) => void;
  seciliLehce: LehceTipi;
  setSeciliLehce: (lehce: LehceTipi) => void;
  seciliDosya: string;
  setSeciliDosya: (dosya: string) => void;
  aramaModu?: AramaModu;
  setAramaModu?: (mod: AramaModu) => void;
  mod?: AramaModu;
  setMod?: (mod: AramaModu) => void;
  limit?: number;
  setLimit?: (limit: number) => void;
  aktifSozlukler?: DictionaryMeta[];
  inputRef?: RefObject<HTMLInputElement | null>;
  setGoruntulenenAdet?: (adet: number) => void;
  karanlikMod?: boolean;
  metinBoyutu?: number | string;
}

// ============================================================================
// 4. TYPE GUARDS & UI HELPERS (Tip Korumaları ve Etiketler)
// ============================================================================

export function isDictionaryItem(item: unknown): item is DictionaryItem {
  return DictionaryItemSchema.safeParse(item).success;
}

export function isDictionaryMeta(meta: unknown): meta is DictionaryMeta {
  return DictionaryMetaSchema.safeParse(meta).success;
}

export function getDialectFilterLabel(dialect: LehceTipi): string {
  switch (dialect) {
    case "BATI":
      return "Batı Çerkesçesi (Adigece)";
    case "DOGU":
      return "Doğu Çerkesçesi (Kabardeyce)";
    case "TUMU":
      return "Tüm Lehçeler";
    default:
      return assertNever(dialect);
  }
}