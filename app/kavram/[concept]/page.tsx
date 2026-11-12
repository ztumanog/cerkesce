import React from 'react';
import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import { DiscoveryRelationType } from '@/domain/discovery/types/DiscoveryRelationType';
import { ConceptRelationList, RelatedConceptItem } from '@/ui/components/discovery/ConceptRelationList';
import { RelationBadge } from '@/ui/components/discovery/RelationBadge';
import { ConceptGraphAdapter } from '@/domain/discovery/adapters/ConceptGraphAdapter';
import { CytoscapeProjectionAdapter } from '@/domain/discovery/adapters/CytoscapeProjectionAdapter';
import { ConceptGraphCanvas, CytoscapeElementData } from '@/ui/components/discovery/ConceptGraphCanvas';
import { DialectConverter } from '@/domain/linguistic/DialectConverter';
import { normalizePalochka } from '@/domain/utils/normalizePalochka';

interface PageProps {
  params: Promise<{ concept: string }>;
}

interface ConceptLexemeItem {
  id: string;
  form: string;
  ipa?: string | null;
  dialect?: string | null;
  partOfSpeech?: string | null;
  literalMeaning?: string | null;
  wordFamilyId?: string | null;
  rootIds?: string[];
  translations?: {
    tr?: string | string[];
    en?: string | string[];
    ru?: string | string[];
    ar?: string | string[];
    [key: string]: string | string[] | undefined;
  };
  dialectVariants?: {
    adyghe?: string;
    kabardian?: string;
  } | null;
}

function readJsonSafe<T>(filePath: string, fallback: T): T {
  try {
    if (!fs.existsSync(filePath)) return fallback;
    const raw = fs.readFileSync(filePath, 'utf-8').replace(/^\uFEFF/, '');
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function formatTranslation(val?: string | string[]): string {
  if (!val) return '';
  if (Array.isArray(val)) return val.filter(Boolean).join(', ');
  return String(val).trim();
}

function isCircassianScript(text: string): boolean {
  return /[\u0400-\u04FF]/.test(text);
}

export default async function ConceptDetailPage({ params }: PageProps) {
  const { concept } = await params;
  const decodedConcept = decodeURIComponent(concept).trim();
  const conceptKey = decodedConcept.toUpperCase();

  const baseDir = path.join(process.cwd(), 'public', 'data', 'linguistic');
  const conceptWords = readJsonSafe<Record<string, { tr?: string; en?: string; ru?: string; ar?: string; words?: string[] }>>(
    path.join(baseDir, 'concept-words.json'),
    {}
  );
  const conceptTr = readJsonSafe<Record<string, string>>(
    path.join(baseDir, 'concept-tr.json'),
    {}
  );
  const rawLexemes = readJsonSafe<any>(path.join(baseDir, 'lexemes.json'), []);
  const lexemes: ConceptLexemeItem[] = Array.isArray(rawLexemes) ? rawLexemes : rawLexemes.lexemes ?? [];

  const meta = conceptWords[conceptKey] || conceptWords[decodedConcept] || null;
  const seedWords = Array.isArray(meta?.words) ? meta.words : [];

  const normQuery = normalizePalochka(decodedConcept).toLowerCase();
  const normSeeds = new Set(seedWords.map((w) => normalizePalochka(w).toLowerCase()));

  const matchedLexemes = lexemes.filter((l) => {
    const lexConcept = String((l as any).conceptId || '').toUpperCase();
    const formNorm = normalizePalochka(String(l.form || '')).toLowerCase();
    if (lexConcept && lexConcept === conceptKey) return true;
    if (normSeeds.has(formNorm)) return true;
    if (isCircassianScript(decodedConcept) && formNorm === normQuery) return true;
    return false;
  });

  // Kavram meta verisi eksikse ilk eslesen maddelerden TR, EN, RU ve AR karsiliklarini cikar
  const inferredTr = formatTranslation(matchedLexemes.find((l) => formatTranslation(l.translations?.tr))?.translations?.tr);
  const inferredEn = formatTranslation(matchedLexemes.find((l) => formatTranslation(l.translations?.en))?.translations?.en);
  const inferredRu = formatTranslation(matchedLexemes.find((l) => formatTranslation(l.translations?.ru))?.translations?.ru);
  const inferredAr = formatTranslation(matchedLexemes.find((l) => formatTranslation(l.translations?.ar))?.translations?.ar);

  const trLabel = meta?.tr || conceptTr[conceptKey] || conceptTr[decodedConcept] || inferredTr || '';
  const enLabel = meta?.en || (isCircassianScript(decodedConcept) ? inferredEn : decodedConcept);
  const ruLabel = meta?.ru || inferredRu || '';
  const arLabel = meta?.ar || inferredAr || '';

  const existingForms = new Set(
    matchedLexemes.map((l) => normalizePalochka(String(l.form || '')).toLowerCase())
  );
  const syntheticItems: ConceptLexemeItem[] = seedWords
    .filter((w) => !existingForms.has(normalizePalochka(w).toLowerCase()))
    .map((w, i) => ({
      id: `SEED-${conceptKey}-${i}`,
      form: w,
      translations: { tr: trLabel, en: enLabel, ru: ruLabel, ar: arLabel },
    }));

  const allItems: ConceptLexemeItem[] = [...matchedLexemes, ...syntheticItems];

  const familyIds = new Set(allItems.map((l) => l.wordFamilyId).filter(Boolean));
  const rootIds = new Set(allItems.flatMap((l) => l.rootIds || []).filter(Boolean));
  const itemIds = new Set(allItems.map((l) => l.id));

  const relatedLexemes =
    familyIds.size > 0 || rootIds.size > 0
      ? lexemes
          .filter((l) => {
            if (itemIds.has(l.id)) return false;
            const sameFamily = l.wordFamilyId && familyIds.has(l.wordFamilyId);
            const sameRoot = (l.rootIds || []).some((r) => rootIds.has(r));
            return Boolean(sameFamily || sameRoot);
          })
          .slice(0, 12)
      : [];

  const converter = new DialectConverter();
  const primaryWord =
    allItems[0]?.form ||
    seedWords[0] ||
    (isCircassianScript(decodedConcept) ? decodedConcept : '');

  const explicitAdy =
    allItems.find((l) => String(l.dialect || '').toLowerCase().startsWith('ady'))?.form ||
    allItems[0]?.dialectVariants?.adyghe ||
    '';
  const explicitKbd =
    allItems.find((l) => String(l.dialect || '').toLowerCase().startsWith('kbd'))?.form ||
    allItems[0]?.dialectVariants?.kabardian ||
    '';

  const adyEquivalent =
    explicitAdy || (primaryWord ? converter.convertWordReverse(primaryWord) : '—');
  const kbdEquivalent =
    explicitKbd || (primaryWord ? converter.convertWord(primaryWord) : '—');

  const graphRelated: Array<{
    conceptId: string;
    label: string;
    parentConceptId: string;
    relationType: DiscoveryRelationType;
    score: number;
  }> = [];

  allItems.slice(0, 20).forEach((item) => {
    const trHint = formatTranslation(item.translations?.tr);
    graphRelated.push({
      conceptId: item.form,
      label: trHint ? `${item.form} (${trHint.split(',')[0].trim()})` : item.form,
      parentConceptId: trLabel || decodedConcept,
      relationType: DiscoveryRelationType.CHILD,
      score: 0.98,
    });
  });

  relatedLexemes.slice(0, 8).forEach((rel) => {
    graphRelated.push({
      conceptId: rel.form,
      label: rel.form,
      parentConceptId: trLabel || decodedConcept,
      relationType: DiscoveryRelationType.ROOT,
      score: 0.82,
    });
  });

  const trTokens = trLabel
    .toLowerCase()
    .split(/[,;/\s]+/)
    .map((t) => t.trim())
    .filter((t) => t.length >= 3);

  const neighborConcepts: RelatedConceptItem[] = [];
  if (trTokens.length > 0) {
    for (const [cKey, cVal] of Object.entries(conceptWords)) {
      if (cKey === conceptKey) continue;
      const cTr = String(cVal?.tr || '').toLowerCase();
      if (trTokens.some((tok) => cTr.includes(tok))) {
        neighborConcepts.push({
          targetId: cKey,
          targetConcept: cKey,
          relationType: DiscoveryRelationType.RELATED,
          score: 0.85,
        });
        if (neighborConcepts.length >= 6) break;
      }
    }
  }

  neighborConcepts.forEach((nc) => {
    const ncTr = conceptWords[nc.targetConcept]?.tr;
    graphRelated.push({
      conceptId: nc.targetConcept,
      label: ncTr ? `${ncTr} [${nc.targetConcept}]` : nc.targetConcept,
      parentConceptId: trLabel || decodedConcept,
      relationType: DiscoveryRelationType.RELATED,
      score: 0.8,
    });
  });

  const rootNodeTitle = trLabel
    ? `${trLabel}${enLabel && enLabel.toLowerCase() !== trLabel.toLowerCase() ? ` (${enLabel})` : ''}`
    : decodedConcept;

  const canonicalNetwork = ConceptGraphAdapter.toCanonicalNetwork({
    rootConceptId: conceptKey,
    canonicalName: rootNodeTitle,
    relatedConcepts: graphRelated,
  });

  const graphData = CytoscapeProjectionAdapter.toCytoscapeFormat(
    canonicalNetwork
  ) as CytoscapeElementData;

  const displayTitle = trLabel || enLabel || decodedConcept;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <Link
          href="/explorer"
          className="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center gap-1"
        >
          ← Kavram Kaşifine Dön
        </Link>
        <div className="flex items-center gap-2">
          {primaryWord && (
            <Link
              href={`/sozluk?q=${encodeURIComponent(primaryWord)}`}
              className="text-xs font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 px-3 py-1.5 rounded-lg transition-colors"
            >
              📖 Sözlükte Ara ({primaryWord})
            </Link>
          )}
          <Link
            href="/sozluk/converter"
            className="text-xs font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-3 py-1.5 rounded-lg transition-colors"
          >
            ⇄ Lehçe Dönüştürücüde Aç
          </Link>
        </div>
      </div>

      {/* Ana Kavram Karti */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
                Kavram Ağ Detayı
              </span>
              <span className="rounded bg-slate-100 px-2 py-0.5 font-mono text-[11px] font-semibold text-slate-600">
                #{conceptKey}
              </span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mt-1">{displayTitle}</h1>
          </div>
          <RelationBadge type={DiscoveryRelationType.ROOT} showDescription />
        </div>

        {/* Çok Dilli Kavram Karşılıkları (TR / EN / RU / AR) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
          <div className="rounded-lg border border-sky-200 bg-sky-50/70 px-3 py-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-sky-700">TR · Türkçe</span>
            <p className="mt-0.5 text-sm font-semibold text-slate-900 line-clamp-2">{trLabel || '—'}</p>
          </div>
          <div className="rounded-lg border border-indigo-200 bg-indigo-50/70 px-3 py-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700">EN · English</span>
            <p className="mt-0.5 text-sm font-semibold text-slate-900 line-clamp-2">{enLabel || '—'}</p>
          </div>
          <div className="rounded-lg border border-rose-200 bg-rose-50/70 px-3 py-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700">RU · Русский</span>
            <p className="mt-0.5 text-sm font-semibold text-slate-900 line-clamp-2">{ruLabel || '—'}</p>
          </div>
          <div className="rounded-lg border border-amber-200 bg-amber-50/70 px-3 py-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">AR · العربية</span>
            <p dir="rtl" className="mt-0.5 text-sm font-semibold text-slate-900 line-clamp-2">{arLabel || '—'}</p>
          </div>
        </div>

        {/* Lehçe Karşılıkları */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
              Adıgece (Batı) Karşılığı
            </span>
            <p className="mt-1 font-mono text-lg font-semibold text-slate-900">{adyEquivalent}</p>
          </div>
          <div className="rounded-lg border border-emerald-200 bg-emerald-50/60 px-4 py-3">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-700">
              Kabardeyce (Doğu) Karşılığı
            </span>
            <p className="mt-1 font-mono text-lg font-semibold text-emerald-900">
              {kbdEquivalent}
            </p>
          </div>
        </div>

        <p className="text-gray-600 text-sm leading-relaxed">
          Bu kavram için sözlük veritabanında{' '}
          <strong className="text-slate-900">{allItems.length} Çerkesçe madde</strong>
          {relatedLexemes.length > 0 && (
            <>
              {' '}
              ve aynı kökten türeyen{' '}
              <strong className="text-slate-900">{relatedLexemes.length} akraba kelime</strong>
            </>
          )}{' '}
          listelenmektedir.
        </p>
      </div>

      {/* Kavrama Bagli Cerkesce Kelimeler Listesi */}
      {allItems.length > 0 ? (
        <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">
              Bu Kavrama Bağlı Çerkesçe Kelimeler ({allItems.length})
            </h2>
            <span className="text-xs text-slate-500">Detay için kelimeye tıklayın</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {allItems.map((item) => {
              const trText = formatTranslation(item.translations?.tr) || trLabel;
              const enText = formatTranslation(item.translations?.en);
              const ruText = formatTranslation(item.translations?.ru);
              const arText = formatTranslation(item.translations?.ar);
              const isSynthetic = item.id.startsWith('SEED-');
              const targetHref = isSynthetic
                ? `/sozluk?q=${encodeURIComponent(item.form)}`
                : `/lexeme/${encodeURIComponent(item.id)}`;

              return (
                <Link
                  key={item.id}
                  href={targetHref}
                  className="group rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-blue-50/50 hover:border-blue-300 p-4 transition-all flex flex-col justify-between gap-2"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xl font-bold text-slate-900 group-hover:text-blue-700">
                        {item.form}
                      </span>
                      <div className="flex items-center gap-1.5">
                        {item.dialect && (
                          <span className="rounded bg-white border border-slate-200 px-2 py-0.5 text-[10px] font-bold uppercase text-slate-600">
                            {item.dialect}
                          </span>
                        )}
                        {item.partOfSpeech && (
                          <span className="rounded bg-indigo-50 px-2 py-0.5 text-[10px] font-semibold text-indigo-700">
                            {item.partOfSpeech}
                          </span>
                        )}
                      </div>
                    </div>

                    {item.ipa && (
                      <div className="text-xs font-mono text-slate-500 mt-0.5">[{item.ipa}]</div>
                    )}

                    {/* Çok dilli çeviri satırları */}
                    <div className="mt-2 space-y-1">
                      {trText && (
                        <p className="text-sm font-medium text-slate-800">
                          <span className="inline-block w-7 text-[10px] font-bold text-sky-700">TR</span>
                          {trText}
                        </p>
                      )}
                      {enText && (
                        <p className="text-xs text-slate-600">
                          <span className="inline-block w-7 text-[10px] font-bold text-indigo-700">EN</span>
                          {enText}
                        </p>
                      )}
                      {ruText && (
                        <p className="text-xs text-slate-700">
                          <span className="inline-block w-7 text-[10px] font-bold text-rose-700">RU</span>
                          {ruText}
                        </p>
                      )}
                      {arText && (
                        <p className="text-xs text-slate-700 flex items-center gap-1.5">
                          <span className="inline-block w-7 text-[10px] font-bold text-amber-800 shrink-0">AR</span>
                          <span dir="rtl">{arText}</span>
                        </p>
                      )}
                    </div>

                    {item.literalMeaning && (
                      <p className="text-xs italic text-amber-800 mt-1.5">
                        Birebir: “{item.literalMeaning}”
                      </p>
                    )}
                  </div>

                  <div className="pt-2 border-t border-slate-200/70 flex items-center justify-between text-[11px] text-slate-500">
                    <span>
                      ADY: <strong className="text-slate-700">{converter.convertWordReverse(item.form)}</strong> · KBD:{' '}
                      <strong className="text-slate-700">{converter.convertWord(item.form)}</strong>
                    </span>
                    <span className="font-semibold text-blue-600 group-hover:translate-x-0.5 transition-transform">
                      İncele →
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      ) : (
        <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg text-blue-800 text-sm">
          ℹ️ <strong>&quot;{decodedConcept}&quot;</strong> kavramı için henüz eşleştirilmiş kelime kaydı bulunamadı.
        </div>
      )}

      {relatedLexemes.length > 0 && (
        <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-3">
          <h2 className="text-base font-bold text-slate-900">
            Aynı Kök ve Kelime Ailesinden İlişkili Sözcükler ({relatedLexemes.length})
          </h2>
          <div className="flex flex-wrap gap-2">
            {relatedLexemes.map((rel) => {
              const relTr = formatTranslation(rel.translations?.tr);
              return (
                <Link
                  key={rel.id}
                  href={`/lexeme/${encodeURIComponent(rel.id)}`}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-emerald-50 hover:border-emerald-300 px-3 py-1.5 text-sm transition-colors"
                >
                  <span className="font-bold text-slate-900">{rel.form}</span>
                  {relTr && <span className="text-xs text-slate-500">— {relTr}</span>}
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {graphData && graphData.nodes.length > 0 && (
        <ConceptGraphCanvas data={graphData} rootLabel={rootNodeTitle} />
      )}

      {neighborConcepts.length > 0 && (
        <ConceptRelationList
          title={`İlişkili Kavram Ağları (${neighborConcepts.length})`}
          items={neighborConcepts.map((nc) => ({
            ...nc,
            targetConcept: conceptWords[nc.targetConcept]?.tr
              ? `${conceptWords[nc.targetConcept].tr} (${nc.targetConcept})`
              : nc.targetConcept,
          }))}
        />
      )}
    </div>
  );
}