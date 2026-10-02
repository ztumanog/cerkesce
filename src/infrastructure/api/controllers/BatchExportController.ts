/**
 * BatchExportController
 * Phase 7.0.4: Batch Export APIs
 */

import { Request, Response } from 'express';
import { BatchExportService } from '../../../domain/analytics/services/BatchExportService';
import { ExportFormat } from '../../../domain/analytics/dto/ExportOptionsDTO';

export class BatchExportController {
  public postBatchExport = async (req: Request, res: Response): Promise<void> => {
    try {
      const { items, format } = req.body;

      if (!Array.isArray(items)) {
        res.status(400).json({
          error: 'BAD_REQUEST',
          message: 'Body must contain "items" array.'
        });
        return;
      }

      if (!format || !['JSON', 'SVG', 'PNG'].includes(format)) {
        res.status(400).json({
          error: 'BAD_REQUEST',
          message: 'Body must contain valid "format" (JSON, SVG, PNG).'
        });
        return;
      }

      const result = BatchExportService.exportBatch(items, { format: format as ExportFormat });

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error: any) {
      res.status(500).json({
        error: 'INTERNAL_SERVER_ERROR',
        message: error.message || 'Batch export failed.'
      });
    }
  };
}
