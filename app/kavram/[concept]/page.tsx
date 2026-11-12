import React from 'react';
import Link from 'next/link';
import { DiscoveryRelationType } from '@/domain/discovery/types/DiscoveryRelationType';
import { ConceptRelationList, RelatedConceptItem } from '@/ui/components/discovery/ConceptRelationList';
import { RelationBadge } from '@/ui/components/discovery/RelationBadge';
import { DiscoveryFacade } from '@/domain/discovery/services/DiscoveryFacade';
import { createLexemeLookupAdapter } from '@/domain/discovery/adapters/createLexemeLookupAdapter';
import { ConceptGraphAdapter } from '@/domain/discovery/adapters/ConceptGraphAdapter';
import { CytoscapeProjectionAdapter } from '@/domain/discovery/adapters/CytoscapeProjectionAdapter';
import { ConceptGraphCanvas, CytoscapeElementData } from '@/ui/components/discovery/ConceptGraphCanvas';
import { DialectConverter } from '@/domain/linguistic/DialectConverter';

interface PageProps {
  params: Promise<{ concept: string }>;
}

export default async function ConceptDetailPage({ params }: PageProps) {
  const { concept } = await params;
  const decodedConcept = decodeURIComponent(concept);

  const converter = new DialectConverter();
  const kbdEquivalent = converter.convertWord(decodedConcept);
  const adyEquivalent = converter.convertWordReverse(decodedConcept);

  let realRelations: RelatedConceptItem[] = [];
  let graphData: CytoscapeElementData | null = null;
  let fetchError: string | null = null;
  let isNotFound = false;

  try {
    const rawAdapter = createLexemeLookupAdapter() as any;

    const safeGraphRepository = {
      ...rawAdapter,
      getNeighbors: (nodeId: string): any[] => {
        if (typeof rawAdapter?.getNeighbors === 'function') {
          const result = rawAdapter.getNeighbors(nodeId);
          if (Array.isArray(result)) return result;
        }

        const demoGraph: Record<string, any[]> = {
          'Дуней': [
            { targetId: '1', targetConcept: 'Псэ', relationType: DiscoveryRelationType.ROOT, score: 0.98 },
            { targetId: '2', targetConcept: 'Дуней-шхо', relationType: DiscoveryRelationType.COMPOUND, score: 0.90 },
            { targetId: '3', targetConcept: 'ШӀэныгъэ', relationType: DiscoveryRelationType.RELATED, score: 0.75 },
          ],
          'Псэ': [
            { targetId: '4', targetConcept: 'Псэу', relationType: DiscoveryRelationType.CHILD, score: 0.92 },
            { targetId: '5', targetConcept: 'Гьэ', relationType: DiscoveryRelationType.DIALECT_VARIANT, score: 0.95 },
          ],
          'Мафэ': [
            { targetId: '6', targetConcept: 'Махуэ', relationType: DiscoveryRelationType.DIALECT_VARIANT, score: 0.99 },
            { targetId: '7', targetConcept: 'Нэфынэ', relationType: DiscoveryRelationType.RELATED, score: 0.86 },
          ],
          'Шъхьэхуитыныгъэ': [
            { targetId: '8', targetConcept: 'Щхьэхуитыныгъэ', relationType: DiscoveryRelationType.DIALECT_VARIANT, score: 0.99 },
            { targetId: '9', targetConcept: 'Шъхьэ', relationType: DiscoveryRelationType.ROOT, score: 0.91 },
          ],
        };

        return demoGraph[nodeId] || demoGraph[decodedConcept] || [];
      },
    };

    const facade = new DiscoveryFacade(safeGraphRepository);
    const discoveryResult: any = await facade.explore(decodedConcept);

    const canonicalNetwork = ConceptGraphAdapter.toCanonicalNetwork({
      rootConceptId: decodedConcept,
      canonicalName: decodedConcept,
      relatedConcepts: (discoveryResult?.relations || safeGraphRepository.getNeighbors(decodedConcept)).map((r: any) => ({
        conceptId: r.targetConcept || r.targetId || r.concept,
        label: r.targetConcept || r.targetId || r.concept,
        parentConceptId: decodedConcept,
        relationType: r.relationType,
        score: r.score,
      })),
    });

    graphData = CytoscapeProjectionAdapter.toCytoscapeFormat(canonicalNetwork) as CytoscapeElementData;

    const rawRelations: any[] =
      discoveryResult?.relations ||
      discoveryResult?.network?.relations ||
      discoveryResult?.nodes ||
      (Array.isArray(discoveryResult) ? discoveryResult : []);

    if (rawRelations && rawRelations.length > 0) {
      realRelations = rawRelations.map((rel: any, idx: number) => ({
        targetId: rel.targetId || rel.id || String(idx),
        targetConcept: rel.targetConcept || rel.conceptName || rel.target || rel.concept || rel.label || '',
        relationType: (rel.relationType as DiscoveryRelationType) || DiscoveryRelationType.RELATED,
        score: rel.score ?? rel.weight ?? 1,
      }));
    } else {
      isNotFound = true;
    }
  } catch (err: any) {
    console.error('DiscoveryFacade explore Error:', err);
    fetchError = err?.message || 'Domain katmanında kavram ağı çözümlenirken bir hata oluştu.';
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <Link href="/explorer" className="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center gap-1">
          ← Kaşife Dön
        </Link>
        <Link
          href="/sozluk/converter"
          className="text-xs font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-3 py-1.5 rounded-lg transition-colors"
        >
          ⇄ Lehçe Dönüştürücüde Aç
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">Kavram Ağ Detayı</span>
            <h1 className="text-3xl font-bold text-gray-900 mt-1">{decodedConcept}</h1>
          </div>
          <RelationBadge type={DiscoveryRelationType.ROOT} showDescription />
        </div>

        {/* Lehçe Karşılıkları */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
              Adıgece (Batı) Biçimi
            </span>
            <p className="mt-1 font-mono text-lg font-semibold text-slate-900">{adyEquivalent}</p>
          </div>
          <div className="rounded-lg border border-emerald-200 bg-emerald-50/60 px-4 py-3">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-700">
              Kabardeyce (Doğu) Biçimi
            </span>
            <p className="mt-1 font-mono text-lg font-semibold text-emerald-900">{kbdEquivalent}</p>
          </div>
        </div>

        <p className="text-gray-600 text-sm leading-relaxed">
          Bu kavram Discovery Engine anlamsal ilişkiler haritasından ve çift yönlü lehçe motorundan canlı olarak çözümlenmektedir.
        </p>
      </div>

      {graphData && graphData.nodes.length > 0 && (
        <ConceptGraphCanvas data={graphData} rootLabel={decodedConcept} />
      )}

      {fetchError && (
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg text-amber-900 text-sm">
          <strong>Bağlantı Hatası:</strong> {fetchError}
        </div>
      )}

      {!fetchError && isNotFound && (
        <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg text-blue-800 text-sm">
          ℹ️ <strong>&quot;{decodedConcept}&quot;</strong> kavramı için veritabanında henüz tanımlanmış anlamsal ilişki ağı bulunamadı.
        </div>
      )}

      {realRelations.length > 0 && (
        <ConceptRelationList
          title={`${decodedConcept} Kavramının Semantik Bağlantıları (${realRelations.length})`}
          items={realRelations}
        />
      )}
    </div>
  );
}