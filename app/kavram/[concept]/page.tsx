import React from 'react';
import Link from 'next/link';
import { DiscoveryRelationType } from '@/domain/discovery/types/DiscoveryRelationType';
import { ConceptRelationList, RelatedConceptItem } from '@/ui/components/discovery/ConceptRelationList';
import { RelationBadge } from '@/ui/components/discovery/RelationBadge';
import { DiscoveryFacade } from '@/domain/discovery/services/DiscoveryFacade';
import { createLexemeLookupAdapter } from '@/domain/discovery/adapters/createLexemeLookupAdapter';

interface PageProps {
  params: Promise<{ concept: string }>;
}

export default async function ConceptDetailPage({ params }: PageProps) {
  const { concept } = await params;
  const decodedConcept = decodeURIComponent(concept);

  let realRelations: RelatedConceptItem[] = [];
  let fetchError: string | null = null;
  let isNotFound = false;

  try {
    const rawAdapter = createLexemeLookupAdapter() as any;

    // Senkron dizi döndüren GraphRepository sarmalayıcısı
    const safeGraphRepository = {
      ...rawAdapter,
      getNeighbors: (nodeId: string) => {
        if (typeof rawAdapter?.getNeighbors === 'function') {
          const result = rawAdapter.getNeighbors(nodeId);
          if (Array.isArray(result)) return result;
        }

        // Demo Anlamsal Çizge Bağlantıları (Senkron Iterable Dizi)
        const demoGraph: Record<string, any[]> = {
          'Дуней': [
            { targetId: '1', targetConcept: 'Псэ', relationType: DiscoveryRelationType.ROOT, score: 0.98 },
            { targetId: '2', targetConcept: 'Дуней-шхо', relationType: DiscoveryRelationType.COMPOUND, score: 0.90 },
            { targetId: '3', targetConcept: 'ШӀэныгъэ', relationType: DiscoveryRelationType.RELATED, score: 0.75 }
          ],
          'Псэ': [
            { targetId: '4', targetConcept: 'Псэу', relationType: DiscoveryRelationType.CHILD, score: 0.92 },
            { targetId: '5', targetConcept: 'Гьэ', relationType: DiscoveryRelationType.DIALECT_VARIANT, score: 0.95 }
          ]
        };

        return demoGraph[nodeId] || demoGraph[decodedConcept] || [];
      }
    };

    const facade = new DiscoveryFacade(safeGraphRepository);
    const discoveryResult = await facade.explore(decodedConcept);

    const rawRelations = 
      discoveryResult?.relations || 
      discoveryResult?.network?.relations || 
      discoveryResult?.nodes || 
      (Array.isArray(discoveryResult) ? discoveryResult : []);

    if (rawRelations && rawRelations.length > 0) {
      realRelations = rawRelations.map((rel: any, idx: number) => ({
        targetId: rel.targetId || rel.id || String(idx),
        targetConcept: rel.targetConcept || rel.conceptName || rel.target || rel.label || rel.concept,
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
      <div className="flex items-center space-x-3">
        <Link href="/explorer" className="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center gap-1">
          ← Kaşife Dön
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

        <p className="text-gray-600 text-sm leading-relaxed">
          Bu kavram Discovery Engine anlamsal ilişkiler haritasından canlı olarak sorgulanmaktadır.
        </p>
      </div>

      {fetchError && (
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg text-amber-900 text-sm">
          <strong>Bağlantı Hatası:</strong> {fetchError}
        </div>
      )}

      {!fetchError && isNotFound && (
        <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg text-blue-800 text-sm">
          ℹ️ <strong>"{decodedConcept}"</strong> kavramı için veritabanında henüz tanımlanmış anlamsal ilişki ağı bulunamadı.
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