export interface RawDictionaryEntry {
  id: string;
  lemma: string;
  translation: string;
  dialect?: string;
  examples?: Array<{ text: string; translation: string }>;
  etymology?: string;
  [key: string]: any;
}

export interface DailyWord {
  id: string;
  kelime: string;
  anlam: string;
  lehce: string;
  tarih: string;
  meta?: {
    seviye?: string;
    kategori?: string;
    notlar?: string;
  };
}

/**
 * FNV-1a 32-bit Hash Algoritması
 */
export function fnv1aHash(input: string): number {
  let hash = 0x811c9dc5;
  const fnvPrime = 0x01000193;

  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i);
    hash = (hash * fnvPrime) >>> 0;
  }

  return Math.abs(hash);
}

export function isDailyWordCandidate(entry: RawDictionaryEntry): boolean {
  const hasExamples = entry.examples && entry.examples.length > 0;
  const hasEtymology = entry.etymology && entry.etymology.trim().length > 0;
  return !!(hasExamples || hasEtymology);
}

export function selectDailyWord(
  entries: RawDictionaryEntry[],
  dateString?: string
): DailyWord | null {
  const candidates = entries.filter(isDailyWordCandidate);

  if (candidates.length === 0) {
    console.warn('⚠️ Uygun kelime adayı bulunamadı');
    return null;
  }

  const date = dateString || new Date().toISOString().split('T')[0];
  const hashValue = fnv1aHash(date);
  const selectedIndex = hashValue % candidates.length;
  const selected = candidates[selectedIndex];

  console.log(
    `🎯 Tarih: ${date} | Hash: ${hashValue} | Index: ${selectedIndex}/${candidates.length} | Kelime: ${selected.lemma}`
  );

  return {
    id: selected.id,
    kelime: selected.lemma,
    anlam: selected.translation,
    lehce: selected.dialect || 'Bilinmeyen',
    tarih: date,
    meta: {
      kategori: selected.etymology || 'Etimoloji bilinmiyor',
      notlar: selected.examples?.[0]?.text || 'Örnek cümle yok',
    },
  };
}

export function getTodayDateString(): string {
  return new Date().toISOString().split('T')[0];
}