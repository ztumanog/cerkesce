/**
 * BatchExportService - Toplu network export servisi
 * ADR-ROOT-001: Runtime izolasyonu
 *
 * Birden fazla network'u tek cagride export eder.
 */

import { ExportEngineService, ExportFormat, ExportOptions, ExportResult } from './ExportEngineService';
import type { GenericConceptNetworkDTO } from './ExportEngineService';

export interface BatchExportItem {
  id: string;
  network: GenericConceptNetworkDTO;
}

export interface BatchExportResult {
  totalProcessed: number;
  exports: Record<string, ExportResult>;
  format: ExportFormat;
}

export class BatchExportService {
  /**
   * Birden fazla network'u tek cagride export eder.
   */
  static exportBatch(
    items: BatchExportItem[],
    options: ExportOptions
  ): BatchExportResult {
    if (!Array.isArray(items)) {
      throw new Error('Invalid batch: items must be an array');
    }

    // Bos batch -> bos sonuc
    if (items.length === 0) {
      return {
        totalProcessed: 0,
        exports: {},
        format: options.format,
      };
    }

    const exports: Record<string, ExportResult> = {};

    for (const item of items) {
      exports[item.id] = ExportEngineService.exportNetwork(item.network, options);
    }

    return {
      totalProcessed: items.length,
      exports,
      format: options.format,
    };
  }
}
