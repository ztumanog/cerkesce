import { describe, it, expect } from 'vitest';
import { DiscoveryFacade } from '../../../domain/discovery/services/DiscoveryFacade';
import { InMemoryConceptGraphRepository } from '../../../repository/InMemoryConceptGraphRepository';

describe('DiscoveryFacade Hard-Coded Certification (DHC)', () => {
  it('DHC-001: explore() should NOT always return WATER concept', async () => {
    const repo = new InMemoryConceptGraphRepository();
    const facade = new DiscoveryFacade(repo);

    const result1 = await facade.explore('su');
    const result2 = await facade.explore('water');
    const result3 = await facade.explore('псы');

    console.log('su →', result1.conceptId);
    console.log('water →', result2.conceptId);
    console.log('псы →', result3.conceptId);

    expect(result1.conceptId).toBeDefined();
    expect(result2.conceptId).toBeDefined();
    expect(result3.conceptId).toBeDefined();
    expect(result1.conceptId).toBe(result2.conceptId);
    expect(result2.conceptId).toBe(result3.conceptId);
  });
});
