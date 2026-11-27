#!/usr/bin/env node
/**
 * ADR-GOV-016 — Linguistic Governance Center rapor üreticisi
 * ============================================================
 * CLI denetim scripti: public/data/linguistic/*.json verisini tarar ve
 * UI'ın okuyacağı JSON raporlarını üretir (RULE-01):
 *
 *   public/admin-reports/health.json       — Veri Sağlığı
 *   public/admin-reports/roots-audit.json  — Kök Denetimi
 *   public/admin-reports/concepts-audit.json — Kavram Denetimi
 *   public/admin-reports/translations-audit.json — Çeviri Denetimi (v2)
 *   public/admin-reports/pos-audit.json    — POS Denetimi (v3)
 *   public/admin-reports/dialect-audit.json — Lehçe Denetimi (v3)
 *
 * Kurallar (ADR-GOV-016):
 * - RULE-01: Script JSON üretir, UI yalnızca okur; iş kuralları UI'ya taşınmaz.
 * - RULE-02: Her metrik metrik sözlüğünde tanımlıdır; uydurma sayı üretilmez.
 * - RULE-03: Her rapor generatedAt zaman damgası taşır.
 * - RULE-04: Bu script repo içinde sürümlenir; tek seferlik yerel
 *   scriptlere (ör. eski _scripts/durum_tek.py) bağımlılık yoktur.
 *
 * Metrik sözlüğü (tanımlar ADR-GOV-016'da):
 * - rootIdMissing      : rootId alanı boş olan LEXEME sayısı ("boş kök" DEĞİL)
 * - unusedRoots        : hiçbir lexeme'nin rootId/rootIds ile referans etmediği
 *                        KÖK sayısı (üyesiz/orphan kök — kök havuzunda)
 * - legacyConceptIdRecords: SSOT öncesi `conceptIds` dizisini hâlâ taşıyan kayıt
 * - wfDanglingConceptRefs: wordFamilies.conceptIds içinde hiçbir lexeme'nin
 *                        conceptId'si olarak geçmeyen (asılı) referans
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT_DIR = process.cwd();
const LEXEMES_PATH = path.join(ROOT_DIR, 'public', 'data', 'linguistic', 'lexemes.json');
const ROOTS_PATH = path.join(ROOT_DIR, 'public', 'data', 'linguistic', 'roots.json');
const WORD_FAMILIES_PATH = path.join(ROOT_DIR, 'public', 'data', 'linguistic', 'word_families.json');
const REPORTS_DIR = path.join(ROOT_DIR, 'public', 'admin-reports');

const SAMPLE_LIMIT = 50;

function pct(filled, total) {
  if (!total) return 0;
  return Math.round((filled / total) * 10000) / 100;
}

function asArray(v) {
  return Array.isArray(v) ? v : [];
}

// ---------------------------------------------------------------------------
// health.json — Veri Sağlığı
// ---------------------------------------------------------------------------
export function computeHealth(lexemes, roots, wordFamilies) {
  const rootIdSet = new Set(roots.map((r) => r.id));
  const wfIdSet = new Set(wordFamilies.map((w) => w.id));

  let duplicateIds = 0;
  let brokenRootRefs = 0;
  let brokenWordFamilyRefs = 0;
  let posEmpty = 0;
  let wfEmpty = 0;
  let rootEmpty = 0;
  let arabicEmpty = 0;
  let ipaEmpty = 0;
  let conceptEmpty = 0;
  let withExamples = 0;

  const seen = new Set();
  for (const x of lexemes) {
    if (seen.has(x.id)) duplicateIds += 1;
    seen.add(x.id);

    if (x.rootId && !rootIdSet.has(x.rootId)) brokenRootRefs += 1;
    for (const r of asArray(x.rootIds)) {
      if (!rootIdSet.has(r)) brokenRootRefs += 1;
    }
    if (x.wordFamilyId && !wfIdSet.has(x.wordFamilyId)) brokenWordFamilyRefs += 1;

    if (!x.pos && !x.partOfSpeech) posEmpty += 1;
    if (!x.wordFamilyId) wfEmpty += 1;
    if (!x.rootId) rootEmpty += 1;
    if (!x.translations || !x.translations.ar) arabicEmpty += 1;
    if (!x.ipa) ipaEmpty += 1;
    if (!x.conceptId) conceptEmpty += 1;
    if (asArray(x.examples).length > 0) withExamples += 1;
  }

  const total = lexemes.length;
  return {
    lexemes: total,
    roots: roots.length,
    wordFamilies: wordFamilies.length,
    duplicateIds,
    brokenRootRefs,
    brokenWordFamilyRefs,
    posEmpty,
    fill: {
      wordFamilyEmpty: wfEmpty,
      wordFamilyFillPct: pct(total - wfEmpty, total),
      rootEmpty,
      rootFillPct: pct(total - rootEmpty, total),
      arabicEmpty,
      arabicFillPct: pct(total - arabicEmpty, total),
      ipaEmpty,
      conceptEmpty,
      conceptFillPct: pct(total - conceptEmpty, total),
      withExamples,
      exampleCoveragePct: pct(withExamples, total),
    },
  };
}

// ---------------------------------------------------------------------------
// roots-audit.json — Kök Denetimi
// ---------------------------------------------------------------------------
export function computeRootsAudit(lexemes, roots, wordFamilies = []) {
  const rootIdSet = new Set(roots.map((r) => r.id));
  const usedRootIds = new Set();
  const usedWfIds = new Set();

  let rootIdMissing = 0;
  let rootIdsMissing = 0;
  let rootIdMissingWhenRootIdsPresent = 0;
  let rootIdMismatch = 0;
  let brokenRootRefs = 0;
  const rootIdMissingSamples = [];

  for (const x of lexemes) {
    const rid = x.rootId;
    const rids = asArray(x.rootIds);
    if (rid) usedRootIds.add(rid);
    for (const r of rids) usedRootIds.add(r);
    if (x.wordFamilyId) usedWfIds.add(x.wordFamilyId);

    if (!rid) {
      rootIdMissing += 1;
      if (rids.length > 0) rootIdMissingWhenRootIdsPresent += 1;
      if (rootIdMissingSamples.length < SAMPLE_LIMIT) rootIdMissingSamples.push(x.id);
    }
    if (rids.length === 0) rootIdsMissing += 1;
    if (rid && rids.length > 0 && rid !== rids[0]) rootIdMismatch += 1;
    if (rid && !rootIdSet.has(rid)) brokenRootRefs += 1;
    for (const r of rids) {
      if (!rootIdSet.has(r)) brokenRootRefs += 1;
    }
  }

  // Üyesiz kök: kök havuzunda olup hiçbir lexeme tarafından referans edilmeyen
  const orphanRoots = roots
    .filter((r) => !usedRootIds.has(r.id))
    .map((r) => ({
      id: r.id,
      form: r.form ?? null,
      primaryMeaning: r.primaryMeaning ?? null,
    }));

  // Üyesiz wordFamily: hiçbir lexeme'nin wordFamilyId'si ile referans edilmeyen
  const orphanWordFamilies = wordFamilies
    .filter((w) => !usedWfIds.has(w.id))
    .map((w) => ({ id: w.id, rootForm: w.rootForm ?? null }));

  return {
    rootIdMissing,
    rootIdsMissing,
    rootIdMissingWhenRootIdsPresent,
    rootIdMismatch,
    brokenRootRefs,
    unusedRoots: orphanRoots.length,
    orphanRoots,
    unusedWordFamilies: orphanWordFamilies.length,
    orphanWordFamilies,
    rootIdMissingSamples,
  };
}

// ---------------------------------------------------------------------------
// concepts-audit.json — Kavram Denetimi
// ---------------------------------------------------------------------------
export function computeConceptsAudit(lexemes, wordFamilies) {
  let emptyConceptIds = 0;
  let legacyConceptIdRecords = 0;
  let legacyConceptIdValues = 0;
  let conceptIdMismatch = 0;
  let conceptFieldMismatch = 0;

  const emptyConceptSamples = [];
  const legacyRecordSamples = [];

  for (const x of lexemes) {
    if (!x.conceptId) {
      emptyConceptIds += 1;
      if (emptyConceptSamples.length < SAMPLE_LIMIT) emptyConceptSamples.push(x.id);
    }
    const cids = asArray(x.conceptIds);
    if (cids.length > 0) {
      legacyConceptIdRecords += 1;
      legacyConceptIdValues += cids.length;
      if (x.conceptId !== cids[0]) conceptIdMismatch += 1;
      if (legacyRecordSamples.length < SAMPLE_LIMIT) {
        legacyRecordSamples.push({ id: x.id, conceptId: x.conceptId ?? null, conceptIds: cids });
      }
    }
    if (x.concept && x.conceptId && x.concept !== x.conceptId) conceptFieldMismatch += 1;
  }

  // Asılı WF concept referansı: WF.conceptIds içinde hiçbir lexeme'nin
  // conceptId'si olarak geçmeyen değer
  const lexConcepts = new Set(lexemes.map((x) => x.conceptId).filter(Boolean));
  let wfDanglingConceptRefs = 0;
  let wfDanglingConceptValues = 0;
  const danglingSet = new Set();
  const wfDanglingSamples = [];
  for (const w of wordFamilies) {
    const cids = asArray(w.conceptIds);
    if (cids.length === 0) continue;
    const dangling = cids.filter((c) => !lexConcepts.has(c));
    if (dangling.length > 0) {
      wfDanglingConceptRefs += 1;
      for (const d of dangling) danglingSet.add(d);
      if (wfDanglingSamples.length < 30) {
        wfDanglingSamples.push({ wfId: w.id, dangling: dangling.slice(0, 10) });
      }
    }
  }
  wfDanglingConceptValues = danglingSet.size;

  return {
    emptyConceptIds,
    legacyConceptIdRecords,
    legacyConceptIdValues,
    conceptIdMismatch,
    conceptFieldMismatch,
    wfDanglingConceptRefs,
    wfDanglingConceptValues,
    emptyConceptSamples,
    legacyRecordSamples,
    wfDanglingSamples,
  };
}

// ---------------------------------------------------------------------------
// translations-audit.json — Çeviri Denetimi (v2)
// ---------------------------------------------------------------------------
// Metrik sözlüğü (ADR-GOV-016): tüm göstergeler "şüpheli"dir — ekran insan
// incelemesi için aday listeler, kesin hüküm değildir (anlam değişikliği
// insan kararı ilkesi).
const CYRILLIC_RE = /[Ѐ-ӿ]/;
const ARABIC_RE = /[؀-ۿ]/;
const LATIN_WORD_RE = /[a-zA-Z]{3,}/;
// TR alanında İngilizce şüpheli: sabit fonksiyon kelimesi listesi (Türkçe
// homografları — "her" gibi — bilinçli olarak hariçtir).
export const TR_ENGLISH_WORDS_RE =
  /\b(the|and|of|to|with|for|from|not|someone|something|who|what|when|where|which|make|makes|have|has|him|them|they|you|your|that|this|these|those|there|here|person|people|thing|place|time|very|also|into|onto|upon|back|again|still|just|only|even|because|while|during|between|through|against|without|within|about|after|before|under|over|near|next|same|other|another|such|own)\b/i;

export function computeTranslationsAudit(lexemes) {
  let trCyrillic = 0;
  let trArabic = 0;
  let enCyrillic = 0;
  let enArabic = 0;
  let ruLatinWords = 0;
  let trEnglishSuspect = 0;
  let trEqualsEn = 0;
  let trEmpty = 0;
  let enEmpty = 0;
  let arEmpty = 0;
  let ruEmpty = 0;

  const samples = {
    trCyrillic: [],
    trArabic: [],
    enCyrillic: [],
    enArabic: [],
    ruLatinWords: [],
    trEnglishSuspect: [],
    trEqualsEn: [],
  };

  const push = (key, x, value) => {
    if (samples[key].length < SAMPLE_LIMIT) {
      samples[key].push({ id: x.id, value: String(value).slice(0, 120) });
    }
  };

  for (const x of lexemes) {
    const t = x.translations || {};
    const tr = String(t.tr || '').trim();
    const en = String(t.en || '').trim();
    const ru = String(t.ru || '').trim();
    const ar = String(t.ar || '').trim();

    if (!tr) trEmpty += 1;
    if (!en) enEmpty += 1;
    if (!ar) arEmpty += 1;
    if (!ru) ruEmpty += 1;

    if (tr && CYRILLIC_RE.test(tr)) { trCyrillic += 1; push('trCyrillic', x, tr); }
    if (tr && ARABIC_RE.test(tr)) { trArabic += 1; push('trArabic', x, tr); }
    if (en && CYRILLIC_RE.test(en)) { enCyrillic += 1; push('enCyrillic', x, en); }
    if (en && ARABIC_RE.test(en)) { enArabic += 1; push('enArabic', x, en); }
    if (ru && LATIN_WORD_RE.test(ru)) { ruLatinWords += 1; push('ruLatinWords', x, ru); }
    if (tr && TR_ENGLISH_WORDS_RE.test(tr)) { trEnglishSuspect += 1; push('trEnglishSuspect', x, tr); }
    if (tr && en && tr.toLowerCase() === en.toLowerCase()) {
      trEqualsEn += 1;
      push('trEqualsEn', x, tr);
    }
  }

  return {
    trCyrillic,
    trArabic,
    enCyrillic,
    enArabic,
    ruLatinWords,
    trEnglishSuspect,
    trEqualsEn,
    trEmpty,
    enEmpty,
    arEmpty,
    ruEmpty,
    samples,
  };
}
// ---------------------------------------------------------------------------
// pos-audit.json — POS Denetimi (v3)
// ---------------------------------------------------------------------------
const ALLOWED_POS_SET = new Set([
  'noun', 'verb', 'adj', 'adv', 'phrase', 'propn', 'interj',
  'num', 'part', 'pron', 'prefix', 'adp', 'symbol', 'conj',
]);

export function computePosAudit(lexemes) {
  const posDistribution = {};
  let posEmpty = 0;
  let invalidPos = 0;
  let posMismatch = 0;

  // Form bazlı duplikasyon grubu (metrik sözlüğü): aynı `form` değerini taşıyan
  // birden fazla kayıt — POS'u farklı olsa bile. (2026-11-27'de bu tanım,
  // Baş Mimar oturumundaki historik "14 form / 29 kayıt" değeriyle birebir
  // örtüşecek şekilde doğrulandı; RULE-07 dört şartı da sağlanır.)
  const byForm = new Map();
  for (const x of lexemes) {
    const p = x.pos || x.partOfSpeech || '';
    if (!x.pos && !x.partOfSpeech) posEmpty += 1;
    else {
      if (p && !ALLOWED_POS_SET.has(p)) invalidPos += 1;
      if (x.pos !== x.partOfSpeech) posMismatch += 1;
    }
    posDistribution[p || '(boş)'] = (posDistribution[p || '(boş)'] || 0) + 1;

    const form = x.form || '';
    if (form) {
      const arr = byForm.get(form) ?? [];
      arr.push(x.id);
      byForm.set(form, arr);
    }
  }

  const duplicateGroups = [];
  let formDuplicateRecords = 0;
  for (const [form, ids] of byForm) {
    if (ids.length > 1) {
      formDuplicateRecords += ids.length;
      if (duplicateGroups.length < SAMPLE_LIMIT) {
        duplicateGroups.push({ form, ids });
      }
    }
  }

  return {
    posDistribution,
    posEmpty,
    invalidPos,
    posMismatch,
    formDuplicateGroups: [...byForm.values()].filter((ids) => ids.length > 1).length,
    formDuplicateRecords,
    duplicateGroups,
  };
}

// ---------------------------------------------------------------------------
// dialect-audit.json — Lehçe Denetimi (v3)
// ---------------------------------------------------------------------------
// Metrik sözlüğü (ADR-GOV-016): DIALECT-AUDIT-001'in kalıcılaşmış hali.
// - Apazhev işareti: id veya notes içinde "apazhev" geçen kayıt.
// - Çoklu-lehçe form: aynı form değerinin birden fazla dialect kaydında
//   geçmesi (COMMON birleştirme adayı görünümü — şüpheli, hüküm insan kararı).
export function computeDialectAudit(lexemes) {
  const ALLOWED_DIALECTS_SET = new Set(['KBD', 'ADY', 'COMMON']);
  const dialectDistribution = {};
  let invalidDialect = 0;
  let apazhevMarked = 0;
  let apazhevAdy = 0;

  const byForm = new Map();
  const apazhevSamples = [];

  for (const x of lexemes) {
    const d = x.dialect || '(boş)';
    dialectDistribution[d] = (dialectDistribution[d] || 0) + 1;
    if (!ALLOWED_DIALECTS_SET.has(x.dialect)) invalidDialect += 1;

    const isApazhev = /apazhev/i.test(x.id || '') || /apazhev/i.test(String(x.notes || ''));
    if (isApazhev) {
      apazhevMarked += 1;
      if (x.dialect === 'ADY') {
        apazhevAdy += 1;
        if (apazhevSamples.length < SAMPLE_LIMIT) apazhevSamples.push({ id: x.id, form: x.form });
      }
    }

    const form = x.form || '';
    if (form) {
      const set = byForm.get(form) ?? new Set();
      set.add(x.dialect || '(boş)');
      byForm.set(form, set);
    }
  }

  let multiDialectForms = 0;
  const crossDialectPairs = {};
  const multiDialectSamples = [];
  for (const [form, dialects] of byForm) {
    if (dialects.size > 1) {
      multiDialectForms += 1;
      const combo = [...dialects].sort().join('+');
      crossDialectPairs[combo] = (crossDialectPairs[combo] || 0) + 1;
      if (multiDialectSamples.length < SAMPLE_LIMIT) {
        multiDialectSamples.push({ form, dialects: [...dialects].sort() });
      }
    }
  }

  return {
    dialectDistribution,
    invalidDialect,
    apazhevMarked,
    apazhevAdy,
    apazhevSamples,
    multiDialectForms,
    crossDialectPairs,
    multiDialectSamples,
  };
}
// ---------------------------------------------------------------------------
// CLI
// ---------------------------------------------------------------------------
function readJson(filePath) {
  const raw = fs.readFileSync(filePath, 'utf-8').replace(/^﻿/, '');
  return JSON.parse(raw);
}

function writeReport(name, data) {
  const payload = { generatedAt: new Date().toISOString(), ...data };
  const out = path.join(REPORTS_DIR, name);
  fs.writeFileSync(out, JSON.stringify(payload, null, 2) + '\n', 'utf-8');
  return out;
}

function main() {
  const lexemes = readJson(LEXEMES_PATH);
  const roots = readJson(ROOTS_PATH);
  const wordFamilies = readJson(WORD_FAMILIES_PATH);

  fs.mkdirSync(REPORTS_DIR, { recursive: true });

  const healthData = computeHealth(lexemes, roots, wordFamilies);
  const rootsData = computeRootsAudit(lexemes, roots, wordFamilies);
  const conceptsData = computeConceptsAudit(lexemes, wordFamilies);
  const translationsData = computeTranslationsAudit(lexemes);
  const posData = computePosAudit(lexemes);
  const dialectData = computeDialectAudit(lexemes);

  const health = writeReport('health.json', healthData);
  const rootsAudit = writeReport('roots-audit.json', rootsData);
  const conceptsAudit = writeReport('concepts-audit.json', conceptsData);
  const translationsAudit = writeReport('translations-audit.json', translationsData);
  const posAudit = writeReport('pos-audit.json', posData);
  const dialectAudit = writeReport('dialect-audit.json', dialectData);

  console.log('ADR-GOV-016 raporlari yazildi:');
  for (const p of [health, rootsAudit, conceptsAudit, translationsAudit, posAudit, dialectAudit]) {
    console.log('  -', path.relative(ROOT_DIR, p));
  }

  // POC başarı kriteri (ADR-GOV-016 Acceptance Criteria): terminal çıktısı ile
  // yönetim ekranı AYNI sayıyı gösterir — fark 0. Aşağıdaki özet, ekranların
  // okuduğu JSON ile aynı veriden yazılır.
  const tr = (n) => n.toLocaleString('tr-TR');
  console.log('');
  console.log('=== VERI SAGLIGI (health.json) ===');
  console.log(`  Lexeme: ${tr(healthData.lexemes)} | Kök: ${tr(healthData.roots)} | WF: ${tr(healthData.wordFamilies)}`);
  console.log(`  Mükerrer ID: ${healthData.duplicateIds} | Kırık kök ref: ${healthData.brokenRootRefs} | Kırık WF ref: ${healthData.brokenWordFamilyRefs}`);
  console.log(`  WF boş: ${tr(healthData.fill.wordFamilyEmpty)} | rootId boş: ${tr(healthData.fill.rootEmpty)} | AR boş: ${tr(healthData.fill.arabicEmpty)} | conceptId boş: ${tr(healthData.fill.conceptEmpty)}`);
  console.log('=== KOK DENETIMI (roots-audit.json) ===');
  console.log(`  rootId boş lexeme: ${tr(rootsData.rootIdMissing)} | rootIds boş lexeme: ${tr(rootsData.rootIdsMissing)}`);
  console.log(`  rootId != rootIds[0]: ${rootsData.rootIdMismatch} | Kırık root referansı: ${rootsData.brokenRootRefs}`);
  console.log(`  Üyesiz root: ${rootsData.unusedRoots} | Üyesiz wordFamily: ${rootsData.unusedWordFamilies}`);
  console.log('=== KAVRAM DENETIMI (concepts-audit.json) ===');
  console.log(`  conceptId boş: ${conceptsData.emptyConceptIds} | Legacy conceptIds kaydı: ${conceptsData.legacyConceptIdRecords} (${conceptsData.legacyConceptIdValues} değer)`);
  console.log(`  conceptId != conceptIds[0]: ${conceptsData.conceptIdMismatch} | concept != conceptId: ${conceptsData.conceptFieldMismatch}`);
  console.log(`  WF asılı concept referansı: ${conceptsData.wfDanglingConceptRefs} aile / ${conceptsData.wfDanglingConceptValues} benzersiz değer`);
  console.log('=== CEVIRI DENETIMI (translations-audit.json) ===');
  console.log(`  TR'de Kiril: ${tr(translationsData.trCyrillic)} | TR'de Arapça: ${tr(translationsData.trArabic)} | TR İngilizce şüpheli: ${tr(translationsData.trEnglishSuspect)}`);
  console.log(`  EN'de Kiril: ${tr(translationsData.enCyrillic)} | EN'de Arapça: ${translationsData.enArabic} | RU'da Latin kelime: ${tr(translationsData.ruLatinWords)}`);
  console.log(`  TR == EN: ${tr(translationsData.trEqualsEn)} | TR boş: ${translationsData.trEmpty} | EN boş: ${translationsData.enEmpty} | AR boş: ${tr(translationsData.arEmpty)} | RU boş: ${translationsData.ruEmpty}`);
  console.log('=== POS DENETIMI (pos-audit.json) ===');
  console.log(`  Form duplikasyon grubu: ${posData.formDuplicateGroups} form / ${posData.formDuplicateRecords} kayıt`);
  console.log(`  POS boş: ${posData.posEmpty} | Geçersiz POS: ${posData.invalidPos} | POS çakışması: ${posData.posMismatch}`);
  console.log(`  POS dağılımı: ${JSON.stringify(posData.posDistribution)}`);
  console.log('=== LEHCE DENETIMI (dialect-audit.json) ===');
  console.log(`  Dağılım: ${JSON.stringify(dialectData.dialectDistribution)} | Geçersiz dialect: ${dialectData.invalidDialect}`);
  console.log(`  Apazhev işaretli: ${dialectData.apazhevMarked} | Apazhev olup ADY olan: ${dialectData.apazhevAdy}`);
  console.log(`  Çoklu-lehçe form: ${dialectData.multiDialectForms} | Kesişim: ${JSON.stringify(dialectData.crossDialectPairs)}`);
}

const isMain =
  process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (isMain) {
  main();
}
