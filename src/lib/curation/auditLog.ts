// Curation audit zinciri - tek format otoritesi.
// lexemes.json'a yazan rotalar bu modulden loglar; audit yazimini inline tekrarlamak yasak.
//
// Format, mevcut audit_log.jsonl kayitlariyla uyumludur (uyumsuz ikinci format yaratilmadi):
//   { timestamp, action, lexemeId, form?, diff: [{ field, oldValue, newValue }], source? }
//
// Tarihce: 110b0f7 (Sprint 2A) ile olusturuldu ama hicbir cagri noktasi baglanmadi;
// 2026-11-23'te /api/curation/bulk route'una baglandi (bkz. docs/audits/CURATION-VALIDATE-AUDIT.md).

import fs from "fs";
import path from "path";

export type AuditDiffEntry = {
  field: string;
  oldValue: unknown;
  newValue: unknown;
};

export type AuditEntry = {
  timestamp: string;
  action: string;
  lexemeId: string;
  form?: string;
  diff: AuditDiffEntry[];
  source?: string;
  editor?: string;
  reason?: string;
};

const AUDIT_PATH = path.join(process.cwd(), "public/data/linguistic/audit_log.jsonl");

export function appendAudit(entries: AuditEntry[]): void {
  if (!entries.length) return;
  const lines = entries.map((e) => JSON.stringify(e)).join("\n") + "\n";
  fs.appendFileSync(AUDIT_PATH, lines, "utf-8");
}

export function readAudit(limit = 100): AuditEntry[] {
  if (!fs.existsSync(AUDIT_PATH)) return [];
  const lines = fs.readFileSync(AUDIT_PATH, "utf-8").trim().split("\n").filter(Boolean);
  return lines.slice(-limit).map((l) => JSON.parse(l) as AuditEntry);
}
