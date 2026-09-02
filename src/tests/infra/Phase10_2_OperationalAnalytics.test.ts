import { describe, it, expect, beforeEach } from 'vitest';
import { OperationalAnalyticsService } from '../../infra/analytics/OperationalAnalyticsService';

describe('Phase 10.2 - Operational Analytics Certification', () => {
  beforeEach(() => {
    OperationalAnalyticsService.clear();
  });

  it('OPS-002: Accurately tracks cache hit ratio and flags slow queries above threshold', () => {
    OperationalAnalyticsService.recordCacheAccess(true);
    OperationalAnalyticsService.recordCacheAccess(true);
    OperationalAnalyticsService.recordCacheAccess(false);

    expect(OperationalAnalyticsService.getCacheHitRatio()).toBe(66.67);

    OperationalAnalyticsService.recordQueryExecution('FAST_CONCEPT_QUERY', 45);
    OperationalAnalyticsService.recordQueryExecution('HEAVY_GRAPH_TRAVERSAL', 230);

    const slowQueries = OperationalAnalyticsService.getSlowQueries();
    expect(slowQueries).toHaveLength(1);
    expect(slowQueries[0].query).toBe('HEAVY_GRAPH_TRAVERSAL');
    expect(slowQueries[0].durationMs).toBe(230);
  });
});