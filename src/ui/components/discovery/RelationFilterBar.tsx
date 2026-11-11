import React from 'react';
import { DiscoveryRelationType } from '@/domain/discovery/types/DiscoveryRelationType';
import { getRelationMeta } from './relationMapper';

interface RelationFilterBarProps {
  selectedTypes: DiscoveryRelationType[];
  onChange: (types: DiscoveryRelationType[]) => void;
}

export const RelationFilterBar: React.FC<RelationFilterBarProps> = ({
  selectedTypes,
  onChange,
}) => {
  const rawValues = Object.values(DiscoveryRelationType);
  const allTypes = rawValues.filter(
    (v, idx, self) => typeof v === 'string' && self.indexOf(v) === idx
  ) as DiscoveryRelationType[];

  const toggleType = (type: DiscoveryRelationType) => {
    if (selectedTypes.includes(type)) {
      onChange(selectedTypes.filter((t) => t !== type));
    } else {
      onChange([...selectedTypes, type]);
    }
  };

  return (
    <div className="flex flex-wrap gap-2 p-3 bg-gray-50 rounded-md border border-gray-200">
      <span className="text-xs font-bold text-gray-500 self-center mr-2">İlişki Filtresi:</span>
      {allTypes.map((type) => {
        const meta = getRelationMeta(type);
        const isSelected = selectedTypes.includes(type);
        return (
          <button
            key={String(type)}
            onClick={() => toggleType(type)}
            className={`px-2.5 py-1 text-xs rounded-full border transition-all ${
              isSelected ? 'font-bold shadow-sm' : 'opacity-40 grayscale'
            }`}
            style={{
              color: isSelected ? meta.color : '#6b7280',
              backgroundColor: isSelected ? meta.bgColor : '#ffffff',
              borderColor: isSelected ? meta.borderColor : '#d1d5db',
            }}
          >
            {meta.label}
          </button>
        );
      })}
    </div>
  );
};