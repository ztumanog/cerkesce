import { describe, it, expect } from 'vitest';

describe('toLowerCase Test', () => {
  it('Ӏэ toLowerCase', () => {
    const word = 'Ӏэ';
    const normalized = word.trim().toLowerCase();
    
    console.log('=== word ===', word);
    console.log('=== normalized ===', normalized);
    console.log('=== word === normalized ===', word === normalized);
    
    const wordCodes = Array.from(word).map(c => `U+${c.codePointAt(0)?.toString(16).toUpperCase()}`);
    const normCodes = Array.from(normalized).map(c => `U+${c.codePointAt(0)?.toString(16).toUpperCase()}`);
    console.log('=== word kodlari ===', wordCodes.join(', '));
    console.log('=== normalized kodlari ===', normCodes.join(', '));
    
    expect(true).toBe(true);
  });
});
