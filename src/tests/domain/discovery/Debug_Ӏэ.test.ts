import { describe, it, expect } from 'vitest';
import { QuerySemanticMapper } from '../../../domain/discovery/services/QuerySemanticMapper';
import { WordFamilyResolver } from '../../../domain/discovery/services/WordFamilyResolver';

describe('Ӏэ Debug', () => {
  it('WordFamilyResolver Ӏэ cozebiliyor mu?', () => {
    const resolver = new WordFamilyResolver();
    const result = resolver.resolve('Ӏэ');
    console.log('=== WordFamilyResolver Ӏэ ===');
    console.log('root:', result.root);
    console.log('conceptId:', result.conceptId);
    console.log('confidence:', result.confidence);
    expect(result.conceptId).toBeDefined();
  });

  it('QuerySemanticMapper Ӏэ cozebiliyor mu?', async () => {
    const mapper = new QuerySemanticMapper();
    const result = await mapper.mapQuery('Ӏэ');
    console.log('=== QuerySemanticMapper Ӏэ ===');
    console.log('conceptId:', result.conceptId);
    console.log('candidates:', result.candidates);
    console.log('source:', result.source);
    expect(result.conceptId).toBeDefined();
  });
});
