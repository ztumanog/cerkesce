import fs from 'fs';
import path from 'path';

const DATA_PATH = path.resolve('./public/data/linguistic/lexemes.json');
const APPLY_MODE = process.argv.includes('--apply');

const CANONICAL_CONCEPT_REGEX = /^[A-Z][A-Z0-9_]{1,63}$/;
const VALID_ROOT_ID_REGEX = /^R-[A-Z0-9_-]+$/;
const PALOCHKA_FIX_REGEX = /(?<=[А-Яа-яЁёӀӏ])[1Ilӏ]|(?=[А-Яа-яЁёӀӏ])[1Ilӏ]/g;

function normalizeStem(str) {
  if (!str || typeof str !== 'string') return '';
  return str
    .normalize('NFC')
    .trim()
    .replace(/^[-–—]+|[-–—]+$/g, '')
    .replace(PALOCHKA_FIX_REGEX, '\u04C0')
    .toLowerCase();
}

function stripHtml(str) {
  if (typeof str !== 'string') return '';
  return str.replace(/<[^>]*>?/g, '').replace(/\s+/g, ' ').trim();
}

function extractCleanText(val) {
  if (!val) return '';
  if (Array.isArray(val)) {
    return val.map(extractCleanText).filter(Boolean).join('; ');
  }
  if (typeof val === 'object') {
    return Object.values(val).map(extractCleanText).filter(Boolean).join('; ');
  }
  return stripHtml(String(val));
}

function cleanTranslationField(val) {
  if (typeof val === 'string') return stripHtml(val);
  if (Array.isArray(val)) return val.map(v => typeof v === 'string' ? stripHtml(v) : v);
  return val;
}

function transliterateCircassian(cyrillic) {
  const digraphs = [
    ['кхъ', 'KQH'], ['кӀу', 'K1U'], ['къу', 'QHU'], ['гъу', 'GHU'], ['хъу', 'KHU'],
    ['щӀ', 'SHCH1'], ['шӀ', 'SH1'], ['кӀ', 'K1'], ['пӀ', 'P1'], ['тӀ', 'T1'],
    ['фӀ', 'F1'], ['цӀ', 'TS1'], ['чӀ', 'CH1'], ['лӀ', 'L1'],
    ['гъ', 'GH'], ['къ', 'QH'], ['хъ', 'KH'], ['хь', 'H'], ['лъ', 'LH'],
    ['дж', 'J'], ['дз', 'DZ'], ['пкъ', 'PQ']
  ];
  const singles = {
    'а': 'A', 'б': 'B', 'в': 'V', 'г': 'G', 'д': 'D', 'е': 'YE', 'ё': 'YO',
    'ж': 'ZH', 'з': 'Z', 'и': 'I', 'й': 'Y', 'к': 'K', 'л': 'L', 'м': 'M',
    'н': 'N', 'о': 'O', 'п': 'P', 'р': 'R', 'с': 'S', 'т': 'T', 'у': 'U',
    'ф': 'F', 'х': 'X', 'ц': 'TS', 'ч': 'CH', 'ш': 'SH', 'щ': 'SHCH',
    'ъ': '', 'ы': 'Y', 'ь': '', 'э': 'E', 'ю': 'YU', 'я': 'YA', 'Ӏ': '1'
  };

  let s = normalizeStem(cyrillic);
  for (const [cyr, lat] of digraphs) {
    s = s.split(cyr).join(lat);
  }
  let out = '';
  for (const ch of s) {
    out += singles[ch] !== undefined ? singles[ch] : ch.toUpperCase();
  }
  return out.replace(/[^A-Z0-9_-]/g, '');
}

const EN_SINGLE_MAP = {
  I: 'SELF',
  ME: 'SELF',
  YOU: 'SECOND_PERSON',
  HE: 'THIRD_PERSON',
  SHE: 'THIRD_PERSON',
  IT: 'THIRD_PERSON',
  WE: 'WE',
  THEY: 'THEY',
};

const TR_FALLBACK_MAP = {
  'ben': 'SELF',
  'sen': 'SECOND_PERSON',
  'o': 'THIRD_PERSON',
  'biz': 'WE',
  'siz': 'SECOND_PERSON_PLURAL',
  'onlar': 'THEY',
  'birinci': 'FIRST',
  'ikinci': 'SECOND',
  'üçüncü': 'THIRD',
  'dördüncü': 'FOURTH',
  'beşinci': 'FIFTH',
  'altıncı': 'SIXTH',
  'yedinci': 'SEVENTH',
  'sekizinci': 'EIGHTH',
  'dokuzuncu': 'NINTH',
  'onuncu': 'TENTH',
  'izinde': 'BEHIND',
  'peşinde': 'BEHIND',
  'arkasında': 'BEHIND',
  'önünde': 'FRONT',
  'üstünde': 'ABOVE',
  'altında': 'BELOW',
  'içinde': 'INSIDE',
  'dışında': 'OUTSIDE',
  'yanında': 'BESIDE',
  'arasında': 'BETWEEN',
  'bıçak': 'KNIFE',
  'yardim': 'HELP',
  'yardım': 'HELP',
};

const rawFile = JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));
const isArrayRoot = Array.isArray(rawFile);
const items = isArrayRoot ? rawFile : (rawFile.lexemes || rawFile.items || []);

// 1. GEÇİŞ: Mevcut temiz kayıtlardan Kök ve Türkçe-Kavram sözlüğü öğren
const stemToRootFreq = new Map();
const trToConceptFreq = new Map();

for (const item of items) {
  const stem = normalizeStem(item.root || item.rootForm);
  if (stem && item.rootId && VALID_ROOT_ID_REGEX.test(item.rootId) && item.rootId !== 'R-UNCLEAR') {
    if (!stemToRootFreq.has(stem)) stemToRootFreq.set(stem, new Map());
    const m = stemToRootFreq.get(stem);
    m.set(item.rootId, (m.get(item.rootId) || 0) + 1);
  }

  if (item.conceptId && item.conceptId !== 'UNCLASSIFIED' && CANONICAL_CONCEPT_REGEX.test(item.conceptId)) {
    const trRaw = extractCleanText(item.translations?.tr);
    if (trRaw) {
      const key = trRaw.split(/[/,;()]/)[0].trim().toLowerCase();
      if (key.length >= 2) {
        if (!trToConceptFreq.has(key)) trToConceptFreq.set(key, new Map());
        const cm = trToConceptFreq.get(key);
        cm.set(item.conceptId, (cm.get(item.conceptId) || 0) + 1);
      }
    }
  }
}

const bestRootForStem = new Map();
for (const [stem, freqMap] of stemToRootFreq.entries()) {
  let bestId = null, max = 0;
  for (const [rid, cnt] of freqMap.entries()) {
    if (cnt > max) { max = cnt; bestId = rid; }
  }
  if (bestId) bestRootForStem.set(stem, bestId);
}

const bestConceptForTr = new Map();
for (const [trKey, freqMap] of trToConceptFreq.entries()) {
  let bestCid = null, max = 0;
  for (const [cid, cnt] of freqMap.entries()) {
    if (cnt > max) { max = cnt; bestCid = cid; }
  }
  if (bestCid) bestConceptForTr.set(trKey, bestCid);
}

// 2. GEÇİŞ: UNCLASSIFIED kavramları, R-UNCLEAR kökleri ve HTML sızıntılarını temizle
const stats = {
  total: items.length,
  unclassifiedBefore: 0,
  unclassifiedRecovered: 0,
  unclassifiedRemaining: 0,
  unclearRootsBefore: 0,
  unclearRootsResolvedByCorpus: 0,
  unclearRootsResolvedByDerivation: 0,
  unclearRootsResolvedByTranslit: 0,
  unclearRootsRemaining: 0,
  rootFormsCleaned: 0,
  htmlCleaned: 0,
};

for (const item of items) {
  if (item.translations && typeof item.translations === 'object') {
    for (const lang of Object.keys(item.translations)) {
      const orig = JSON.stringify(item.translations[lang]);
      item.translations[lang] = cleanTranslationField(item.translations[lang]);
      if (JSON.stringify(item.translations[lang]) !== orig) {
        stats.htmlCleaned++;
      }
    }
  }

  if (typeof item.rootForm === 'string' && /^[-–—]+|[-–—]+$/.test(item.rootForm.trim())) {
    item.rootForm = normalizeStem(item.rootForm);
    stats.rootFormsCleaned++;
  }

  if (item.rootId === 'R-UNCLEAR') {
    stats.unclearRootsBefore++;
    const stem = normalizeStem(item.root || item.rootForm);
    let resolved = null;

    if (stem && bestRootForStem.has(stem)) {
      resolved = bestRootForStem.get(stem);
      stats.unclearRootsResolvedByCorpus++;
    } else if (Array.isArray(item.derivation?.rootIds)) {
      const derivRoot = item.derivation.rootIds.find(r => typeof r === 'string' && VALID_ROOT_ID_REGEX.test(r) && r !== 'R-UNCLEAR');
      if (derivRoot) {
        resolved = derivRoot.toUpperCase();
        stats.unclearRootsResolvedByDerivation++;
      }
    }

    if (!resolved && stem) {
      const translit = transliterateCircassian(stem);
      if (translit.length >= 1) {
        resolved = `R-${translit}`;
        stats.unclearRootsResolvedByTranslit++;
      }
    }

    if (resolved) {
      item.rootId = resolved;
      if (!Array.isArray(item.rootIds)) item.rootIds = [];
      if (!item.rootIds.includes(resolved)) item.rootIds.unshift(resolved);
    } else {
      stats.unclearRootsRemaining++;
    }
  }

  if (item.conceptId === 'UNCLASSIFIED') {
    stats.unclassifiedBefore++;
    let recovered = null;

    const enRaw = extractCleanText(item.translations?.en);
    if (enRaw) {
      const firstEn = enRaw.split(/[,;/()]/)[0].trim().toUpperCase();
      if (EN_SINGLE_MAP[firstEn]) {
        recovered = EN_SINGLE_MAP[firstEn];
      } else {
        const cand = firstEn.replace(/[^A-Z0-9\s]+/g, '').trim().replace(/\s+/g, '_');
        if (cand.length >= 2 && CANONICAL_CONCEPT_REGEX.test(cand)) {
          recovered = cand;
        }
      }
    }

    if (!recovered) {
      const trRaw = extractCleanText(item.translations?.tr || item.meaning);
      if (trRaw) {
        const tokens = trRaw
          .replace(/\([^)]*\)/g, ' ')
          .split(/[/,;.]/)
          .map(t => t.trim().toLowerCase())
          .filter(Boolean);

        for (const tok of tokens) {
          if (bestConceptForTr.has(tok)) {
            recovered = bestConceptForTr.get(tok);
            break;
          }
          if (TR_FALLBACK_MAP[tok]) {
            recovered = TR_FALLBACK_MAP[tok];
            break;
          }
        }
      }
    }

    if (recovered && CANONICAL_CONCEPT_REGEX.test(recovered)) {
      item.conceptId = recovered;
      stats.unclassifiedRecovered++;
    } else {
      stats.unclassifiedRemaining++;
    }
  }
}

console.log(APPLY_MODE ? '=== PHASE 2 UYGULAMA SONUCU (KAYDEDİLDİ) ===' : '=== PHASE 2 DRY-RUN ÖNİZLEME ===');
console.log(JSON.stringify(stats, null, 2));

if (APPLY_MODE) {
  const backupPath = `${DATA_PATH}.phase2-backup-${Date.now()}`;
  fs.copyFileSync(DATA_PATH, backupPath);
  const output = isArrayRoot ? items : { ...rawFile, lexemes: items };
  fs.writeFileSync(DATA_PATH, JSON.stringify(output, null, 2), 'utf8');
  console.log(`\n✅ Yedek oluşturuldu: ${backupPath}`);
  console.log(`✅ Güncellenmiş veri kaydedildi: ${DATA_PATH}`);
} else {
  console.log('\nℹ️ Uygulamak için: node scripts/normalize-lexemes-phase2.mjs --apply');
}