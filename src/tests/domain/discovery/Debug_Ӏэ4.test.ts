import { describe, it, expect } from 'vitest';
import { WordFamilyResolver } from '../../../domain/discovery/services/WordFamilyResolver';

describe('Ӏэ Test', () => {
  it('conceptMap root anahtarlarini listele', () => {
    const resolver = new WordFamilyResolver();
    const map = (resolver as any).conceptMap;
    
    console.log('=== conceptMap root sayisi ===', Object.keys(map).length);
    console.log('=== Root anahtarlari ===');
    for (const key of Object.keys(map)) {
      const codes = Array.from(key).map(c => `U+${c.codePointAt(0)?.toString(16).toUpperCase()}`);
      console.log(`  '${key}' - ${codes.join(', ')}`);
    }
    
    console.log('\n=== resolveConcept("Ӏэ") ===', resolver.resolveConcept('Ӏэ'));
    console.log('=== resolveConcept("Iэ") ===', resolver.resolveConcept('Iэ'));
    
    expect(true).toBe(true);
  });
});
