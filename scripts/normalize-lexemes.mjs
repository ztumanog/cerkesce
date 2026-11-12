import fs from 'fs';
import path from 'path';

const DATA_PATH = path.resolve('./public/data/linguistic/lexemes.json');
const APPLY_MODE = process.argv.includes('--apply');

const HASH_REGEX = /^[A-F0-9]{16,}$/i;
const TURKISH_CHAR_REGEX = /[ÇĞİÖŞÜçğıöşü]/;
const CANONICAL_CONCEPT_REGEX = /^[A-Z][A-Z0-9_]{1,63}$/;
const PALOCHKA_FIX_REGEX = /(?<=[А-Яа-яЁёӀӏ])[1Ilӏ]|(?=[А-Яа-яЁёӀӏ])[1Ilӏ]/g;

const TURKISH_LEAK_MAP = {
  ABARTI: 'EXAGGERATION',
  BILESIK: 'COMPOUND',
  HAFIZA: 'MEMORY',
  SALDIRMAK: 'ATTACK',
  DUYGU: 'EMOTION',
  ZIHIN: 'MIND',
  HAREKET: 'ACTION',
  NESNE: 'OBJECT',
  HAYVAN: 'ANIMAL',
  BITKI: 'PLANT',
};

function normalizeCyrillic(str) {
  if (!str || typeof str !== 'string') return str;
  return str
    .normalize('NFC')
    .trim()
    .replace(PALOCHKA_FIX_REGEX, '\u04C0');
}

function inferConceptFromEnglish(enText) {
  if (!enText || typeof enText !== 'string') return null;
  const firstMeaning = enText.split(/[,;/()]/)[0].trim();
  if (!firstMeaning) return null;
  const candidate = firstMeaning
    .toUpperCase()
    .replace(/[^A-Z0-9\s]+/g, '')
    .trim()
    .replace(/\s+/g, '_');

  if (
    candidate.length >= 2 &&
    candidate.length <= 48 &&
    CANONICAL_CONCEPT_REGEX.test(candidate) &&
    !HASH_REGEX.test(candidate) &&
    !(candidate in TURKISH_LEAK_MAP)
  ) {
    return candidate;
  }
  return null;
}

function cleanConceptValue(rawConcept, item) {
  if (!rawConcept || typeof rawConcept !== 'string') {
    return inferConceptFromEnglish(item?.translations?.en) || item?.subConceptId || 'UNCLASSIFIED';
  }

  const upper = rawConcept.trim().toUpperCase().replace(/[\s-]+/g, '_');

  if (TURKISH_LEAK_MAP[upper]) {
    return TURKISH_LEAK_MAP[upper];
  }

  if (HASH_REGEX.test(upper) || TURKISH_CHAR_REGEX.test(rawConcept) || !CANONICAL_CONCEPT_REGEX.test(upper)) {
    const recovered = inferConceptFromEnglish(item?.translations?.en);
    if (recovered) return recovered;
    if (item?.subConceptId && CANONICAL_CONCEPT_REGEX.test(item.subConceptId) && !HASH_REGEX.test(item.subConceptId)) {
      return item.subConceptId;
    }
    return 'UNCLASSIFIED';
  }

  return upper;
}

const rawFile = JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));
const isArrayRoot = Array.isArray(rawFile);
const items = isArrayRoot ? rawFile : (rawFile.lexemes || rawFile.items || []);

const stats = {
  total: items.length,
  conceptsFixed: 0,
  familyConceptsFixed: 0,
  rootsResolved: 0,
  familiesNormalized: 0,
  formsPalochkaFixed: 0,
  dialectsNormalized: 0,
};

for (const item of items) {
  // 1. ConceptId iyileştirme
  const cleanedConcept = cleanConceptValue(item.conceptId, item);
  if (cleanedConcept !== item.conceptId) {
    stats.conceptsFixed++;
    item.conceptId = cleanedConcept;
  }

  // 2. SubConceptId kontrolü
  if (item.subConceptId) {
    const cleanedSub = cleanConceptValue(item.subConceptId, item);
    if (cleanedSub !== item.subConceptId) {
      item.subConceptId = cleanedSub;
    }
  }

  // 3. WordFamilyId ve WordFamily.conceptIds iyileştirme
  if (item.wordFamilyId) {
    let wf = item.wordFamilyId.trim().toUpperCase();
    if (wf.startsWith('FAM_')) wf = 'WF-' + wf.slice(4);
    else if (!wf.startsWith('WF-')) wf = 'WF-' + wf;
    if (wf !== item.wordFamilyId) {
      stats.familiesNormalized++;
      item.wordFamilyId = wf;
    }
  }

  if (item.wordFamily && typeof item.wordFamily === 'object') {
    if (item.wordFamilyId && item.wordFamily.id !== item.wordFamilyId) {
      item.wordFamily.id = item.wordFamilyId;
    }
    if (Array.isArray(item.wordFamily.conceptIds)) {
      const nextConceptSet = new Set();
      let changed = false;
      for (const cid of item.wordFamily.conceptIds) {
        const upper = String(cid).trim().toUpperCase();
        if (TURKISH_LEAK_MAP[upper]) {
          nextConceptSet.add(TURKISH_LEAK_MAP[upper]);
          changed = true;
        } else if (HASH_REGEX.test(upper) || TURKISH_CHAR_REGEX.test(cid) || !CANONICAL_CONCEPT_REGEX.test(upper)) {
          changed = true;
        } else {
          nextConceptSet.add(upper);
        }
      }
      if (changed) {
        stats.familyConceptsFixed++;
        item.wordFamily.conceptIds = Array.from(nextConceptSet).sort();
      }
    }
  }

  // 4. Root & RootId çözümleme
  if (item.root) item.root = normalizeCyrillic(item.root);
  if (item.rootForm) item.rootForm = normalizeCyrillic(item.rootForm);

  if ((!item.rootId || item.rootId === 'R-UNCLEAR') && Array.isArray(item.rootIds)) {
    const explicitRootId = item.rootIds.find(r => typeof r === 'string' && /^R-[A-Z0-9_-]+$/i.test(r) && r.toUpperCase() !== 'R-UNCLEAR');
    if (explicitRootId) {
      item.rootId = explicitRootId.toUpperCase();
      stats.rootsResolved++;
    }
  }

  if (Array.isArray(item.rootIds)) {
    item.rootIds = Array.from(new Set(item.rootIds.map(r =>
      /^R-/i.test(r) ? r.trim().toUpperCase() : normalizeCyrillic(r)
    )));
  }

  // 5. Lexeme Form (Palochka U+04C0) & Dialect standardizasyonu
  if (item.form) {
    const normForm = normalizeCyrillic(item.form);
    if (normForm !== item.form) {
      stats.formsPalochkaFixed++;
      item.form = normForm;
    }
  }

  if (item.dialectVariants && typeof item.dialectVariants === 'object') {
    if (item.dialectVariants.kabardian) item.dialectVariants.kabardian = normalizeCyrillic(item.dialectVariants.kabardian);
    if (item.dialectVariants.adyghe) item.dialectVariants.adyghe = normalizeCyrillic(item.dialectVariants.adyghe);
  }

  if (item.dialect) {
    const normDialect = item.dialect.trim().toUpperCase();
    if (normDialect !== item.dialect) {
      stats.dialectsNormalized++;
      item.dialect = normDialect;
    }
  }
}

console.log(APPLY_MODE ? '=== UYGULAMA SONUCU (KAYDEDİLDİ) ===' : '=== DRY-RUN ÖNİZLEME RAPORU (DOSYA DEĞİŞTİRİLMEDİ) ===');
console.log(JSON.stringify(stats, null, 2));

if (APPLY_MODE) {
  const backupPath = `${DATA_PATH}.backup-${Date.now()}`;
  fs.copyFileSync(DATA_PATH, backupPath);
  const output = isArrayRoot ? items : { ...rawFile, lexemes: items };
  fs.writeFileSync(DATA_PATH, JSON.stringify(output, null, 2), 'utf8');
  console.log(`\n✅ Yedek oluşturuldu: ${backupPath}`);
  console.log(`✅ Temizlenen veri kaydedildi: ${DATA_PATH}`);
} else {
  console.log('\nℹ️ Değişiklikleri uygulamak için: node scripts/normalize-lexemes.mjs --apply');
}