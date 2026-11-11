import React from 'react';
import { DiscoveryRelationType } from '@/domain/discovery/types/DiscoveryRelationType';
import { getRelationMeta } from './relationMapper';

interface RelationBadgeProps {
  type: DiscoveryRelationType;
  showDescription?: boolean;
  className?: string;
}

export const RelationBadge: React.FC<RelationBadgeProps> = ({
  type,
  showDescription = false,
  className = '',
}) => {
  const meta = getRelationMeta(type);

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold border ${className}`}
      style={{
        color: meta.color,
        backgroundColor: meta.bgColor,
        borderColor: meta.borderColor,
      }}
      title={showDescription ? meta.description : undefined}
    >
      {meta.label}
    </span>
  );
};