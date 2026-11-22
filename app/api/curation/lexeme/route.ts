import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// KARAR-16 (Revize 2): Tek lexeme kaydetme + kök senkronu
// Akış: doğrulama -> yedek (lexemes + roots) -> lexemes güncelle -> roots senkronla -> commit manuel
// TOPLU değişim hâlâ bu route'ta YOK, tek kayıt için kök hayaleti engellenir.

const LEXEMES_PATH = path.join(process.cwd(), "public", "data", "linguistic", "lexemes.json");
const ROOTS_PATH = path.join(process.cwd(), "public", "data", "linguistic", "roots.json");

function str(v: unknown) { return typeof v === "string" ? v : v == null ? "" : String(v); }

function loadList(p: string) {
  const raw = fs.readFileSync(p, "utf-8");
  const data = JSON.parse(raw) as any;
  if (Array.isArray(data)) return { data, list: data as any[], key: null as string | null };
  const key = (data as any).lexemes !== undefined ? "lexemes" : (data as any).roots !== undefined ? "roots" : "lexemes";
  return { data, list: ((data as any)[key] ?? []) as any[], key };
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json() as { id?: string; tr?: string; literalMeaning?: string; rootIds?: unknown; wordFamilyId?: string; conceptId?: string };
    const id = str(body.id);
    if (!id) return NextResponse.json({ ok: false, error: "id gerekli" }, { status: 400 });

    const tr = body.tr !== undefined ? str(body.tr) : undefined;
    const lit = body.literalMeaning !== undefined ? str(body.literalMeaning) : undefined;
    const newRootIds = body.rootIds !== undefined
      ? (Array.isArray(body.rootIds) ? [...new Set(body.rootIds.map((x: any) => str(x).trim()).filter(Boolean))] : undefined)
      : undefined;
    const newWF = body.wordFamilyId !== undefined ? str(body.wordFamilyId) : undefined;
    const newConcept = body.conceptId !== undefined ? str(body.conceptId) : undefined;

    // 1) DOĞRULAMA
    const errors: string[] = [];
    if (tr !== undefined && tr.includes("?")) errors.push("tr içinde ? olamaz (dayan?kl? örneği)");
    if (lit !== undefined && lit.includes("<")) errors.push("literalMeaning içinde < / HTML olamaz");
    if (tr !== undefined && !tr.trim()) errors.push("tr boş olamaz");
    if (newRootIds !== undefined && newRootIds.some((r) => !r.startsWith("R-"))) errors.push("rootIds R- ile başlamalı");
    if (errors.length) return NextResponse.json({ ok: false, errors }, { status: 400 });

    const lex = loadList(LEXEMES_PATH);
    const idx = lex.list.findIndex((x: any) => String(x.id) === id);
    if (idx === -1) return NextResponse.json({ ok: false, error: "lexeme bulunamadı: " + id }, { status: 404 });

    const curConcept = str(lex.list[idx].conceptId ?? lex.list[idx].concept);
    if (!curConcept && !newConcept) return NextResponse.json({ ok: false, error: "conceptId boş, önce kavram atanmalı" }, { status: 400 });

    // 2) YEDEK — iki dosya da
    const stamp = new Date().toISOString().replace(/[:.]/g, "-");
    const bakLex = LEXEMES_PATH + ".bak-" + stamp;
    fs.copyFileSync(LEXEMES_PATH, bakLex);
    let bakRoot: string | null = null;
    let roots: ReturnType<typeof loadList> | null = null;
    let createdRoots: string[] = [];

    // Sadece rootIds gelirse roots.json'u aç
    if (newRootIds !== undefined) {
      roots = loadList(ROOTS_PATH);
      bakRoot = ROOTS_PATH + ".bak-" + stamp;
      fs.copyFileSync(ROOTS_PATH, bakRoot);
    }

    // 3) GÜNCELLE — lexeme
    if (tr !== undefined) lex.list[idx].tr = tr;
    if (lit !== undefined) lex.list[idx].literalMeaning = lit;
    if (newWF !== undefined) lex.list[idx].wordFamilyId = newWF;
    if (newConcept !== undefined) lex.list[idx].conceptId = newConcept;
    if (newRootIds !== undefined) lex.list[idx].rootIds = newRootIds;

    const outLex = lex.key ? { ...(lex.data as any), [lex.key]: lex.list } : lex.list;
    fs.writeFileSync(LEXEMES_PATH, JSON.stringify(outLex, null, 2), "utf-8");

    // 4) SENKRON — roots.json: olmayan kökü yarat, var olana dokunma
    if (newRootIds !== undefined && roots) {
      const lexeme = lex.list[idx];
      const form = str(lexeme.ady || lexeme.kbd || lexeme.form || lexeme.headword || "");
      const trNow = str(lexeme.tr || tr || "");
      const primary = trNow.split(",")[0].trim() || str(lexeme.literalMeaning || "");
      for (const rid of newRootIds) {
        const exists = roots.list.some((r: any) => String(r.id) === rid);
        if (!exists) {
          if (!form) return NextResponse.json({ ok: false, error: "kök formu bulunamadı, kök yaratılamadı: " + rid }, { status: 400 });
          roots.list.push({
            id: rid,
            form,
            primaryMeaning: primary,
            meaning: primary,
            translations: { tr: trNow, en: str(lexeme.en || ""), ru: str(lexeme.ru || "") },
            conceptId: str(lexeme.conceptId || ""),
            wordFamilyId: str(lexeme.wordFamilyId || ""),
            source: `Dil Kurasyonu / ${id}`,
            note: "Dil Kurasyonu Kaydet ile otomatik senkron: lexeme'de rootIds yazıldı, roots.json'da yoktu.",
          });
          createdRoots.push(rid);
        }
      }
      if (createdRoots.length) {
        const outRoot = roots.key ? { ...(roots.data as any), [roots.key]: roots.list } : roots.list;
        fs.writeFileSync(ROOTS_PATH, JSON.stringify(outRoot, null, 2), "utf-8");
      }
    }

    return NextResponse.json({ ok: true, id, backup: bakLex, backupRoots: bakRoot, createdRoots, note: "commit terminalden: git add + git commit" });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message ?? "bilinmeyen hata" }, { status: 500 });
  }
}