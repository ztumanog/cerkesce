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

  it('DC-002: C-9.2 kurallar ADY-KBD', () => {
    const cases: Array<[string,string,string]> = [
      ['гуфIэ','гушIо','fI-shIo'],
      ['гукIэгъу','гущIэгъу','kIe-shchIe'],
      ['гупшысэ','гупсысэ','psh-ps'],
      ['шъхьащэ','щхьэщэ','shh-shchh'],
      ['нэф','нэху','f-khu'],
      ['нэшъу','нэф','shu-f'],
      ['шъыпкъэ','щыпкъэ','sh-shch'],
    ];
    let pass = 0;
    const fails: string[] = [];
    for (const [ady, kbd, tag] of cases) {
      const r = converter.convertWord(ady);
      if (r === kbd) pass++;
      else fails.push(tag + ': ' + ady + ' -> ' + r + ' (expected ' + kbd + ')');
    }
    console.log('C-9.2: ' + pass + '/' + cases.length + ' passed');
    fails.forEach(f => console.log(f));
    expect(fails.length).toBe(0);
  });

});