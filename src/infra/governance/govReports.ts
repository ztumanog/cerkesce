import fs from 'fs';
import path from 'path';

/**
 * ADR-GOV-016 — Linguistic Governance Center rapor yükleyici.
 *
 * RULE-01: UI yalnızca scripts/report-governance.mjs'nin ürettiği JSON'u
 * okur; denetim iş kuralları burada değil script'tedir.
 * RULE-03: Her rapor generatedAt taşır; eksik rapor null döner (uydurma yok).
 */

export interface HealthFill {
  wordFamilyEmpty: number;
  wordFamilyFillPct: number;
  rootEmpty: number;
  rootFillPct: number;
  arabicEmpty: number;
  arabicFillPct: number;
  ipaEmpty: number;
  conceptEmpty: number;
  conceptFillPct: number;
  withExamples: number;
  exampleCoveragePct: number;
}

export interface HealthReport {
  generatedAt: string;
  lexemes: number;
  roots: number;
  wordFamilies: number;
  duplicateIds: number;
  brokenRootRefs: number;
  brokenWordFamilyRefs: number;
  posEmpty: number;
  fill: HealthFill;
}

export interface OrphanRoot {
  id: string;
  form: string | null;
  primaryMeaning: string | null;
}

export interface RootsAuditReport {
  generatedAt: string;
  rootIdMissing: number;
  rootIdsMissing: number;
  rootIdMissingWhenRootIdsPresent: number;
  rootIdMismatch: number;
  brokenRootRefs: number;
  unusedRoots: number;
  orphanRoots: OrphanRoot[];
  unusedWordFamilies: number;
  orphanWordFamilies: OrphanWordFamily[];
  rootIdMissingSamples: string[];
}

export interface OrphanWordFamily {
  id: string;
  rootForm: string | null;
}

export interface LegacyRecordSample {
  id: string;
  conceptId: string | null;
  conceptIds: string[];
}

export interface WfDanglingSample {
  wfId: string;
  dangling: string[];
}

export interface ConceptsAuditReport {
  generatedAt: string;
  emptyConceptIds: number;
  legacyConceptIdRecords: number;
  legacyConceptIdValues: number;
  conceptIdMismatch: number;
  conceptFieldMismatch: number;
  wfDanglingConceptRefs: number;
  wfDanglingConceptValues: number;
  emptyConceptSamples: string[];
  legacyRecordSamples: LegacyRecordSample[];
  wfDanglingSamples: WfDanglingSample[];
}

export interface TranslationSample {
  id: string;
  value: string;
  hits?: string[];
}

export interface TranslationsAuditReport {
  generatedAt: string;
  trCyrillic: number;
  trArabic: number;
  enCyrillic: number;
  enArabic: number;
  ruLatinWords: number;
  /** A: TR alanında İngilizce kelime var, Türkçe karakter/Kiril yok */
  trEnglishFull: number;
  /** B: TR alanında İngilizce kelime var, Türkçe karakter veya Kiril de var (karma) */
  trEnglishMixed: number;
  trEqualsEn: number;
  trEmpty: number;
  enEmpty: number;
  arEmpty: number;
  ruEmpty: number;
  samples: {
    trCyrillic: TranslationSample[];
    trArabic: TranslationSample[];
    enCyrillic: TranslationSample[];
    enArabic: TranslationSample[];
    ruLatinWords: TranslationSample[];
    trEnglishFull: TranslationSample[];
    trEnglishMixed: TranslationSample[];
    trEqualsEn: TranslationSample[];
  };
}

export interface PosDuplicateGroup {
  form: string;
  ids: string[];
}

export interface PosAuditReport {
  generatedAt: string;
  posDistribution: Record<string, number>;
  posEmpty: number;
  invalidPos: number;
  posMismatch: number;
  formDuplicateGroups: number;
  formDuplicateRecords: number;
  duplicateGroups: PosDuplicateGroup[];
}

export interface ApazhevSample {
  id: string;
  form: string;
}

export interface MultiDialectSample {
  form: string;
  dialects: string[];
}

export interface DialectAuditReport {
  generatedAt: string;
  dialectDistribution: Record<string, number>;
  invalidDialect: number;
  apazhevMarked: number;
  apazhevAdy: number;
  apazhevSamples: ApazhevSample[];
  multiDialectForms: number;
  crossDialectPairs: Record<string, number>;
  multiDialectSamples: MultiDialectSample[];
}

/** Rapor dosyasını okur; yoksa/hatalıysa null döner. */
export function loadGovReport<T>(name: string): T | null {
  try {
    const file = path.join(process.cwd(), 'public', 'admin-reports', name);
    const raw = fs.readFileSync(file, 'utf-8');
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

/** ISO zaman damgasını Türkçe kısa gösterime çevirir. */
export function formatGeneratedAt(iso: string): string {
  try {
    return new Date(iso).toLocaleString('tr-TR', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
  } catch {
    return iso;
  }
}

/**
 * ADR-GOV-016 — Seçenek D: Bayatlık göstergesi.
 *
 * lexemes.json dosyasının değiştirilme zamanı raporun generatedAt'inden
 * yeniyse rapor bayattır. Bu yalnızca bir UYARI üretir; hesap yapılmaz
 * (RULE-05) ve ekran yine salt okunurdur.
 */
export function isGovReportStale(report: { generatedAt: string }): boolean {
  try {
    const lexemesFile = path.join(
      process.cwd(), 'public', 'data', 'linguistic', 'lexemes.json',
    );
    const lexMtime = fs.statSync(lexemesFile).mtimeMs;
    const generated = Date.parse(report.generatedAt);
    if (!Number.isFinite(generated)) return false;
    // 1 sn tolerans: aynı anda üretilen rapor ile yazım çakışması
    return lexMtime > generated + 1000;
  } catch {
    return false;
  }
}
