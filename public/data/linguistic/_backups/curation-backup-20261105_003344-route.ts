import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { createHash, randomUUID } from 'crypto';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const scalars = new Set([
  'form', 'ipa', 'literalMeaning', 'meaning', 'partOfSpeech',
  'conceptId', 'dialect', 'notes'
]);
const languages = new Set(['tr', 'en', 'ru', 'ar']);
const fields = [
  'id', ...Array.from(scalars), 'translations', 'rootIds', 'wordFamilyId'
];

function isObject(v: any) {
  return v !== null && typeof v === 'object' && !Array.isArray(v);
}
function rev(v: any) {
  return createHash('sha256').update(JSON.stringify(v)).digest('hex');
}
function fail(error: string, status = 400) {
  return NextResponse.json({ ok: false, applied: false, error }, { status });
}
function project(row: any) {
  const item: Record<string, any> = {};
  for (const k of fields) {
    if (Object.prototype.hasOwnProperty.call(row, k)) item[k] = row[k];
  }
  item._revision = rev(row);
  return item;
}

export async function POST(req: NextRequest) {
  const url = new URL(req.url);
  // Üretimde kullanıcı doğrulaması kurulmadan yazma açılmaz.
  if (process.env.NODE_ENV === 'production') {
    return fail('Yazma yalnızca yerel geliştirmede açık.', 403);
  }
  if (!['localhost', '127.0.0.1', '[::1]'].includes(url.hostname) ||
      req.headers.get('origin') !== url.origin) {
    return fail('Aynı kaynaktan yerel tarayıcı isteği gerekli.', 403);
  }

  const file = path.join(
    process.cwd(), 'public', 'data', 'linguistic', 'lexemes.json'
  );
  const backupDir = path.join(process.cwd(), '_backups', 'lexeme-edits');
  const lock = file + '.curation.lock';
  let lockFd: number | undefined;
  let temp: string | undefined;
  let backupPath: string | undefined;
  let applied = false;

  try {
    const body = await req.json();
    if (!isObject(body)) return fail('İstek nesne olmalı.');
    const { id, changes, expectedRevision, mode } = body;

    if (typeof id !== 'string' || !id || !isObject(changes) ||
        typeof expectedRevision !== 'string' ||
        !['dry-run', 'apply'].includes(mode)) {
      return fail('ID, sürüm, değişiklikler veya mode geçersiz.');
    }

    for (const [key, value] of Object.entries(changes)) {
      if (scalars.has(key)) {
        if (typeof value !== 'string') return fail(key + ' metin olmalı.');
        if (key === 'form' && !value.trim()) return fail('Form boş olamaz.');
      } else if (key === 'translations') {
        if (!isObject(value)) return fail('translations nesne olmalı.');
        for (const [lang, text] of Object.entries(value as object)) {
          if (!languages.has(lang) || typeof text !== 'string') {
            return fail('Geçersiz çeviri alanı: ' + lang);
          }
        }
      } else {
        return fail('Düzenlemeye kapalı alan: ' + key);
      }
    }

    try {
      lockFd = fs.openSync(lock, 'wx');
    } catch (err: any) {
      if (err.code === 'EEXIST') {
        return fail('Başka bir kayıt işlemi var; tekrar deneyin.', 409);
      }
      throw err;
    }

    const raw = fs.readFileSync(file);
    const rows = JSON.parse(raw.toString('utf8').replace(/^\uFEFF/, ''));
    if (!Array.isArray(rows)) throw new Error('Veri dizi değil.');
    const matches: number[] = [];
    rows.forEach((r: any, i: number) => {
      if (r?.id === id) matches.push(i);
    });
    if (matches.length !== 1) return fail('ID yok veya benzersiz değil.', 409);

    const index = matches[0];
    const before = rows[index];
    if (rev(before) !== expectedRevision) {
      return fail('Kelime başka işlemde değişmiş. Yeniden yükleyin.', 409);
    }

    const after = { ...before };
    const diff: Record<string, any> = {};

    for (const [key, value] of Object.entries(changes)) {
      if (key === 'translations') {
        if (before.translations !== undefined &&
            before.translations !== null && !isObject(before.translations)) {
          return fail('Mevcut çeviri yapısı düzenlemeye uygun değil.');
        }
        const translations = { ...(before.translations || {}) };
        for (const [lang, text] of Object.entries(value as object)) {
          if (translations[lang] !== text) {
            diff['translations.' + lang] = {
              before: translations[lang] ?? null, after: text
            };
            translations[lang] = text;
          }
        }
        if (Object.keys(diff).some(k => k.startsWith('translations.'))) {
          after.translations = translations;
        }
      } else if (JSON.stringify(before[key]) !== JSON.stringify(value)) {
        diff[key] = { before: before[key] ?? null, after: value };
        after[key] = value;
      }
    }

    if (!Object.keys(diff).length) {
      return NextResponse.json({
        ok: true, applied: false, noChange: true, diff
      });
    }
    if (mode === 'dry-run') {
      return NextResponse.json({ ok: true, applied: false, id, diff });
    }

    fs.mkdirSync(backupDir, { recursive: true });
    const token = new Date().toISOString().replace(/[:.]/g, '-') +
      '-' + randomUUID();
    backupPath = path.join(backupDir, token + '-lexemes.json');
    fs.writeFileSync(backupPath, raw, { flag: 'wx' });

    rows[index] = after;
    const output = JSON.stringify(rows, null, 2) + '\n';
    temp = file + '.' + token + '.tmp';
    const fd = fs.openSync(temp, 'wx');
    try {
      fs.writeFileSync(fd, output, 'utf8');
      fs.fsyncSync(fd);
    } finally {
      fs.closeSync(fd);
    }

    if (!fs.readFileSync(file).equals(raw)) {
      return fail('Dosya başka işlemde değişti; yazma durduruldu.', 409);
    }
    fs.renameSync(temp, file);
    temp = undefined;
    applied = true;

    // Yazılan dosyanın tamamını doğrula.
    if (!fs.readFileSync(file).equals(Buffer.from(output, 'utf8'))) {
      throw new Error('Yazma sonrası dosya doğrulaması başarısız.');
    }

    let auditWarning: string | undefined;
    try {
      fs.appendFileSync(
        path.join(backupDir, 'audit.jsonl'),
        JSON.stringify({
          ts: new Date().toISOString(), id, diff, backupPath,
          beforeRevision: expectedRevision, afterRevision: rev(after)
        }) + '\n', 'utf8'
      );
    } catch {
      auditWarning = 'Kayıt başarılı; karar günlüğü yazılamadı.';
    }

    return NextResponse.json({
      ok: true, applied: true, lexeme: project(after),
      backupPath, auditWarning
    });
  } catch (err: any) {
    return NextResponse.json({
      ok: false, applied, backupPath,
      error: applied
        ? 'Dosya yazıldı fakat doğrulama tamamlanamadı. Tekrar kaydetmeden ' +
          'dosyayı kontrol edin. ' + err.message
        : err.message || 'Kayıt hatası.'
    }, { status: 500 });
  } finally {
    if (temp) {
      try { fs.unlinkSync(temp); } catch {}
    }
    if (lockFd !== undefined) {
      try { fs.closeSync(lockFd); } catch {}
      try { fs.unlinkSync(lock); } catch {}
    }
  }
}
