import React from 'react';
import Link from 'next/link';
import { DiscoveryRelationType } from '@/domain/discovery/types/DiscoveryRelationType';
import { ConceptRelationList } from '@/ui/components/discovery/ConceptRelationList';
import { RelationBadge } from '@/ui/components/discovery/RelationBadge';

interface PageProps {
  params: Promise<{ concept: string }>;
}

export default async function ConceptDetailPage({ params }: PageProps) {
  const { concept } = await params;
  const decodedConcept = decodeURIComponent(concept);

  // Demo İlişkili Ağ Bağlantıları
  const sampleRelations = [
    { targetId: '1', targetConcept: 'Псэ', relationType: DiscoveryRelationType.ROOT, score: 0.98 },
    { targetId: '2', targetConcept: 'Гьэ', relationType: DiscoveryRelationType.DIALECT_VARIANT, score: 0.95 },
    { targetId: '3', targetConcept: 'Псэу', relationType: DiscoveryRelationType.CHILD, score: 0.88 },
    { targetId: '4', targetConcept: 'Дуней', relationType: DiscoveryRelationType.RELATED, score: 0.72 },
  ].filter((item) => item.targetConcept !== decodedConcept);

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
          Bu kavram Discovery Engine anlamsal ilişkiler haritasında yer almaktadır. Diyalekt varyantları ve türetilmiş kök bağlantıları aşağıda listelenmiştir.
        </p>
      </div>

      {/* Kavrama Özel Anlamsal İlişki Listesi */}
      <ConceptRelationList
        title={`${decodedConcept} Kavramının Semantik Bağlantıları`}
        items={sampleRelations}
      />
    </div>
  );
}