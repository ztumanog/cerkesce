import { describe, it, expect } from 'vitest';
import { generateVerbConjugation } from '@/lib/linguistic/verbConjugationGenerator';

describe('Fiil Cekim ve Morfoloji Ureticisi (generateVerbConjugation)', () => {
  it('кӀуэн (gitmek) mastari icin 6 sahis x 3 zaman + olumsuz cekimini uretir', () => {
    const res = generateVerbConjugation('кӀуэн');
    expect(res).not.toBeNull();
    expect(res?.root).toBe('кӀуэ');
    expect(res?.rows).toHaveLength(6);

    const ben = res?.rows.find((r) => r.personCode === '1SG');
    expect(ben).toMatchObject({
      pronounCircassian: 'Сэ',
      present: 'сыкӀуэщ',
      past: 'сыкӀуащ',
      future: 'сыкӀуэнущ',
      negative: 'сыкӀуэкъым',
    });

    const biz = res?.rows.find((r) => r.personCode === '1PL');
    expect(biz?.present).toBe('дыкӀуэщ');
    expect(biz?.past).toBe('дыкӀуащ');
  });

  it('тхын (yazmak) fiili icin dogru kok ve cekim formlarini olusturur', () => {
    const res = generateVerbConjugation('тхын');
    expect(res?.root).toBe('тхы');
    expect(res?.rows[0]?.present).toBe('сытхыщ');
    expect(res?.rows[0]?.past).toBe('сытхащ');
    expect(res?.rows[0]?.future).toBe('сытхынущ');
  });
});