import sys
sys.stdout.reconfigure(encoding="utf-8")
from pathlib import Path

test_content = '''
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
'''
Path("src/tests/domain/linguistic/Izole.test.ts").write_text(test_content, encoding="utf-8")
print("Izole test olusturuldu")
