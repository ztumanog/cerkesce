import { describe, it, expect } from 'vitest';
import { DiscoveryFacade } from '../../../domain/discovery/services/DiscoveryFacade';

// Mock Graph Repository
const mockGraphRepo = {
  getNeighbors: (conceptId: string) => {
    // Her concept için farklı komşular
    if (conceptId === 'WATER') {
      return [
        { targetConceptId: 'ICE', relationType: 'STATE_OF' },
        { targetConceptId: 'RIVER', relationType: 'LOCATION_OF' }
      ];
    }
    if (conceptId === 'TREE') {
      return [
        { targetConceptId: 'FOREST', relationType: 'LOCATION_OF' }
      ];
    }
    return [];
  }
};

describe('DiscoveryFacade Semantic Routing (DSR)', () => {
  it('DSR-001: water, tree, horse farkli concept donmeli', async () => {
    const facade = new DiscoveryFacade(mockGraphRepo);

    const water = await facade.explore('water');
    const tree = await facade.explore('tree');
    const horse = await facade.explore('horse');

    console.log('water →', water.conceptId);
    console.log('tree →', tree.conceptId);
    console.log('horse →', horse.conceptId);

    // Şu an hard-coded WATER olduğu için bu test KIRILMALI
    expect(water.conceptId).not.toEqual(tree.conceptId);
    expect(water.conceptId).not.toEqual(horse.conceptId);
  });

  it('DSR-002: water ve su ayni concept donmeli', async () => {
    const facade = new DiscoveryFacade(mockGraphRepo);

    const water = await facade.explore('water');
    const su = await facade.explore('su');

    console.log('water →', water.conceptId);
    console.log('su →', su.conceptId);

    expect(water.conceptId).toEqual(su.conceptId);
  });
});
