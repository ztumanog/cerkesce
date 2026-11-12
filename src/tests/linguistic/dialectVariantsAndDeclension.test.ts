import { describe, it, expect } from 'vitest';
import { resolveDialectVariantDisplay } from '@/lib/linguistic/dialectVariantsHelper';
import { generateNounDeclension } from '@/lib/linguistic/declensionGenerator';

describe('Akademik Sozluk Yardimcilari (Diyalekt Varyantlari & Isim Cekimi)', () => {
  it('resolveDialectVariantDisplay hem Huvaj birincil hem AIG/Tharkaho ikincil varyantini korur', () => {
    const res = resolveDialectVariantDisplay({
      form: 'жыгей',
      dialect: 'dogu',
      dialectVariants: { adyghe: 'чъыгай', kabardian: 'жыгей' },
    });
    expect(res).not.toBeNull();
    expect(res?.adyghePrimary).toBe('чъыгае');
    expect(res?.adygheAlternatives[0]?.form).toBe('чъыгай');
    expect(res?.kabardianPrimary).toBe('жыгей');
    expect(res?.hasDifference).toBe(true);
  });

  it('resolveDialectVariantDisplay eksik diyalekt alanini motordan otomatik tamamlar', () => {
    const res = resolveDialectVariantDisplay({
      form: 'джэду',
      dialect: 'dogu',
    });
    expect(res?.adyghePrimary).toBe('чэтыу');
    expect(res?.kabardianPrimary).toBe('джэду');
  });

  it('generateNounDeclension шыгъажэ kelimesi icin 4 halli akademik cekim tablosunu uretir', () => {
    const table = generateNounDeclension('шыгъажэ');
    expect(table).toHaveLength(4);
    expect(table?.[0]).toMatchObject({
      caseNameCircassian: 'Именительнэ',
      singularIndefinite: 'шыгъажэ',
      singularDefinite: 'шыгъажэр',
      pluralDefinite: 'шыгъажэхэр',
    });
    expect(table?.[1]?.singularDefinite).toBe('шыгъажэм');
    expect(table?.[2]?.singularIndefinite).toBe('шыгъажэкӀэ');
    expect(table?.[2]?.pluralDefinite).toBe('шыгъажэхэмкӀэ');
    expect(table?.[3]?.singularDefinite).toBe('шыгъажэрауэ');
    expect(table?.[3]?.pluralDefinite).toBe('шыгъажэхэрауэ');
  });
});