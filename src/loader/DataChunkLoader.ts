/**
 * @file src/loader/DataChunkLoader.ts
 * @description Büyük veri paketlerini parçalar (chunk) halinde belleğe yükler.
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
   * Büyük veri paketlerini parçalar (chunk) halinde repository'e aktarır.
   * UI dondurmaması için mikro-görev (setImmediate/setTimeout) simülasyonu içerir.
   */
  async loadChunked(
    data: DatasetPayload,
    chunkSize: number = 5000,
    onProgress?: (progress: LoadProgress) => void
  ): Promise<void> {
    const { entries, groups = [] } = data;
    const total = entries.length;

    // Grupları yükle
    if (groups.length > 0) {
      this.repository.loadGroups(groups);
    }

    // Kelime girişlerini chunk'lar halinde ekle
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

      // Etkinlik döngüsünü (Event Loop) serbest bırak
      await new Promise((resolve) => setTimeout(resolve, 0));
    }
  }
}