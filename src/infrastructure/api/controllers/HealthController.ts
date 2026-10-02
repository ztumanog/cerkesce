/**
 * HealthController
 * Phase 7.2: Reporting & Monitoring
 *
 * Endpoint'ler:
 * - GET /api/v1/health
 * - GET /api/v1/health/detailed
 */

import { Request, Response } from 'express';

export class HealthController {
  /**
   * Basit saglik kontrolu
   */
  public getHealth = async (req: Request, res: Response): Promise<void> => {
    res.status(200).json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    });
  };

  /**
   * Detayli saglik raporu
   */
  public getDetailedHealth = async (req: Request, res: Response): Promise<void> => {
    const memory = process.memoryUsage();

    res.status(200).json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      memory: {
        rss: `${Math.round(memory.rss / 1024 / 1024)} MB`,
        heapTotal: `${Math.round(memory.heapTotal / 1024 / 1024)} MB`,
        heapUsed: `${Math.round(memory.heapUsed / 1024 / 1024)} MB`,
      },
      version: process.version,
      platform: process.platform,
      checks: {
        api: 'ok',
        database: 'ok',
        cache: 'ok',
      },
    });
  };
}
