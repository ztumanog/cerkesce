import { describe, it, expect } from 'vitest';
import { WordFamilyResolver } from '../../../domain/discovery/services/WordFamilyResolver';

describe('Ӏэ Test', () => {
  it('conceptMap Ӏэ kontrol', () => {
    const resolver = new WordFamilyResolver();
    const map = (resolver as any).conceptMap;
    
    // Root anahtarlarını kontrol et
    const roots = Object.keys(map);
    console.log('=== Root sayisi ===', roots.length);
    
    // Ӏэ root'unu bul
    const ieRoot = roots.find(r => r.includes('э') && r.length === 2);
    console.log('=== Ӏэ benzeri root ===', ieRoot);
    if (ieRoot) {
      const codes = Array.from(ieRoot).map(c => `U+${c.codePointAt(0)?.toString(16).toUpperCase()}`);
      console.log('=== Kodlar ===', codes.join(', '));
      console.log('=== map[ieRoot] ===', JSON.stringify(map[ieRoot], null, 2));
    }
    
    // Doğrudan map['Ӏэ'] dene
    console.log('=== map["Ӏэ"] ===', map['Ӏэ'] ? 'VAR' : 'YOK');
    console.log('=== map["Iэ"] ===', map['Iэ'] ? 'VAR' : 'YOK');
    
    expect(true).toBe(true);
  });
});
