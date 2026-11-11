'use client';

import React, { useState } from 'react';
import { DiscoveryRelationType } from '@/domain/discovery/types/DiscoveryRelationType';
import { RelationFilterBar } from '@/ui/components/discovery/RelationFilterBar';
import { ConceptRelationList, RelatedConceptItem } from '@/ui/components/discovery/ConceptRelationList';

export default function ExplorerPage() {
  const [selectedTypes, setSelectedTypes] = useState<DiscoveryRelationType[]>([
    DiscoveryRelationType.ROOT,
    DiscoveryRelationType.SYNONYM,
    DiscoveryRelationType.DIALECT_VARIANT,
  ]);

  // Demo İlişkili Kavram Verileri
  const sampleItems: RelatedConceptItem[] = [
    { targetId: '1', targetConcept: 'Псэ (Can / Ruh)', relationType: DiscoveryRelationType.ROOT, score: 0.98 },
    { targetId: '2', targetConcept: 'Гьэ (Can - Diyalekt)', relationType: DiscoveryRelationType.DIALECT_VARIANT, score: 0.95 },
    { targetId: '3', targetConcept: 'Псэу (Yaşayan)', relationType: DiscoveryRelationType.CHILD, score: 0.88 },
    { targetId: '4', targetConcept: 'Дуней (Dünya)', relationType: DiscoveryRelationType.RELATED, score: 0.72 },
  ];

  const filteredItems = sampleItems.filter((item) => selectedTypes.includes(item.relationType));

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Kavram ve Anlamsal Ağ Kaşifi</h1>
        <p className="text-sm text-gray-500">
          Discovery engine tarafından tespit edilen anlamsal ilişkiler ve diyalekt bağlantıları.
        </p>
      </div>

      {/* İlişki Filtreleme Barı */}
      <RelationFilterBar selectedTypes={selectedTypes} onChange={setSelectedTypes} />

      {/* Anlamsal Liste Bileşeni */}
      <ConceptRelationList items={filteredItems} title="Aktif Filtreye Göre İlişkili Kavramlar" />
    </div>
  );
}