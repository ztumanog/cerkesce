import { describe, it, expect } from 'vitest';
import {
  selectDailyWord,
  selectMultipleDailyWords,
  isDailyWordCandidate,
  fnv1aHash,
  type RawDictionaryEntry,
} from '../../utils/dailyWordEngine';

/**
 * Gunun-Kelimesi-001 — günün kelimesi seçim motoru.
 * Yeni davranış: örnekli adaylar önceliklendirilir, çevirili örnek
 * çiftleri (ornekCiftleri) result'a taşınır.
 */

const ornekliSsot: RawDictionaryEntry = {
  id: 'L-UVYN',
  lemma: 'увын',
  translation: 'ayağa kalkmak',
  dialect: 'Kabardeyce',
  kaynak: 'ssot',
  ornekCiftleri: [
    { metin: 'Увын.', ceviri: 'Ayağa kalkmak.' },
    { metin: 'Увын, уи дэныгъуэ.', ceviri: 'Kalk, sırtın üşüyor.' },
  ],
};

const ornekliAbaze: RawDictionaryEntry = {
  id: 'abaze-42',
  lemma: 'махуэ',
  translation: 'gün',
  dialect: 'Adigece',
  kaynak: 'abaze',
  ornekCiftleri: [{ metin: 'Сихьэт махуэр нэхъ лъагэу.', ceviri: null }],
};

const orneksiz: RawDictionaryEntry = {
  id: 'd1',
  lemma: 'бзу',
  translation: 'kuş',
};

describe('Gunun-Kelimesi-001 - dailyWordEngine', () => {
  it('GK-001: cevirili ornek ciftleri sonucla tasinir', () => {
    const sonuc = selectDailyWord([ornekliSsot, orneksiz], '2026-11-26');
    expect(sonuc).not.toBeNull();
    expect(sonuc!.id).toBe('L-UVYN');
    expect(sonuc!.ornekCiftleri).toHaveLength(2);
    expect(sonuc!.ornekCiftleri![0]).toEqual({ metin: 'Увын.', ceviri: 'Ayağa kalkmak.' });
    // ornekler (dize listesi) ciftlerin metinlerinden olusur
    expect(sonuc!.ornekler).toEqual(['Увын.', 'Увын, уи дэныгъуэ.']);
  });

  it('GK-002: ornekli aday orneksize karsi her zaman onceliklidir', () => {
    // Ayni tarih icin orneksiz adayin hash indeksi ciksa bile ornekli secilir
    const havuz = [orneksiz, ornekliAbaze];
    for (const tarih of ['2026-01-01', '2026-06-15', '2026-11-26', '2027-03-05']) {
      const sonuc = selectDailyWord(havuz, tarih);
      expect(sonuc).not.toBeNull();
      expect(sonuc!.id).toBe('abaze-42');
    }
  });

  it('GK-003: ornekli aday hic yoksa orneksiz aday secilir', () => {
    const sonuc = selectDailyWord([orneksiz], '2026-11-26');
    expect(sonuc).not.toBeNull();
    expect(sonuc!.id).toBe('d1');
    expect(sonuc!.ornekler).toBeUndefined();
  });

  it('GK-004: ayni tarih ayni kelimeyi verir (deterministik)', () => {
    const a = selectDailyWord([ornekliSsot, ornekliAbaze, orneksiz], '2026-11-26');
    const b = selectDailyWord([ornekliSsot, ornekliAbaze, orneksiz], '2026-11-26');
    expect(a?.id).toBe(b?.id);
  });

  it('GK-005: coklu secim tekrarsizdir ve ornekli adaylari one alir', () => {
    const havuz = [ornekliSsot, ornekliAbaze, orneksiz];
    const secilenler = selectMultipleDailyWords(havuz, 3, '2026-11-26');
    expect(secilenler).toHaveLength(3);
    const idler = secilenler.map((s) => s.id);
    expect(new Set(idler).size).toBe(3);
    // ornekli adaylar once listelenir
    expect(idler.indexOf('d1')).toBe(2);
  });

  it('GK-006: bos havuz null doner', () => {
    expect(selectDailyWord([], '2026-11-26')).toBeNull();
    expect(selectMultipleDailyWords([], 3, '2026-11-26')).toEqual([]);
  });

  it('GK-007: ornekCumle ve examples alanlari geriye uyumlu calisir', () => {
    const eskiFormat: RawDictionaryEntry = {
      id: 'e1',
      lemma: 'псы',
      translation: 'su',
      ornekCumle: 'Псы offseason.',
      examples: [{ text: 'Псы ухэлъадзэ.', translation: 'Su içiyorum.' }],
    };
    expect(isDailyWordCandidate(eskiFormat)).toBe(true);
    const sonuc = selectDailyWord([eskiFormat], '2026-11-26');
    // ornekCumle ornekler listesine yansir
    expect(sonuc!.ornekler).toEqual(['Псы offseason.']);
  });

  it('GK-008: fnv1aHash kararlidir ve negatif degil', () => {
    expect(fnv1aHash('2026-11-26')).toBe(fnv1aHash('2026-11-26'));
    expect(fnv1aHash('2026-11-26')).toBeGreaterThanOrEqual(0);
    expect(fnv1aHash('a')).not.toBe(fnv1aHash('b'));
  });
});
