import { describe, it, expect, beforeEach } from 'vitest';
import { ExecutiveLearningService } from '../../infra/knowledge/ExecutiveLearningService';
import { HistoricalTrendIntelligenceService } from '../../infra/knowledge/HistoricalTrendIntelligenceService';
import { OperationalKnowledgeBaseService } from '../../infra/knowledge/OperationalKnowledgeBaseService';
import { RootCauseIntelligenceService } from '../../infra/knowledge/RootCauseIntelligenceService';
import { ArchitectureKnowledgeGraphService } from '../../infra/knowledge/ArchitectureKnowledgeGraphService';

describe('Sprint 13.5 - ExecutiveLearningService', () => {
  beforeEach(() => {
    HistoricalTrendIntelligenceService.clear();
    OperationalKnowledgeBaseService.clear();
    RootCauseIntelligenceService.clear();
    ArchitectureKnowledgeGraphService.clear();
  });

  it('Dashboard uretir', () => {
    const dash = ExecutiveLearningService.getDashboard();
    expect(dash.timestamp).toBeDefined();
    expect(dash.status).toMatch(/^(ok|warning|critical)$/);
    expect(dash.summary).toBeDefined();
  });

  it('Tum alt sistemler entegre', () => {
    const dash = ExecutiveLearningService.getDashboard();
    expect(dash.trends).toBeDefined();
    expect(dash.knowledge).toBeDefined();
    expect(dash.rootCauses).toBeDefined();
    expect(dash.graph).toBeDefined();
  });

  it('Insights uretir', () => {
    const dash = ExecutiveLearningService.getDashboard();
    expect(Array.isArray(dash.insights)).toBe(true);
  });

  it('Bos sistem warning veya ok', () => {
    const dash = ExecutiveLearningService.getDashboard();
    expect(['ok', 'warning', 'critical']).toContain(dash.status);
  });
});
