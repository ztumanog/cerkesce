import { describe, it, expect } from 'vitest';
import { NounCaseParser } from '@/domain/morphology/NounCaseParser';

describe('NounCaseParser', () => {
  const parser = new NounCaseParser();

  it('ergatif ekini (-м) ve belirli nesne ekini (-р) doğru çözmelidir', () => {
    const ergative = parser.parse('щӀалэм');
    expect(ergative.case).toBe('ergative');
    expect(ergative.stem).toBe('щӀалэ');
    expect(ergative.isDefinite).toBe(true);

    const nominative = parser.parse('унэр');
    expect(nominative.case).toBe('nominative');
    expect(nominative.stem).toBe('унэ');
  });

  it('vasıta durum ekini (-мкӀэ) doğru ayıklamalıdır', () => {
    const inst = parser.parse('унагъэмкӀэ');
    expect(inst.case).toBe('definite_instrumental');
    expect(inst.stem).toBe('унагъэ');
    expect(inst.suffix).toBe('мкӀэ');
  });

  it('türetim ekiyle biten yalımları bare olarak korumalıdır', () => {
    const derivBare = parser.parse('унэшхуэ');
    expect(derivBare.case).toBe('bare');
    expect(derivBare.stem).toBe('унэшхуэ');
  });
});