import { NextRequest, NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";
import { createHash, randomUUID, timingSafeEqual } from "node:crypto";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const directory = path.join(process.cwd(), "public", "data", "linguistic");
const backups = path.join(process.cwd(), "backups", "concept-curation");
const filenames = {
  mapping: "concept_mapping.json",
  tr: "concept-tr.json",
  review: "concept-verification.json",
} as const;

const hash = (value: string | Buffer) =>
  createHash("sha256").update(value).digest("hex");

const object = (value: unknown): value is Record<string, any> =>
  value !== null && typeof value === "object" && !Array.isArray(value);

function reply(body: unknown, status = 200) {
  return NextResponse.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

function authorize(req: NextRequest): NextResponse | null {
  const user = process.env.CONCEPT_CURATION_USER;
  const password = process.env.CONCEPT_CURATION_PASSWORD;

  if (!user || !password) {
    return reply({
      success: false,
      error: "Kavram kayıt parolası tanımlanmamış. API kapalı.",
    }, 503);
  }

  const header = req.headers.get("authorization") ?? "";
  let valid = false;
  if (header.startsWith("Basic ")) {
    const supplied = Buffer.from(header.slice(6), "base64").toString("utf8");
    valid = timingSafeEqual(
      Buffer.from(hash(supplied), "hex"),
      Buffer.from(hash(`${user}:${password}`), "hex"),
    );
  }

  if (!valid) {
    return NextResponse.json(
      { success: false, error: "Kavram düzenleme girişi gerekli." },
      {
        status: 401,
        headers: {
          "WWW-Authenticate": 'Basic realm="Kavram Kurasyonu", charset="UTF-8"',
          "Cache-Control": "no-store",
        },
      },
    );
  }
  return null;
}

function read(kind: keyof typeof filenames) {
  const file = path.join(directory, filenames[kind]);
  const raw = fs.readFileSync(/*turbopackIgnore: true*/ file);
  const document = JSON.parse(raw.toString("utf8").replace(/^\uFEFF/, ""));

  if (kind === "review") {
    if (!object(document) || !Array.isArray(document.entries)) {
      throw new Error(`${filenames[kind]}: İnceleme dosyası biçimi geçersiz.`);
    }
    for (const entry of document.entries) {
      if (!object(entry) ||
          typeof entry.kavram !== "string" ||
          typeof entry.kelime !== "string") {
        throw new Error(`${filenames[kind]}: Geçersiz inceleme kaydı.`);
      }
    }
  } else {
    if (!object(document) ||
        Object.values(document).some(value => typeof value !== "string")) {
      throw new Error(`${filenames[kind]}: Kavram sözlüğü biçimi geçersiz.`);
    }
  }

  return { file, raw, document, hash: hash(raw) };
}

export async function GET(req: NextRequest) {
  const denied = authorize(req);
  if (denied) return denied;

  try {
    const mapping = read("mapping");
    const tr = read("tr");
    const review = read("review");
    return reply({
      success: true,
      mapping: mapping.document,
      tr: tr.document,
      review: review.document,
      hashes: { tr: tr.hash, review: review.hash },
    });
  } catch (error) {
    console.error("Kavram GET okuma hatası:", error);
    return reply({
      success: false,
      error: "Kavram dosyaları okunamadı. Dosya yollarını ve JSON biçimini kontrol edin.",
    }, 500);
  }
}

export async function POST(req: NextRequest) {
  const denied = authorize(req);
  if (denied) return denied;

  // Eksik Origin de reddedilir. Origin kontrolü, parola kontrolünün yerine geçmez.
  if (req.headers.get("origin") !== req.nextUrl.origin) {
    return reply({ success: false, error: "İstek kaynağı doğrulanamadı." }, 403);
  }

  let body: any;
  try {
    const source = await req.text();
    if (Buffer.byteLength(source, "utf8") > 65536) {
      return reply({ success: false, error: "İstek çok büyük." }, 413);
    }
    body = JSON.parse(source);
  } catch {
    return reply({ success: false, error: "Geçersiz JSON." }, 400);
  }

  if (!object(body) || !["tr", "review"].includes(body.kind) ||
      typeof body.expectedHash !== "string" ||
      !/^[a-f0-9]{64}$/i.test(body.expectedHash)) {
    return reply({ success: false, error: "Geçersiz kayıt isteği." }, 400);
  }

  const kind = body.kind as "tr" | "review";
  const lock = path.join(backups, `${kind}.lock`);
  let lockFd: number | undefined;
  let temporary: string | undefined;
  let committed = false;

  try {
    fs.mkdirSync(backups, { recursive: true });
    lockFd = fs.openSync(/*turbopackIgnore: true*/ lock, "wx");
    const current = read(kind);

    if (body.expectedHash.toLowerCase() !== current.hash) {
      return reply({
        success: false,
        error: "Dosya başka bir işlemde değişmiş. Taslağını not edip sayfayı yenile.",
      }, 409);
    }

    if (kind === "tr") {
      if (typeof body.code !== "string" || !body.code ||
          ["__proto__", "constructor", "prototype"].includes(body.code) ||
          typeof body.value !== "string" || body.value.length > 4000) {
        return reply({ success: false, error: "Geçersiz Türkçe etiket." }, 400);
      }

      const mapping = read("mapping").document;
      const review = read("review").document;
      const known =
        Object.prototype.hasOwnProperty.call(mapping, body.code) ||
        Object.prototype.hasOwnProperty.call(current.document, body.code) ||
        review.entries.some((entry: any) => entry.kavram === body.code);

      if (!known) {
        return reply({ success: false, error: "Bilinmeyen kavram kodu." }, 400);
      }
      current.document[body.code] = body.value;
    } else {
      if (!Array.isArray(body.updates) ||
          !body.updates.length || body.updates.length > 500) {
        return reply({ success: false, error: "1–500 inceleme gönderilmeli." }, 400);
      }

      const seen = new Set<number>();
      for (const update of body.updates) {
        if (!object(update) || !Number.isInteger(update.index) ||
            seen.has(update.index)) {
          return reply({ success: false, error: "Geçersiz veya tekrarlanan satır." }, 400);
        }
        seen.add(update.index);
        const entry = current.document.entries[update.index];

        if (!entry || entry.kavram !== update.kavram ||
            entry.kelime !== update.kelime) {
          return reply({ success: false, error: "İnceleme satırı uyuşmuyor." }, 409);
        }
        if (!["", "dogru", "yanlis", "emin"].includes(update.durum) ||
            typeof update.not !== "string" || update.not.length > 10000 ||
            typeof update.yeniKavram !== "string" || update.yeniKavram.length > 500) {
          return reply({ success: false, error: "Geçersiz inceleme alanı." }, 400);
        }

        // Kimlikler, kelime ve uygulanma bilgisi değiştirilmez.
        current.document.entries[update.index] = {
          ...entry,
          durum: update.durum,
          not: update.not,
          yeniKavram: update.yeniKavram,
        };
      }
    }

    const before = JSON.parse(current.raw.toString("utf8").replace(/^\uFEFF/, ""));
    if (JSON.stringify(before) === JSON.stringify(current.document)) {
      return reply({ success: true, changed: false });
    }

    if (kind === "review") {
      current.document.updatedAt = new Date().toISOString();
    }

    const token = `${Date.now()}-${randomUUID()}`;
    const backup = path.join(backups, `${kind}-${token}.json`);
    fs.writeFileSync(backup, current.raw, { flag: "wx" });

    // Geçici dosya public altında tutulmaz.
    temporary = path.join(backups, `${kind}-${token}.tmp`);
    const fd = fs.openSync(/*turbopackIgnore: true*/ temporary, "wx");
    try {
      fs.writeFileSync(fd, JSON.stringify(current.document, null, 2) + "\n", "utf8");
      fs.fsyncSync(fd);
    } finally {
      fs.closeSync(fd);
    }

    if (hash(fs.readFileSync(/*turbopackIgnore: true*/ current.file)) !== current.hash) {
      return reply({ success: false, error: "Dosya işlem sırasında değişti." }, 409);
    }

    fs.renameSync(temporary, current.file);
    temporary = undefined;
    committed = true;
    return reply({ success: true, changed: true });
  } catch (error) {
    const e = error as NodeJS.ErrnoException;
    return reply({
      success: false,
      error: e.code === "EEXIST"
        ? "Kayıt kilidi mevcut. Eşzamanlı kayıt yapmayın; kilidi incelemeden silmeyin."
        : "Kayıt tamamlanamadı. Dosya biçimi, izinler ve sunucu günlüklerini kontrol edin.",
    }, e.code === "EEXIST" ? 409 : 500);
  } finally {
    // Temizlik hatası, başarılı bir kaydı başarısızmış gibi göstermesin.
    if (temporary) {
      try { fs.unlinkSync(temporary); } catch {}
    }
    if (lockFd !== undefined) {
      try { fs.closeSync(lockFd); } catch {}
      try { fs.unlinkSync(lock); } catch {
        console.error("Kavram kayıt kilidi temizlenemedi.", { kind, committed });
      }
    }
  }
}