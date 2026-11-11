import React from 'react';
import Link from 'next/link';
import { DiscoveryRelationType } from '@/domain/discovery/types/DiscoveryRelationType';
import { RelationBadge } from './RelationBadge';

export interface RelatedConceptItem {
  targetId: string;
  targetConcept: string;
  relationType: DiscoveryRelationType;
  score?: number;
}

interface ConceptRelationListProps {
  items: RelatedConceptItem[];
  title?: string;
}

export const ConceptRelationList: React.FC<ConceptRelationListProps> = ({
  items,
  title = 'İlişkili Kavramlar ve Anlamsal Ağ',
}) => {
  if (!items || items.length === 0) return null;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 my-4">
      <h3 className="text-sm font-semibold text-gray-700 mb-3">{title}</h3>
      <div className="space-y-2">
        {items.map((item, idx) => (
          <div key={`${item.targetId}-${idx}`} className="flex items-center justify-between py-1.5 border-b border-gray-50 last:border-0">
            <Link href={`/kavram/${encodeURIComponent(item.targetConcept)}`} className="text-sm font-medium text-blue-600 hover:text-blue-800">
              {item.targetConcept}
            </Link>
            <div className="flex items-center space-x-2">
              <RelationBadge type={item.relationType} showDescription />
              {item.score !== undefined && (
                <span className="text-xs text-gray-400 font-mono">
                  %{Math.round(item.score * 100)}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};