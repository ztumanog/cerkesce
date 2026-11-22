import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
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
    const STRUCT = ["conceptId", "wordFamilyId", "rootIds"];
    const hasStructural = updates.some(u => Object.keys(u.patch || {}).some(k => STRUCT.includes(k)));
    if (hasStructural && !body.confirmStructural) {
      return NextResponse.json({ ok: false, error: "STRUCTURAL_CONFIRM_REQUIRED", detail: "conceptId / wordFamilyId / rootIds toplu degisimi icin ikinci onay gerekli." }, { status: 400 });
    }
    const errors: Array<{ id: string; error: string }> = [];
    const oldFamById = new Map<string, string>();
    for (const u of updates) { const r0 = byId.get(String(u.id)); if (r0) oldFamById.set(String(u.id), String((r0 as any).wordFamilyId || "")); }
    const ok: string[] = [];
    for (const u of updates) {
      const rec = byId.get(String(u.id));
      if (!rec) { errors.push({ id: String(u.id), error: "ID bulunamadi" }); continue; }
      const patch = u.patch || {};
      const trCand = (patch as any).tr ?? (patch as any).translations?.tr;
      if (typeof trCand === "string" && /[A-Za-zçğıöşüÇĞİÖŞÜ]\?[A-Za-zçğıöşüÇĞİÖŞÜ]/.test(trCand)) { errors.push({ id: String(u.id), error: "tr icinde kodlama ? var" }); continue; }
      const litCand = (patch as any).literalMeaning; if (typeof litCand === "string" && String(litCand).replace(/<<[^>]+>>/g, "").includes("<")) { errors.push({ id: String(u.id), error: "literalMeaning icinde HTML var" }); continue; }
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
      ok.push(String(u.id));
    }
    if (!ok.length) return NextResponse.json({ ok: false, errors }, { status: 400 });

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
    return NextResponse.json({ ok: true, applied: ok.length, failed: errors.length, errors, backup: bak, backupRoots: bakRoot, createdRoots, createdFams, note: "commit terminalden" });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message ?? "hata" }, { status: 500 });
  }
}