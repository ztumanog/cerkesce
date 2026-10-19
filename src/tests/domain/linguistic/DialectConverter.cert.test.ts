import { describe, it, expect } from 'vitest';
import { DialectConverter } from '@/domain/linguistic/DialectConverter';

describe('DialectConverter Certification (DC)', () => {
  const converter = new DialectConverter();

  // 37 doğrulanmış çift
  const testCases: Array<[string, string, string]> = [
    ['чъыгы', 'жыг', 'ağaç'],
    ['фэщхъуныгъэ', 'фӀэщхъуныгъэ', 'inanç'],
    ['фабэ', 'хуабэ', 'sıcak'],
    ['мафэ', 'махуэ', 'gün'],
    ['Ӏофы', 'Ӏуэху', 'iş'],
    ['цӀыфы', 'цӀыху', 'insan'],
    ['бжьыныф', 'бжьыныху', 'sarımsak'],
    ['тэ', 'дэ', 'biz'],
    ['шъхьэ', 'щхьэ', 'kafa'],
    ['дышъэ', 'дыщэ', 'altın'],
    ['шъынэ', 'щынэ', 'kuzu'],
    ['шъабэ', 'щабэ', 'yumuşak'],
    ['жъы', 'жьы', 'eski'],
    ['бжъэ', 'бжьэ', 'boynuz'],
    ['жъэн', 'жьэн', 'kızarmak'],
    ['шӀын', 'щӀын', 'yapmak'],
    ['шӀэн', 'щӀэн', 'bilmek'],
    ['гъашӀэ', 'гъащӀэ', 'hayat'],
    ['о', 'уэ', 'sen'],
    ['он', 'уэн', 'vurmak'],
    ['од', 'уэд', 'zayıf'],
    ['кӀон', 'кӀуэн', 'gitmek'],
    ['Ӏотэн', 'Ӏуэтэн', 'anlatmak'],
    ['гъо', 'гъуэ', 'yuva'],
    ['ко', 'куэ', 'uyluk'],
    ['мэлы', 'мэл', 'koyun'],
    ['гукӀэгъу', 'гущӀэгъу', 'merhamet'],
    ['гупшысэ', 'гупсысэ', 'düşünce'],
    ['шъхьащэ', 'щхьэшэ', 'saygı'],
    ['нэф', 'нэху', 'ışık'],
    ['нэшъу', 'нэф', 'kör'],
    ['шъыпкъэ', 'щыпкъэ', 'gerçek'],
    ['гушӀо', 'гуфӀэ', 'sevinç'],
    ['цуы', 'вы', 'öküz'],
    ['жъуэн', 'вэн', 'çift sürmek'],
    ['жъуагъуэ', 'вагъуэ', 'yıldız'],
    ['фыжьы', 'хужь', 'beyaz'],
  ];

  it('DC-001: 37 doğrulanmış çift doğru cevrilmeli', () => {
    let passed = 0;
    const failures: string[] = [];

    for (const [adyghe, beklenen, anlam] of testCases) {
      const sonuc = converter.convertWord(adyghe);
      if (sonuc === beklenen) {
        passed++;
      } else {
        failures.push(`${adyghe} -> ${sonuc} (beklenen: ${beklenen}) [${anlam}]`);
      }
    }

    console.log(`\n=== DIALECT CONVERTER TEST ===`);
    console.log(`Gecen: ${passed}/${testCases.length}`);

    if (failures.length > 0) {
      console.log('\nHATALAR:');
      failures.forEach(f => console.log(`  ${f}`));
    }

    expect(passed).toBe(testCases.length);
  });

  describe('DC-002: ileri ve ters yön', () => {
    const ileri: Array<[string, string]> = [
      ['шъыпкъэ', 'щыпкъэ'],
      ['гушӀо', 'гуфӀэ'],
      ['гупшысэ', 'гупсысэ'],
      ['шъхьащэ', 'щхьэшэ'],
      ['нэф', 'нэху'],
      ['нэшъу', 'нэф'],
      ['гукӀэгъу', 'гущӀэгъу'],
    ];

    // Kabardeyce → Adıgece. Homonim 'нэф' ters yönde 'нэшъу' döner; bu tasarım kararıdır.
    const ters: Array<[string, string]> = [
      ['гуфӀэ', 'гушӀо'],
      ['щыпкъэ', 'шъыпкъэ'],
      ['гупсысэ', 'гупшысэ'],
      ['щхьэшэ', 'шъхьащэ'],
      ['нэху', 'нэф'],
      ['гущӀэгъу', 'гукӀэгъу'],
    ];

    it.each(ileri)('ileri: %s → %s', (ady, kbd) => {
      expect(converter.convertWord(ady)).toBe(kbd);
    });

    it.each(ters)('ters: %s → %s', (kbd, ady) => {
      expect(converter.convertWordReverse(kbd)).toBe(ady);
    });
  });
});
