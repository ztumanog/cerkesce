import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import { resolveDialectVariantDisplay } from '@/lib/linguistic/dialectVariantsHelper';
import { generateNounDeclension } from '@/lib/linguistic/declensionGenerator';
import { generateVerbConjugation } from '@/lib/linguistic/verbConjugationGenerator';
import LexemeDetailClient from './LexemeDetailClient';

function loadLexemes() {
  const p = path.join(process.cwd(), 'public', 'data', 'linguistic', 'lexemes.json');
  const raw = JSON.parse(fs.readFileSync(p, 'utf-8'));
  return Array.isArray(raw) ? raw : raw.lexemes ?? [];
}

function formatTr(val: any): string {
  if (!val) return '';
  if (Array.isArray(val)) return val.filter(Boolean).join(', ');
  return String(val).trim();
}

export default async function LexemePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const decodedId = decodeURIComponent(id);
  const list = loadLexemes();
  const lex = list.find(
    (l: any) => l.id === decodedId || (Array.isArray(l.legacyIds) && l.legacyIds.includes(decodedId))
  );
  if (!lex) notFound();

  const variants = resolveDialectVariantDisplay({
    form: lex.form,
    dialect: lex.dialect,
    dialectVariants: lex.dialectVariants,
  });

  const posLower = String(lex.partOfSpeech || '').toLowerCase();
  const isVerb =
    posLower.includes('verb') ||
    posLower.includes('глагол') ||
    (String(lex.form || '').endsWith('н') && String(lex.form || '').length >= 3 && !posLower.includes('noun'));
  const isNoun = !isVerb && (!posLower || posLower.includes('noun') || posLower.includes('щыӀэцӀэ'));
  const declension = isNoun ? generateNounDeclension(lex.form) : null;
  const verbConjugation = isVerb ? generateVerbConjugation(lex.form) : null;

  const relatedLexemes = list
    .filter((item: any) => {
      if (item.id === lex.id || !item.form) return false;
      if (lex.wordFamilyId && item.wordFamilyId === lex.wordFamilyId) return true;
      if (Array.isArray(lex.rootIds) && lex.rootIds.length > 0 && Array.isArray(item.rootIds)) {
        return item.rootIds.some((r: string) => lex.rootIds.includes(r));
      }
      return false;
    })
    .slice(0, 10)
    .map((rel: any) => ({
      id: rel.id,
      form: rel.form,
      tr: formatTr(rel.translations?.tr) || rel.meaning || '',
      dialect: rel.dialect,
    }));

  const normalizedLex = {
    ...lex,
    translations: {
      tr: formatTr(lex.translations?.tr),
      en: formatTr(lex.translations?.en),
      ru: formatTr(lex.translations?.ru),
      ar: formatTr(lex.translations?.ar),
    },
  };

  return (
    <LexemeDetailClient
      lex={normalizedLex}
      variants={variants}
      verbConjugation={verbConjugation}
      declension={declension}
      relatedLexemes={relatedLexemes}
    />
  );
}
