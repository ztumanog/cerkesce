/**
 * DashboardController
 * Phase 7.2: Reporting & Monitoring
 *
 * Endpoint'ler:
 * - GET /api/v1/dashboard/summary
 * - GET /api/v1/dashboard/reports
 */

import { Request, Response } from 'express';

export class DashboardController {
  /**
   * Dashboard ozeti
   */
  public getDashboardSummary = async (req: Request, res: Response): Promise<void> => {
    res.status(200).json({
      success: true,
      data: {
        parserCount: 18,
        testCount: 732,
        apiEndpointCount: 9,
        apiMiddlewareCount: 4,
        phase: 7,
        status: 'ACTIVE',
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
      },
    });
  };

  /**
   * Raporlar
   */
  public getReports = async (req: Request, res: Response): Promise<void> => {
    res.status(200).json({
      success: true,
      data: {
        reports: [
          { id: 'RPT-001', name: 'System Health', status: 'ok' },
          { id: 'RPT-002', name: 'API Usage', status: 'ok' },
          { id: 'RPT-003', name: 'Test Coverage', status: 'ok' },
        ],
        totalCount: 3,
        timestamp: new Date().toISOString(),
      },
    });
  };
}
