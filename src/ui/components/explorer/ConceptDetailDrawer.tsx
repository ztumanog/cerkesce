import React from 'react';

export interface ConceptDetailDrawerProps {
  selectedNode: { id: string; x: number; y: number; data?: any } | null;
  onClose: () => void;
  onExpand: (nodeId: string) => void | Promise<void>;
}

// TODO: gercek UI tasarimi henuz yapilmadi. Bu, derlemeyi gecirmek icin
// eklenen minimal bir stub bilesendir. Projede .backup altinda daha
// gelismis bir versiyonu olabilir - istersen onun icerigini isteyip
// buraya tasiyabiliriz.
export const ConceptDetailDrawer: React.FC<ConceptDetailDrawerProps> = ({
  selectedNode,
  onClose,
  onExpand
}) => {
  if (!selectedNode) return null;

  return React.createElement('div', { className: 'fixed right-0 top-0 h-full w-80 bg-white shadow-lg p-4' },
    React.createElement('button', { onClick: onClose, className: 'text-sm text-gray-500' }, 'Kapat'),
    React.createElement('div', { className: 'mt-4 font-bold' }, selectedNode.id),
    React.createElement('button', {
      onClick: () => onExpand(selectedNode.id),
      className: 'mt-4 bg-indigo-600 text-white px-3 py-1 rounded text-sm'
    }, 'Genislet')
  );
};