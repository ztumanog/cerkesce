/**
 * AUDIT-01: bulk route veri tutarliligi testleri.
 *
 * curationValidate'in REDDETTIGI kayitlar:
 * - lexemes.json'a yazilmamali
 * - word_families.json'u degistirmemeli (aile senkronu + aile yaratma)
 * - roots.json'u degistirmemeli (kok senkronu)
 *
 * Iki senaryo:
 * 1. Tek kayit reddedildi -> 400, HICBIR dosya yazilmaz (erken donus).
 * 2. Kismi basari (1 gecerli + 1 reddedilen) -> 200 kismi, ama reddedilen kayit
 *    yan etki uretmemeli. Bu senaryo duzeltme oncesi BASARISIZDI: aile senkronu
 *    ve kok senkronu 'updates' listesinin tamamini dolasiyordu.
 *
 * AUDIT-02: uygulanan kayitlar audit_log.jsonl'a yazilir (alan bazli diff ile),
 * reddedilen kayitlar audit entry uretmez. Audit yazimi src/lib/curation/auditLog.ts
 * modulunden yapilir (tek format otoritesi).
 */

import { describe, it, expect, vi, beforeEach } from "vitest";
import fs from "fs";
import path from "path";

const LEX_PATH = path.join(process.cwd(), "public/data/linguistic/lexemes.json");
const ROOTS_PATH = path.join(process.cwd(), "public/data/linguistic/roots.json");
const FAM_PATH = path.join(process.cwd(), "public/data/linguistic/word_families.json");
const AUDIT_PATH = path.join(process.cwd(), "public/data/linguistic/audit_log.jsonl");

// Fixtures: L-OK gecerli bir yamaya acik; L-BAD reddi tetikleyecek (conceptId: "")
// ve reddedilirse yan etki doguracak veriler tasiyor (WF-2'ye tasinma + yetim kok).
const baseLexemes = () => [
  {
    id: "L-OK",
    form: "ок",
    conceptId: "C1",
    wordFamilyId: "WF-1",
    rootIds: ["R-1"],
    translations: { tr: "gecerli kayit" },
    literalMeaning: "",
  },
  {
    id: "L-BAD",
    form: "плохо",
    conceptId: "C2",
    wordFamilyId: "WF-1",
    rootIds: ["R-BAD-ORPHAN"],
    translations: { tr: "reddedilecek kayit" },
    literalMeaning: "",
  },
];
const baseFamilies = () => [
  { id: "WF-1", lexemeIds: ["L-OK", "L-BAD"] },
  { id: "WF-2", lexemeIds: [] },
];
const baseRoots = () => [{ id: "R-1", form: "ок" }];

let writes: Record<string, string> = {};

function installFsMocks() {
  writes = {};
  const files: Record<string, string> = {
    [LEX_PATH]: JSON.stringify(baseLexemes()),
    [FAM_PATH]: JSON.stringify(baseFamilies()),
    [ROOTS_PATH]: JSON.stringify(baseRoots()),
  };
  // Gerçek fs'i koru: next/server gibi modüller kendi dosyalarını okuyabilir.
  const realRead = fs.readFileSync.bind(fs);
  const realExists = fs.existsSync.bind(fs);
  vi.spyOn(fs, "readFileSync").mockImplementation(((p: any, ...rest: any[]) => {
    const key = String(p);
    if (key in files) return files[key];
    return realRead(p, ...rest);
  }) as any);
  vi.spyOn(fs, "writeFileSync").mockImplementation(((p: any, content: any) => {
    writes[String(p)] = String(content);
  }) as any);
  // AUDIT-02: appendFileSync mock'u OLMADAN testler GERCEK audit_log.jsonl'a yazar.
  // Append semantigi: ayni dosyaya yazilar birikir.
  vi.spyOn(fs, "appendFileSync").mockImplementation(((p: any, content: any) => {
    const key = String(p);
    writes[key] = (writes[key] || "") + String(content);
  }) as any);
  vi.spyOn(fs, "copyFileSync").mockImplementation((() => {}) as any);
  vi.spyOn(fs, "existsSync").mockImplementation(((p: any) => String(p) in files || realExists(p)) as any);
}

async function callRoute(body: unknown) {
  const { POST } = await import("../../../app/api/curation/bulk/route");
  const res = await POST(new Request("http://localhost/api/curation/bulk", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  }));
  return { status: res.status, json: await res.json() };
}

describe("AUDIT-01: bulk route yan etkileri yalnizca basarili kayitlar icin", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    installFsMocks();
  });

  it("tek reddedilen kayit: 400 doner, uc dosya da yazilmaz", async () => {
    const { status, json } = await callRoute({
      updates: [{ id: "L-BAD", patch: { conceptId: "" } }],
      confirmStructural: true,
    });

    expect(status).toBe(400);
    expect(json.ok).toBe(false);
    expect(json.errors).toHaveLength(1);
    expect(json.errors[0].id).toBe("L-BAD");
    expect(writes[LEX_PATH]).toBeUndefined();
    expect(writes[FAM_PATH]).toBeUndefined();
    expect(writes[ROOTS_PATH]).toBeUndefined();
    // AUDIT-02: hicbir kayit uygulanmadigi icin audit log'a da yazilmaz
    expect(writes[AUDIT_PATH]).toBeUndefined();
  });

  it("kismi basari: reddedilen kayit aile/kok yan etkisi uretmez, gecerli kayit uygulanir", async () => {
    const { status, json } = await callRoute({
      updates: [
        { id: "L-OK", patch: { translations: { tr: "yeni ceviri" } } },
        // Reddedilecek yama: conceptId bos (KARAR-16) + aile degisimi + yetim kok tasir
        { id: "L-BAD", patch: { conceptId: "", wordFamilyId: "WF-2" } },
      ],
      confirmStructural: true,
    });

    expect(status).toBe(200);
    expect(json.ok).toBe(true);
    expect(json.applied).toBe(1);
    expect(json.failed).toBe(1);
    expect(json.errors[0].id).toBe("L-BAD");

    // Gecerli kayit lexemes.json'a yazildi
    expect(writes[LEX_PATH]).toBeDefined();
    const writtenLexemes = JSON.parse(writes[LEX_PATH]);
    const okRec = writtenLexemes.find((x: any) => x.id === "L-OK");
    const badRec = writtenLexemes.find((x: any) => x.id === "L-BAD");
    expect(okRec.translations.tr).toBe("yeni ceviri");
    // Reddedilen kayit degismedi (conceptId eski degerinde kaldi)
    expect(badRec.conceptId).toBe("C2");

    // AUDIT-01: reddedilen kayit yuzunden aile dosyasi yazilmamali
    // (duzeltme oncesi: L-BAD, WF-1'den cikarilip WF-2'ye ekleniyordu)
    expect(writes[FAM_PATH]).toBeUndefined();

    // AUDIT-01: reddedilen kayit yuzunden kok dosyasi yazilmamali
    // (duzeltme oncesi: L-BAD'in mevcut R-BAD-ORPHAN koku roots.json'a ekleniyordu)
    expect(writes[ROOTS_PATH]).toBeUndefined();

    // AUDIT-02: yalnizca uygulanan kayit icin audit entry yazilir (alan bazli diff ile)
    expect(writes[AUDIT_PATH]).toBeDefined();
    const auditLines = String(writes[AUDIT_PATH]).trim().split("\n").filter(Boolean);
    expect(auditLines).toHaveLength(1);
    const auditEntry = JSON.parse(auditLines[0]);
    expect(auditEntry.lexemeId).toBe("L-OK");
    expect(auditEntry.action).toBe("CURATION_BULK_UPDATE");
    expect(auditEntry.diff).toHaveLength(1);
    expect(auditEntry.diff[0].field).toBe("translations.tr");
    expect(auditEntry.diff[0].oldValue).toBe("gecerli kayit");
    expect(auditEntry.diff[0].newValue).toBe("yeni ceviri");
  });
});
