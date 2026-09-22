/**
 * File: src/lib/translationGroup.ts
 * Generated: 2026-09-19
 * Layer: Helper
 */

'use client';

import type { DictionaryEntry, KaynakItem } from '@/types/dictionary';

export interface GroupedDictionaryEntry extends Omit<DictionaryEntry, 'group'> {
  group?: string;
  meaning?: string;
}

export interface TranslationGroup {
  harf: string;
  kelimeler: DictionaryEntry[];
}

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

function getSourceMeta(entry: any) {
  const sourceId = String(
    entry.meta?.source || entry.file || entry.sourceDictionaryId || entry.kaynak || 'Bilinmeyen Kaynak'
  );
  const title = String(
    entry.meta?.title || entry.title || entry.sözlük || entry.sozluk || entry.kaynak_sozluk || entry.kaynak || entry.dictionaryName || sourceId
  );
  const author = entry.meta?.author || entry.author || entry.yazar;
  const year = entry.meta?.year || entry.year || entry.yil;
  
  return { sourceId, title, author, year };
}

function getCanonicalKey(entry: any): string {
  const word = getDisplayWord(entry);
  const plain = getPlainDefinition(entry);

  let keyBase = word;

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

export function groupTranslations(entries: any[]): GroupedDictionaryEntry[] {
  const map = new Map<string, GroupedDictionaryEntry>();

  entries.forEach((entry) => {
    if (!entry) return;

    const displayWord = getDisplayWord(entry);
    const sourceMeta = getSourceMeta(entry);
    const groupKey = getCanonicalKey(entry);
    const basePlainDef = getPlainDefinition(entry);

    if (displayWord === '—' && basePlainDef === '—') return;

    // Farklı alt kaynaklardan veya tanımlardan gelen anlamları topluyoruz
    const meanings: string[] = [];
    const groups: string[] = [];

    if (Array.isArray(entry.kaynaklar) && entry.kaynaklar.length > 0) {
      entry.kaynaklar.forEach((k: any) => {
        meanings.push((k.tanim || k.meaning || basePlainDef).trim());
        groups.push(k.kaynak || k.title || sourceMeta.title);
      });
    } else if (Array.isArray(entry.definitions) && entry.definitions.length > 0) {
      entry.definitions.forEach((def: any) => {
        meanings.push((def.meaning || def.tanim || basePlainDef).trim());
        groups.push(sourceMeta.title);
      });
    } else {
      meanings.push(basePlainDef);
      groups.push(sourceMeta.title);
    }

    if (!map.has(groupKey)) {
      map.set(groupKey, {
        ...entry,
        id: entry.id || groupKey,
        word: displayWord,
        meaning: '',
        group: ''
      });
    }

    const mevcutGrup = map.get(groupKey)!;

    // Eğer önceki başlık Latin, ancak yeni gelen başlık Kiril ise başlığı güncelle
    if (!CYRILLIC_REGEX.test(mevcutGrup.word || '') && CYRILLIC_REGEX.test(displayWord)) {
      mevcutGrup.word = displayWord;
    }

    // Anlamları arayüz bileşeninin ayrıştıracağı ` ◊ ` ayracıyla birleştir
    meanings.forEach((m) => {
      if (m && m !== '—' && !mevcutGrup.meaning?.includes(m)) {
        mevcutGrup.meaning = mevcutGrup.meaning ? `${mevcutGrup.meaning} ◊ ${m}` : m;
      }
    });

    // Kaynak sözlük isimlerini virgülle birleştirerek tek bir grupta topla
    groups.forEach((g) => {
      const groupText = typeof g === 'string' ? g : '';
      if (groupText && groupText !== 'Bilinmeyen Kaynak' && !mevcutGrup.group?.includes(groupText)) {
        mevcutGrup.group = mevcutGrup.group ? `${mevcutGrup.group}, ${groupText}` : groupText;
      }
    });
  });

  return Array.from(map.values());
}

export function createTranslationGroups(entries: DictionaryEntry[]): TranslationGroup[] {
  const groups = new Map<string, DictionaryEntry[]>();

  entries.forEach((entry) => {
    const key = entry.word?.charAt(0).toUpperCase() || '?';
    if (!groups.has(key)) {
      groups.set(key, []);
    }
    groups.get(key)!.push(entry);
  });

  return Array.from(groups.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([harf, kelimeler]) => ({
      harf,
      kelimeler: kelimeler.sort((a, b) => (a.word || '').localeCompare(b.word || ''))
    }));
}

// Geriye dönük uyumluluk veya ham veri gösterimi için yardımcı formatlayıcı
export function formatKaynakDetay(kaynak: any): string {
  if (!kaynak) return 'Bilinmeyen Kaynak';

  const title = kaynak.title || kaynak.sözlük || kaynak.sozluk || kaynak.kaynak || kaynak.dictionaryName || kaynak.name || '';
  const author = kaynak.author || kaynak.yazar || '';
  const year = kaynak.year || kaynak.yil || '';
  const totalWords = kaynak.total_words || kaynak.totalWords || kaynak.kelimeSayisi;
  
  const formattedTotal = totalWords
    ? `${typeof totalWords === 'number' ? totalWords.toLocaleString('tr-TR') : totalWords} kelime`
    : '';

  const parts = [title, author, year, formattedTotal].filter(Boolean);
  return parts.length > 0 ? parts.join(' | ') : 'Bilinmeyen Kaynak';
}

export function extractDefinition(entry: GroupedDictionaryEntry | DictionaryEntry): string {
  return (entry as GroupedDictionaryEntry).meaning || entry.meaning || '—';
}

export function extractSource(entry: GroupedDictionaryEntry | DictionaryEntry): string {
  const g = (entry as GroupedDictionaryEntry).group;
  return typeof g === 'string' ? g : 'Bilinmeyen Kaynak';
}