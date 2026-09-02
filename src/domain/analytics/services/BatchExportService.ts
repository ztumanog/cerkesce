import { ExportOptionsDTO, NetworkExportPayload } from '../dto/ExportOptionsDTO';
import { ExportEngineService, GenericConceptNetworkDTO } from './ExportEngineService';

export interface BatchExportItem {
  id: string;
  network: GenericConceptNetworkDTO;
}

export interface BatchExportResult {
  totalProcessed: number;
  exports: Record<string, NetworkExportPayload>;
  processedAt: string;
}

export class BatchExportService {
  public static exportBatch(
    items: BatchExportItem[],
    options: ExportOptionsDTO
  ): BatchExportResult {
    const exports: Record<string, NetworkExportPayload> = {};

    if (!items || items.length === 0) {
      return {
        totalProcessed: 0,
        exports: {},
        processedAt: new Date().toISOString()
      };
    }

    items.forEach(item => {
      exports[item.id] = ExportEngineService.exportNetwork(item.network, options);
    });

    return {
      totalProcessed: items.length,
      exports,
      processedAt: new Date().toISOString()
    };
  }
}