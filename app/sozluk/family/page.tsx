import fs from 'fs';
import path from 'path';
import Client from './client';

function readLinguisticArray(fileName: string, arrayKey: string): any[] {
  const filePath = path.join(process.cwd(), 'public', 'data', 'linguistic', fileName);
  if (!fs.existsSync(/*turbopackIgnore: true*/ filePath)) return [];
  try {
    const raw = fs.readFileSync(/*turbopackIgnore: true*/ filePath, 'utf-8');
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed;
    if (Array.isArray(parsed?.[arrayKey])) return parsed[arrayKey];
    if (Array.isArray(parsed?.families)) return parsed.families;
    return [];
  } catch {
    return [];
  }
}

export default function Page() {
  const rawFamilies = readLinguisticArray('word_families.json', 'wordFamilies');
  const rawLexemes = readLinguisticArray('lexemes.json', 'lexemes');

  const families = rawFamilies.map((f: any) => ({
    id: f.id || f.familyId,
    headword: f.headword || f.form || f.title || '',
    glossTr: f.glossTr || f.meaning || f.translations?.tr || '',
    rootId: f.rootId || (Array.isArray(f.rootIds) ? f.rootIds[0] : null) || null,
  }));

  const lexemes = rawLexemes
    .filter((l: any) => l.wordFamilyId)
    .map((l: any) => ({
      id: l.id,
      form: l.form || l.text || '',
      wordFamilyId: l.wordFamilyId,
      dialect: l.dialect || null,
      dialectVariants: l.dialectVariants || null,
      tr: l.translations?.tr || l.translations?.en || '',
    }));

  return <Client initialFamilies={families} initialLexemes={lexemes} />;
}
