import { describe, it, expect } from 'vitest';
import { WordFamilyResolver } from '../../../domain/discovery/services/WordFamilyResolver';

describe('Ӏэ Test 2', () => {
  it('map["Ӏэ"] icerigi', () => {
    const resolver = new WordFamilyResolver();
    const map = (resolver as any).conceptMap;
    
    const ieFamily = map['Ӏэ'];
    console.log('=== map["Ӏэ"] icerigi ===');
    console.log(JSON.stringify(ieFamily, null, 2));
    
    console.log('\n=== map["Ӏэ"]["Ӏэ"] ===', ieFamily ? ieFamily['Ӏэ'] : 'Aile YOK');
    console.log('=== map["Ӏэ"]["Iэ"] ===', ieFamily ? ieFamily['Iэ'] : 'Aile YOK');
    
    expect(true).toBe(true);
  });
});
