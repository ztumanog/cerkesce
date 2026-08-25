import type {
  Dispatch,
  RefObject,
  SetStateAction,
} from "react";

export type AramaModu =
  | "icinde"
  | "baslangic"
  | "tam"
  | "akilli"
  | string;

export type LehceTipi =
  | "Tümü"
  | "Batı Adığece"
  | "Doğu Kabardeyce"
  | string;

export type SozlukKaydi =
  Record<string, unknown>;

export type Dialect =
  | "BATI"
  | "DOGU"
  | string;

export interface SozlukBilgisi {
  id: string;
  ad: string;
  yazar?: string;
  kelimeSayisi: number;
}

export interface SozlukAnlam {
  meaning?: string;
  language?: string;
  [key: string]: unknown;
}

export interface DictionaryMeta {
  file: string;
  title?: string;
  label?: string;
  dialect?: string;
  total_words?: number;
  lang?: string;
  sourceLanguage?: string;
  targetLanguage?: string;
  year?: number;
  author?: string;
  editor?: string;
  publisher?: string;
  fromLang?: string;
  toLang?: string;
  [key: string]: unknown;
}

export interface DictionaryItem {
  kelime?: string;
  tanim?: string;
  spelling?: string;

  file?: string;
  kaynak_sozluk?: string;

  dialect?: Dialect;
  lehce?: string;
  diyalekt?: string;

  normalizedKelime?: string;
  normalizedTanim?: string;

  fromLang?: string;
  toLang?: string;


  id?: string | number;
  meaning?: string;

  definitions?: SozlukAnlam[];
  full_definition_in_html?: string;

  language?: string;
  dictionaryName?: string;

  cognates?: unknown[];
  redirect?: string;
  derivation?: string;
  type?: string;
  synonyms?: unknown[];

  [key: string]: unknown;
}

export interface GruplanmisKelime {
  kelime: string;

  kaynaklar?: DictionaryItem[];

  anlamlar: {
    tanim: string;
    file?: string;
    kaynak_sozluk?: string;
    dialect?: string;
    language?: string;
    [key: string]: unknown;
  }[];

  dialect?: string;

  [key: string]: unknown;
}

export interface SozlukEkraniProps {
  loading?: boolean;

  searchQuery: string;

  setSearchQuery: Dispatch<
    SetStateAction<string>
  >;

  seciliLehce: LehceTipi;

  setSeciliLehce: (
    lehce: LehceTipi
  ) => void;

  seciliDosya: string;

  setSeciliDosya: (
    dosya: string
  ) => void;

  gununKelimesi?: DictionaryItem | null;

  filtrelenmisSonuclar:
  | DictionaryItem[]
  | GruplanmisKelime[];

  aktifSozlukler: DictionaryMeta[];

  wordsCount?: number;

  [key: string]: unknown;
}

export interface SearchBoxProps {
  searchQuery: string;

  setSearchQuery: Dispatch<
    SetStateAction<string>
  >;

  mod: AramaModu;

  setMod: (
    mod: AramaModu
  ) => void;

  hedefDil: string;

  setHedefDil: (
    dil: string
  ) => void;

  seciliLehce: LehceTipi;

  setSeciliLehce: (
    lehce: LehceTipi
  ) => void;

  seciliDosya: string;

  setSeciliDosya: (
    dosya: string
  ) => void;

  aktifSozlukler: DictionaryMeta[];

  inputRef: RefObject<HTMLInputElement | null>;

  setGoruntulenenAdet: Dispatch<
    SetStateAction<number>
  >;

  limit: number;
}

export interface ConceptDetail {
  kaynakSozluk?: string;
  tanim?: string;
  file?: string;
  dialect?: string;
  language?: string;
  [key: string]: unknown;
}
export interface ConceptRow {
  id?: string | number;

  kavram?: string;

  Turkce?: string;
  Ingilizce?: string;
  Arapca?: string;
  Rusca?: string;
  Adigece?: string;
  Kabardeyce?: string;

  detaylar?: ConceptDetail[];

  kelime?: string;
  tanim?: string;

  word?: string;
  meaning?: string;

  file?: string;
  dialect?: string;
  language?: string;

  definitions?: SozlukAnlam[];
  full_definition_in_html?: string;

  [key: string]: unknown;
}


export interface DictionaryEntry {
  id: string;
  word: string;

  definitions?: Array<{
    meaning: string;
  }>;

  full_definition_in_html?: string;
  tanim?: string;
  meaning?: string;
}

export type DictionaryManifest = {
  id: string;
  title: string;
  entryCount: number;
};

export interface ManifestItem {
  file: string;
  title: string;
  label?: string;
  dialect: string;

  year?: number;
  sourceLanguage?: string;
  targetLanguage?: string;
  originalTitle?: string;

  author?: string;
  editor?: string;
  publisher?: string;

  total_words?: number;
  confidence?: string;
  shortLabel?: string;

  [key: string]: unknown;
}

export interface ManifestData {
  items: ManifestItem[];
}

export interface RawDictionaryWord {
  spelling: string;

  cognates?: unknown[];
  redirect?: string;

  full_definition_in_html?: string;

  definitions?: SozlukAnlam[];

  derivation?: string;
  type?: string;
  synonyms?: unknown[];

  [key: string]: unknown;
}

export interface RawDictionaryFile {
  title: string;
  id: string | number;

  words: Record<
    string,
    RawDictionaryWord
  >;
}
export function isSozlukTanimi(
  value: unknown
): value is DictionaryItem {
  return typeof value === "object" && value !== null;
}
