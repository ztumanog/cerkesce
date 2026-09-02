import { describe, it, expect, beforeEach } from 'vitest';
import { ApiClientService } from '../../ui/services/ApiClientService';

describe('Phase 8.0 - System Integration & End-to-End API Wiring Certification', () => {
  beforeEach(() => {
    ApiClientService.clearCache();
  });

  it('SYS-001: Explorer API Wire fetches network concepts deterministically from Domain Engine', async () => {
    const query = 'water';
    const network = await ApiClientService.fetchConceptNetwork(query);

    expect(network.nodes).toHaveLength(3);
    expect(network.nodes[0].id).toBe('water');
    expect(network.edges).toHaveLength(2);
  });

  it('SYS-002: Analytics Dashboard Wire connects real NetworkAnalyticsService calculation', async () => {
    const network = await ApiClientService.fetchConceptNetwork('river');
    const analytics = await ApiClientService.fetchNetworkAnalytics(network);

    expect(analytics).toBeDefined();
    expect(analytics.density).toBeGreaterThan(0);
    expect(analytics.isolatedNodes).toHaveLength(0);
  });

  it('SYS-003: Cache Layer (SWR) returns cached results on repeated queries without engine recalculation', async () => {
    const firstCall = await ApiClientService.fetchConceptNetwork('ice');
    const secondCall = await ApiClientService.fetchConceptNetwork('ice');

    expect(firstCall).toBe(secondCall);
  });

  it('SYS-004: End-to-End Flow integrates Concept Search to Analytics pipeline', async () => {
    const conceptNetwork = await ApiClientService.fetchConceptNetwork('forest');
    const analyticsData = await ApiClientService.fetchNetworkAnalytics(conceptNetwork);

    expect(conceptNetwork.nodes.map(n => n.id)).toContain('forest');
    expect(Object.keys(analyticsData.degreeCentrality)).toContain('forest');
  });
});