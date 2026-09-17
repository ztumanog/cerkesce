import fs from 'fs';
import path from 'path';
import type { DictionaryEntry, KelimeItem, GununKelimesi } from '@/types/dictionary';

export interface LoaderConfig {
  sourceId?: string;
  validateOnLoad?: boolean;
  cacheResults?: boolean;
}

export interface LoaderResult {
  success: boolean;
  data?: DictionaryEntry[];
  error?: string;
  loadedAt?: string;
}

let globalDictionaryCache: { entries: any[] } | null = null;

function normalizeDialect(value: unknown): string {
  const dialect = String(value || '').toLowerCase().trim();
  if (dialect === 'eastern' || dialect === 'KBD' || dialect === 'doğu' || dialect === 'kbd') {
    return 'kbd';
  }
  if (dialect === 'western' || dialect === 'bati' || dialect === 'ADY' || dialect === 'ady') {
    return 'ady';
  }
  return dialect;
}

function stripHtml(value: unknown): string {
  return String(value || '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();
}

function extractEntries(parsed: any): any[] {
  if (Array.isArray(parsed)) return parsed;

  const collection = parsed?.entries || parsed?.words || parsed?.items || parsed?.data;
  if (Array.isArray(collection)) return collection;
  if (!collection || typeof collection !== 'object') return [];

  return Object.entries(collection).map(([key, value]: [string, any]) => {
    const definitions = Array.isArray(value?.definitions) ? value.definitions : [];
    const meaning = definitions
      .map((definition: any) => definition?.meaning || definition?.text || definition?.tanim || '')
      .filter(Boolean)
      .join('; ');

    return {
      ...value,
      word: value?.word || value?.spelling || key,
      kelime: value?.kelime || value?.word || value?.spelling || key,
      meaning: value?.meaning || value?.definition || meaning || stripHtml(value?.full_definition_in_html),
      anlam: value?.anlam || value?.translation || value?.definition || meaning || stripHtml(value?.full_definition_in_html),
    };
  });
}

/**
 * route.ts API'si tarafından çağrılan senkron sözlük veri yükleyicisi.
 * data/ klasöründeki JSON dosyalarını otomatik tarar ve önbelleğe alır.
 */
export function loadDictionaryData() {
  if (globalDictionaryCache) {
    return globalDictionaryCache;
  }

  const entries: any[] = [];
  const dataPath = path.join(process.cwd(), 'public', 'data');
  const manifestPath = path.join(dataPath, 'dictionaries.json');
  const manifestByFile = new Map<string, any>();

  try {
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
    if (Array.isArray(manifest)) {
      for (const item of manifest) {
        if (item?.file) manifestByFile.set(String(item.file), item);
      }
    }
  } catch (error) {
    console.warn('[DictionaryLoader] Manifest okunamadı:', error);
  }

  if (fs.existsSync(dataPath)) {
    const files = fs.readdirSync(dataPath).filter((file) => file.endsWith('.json') && file !== 'dictionaries.json');

    for (const file of files) {
      try {
        const parsed = JSON.parse(fs.readFileSync(path.join(dataPath, file), 'utf-8'));
        const manifest = manifestByFile.get(file) || {};
        const items = extractEntries(parsed);

        for (const item of items) {
          entries.push({
            ...item,
            dialect: normalizeDialect(item.dialect || manifest.dialect),
            sourceLanguage: item.sourceLanguage || manifest.sourceLanguage,
            targetLanguage: item.targetLanguage || manifest.targetLanguage,
            sourceFile: item.sourceFile || file,
            dictionaryName: item.dictionaryName || manifest.title || manifest.name || file,
            author: item.author || manifest.author,
            year: item.year || manifest.year,
          });
        }
      } catch (error) {
        console.error(`[DictionaryLoader] ${file} okunamadı:`, error);
      }
    }
  }

  globalDictionaryCache = { entries };
  return globalDictionaryCache;
}

export class DictionaryLoader {
  private config: LoaderConfig;
  private cache: Map<string, DictionaryEntry[]> = new Map();

  constructor(config: LoaderConfig = {}) {
    this.config = {
      validateOnLoad: true,
      cacheResults: true,
      ...config,
    };
  }

  /**
   * Load dictionary entries from a source
   */
  async load(sourceId: string): Promise<LoaderResult> {
    try {
      if (this.config.cacheResults && this.cache.has(sourceId)) {
        return {
          success: true,
          data: this.cache.get(sourceId),
          loadedAt: new Date().toISOString(),
        };
      }

      const dictData = loadDictionaryData();
      const entries: DictionaryEntry[] = (dictData.entries || []) as unknown as DictionaryEntry[];

      if (this.config.validateOnLoad) {
        entries.forEach((entry) => {
          this.validateEntry(entry);
        });
      }

      if (this.config.cacheResults) {
        this.cache.set(sourceId, entries);
      }

      return {
        success: true,
        data: entries,
        loadedAt: new Date().toISOString(),
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Validate a dictionary entry
   */
  private validateEntry(entry: DictionaryEntry): boolean {
    if (!entry.id || !entry.word || !entry.definition) {
      throw new Error('Invalid DictionaryEntry: missing required fields');
    }
    return true;
  }

  /**
   * Clear cache
   */
  clearCache(): void {
    this.cache.clear();
    globalDictionaryCache = null;
  }

  /**
   * Get cache size
   */
  getCacheSize(): number {
    return this.cache.size;
  }
}

export class BatchDictionaryLoader {
  private loader: DictionaryLoader;

  constructor(config?: LoaderConfig) {
    this.loader = new DictionaryLoader(config);
  }

  /**
   * Load multiple sources in batch
   */
  async loadBatch(sourceIds: string[]): Promise<LoaderResult> {
    try {
      const allEntries: DictionaryEntry[] = [];

      for (const sourceId of sourceIds) {
        const result = await this.loader.load(sourceId);
        if (result.success && result.data) {
          allEntries.push(...result.data);
        }
      }

      return {
        success: true,
        data: allEntries,
        loadedAt: new Date().toISOString(),
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }
}

export default DictionaryLoader;