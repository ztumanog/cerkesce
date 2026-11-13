import React from 'react';
import fs from 'fs';
import path from 'path';
import type { Metadata } from 'next';
import KavramlarExplorer, {
  ConceptTranslationGroup,
  ConceptMemberLexeme,
} from '@/components/dictionary/KavramlarExplorer';
import { normalizePalochka } from '@/domain/utils/normalizePalochka';

export const metadata: Metadata = {
  title: 'Kavram ve Çeviri Grupları | Çerkesçe Sözlük',
  description: 'Adıgece ve Kabardeyce kelimeleri ortak Türkçe ve çok dilli kavram çekirdekleri altında karşılaştırın.',
};

interface RawLexeme {
  id: string;
  form: string;
  dialect?: string;
  partOfSpeech?: string;
  ipa?: string;
  conceptId?: string;
  wordFamilyId?: string;
  rootIds?: string[];
  translations?: { tr?: string | string[]; en?: string | string[]; ru?: string | string[]; ar?: string | string[] };
  dialectVariants?: { adyghe?: string; kabardian?: string };
}

function toStringArray(val?: string | string[]): string[] {
  if (!val) return [];
  if (Array.isArray(val)) return val.map((v) => String(v).trim()).filter(Boolean);
  return String(val).split(/[,;]/).map((v) => v.trim()).filter(Boolean);
}

function humanizeConceptId(conceptId: string): string {
  return conceptId.replace(/^C[-_]/, '').replace(/[_-]+/g, ' ').toLowerCase().replace(/\b\w/g, (ch) => ch.toUpperCase());
}

export default function KavramlarPage() {
  const lexPath = path.join(process.cwd(), 'public', 'data', 'linguistic', 'lexemes.json');
  let rawList: RawLexeme[] = [];
  try {
    if (fs.existsSync(lexPath)) {
      const parsed = JSON.parse(fs.readFileSync(lexPath, 'utf-8').replace(/^\uFEFF/, ''));
      rawList = Array.isArray(parsed) ? parsed : Array.isArray(parsed?.lexemes) ? parsed.lexemes : [];
    }
  } catch {
    rawList = [];
  }

  const groupMap = new Map<string, {
    conceptId: string;
    trSet: Set<string>;
    enSet: Set<string>;
    ruSet: Set<string>;
    adyLexemes: ConceptMemberLexeme[];
    kbdLexemes: ConceptMemberLexeme[];
    commonLexemes: ConceptMemberLexeme[];
    seenForms: Set<string>;
  }>();

  for (const item of rawList) {
    const cid = String(item.conceptId || '').trim();
    const form = normalizePalochka(String(item.form || '').trim());
    if (!cid || !form) continue;

    let bucket = groupMap.get(cid);
    if (!bucket) {
      bucket = {
        conceptId: cid,
        trSet: new Set<string>(),
        enSet: new Set<string>(),
        ruSet: new Set<string>(),
        adyLexemes: [],
        kbdLexemes: [],
        commonLexemes: [],
        seenForms: new Set<string>(),
      };
      groupMap.set(cid, bucket);
    }

    const trArr = toStringArray(item.translations?.tr);
    const enArr = toStringArray(item.translations?.en);
    const ruArr = toStringArray(item.translations?.ru);
    const arArr = toStringArray(item.translations?.ar);
    trArr.forEach((t) => bucket!.trSet.add(t));
    enArr.forEach((t) => bucket!.enSet.add(t));
    ruArr.forEach((t) => bucket!.ruSet.add(t));

    const rawDialect = String(item.dialect || 'COMMON').toUpperCase();
    const dialect: 'ADY' | 'KBD' | 'COMMON' = rawDialect === 'ADY' ? 'ADY' : rawDialect === 'KBD' ? 'KBD' : 'COMMON';
    const dedupeKey = `${dialect}:${form}`;
    if (bucket.seenForms.has(dedupeKey)) continue;
    bucket.seenForms.add(dedupeKey);

    const member: ConceptMemberLexeme = {
      id: item.id,
      form,
      dialect,
      partOfSpeech: String(item.partOfSpeech || '').trim(),
      ipa: item.ipa,
      wordFamilyId: item.wordFamilyId,
      rootIds: item.rootIds,
      translations: { tr: trArr, en: enArr, ru: ruArr, ar: arArr },
      dialectVariants: item.dialectVariants,
    };

    if (dialect === 'ADY') bucket.adyLexemes.push(member);
    else if (dialect === 'KBD') bucket.kbdLexemes.push(member);
    else bucket.commonLexemes.push(member);
  }

  const groups: ConceptTranslationGroup[] = [];
  for (const bucket of groupMap.values()) {
    const cleanTr = Array.from(bucket.trSet).filter((t) => !/\d/.test(t));
    const fallbackTr = Array.from(bucket.trSet);
    const enList = Array.from(bucket.enSet);
    const ruList = Array.from(bucket.ruSet);
    const titleTr = (cleanTr.length > 0 ? cleanTr : fallbackTr).slice(0, 3).join(', ')
      || enList.slice(0, 2).join(', ')
      || humanizeConceptId(bucket.conceptId);
    const totalCount = bucket.adyLexemes.length + bucket.kbdLexemes.length + bucket.commonLexemes.length;
    const hasBothDialects = (bucket.adyLexemes.length > 0 && bucket.kbdLexemes.length > 0) || bucket.commonLexemes.length > 0;
    const allForms = [...bucket.adyLexemes, ...bucket.kbdLexemes, ...bucket.commonLexemes].map((l) => l.form);

    groups.push({
      conceptId: bucket.conceptId,
      titleTr,
      subtitleEn: enList.slice(0, 3).join(', '),
      subtitleRu: ruList.slice(0, 3).join(', '),
      adyLexemes: bucket.adyLexemes,
      kbdLexemes: bucket.kbdLexemes,
      commonLexemes: bucket.commonLexemes,
      totalCount,
      hasBothDialects,
      isBroadBucket: totalCount > 25,
      searchBlob: [bucket.conceptId, ...fallbackTr, ...enList, ...ruList, ...allForms].join(' ').toLowerCase(),
    });
  }

  return (
    <main className="min-h-screen">
      <KavramlarExplorer groups={groups} totalLexemeCount={rawList.length} />
    </main>
  );
}
