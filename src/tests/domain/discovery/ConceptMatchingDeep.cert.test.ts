import { describe, it, expect } from 'vitest';
import { QuerySemanticMapper } from '../../../domain/discovery/services/QuerySemanticMapper';

describe('Concept Matching Deep Dive', () => {
  const mapper = new QuerySemanticMapper();

  it('CMD-001: water, tree, horse farkli concept donmeli', async () => {
    const water = await mapper.mapQuery('water');
    const tree = await mapper.mapQuery('tree');
    const horse = await mapper.mapQuery('horse');

    console.log('water →', water.conceptId);
    console.log('tree →', tree.conceptId);
    console.log('horse →', horse.conceptId);

    expect(water.conceptId).not.toEqual(tree.conceptId);
    expect(water.conceptId).not.toEqual(horse.conceptId);
    expect(tree.conceptId).not.toEqual(horse.conceptId);
  });

  it('CMD-002: su, water, псы ayni concept donmeli', async () => {
    const su = await mapper.mapQuery('su');
    const water = await mapper.mapQuery('water');
    const psi = await mapper.mapQuery('псы');

    console.log('su →', su.conceptId);
    console.log('water →', water.conceptId);
    console.log('псы →', psi.conceptId);

    expect(su.conceptId).toEqual(water.conceptId);
    expect(water.conceptId).toEqual(psi.conceptId);
  });

  it('CMD-003: bilinmeyen kelime undefined donmeli', async () => {
    const unknown = await mapper.mapQuery('unknown_word');
    console.log('unknown_word →', unknown.conceptId);
    
    expect(unknown.conceptId).toBeUndefined();
  });
});
