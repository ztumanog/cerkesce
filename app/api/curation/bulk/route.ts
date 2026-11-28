import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { validateCuration } from "../../../../src/lib/curationValidate";
import { appendAudit, type AuditDiffEntry, type AuditEntry } from "../../../../src/lib/curation/auditLog";
import { scheduleReportRefresh } from "@/infra/governance/reportRefresh";
const LEX_PATH = path.join(process.cwd(), "public/data/linguistic/lexemes.json");
const ROOTS_PATH = path.join(process.cwd(), "public/data/linguistic/roots.json");
const FAM_PATH = path.join(process.cwd(), "public/data/linguistic/word_families.json");
const s = (v: unknown) => (typeof v === "string" ? v : v == null ? "" : String(v));
export async function POST(req: Request) {
  try {
    const body = await req.json() as { updates?: Array<{ id: string; patch: Record<string, unknown> }>; confirmStructural?: boolean };
    const updates = body.updates ?? [];
    if (!updates.length) return NextResponse.json({ ok: false, error: "updates bos" }, { status: 400 });
    const raw = fs.readFileSync(LEX_PATH, "utf-8");
    const data = JSON.parse(raw) as any[];
    const list = Array.isArray(data) ? data : (data as any).lexemes ?? [];
    const byId = new Map(list.map((x: any) => [String(x.id), x]));
    // KARAR-16: conceptId turetilmis kavram listesinde olmali - liste mevcut kayitlardan turetilir.
    const allowedConcepts: string[] = Array.from(new Set(list.map((x: any): string => String(x.conceptId || "").trim()).filter(Boolean)));
    const STRUCT = ["conceptId", "wordFamilyId", "rootIds"];
    const hasStructural = updates.some(u => Object.keys(u.patch || {}).some(k => STRUCT.includes(k)));
    if (hasStructural && !body.confirmStructural) {
      return NextResponse.json({ ok: false, error: "STRUCTURAL_CONFIRM_REQUIRED", detail: "conceptId / wordFamilyId / rootIds toplu degisimi icin ikinci onay gerekli." }, { status: 400 });
    }
    const errors: Array<{ id: string; error: string }> = [];
    const warnings: Array<{ id: string; warning: string }> = [];
    const oldFamById = new Map<string, string>();
    for (const u of updates) { const r0 = byId.get(String(u.id)); if (r0) oldFamById.set(String(u.id), String((r0 as any).wordFamilyId || "")); }
    const ok: string[] = [];
    const auditEntries: AuditEntry[] = [];
    for (const u of updates) {
      const rec = byId.get(String(u.id));
      if (!rec) { errors.push({ id: String(u.id), error: "ID bulunamadi" }); continue; }
      const patch = u.patch || {};
      // KARAR-16 dogrulama - tek otorite: src/lib/curationValidate.ts
      // Birlestirilmis (yazma sonrasi) deger uzerinden denetlenir.
      const patchKeys = new Set(Object.keys(patch));
      const patchTr = patchKeys.has("tr") ? s((patch as any).tr)
        : (patchKeys.has("translations") && (patch as any).translations && typeof (patch as any).translations.tr === "string") ? (patch as any).translations.tr
        : undefined;
      const merged = {
        tr: patchTr !== undefined ? patchTr : s((rec as any).translations?.tr ?? (rec as any).tr),
        literalMeaning: patchKeys.has("literalMeaning") ? s((patch as any).literalMeaning) : s((rec as any).literalMeaning),
        notes: patchKeys.has("notes") ? s((patch as any).notes) : s((rec as any).notes),
        conceptId: patchKeys.has("conceptId") ? s((patch as any).conceptId) : s((rec as any).conceptId),
        allowedConcepts,
      };
      const issues = validateCuration(merged).filter(i => i.severity === "error");
      if (issues.length) {
        // Yazilan alanlar katidir (bloklar); yazilmayan eski kirli degerler yalnizca uyaridir (bloklamaz).
        const trPatched = patchTr !== undefined;
        const blocking = issues.filter(i =>
          i.field === "conceptId" ||
          (i.field === "tr" && trPatched) ||
          (i.field === "literalMeaning" && patchKeys.has("literalMeaning")) ||
          (i.field === "notes" && patchKeys.has("notes"))
        );
        const soft = issues.filter(i => !blocking.includes(i));
        if (soft.length) warnings.push({ id: String(u.id), warning: "Eski kayitta kural disi deger var (yazilan alan degil): " + soft.map(i => i.message).join("; ") });
        if (blocking.length) { errors.push({ id: String(u.id), error: blocking.map(i => i.message).join("; ") }); continue; }
      }
      // AUDIT-02: degisim onceki degerleri yakala (alan bazli diff icin).
      // translations/dialectVariants nesne yamalari alt alanlara acilir; "tr" -> translations.tr.
      const before: Record<string, unknown> = {};
      for (const k of Object.keys(patch)) {
        const v = (patch as Record<string, unknown>)[k];
        if ((k === "translations" || k === "dialectVariants") && v && typeof v === "object" && !Array.isArray(v)) {
          for (const sk of Object.keys(v as object)) before[`${k}.${sk}`] = (rec as any)?.[k]?.[sk];
        } else if (k === "tr") {
          before["translations.tr"] = (rec as any)?.translations?.tr;
        } else {
          before[k] = (rec as any)[k];
        }
      }
      for (const [k, v] of Object.entries(patch)) {
        if (k === "translations" && v && typeof v === "object") {
          (rec as Record<string, unknown>).translations = {
            ...(((rec as Record<string, unknown>).translations as Record<string, unknown>) || {}),
            ...(v as Record<string, unknown>)
          };
        } else if (k === "dialectVariants" && v && typeof v === "object" && !Array.isArray(v)) {
          const curDv = (((rec as Record<string, unknown>).dialectVariants && typeof (rec as Record<string, unknown>).dialectVariants === "object" && !Array.isArray((rec as Record<string, unknown>).dialectVariants))
            ? (rec as Record<string, unknown>).dialectVariants
            : {}) as Record<string, unknown>;
          (rec as Record<string, unknown>).dialectVariants = {
            ...curDv,
            ...(v as Record<string, unknown>),
          };
        }
        else if (k === "tr" && typeof v === "string") { (rec as Record<string, unknown>).translations = { ...(((rec as Record<string, unknown>).translations as Record<string, unknown>) || {}), tr: v }; } else (rec as any)[k] = v;
      }
      // AUDIT-02: degisim sonrasi diff hesapla - yalnizca gercekten degisen alanlar.
      const auditDiff: AuditDiffEntry[] = [];
      for (const [f, oldV] of Object.entries(before)) {
        const newV = f.includes(".")
          ? f.split(".").reduce((o: any, key) => (o == null ? undefined : o[key]), rec)
          : (rec as any)[f];
        if (JSON.stringify(oldV ?? null) !== JSON.stringify(newV ?? null)) {
          auditDiff.push({ field: f, oldValue: oldV ?? "", newValue: newV ?? "" });
        }
      }
      if (auditDiff.length) {
        auditEntries.push({
          timestamp: new Date().toISOString(),
          action: "CURATION_BULK_UPDATE",
          lexemeId: String(u.id),
          form: s((rec as any).form || ""),
          diff: auditDiff,
          source: "curation-bulk",
        });
      }
      ok.push(String(u.id));
    }
    if (!ok.length) return NextResponse.json({ ok: false, errors, warnings }, { status: 400 });

    // AUDIT-01: Yan etkiler (aile/kok senkronu) YALNIZCA basariyla uygulanan kayitlar icin calisir.
    // curationValidate'in reddettigi kayitlar lexemes.json'a yazilmaz; yan etki de uretmez.
    const appliedIds = new Set(ok);

    // Aile senkronu - wordFamilyId degisen lexemeyi eski aileden cikar, yenisine ekle
    try {
      const famPath = FAM_PATH;
      if (fs.existsSync(famPath)) {
        const famRaw = fs.readFileSync(famPath, "utf-8");
        const famData = JSON.parse(famRaw);
        const famList = Array.isArray(famData) ? famData : (famData.families ?? famData.wordFamilies ?? []);
        const famById = new Map(famList.map((f: any) => [String(f.id), f]));
        let famChanged = false;
        for (const u of updates) {
          if (!appliedIds.has(String(u.id))) continue;
          const nid = String(u.id);
          const newFam = String((u.patch as any)?.wordFamilyId || "");
          const oldFam = oldFamById.get(nid) || "";
          if (!newFam || newFam === oldFam) continue;
          if (oldFam && famById.has(oldFam)) { const of: any = famById.get(oldFam); if (Array.isArray(of.lexemeIds)) { const ix = of.lexemeIds.indexOf(nid); if (ix !== -1) { of.lexemeIds.splice(ix, 1); famChanged = true; } } }
          if (famById.has(newFam)) { const nf: any = famById.get(newFam); if (!Array.isArray(nf.lexemeIds)) nf.lexemeIds = []; if (!nf.lexemeIds.includes(nid)) { nf.lexemeIds.push(nid); famChanged = true; } }
        }
        if (famChanged) { const famStamp = new Date().toISOString().replace(/[:.]/g, "-"); fs.copyFileSync(famPath, famPath + ".bak-" + famStamp); const famOut = Array.isArray(famData) ? famList : { ...famData, families: famList }; fs.writeFileSync(famPath, JSON.stringify(famOut, null, 2), "utf-8"); }
      }
    } catch {}

    // AILE YARATMA - WF yoksa yarat
    let createdFams: string[] = [];
    try {
      if (fs.existsSync(FAM_PATH)) {
        const famRaw2 = fs.readFileSync(FAM_PATH, "utf-8");
        const famData2 = JSON.parse(famRaw2);
        const famList2 = Array.isArray(famData2) ? famData2 : (famData2.families ?? famData2.wordFamilies ?? []);
        const hasFam = new Set(famList2.map((f: any) => String(f.id)));
        let famChanged2 = false;
        for (const u of updates) {
          if (!appliedIds.has(String(u.id))) continue;
          const rec: any = byId.get(String(u.id));
          if (!rec) continue;
          const fid = s(rec.wordFamilyId || "").trim();
          if (!fid || hasFam.has(fid)) continue;
          famList2.push({ id: fid, lexemeIds: [String(u.id)], conceptId: s(rec.conceptId || ""), source: "Dil Kurasyonu / " + String(u.id) });
          hasFam.add(fid);
          createdFams.push(fid);
          famChanged2 = true;
        }
        if (famChanged2) {
          fs.copyFileSync(FAM_PATH, FAM_PATH + ".bak-" + new Date().toISOString().replace(/[:.]/g, "-"));
          fs.writeFileSync(FAM_PATH, JSON.stringify(Array.isArray(famData2) ? famList2 : { ...famData2, families: famList2 }, null, 2), "utf-8");
        }
      }
    } catch {}

    // KOK SENKRONU - TEK BLOK, son hale bak, patch'e degil
    let createdRoots: string[] = [];
    let bakRoot: string | null = null;
    try {
      if (fs.existsSync(ROOTS_PATH)) {
        const rootsRaw = fs.readFileSync(ROOTS_PATH, "utf-8");
        const rootsData = JSON.parse(rootsRaw);
        const rootsList = Array.isArray(rootsData) ? rootsData : (rootsData.roots ?? []);
        const hasRoot = new Set(rootsList.map((r: any) => String(r.id)));
        let rootsChanged = false;
        for (const u of updates) {
          if (!appliedIds.has(String(u.id))) continue;
          const rec: any = byId.get(String(u.id));
          if (!rec || !Array.isArray(rec.rootIds)) continue;
          const form = s(rec.form || rec.dialectVariants?.adyghe || rec.dialectVariants?.kabardian || "").trim();
          const trFull = s(rec.translations?.tr || rec.tr || "");
          const primary = trFull.split(",")[0].trim() || s(rec.literalMeaning || "");
          for (const ridRaw of rec.rootIds) {
            const rid = s(ridRaw).trim();
            if (!rid) continue;
            if (hasRoot.has(rid)) continue;
            if (!form) continue;
            rootsList.push({
              id: rid,
              form,
              primaryMeaning: primary,
              meaning: primary,
              translations: { tr: trFull, en: s(rec.translations?.en || ""), ru: s(rec.translations?.ru || "") },
              conceptId: s(rec.conceptId || ""),
              wordFamilyId: s(rec.wordFamilyId || ""),
              source: "Dil Kurasyonu / " + String(u.id),
              note: "Dil Kurasyonu Kaydet ile otomatik senkron.",
            });
            hasRoot.add(rid);
            createdRoots.push(rid);
            rootsChanged = true;
          }
        }
        if (rootsChanged) {
          const rootsStamp = new Date().toISOString().replace(/[:.]/g, "-");
          bakRoot = ROOTS_PATH + ".bak-" + rootsStamp;
          fs.copyFileSync(ROOTS_PATH, bakRoot);
          const rootsOut = Array.isArray(rootsData) ? rootsList : { ...rootsData, roots: rootsList };
          fs.writeFileSync(ROOTS_PATH, JSON.stringify(rootsOut, null, 2), "utf-8");
        }
      }
    } catch {}

    const stamp = new Date().toISOString().replace(/[:.]/g, "-");
    const bak = LEX_PATH + ".bak-" + stamp;
    fs.copyFileSync(LEX_PATH, bak);
    const out = Array.isArray(data) ? list : { ...(data as any), lexemes: list };
    fs.writeFileSync(LEX_PATH, JSON.stringify(out, null, 2), "utf-8");
    try {
      appendAudit(auditEntries);
    } catch {
      warnings.push({ id: "AUDIT", warning: "Audit log yazilamadi, ana veri yazildi." });
    }

    // ADR-GOV-016 Seçenek C: veri değişti — governance raporları arka planda yenilenir
    scheduleReportRefresh();

    return NextResponse.json({ ok: true, applied: ok.length, failed: errors.length, errors, warnings, backup: bak, backupRoots: bakRoot, createdRoots, createdFams, note: "commit terminalden" });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message ?? "hata" }, { status: 500 });
  }
}
