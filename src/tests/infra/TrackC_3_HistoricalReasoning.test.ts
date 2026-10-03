import { describe, it, expect, beforeEach } from 'vitest';
import { HistoricalReasoningService } from '../../infra/knowledge/HistoricalReasoningService';

describe('Track C.3 - HistoricalReasoningService', () => {
  beforeEach(() => {
    HistoricalReasoningService.clear();
  });

  it('Olay kaydeder', () => {
    const evt = HistoricalReasoningService.record({
      type: 'decision',
      description: 'Test decision',
      outcome: 'positive',
      context: {},
    });
    expect(evt.id).toBeDefined();
  });

  it('Pattern analiz eder', () => {
    HistoricalReasoningService.record({ type: 'incident', description: 'i1', outcome: 'negative', context: {} });
    HistoricalReasoningService.record({ type: 'incident', description: 'i2', outcome: 'negative', context: {} });
    HistoricalReasoningService.record({ type: 'decision', description: 'd1', outcome: 'positive', context: {} });
    const report = HistoricalReasoningService.analyze();
    expect(report.insights.length).toBe(2);
  });

  it('Insight confidence', () => {
    for (let i = 0; i < 5; i++) {
      HistoricalReasoningService.record({ type: 'change', description: `c${i}`, outcome: 'positive', context: {} });
    }
    const report = HistoricalReasoningService.analyze();
    const insight = report.insights.find(i => i.pattern === 'change');
    expect(insight?.confidence).toBe(1);
  });

  it('Bos olay listesi', () => {
    const report = HistoricalReasoningService.analyze();
    expect(report.totalEvents).toBe(0);
    expect(report.status).toBe('warning');
  });
});
