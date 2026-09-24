/**
 * @file src/lib/normalizers/sourceContentNormalizer.ts
 * @description ADR-P4-005: Ham kaynak verisini SourceContent[]'e dönüştürür.
 *
 * Akış: ham veri → topla → temizleHtml() → satırlara böl → buildSections() → SourceContent
 *
 * Bağımlılıklar:
 *   - temizleHtml           → @/utils/cleanHtml
 *   - kaynagiDuzenle        → @/utils/helpers
 *   - resolveSourceMetadata → ./sourceMetadataResolver (sourceFile odaklı)
 *
 * ❌ YASAK: @/loader/* (fs/path içerir, client'a sızar)
 */

import type {
  DictionaryEntry,
  SourceContent,
  SourceSection,
} from '@/types/dictionary';
import { temizleHtml } from '@/utils/cleanHtml';
import { kaynagiDuzenle } from '@/utils/helpers';
import { resolveSourceMetadata } from './sourceMetadataResolver';

// ============================================================
// Lehçe kodunu Türkçeleştir
// ============================================================
function cleanDialect(dialect: unknown): string {
  if (typeof dialect !== 'string') return '';

  const raw = dialect.trim().toLowerCase();

  const DIALECT_MAP: Record<string, string> = {
    western: 'Batı',
    bati: 'Batı',
    batı: 'Batı',
    west: 'Batı',
    ady: 'Adıge',
    adige: 'Adıge',
    adıge: 'Adıge',
    eastern: 'Doğu',
    dogu: 'Doğu',
    doğu: 'Doğu',
    east: 'Doğu',
    kbd: 'Kabardey',
    kabardey: 'Kabardey',
    kabardeyce: 'Kabardey',
  };

  return DIALECT_MAP[raw] || dialect;
}

// ============================================================
// Dil kodunu temizle: "28.tur" → "tr"
// ============================================================
function cleanLangCode(lang: unknown): string {
  if (typeof lang !== 'string') return '';

  const raw = lang
    .toLowerCase()
    .replace(/^\d+\./, '')
    .replace(/[^a-z]/g, '')
    .trim();

  const LANG_MAP: Record<string, string> = {
    tr: 'tr',
    tu: 'tr',
    tur: 'tr',
    turkish: 'tr',
    ady: 'ady',
    adige: 'ady',
    adıge: 'ady',
    circassian: 'ady',
    kbd: 'kbd',
    kabardey: 'kbd',
    ru: 'ru',
    rus: 'ru',
    russian: 'ru',
    en: 'en',
    eng: 'en',
    english: 'en',
    ar: 'ar',
    ara: 'ar',
    arabic: 'ar',
    de: 'de',
    ger: 'de',
    deu: 'de',
    fr: 'fr',
    fra: 'fr',
    fre: 'fr',
  };

  return LANG_MAP[raw] || raw;
}

// ============================================================
// buildSections — Ham metni hiyerarşik bölümlere ayırır
// ============================================================
// ============================================================
// splitMarkers - text icindeki ~, ♦, а), б), в) isaretlerini ayirir
// ============================================================
function splitMarkers(txt: string): SourceSection[] {
  const result: SourceSection[] = [];

  // а), б), в), г), д), е), ж), з), и), к) - Rusca harf isaretleri
  const letterMarkers = ['а', 'б', 'в', 'г', 'д', 'е', 'ж', 'з', 'и', 'к'];

  // Once ~ ile ayir
  const tildeParts = txt.split('~');
  if (tildeParts.length > 1) {
    // Ilk parca (tilde oncesi) → parent text
    if (tildeParts[0].trim()) {
      // а), б) varsa onlari da ayir
      const subParts = splitLetterMarkers(tildeParts[0].trim(), letterMarkers);
      result.push(...subParts);
    }
    // Sonraki parcalar → related
    for (let i = 1; i < tildeParts.length; i++) {
      const part = tildeParts[i].trim();
      if (part) {
        result.push({
          type: 'related',
          label: '~',
          text: part,
        });
      }
    }
  } else {
    // ~ yoksa, а), б) ayir
    result.push(...splitLetterMarkers(txt, letterMarkers));
  }

  return result;
}

// а), б), в) ayir
function splitLetterMarkers(txt: string, markers: string[]): SourceSection[] {
  const result: SourceSection[] = [];
  const pattern = new RegExp(`(${markers.join('|')})\\)`, 'g');
  const parts = txt.split(pattern);

  if (parts.length === 1) {
    return [{ type: 'plain', label: '', text: txt }];
  }

  let currentLabel = '';
  let currentText = '';

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    if (markers.includes(part)) {
      // Marker bulundu
      if (currentText.trim()) {
        result.push({
          type: 'example',
          label: currentLabel ? `${currentLabel})` : '',
          text: currentText.trim(),
        });
      }
      currentLabel = part;
      currentText = '';
    } else {
      currentText += part;
    }
  }

  if (currentText.trim()) {
    result.push({
      type: 'example',
      label: currentLabel ? `${currentLabel})` : '',
      text: currentText.trim(),
    });
  }

  return result;
}

function buildSections(text: string): SourceSection[] {
  const sections: SourceSection[] = [];
  const lines = text
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean);

  for (const line of lines) {
    // ---- 1) ROMAN: "I", "II", "III" (buyuk harf, tek basina) ----
    if (/^[IVX]+$/.test(line)) {
      sections.push({
        type: 'roman',
        label: line,
        text: '',
      });
      continue;
    }

    // ---- 2) ARABIC: "1.", "2)", "3." ----
    const arabicMatch = line.match(/^(\d+)[\.\)]\s*(.*)$/);
    if (arabicMatch) {
      const txt = arabicMatch[2].trim();

      // ~ varsa ayir
      if (txt.includes('~')) {
        const parts = txt.split('~');
        if (parts[0].trim()) {
          sections.push({
            type: 'arabic',
            label: `${arabicMatch[1]}.`,
            text: parts[0].trim(),
          });
        }
        for (let i = 1; i < parts.length; i++) {
          if (parts[i].trim()) {
            sections.push({
              type: 'related',
              label: '~',
              text: parts[i].trim(),
            });
          }
        }
        continue;
      }

      // ♦ varsa ayir
      if (txt.includes('♦')) {
        const parts = txt.split('♦');
        if (parts[0].trim()) {
          sections.push({
            type: 'arabic',
            label: `${arabicMatch[1]}.`,
            text: parts[0].trim(),
          });
        }
        for (let i = 1; i < parts.length; i++) {
          if (parts[i].trim()) {
            sections.push({
              type: 'example',
              label: '♦',
              text: parts[i].trim(),
            });
          }
        }
        continue;
      }

      sections.push({
        type: 'arabic',
        label: `${arabicMatch[1]}.`,
        text: txt,
      });
      continue;
    }

    // ---- 3) EXAMPLE: "◊" veya "♦" ----
    if (line.startsWith('◊') || line.startsWith('♦')) {
      sections.push({
        type: 'example',
        label: line.charAt(0),
        text: line.slice(1).trim(),
      });
      continue;
    }

    // ---- 4) RELATED: "/" veya "~" ----
    if (line.startsWith('/') || line.startsWith('~')) {
      sections.push({
        type: 'related',
        label: line.charAt(0),
        text: line.slice(1).trim(),
      });
      continue;
    }

    // ---- 5) DASH: "-" ----
    if (line.startsWith('-') && !line.startsWith('--')) {
      sections.push({
        type: 'example',
        label: '-',
        text: line.slice(1).trim(),
      });
      continue;
    }

    // ---- 6) PLAIN ----
    sections.push({
      type: 'plain',
      label: '',
      text: line,
    });
  }

  return sections;
}

function flattenSections(sections: SourceSection[]): string[] {
  const result: string[] = [];
  for (const s of sections) {
    if (s.text) result.push(s.text);
    if (s.children && s.children.length > 0) {
      result.push(...flattenSections(s.children));
    }
  }
  return result;
}

// ============================================================
// Ana fonksiyon
// ============================================================
export function normalizeToSourceContents(
  entry: DictionaryEntry | null
): SourceContent[] {
  if (!entry) return [];

  const raw = entry as unknown as Record<string, unknown>;
  const sourceList: SourceContent[] = [];

  // ============================================================
  // 1. DURUM: 'kaynaklar' dizisi
  // ============================================================
  if (Array.isArray(raw.kaynaklar) && raw.kaynaklar.length > 0) {
    raw.kaynaklar.forEach((k: unknown, idx: number) => {
      if (typeof k !== 'object' || k === null) return;
      const item = k as Record<string, unknown>;

      // ⭐ sourceFile öncelikli — kesin eşleşme
      const sourceKey =
        (item.sourceFile as string) ||
        (item.file as string) ||
        (item.filename as string) ||
        (item.source as string) ||
        '';

      // ⭐ Metadata (sourceFile → dictionaries.json)
      const meta = resolveSourceMetadata(sourceKey);

      // ⭐ Öncelik sırası: meta (dictionaries.json) → item (fallback)
      const sourceLanguage =
        meta.sourceLanguage ||
        cleanLangCode(item.sourceLanguage) ||
        cleanLangCode(item.kaynakDil) ||
        '';

      const targetLanguage =
        meta.targetLanguage ||
        cleanLangCode(item.targetLanguage) ||
        cleanLangCode(item.hedefDil) ||
        '';

      const authorYear = meta.author
        ? `${meta.author}${meta.year ? ` (${meta.year})` : ''}`
        : '';

      // ⭐ Öncelik: shortLabel > displayName > sözlük > title > authorYear > sourceKey
      const sourceTitle = kaynagiDuzenle(
        meta.shortLabel ||
          meta.displayName ||
          (item.sözlük as string) ||
          meta.title ||
          authorYear ||
          sourceKey ||
          `Kaynak #${idx + 1}`
      );

      const sourceAuthor =
        (item.yazar as string) ||
        (item.author as string) ||
        meta.author ||
        undefined;

      const sourceYear =
        (item.yil as string | number | undefined) ??
        (item.year as string | number | undefined) ??
        (meta.year as string | number | undefined);

      const sourceDialect = cleanDialect(meta.dialect);

      // --- Ham metni topla ---
      const rawParts: string[] = [];
      for (const field of [
        item.anlam,
        item.meaning,
        item.definition,
        item.tanim,
        item.full_definition_in_html,
        item.fullDefinitionInHtml,
      ]) {
        if (typeof field === 'string' && field.trim()) {
          rawParts.push(field);
        }
      }

      if (Array.isArray(item.meanings)) {
        item.meanings.forEach((m) => {
          if (typeof m === 'string' && m.trim()) rawParts.push(m);
        });
      }

      const cleanedText = temizleHtml(rawParts.join('\n'));
     console.log('CLEANED TEXT:', JSON.stringify(cleanedText));
      const sections = buildSections(cleanedText);
      const flat = flattenSections(sections);

      sourceList.push({
        sourceId: `${meta.id || sourceKey || 'src'}-${idx}`,
        sourceName: sourceTitle,
        title: sourceTitle,
        author: sourceAuthor,
        year: sourceYear,
        sourceLanguage,
        targetLanguage,
        dialect: sourceDialect,
        meanings: flat.length > 0 ? flat : ['Tanım belirtilmemiş'],
        sections: sections.length > 0 ? sections : undefined,
        examples: [],
        notes: undefined,
      });
    });
  }

  // ============================================================
  // 2. DURUM: Tekil kayıt (Fallback)
  // ============================================================
  if (sourceList.length === 0) {
    const rawFallback =
      (entry.meaning as string) ||
      (raw.anlam as string) ||
      (raw.full_definition_in_html as string) ||
      '';

    const cleanedFallback = temizleHtml(rawFallback);
    const sections = buildSections(cleanedFallback);
    const flat = flattenSections(sections);

    const defaultSourceTitle = kaynagiDuzenle(
      (raw.group as string) ||
        (raw.dictionaryName as string) ||
        (raw.source as string) ||
        'Genel Sözlük'
    );

    sourceList.push({
      sourceId: 'default-0',
      sourceName: defaultSourceTitle,
      title: defaultSourceTitle,
      author:
        temizleHtml((raw.author || raw.yazar || '') as string) || undefined,
      year: (raw.year || raw.yil) as string | number | undefined,
      sourceLanguage: 'TR',
      targetLanguage: 'ADY',
      dialect: temizleHtml((raw.dialect || raw.lehce || '') as string),
      meanings: flat.length > 0 ? flat : ['Tanım bulunamadı'],
      sections: sections.length > 0 ? sections : undefined,
      examples: [],
      notes: undefined,
    });
  }

  return sourceList;
}


