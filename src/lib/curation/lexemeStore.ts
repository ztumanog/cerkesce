// Sprint 2A.1 + 2A.3 + S2-005 + DDD Value Object Entegrasyonu
// SSoT: public/data/linguistic/lexemes.json (ADR-LEX-001)
// S2-005: Referans + Value Object validasyonu + reason/editor zorunlulugu + backup + audit

import fs from "fs";
import path from "path";
import { scheduleReportRefresh } from "../../infra/governance/reportRefresh";
import {
  ConceptId,
  RootValue,
  WordFamilyId,
  LexemeIdentity,
  type LexemeDialect,
} from "@/domain/shared/value-objects";

// ============================================================
// TIPLER
// ============================================================

export interface LexemeSummary {
  id: string;
  form: string;
  dialect?: LexemeDialect;
  rootIds: string[];
  wordFamilyId: string;
  conceptId?: string;
  partOfSpeech?: string;
  ipa?: string;
  technicalDebt?: boolean;
}

export interface LexemePatch {
  form?: string;
  dialect?: LexemeDialect | string;
  rootIds?: string[];
  wordFamilyId?: string;
  conceptId?: string;
  partOfSpeech?: string;
  ipa?: string;
  technicalDebt?: boolean;
  notes?: string;
}

export interface ApplyOptions {
  reason: string;   // S2-005 T4: zorunlu
  editor: string;   // S2-005 T5: zorunlu
  dryRun?: boolean;
}

export interface ApplyResult {
  success: boolean;
  error?: string;
  dryRun?: boolean;
  diff?: { field: string; oldValue: any; newValue: any }[];
  appliedFields?: string[];
}

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

// ============================================================
// YOLLAR
// ============================================================

const DATA_DIR = path.join(process.cwd(), "public", "data", "linguistic");
const LEXEMES_PATH = path.join(DATA_DIR, "lexemes.json");
const ROOTS_PATH = path.join(DATA_DIR, "roots.json");
const FAMILIES_PATH = path.join(DATA_DIR, "word_families.json");
const AUDIT_LOG_PATH = path.join(DATA_DIR, "audit_log.jsonl");

// ============================================================
// OKUMA KATMANI (2A.1 + Value Object Normalizasyonu)
// ============================================================

let cache: LexemeSummary[] | null = null;
let rawCache: any[] | null = null;
let cacheMtime = 0;

function safeDialect(raw: unknown): LexemeDialect | undefined {
  if (!raw || typeof raw !== "string") return undefined;
  try {
    return LexemeIdentity.normalizeDialect(raw);
  } catch {
    return undefined;
  }
}

export function getAllLexemes(): LexemeSummary[] {
  const stat = fs.statSync(LEXEMES_PATH);
  if (cache && stat.mtimeMs === cacheMtime) return cache;

  const raw = fs.readFileSync(LEXEMES_PATH, "utf-8").replace(/^\uFEFF/, "");
  const data = JSON.parse(raw);
  const list: any[] = Array.isArray(data) ? data : data.lexemes ?? [];

  rawCache = list;
  cache = list.map((l: any) => ({
    id: String(l.id ?? ""),
    form: String(l.form ?? ""),
    dialect: safeDialect(l.dialect),
    rootIds: Array.isArray(l.rootIds) ? l.rootIds.map(String) : [],
    wordFamilyId: String(l.wordFamilyId ?? ""),
    conceptId: l.conceptId ? String(l.conceptId) : undefined,
    partOfSpeech: l.partOfSpeech ? String(l.partOfSpeech) : undefined,
    ipa: l.ipa ? String(l.ipa) : undefined,
    technicalDebt: !!l.technicalDebt,
  }));
  cacheMtime = stat.mtimeMs;
  return cache;
}

export function getLexemeById(id: string): LexemeSummary | undefined {
  return getAllLexemes().find((l) => l.id === id);
}

export function getRawLexeme(id: string): any | undefined {
  getAllLexemes();
  return rawCache?.find((l: any) => l.id === id);
}

// ============================================================
// REFERANS & VALUE OBJECT VALIDASYONU (S2-005 + DDD)
// ============================================================

let rootIdSet: Set<string> | null = null;
let rootMtime = 0;
let familyIdSet: Set<string> | null = null;
let familyMtime = 0;

function getRootIdSet(): Set<string> {
  const stat = fs.statSync(ROOTS_PATH);
  if (rootIdSet && stat.mtimeMs === rootMtime) return rootIdSet;
  const data = JSON.parse(fs.readFileSync(ROOTS_PATH, "utf-8").replace(/^\uFEFF/, ""));
  const list: any[] = Array.isArray(data) ? data : data.roots ?? [];
  rootIdSet = new Set(list.map((r: any) => String(r.id ?? r)));
  rootMtime = stat.mtimeMs;
  return rootIdSet;
}

function getFamilyIdSet(): Set<string> {
  const stat = fs.statSync(FAMILIES_PATH);
  if (familyIdSet && stat.mtimeMs === familyMtime) return familyIdSet;
  const data = JSON.parse(fs.readFileSync(FAMILIES_PATH, "utf-8").replace(/^\uFEFF/, ""));
  const list: any[] = Array.isArray(data)
    ? data
    : data.families ?? data.wordFamilies ?? data.items ?? [];
  familyIdSet = new Set(list.map((f: any) => String(f.id)));
  familyMtime = stat.mtimeMs;
  return familyIdSet;
}

export function validateReferences(patch: LexemePatch): ValidationResult {
  const errors: string[] = [];

  if (patch.form !== undefined) {
    const normalized = RootValue.normalizeCyrillic(String(patch.form));
    if (!normalized) {
      errors.push("form cannot be empty");
    }
  }

  if (patch.dialect !== undefined) {
    try {
      LexemeIdentity.normalizeDialect(String(patch.dialect));
    } catch (err: any) {
      errors.push(err?.message ?? `Invalid dialect: ${patch.dialect}`);
    }
  }

  if (patch.conceptId !== undefined) {
    try {
      ConceptId.create(String(patch.conceptId));
    } catch (err: any) {
      errors.push(err?.message ?? `Invalid conceptId: ${patch.conceptId}`);
    }
  }

  if (patch.rootIds !== undefined) {
    if (!Array.isArray(patch.rootIds)) {
      errors.push("rootIds must be an array");
    } else {
      const roots = getRootIdSet();
      for (const rid of patch.rootIds) {
        const cleanRid = String(rid).trim().toUpperCase();
        if (!/^R-[A-Z0-9_-]+$/.test(cleanRid)) {
          errors.push(`Invalid rootId format: ${rid}`);
        } else if (!roots.has(cleanRid)) {
          errors.push(`Root not found: ${rid}`);
        }
      }
    }
  }

  if (patch.wordFamilyId !== undefined) {
    try {
      const wf = WordFamilyId.create(String(patch.wordFamilyId));
      const fams = getFamilyIdSet();
      if (!fams.has(wf.value)) {
        errors.push(`WordFamily not found: ${patch.wordFamilyId}`);
      }
    } catch (err: any) {
      errors.push(err?.message ?? `Invalid wordFamilyId: ${patch.wordFamilyId}`);
    }
  }

  return { valid: errors.length === 0, errors };
}

function normalizePatchWithValueObjects(patch: LexemePatch): LexemePatch {
  const normalized: LexemePatch = { ...patch };

  if (normalized.form !== undefined) {
    normalized.form = RootValue.normalizeCyrillic(normalized.form);
  }
  if (normalized.dialect !== undefined) {
    normalized.dialect = LexemeIdentity.normalizeDialect(String(normalized.dialect));
  }
  if (normalized.conceptId !== undefined) {
    normalized.conceptId = ConceptId.create(normalized.conceptId).value;
  }
  if (normalized.wordFamilyId !== undefined) {
    normalized.wordFamilyId = WordFamilyId.create(normalized.wordFamilyId).value;
  }
  if (Array.isArray(normalized.rootIds)) {
    normalized.rootIds = Array.from(new Set(normalized.rootIds.map((r) => String(r).trim().toUpperCase()).filter(Boolean)));
  }

  return normalized;
}

// ============================================================
// CIFT KAYIT (DEDUPLICATION) KORUMA KATMANI
// ============================================================

export function buildLexemeDedupKey(
  form: string,
  dialect?: unknown,
  partOfSpeech?: string
): string {
  const normForm = RootValue.normalizeCyrillic(String(form ?? ""));
  const normDialect = safeDialect(dialect) ?? "COMMON";
  const normPos = String(partOfSpeech ?? "").trim().toLowerCase();
  return `${normDialect}:${normForm}:${normPos}`;
}

export function findDuplicateLexeme(
  form: string,
  dialect?: unknown,
  partOfSpeech?: string,
  excludeId?: string
): LexemeSummary | undefined {
  const targetKey = buildLexemeDedupKey(form, dialect, partOfSpeech);
  if (targetKey.endsWith("::")) return undefined;
  return getAllLexemes().find(
    (item) =>
      item.id !== excludeId &&
      buildLexemeDedupKey(item.form, item.dialect, item.partOfSpeech) === targetKey
  );
}

export interface UpsertLexemeInput extends LexemePatch {
  id?: string;
  form: string;
  translations?: { tr?: string; en?: string; ru?: string };
  status?: string;
}

export interface UpsertOptions extends ApplyOptions {
  rejectOnDuplicate?: boolean;
}

// ============================================================
// YAZMA KATMANI (2A.3 + S2-005 hardening + Value Object Guard)
// ============================================================

const ALLOWED_FIELDS: (keyof LexemePatch)[] = [
  "form",
  "dialect",
  "rootIds",
  "wordFamilyId",
  "conceptId",
  "partOfSpeech",
  "ipa",
  "technicalDebt",
  "notes",
];

export function updateLexeme(
  id: string,
  patch: LexemePatch,
  options: ApplyOptions
): ApplyResult {
  const reason = options.reason?.trim();
  if (!reason) {
    return { success: false, error: "Reason is required" };
  }

  const editor = options.editor?.trim();
  if (!editor) {
    return { success: false, error: "Editor is required" };
  }

  const unknown = Object.keys(patch).filter(
    (k) => !ALLOWED_FIELDS.includes(k as keyof LexemePatch)
  );
  if (unknown.length > 0) {
    return { success: false, error: `Unknown fields: ${unknown.join(", ")}` };
  }

  const validation = validateReferences(patch);
  if (!validation.valid) {
    return { success: false, error: validation.errors.join("; ") };
  }

  const canonicalPatch = normalizePatchWithValueObjects(patch);

  const lexeme = getRawLexeme(id);
  if (!lexeme) {
    return { success: false, error: `Lexeme not found: ${id}` };
  }

  const nextForm = canonicalPatch.form ?? lexeme.form;
  const nextDialect = canonicalPatch.dialect ?? lexeme.dialect;
  const nextPos = canonicalPatch.partOfSpeech ?? lexeme.partOfSpeech;
  const conflict = findDuplicateLexeme(nextForm, nextDialect, nextPos, id);
  if (conflict) {
    return {
      success: false,
      error: `Duplicate lexeme conflict with ${conflict.id} (${conflict.form}, ${conflict.partOfSpeech ?? "no-pos"})`,
    };
  }

  const diff: { field: string; oldValue: any; newValue: any }[] = [];
  for (const field of ALLOWED_FIELDS) {
    if (canonicalPatch[field] !== undefined) {
      const oldValue = (lexeme as any)[field];
      const newValue = canonicalPatch[field];
      if (JSON.stringify(oldValue) !== JSON.stringify(newValue)) {
        diff.push({ field, oldValue, newValue });
      }
    }
  }
  if (diff.length === 0) {
    return { success: true, dryRun: options.dryRun, diff: [], appliedFields: [] };
  }

  if (options.dryRun) {
    return { success: true, dryRun: true, diff };
  }

  const ts = new Date().toISOString().replace(/[^0-9]/g, "").slice(0, 14);
  const backupPath = `${LEXEMES_PATH}.bak_${ts}`;
  fs.copyFileSync(LEXEMES_PATH, backupPath);

  for (const d of diff) {
    (lexeme as any)[d.field] = d.newValue;
  }
  fs.writeFileSync(LEXEMES_PATH, JSON.stringify(rawCache, null, 2), "utf-8");

  cache = null;
  rawCache = null;
  cacheMtime = 0;

  // ADR-GOV-016 Seçenek C: veri değişti — governance raporları arka planda yenilenir
  scheduleReportRefresh();

  const auditEntry = {
    timestamp: new Date().toISOString(),
    lexemeId: id,
    fields: diff.map((d) => d.field),
    changes: diff,
    reason,
    editor,
    source: "curation-ui",
    action: "UPDATE",
  };
  fs.appendFileSync(AUDIT_LOG_PATH, JSON.stringify(auditEntry) + "\n", "utf-8");

  return {
    success: true,
    appliedFields: diff.map((d) => d.field),
  };
}

export function upsertLexeme(
  input: UpsertLexemeInput,
  options: UpsertOptions
): ApplyResult & { id?: string; action?: "CREATED" | "MERGED" } {
  const reason = options.reason?.trim();
  if (!reason) return { success: false, error: "Reason is required" };
  const editor = options.editor?.trim();
  if (!editor) return { success: false, error: "Editor is required" };

  const normalizedForm = RootValue.normalizeCyrillic(String(input.form ?? ""));
  if (!normalizedForm) return { success: false, error: "form cannot be empty" };

  const existing = findDuplicateLexeme(normalizedForm, input.dialect, input.partOfSpeech);
  if (existing) {
    if (options.rejectOnDuplicate) {
      return {
        success: false,
        error: `Duplicate lexeme already exists: ${existing.id} (${existing.form})`,
      };
    }
    const { id: _id, translations: _tr, status: _st, ...patchFields } = input;
    const mergedRootIds = Array.from(
      new Set([...(existing.rootIds ?? []), ...(patchFields.rootIds ?? [])])
    );
    const res = updateLexeme(
      existing.id,
      { ...patchFields, ...(mergedRootIds.length > 0 ? { rootIds: mergedRootIds } : {}) },
      options
    );
    return { ...res, id: existing.id, action: "MERGED" };
  }

  const { id, translations, status, ...patchOnly } = input;
  const validation = validateReferences(patchOnly);
  if (!validation.valid) {
    return { success: false, error: validation.errors.join("; ") };
  }
  const canonical = normalizePatchWithValueObjects(patchOnly);
  getAllLexemes();
  const newId =
    (id && id.trim()) ||
    `L-CURATED-${Date.now().toString(36).toUpperCase()}`;

  if (rawCache?.some((item: any) => item.id === newId)) {
    return { success: false, error: `Lexeme ID already exists: ${newId}` };
  }

  const newRecord: any = {
    id: newId,
    form: normalizedForm,
    dialect: canonical.dialect ?? "KBD",
    rootIds: canonical.rootIds ?? [],
    ...(canonical.wordFamilyId ? { wordFamilyId: canonical.wordFamilyId } : {}),
    ...(canonical.conceptId ? { conceptId: canonical.conceptId } : {}),
    ...(canonical.partOfSpeech ? { partOfSpeech: canonical.partOfSpeech } : {}),
    ...(canonical.ipa ? { ipa: canonical.ipa } : {}),
    ...(translations ? { translations } : {}),
    ...(canonical.notes ? { notes: canonical.notes } : {}),
    status: status ?? "VERIFIED",
  };

  if (options.dryRun) {
    return { success: true, dryRun: true, id: newId, action: "CREATED" };
  }

  const ts = new Date().toISOString().replace(/[^0-9]/g, "").slice(0, 14);
  fs.copyFileSync(LEXEMES_PATH, `${LEXEMES_PATH}.bak_${ts}`);

  rawCache!.push(newRecord);
  fs.writeFileSync(LEXEMES_PATH, JSON.stringify(rawCache, null, 2), "utf-8");

  cache = null;
  rawCache = null;
  cacheMtime = 0;

  // ADR-GOV-016 Seçenek C: veri değişti — governance raporları arka planda yenilenir
  scheduleReportRefresh();

  fs.appendFileSync(
    AUDIT_LOG_PATH,
    JSON.stringify({
      timestamp: new Date().toISOString(),
      lexemeId: newId,
      reason,
      editor,
      source: "curation-ui",
      action: "CREATE",
    }) + "\n",
    "utf-8"
  );

  return { success: true, id: newId, action: "CREATED" };
}
