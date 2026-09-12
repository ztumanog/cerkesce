/**
 * @file src/loader/DataChunkLoader.ts
 * @description BÃ¼yÃ¼k veri paketlerini parÃ§alar (chunk) halinde belleÄŸe yÃ¼kler.
 */

import { TranslationEntry, TranslationGroup } from "../domain/translation";
import { InMemoryTranslationRepository } from "../repository/InMemoryTranslationRepository";

export interface LoadProgress {
  processedEntries: number;
  totalEntries: number;
  percentage: number;
  memoryUsageMB: number;
}

export interface DatasetPayload {
  entries: TranslationEntry[];
  groups?: TranslationGroup[];
}

export class DataChunkLoader {
  constructor(private repository: InMemoryTranslationRepository) {}

  /**
   * BÃ¼yÃ¼k veri paketlerini parÃ§alar (chunk) halinde repository'e aktarÄ±r.
   * UI dondurmamasÄ± iÃ§in mikro-gÃ¶rev (setImmediate/setTimeout) simÃ¼lasyonu iÃ§erir.
   */
  async loadChunked(
    data: DatasetPayload,
    chunkSize: number = 5000,
    onProgress?: (progress: LoadProgress) => void
  ): Promise<void> {
    const { entries, groups = [] } = data;
    const total = entries.length;

    // GruplarÄ± yÃ¼kle
    if (groups.length > 0) {
      this.repository.loadGroups(groups);
    }

    // Kelime giriÅŸlerini chunk'lar halinde ekle
    for (let i = 0; i < total; i += chunkSize) {
      const chunk = entries.slice(i, i + chunkSize);
      this.repository.loadEntries(chunk);

      if (onProgress) {
        const memoryMB = process.memoryUsage ? process.memoryUsage().heapUsed / 1024 / 1024 : 0;
        onProgress({
          processedEntries: Math.min(i + chunkSize, total),
          totalEntries: total,
          percentage: Math.round((Math.min(i + chunkSize, total) / total) * 100),
          memoryUsageMB: Math.round(memoryMB * 100) / 100,
        });
      }

      // Etkinlik dÃ¶ngÃ¼sÃ¼nÃ¼ (Event Loop) serbest bÄ±rak
      await new Promise((resolve) => setTimeout(resolve, 0));
    }
  }
}
