import React from 'react';
import fs from 'fs';
import path from 'path';
import type { Metadata } from 'next';
import Link from 'next/link'; // <-- Yönlendirme için eklendi

import {
  ConceptGraphCanvas,
  CytoscapeElementData,
} from '@/ui/components/discovery/ConceptGraphCanvas';
import { GraphExportButtons } from '@/ui/components/discovery/GraphExport';
import { ConceptGraphAdapter } from '@/domain/discovery/adapters/ConceptGraphAdapter';
import { CytoscapeProjectionAdapter } from '@/domain/discovery/adapters/CytoscapeProjectionAdapter';
import { normalizePalochka } from '@/domain/utils/normalizePalochka';
import { FederatedGraphService } from '@/domain/federation/services/FederatedGraphService';
import { DiscoveryFacade } from '@/domain/discovery/services/DiscoveryFacade';
import { FileBasedConceptGraphRepository } from '@/repository/FileBasedConceptGraphRepository';
import { NetworkAnalyticsService } from '@/domain/analytics/services/NetworkAnalyticsService';
import { toExportNetwork, optimizeGraphDataForViewport } from '@/ui/components/discovery/graphExportUtils';

interface PageProps {
  params: Promise<{ concept: string }>; // veya Next 13/14'e göre senkron alıyorsan düzeltilebilir
}

export const metadata: Metadata = {
  title: 'Concept Relation Network | Adyghe & Kabardian Lexicon',
  description: 'Interactive Circassian concept network, cognates, and lexical families.',
};

function readJsonSafe<T>(filePath: string, fallback: T): T {
  try {
    if (!fs.existsSync(filePath)) return fallback;
    return JSON.parse(fs.readFileSync(filePath, 'utf-8').replace(/^\uFEFF/, '')) as T;
  } catch {
    return fallback;
  }
}

function formatTranslation(val?: string | string[]): string {
  if (!val) return '';
  if (Array.isArray(val)) return val.filter(Boolean).join(', ');
  return String(val).trim();
}

export default async function ConceptGraphPage({ params }: PageProps) {
  const { concept } = await params;
  const decodedConcept = decodeURIComponent(concept).trim();
  const conceptKey = decodedConcept.toUpperCase();

  const baseDir = path.join(process.cwd(), 'public', 'data', 'linguistic');
  const conceptWords = readJsonSafe<Record<string, { tr?: string; en?: string; words?: string[] }>>(
    path.join(baseDir, 'concept-words.json'),
    {}
  );
  const rawLexemes = readJsonSafe<any>(path.join(baseDir, 'lexemes.json'), []);
  const lexemes: any[] = (Array.isArray(rawLexemes) ? rawLexemes : rawLexemes.lexemes ?? []).filter((l: any) => l?.status !== 'uncertain');

  const meta = conceptWords[conceptKey] || conceptWords[decodedConcept] || null;
  const seedWords = Array.isArray(meta?.words) ? meta.words : [];
  const normQuery = normalizePalochka(decodedConcept).toLowerCase();
  const normSeeds = new Set(seedWords.map((w) => normalizePalochka(w).toLowerCase()));

  const matchedLexemes = lexemes.filter((l) => {
    const lexConcept = String(l.conceptId || '').toUpperCase();
    const formNorm = normalizePalochka(String(l.form || '')).toLowerCase();
    return (lexConcept && lexConcept === conceptKey) || ((!lexConcept || lexConcept === 'UNCLASSIFIED') && normSeeds.has(formNorm)) || formNorm === normQuery;
  });

  const inferredEn = formatTranslation(matchedLexemes.find((l) => formatTranslation(l.translations?.en))?.translations?.en);
  const enLabel = String(meta?.en || inferredEn || decodedConcept).trim();

  // --- Görev 1: Kavram keşif zinciri (DiscoveryFacade) ---
  // Not: FileBasedConceptGraphRepository komşuları kürasyon katmanı (~57 tohum kavram) +
  // lexemes.json veri katmanından (ortak aile/kök) türetir. Mapper eşleyemezse boş döner ve
  // sayfa mevcut mantıkla devam eder (fallback).
  let discoveryRelated: Array<{ conceptId: string; score: number }> = [];
  try {
    const discoveryFacade = new DiscoveryFacade(new FileBasedConceptGraphRepository());
    const discovery = await discoveryFacade.explore(conceptKey, {
      maxDepth: 2,
      hints: [decodedConcept, String(meta?.tr || ''), enLabel, ...seedWords.slice(0, 3)].filter(Boolean),
    });
    discoveryRelated = (discovery.rankedRelatedConcepts || [])
      .filter((r: any) => r?.conceptId && String(r.conceptId).toUpperCase() !== conceptKey)
      .map((r: any) => ({
        conceptId: String(r.conceptId),
        score: typeof r.score === 'number' ? r.score : 0.5,
      }));
  } catch {
    discoveryRelated = []; // keşif başarısızsa sayfa eski davranışla devam eder
  }

  const existingForms = new Set(matchedLexemes.map((l) => normalizePalochka(String(l.form || '')).toLowerCase()));
  const synthetic = seedWords
    .filter((w) => !existingForms.has(normalizePalochka(w).toLowerCase()))
    .map((w, i) => ({ id: `SEED-${conceptKey}-${i}`, form: w, dialect: 'COMMON' }));

  const allItems = [...matchedLexemes, ...synthetic];
  const familyIds = new Set(allItems.map((l) => l.wordFamilyId).filter(Boolean));
  const rootIds = new Set(allItems.flatMap((l) => l.rootIds || []).filter(Boolean));
  const itemIds = new Set(allItems.map((l) => l.id));

  const relatedLexemes =
    familyIds.size > 0 || rootIds.size > 0
      ? lexemes
          .filter((l) => !itemIds.has(l.id) && ((l.wordFamilyId && familyIds.has(l.wordFamilyId)) || (l.rootIds || []).some((r: string) => rootIds.has(r))))
          .slice(0, 10)
      : [];

  const graphRelated: any[] = [];
  const seenIds = new Set<string>([conceptKey]);

  allItems.slice(0, 22).forEach((item) => {
    const nodeId = String(item.form || '').trim();
    if (!nodeId || seenIds.has(nodeId)) return;
    seenIds.add(nodeId);
    const dialect = String(item.dialect || 'COMMON').toUpperCase();
    graphRelated.push({
      conceptId: nodeId,
      label: dialect !== 'COMMON' ? `${nodeId} (${dialect})` : nodeId,
      parentConceptId: conceptKey,
      relationType: 'CHILD',
      dialect,
      score: 0.98,
    });
  });

  relatedLexemes.slice(0, 8).forEach((rel) => {
    const nodeId = String(rel.form || '').trim();
    if (!nodeId || seenIds.has(nodeId)) return;
    seenIds.add(nodeId);
    const dialect = String(rel.dialect || 'COMMON').toUpperCase();
    graphRelated.push({
      conceptId: nodeId,
      label: dialect !== 'COMMON' ? `${nodeId} (${dialect})` : nodeId,
      parentConceptId: conceptKey,
      relationType: 'ROOT',
      dialect,
      score: 0.82,
    });
  });

  const enTokens = enLabel
    .toLowerCase()
    .split(/[^a-z]+/)
    .filter((t) => t.length >= 4 && !['with', 'from', 'that', 'this', 'into'].includes(t));

  if (enTokens.length > 0) {
    let added = 0;
    for (const [cKey, cVal] of Object.entries(conceptWords)) {
      if (cKey === conceptKey || seenIds.has(cKey)) continue;
      const cEnWords = String(cVal?.en || '').toLowerCase().split(/[^a-z]+/);
      if (enTokens.some((tok) => cEnWords.includes(tok))) {
        seenIds.add(cKey);
        const targetEn = String(cVal?.en || cKey).trim();
        graphRelated.push({
          conceptId: cKey,
          label: `${targetEn} [${cKey}]`,
          parentConceptId: conceptKey,
          relationType: 'RELATED',
          score: 0.85,
        });
        if (++added >= 6) break;
      }
    }
  }

  // --- Görev 1: DiscoveryFacade sonuçlarını grafa birleştir ---
  // Not: bu sayada relationType string-literal ('RELATED'), enum değil; seenIds tekilleştirme kümesi.
  discoveryRelated.forEach((dr) => {
    const nodeId = String(dr.conceptId || '').trim();
    if (!nodeId || seenIds.has(nodeId)) return;
    seenIds.add(nodeId);
    const drTr = String(conceptWords[nodeId.toUpperCase()]?.tr || '').trim();
    graphRelated.push({
      conceptId: nodeId,
      label: drTr ? `${drTr} [${nodeId}]` : nodeId,
      parentConceptId: conceptKey,
      relationType: 'RELATED',
      score: Math.min(0.95, Math.max(0.5, dr.score)),
    });
  });

  // Federasyon: Doğu Kabarday (KBD) + Batı Adige (ADY) düğümlerini id ile tekilleştir.
  // Not: LexemeDialect kanonik değerleri 'KBD' | 'ADY' | 'COMMON' (LexemeIdentity.normalizeDialect);
  // FederatedGraphService ise 'EASTERN_KABARDIAN' | 'WESTERN_ADYGHE' bekler — eşleme burada yapılır.
  // UYARI: graphRelated yukarıda seenIds ile zaten tekilleştirildiği için mergeSources pratikte
  // ayrık kümeleri birleştirir (no-op). Gerçek federasyon değeri, ayrı kaynak sözlükler
  // eklendiğinde ortaya çıkar; bağlantı o hazırlık içindir.
const kabardianNodes = graphRelated
  .filter((n) => String(n.dialect || '').toUpperCase() === 'KBD')
  .map((n) => ({ id: String(n.conceptId), dialect: 'EASTERN_KABARDIAN' as const, label: String(n.label) }));
const adygheNodes = graphRelated
  .filter((n) => String(n.dialect || '').toUpperCase() === 'ADY')
  .map((n) => ({ id: String(n.conceptId), dialect: 'WESTERN_ADYGHE' as const, label: String(n.label) }));
const mergedFederated = FederatedGraphService.mergeSources([kabardianNodes, adygheNodes]);
const mergedIds = new Set(mergedFederated.map((n) => n.id));
const federatedGraphRelated = graphRelated.filter((n) => {
  const d = String(n.dialect || '').toUpperCase();
  if (d !== 'KBD' && d !== 'ADY') return true;
  return mergedIds.has(String(n.conceptId));
});

const rootNodeTitle = `${enLabel} [${conceptKey}]`;

  const canonicalNetwork = ConceptGraphAdapter.toCanonicalNetwork({
    rootConceptId: conceptKey,
    canonicalName: rootNodeTitle,
    relatedConcepts: federatedGraphRelated,
  });
  const fullGraphData = CytoscapeProjectionAdapter.toCytoscapeFormat(canonicalNetwork) as CytoscapeElementData;

  // LargeGraphOptimizerService: graf 60 düğümü aşarsa viewport için budanır
  // (karar otoritesi servis — derece sıralaması; zengin düğüm verisi korunur).
  const { data: graphData, pruned } = optimizeGraphDataForViewport(fullGraphData, 60);

  // NetworkAnalyticsService: görünen ağın metrikleri (düğüm/kenar, yoğunluk, merkez kavram).
  const networkMetrics = NetworkAnalyticsService.analyzeNetwork(toExportNetwork(graphData));
  const degreeCentrality: Record<string, number> = networkMetrics.degreeCentrality || {};
  const hubEntry = Object.entries(degreeCentrality).sort((a, b) => b[1] - a[1])[0];
  const hubNode = hubEntry
    ? graphData.nodes.find((n) => String(n.data.id) === hubEntry[0])
    : undefined;
  const hubLabel = hubNode?.data.label || hubEntry?.[0] || '';

  return (
  <main className="min-h-[calc(100vh-64px)] bg-slate-950 px-4 pt-24 pb-6 sm:px-6 lg:px-8">
    <div className="mx-auto max-w-7xl">
      {/* KAVRAM ÇEVİRİLERİNE DÖNÜŞ BUTONU */}
      <div className="mb-6">
        <Link
          href={`/kavram/${conceptKey}`}
          className="text-sm text-slate-300 hover:text-white font-semibold bg-slate-800/80 hover:bg-slate-700 px-4 py-2 rounded-xl shadow-lg border border-slate-600 inline-flex items-center gap-2 transition-all backdrop-blur-sm"
        >
          &larr; Çevirilere Dön
        </Link>
      </div>

      {/* AĞI İNDİR - ExportEngineService ilk kez UI'a bağlandı (backend/UI kesişim taraması) */}
      <div className="mb-3">
        <GraphExportButtons data={graphData} conceptKey={conceptKey} />
      </div>

      {/* AĞ METRİKLERİ - NetworkAnalyticsService + LargeGraphOptimizerService (kesişim taraması) */}
      <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-1 rounded-lg border border-slate-700/60 bg-slate-900/60 px-3 py-2 text-xs text-slate-400">
        <span className="font-semibold text-slate-300">Ağ Metrikleri</span>
        <span>{networkMetrics.nodeCount} düğüm</span>
        <span>{networkMetrics.edgeCount} bağ</span>
        <span>yoğunluk {(networkMetrics.density ?? 0).toFixed(3)}</span>
        {hubEntry && hubEntry[1] > 0 && (
          <span>
            merkez:{' '}
            <span className="font-semibold text-slate-300">{hubLabel}</span>{' '}
            ({hubEntry[1]} bağ)
          </span>
        )}
        {networkMetrics.isolatedNodes.length > 0 && (
          <span>{networkMetrics.isolatedNodes.length} izole düğüm</span>
        )}
        {pruned && (
          <span className="text-amber-400" title="LargeGraphOptimizerService: düşük dereceli düğümler görünürlük için budandı">
            ⚡ {pruned.total - pruned.visible} düğüm performans için budandı (görünen: {pruned.visible}/{pruned.total})
          </span>
        )}
      </div>

      <ConceptGraphCanvas data={graphData} rootLabel={rootNodeTitle} />
    </div>
  </main>
);
}
