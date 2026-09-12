export interface KaynakDetay {
  id?: string;
  ad?: string;
  kod?: string;
  kaynak_sozluk?: string;
  file?: string;
  kaynak?: string;
  sözlük?: string;
  dictionaryName?: string;
  tanim?: string;
  anlam?: string;
  meaning?: string;
  full_definition_in_html?: string;
  [key: string]: any;
}

export type KaynakItem = any;

export interface DictionaryEntry {
  id: string;
  kelime: string;
  anlam?: string;
  meaning?: string;
  tanim?: string;
  full_definition_in_html?: string;
  sourceDictionaryId?: string;
  source?: string;
  kaynak?: string;
  kokKelime?: string;
  [key: string]: any;
}

export type DictionaryItem = DictionaryEntry;

export interface TranslationEntry extends DictionaryEntry {
  hedefDil?: string;
  ceviri?: string;
}

export interface GroupedDictionaryEntry {
  id: string;
  kelime: string;
  entries: DictionaryEntry[];
  anlamlar: string[];
  kaynaklar: any[];
  ilkAnlam?: string;
  kokKelime?: string;
  [key: string]: any;
}

export interface GruplanmisKelime extends GroupedDictionaryEntry {}

export interface GununKelimesiMeta {
  etimoloji?: string;
  ornekCumle?: string;
  ornekCumleCeviri?: string;
  kokKelime?: string;
  [key: string]: any;
}

export interface GununKelimesi {
  id?: string;
  kelime: string;
  anlam: string;
  kaynak?: string;
  lehce?: string;
  meta?: GununKelimesiMeta | any;
  kokKelime?: string;
  [key: string]: any;
}
