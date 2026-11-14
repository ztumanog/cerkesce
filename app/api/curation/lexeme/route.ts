import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// KARAR-16 (Revize): Doğrudan lexemes.json'a yaz.
// Akış: doğrulama -> yedek -> lexemes.json güncelle -> commit (manuel, terminalden)
// Yapısal alanlarda (conceptId / wordFamilyId / rootIds) TOPLU değişim bu route'ta YOK, ayrı onaylı ekrana ait.

const LEXEMES_PATH = path.join(process.cwd(), "public", "data", "linguistic", "lexemes.json");

function str(v: unknown) { return typeof v === "string" ? v : v == null ? "" : String(v); }

export async function PATCH(req: Request) {
  try {
    const body = await req.json() as { id?: string; tr?: string; literalMeaning?: string };
    const id = str(body.id);
    if (!id) return NextResponse.json({ ok: false, error: "id gerekli" }, { status: 400 });

    const tr = body.tr !== undefined ? str(body.tr) : undefined;
    const lit = body.literalMeaning !== undefined ? str(body.literalMeaning) : undefined;

    // 1) DOĞRULAMA
    const errors: string[] = [];
    if (tr !== undefined && tr.includes("?")) errors.push("tr içinde ? olamaz (dayan?kl? örneği)");
    if (lit !== undefined && lit.includes("<")) errors.push("literalMeaning içinde < / HTML olamaz");
    if (tr !== undefined && !tr.trim()) errors.push("tr boş olamaz");
    if (errors.length) return NextResponse.json({ ok: false, errors }, { status: 400 });

    const raw = fs.readFileSync(LEXEMES_PATH, "utf-8");
    const data = JSON.parse(raw) as any[];
const list = Array.isArray(data) ? data : (data as { lexemes?: unknown[] }).lexemes ?? [];
    const idx = list.findIndex((x: any) => String(x.id) === id);
    if (idx === -1) return NextResponse.json({ ok: false, error: "lexeme bulunamadı: " + id }, { status: 404 });

    // conceptId boşsa yazma — liste tarafında ayrıca kontrol edilecek
    const curConcept = str(list[idx].conceptId ?? list[idx].concept);
    if (!curConcept) return NextResponse.json({ ok: false, error: "conceptId boş, önce kavram atanmalı" }, { status: 400 });

    // 2) YEDEK
    const stamp = new Date().toISOString().replace(/[:.]/g, "-");
    const bak = LEXEMES_PATH + ".bak-" + stamp;
    fs.copyFileSync(LEXEMES_PATH, bak);

    // 3) GÜNCELLE — sadece tr + literalMeaning, yapısal alanlara dokunma
    if (tr !== undefined) list[idx].tr = tr;
    if (lit !== undefined) list[idx].literalMeaning = lit;

    const out = Array.isArray(data) ? list : { ...(data as any), lexemes: list };
    fs.writeFileSync(LEXEMES_PATH, JSON.stringify(out, null, 2), "utf-8");

    return NextResponse.json({ ok: true, id, backup: bak, note: "commit terminalden: git add + git commit" });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message ?? "bilinmeyen hata" }, { status: 500 });
  }
}

