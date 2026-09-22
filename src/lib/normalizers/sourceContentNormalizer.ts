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
    'western': 'Batı',
    'bati': 'Batı',
    'batı': 'Batı',
    'west': 'Batı',
    'ady': 'Adıge',
    'adige': 'Adıge',
    'adıge': 'Adıge',
    'eastern': 'Doğu',
    'dogu': 'Doğu',
    'doğu': 'Doğu',
    'east': 'Doğu',
    'kbd': 'Kabardey',
    'kabardey': 'Kabardey',
    'kabardeyce': 'Kabardey',
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
    .replace(/^\d+\./, '')       // "31." önekini sil
    .replace(/[^a-z]/g, '')      // sadece harfler
    .trim();

  // ⭐ Dil kodu → ISO 639-1 (2 harf) eşleme
  const LANG_MAP: Record<string, string> = {
    'tr': 'tr', 'tu': 'tr', 'tur': 'tr', 'turkish': 'tr',
    'ady': 'ady', 'adige': 'ady', 'adıge': 'ady', 'circassian': 'ady',
    'kbd': 'kbd', 'kabardey': 'kbd',
    'ru': 'ru', 'rus': 'ru', 'russian': 'ru',
    'en': 'en', 'eng': 'en', 'english': 'en',
    'ar': 'ar', 'ara': 'ar', 'arabic': 'ar',
    'de': 'de', 'ger': 'de', 'deu': 'de',
    'fr': 'fr', 'fra': 'fr', 'fre': 'fr',
  };

  return LANG_MAP[raw] || raw;
}

// ============================================================
// buildSections — Ham metni hiyerarşik bölümlere ayırır
// ============================================================
function buildSections(text: string): SourceSection[] {
  const sections: SourceSection[] = [];
  const lines = text
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean);

  let currentRoman: SourceSection | null = null;
  let currentArabic: SourceSection | null = null;

  for (const line of lines) {
    if (/^[IVX]+$/i.test(line)) {
      currentRoman = {
        type: 'roman',
        label: line,
        text: '',
        children: [],
      };
      sections.push(currentRoman);
      currentArabic = null;
      continue;
    }

    const arabicMatch = line.match(/^(\d+)\.\s*(.*)$/);
    if (arabicMatch) {
      const text = arabicMatch[2].trim();
      currentArabic = {
        type: 'arabic',
        label: `${arabicMatch[1]}.`,
        text,
        children: [],
      };
      if (currentRoman) {
        currentRoman.children!.push(currentArabic);
      } else {
        sections.push(currentArabic);
      }
      continue;
    }

    if (line.startsWith('◊')) {
      const ex: SourceSection = {
        type: 'example',
        label: '◊',
        text: line.slice(1).trim(),
      };
      if (currentArabic) currentArabic.children!.push(ex);
      else if (currentRoman) currentRoman.children!.push(ex);
      else sections.push(ex);
      continue;
    }

    if (line.startsWith('/')) {
      const rel: SourceSection = {
        type: 'related',
        label: '/',
        text: line.slice(1).trim(),
      };
      if (currentArabic) currentArabic.children!.push(rel);
      else if (currentRoman) currentRoman.children!.push(rel);
      else sections.push(rel);
      continue;
    }

    if (line.startsWith('-') && !line.startsWith('--')) {
      const sfx: SourceSection = {
        type: 'suffix',
        label: '-',
        text: line.slice(1).trim(),
      };
      if (currentArabic) currentArabic.children!.push(sfx);
      else if (currentRoman) currentRoman.children!.push(sfx);
      else sections.push(sfx);
      continue;
    }

    const firstChar = line.charAt(0);
    const isUpper =
      firstChar === firstChar.toUpperCase() &&
      firstChar !== firstChar.toLowerCase() &&
      /[A-ZА-ЯЁӀ]/.test(firstChar);

    if (isUpper && line.length > 3) {
      const rel: SourceSection = {
        type: 'related',
        label: '',
        text: line,
      };
      if (currentArabic) currentArabic.children!.push(rel);
      else if (currentRoman) currentRoman.children!.push(rel);
      else sections.push(rel);
      continue;
    }

    const plain: SourceSection = {
      type: 'plain',
      label: '',
      text: line,
    };
    if (currentArabic) currentArabic.children!.push(plain);
    else if (currentRoman) currentRoman.children!.push(plain);
    else sections.push(plain);
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
  meta.sourceLanguage ||                 // ← "tr" (ISO)
  cleanLangCode(item.sourceLanguage) ||  // ← fallback: "tur" → "tr"
  cleanLangCode(item.kaynakDil) ||
  '';

const targetLanguage =
  meta.targetLanguage ||                 // ← "ady" (ISO)
  cleanLangCode(item.targetLanguage) ||  // ← fallback
  cleanLangCode(item.hedefDil) ||
  '';

 const authorYear = meta.author
  ? `${meta.author}${meta.year ? ` (${meta.year})` : ''}`
  : '';

const sourceTitle = kaynagiDuzenle(
  authorYear ||                  // ← "İbrahim Alhas Abaze (2005)"
  meta.shortLabel ||
  (item.sözlük as string) ||
  meta.title ||
  sourceKey ||
  `Kaynak #${idx + 1}`
);

      const sourceAuthor =
        ((item.yazar as string) ||
          (item.author as string) ||
          meta.author) ||
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

