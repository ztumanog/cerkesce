import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import crypto from "crypto";

const LEX_PATH = path.join(process.cwd(), "public/data/linguistic/lexemes.json");

function sha256Hex(buf: Buffer): string {
  return crypto.createHash("sha256").update(buf).digest("hex").toUpperCase();
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
      updates?: Array<{ id: string; patch: Record<string, unknown> }>;
      expectedHash?: string;
      confirmStructural?: boolean;
    };

    const updates = body.updates ?? [];
    if (!updates.length) {
      return NextResponse.json({ success: false, ok: false, error: "Güncellenecek satır yok." }, { status: 400 });
    }

    const rawBuf = fs.readFileSync(LEX_PATH);
    const currentHash = sha256Hex(rawBuf);

    // Dışarıdan (Python vb.) dosya değiştiyse ezilmesini önle
    if (body.expectedHash && body.expectedHash.toUpperCase() !== currentHash) {
      return NextResponse.json(
        {
          success: false,
          ok: false,
          error: "Dosya diskte değişmiş (hash uyuşmuyor). Sayfayı yenileyip tekrar deneyin.",
        },
        { status: 409 }
      );
    }

    const rawText = rawBuf.toString("utf-8").replace(/^\uFEFF/, "");
    const data = JSON.parse(rawText);
    const isArray = Array.isArray(data);
    const list: any[] = isArray ? data : data.lexemes ?? [];
    const byId = new Map(list.map((x: any) => [String(x.id), x]));

    const errors: Array<{ id: string; error: string }> = [];
    const oldFamById = new Map<string, string>();
    for (const u of updates) {
      const r0 = byId.get(String(u.id));
      if (r0) oldFamById.set(String(u.id), String(r0.wordFamilyId || ""));
    }

    const updatedRecords: any[] = [];

    for (const u of updates) {
      const id = String(u.id);
      const rec = byId.get(id);
      if (!rec) {
        errors.push({ id, error: "ID bulunamadı" });
        continue;
      }

      const patch = u.patch || {};
      const trCand = (patch as any).tr ?? (patch as any).translations?.tr;
      if (typeof trCand === "string" && /[A-Za-zçğıöşüÇĞİÖŞÜ]\?[A-Za-zçğıöşüÇĞİÖŞÜ]/.test(trCand)) {
        errors.push({ id, error: "tr içinde kodlama (?) hatası var" });
        continue;
      }

      const litCand = (patch as any).literalMeaning;
      if (typeof litCand === "string" && String(litCand).replace(/<<[^>]+>>/g, "").includes("<")) {
        errors.push({ id, error: "literalMeaning içinde HTML etiketi var" });
        continue;
      }

      for (const [k, v] of Object.entries(patch)) {
        if (k === "translations" && v && typeof v === "object") {
          rec.translations = {
            ...(rec.translations || {}),
            ...(v as Record<string, unknown>),
          };
        } else if (k === "dialectVariants" && v && typeof v === "object" && !Array.isArray(v)) {
          const curDv =
            rec.dialectVariants && typeof rec.dialectVariants === "object" && !Array.isArray(rec.dialectVariants)
              ? rec.dialectVariants
              : {};
          rec.dialectVariants = {
            ...curDv,
            ...(v as Record<string, unknown>),
          };
        } else if (k === "tr" && typeof v === "string") {
          rec.translations = { ...(rec.translations || {}), tr: v };
        } else {
          rec[k] = v;
        }
      }

      updatedRecords.push(rec);
    }

    if (!updatedRecords.length) {
      return NextResponse.json(
        { success: false, ok: false, error: errors[0]?.error || "Kayıt güncellenemedi.", errors },
        { status: 400 }
      );
    }

    // Aile senkronu - wordFamilyId değişen lexemeyi eski aileden çıkar, yenisine ekle
    try {
      const famPath = path.join(process.cwd(), "public/data/linguistic/word_families.json");
      if (fs.existsSync(famPath)) {
        const famRaw = fs.readFileSync(famPath, "utf-8").replace(/^\uFEFF/, "");
        const famData = JSON.parse(famRaw);
        const famList = Array.isArray(famData) ? famData : famData.families ?? famData.wordFamilies ?? [];
        const famById = new Map(famList.map((f: any) => [String(f.id), f]));
        let famChanged = false;

        for (const u of updates) {
          const nid = String(u.id);
          const newFam = String((u.patch as any)?.wordFamilyId || "");
          const oldFam = oldFamById.get(nid) || "";
          if (!newFam || newFam === oldFam) continue;

          if (oldFam && famById.has(oldFam)) {
            const of: any = famById.get(oldFam);
            if (Array.isArray(of.lexemeIds)) {
              const ix = of.lexemeIds.indexOf(nid);
              if (ix !== -1) {
                of.lexemeIds.splice(ix, 1);
                famChanged = true;
              }
            }
          }
          if (famById.has(newFam)) {
            const nf: any = famById.get(newFam);
            if (!Array.isArray(nf.lexemeIds)) nf.lexemeIds = [];
            if (!nf.lexemeIds.includes(nid)) {
              nf.lexemeIds.push(nid);
              famChanged = true;
            }
          }
        }

        if (famChanged) {
          const famStamp = new Date().toISOString().replace(/[:.]/g, "-");
          fs.copyFileSync(famPath, famPath + ".bak-" + famStamp);
          const famOut = Array.isArray(famData) ? famList : { ...famData, families: famList };
          fs.writeFileSync(famPath, JSON.stringify(famOut, null, 2), "utf-8");
        }
      }
    } catch {}

    // Yedek al ve yaz
    const stamp = new Date().toISOString().replace(/[:.]/g, "-");
    const bak = LEX_PATH + ".bak-" + stamp;
    fs.copyFileSync(LEX_PATH, bak);

    const out = isArray ? list : { ...data, lexemes: list };
    const outStr = JSON.stringify(out, null, 2);
    const outBuf = Buffer.from(outStr, "utf-8");
    fs.writeFileSync(LEX_PATH, outBuf);

    const newHash = sha256Hex(outBuf);

    return NextResponse.json({
      success: true,
      ok: true,
      dryRun: false,
      applied: updatedRecords.length,
      failed: errors.length,
      errors,
      lexemes: updatedRecords,
      hash: newHash,
      backup: bak,
      note: "commit terminalden",
    });
  } catch (e: any) {
    return NextResponse.json(
      { success: false, ok: false, error: e?.message ?? "Sunucu hatası" },
      { status: 500 }
    );
  }
}