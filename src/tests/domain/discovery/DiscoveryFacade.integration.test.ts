import { describe, it, expect } from 'vitest';
import { DiscoveryFacade } from '../../../domain/discovery/services/DiscoveryFacade';
import { InMemoryConceptGraphRepository } from '../../../repository/InMemoryConceptGraphRepository';

describe('DiscoveryFacade + InMemoryConceptGraphRepository', () => {
  it('DFI-001: water için relatedConcepts dolu gelmeli', async () => {
    const repo = new InMemoryConceptGraphRepository();
    const facade = new DiscoveryFacade(repo);
    const result = await facade.explore('water');
    expect(result.relatedConcepts!).toBeDefined();
    expect(result.relatedConcepts!.length).toBeGreaterThan(0);
  });
});
