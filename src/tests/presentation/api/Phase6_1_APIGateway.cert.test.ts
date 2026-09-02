import { describe, it, expect } from 'vitest';
import { DiscoveryGatewayController } from '../../../presentation/api/DiscoveryGatewayController';

describe('Phase 6.1 - REST / GraphQL Gateway Certification (API)', () => {
  const controller = new DiscoveryGatewayController();
  const WATER_ID = '01ARZ3NDEKTSV4RRFFQ69G5FAV';

  it('API-001: Search/Explore Endpoint - Sorgu parametresi ile kesif verisi donmelidir', async () => {
    const response = await controller.explore('water');
    expect(response.success).toBe(true);
    expect(response.data).toBeDefined();
    expect(response.data.conceptId).toBe(WATER_ID);
  });

  it('API-002: Network Projection Endpoint - Format parametresine gore Canonical veya Cytoscape donmelidir', async () => {
    const cytoResponse = await controller.getNetwork('water', 'cytoscape');
    expect(cytoResponse.success).toBe(true);
    expect(cytoResponse.data.nodes).toBeDefined();
    expect(cytoResponse.data.nodes[0]).toHaveProperty('data');

    const canonicalResponse = await controller.getNetwork('water', 'canonical');
    expect(canonicalResponse.success).toBe(true);
    expect(canonicalResponse.data.nodes[0]).not.toHaveProperty('data');
    expect(canonicalResponse.data.nodes[0]).toHaveProperty('id');
  });

  it('API-003: Concept Details Endpoint - Kavram detay verileri tutarli donmelidir', async () => {
    const response = await controller.getConceptDetails(WATER_ID);
    expect(response.success).toBe(true);
    expect(response.data.conceptId).toBe(WATER_ID);
    expect(response.data.relatedCount).toBeGreaterThan(0);
  });

  it('API-004: Error Handling & Fallback Contracts - Bos sorgularda standart hata zarfi donmelidir', async () => {
    const response = await controller.explore('');
    expect(response.success).toBe(false);
    expect(response.error).toContain('required');
  });

  it('API-005: Contract Stability & Performance - API yanit zarfi ve timestamp tutarli olmalidir', async () => {
    const response = await controller.explore('psı');
    expect(response.success).toBe(true);
    expect(response.timestamp).toBeDefined();
    expect(new Date(response.timestamp).getTime()).not.toBeNaN();
  });
});