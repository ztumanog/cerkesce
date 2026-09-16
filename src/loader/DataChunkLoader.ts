/**
 * @file src/loader/DataChunkLoader.ts
 * @description BÃƒÂ¼yÃƒÂ¼k veri paketlerini parÃƒÂ§alar (chunk) halinde belleÃ„Å¸e yÃƒÂ¼kler.
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
   * BÃƒÂ¼yÃƒÂ¼k veri paketlerini parÃƒÂ§alar (chunk) halinde repository'e aktarÃ„Â±r.
   * UI dondurmamasÃ„Â± iÃƒÂ§in mikro-gÃƒÂ¶rev (setImmediate/setTimeout) simÃƒÂ¼lasyonu iÃƒÂ§erir.
   */
  async loadChunked(
    data: DatasetPayload,
    chunkSize: number = 5000,
    onProgress?: (progress: LoadProgress) => void
  ): Promise<void> {
    const { entries, groups = [] } = data;
    const total = entries.length;

    // GruplarÃ„Â± yÃƒÂ¼kle
    if (groups.length > 0) {
      this.repository.loadGroups(groups);
    }

    // Kelime giriÃ…Å¸lerini chunk'lar halinde ekle
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

      // Etkinlik dÃƒÂ¶ngÃƒÂ¼sÃƒÂ¼nÃƒÂ¼ (Event Loop) serbest bÃ„Â±rak
      await new Promise((resolve) => setTimeout(resolve, 0));
    }
  }
}

