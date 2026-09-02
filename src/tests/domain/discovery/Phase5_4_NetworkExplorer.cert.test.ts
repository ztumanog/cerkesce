import { describe, it, expect } from 'vitest';
import { ConceptGraphAdapter } from '../../../domain/discovery/adapters/ConceptGraphAdapter';
import { CytoscapeProjectionAdapter } from '../../../domain/discovery/adapters/CytoscapeProjectionAdapter';
import { DiscoveryResultDTO } from '../../../domain/discovery/dto/DiscoveryResultDTO';

describe('Phase 5.4 - Interactive Concept Network Explorer Certification (NET)', () => {
  const WATER_ID = '01ARZ3NDEKTSV4RRFFQ69G5FAV';
  const ICE_ID = '01ARZ3NDEKTSV4RRFFQ69G5FB0';
  const RIVER_ID = '01ARZ3NDEKTSV4RRFFQ69G5FB1';

  const mockDiscoveryResult: DiscoveryResultDTO = {
    conceptId: WATER_ID,
    relatedConcepts: [
      { conceptId: ICE_ID, label: 'Ice', score: 1.0, relationType: 'STATE_OF' },
      { conceptId: RIVER_ID, label: 'River', score: 0.8, relationType: 'LOCATION_OF' }
    ],
    contextClusters: [
      { clusterId: 'state', label: 'State', concepts: [{ conceptId: ICE_ID }] },
      { clusterId: 'location', label: 'Location', concepts: [{ conceptId: RIVER_ID }] }
    ]
  };

  it('NET-001: Node Projection - Canonical ConceptNetworkDTO doğru düğümleri üretmelidir', () => {
    const canonical = ConceptGraphAdapter.toCanonicalNetwork(mockDiscoveryResult);

    expect(canonical.nodes).toHaveLength(3); // Root + 2 related
    expect(canonical.nodes.some(n => n.id === WATER_ID)).toBe(true);
    expect(canonical.nodes.some(n => n.id === ICE_ID)).toBe(true);
    expect(canonical.nodes.some(n => n.id === RIVER_ID)).toBe(true);
  });

  it('NET-002: Edge Projection - İlişkiler ve yönlü kenarlar doğru oluşturulmalıdır', () => {
    const canonical = ConceptGraphAdapter.toCanonicalNetwork(mockDiscoveryResult);

    expect(canonical.edges).toHaveLength(2);
    const iceEdge = canonical.edges.find(e => e.target === ICE_ID);
    expect(iceEdge).toBeDefined();
    expect(iceEdge!.source).toBe(WATER_ID);
    expect(iceEdge!.relationType).toBe('STATE_OF');
  });

  it('NET-003: Score & Cluster Preservation - Skor ve küme bilgileri canonical modelde korunmalıdır', () => {
    const canonical = ConceptGraphAdapter.toCanonicalNetwork(mockDiscoveryResult);

    const iceNode = canonical.nodes.find(n => n.id === ICE_ID);
    expect(iceNode).toBeDefined();
    expect(iceNode!.score).toBe(1.0);
    expect(iceNode!.cluster).toBe('state');

    const riverNode = canonical.nodes.find(n => n.id === RIVER_ID);
    expect(riverNode!.cluster).toBe('location');
  });

  it('NET-004: Cytoscape Projection - Canonical DTO, Cytoscape formatına eksiksiz dönüştürülmelidir', () => {
    const canonical = ConceptGraphAdapter.toCanonicalNetwork(mockDiscoveryResult);
    const cyto = CytoscapeProjectionAdapter.toCytoscapeFormat(canonical);

    expect(cyto.nodes).toHaveLength(3);
    expect(cyto.edges).toHaveLength(2);

    expect(cyto.nodes[0]).toHaveProperty('data');
    expect(cyto.nodes[0].data.id).toBe(WATER_ID);
    expect(cyto.edges[0].data.source).toBe(WATER_ID);
  });

  it('NET-005: Deterministic Network Projection - Aynı girdi her zaman identical ağ projeksiyonu vermelidir', () => {
    const canonical1 = ConceptGraphAdapter.toCanonicalNetwork(mockDiscoveryResult);
    const canonical2 = ConceptGraphAdapter.toCanonicalNetwork(mockDiscoveryResult);

    expect(JSON.stringify(canonical1)).toBe(JSON.stringify(canonical2));

    const cyto1 = CytoscapeProjectionAdapter.toCytoscapeFormat(canonical1);
    const cyto2 = CytoscapeProjectionAdapter.toCytoscapeFormat(canonical2);

    expect(JSON.stringify(cyto1)).toBe(JSON.stringify(cyto2));
  });
});