import React from 'react';
import { PositionedNodeDTO } from '../../../domain/analytics/services/LayoutEngineService';

export interface ConceptDetailDrawerProps {
  selectedNode: PositionedNodeDTO | null;
  onClose: () => void;
  onExpand: (nodeId: string) => void;
}

export const ConceptDetailDrawer: React.FC<ConceptDetailDrawerProps> = ({
  selectedNode,
  onClose,
  onExpand
}) => {
  if (!selectedNode) return null;

  return (
    <div className="fixed right-0 top-0 h-full w-80 bg-white border-l shadow-xl p-6 z-50 flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-center mb-4 border-b pb-2">
          <h2 className="text-xl font-bold text-gray-800">{selectedNode.label}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 font-bold text-lg"
            data-testid="close-drawer-btn"
          >
            ✕
          </button>
        </div>

        <div className="space-y-3 text-sm text-gray-600">
          <div>
            <span className="font-semibold text-gray-700">Node ID:</span> {selectedNode.id}
          </div>
          <div>
            <span className="font-semibold text-gray-700">Koordinat:</span> ({selectedNode.x}, {selectedNode.y})
          </div>
          {selectedNode.weight !== undefined && (
            <div>
              <span className="font-semibold text-gray-700">Skor / Ağırlık:</span> {selectedNode.weight}
            </div>
          )}
        </div>
      </div>

      <div className="pt-4 border-t">
        <button
          onClick={() => onExpand(selectedNode.id)}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded transition-colors shadow"
          data-testid="expand-node-btn"
        >
          🔍 Ağacı Genişlet (Expand)
        </button>
      </div>
    </div>
  );
};