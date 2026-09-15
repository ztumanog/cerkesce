export interface RawDictionaryItem {
  word?: string;
  madde?: string;
  lemma?: string;
  spelling?: string;
  meaning?: string;
  definition?: string;
  [key: string]: any;
}

export interface DictionaryMeta {
  file?: string;
  title?: string;
  originalTitle?: string;
  source?: string;
  dialect?: string;
  region?: string;
  timestamp?: string;
  confidence?: number;
  author?: string;
  editor?: string;
  publisher?: string;
  year?: number | string;
  sourceLanguage?: string;
  targetLanguage?: string;
}

export interface TranslationEntry {
  language: string;
  text: string;
  context?: string;
}

export interface DictionaryEntry {
  id: string;
  word: string;
  definition: string;
  partOfSpeech?: string;
  examples?: string[];
  translations?: TranslationEntry[];
  meta?: DictionaryMeta;
  synonyms?: string[];
  antonyms?: string[];
  etymology?: string;
  usage?: string;
}

export type LehceTipi = 
  | 'Standart'
  | 'Kuzey'
  | 'Güney'
  | 'dogu'
  | 'bati'
  | 'Mekezi'
  | 'Diğer'
  | 'Adigece'
  | 'ady'
  | 'Kabardeyce'
  | string;

export type SozlukTipi =
  | 'Genel'
  | 'Teknik'
  | 'Tıbbi'
  | 'Hukuki'
  | 'Eğitim'
  | 'Tarihsel';

export interface KaynakItem {
  title?: string;
  sözlük?: string;
  kaynak?: string;
  dictionaryName?: string;
  name?: string;
  author?: string;
  yazar?: string;
  editor?: string;
  publisher?: string;
  basim_evi?: string;
  year?: string | number;
  yil?: string | number;
  total_words?: number;
  totalWords?: number;
  kelimeSayisi?: number;
  kaynak_sozluk?: string;
  file?: string;
  tanim?: string;
  anlam?: string;
  meaning?: string;
  full_definition_in_html?: string;
}

export interface KelimeItem {
  id: string;
  kelime: string;
  madde: string;
  anlam: string;
  anlamlar?: string[];
  ilkAnlam?: string;
  kaynaklar?: KaynakItem[];
}

export interface GruplanmisKelime {
  harf: string;
  kelimeler: KelimeItem[];
}

export interface KelimeMeta {
  seviye?: 'Başlangıç' | 'Orta' | 'İleri';
  kategori?: string;
  notlar?: string;
  [key: string]: unknown;
}

export interface GununKelimesi {
  id: string;
  kelime: string;
  anlam: string;
  ornek?: string;
  lehce?: LehceTipi;
  tarih?: string;
  meta?: KelimeMeta;
}

export interface DailyWord {
  entry: DictionaryEntry;
  tarih: string;
  meta?: KelimeMeta;
}

export interface DictionaryItem {
  id: string;
  kelime: string;
  madde: string;
  anlam: string;
  anlamlar?: string[];
  ilkAnlam?: string;
  kaynaklar?: KaynakItem[];
  lehce?: LehceTipi;
  sozluk?: SozlukTipi;
}

export interface DictionaryRawItem {
  word?: string;
  madde?: string;
  lemma?: string;
  spelling?: string;
  meaning?: string;
  definition?: string;
  meanings?: string[];
  sources?: KaynakItem[];
  dialect?: string;
  dictionaryType?: string;
  [key: string]: any;
}

export interface AktifSozlukItem {
  id: string;
  name: string;
  type: SozlukTipi;
  itemCount: number;
  isActive: boolean;
  lastUpdated?: string;
  dialects?: LehceTipi[];
}

export interface GroupedDictionaryEntry {
  kelime: string;
  anlam: string;
  meaning?: string;
  tanim?: string;
  full_definition_in_html?: string;
  sourceDictionaryId?: string;
  source?: string;
  kaynak?: string;
}

export interface KaynakDetay {
  kaynak_sozluk?: string;
  file?: string;
  tanim?: string;
  anlam?: string;
  meaning?: string;
  full_definition_in_html?: string;
  title?: string;
  sözlük?: string;
  kaynak?: string;
  dictionaryName?: string;
  name?: string;
  author?: string;
  yazar?: string;
  year?: string | number;
  yil?: string | number;
  total_words?: number;
  totalWords?: number;
  kelimeSayisi?: number;
}

export interface DictionaryRepository {
  findById(id: string): Promise<DictionaryEntry | null>;
  findByWord(word: string): Promise<DictionaryEntry[]>;
  findAll(): Promise<DictionaryEntry[]>;
  save(entry: DictionaryEntry): Promise<void>;
  delete(id: string): Promise<void>;
}

export interface DictionaryService {
  search(query: string): Promise<DictionaryEntry[]>;
  getDaily(): Promise<DailyWord>;
  getTranslations(word: string, language: string): Promise<TranslationEntry[]>;
}

export interface DictionaryFilter {
  lehce?: LehceTipi;
  sozluk?: SozlukTipi;
  partOfSpeech?: string;
  minConfidence?: number;
}

export interface SearchResult {
  entries: DictionaryEntry[];
  total: number;
  page: number;
  pageSize: number;
}

export function isValidDictionaryEntry(obj: any): obj is DictionaryEntry {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.id === 'string' &&
    typeof obj.word === 'string' &&
    typeof obj.definition === 'string'
  );
}

export function isValidRawDictionaryItem(obj: any): obj is RawDictionaryItem {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    (typeof obj.word === 'string' ||
      typeof obj.madde === 'string' ||
      typeof obj.lemma === 'string')
  );
}

export function isValidGununKelimesi(obj: any): obj is GununKelimesi {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.id === 'string' &&
    typeof obj.kelime === 'string' &&
    typeof obj.anlam === 'string'
  );
}

export function isValidGruplanmisKelime(obj: any): obj is GruplanmisKelime {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.harf === 'string' &&
    Array.isArray(obj.kelimeler)
  );
}

export function isValidDictionaryItem(obj: any): obj is DictionaryItem {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.id === 'string' &&
    typeof obj.kelime === 'string' &&
    typeof obj.anlam === 'string'
  );
}

export function isValidAktifSozlukItem(obj: any): obj is AktifSozlukItem {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.id === 'string' &&
    typeof obj.name === 'string' &&
    typeof obj.isActive === 'boolean'
  );
}

export function isValidKelimeItem(obj: any): obj is KelimeItem {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.id === 'string' &&
    typeof obj.kelime === 'string' &&
    typeof obj.anlam === 'string'
  );
}