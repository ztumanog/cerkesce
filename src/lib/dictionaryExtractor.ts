const CYRILLIC_REGEX = /[\u0400-\u04FF\u04CF]/i;

export interface ExampleItem {
  sentence?: string;
  translation?: string;
  [key: string]: any;
}

export interface DefinitionItem {
  meaning?: string;
  tanim?: string;
  full_definition_in_html?: string;
  examples?: ExampleItem[] | null;
  [key: string]: any;
}

export interface WordEntry {
  spelling?: string;
  word?: string;
  kelime?: string;
  headword?: string;

  definition?: string;
  anlam?: string;
  meaning?: string;
  tanim?: string;

  full_definition_in_html?: string;
  definitions?: DefinitionItem[];

  file?: string;
  sourceDictionaryId?: string;
  meta?: {
    source?: string;
    title?: string;
    author?: string;
    year?: number | string;
    [key: string]: any;
  };
  [key: string]: any;
}

export interface NormalizedEntry {
  displayWord: string;
  plainDefinition: string;
  htmlDefinition?: string;
  source: string;
  sourceTitle: string;
  author?: string;
  year?: number | string;
  canonicalKey: string;
  raw: WordEntry;
}

/**
 * 1. Ana Kelime Çıkarıcı (displayWord)
 */
export function extractHeadword(entry: WordEntry, lemma?: string): string {
  if (!entry) return lemma || '—';

  let headword = (entry.spelling || entry.word || entry.kelime || entry.headword || lemma || '').trim();

  if (!headword && Array.isArray(entry.definitions) && entry.definitions.length > 0) {
    headword = (entry.definitions[0]?.tanim || entry.definitions[0]?.meaning || '').trim();
  }

  if (!headword && entry.full_definition_in_html) {
    const stripped = entry.full_definition_in_html.replace(/<[^>]*>/g, ' ').trim();
    const match = stripped.match(/[\u0400-\u04FF\u04cfIıӀ]+/i);
    if (match) headword = match[0];
  }

  return headword || '—';
}

/**
 * 2. Düz Metin Tanım Çıkarıcı (plainDefinition)
 * Öncelik: 1) definitions[0].meaning/tanim  2) plain fields  3) strip html
 */
export function extractDefinition(entry: WordEntry): string {
  if (!entry) return '—';

  const def0 = Array.isArray(entry.definitions) ? entry.definitions[0] : undefined;

  let plain = (
    def0?.meaning ||
    def0?.tanim ||
    entry.definition ||
    entry.anlam ||
    entry.meaning ||
    entry.tanim ||
    ''
  ).trim();

  if (!plain && entry.full_definition_in_html) {
    plain = entry.full_definition_in_html
      .replace(/<[^>]*>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  return plain || '—';
}

/**
 * 3. Zengin HTML Tanım Çıkarıcı (htmlDefinition)
 */
export function extractHtmlDefinition(entry: WordEntry): string | undefined {
  if (!entry) return undefined;
  const def0 = Array.isArray(entry.definitions) ? entry.definitions[0] : undefined;

  const html = entry.full_definition_in_html || def0?.full_definition_in_html;
  return html && html.trim() ? html.trim() : undefined;
}

/**
 * 4. Kaynak Bilgisi Çıkarıcı (source)
 */
export function extractSource(entry: WordEntry, fileTitle?: string): {
  sourceId: string;
  title: string;
  author?: string;
  year?: number | string;
} {
  if (!entry) return { sourceId: 'unknown', title: 'Bilinmeyen Kaynak' };

  const sourceId =
    entry.meta?.source ||
    entry.file ||
    entry.sourceDictionaryId ||
    entry.kaynak ||
    'unknown';

  const title =
    entry.meta?.title ||
    entry.title ||
    fileTitle ||
    entry.kaynak_sozluk ||
    entry.kaynak ||
    sourceId;

  const author = entry.meta?.author || entry.author || entry.yazar;
  const year = entry.meta?.year || entry.year || entry.yil;

  return {
    sourceId: String(sourceId),
    title: String(title),
    author,
    year,
  };
}

/**
 * 5. Çapraz Kavram Anahtarı Çıkarıcı (canonicalKey)
 */
export function extractCanonicalKey(entry: WordEntry, lemma?: string): string {
  const headword = extractHeadword(entry, lemma);
  const plainDef = extractDefinition(entry);

  let keyBase = headword;

  if (!CYRILLIC_REGEX.test(headword) && CYRILLIC_REGEX.test(plainDef)) {
    const clean = plainDef.replace(/<[^>]*>/g, '');
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
    .trim() || headword.toLowerCase().trim();
}

/**
 * Nesneyi Tam Normalized Yapıya Dönüştürür
 */
export function normalizeEntry(entry: WordEntry, lemma?: string, fileTitle?: string): NormalizedEntry {
  const headword = extractHeadword(entry, lemma);
  const plainDef = extractDefinition(entry);
  const htmlDef = extractHtmlDefinition(entry);
  const sourceInfo = extractSource(entry, fileTitle);
  const canonicalKey = extractCanonicalKey(entry, lemma);

  return {
    displayWord: headword,
    plainDefinition: plainDef,
    htmlDefinition: htmlDef,
    source: sourceInfo.sourceId,
    sourceTitle: sourceInfo.title,
    author: sourceInfo.author,
    year: sourceInfo.year,
    canonicalKey,
    raw: entry,
  };
}
