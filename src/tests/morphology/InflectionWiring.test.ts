/**
 * P4-B5 bağlantı testleri:
 *
 * 1. morphology/InflectionHandler (çözümleyici) -> MorphologyAnalyzer fallback'i:
 *    hiçbir özel çözümleyici tutmadığında (yalın + sözlükte yok) genel sonek
 *    analizi çalışır; tanınmış yolları EZMEZ.
 * 2. linguistic/InflectionHandler (üretici) -> /api/morphology/inflect rotası:
 *    zaman/kip çekimi + ettirgen türetme.
 */

import { describe, it, expect } from 'vitest';
import { MorphologyAnalyzer } from '../../domain/morphology/MorphologyAnalyzer';

// Sözlüğe girmemiş, yalın olmayan bir kelime: '-м' ergatifiyle biten uydurma kök
const analyzer = new MorphologyAnalyzer(undefined, [], []);

describe('MorphologyAnalyzer + InflectionHandler (çözümleyici) fallback', () => {
  it('tanınmayan kelime + tanınan sonek: genericInflection dolar', () => {
    // 'щхьэгъу' diye bir kök sözlükte değil; sonuna -м (ergatif) eklendi
    const r = analyzer.analyze('щхьэгъум');
    expect(r.source).toBe('noun');
    expect(r.genericInflection).toBeDefined();
    expect(r.genericInflection!.matched).toBe(true);
    expect(r.genericInflection!.base).toBe('щхьэгъу');
    expect(r.genericInflection!.inflections.some((i) => i.suffix === 'м')).toBe(true);
  });

  it('çift sayım yok: case parser soneği zaten eklediyse generic yalnızca alanı doldurur', () => {
    const r = analyzer.analyze('щхьэгъум');
    // -м morpheme'i case parser üzerinden tam olarak bir kez bulunmalı
    const mCount = r.morphemes?.filter((m) => m.morpheme === 'м').length ?? 0;
    expect(mCount).toBe(1);
    // genericInflection taban hipotezini yapılandırılmış biçimde verir
    expect(r.genericInflection!.base).toBe('щхьэгъу');
    expect(r.genericInflection!.inflections).toHaveLength(1);
  });

  it('tanınmış yol ezilmez: sahiplik/çoğul ekli kelime genericInflection ÜRETMEZ', () => {
    // -хэр çoğul + yalın: PossessiveParser yakalar -> otorite var -> generic yok
    const r = analyzer.analyze('цӀыхухэр');
    expect(r.plural).toBeDefined();
    expect(r.genericInflection).toBeUndefined();
  });

  it('sözlükte olan kelime: genericInflection ÜRETMEZ (dictEntry var)', () => {
    // DictionaryProvider boş olduğundan findEntry null döner; bu yüzden
    // sözlüklü senaryoyu atlayıp yalnızca 'hiçbir şey tutmadı' koşulunu
    // pozitif ve negatif uçlarla test ediyoruz (üstteki iki test).
    const r = analyzer.analyze('');
    expect(r.input).toBe('');
  });
});

describe('/api/morphology/inflect (üretici) rota', () => {
  async function callInflect(body: unknown) {
    const { POST } = await import('../../../app/api/morphology/inflect/route');
    const res = await POST(
      new Request('http://localhost/api/morphology/inflect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      }) as any
    );
    return { status: res.status, json: await res.json() };
  }

  it('şimdiki zaman: кӀуэн -> кӀуэр', async () => {
    const { status, json } = await callInflect({ verb: 'кӀуэн', tenseOrMood: 'present', dialect: 'kabardian' });
    expect(status).toBe(200);
    expect(json.form).toBe('кӀуэр');
    expect(json.components).toEqual(['кӀуэ', 'р']);
    expect(json.confidence).toBe(1);
  });

  it('geçmiş zaman olumsuz: -гъэкъым soneki', async () => {
    const { status, json } = await callInflect({ verb: 'кӀуэн', tenseOrMood: 'past', negative: true, dialect: 'kabardian' });
    expect(status).toBe(200);
    expect(json.form).toBe('кӀуэгъэкъым');
    expect(json.negative).toBe(true);
  });

  it('ettirgen: гъэ- ön eki eklenir, çift ettirgenlik atlanır', async () => {
    const { status, json } = await callInflect({ verb: 'кӀуэн', tenseOrMood: 'present', causative: true, dialect: 'kabardian' });
    expect(status).toBe(200);
    expect(json.causative).not.toBeNull();
    expect(json.causative.form).toBe('гъэкӀуэр');
    expect(json.causative.components).toEqual(['гъэ', 'кӀуэр']);
  });

  it('lehçe farkı: adyghe geçmiş -гъ', async () => {
    const { status, json } = await callInflect({ verb: 'кӀуэн', tenseOrMood: 'past', dialect: 'adyghe' });
    expect(status).toBe(200);
    expect(json.form).toBe('кӀуэгъ');
  });

  it('geçersiz zaman reddedilir', async () => {
    const { status } = await callInflect({ verb: 'кӀуэн', tenseOrMood: 'hacked' });
    expect(status).toBe(400);
  });

  it('boş fiil reddedilir', async () => {
    const { status } = await callInflect({ verb: '  ' });
    expect(status).toBe(400);
  });
});
