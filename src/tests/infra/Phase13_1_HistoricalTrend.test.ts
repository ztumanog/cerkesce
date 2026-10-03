import { describe, it, expect, beforeEach } from 'vitest';
import { HistoricalTrendIntelligenceService } from '../../infra/knowledge/HistoricalTrendIntelligenceService';

describe('Sprint 13.1 - HistoricalTrendIntelligenceService', () => {
  beforeEach(() => {
    HistoricalTrendIntelligenceService.clear();
  });

  it('Trend kaydeder ve analiz eder', () => {
    HistoricalTrendIntelligenceService.record('cpu', 10);
    HistoricalTrendIntelligenceService.record('cpu', 20);
    HistoricalTrendIntelligenceService.record('cpu', 30);
    const analysis = HistoricalTrendIntelligenceService.analyze('cpu');
    expect(analysis.direction).toBe('upward');
    expect(analysis.dataPoints).toBe(3);
  });

  it('Dusen trend', () => {
    HistoricalTrendIntelligenceService.record('memory', 50);
    HistoricalTrendIntelligenceService.record('memory', 40);
    HistoricalTrendIntelligenceService.record('memory', 30);
    const analysis = HistoricalTrendIntelligenceService.analyze('memory');
    expect(analysis.direction).toBe('downward');
  });

  it('Sabit trend', () => {
    HistoricalTrendIntelligenceService.record('cache', 80);
    HistoricalTrendIntelligenceService.record('cache', 80);
    const analysis = HistoricalTrendIntelligenceService.analyze('cache');
    expect(analysis.direction).toBe('stable');
  });

  it('Rapor uretir', () => {
    HistoricalTrendIntelligenceService.record('cpu', 10);
    HistoricalTrendIntelligenceService.record('cpu', 20);
    const report = HistoricalTrendIntelligenceService.getReport(['cpu']);
    expect(report.timestamp).toBeDefined();
    expect(report.totalMetrics).toBe(1);
    expect(report.status).toMatch(/^(ok|warning|critical)$/);
  });

  it('Yetersiz veri', () => {
    const analysis = HistoricalTrendIntelligenceService.analyze('unknown');
    expect(analysis.insight).toBe('Yetersiz veri');
  });
});
