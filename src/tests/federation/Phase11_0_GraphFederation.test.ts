import { describe, it, expect } from 'vitest';
import { FederatedGraphService, FederatedSourceNode } from '../../domain/federation/services/FederatedGraphService';

describe('Phase 11.0 - Knowledge Graph Federation Certification', () => {
  it('FED-001: Merges multi-dialect graph nodes into a unified federated entity graph', () => {
    const kabardianNodes: FederatedSourceNode[] = [
      { id: 'CONCEPT_WATER', dialect: 'EASTERN_KABARDIAN', label: 'Псы' }
    ];

    const adygheNodes: FederatedSourceNode[] = [
      { id: 'CONCEPT_WATER', dialect: 'WESTERN_ADYGHE', label: 'Псы' },
      { id: 'CONCEPT_FIRE', dialect: 'WESTERN_ADYGHE', label: 'МафIэ' }
    ];

    const federatedGraph = FederatedGraphService.mergeSources([kabardianNodes, adygheNodes]);

    expect(federatedGraph).toHaveLength(2);
    expect(federatedGraph.map(n => n.id)).toEqual(['CONCEPT_WATER', 'CONCEPT_FIRE']);
  });
});