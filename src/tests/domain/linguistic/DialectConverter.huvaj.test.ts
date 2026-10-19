import { describe, it, expect } from 'vitest';
import { DialectConverter } from '@/domain/linguistic/DialectConverter';

describe('Huvaj çifti: altin', () => {
  const converter = new DialectConverter();

  // Kaynak: public/data/28.Tur-Ady_Huvaj.json
  // "altin" maddesi: <div>дышъэ/<b>дыщэ</b></div>
  // Not: Hangi biçimin Kabardeyce olduğu bu testte doğrulanmaz.
  //       Test, tablonun Huvaj çiftiyle uyumlu olduğunu kontrol eder.
  it('дышъэ → дыщэ (tablo, Huvaj çifti)', () => {
    expect(converter.convertWord('дышъэ')).toBe('дыщэ');
  });

  it('дыщэ → дышъэ (ters yön, Huvaj çifti)', () => {
    expect(converter.convertWordReverse('дыщэ')).toBe('дышъэ');
  });
});
