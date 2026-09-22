/**
 * @file src/utils/dictionaryMapper.ts
 * @description dictionaries.json verisini UI filtre bileşenlerine dönüştürür.
 */

export interface RawDictionary {
  file: string;
  title: string;
  displayName: string;
  dialect?: string;
  author?: string;
  editor?: string;
  publisher?: string;
  year?: string | number;
  total_words?: number;
  sourceLanguage: string;
  targetLanguage: string;
  confidence?: string;
  shortLabel?: string;
  shortLabelKiril?: string;
}

export interface SourceItem {
  id: string;
  name: string;
  displayName: string;
  count?: number;
  lang: 'mono' | 'tr' | 'en' | 'ru' | 'ar';
  dialect: 'bati' | 'dogu' | 'tumu';
}

export interface LangOption {
  value: string;
  label: string;
  count?: number;
}

/**
 * Target language kodunu UI dil grubuna eşler.
 */
export function mapLanguageGroup(targetLang: string): 'mono' | 'tr' | 'en' | 'ru' | 'ar' {
  switch (targetLang.toLowerCase()) {
    case 'ady':
    case 'kbd':
      return 'mono';
    case 'tr':
      return 'tr';
    case 'en':
      return 'en';
    case 'ru':
      return 'ru';
    case 'ar':
      return 'ar';
    default:
      return 'mono';
  }
}

/**
 * JSON dialect alanını standart lehçe değerine dönüştürür.
 */
export function mapDialect(dialect?: string): 'bati' | 'dogu' | 'tumu' {
  if (!dialect) return 'tumu';
  const normalized = dialect.toLowerCase();
  if (normalized === 'western') return 'bati';
  if (normalized === 'dogu') return 'dogu';
  return 'tumu';
}

/**
 * Raw JSON dizisini SourceItem dizisine dönüştürür.
 */
export function mapToSourceItems(rawList: RawDictionary[]): SourceItem[] {
  return rawList.map((item) => {
    const label = item.shortLabel ? `${item.shortLabel}` : item.title;
    return {
      id: item.file,
      name: label,
      displayName: item.displayName,
      count: item.total_words || 0,
      lang: mapLanguageGroup(item.targetLanguage),
      dialect: mapDialect(item.dialect),
    };
  });
}

/**
 * Toplam sözlük sayılarına göre dil seçeneklerini ve sayılarını hesaplar.
 */
export function extractLangOptions(rawList: RawDictionary[]): LangOption[] {
  const counts = { tumu: rawList.length, tr: 0, en: 0, ru: 0, ar: 0, mono: 0 };

  rawList.forEach((item) => {
    const group = mapLanguageGroup(item.targetLanguage);
    counts[group]++;
  });

  return [
    { value: 'tumu', label: 'Tümü', count: counts.tumu },
    { value: 'tr', label: 'Türkçe', count: counts.tr },
    { value: 'en', label: 'English', count: counts.en },
    { value: 'ru', label: 'Русский', count: counts.ru },
    { value: 'ar', label: 'العربية', count: counts.ar },
  ];
}

/**
 * Seçili filtrelere göre aktif sözlük dosyalarının listesini döndürür.
 */
export function filterDictionaries(
  rawList: RawDictionary[],
  selectedLang: string,
  selectedSources: string[],
  selectedDialect: string
): RawDictionary[] {
  return rawList.filter((item) => {
    // 1. Dil Filtresi
    if (selectedLang !== 'tumu') {
      const mappedLang = mapLanguageGroup(item.targetLanguage);
      if (mappedLang !== selectedLang) return false;
    }

    // 2. Lehçe Filtresi
    if (selectedDialect !== 'tumu') {
      const mappedDialect = mapDialect(item.dialect);
      if (mappedDialect !== selectedDialect) return false;
    }

    // 3. Özel Kaynak/Sözlük Seçimi Filtresi
    if (selectedSources.length > 0) {
      const label = item.shortLabel ? item.shortLabel : item.title;
      if (!selectedSources.includes(label)) return false;
    }

    return true;
  });
}
