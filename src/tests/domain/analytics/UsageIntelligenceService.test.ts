import { describe, it, expect } from 'vitest';
import { UsageIntelligenceService } from '@/domain/analytics/services/UsageIntelligenceService';

describe('P9-001: UsageIntelligenceService', () => {
  const now = Date.now();

  it('arama eventi kaydeder', () => {
    const svc = new UsageIntelligenceService();
    svc.record({ query: 'гу', timestamp: now, resultCount: 42 });
    expect(svc.getEventCount()).toBe(1);
  });

  it('topQueries dogru siralar', () => {
    const svc = new UsageIntelligenceService();
    svc.record({ query: 'гу', timestamp: now, resultCount: 10 });
    svc.record({ query: 'гу', timestamp: now, resultCount: 10 });
    svc.record({ query: 'нэ', timestamp: now, resultCount: 5 });
    const summary = svc.getSummary();
    expect(summary.topQueries[0].query).toBe('гу');
    expect(summary.topQueries[0].count).toBe(2);
  });

  it('zeroResultRate hesaplar', () => {
    const svc = new UsageIntelligenceService();
    svc.record({ query: 'гу', timestamp: now, resultCount: 10 });
    svc.record({ query: 'xyz', timestamp: now, resultCount: 0 });
    const summary = svc.getSummary();
    expect(summary.zeroResultRate).toBe(0.5);
  });

  it('topRoots Kiril prefix ile calisir', () => {
    const svc = new UsageIntelligenceService();
    svc.record({ query: 'гуфӀэ', timestamp: now, resultCount: 5 });
    svc.record({ query: 'губзыгъэ', timestamp: now, resultCount: 3 });
    const summary = svc.getSummary();
    expect(summary.topRoots.length).toBeGreaterThan(0);
  });

  it('getTrend bucket listesi doner', () => {
    const svc = new UsageIntelligenceService();
    const trend = svc.getTrend(3600000, 24);
    expect(trend.length).toBe(24);
  });

  it('since filtresi calisir', () => {
    const svc = new UsageIntelligenceService();
    svc.record({ query: 'eski', timestamp: now - 100000, resultCount: 1 });
    svc.record({ query: 'yeni', timestamp: now, resultCount: 1 });
    const summary = svc.getSummary(now - 1000);
    expect(summary.totalSearches).toBe(1);
  });
});
