import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MultiLanguageConceptTable } from '@/components/features/MultiLanguageConceptTable';
import fs from 'fs';
import path from 'path';

async function getConceptData(conceptId: string) {
  const lexemesPath = path.resolve('./public/data/linguistic/lexemes.json');
  const lexemes = JSON.parse(fs.readFileSync(lexemesPath, 'utf-8'));

  const items = lexemes
    .filter((l: any) => l.isLemma && l.conceptId === conceptId.toUpperCase())
    .map((l: any) => ({
      id: l.id,
      term: l.form,
      translation: l.translations?.tr || l.translations?.en || l.literalMeaning || '',
      description: l.notes || '',
      examples: l.examples || [],
      language: l.dialectVariants?.adyghe ? 'Adığce' : 'Kabardeyce',
      ipa: l.ipa,
      sources: l.sources || [],
    }));

  return { conceptId: conceptId.toUpperCase(), items };
}

export default async function KavramPage({
  params,
}: {
  params: Promise<{ concept: string }>;
}) {
  const { concept } = await params;
  const data = await getConceptData(concept);

  if (data.items.length === 0) {
    notFound();
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-5xl">
      <nav className="mb-6">
        <Link href="/" className="text-emerald-600 hover:underline text-sm">
          ← Ana Sayfa
        </Link>
      </nav>

      <h1 className="text-3xl font-bold mb-2">
        Kavram: {data.conceptId}
      </h1>
      <p className="text-slate-600 mb-6">
        {data.items.length} dilde karşılık bulundu
      </p>

      <MultiLanguageConceptTable
        title={`${data.conceptId} — Çok Dilli Karşılıklar`}
        concepts={data.items}
      />

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Kaynaklar</h2>
        <ul className="list-disc list-inside text-sm text-slate-600">
          {Array.from(new Set(data.items.flatMap((i: any) => i.sources))).map((s: any, i: number) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
