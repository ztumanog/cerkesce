import dictionarySources from '@/data/dictionarySources.json';
import type { AktifSozlukItem, SozlukTipi } from '@/types/dictionary';

export interface SourceRegistry {
  getActiveDictionaries(): AktifSozlukItem[];
  getSourceById(id: string): AktifSozlukItem | undefined;
  getAllSources(): AktifSozlukItem[];
}

export class DefaultSourceRegistry implements SourceRegistry {
  private sources: AktifSozlukItem[];

  constructor() {
    this.sources = this.initializeSources();
  }

  private initializeSources(): AktifSozlukItem[] {
    return (dictionarySources as any[]).map((s: any) => ({
      id: s.file ?? s.title ?? 'unknown',
      name: s.title ?? s.name ?? 'Bilinmeyen',
      type: (s.type ?? 'Genel') as SozlukTipi,
      itemCount: s.total_words ?? s.itemCount ?? 0,
      isActive: s.active ?? s.isActive ?? true,
      lastUpdated: new Date().toISOString(),
      dialects: s.dialect ? [s.dialect] : [],
    }));
  }

  getActiveDictionaries(): AktifSozlukItem[] {
    return this.sources.filter((s) => s.isActive);
  }

  getSourceById(id: string): AktifSozlukItem | undefined {
    return this.sources.find((s) => s.id === id);
  }

  getAllSources(): AktifSozlukItem[] {
    return this.sources;
  }
}

// Singleton instance
export const sourceRegistry = new DefaultSourceRegistry();

export default sourceRegistry;