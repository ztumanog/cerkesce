'use client';

import React, { useState } from 'react';
import { DiscoveryRelationType } from '@/domain/discovery/types/DiscoveryRelationType';
import { RelationBadge } from '@/ui/components/discovery/RelationBadge';
import { RelationFilterBar } from '@/ui/components/discovery/RelationFilterBar';

interface CurationItem {
  id: string;
  sourceConcept: string;
  targetConcept: string;
  relationType: DiscoveryRelationType;
  score: number;
  provenance: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
}

const INITIAL_CURATION_ITEMS: CurationItem[] = [
  { id: 'cur-1', sourceConcept: 'Псэ', targetConcept: 'Гьэ', relationType: DiscoveryRelationType.DIALECT_VARIANT, score: 0.95, provenance: 'Huvaj Sözlüğü', status: 'PENDING' },
  { id: 'cur-2', sourceConcept: 'Псэ', targetConcept: 'Псэу', relationType: DiscoveryRelationType.CHILD, score: 0.88, provenance: 'Kural Motoru', status: 'PENDING' },
  { id: 'cur-3', sourceConcept: 'Дуней', targetConcept: 'Дуней-шхо', relationType: DiscoveryRelationType.COMPOUND, score: 0.90, provenance: 'Morfofonetik Analiz', status: 'APPROVED' },
  { id: 'cur-4', sourceConcept: 'ШӀэныгъэ', targetConcept: 'AкӀыл', relationType: DiscoveryRelationType.SYNONYM, score: 0.82, provenance: 'Kullanıcı Önerisi', status: 'PENDING' },
  { id: 'cur-5', sourceConcept: 'Къуэ', targetConcept: 'Бгы', relationType: DiscoveryRelationType.ANTONYM, score: 0.70, provenance: 'Kural Motoru', status: 'REJECTED' },
];

export default function ConceptCurationPage() {
  const [items, setItems] = useState<CurationItem[]>(INITIAL_CURATION_ITEMS);
  const [selectedTypes, setSelectedTypes] = useState<DiscoveryRelationType[]>(Object.values(DiscoveryRelationType));
  const [activeTab, setActiveTab] = useState<'PENDING' | 'APPROVED' | 'REJECTED'>('PENDING');

  const handleStatusChange = (id: string, newStatus: 'APPROVED' | 'REJECTED') => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, status: newStatus } : item));
  };

  const filteredItems = items.filter(
    item => item.status === activeTab && selectedTypes.includes(item.relationType)
  );

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Anlamsal Ağ ve Kavram Kürasyonu</h1>
          <p className="text-sm text-gray-500 mt-1">
            Otomatik tespit edilen veya önerilen kavram ilişkilerini inceleyin, doğrulayın veya reddedin.
          </p>
        </div>
      </div>

      {/* Durum Sekmeleri */}
      <div className="flex space-x-2 border-b border-gray-200">
        {(['PENDING', 'APPROVED', 'REJECTED'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab === 'PENDING' && `Bekleyenler (${items.filter(i => i.status === 'PENDING').length})`}
            {tab === 'APPROVED' && `Onaylananlar (${items.filter(i => i.status === 'APPROVED').length})`}
            {tab === 'REJECTED' && `Reddedilenler (${items.filter(i => i.status === 'REJECTED').length})`}
          </button>
        ))}
      </div>

      {/* İlişki Türü Filtreleme */}
      <RelationFilterBar selectedTypes={selectedTypes} onChange={setSelectedTypes} />

      {/* Kürasyon Tablosu */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 text-gray-700 uppercase text-xs">
            <tr>
              <th className="px-6 py-3">Kaynak Kavram</th>
              <th className="px-6 py-3">İlişki Türü</th>
              <th className="px-6 py-3">Hedef Kavram</th>
              <th className="px-6 py-3">Güven Skoru</th>
              <th className="px-6 py-3">Kaynak / Provenance</th>
              <th className="px-6 py-3 text-right">İşlemler</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredItems.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-gray-400">
                  Bu görünümde listelenecek kavram ilişkisi bulunamadı.
                </td>
              </tr>
            ) : (
              filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="px-6 py-4 font-semibold text-gray-900">{item.sourceConcept}</td>
                  <td className="px-6 py-4">
                    <RelationBadge type={item.relationType} showDescription={false} />
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900">{item.targetConcept}</td>
                  <td className="px-6 py-4 font-mono text-gray-600">%{Math.round(item.score * 100)}</td>
                  <td className="px-6 py-4 text-xs text-gray-500">{item.provenance}</td>
                  <td className="px-6 py-4 text-right space-x-2">
                    {item.status !== 'APPROVED' && (
                      <button
                        onClick={() => handleStatusChange(item.id, 'APPROVED')}
                        className="px-3 py-1 bg-emerald-600 text-white rounded text-xs hover:bg-emerald-700 transition"
                      >
                        Onayla
                      </button>
                    )}
                    {item.status !== 'REJECTED' && (
                      <button
                        onClick={() => handleStatusChange(item.id, 'REJECTED')}
                        className="px-3 py-1 bg-rose-600 text-white rounded text-xs hover:bg-rose-700 transition"
                      >
                        Reddet
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}