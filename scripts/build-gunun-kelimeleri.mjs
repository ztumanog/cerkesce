#!/usr/bin/env node
/**
 * Günün Kelimesi havuz dosyası üretici (build-time)
 * =================================================
 * SSOT (lexemes.json senses.examples) + Abaze İbrahim sözlüğündeki örnekli
 * maddeleri normalize edip küçük bir havuz JSON'una yazar:
 *   public/data/gunun-kelimeleri.json
 * Kartın istemcide 58 MB'lık lexemes.json'u indirmesi gerekmez.
 *
 * Çalıştırma: node scripts/build-gunun-kelimeleri.mjs
 * Yenileme: örnek cümle eklendikçe (kürasyon/çeşitleme) tekrar çalıştırılır.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const KOK = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const LEX_YOLU = path.join(KOK, 'public/data/linguistic/lexemes.json');
const ABAZE_YOLU = path.join(KOK, 'public/data/27.Tur-Ady_Abaze.json');
const CIKTI_YOLU = path.join(KOK, 'public/data/gunun-kelimeleri.json');

const KIRIL_RE = /[Ѐ-ӿ]/;

/** Bileşenden taşınan HTML temizleme (çift encoded dahil) */
function htmlTemizle(value) {
  if (!value) return '';
  let text = String(value);
  for (let i = 0; i < 2; i++) {
    text = text.replace(/&lt;.*?&gt;/gi, ' ');
    text = text.replace(/<[^>]+>/g, ' ');
    text = text
      .replace(/&nbsp;/gi, ' ')
      .replace(/&amp;/gi, '&')
      .replace(/&lt;/gi, '<')
      .replace(/&gt;/gi, '>')
      .replace(/&quot;/gi, '"')
      .replace(/&#39;/gi, "'");
  }
  return text.replace(/\s+/g, ' ').trim();
}

/** Çok anlamlı tanımdan ilk anlamı alır (bileşenden taşınan mantık) */
function ilkAnlam(metin) {
  let t = metin.replace(/\s+/g, ' ').trim();
  t = t.replace(/^(?:I{1,3}|IV|V|VI)\.?\s+/, '');
  t = t.split(/\s+(?:II|III|IV|V|VI)\.?\s+/)[0];
  t = t.replace(/^\d+[.)]\s*/, '');
  t = t.split(/\s+\d+[.)]\s+/)[0];
  return t.replace(/[\s,;:.]+$/, '').trim();
}

function jsonOku(yol) {
  return JSON.parse(fs.readFileSync(yol, 'utf-8').replace(/^﻿/, ''));
}

/** SSOT: senses.examples'ı olan kayıtlar (çevirili örnek çiftleriyle) */
function ssotHavuzu() {
  const data = jsonOku(LEX_YOLU);
  const havuz = [];
  for (const x of data) {
    const ciftler = [];
    let anlam = '';
    for (const s of x.senses || []) {
      if (!s || typeof s !== 'object') continue;
      if (!anlam) anlam = String(s.tr || '').trim();
      for (const ex of s.examples || []) {
        if (ex && typeof ex === 'object' && ex.kbd) {
          ciftler.push({ metin: String(ex.kbd).trim(), ceviri: String(ex.tr || '').trim() || null });
        }
      }
    }
    if (ciftler.length === 0) continue;
    if (!anlam) {
      const tr = x.translations;
      anlam = (tr && typeof tr === 'object' && tr.tr) || '';
    }
    const lemma = String(x.form || '').trim();
    if (!lemma || !anlam) continue;
    havuz.push({
      id: x.id,
      lemma,
      translation: anlam,
      dialect: String(x.id).includes('-KBD-') ? 'Kabardeyce' : 'Çerkesçe',
      ornekCiftleri: ciftler,
      kaynak: 'ssot',
    });
  }
  return havuz;
}

/** Abaze İbrahim: ◊ işaretli örnekli maddeler */
function abazeHavuzu() {
  const data = jsonOku(ABAZE_YOLU);
  const words = (data && data.words) || {};
  const havuz = [];
  for (const [wid, value] of Object.entries(words)) {
    const item = value && typeof value === 'object' ? value : {};
    const ham = htmlTemizle(item.full_definition_in_html);
    const parcalar = ham.split('◊');
    const anlam = parcalar[0].trim().replace(/[,;]\s*$/, '');
    const ornekler = parcalar
      .slice(1)
      .map((p) => p.trim().replace(/^[-–—]\s*/, ''))
      .filter((p) => p.length > 0 && p.length < 80)
      .filter((p) => !/^\d+\./.test(p))
      .filter((p) => !/^[IVX]+\./.test(p));
    if (ornekler.length === 0) continue;

    const spelling = String(item.spelling || wid).trim();
    const spellingCirc = KIRIL_RE.test(spelling);
    const definitionCirc = KIRIL_RE.test(anlam);

    let lemma, translation;
    if (!spellingCirc && definitionCirc) {
      lemma = ilkAnlam(anlam);
      translation = spelling;
    } else if (spellingCirc && !definitionCirc) {
      lemma = spelling;
      translation = anlam;
    } else if (spellingCirc && definitionCirc) {
      continue; // tanım muhtemelen Rusça — atla
    } else {
      lemma = spelling;
      translation = anlam;
    }
    if (!lemma || !translation) continue;

    havuz.push({
      id: `abaze-${wid}`,
      lemma,
      translation,
      dialect: 'Adigece',
      ornekCiftleri: ornekler.map((o) => ({ metin: o, ceviri: null })),
      kaynak: 'abaze',
    });
  }
  return havuz;
}

const ssot = ssotHavuzu();
const abaze = abazeHavuzu();
const cikti = {
  version: new Date().toISOString().split('T')[0],
  aciklama: 'Günün Kelimesi havuzu — SSOT (lexemes senses.examples) + Abaze İbrahim örnekli maddeleri',
  ssot,
  abaze,
};
fs.writeFileSync(CIKTI_YOLU, JSON.stringify(cikti), 'utf-8');
console.log(
  `SSOT: ${ssot.length} madde | Abaze: ${abaze.length} madde -> gunun-kelimeleri.json ` +
    `(${Math.round(fs.statSync(CIKTI_YOLU).size / 1024)} KB)`
);
