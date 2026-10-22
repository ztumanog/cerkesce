import fs from 'node:fs';

const huvaj = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));

const tablo = {
  "чъыгы": "жыг",
  "фэбжьэу": "фIэбжьэу",
  "фыжьы": "хуыжь",
  "бжьыныф": "бжьыныху",
  "ты-лэжьэ-щт": "ды-лэжьэ-нщ",
  "жъы": "жьы",
  "бжъэ": "бжьэ",
  "жъэн": "жьэн",
  "жъуэн": "вэн",
  "жъуагъуэ": "вагъуэ",
  "мафэ": "махуэ",
  "фабэ": "хуабэ",
  "нэшъу": "нэф",
  "нэф": "нэху",
  "шIын": "щIын",
  "шIэн": "щIэн",
  "гъашIэ": "гъащIэ",
  "шъхьэ": "щхьэ",
  "дышъэ": "дыщэ",
  "шъынэ": "щынэ",
  "шъабэ": "щабэ",
  "шъхьащэ": "щхьэшэ",
  "гукIэгъу": "гущIэгъу",
  "гупшысэ": "гупсысэ",
  "гушIо": "гуфIэ",
};

function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

let dogrulanmis = 0;
let dogrulanmamis = 0;

console.log('\n=== Huvaj Doğrulama ===\n');

for (const [ady, kbd] of Object.entries(tablo)) {
  let bulundu = null;
  for (const [madde, m] of Object.entries(huvaj)) {
    const html = m.full_definition_in_html || '';
    const desen = new RegExp(
      escapeRegex(ady) + '(?:\\([^)]*\\))?\\s*\\/\\s*<b>' + escapeRegex(kbd) + '</b>',
      'u'
    );
    if (desen.test(html)) {
      bulundu = madde;
      break;
    }
  }
  if (bulundu) {
    console.log(`✅ ${ady} -> ${kbd}  (Huvaj: ${bulundu})`);
    dogrulanmis++;
  } else {
    console.log(`❌ ${ady} -> ${kbd}  (Huvaj'da yok)`);
    dogrulanmamis++;
  }
}

console.log(`\n=== ÖZET ===`);
console.log(`Doğrulanmış: ${dogrulanmis}`);
console.log(`Doğrulanmamış: ${dogrulanmamis}`);
console.log(`Toplam: ${dogrulanmis + dogrulanmamis}`);
