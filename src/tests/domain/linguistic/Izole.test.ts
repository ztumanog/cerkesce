
import { describe, it, expect } from 'vitest';
import { DialectConverter } from '@/domain/linguistic/DialectConverter';

describe('Izole Test', () => {
  it('sadece she', () => {
    const converter = new DialectConverter();
    const result = converter.convertWord('шъэ');
    console.log(`IZOLE: шъэ -> ${result}`);
    expect(result).toBe('щэ');
  });
});
