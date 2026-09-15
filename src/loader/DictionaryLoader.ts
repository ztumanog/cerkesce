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
      // Check cache first
      if (this.config.cacheResults && this.cache.has(sourceId)) {
        return {
          success: true,
          data: this.cache.get(sourceId),
          loadedAt: new Date().toISOString(),
        };
      }

      // Load from source (stub - actual implementation depends on source)
      const entries: DictionaryEntry[] = [];

      // Validate if needed
      if (this.config.validateOnLoad) {
        entries.forEach((entry) => {
          this.validateEntry(entry);
        });
      }

      // Cache results
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