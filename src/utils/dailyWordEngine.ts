import type { GununKelimesi, KelimeMeta } from '@/types/dictionary';

export interface RawDictionaryEntry {
  id: string;
  lemma: string;
  translation: string;
  dialect?: string;
  examples?: Array<{ text: string; translation: string }>;
  ornekCumle?: string;
  ornekler?: string[];   // ⭐ YENİ — birden fazla örnek
  /** Çevirili örnek çiftleri (SSOT senses.examples) — Gunun-Kelimesi-001 */
  ornekCiftleri?: Array<{ metin: string; ceviri?: string | null }>;
  /** Havuz kaynağı etiketi ('ssot' | 'abaze') */
  kaynak?: string;
  etymology?: string;
  [key: string]: any;
}

export type DailyWord = GununKelimesi;

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
  const hasOrnekCumle = entry.ornekCumle && entry.ornekCumle.trim().length > 0;
  const hasOrnekler = entry.ornekler && entry.ornekler.length > 0;
  const hasOrnekCiftleri = entry.ornekCiftleri && entry.ornekCiftleri.length > 0;
  const hasEtymology = entry.etymology && entry.etymology.trim().length > 0;
  const hasTranslation = entry.translation && entry.translation.trim().length > 0;
  return !!(hasExamples || hasOrnekCumle || hasOrnekler || hasOrnekCiftleri || hasEtymology || hasTranslation);
}

/** Örneği olan aday mı? (Günün kelimesi mümkünse örnekli gelir — Gunun-Kelimesi-001) */
function ornekliMi(entry: RawDictionaryEntry): boolean {
  return !!(
    (entry.ornekCiftleri && entry.ornekCiftleri.length > 0) ||
    (entry.ornekler && entry.ornekler.length > 0) ||
    (entry.examples && entry.examples.length > 0) ||
    (entry.ornekCumle && entry.ornekCumle.trim().length > 0)
  );
}

/**
 * Örnekli adayları öne alarak havuzu ikiye böler:
 * [örnekli adaylar, örneksiz adaylar]. Örnekli havuz boşsa örneksizler kullanılır.
 */
function bolAdaylar(entries: RawDictionaryEntry[]): [RawDictionaryEntry[], RawDictionaryEntry[]] {
  const ornekli: RawDictionaryEntry[] = [];
  const orneksiz: RawDictionaryEntry[] = [];
  for (const e of entries) {
    if (!isDailyWordCandidate(e)) continue;
    (ornekliMi(e) ? ornekli : orneksiz).push(e);
  }
  return [ornekli, orneksiz];
}

/** Adayın örneklerini dize listesi olarak toplar (öncelik: ornekCiftleri > ornekler > ornekCumle > examples) */
function ornekleriTopla(entry: RawDictionaryEntry): string[] {
  if (entry.ornekCiftleri && entry.ornekCiftleri.length > 0) {
    return entry.ornekCiftleri.map((c) => c.metin);
  }
  if (entry.ornekler && entry.ornekler.length > 0) return entry.ornekler;
  if (entry.ornekCumle) return [entry.ornekCumle];
  if (entry.examples && entry.examples.length > 0) return entry.examples.map((ex) => ex.text);
  return [];
}

export function selectDailyWord(
  entries: RawDictionaryEntry[],
  dateString?: string
): DailyWord | null {
  // Gunun-Kelimesi-001: örnekli adaylar önceliklidir
  const [ornekliAdaylar, orneksizAdaylar] = bolAdaylar(entries);
  const candidates = ornekliAdaylar.length > 0 ? ornekliAdaylar : orneksizAdaylar;

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

  // ⭐ Örnekleri topla (öncelik: ornekCiftleri > ornekler > ornekCumle > examples)
  const ornekler = ornekleriTopla(selected);

  return {
    id: selected.id,
    kelime: selected.lemma,
    anlam: selected.translation,
    lehce: selected.dialect || 'Bilinmeyen',
    tarih: date,
    ornekler: ornekler.length > 0 ? ornekler : undefined,   // ⭐ EKLE
    ornekCiftleri: selected.ornekCiftleri,
    meta: {
      kategori: selected.etymology || 'Etimoloji bilinmiyor',
      notlar: ornekler[0] || 'Örnek cümle yok',
    },
  };
}

/**
 * Belirli bir tarih için birden fazla kelime seçer.
 */
export function selectMultipleDailyWords(
  entries: RawDictionaryEntry[],
  count: number = 5,
  dateString?: string
): DailyWord[] {
  // Gunun-Kelimesi-001: önce örnekli havuzdan seçilir, eksik kalan örneksizlerden tamamlanır
  const [ornekliAdaylar, orneksizAdaylar] = bolAdaylar(entries);
  const havuzlar = [ornekliAdaylar, orneksizAdaylar].filter((h) => h.length > 0);

  if (havuzlar.length === 0) return [];

  const date = dateString || new Date().toISOString().split('T')[0];
  const secilenler: DailyWord[] = [];
  const kullanilanIdler = new Set<string>();

  for (const havuz of havuzlar) {
    if (secilenler.length >= count) break;

    for (let i = 0; i < count && secilenler.length < count; i++) {
      const hash = fnv1aHash(`${date}-${secilenler.length}-${i}`);
      let index = hash % havuz.length;

      let deneme = 0;
      while (kullanilanIdler.has(havuz[index].id) && deneme < havuz.length) {
        index = (index + 1) % havuz.length;
        deneme++;
      }

      const selected = havuz[index];
      if (kullanilanIdler.has(selected.id)) break;
      kullanilanIdler.add(selected.id);

      const ornekler = ornekleriTopla(selected);

      secilenler.push({
        id: selected.id,
        kelime: selected.lemma,
        anlam: selected.translation,
        lehce: selected.dialect || 'Bilinmeyen',
        tarih: date,
        ornekler: ornekler.length > 0 ? ornekler : undefined,
        ornekCiftleri: selected.ornekCiftleri,
        meta: {
          kategori: selected.etymology || 'Etimoloji bilinmiyor',
          notlar: ornekler[0] || 'Örnek cümle yok',
        },
      });
    }
  }

  return secilenler;
}

export function getTodayDateString(): string {
  return new Date().toISOString().split('T')[0];
}