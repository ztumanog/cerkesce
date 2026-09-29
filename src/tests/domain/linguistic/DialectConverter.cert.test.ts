import { describe, it, expect } from 'vitest';
import { DialectConverter } from '@/domain/linguistic/DialectConverter';

describe('DialectConverter Certification (DC)', () => {
  const converter = new DialectConverter();

  const testCases: Array<[string, string, string]> = [
    ['фэщхъуныгъэ', 'фIэщхъуныгъэ', 'inanç'],
    ['фэбжьэу',     'фIэбжьэу',     'şiddetle'],
    ['фабэ',        'хуабэ',        'sıcak'],
    ['мафэ',        'махуэ',        'gün'],
    ['фыжьы',       'хуыжь',        'beyaz'],
    ['Iофы',        'Iуэху',        'iş'],
    ['цIыфы',       'цIыху',        'insan'],
    ['бжьыныф',     'бжьыныху',     'sarımsak'],
    ['шъо-кIуэ',    'фо-кIуэ',      'siz gidiyorsunuz'],
    ['шъуы-кIуагъ', 'фы-кIуащ',     'siz gittiniz'],
    ['ты-кIуэ-щт',  'ды-кIуэ-нщ',   'biz gideceğiz'],
    ['ты-лэжьэ-щт', 'ды-лэжьэ-нщ',  'biz çalışacağız'],
    ['тэ',          'дэ',           'biz'],
    ['шъхьэ',       'щхьэ',         'kafa'],
    ['дышъэ',       'дыщэ',         'altın'],
    ['шъынэ',       'щынэ',         'kuzu'],
    ['шъабэ',       'щабэ',         'yumuşak'],
    ['жъы',         'жьы',          'eski'],
    ['бжъэ',        'бжьэ',         'boynuz'],
    ['жъэн',        'жьэн',         'kızarmak'],
    ['машIуэ',      'мафIэ',        'ateş'],
    ['шIын',        'щIын',         'yapmak'],
    ['шIэн',        'щIэн',         'bilmek'],
    ['гъашIэ',      'гъащIэ',       'hayat'],
    ['о',           'уэ',           'sen'],
    ['он',          'уэн',          'vurmak'],
    ['од',          'уэд',          'zayıf'],
    ['кIон',        'кIуэн',        'gitmek'],
    ['Iотэн',       'Iуэтэн',       'anlatmak'],
    ['гъо',         'гъуэ',         'yuva'],
    ['ко',          'куэ',          'uyluk'],
    ['цуы',         'вы',           'öküz'],
    ['жъуэн',       'вэн',          'çift sürmek'],
    ['шъуызы',      'фыз',          'kadın'],
    ['мэлы',        'мэл',          'koyun'],
    ['былымы',      'былым',        'mülk'],
    ['куэцы',       'гуэдз',        'buğday'],
    ['гъупчъ',      'гъубжэ',       'orak'],
    ['цуынды',      'вынд',         'karga'],
    ['жъуагъуэ',    'вагъуэ',       'yıldız'],
  ];

  it('DC-001: 40 otantik kelime dogru cevrilmeli', () => {
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
});