/**
 * DictionaryProvider - Sozluk Veri Tabani & Meta Indeks Entegrasyonu
 * ADR-0056: Public Data Directory Path Binding (public/data/dictionaries.json)
 * ADR-ROOT-001: Canonical Lexeme & POS Resolution
 */
import dictionariesMeta from '../../../public/data/dictionaries.json';
import { normalizePalochka } from './utils/textUtils';
import { normalizePartOfSpeech } from '../grammar';
import { Lexeme, resolveLexemeTurkishMeaning } from '../linguistic/Lexeme';

export interface DictionaryEntry {
  lemma: string;
  root: string;
  pos: string;
  meaningTr: string;
  variations?: string[];
  sourceFile?: string;
  sourceTitle?: string;
  dialect?: string;
  lexemeId?: string;
  wordFamilyId?: string;
  rootIds?: string[];
  /** Ham kaydin definitions dizisi */
  definitions?: { meaning: string; examples?: string[] }[];
  /** HTML tanim (definitions bos ise anlam buradan alinir) */
  fullDefinitionHtml?: string;
}

export interface DictionaryMeta {
  file: string;
  title: string;
  dialect?: string;
  originalTitle?: string;
  author?: string;
  year?: number | string;
  total_words?: number;
  sourceLanguage?: string;
  targetLanguage?: string;
  confidence?: string;
  shortLabel?: string;
  shortLabelKiril?: string;
}

export const DICTIONARIES_META: DictionaryMeta[] = dictionariesMeta as DictionaryMeta[];

const DEFAULT_CORE_ENTRIES: DictionaryEntry[] = [
  { lemma: 'унэ', root: 'унэ', pos: 'NOUN', meaningTr: 'Ev', variations: ['унэ'] },
  { lemma: 'щӀалэ', root: 'щӀалэ', pos: 'NOUN', meaningTr: 'Genç, delikanlı, oğlan', variations: ['щӀалэ'] },
  { lemma: 'щӀын', root: 'щӀа', pos: 'VERB', meaningTr: 'Yapmak, etmek', variations: ['щӀ', 'щӀа', 'щӀын', 'ищӀа'] },
  { lemma: 'кӀуэн', root: 'кӀуэ', pos: 'VERB', meaningTr: 'Gitmek', variations: ['кӀуэ', 'кӀуа', 'кӀуэну'] },
  { lemma: 'псыхуэлӀэ', root: 'пс', pos: 'NOUN', meaningTr: 'Su için ölen, fedakar, şehit', variations: ['псыхуэлӀэ', 'псыхуэлӏэ'] },
];

/** HTML etiketlerini sokup duz metin anlam cikarir (definitions bos ise). */
function stripHtml(html: string): string {
  return String(html || '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Ham kaydi DictionaryEntry'ye cevirir.
 */
export function normalizeWordEntry(raw: any, key?: string, meta?: DictionaryMeta): DictionaryEntry | null {
  if (!raw || typeof raw !== 'object') return null;
  if (raw.kabardeyce) {
    const lemmaS = String(raw.kabardeyce).trim();
    const anlamParcalari = [
      raw.turkce ? `TR: ${raw.turkce}` : '',
      raw.rusca ? `RU: ${raw.rusca}` : '',
      raw.ingilizce ? `EN: ${raw.ingilizce}` : '',
    ].filter(Boolean);
    return {
      lemma: lemmaS,
      root: lemmaS,
      pos: String(raw.concept || ''),
      meaningTr: anlamParcalari.join(' | '),
      variations: undefined,
      sourceFile: meta?.file,
      sourceTitle: meta?.title,
      dialect: meta?.dialect,
      definitions: [],
      fullDefinitionHtml: undefined,
    };
  }
  const lemma = String(raw.spelling || key || '').trim();
  if (!lemma) return null;

  const defs: { meaning: string; examples?: string[] }[] = Array.isArray(raw.definitions)
    ? raw.definitions
        .map((d: any) => ({
          meaning: String(d?.meaning ?? d ?? ''),
          examples: Array.isArray(d?.examples) ? d.examples : [],
        }))
        .filter((d: { meaning: string }) => d.meaning.trim() !== '')
    : [];

  const meaningTr =
    defs.map((d) => d.meaning).join('; ') ||
    stripHtml(raw.full_definition_in_html || '');

  return {
    lemma,
    root: String(raw.root || lemma),
    pos: String(raw.type || raw.pos || ''),
    meaningTr,
    variations: Array.isArray(raw.variations) ? raw.variations : undefined,
    sourceFile: meta?.file,
    sourceTitle: meta?.title,
    dialect: meta?.dialect,
    definitions: defs,
    fullDefinitionHtml: raw.full_definition_in_html || undefined,
  };
}

/** Bir sozluk dosyasinin ham JSON'unu DictionaryEntry[]'ye cevirir. */
export function parseDictionaryFile(data: any, meta?: DictionaryMeta): DictionaryEntry[] {
  if (!data) return [];
  if (Array.isArray(data)) {
    const out: DictionaryEntry[] = [];
    for (const raw of data) {
      const e = normalizeWordEntry(raw, raw?.spelling, meta);
      if (e) out.push(e);
    }
    return out;
  }
  const words = data.words;
  if (!words || typeof words !== 'object') return [];
  const out: DictionaryEntry[] = [];
  for (const [key, raw] of Object.entries(words)) {
    const e = normalizeWordEntry(raw, key, meta);
    if (e) out.push(e);
  }
  return out;
}

export class DictionaryProvider {
  private dictionary: DictionaryEntry[];
  private lexemeIndex = new Map<string, DictionaryEntry>();
  private loadedFiles = new Set<string>();

  constructor(customDictionary?: DictionaryEntry[]) {
    this.dictionary = [...DEFAULT_CORE_ENTRIES, ...(customDictionary || [])];
  }

  getDictionaries(): DictionaryMeta[] {
    return DICTIONARIES_META;
  }

  getDictionariesByDialect(dialect: string): DictionaryMeta[] {
    return DICTIONARIES_META.filter((m) => m.dialect === dialect);
  }

  size(): number {
    return this.dictionary.length + this.lexemeIndex.size;
  }

  /**
   * ADR-ROOT-001 uyumlu lexemes.json kayitlarini (translations.tr ve kanonik partOfSpeech)
   * O(1) arama indeksine yukler.
   */
  loadLexemes(lexemes: Partial<Lexeme>[]): number {
    let added = 0;
    for (const item of lexemes) {
      if (!item || !item.form) continue;
      const normalizedForm = normalizePalochka(item.form).toLowerCase();
      if (!normalizedForm) continue;

      const meaningTr = resolveLexemeTurkishMeaning(item);
      const canonicalPos = normalizePartOfSpeech(item.partOfSpeech);
      const entry: DictionaryEntry = {
        lemma: item.form,
        root: item.form,
        pos: canonicalPos,
        meaningTr,
        dialect: (item as any).dialect || (item as any).dialects?.[0],
        lexemeId: item.id,
        wordFamilyId: item.wordFamilyId,
        rootIds: item.rootIds,
        sourceFile: 'linguistic/lexemes.json',
      };

      const existing = this.lexemeIndex.get(normalizedForm);
      if (!existing || (!existing.meaningTr && meaningTr)) {
        this.lexemeIndex.set(normalizedForm, entry);
        added++;
      }
    }
    return added;
  }

  async loadDictionary(
    file: string,
    fetcher?: (file: string) => Promise<any>
  ): Promise<number> {
    if (this.loadedFiles.has(file)) return 0;
    const meta = DICTIONARIES_META.find((m) => m.file === file);
    const fetchFn =
      fetcher ||
      (async (f: string) => {
        const res = await fetch(`/data/${f}`);
        if (!res.ok) throw new Error(`Sozluk yuklenemedi: ${f} (${res.status})`);
        return res.json();
      });
    const data = await fetchFn(file);
    const entries = parseDictionaryFile(data, meta);
    this.dictionary.push(...entries);
    this.loadedFiles.add(file);
    return entries.length;
  }

  async loadDialect(dialect: string, fetcher?: (file: string) => Promise<any>): Promise<number> {
    let total = 0;
    for (const m of this.getDictionariesByDialect(dialect)) {
      total += await this.loadDictionary(m.file, fetcher);
    }
    return total;
  }

  findEntry(query: string): DictionaryEntry | null {
    if (!query) return null;
    const normalized = normalizePalochka(query).toLowerCase();
    const exactMatch = this.dictionary.find(
      (e) =>
        normalizePalochka(e.root || '').toLowerCase() === normalized ||
        normalizePalochka(e.lemma || '').toLowerCase() === normalized
    );
    if (exactMatch) return exactMatch;

    const variationMatch = this.dictionary.find(
      (e) => e.variations && e.variations.some((v) => normalizePalochka(v).toLowerCase() === normalized)
    );
    if (variationMatch) return variationMatch;

    return this.lexemeIndex.get(normalized) || null;
  }
}


