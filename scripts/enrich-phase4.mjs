import fs from 'fs';
import path from 'path';

const DATA_PATH = path.resolve('./public/data/linguistic/lexemes.json');
const WIKI_DIR = 'D:\\projeler\\Cerkesce\\_wiktionary';
const APPLY_MODE = process.argv.includes('--apply');

const CANONICAL_CONCEPT_REGEX = /^[A-Z][A-Z0-9_]{1,63}$/;
const VALID_ROOT_ID_REGEX = /^R-[A-Z0-9_-]+$/;
const PALOCHKA_FIX_REGEX = /(?<=[А-Яа-яЁёӀӏ])[1Ilӏ]|(?=[А-Яа-яЁёӀӏ])[1Ilӏ]/g;

function normalizeCyrillic(str) {
  if (!str || typeof str !== 'string') return '';
  return str
    .normalize('NFC')
    .trim()
    .replace(/^[-–—]+|[-–—]+$/g, '')
    .replace(PALOCHKA_FIX_REGEX, '\u04C0')
    .toLowerCase();
}

function readJsonSafe(filename, fallback) {
  const full = path.join(WIKI_DIR, filename);
  if (!fs.existsSync(full)) return fallback;
  return JSON.parse(fs.readFileSync(full, 'utf8'));
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

  if (candidate.length >= 2 && candidate.length <= 48 && CANONICAL_CONCEPT_REGEX.test(candidate)) {
    return candidate;
  }
  return null;
}

// 1. DIŞ KAYNAKLARDAN ÇOK DİLLİ VE LEHÇE İNDEKSLERİ OLUŞTUR
const kbdWords = new Set();
const adyWords = new Set();
const enByWord = new Map();
const ruByWord = new Map();

function addGloss(map, word, gloss) {
  const w = normalizeCyrillic(word);
  if (!w || !gloss || typeof gloss !== 'string') return;
  const clean = gloss.replace(/<[^>]*>?/g, '').replace(/\s+/g, ' ').trim();
  if (!clean || clean.length > 140) return;
  if (!map.has(w)) map.set(w, new Set());
  if (map.get(w).size < 4) map.get(w).add(clean);
}

const kavramIdx = readJsonSafe('kbd_kavram_indeksi.json', {});
for (const [dialectKey, targetSet] of [['kabardeyce', kbdWords], ['adygece', adyWords]]) {
  const section = kavramIdx[dialectKey];
  if (!section || typeof section !== 'object') continue;
  for (const [lang, glossMap] of Object.entries(section)) {
    if (!glossMap || typeof glossMap !== 'object') continue;
    for (const [gloss, formsObj] of Object.entries(glossMap)) {
      if (!formsObj || typeof formsObj !== 'object') continue;
      for (const rawForm of Object.keys(formsObj)) {
        const w = normalizeCyrillic(rawForm);
        if (!w) continue;
        targetSet.add(w);
        if (lang === 'en') addGloss(enByWord, w, gloss);
        if (lang === 'ru') addGloss(ruByWord, w, gloss);
      }
    }
  }
}

const apTemiz = readJsonSafe('ap_temiz.json', {});
for (const [rawForm, ruGloss] of Object.entries(apTemiz)) {
  const w = normalizeCyrillic(rawForm);
  if (w) {
    adyWords.add(w);
    addGloss(ruByWord, w, ruGloss);
  }
}

const huvajList = readJsonSafe('huvaj_v5.json', []);
for (const row of huvajList) {
  if (row.KBD) {
    for (const part of String(row.KBD).split(/[,;]/)) {
      const w = normalizeCyrillic(part);
      if (w) kbdWords.add(w);
    }
  }
  if (row.ADY) {
    for (const part of String(row.ADY).split(/[,;]/)) {
      const w = normalizeCyrillic(part);
      if (w) adyWords.add(w);
    }
  }
}

const wikiFull = readJsonSafe('wiktionary_full.json', {});
for (const k of Object.keys(wikiFull)) {
  const w = normalizeCyrillic(k);
  if (w) kbdWords.add(w);
}

const audioMap = new Map();
const wikiAudio = readJsonSafe('wikimedia_audio.json', []);
for (const entry of wikiAudio) {
  const m = entry.title?.match(/^File:(?:Ady|Kbd)-(.+)\.(?:oga|ogg|mp3|wav)$/i);
  if (m) audioMap.set(normalizeCyrillic(m[1]), entry.url);
}
const cacheAudio = readJsonSafe('audio_urls_cache.json', {});
for (const [fname, url] of Object.entries(cacheAudio)) {
  const m = fname.match(/^[А-ЯЁ]\d{3}(.+)\.(?:oga|ogg|mp3|wav)$/i);
  if (m) {
    const key = normalizeCyrillic(m[1]);
    if (!audioMap.has(key)) audioMap.set(key, url);
  }
}

// 2. ANA VERİ ÜZERİNDE LEHÇE, ÇEVİRİ, KAVRAM, KÖK VE SES ZENGİNLEŞTİRMESİ
const rawFile = JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));
const isArrayRoot = Array.isArray(rawFile);
const items = isArrayRoot ? rawFile : (rawFile.lexemes || rawFile.items || []);

const conceptToEnFreq = new Map();
for (const item of items) {
  const enStr = Array.isArray(item.translations?.en) ? item.translations.en[0] : item.translations?.en;
  if (item.conceptId && item.conceptId !== 'UNCLASSIFIED' && enStr && typeof enStr === 'string') {
    const cleanEn = enStr.trim();
    if (cleanEn && cleanEn.length <= 60) {
      if (!conceptToEnFreq.has(item.conceptId)) conceptToEnFreq.set(item.conceptId, new Map());
      const m = conceptToEnFreq.get(item.conceptId);
      m.set(cleanEn, (m.get(cleanEn) || 0) + 1);
    }
  }
}

function detectDialect(item, formKey) {
  const raw = String(item.dialect || '').trim().toUpperCase();
  if (raw === 'KBD' || raw === 'LANG: KBD') return 'KBD';
  if (raw === 'ADY' || raw === 'LANG: ADY' || raw === 'BATI (ADIGE)') return 'ADY';
  if (raw === 'COMMON' || raw === 'TUMU') return 'COMMON';

  const idUpper = String(item.id || '').toUpperCase();
  if (idUpper.startsWith('L-KBD-') || idUpper.startsWith('KAV-')) return 'KBD';
  if (idUpper.startsWith('L-ADY-')) return 'ADY';

  const note = String(item.dialectNote || '').toLowerCase();
  if (note.includes('kbd') || note.includes('kabard')) return 'KBD';
  if (note.includes('ady') || note.includes('adig') || note.includes('batı')) return 'ADY';

  const inKbd = kbdWords.has(formKey);
  const inAdy = adyWords.has(formKey);
  if (inKbd && inAdy) return 'COMMON';
  if (inKbd) return 'KBD';
  if (inAdy) return 'ADY';

  if (/(жъ|шъ|шӀ|чӀ|цӀу|къо|гъо|кӀо|хъо|Ӏо)/.test(formKey)) return 'ADY';
  if (/(фӀ|кхъ|щӀ)/.test(formKey) || formKey.endsWith('щ')) return 'KBD';

  const fKbd = Number(item.corpusFrequencyKbd || 0);
  const fAdy = Number(item.corpusFrequencyAdy || 0);
  if (fKbd > 0 && fAdy === 0) return 'KBD';
  if (fAdy > 0 && fKbd === 0) return 'ADY';

  return 'COMMON';
}

const stats = {
  total: items.length,
  dialectsFixedOrAssigned: 0,
  dialectBreakdown: { KBD: 0, ADY: 0, COMMON: 0 },
  enAddedFromIndex: 0,
  enAddedFromConcept: 0,
  ruAddedFromIndex: 0,
  unclassifiedRecovered: 0,
  unclassifiedRemaining: 0,
  audioAdded: 0,
  stillMissingEnCount: 0,
};

const stillMissingEn = [];

for (const item of items) {
  if (!item.translations || typeof item.translations !== 'object') item.translations = {};
  const formKey = normalizeCyrillic(item.form);

  const resolvedDialect = detectDialect(item, formKey);
  if (item.dialect !== resolvedDialect) {
    stats.dialectsFixedOrAssigned++;
    item.dialect = resolvedDialect;
  }
  stats.dialectBreakdown[resolvedDialect]++;

  const hasEn = Boolean(Array.isArray(item.translations.en) ? item.translations.en.join('').trim() : String(item.translations.en || '').trim());
  const hasRu = Boolean(Array.isArray(item.translations.ru) ? item.translations.ru.join('').trim() : String(item.translations.ru || '').trim());

  if (!hasEn && enByWord.has(formKey)) {
    item.translations.en = Array.from(enByWord.get(formKey)).join('; ');
    stats.enAddedFromIndex++;
  } else if (!hasEn && item.conceptId && item.conceptId !== 'UNCLASSIFIED') {
    const freqMap = conceptToEnFreq.get(item.conceptId);
    if (freqMap && freqMap.size > 0) {
      let bestEn = null, max = 0;
      for (const [enVal, cnt] of freqMap.entries()) if (cnt > max) { max = cnt; bestEn = enVal; }
      if (bestEn) {
        item.translations.en = bestEn;
        stats.enAddedFromConcept++;
      }
    } else if (CANONICAL_CONCEPT_REGEX.test(item.conceptId)) {
      item.translations.en = item.conceptId.toLowerCase().replace(/_/g, ' ');
      stats.enAddedFromConcept++;
    }
  }

  if (!hasRu && ruByWord.has(formKey)) {
    item.translations.ru = Array.from(ruByWord.get(formKey)).join('; ');
    stats.ruAddedFromIndex++;
  }

  if (item.conceptId === 'UNCLASSIFIED') {
    const currentEn = Array.isArray(item.translations.en) ? item.translations.en[0] : item.translations.en;
    const recovered = inferConceptFromEnglish(currentEn);
    if (recovered) {
      item.conceptId = recovered;
      stats.unclassifiedRecovered++;
    } else {
      stats.unclassifiedRemaining++;
    }
  }

  if (!item.audioUrl && audioMap.has(formKey)) {
    item.audioUrl = audioMap.get(formKey);
    stats.audioAdded++;
  }

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

console.log(APPLY_MODE ? '=== PHASE 4 UYGULAMA SONUCU (KAYDEDİLDİ) ===' : '=== PHASE 4 DRY-RUN ÖNİZLEME ===');
console.log(JSON.stringify(stats, null, 2));

if (APPLY_MODE) {
  const backupPath = `${DATA_PATH}.phase4-backup-${Date.now()}`;
  fs.copyFileSync(DATA_PATH, backupPath);
  const output = isArrayRoot ? items : { ...rawFile, lexemes: items };
  fs.writeFileSync(DATA_PATH, JSON.stringify(output, null, 2), 'utf8');
  fs.writeFileSync(path.resolve('./scripts/still-missing-en.json'), JSON.stringify(stillMissingEn, null, 2), 'utf8');
  console.log(`\n✅ Yedek oluşturuldu: ${backupPath}`);
  console.log(`✅ Güncellenmiş veri kaydedildi: ${DATA_PATH}`);
} else {
  console.log('\nℹ️ Uygulamak için: node scripts/enrich-phase4.mjs --apply');
}