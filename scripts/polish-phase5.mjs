import fs from 'fs';
import path from 'path';

const DATA_PATH = path.resolve('./public/data/linguistic/lexemes.json');
const APPLY_MODE = process.argv.includes('--apply');

const VALID_ROOT_REGEX = /^R-[A-Z0-9_-]+$/;
const VALID_WF_REGEX = /^WF-[A-Z0-9_-]+$/;
const PALOCHKA_ALL_REGEX = /(?<=[А-Яа-яЁёӀӏ])[1Ilӏ]|(?=[А-Яа-яЁёӀӏ])[1Ilӏ]/g;

function fixCanonicalPalochka(str) {
  if (typeof str !== 'string') return str;
  return str.normalize('NFC').replace(PALOCHKA_ALL_REGEX, '\u04C0');
}

function sanitizeId(raw, prefix, fallback) {
  if (!raw || typeof raw !== 'string') return fallback;
  let cleaned = raw
    .trim()
    .replace(/[Ӏӏ]/g, '1')
    .toUpperCase()
    .replace(/\s+/g, '_')
    .replace(/[^A-Z0-9_-]/g, '');
  if (!cleaned.startsWith(prefix)) cleaned = `${prefix}${cleaned}`;
  if (cleaned === prefix || cleaned.length <= prefix.length) return fallback;
  return cleaned;
}

const rawFile = JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));
const isArrayRoot = Array.isArray(rawFile);
const items = isArrayRoot ? rawFile : (rawFile.lexemes || rawFile.items || []);

const invalidSamples = [];
const stats = {
  total: items.length,
  palochkaFieldsFixed: 0,
  invalidRootIdsFixed: 0,
  invalidWfIdsFixed: 0,
  wfResolvedFromRoot: 0,
  rootResolvedFromWf: 0,
  remainingUnclearRoots: 0,
  remainingUnclearWfs: 0,
};

for (const item of items) {
  // 1. Tüm metin alanlarında kanonik Palochka (Ӏ U+04C0) standardizasyonu
  for (const field of ['form', 'root', 'rootForm', 'meaning']) {
    if (typeof item[field] === 'string') {
      const fixed = fixCanonicalPalochka(item[field]);
      if (fixed !== item[field]) {
        item[field] = fixed;
        stats.palochkaFieldsFixed++;
      }
    }
  }
  if (item.translations && typeof item.translations === 'object') {
    for (const lang of Object.keys(item.translations)) {
      const val = item.translations[lang];
      if (typeof val === 'string') {
        const fixed = fixCanonicalPalochka(val);
        if (fixed !== val) { item.translations[lang] = fixed; stats.palochkaFieldsFixed++; }
      } else if (Array.isArray(val)) {
        item.translations[lang] = val.map(v => {
          if (typeof v !== 'string') return v;
          const fixed = fixCanonicalPalochka(v);
          if (fixed !== v) stats.palochkaFieldsFixed++;
          return fixed;
        });
      }
    }
  }

  // 2. Bozuk RootId ve WordFamilyId düzeltme
  if (!item.rootId || !VALID_ROOT_REGEX.test(item.rootId)) {
    invalidSamples.push({ id: item.id, type: 'rootId', old: item.rootId });
    item.rootId = sanitizeId(item.rootId, 'R-', 'R-UNCLEAR');
    stats.invalidRootIdsFixed++;
  }
  if (!item.wordFamilyId || !VALID_WF_REGEX.test(item.wordFamilyId)) {
    invalidSamples.push({ id: item.id, type: 'wordFamilyId', old: item.wordFamilyId });
    item.wordFamilyId = sanitizeId(item.wordFamilyId, 'WF-', 'WF-UNCLEAR');
    stats.invalidWfIdsFixed++;
  }

  // 3. Çift yönlü R-<X> <-> WF-<X> tamamlama
  const hasKnownRoot = item.rootId !== 'R-UNCLEAR' && VALID_ROOT_REGEX.test(item.rootId);
  const hasKnownWf = item.wordFamilyId !== 'WF-UNCLEAR' && VALID_WF_REGEX.test(item.wordFamilyId);

  if (hasKnownRoot && !hasKnownWf) {
    const derivedWf = `WF-${item.rootId.slice(2)}`;
    if (VALID_WF_REGEX.test(derivedWf)) {
      item.wordFamilyId = derivedWf;
      stats.wfResolvedFromRoot++;
    }
  } else if (!hasKnownRoot && hasKnownWf) {
    const derivedRoot = `R-${item.wordFamilyId.slice(3)}`;
    if (VALID_ROOT_REGEX.test(derivedRoot)) {
      item.rootId = derivedRoot;
      if (!Array.isArray(item.rootIds)) item.rootIds = [];
      if (!item.rootIds.includes(derivedRoot)) item.rootIds.unshift(derivedRoot);
      stats.rootResolvedFromWf++;
    }
  }

  if (item.rootId === 'R-UNCLEAR') stats.remainingUnclearRoots++;
  if (item.wordFamilyId === 'WF-UNCLEAR') stats.remainingUnclearWfs++;
}

console.log('\n=== YAKALANAN BOZUK ID ÖRNEKLERİ ===');
console.log(invalidSamples);
console.log(APPLY_MODE ? '\n=== PHASE 5 UYGULAMA SONUCU (KAYDEDİLDİ) ===' : '\n=== PHASE 5 DRY-RUN ÖNİZLEME ===');
console.log(JSON.stringify(stats, null, 2));

if (APPLY_MODE) {
  const backupPath = `${DATA_PATH}.phase5-backup-${Date.now()}`;
  fs.copyFileSync(DATA_PATH, backupPath);
  const output = isArrayRoot ? items : { ...rawFile, lexemes: items };
  fs.writeFileSync(DATA_PATH, JSON.stringify(output, null, 2), 'utf8');
  console.log(`\n✅ Yedek oluşturuldu: ${backupPath}`);
  console.log(`✅ Nihai veri kaydedildi: ${DATA_PATH}`);
} else {
  console.log('\nℹ️ Uygulamak için: node scripts/polish-phase5.mjs --apply');
}