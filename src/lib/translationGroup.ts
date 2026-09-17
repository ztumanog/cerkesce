'use client';

import type { 
  GroupedDictionaryEntry, 
  KaynakDetay, 
  KelimeItem,
  DictionaryEntry,
  KaynakItem
} from '@/types/dictionary';

export interface TranslationGroup {
  harf: string;
  kelimeler: GroupedDictionaryEntry[];
}

export type ExtendedKaynakItem = KaynakItem & {
  sourceDictionaryId?: string;
  source?: string;
  sözlük?: string;
  sozluk?: string;
  id: string;
  word: string;
  meaning: string;
  dictionaryId: string;
  language?: string;
  targetLanguage?: string;
};

export interface DictionaryRawItem {
  dictionaryName?: string;  // ← ekle
  // ... mevcut alanlar
}

export type ExtendedGroupedDictionaryEntry = GroupedDictionaryEntry & {
  kaynaklar?: ExtendedKaynakItem[];
  sourceDictionaryId?: string; 
  source?: string; 
  kaynak?: string; 
};

const CYRILLIC_REGEX = /[\u0400-\u04FF\u04CF]/i;

// --- NORMALİZASYON YARDIMCI FONKSİYONLARI ---

function getDisplayWord(entry: any): string {
  if (!entry) return '—';
  let word = String(entry.spelling || entry.word || entry.kelime || entry.headword || '').trim();
  
  if (!word && Array.isArray(entry.definitions) && entry.definitions.length > 0) {
    word = String(entry.definitions[0]?.tanim || entry.definitions[0]?.meaning || '').trim();
  }
  
  if (!word && entry.full_definition_in_html) {
    const stripped = String(entry.full_definition_in_html).replace(/<[^>]*>/g, ' ').trim();
    const match = stripped.match(/[\u0400-\u04FF\u04cfIıӀ]+/i);
    if (match) word = match[0];
  }
  
  return word || '—';
}

function getPlainDefinition(entry: any): string {
  if (!entry) return '—';
  const def0 = Array.isArray(entry.definitions) && entry.definitions.length > 0 ? entry.definitions[0] : null;
  
  // Öncelik: 1) definitions[0].meaning/tanim 2) Düz string alanları 3) HTML tag temizleme
  let plain = String(
    def0?.meaning ||
    def0?.tanim ||
    entry.definition ||
    entry.anlam ||
    entry.meaning ||
    entry.tanim ||
    ''
  ).trim();

  if (!plain && entry.full_definition_in_html) {
    plain = String(entry.full_definition_in_html)
      .replace(/<[^>]*>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }
  return plain || '—';
}

function getHtmlDefinition(entry: any): string | undefined {
  if (!entry) return undefined;
  const def0 = Array.isArray(entry.definitions) && entry.definitions.length > 0 ? entry.definitions[0] : null;
  const html = entry.full_definition_in_html || def0?.full_definition_in_html;
  return html && String(html).trim() ? String(html).trim() : undefined;
}

function getSourceMeta(entry: any) {
  const sourceId = String(
    entry.meta?.source ||
    entry.file ||
    entry.sourceDictionaryId ||
    entry.kaynak ||
    'Bilinmeyen Kaynak'
  );
  const title = String(
    entry.meta?.title ||
    entry.title ||
    entry.sözlük ||
    entry.sozluk ||
    entry.kaynak_sozluk ||
    entry.kaynak ||
    entry.dictionaryName ||
    sourceId
  );
  const author = entry.meta?.author || entry.author || entry.yazar;
  const year = entry.meta?.year || entry.year || entry.yil;
  return { sourceId, title, author, year };
}

function getCanonicalKey(entry: any): string {
  const word = getDisplayWord(entry);
  const plain = getPlainDefinition(entry);

  let keyBase = word;

  // Başlık Latin ("su") fakat tanım Kiril ("ПСЫ") barındırıyorsa Kiril terimi kök anahtar al
  if (!CYRILLIC_REGEX.test(word) && CYRILLIC_REGEX.test(plain)) {
    const clean = plain.replace(/<[^>]*>/g, '');
    const match = clean.match(/[\u0400-\u04FF\u04cfIıӀ]+/gi);
    if (match && match.length > 0) {
      keyBase = match.join(' ');
    }
  }

  return keyBase
    .toLowerCase()
    .replace(/^[\d\.\)\s]+/, '')
    .replace(/\(.*?\)|\[.*?\]/g, '')
    .replace(/[.,;:/\\~!@#$%^&*()_+=<>?]/g, '')
    .trim() || word.toLowerCase().trim();
}

// --- GRUPLAMA FONKSİYONLARI ---

export function groupTranslations(
  entries: DictionaryEntry[]
): GroupedDictionaryEntry[] {
  const map = new Map<string, ExtendedGroupedDictionaryEntry>();

  entries.forEach((entry: any) => {
    if (!entry) return;

    const displayWord = getDisplayWord(entry);
    const plainDef = getPlainDefinition(entry);
    const htmlDef = getHtmlDefinition(entry);
    const sourceMeta = getSourceMeta(entry);
    const groupKey = getCanonicalKey(entry);

    if (displayWord === '—' && plainDef === '—') return;

    const yeniKaynak: ExtendedKaynakItem = {
      id: entry.id,
      word: entry.word,
      dictionaryId: entry.dictionaryId,
      tanim: plainDef,
      meaning: plainDef,
      full_definition_in_html: htmlDef,
      file: sourceMeta.sourceId,
      sourceDictionaryId: sourceMeta.sourceId,
      kaynak: sourceMeta.title,
      kaynak_sozluk: sourceMeta.title,
      title: sourceMeta.title,
      author: sourceMeta.author,
      year: sourceMeta.year,
    };

    const eklenecekKaynaklar: ExtendedKaynakItem[] = [];

    if (Array.isArray(entry.kaynaklar) && entry.kaynaklar.length > 0) {
      eklenecekKaynaklar.push(...entry.kaynaklar);
    } else if (Array.isArray(entry.definitions) && entry.definitions.length > 1) {
      entry.definitions.forEach((def: any) => {
        const defPlain = (def.meaning || def.tanim || plainDef).trim();
        const defHtml = def.full_definition_in_html || htmlDef;
        eklenecekKaynaklar.push({
          id: entry.id,
          word: entry.word,
          dictionaryId: entry.dictionaryId,
          tanim: defPlain,
          meaning: defPlain,
          full_definition_in_html: defHtml,
          file: sourceMeta.sourceId,
          sourceDictionaryId: sourceMeta.sourceId,
          kaynak: sourceMeta.title,
          kaynak_sozluk: sourceMeta.title,
          title: sourceMeta.title,
          author: sourceMeta.author,
          year: sourceMeta.year,
        });
      });
    } else {
      eklenecekKaynaklar.push(yeniKaynak);
    }

    if (!map.has(groupKey)) {
      map.set(groupKey, {
        kelime: displayWord,
        anlam: plainDef,
        meaning: plainDef,
        tanim: plainDef,
        full_definition_in_html: htmlDef,
        sourceDictionaryId: sourceMeta.sourceId,
        source: sourceMeta.sourceId,
        kaynak: sourceMeta.title,
        kaynaklar: [...eklenecekKaynaklar],
      });
    } else {
      const mevcutGrup = map.get(groupKey)!;
      if (!mevcutGrup.kaynaklar) {
        mevcutGrup.kaynaklar = [];
      }

      // Mevcut grubun başlığı Kiril değilse ancak yeni gelen veri Kiril ise başlığı güncelle
      if (!CYRILLIC_REGEX.test(mevcutGrup.kelime || '') && CYRILLIC_REGEX.test(displayWord)) {
        mevcutGrup.kelime = displayWord;
      }

      eklenecekKaynaklar.forEach((k) => {
        const isDuplicate = mevcutGrup.kaynaklar!.some(
          (m) =>
            (m.title === k.title && m.tanim === k.tanim) ||
            (m.kaynak === k.kaynak && m.tanim === k.tanim) ||
            (m.file && k.file && m.file === k.file && m.tanim === k.tanim)
        );

        if (!isDuplicate) {
          mevcutGrup.kaynaklar!.push(k);
        }
      });
    }
  });

  return Array.from(map.values()) as GroupedDictionaryEntry[];
}

export function createTranslationGroups(
  entries: GroupedDictionaryEntry[]
): TranslationGroup[] {
  const groups = new Map<string, GroupedDictionaryEntry[]>();

  entries.forEach((entry) => {
    const key = entry.kelime?.charAt(0).toUpperCase() || '?';
    if (!groups.has(key)) {
      groups.set(key, []);
    }
    groups.get(key)!.push(entry);
  });

  return Array.from(groups.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([harf, kelimeler]) => ({
      harf,
      kelimeler: kelimeler.sort((a, b) =>
        (a.kelime || '').localeCompare(b.kelime || '')
      ),
    }));
}

export function formatKaynakDetay(kaynak: KaynakDetay | ExtendedKaynakItem | undefined): string {
  if (!kaynak) return 'Bilinmeyen Kaynak';

  const k = kaynak as any;
  const title =
    k.title ||
    k.sözlük ||
    k.sozluk ||
    k.kaynak ||
    k.dictionaryName ||
    k.name ||
    '';

  const author = k.author || k.yazar || '';
  const year = k.year || k.yil || '';

  const totalWords = k.total_words || k.totalWords || k.kelimeSayisi;
  const formattedTotal = totalWords
    ? `${typeof totalWords === 'number' ? totalWords.toLocaleString('tr-TR') : totalWords} kelime`
    : '';

  const parts = [title, author, year, formattedTotal].filter(Boolean);
  return parts.length > 0 ? parts.join(' | ') : 'Bilinmeyen Kaynak';
}

export function extractDefinition(entry: GroupedDictionaryEntry): string {
  return getPlainDefinition(entry);
}

export function extractSource(entry: GroupedDictionaryEntry): string {
  return getSourceMeta(entry).title;
}