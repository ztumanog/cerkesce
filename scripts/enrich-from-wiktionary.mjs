import fs from 'fs';
import path from 'path';

const DATA_PATH = path.resolve('./public/data/linguistic/lexemes.json');
const WIKI_DIR = 'D:\\projeler\\Cerkesce\\_wiktionary';
const APPLY_MODE = process.argv.includes('--apply');

const CANONICAL_CONCEPT_REGEX = /^[A-Z][A-Z0-9_]{1,63}$/;
const VALID_ROOT_ID_REGEX = /^R-[A-Z0-9_-]+$/;
const HASH_REGEX = /^[A-F0-9]{16,}$/i;
const TURKISH_CHAR_REGEX = /[ÇĞİÖŞÜçğıöşü]/;
const PALOCHKA_FIX_REGEX = /(?<=[А-Яа-яЁёӀӏ])[1Ilӏ]|(?=[А-Яа-яЁёӀӏ])[1Ilӏ]/g;

const TURKISH_LEAK_SET = new Set([
  'ABARTI', 'BILESIK', 'HAFIZA', 'SALDIRMAK', 'DUYGU', 'ZIHIN',
  'HAREKET', 'NESNE', 'HAYVAN', 'BITKI', 'BILINMEYEN', 'DIGER'
]);

function normalizeCyrillic(str) {
  if (!str || typeof str !== 'string') return '';
  return str
    .normalize('NFC')
    .trim()
    .replace(/^[-–—]+|[-–—]+$/g, '')
    .replace(PALOCHKA_FIX_REGEX, '\u04C0')
    .toLowerCase();
}

function cleanWikiGlossArray(arr) {
  if (!Array.isArray(arr)) return '';
  const cleaned = arr
    .map(entry => {
      if (typeof entry !== 'string') return '';
      // "а = first letter..." -> "first letter..."
      const eqIdx = entry.indexOf('=');
      const text = eqIdx > 0 && eqIdx < 35 ? entry.slice(eqIdx + 1) : entry;
      return text.replace(/<[^>]*>?/g, '').replace(/\s+/g, ' ').trim();
    })
    .filter(Boolean);
  return Array.from(new Set(cleaned)).join('; ');
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

  let s = normalizeCyrillic(cyrillic);
  for (const [cyr, lat] of digraphs) {
    s = s.split(cyr).join(lat);
  }
  let out = '';
  for (const ch of s) {
    out += singles[ch] !== undefined ? singles[ch] : ch.toUpperCase();
  }
  return out.replace(/[^A-Z0-9_-]/g, '');
}

function isValidConcept(c) {
  if (!c || typeof c !== 'string') return false;
  const up = c.trim().toUpperCase();
  if (up === 'UNCLASSIFIED' || up === 'UNKNOWN') return false;
  if (HASH_REGEX.test(up) || TURKISH_CHAR_REGEX.test(c) || TURKISH_LEAK_SET.has(up)) return false;
  return CANONICAL_CONCEPT_REGEX.test(up);
}

function inferConceptFromEnglish(enText) {
  if (!enText || typeof enText !== 'string') return null;
  const first = enText.split(/[;,/()]/)[0].trim();
  if (!first) return null;
  const candidate = first
    .toUpperCase()
    .replace(/^(TO|A|AN|THE)\s+/, '')
    .replace(/[^A-Z0-9\s]+/g, '')
    .trim()
    .replace(/\s+/g, '_');

  if (candidate.length >= 2 && candidate.length <= 48 && isValidConcept(candidate)) {
    return candidate;
  }
  return null;
}

function readJsonSafe(filename, fallback) {
  const full = path.join(WIKI_DIR, filename);
  if (!fs.existsSync(full)) return fallback;
  return JSON.parse(fs.readFileSync(full, 'utf8'));
}

// 1. DIŞ KAYNAKLARI YÜKLE VE TEK İNDEKSTE BİRLEŞTİR
const wikiFull = readJsonSafe('wiktionary_full.json', {});
const wikiIpa = readJsonSafe('wiktionary_ipa.json', {});
const deepseekList = readJsonSafe('deepseek_json_temiz_v18.json', []);
const sukunovList = readJsonSafe('sukunov_dictionary_final.json', []);
const lemmasV2 = readJsonSafe('lemmas_v2.json', {});
const audioCache = readJsonSafe('audio_urls_cache.json', {});

const extIndex = new Map();
function upsertExt(rawForm, patch) {
  const key = normalizeCyrillic(rawForm);
  if (!key) return;
  const cur = extIndex.get(key) || {};
  if (patch.en && !cur.en) cur.en = patch.en;
  if (patch.ru && !cur.ru) cur.ru = patch.ru;
  if (patch.tr && !cur.tr) cur.tr = patch.tr;
  if (patch.concept && isValidConcept(patch.concept) && !cur.concept) {
    cur.concept = patch.concept.trim().toUpperCase();
  }
  if (patch.rootStem && !cur.rootStem) cur.rootStem = normalizeCyrillic(patch.rootStem);
  if (patch.ipa && !cur.ipa) cur.ipa = patch.ipa;
  if (patch.audioUrl && !cur.audioUrl) cur.audioUrl = patch.audioUrl;
  extIndex.set(key, cur);
}

for (const [k, v] of Object.entries(wikiFull)) {
  const audioUrl = v.audio && audioCache[v.audio] ? audioCache[v.audio] : null;
  upsertExt(k, {
    en: cleanWikiGlossArray(v.english),
    ru: cleanWikiGlossArray(v.russian),
    rootStem: Array.isArray(v.roots) && v.roots[0] ? v.roots[0] : null,
    ipa: v.ipa || null,
    audioUrl,
  });
}

for (const [k, v] of Object.entries(wikiIpa)) {
  upsertExt(k, {
    en: cleanWikiGlossArray(v.english),
    ru: cleanWikiGlossArray(v.russian),
    rootStem: Array.isArray(v.roots) && v.roots[0] ? v.roots[0] : null,
    ipa: v.ipa || null,
  });
}

for (const row of deepseekList) {
  upsertExt(row.kabardeyce, {
    en: row.ingilizce?.trim(),
    ru: row.rusca?.trim(),
    tr: row.turkce?.trim(),
    concept: row.concept,
  });
}

for (const row of sukunovList) {
  upsertExt(row.kbd, {
    en: row.en?.trim(),
    ru: row.ru?.trim(),
    tr: row.tr?.trim(),
    concept: row.concept,
  });
}

for (const [k, v] of Object.entries(lemmasV2)) {
  if (v && v.stem) {
    upsertExt(k, { rootStem: v.stem });
  }
}

// 2. ANA VERİYİ YÜKLE VE KORPUS İÇİ KÖK / AİLE HARİTALARINI ÇIKAR
const rawFile = JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));
const isArrayRoot = Array.isArray(rawFile);
const items = isArrayRoot ? rawFile : (rawFile.lexemes || rawFile.items || []);

const stemToRootFreq = new Map();
const wfToRootFreq = new Map();

for (const item of items) {
  if (item.rootId && VALID_ROOT_ID_REGEX.test(item.rootId) && item.rootId !== 'R-UNCLEAR') {
    const stem = normalizeCyrillic(item.root || item.rootForm);
    if (stem) {
      if (!stemToRootFreq.has(stem)) stemToRootFreq.set(stem, new Map());
      const m = stemToRootFreq.get(stem);
      m.set(item.rootId, (m.get(item.rootId) || 0) + 1);
    }
    if (item.wordFamilyId && item.wordFamilyId !== 'WF-UNCLEAR') {
      if (!wfToRootFreq.has(item.wordFamilyId)) wfToRootFreq.set(item.wordFamilyId, new Map());
      const wm = wfToRootFreq.get(item.wordFamilyId);
      wm.set(item.rootId, (wm.get(item.rootId) || 0) + 1);
    }
  }
}

const bestRootForStem = new Map();
for (const [stem, m] of stemToRootFreq.entries()) {
  let best = null, max = 0;
  for (const [rid, cnt] of m.entries()) if (cnt > max) { max = cnt; best = rid; }
  if (best) bestRootForStem.set(stem, best);
}

const bestRootForWf = new Map();
for (const [wf, m] of wfToRootFreq.entries()) {
  let best = null, max = 0;
  for (const [rid, cnt] of m.entries()) if (cnt > max) { max = cnt; best = rid; }
  if (best) bestRootForWf.set(wf, best);
}

// 3. ZENGİNLEŞTİRME GEÇİŞİ
const stats = {
  total: items.length,
  externalIndexSize: extIndex.size,
  enAdded: 0,
  ruAdded: 0,
  unclassifiedRecovered: 0,
  unclassifiedRemaining: 0,
  rootsResolvedByWikiOrLemma: 0,
  rootsResolvedByWordFamily: 0,
  unclearRootsRemaining: 0,
  ipaAdded: 0,
  audioAdded: 0,
  stillMissingEnCount: 0,
};

const stillMissingEn = [];

for (const item of items) {
  if (!item.translations || typeof item.translations !== 'object') {
    item.translations = {};
  }

  const formKey = normalizeCyrillic(item.form);
  const ext = extIndex.get(formKey);

  // A) Eksik EN / RU doldurma
  const hasEn = Boolean(Array.isArray(item.translations.en) ? item.translations.en.join('').trim() : String(item.translations.en || '').trim());
  const hasRu = Boolean(Array.isArray(item.translations.ru) ? item.translations.ru.join('').trim() : String(item.translations.ru || '').trim());

  if (!hasEn && ext?.en) {
    item.translations.en = ext.en;
    stats.enAdded++;
  }
  if (!hasRu && ext?.ru) {
    item.translations.ru = ext.ru;
    stats.ruAdded++;
  }

  // B) Kalan UNCLASSIFIED kavram kurtarma
  if (item.conceptId === 'UNCLASSIFIED') {
    let recovered = null;
    if (ext?.concept && isValidConcept(ext.concept)) {
      recovered = ext.concept;
    } else {
      const currentEn = Array.isArray(item.translations.en) ? item.translations.en[0] : item.translations.en;
      recovered = inferConceptFromEnglish(currentEn);
    }

    if (recovered && isValidConcept(recovered)) {
      item.conceptId = recovered;
      stats.unclassifiedRecovered++;
    } else {
      stats.unclassifiedRemaining++;
    }
  }

  // C) Kalan R-UNCLEAR kök çözümleme
  if (item.rootId === 'R-UNCLEAR') {
    let resolvedRootId = null;
    let resolvedStem = normalizeCyrillic(item.root || item.rootForm) || ext?.rootStem || '';

    if (resolvedStem) {
      if (!item.root) item.root = resolvedStem;
      if (!item.rootForm) item.rootForm = resolvedStem;
      resolvedRootId = bestRootForStem.get(resolvedStem) || `R-${transliterateCircassian(resolvedStem)}`;
      if (resolvedRootId && resolvedRootId !== 'R-') {
        stats.rootsResolvedByWikiOrLemma++;
      } else {
        resolvedRootId = null;
      }
    }

    if (!resolvedRootId && item.wordFamilyId && bestRootForWf.has(item.wordFamilyId)) {
      resolvedRootId = bestRootForWf.get(item.wordFamilyId);
      stats.rootsResolvedByWordFamily++;
    }

    if (resolvedRootId && VALID_ROOT_ID_REGEX.test(resolvedRootId)) {
      item.rootId = resolvedRootId;
      if (!Array.isArray(item.rootIds)) item.rootIds = [];
      if (!item.rootIds.includes(resolvedRootId)) item.rootIds.unshift(resolvedRootId);
    } else {
      stats.unclearRootsRemaining++;
    }
  }

  // D) Eksik IPA ve Audio URL
  if (!item.ipa && ext?.ipa) {
    item.ipa = ext.ipa;
    stats.ipaAdded++;
  }
  if (!item.audioUrl && ext?.audioUrl) {
    item.audioUrl = ext.audioUrl;
    stats.audioAdded++;
  }

  // E) Hâlâ EN eksik kalanları raporlamak için topla
  const finalEn = Array.isArray(item.translations.en) ? item.translations.en.join('').trim() : String(item.translations.en || '').trim();
  if (!finalEn) {
    stats.stillMissingEnCount++;
    stillMissingEn.push({
      id: item.id,
      form: item.form,
      dialect: item.dialect,
      conceptId: item.conceptId,
      tr: item.translations.tr || null,
      ru: item.translations.ru || null,
    });
  }
}

console.log(APPLY_MODE ? '=== PHASE 3 UYGULAMA SONUCU (KAYDEDİLDİ) ===' : '=== PHASE 3 DRY-RUN ÖNİZLEME ===');
console.log(JSON.stringify(stats, null, 2));

if (APPLY_MODE) {
  const backupPath = `${DATA_PATH}.phase3-backup-${Date.now()}`;
  fs.copyFileSync(DATA_PATH, backupPath);
  const output = isArrayRoot ? items : { ...rawFile, lexemes: items };
  fs.writeFileSync(DATA_PATH, JSON.stringify(output, null, 2), 'utf8');
  fs.writeFileSync(path.resolve('./scripts/still-missing-en.json'), JSON.stringify(stillMissingEn, null, 2), 'utf8');
  console.log(`\n✅ Yedek oluşturuldu: ${backupPath}`);
  console.log(`✅ Zenginleştirilmiş veri kaydedildi: ${DATA_PATH}`);
  console.log(`✅ Kalan EN eksik kayıtlar raporlandı: scripts/still-missing-en.json`);
} else {
  console.log('\nℹ️ Uygulamak için: node scripts/enrich-from-wiktionary.mjs --apply');
}