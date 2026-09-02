import React from 'react';
import { LayoutAlgorithm } from '../../../domain/analytics/services/LayoutEngineService';
import { ExportFormat } from '../../../domain/analytics/dto/ExportOptionsDTO';

export interface NetworkExplorerToolbarProps {
  currentLayout: LayoutAlgorithm;
  onLayoutChange: (layout: LayoutAlgorithm) => void;
  onExport: (format: ExportFormat) => void;
  onFitToScreen: () => void;
}

export const NetworkExplorerToolbar: React.FC<NetworkExplorerToolbarProps> = ({
  currentLayout,
  onLayoutChange,
  onExport,
  onFitToScreen
}) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-gray-50 border-b rounded-t-lg">
      <div className="flex items-center space-x-2">
        <span className="text-sm font-semibold text-gray-700">Düzen:</span>
        <button
          onClick={() => onLayoutChange('CIRCULAR')}
          className={`px-3 py-1.5 text-xs font-medium rounded ${
            currentLayout === 'CIRCULAR' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 border hover:bg-gray-100'
          }`}
          data-testid="layout-circular-btn"
        >
          Circular
        </button>
        <button
          onClick={() => onLayoutChange('GRID')}
          className={`px-3 py-1.5 text-xs font-medium rounded ${
            currentLayout === 'GRID' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 border hover:bg-gray-100'
          }`}
          data-testid="layout-grid-btn"
        >
          Grid
        </button>
        <button
          onClick={() => onLayoutChange('FORCE')}
          className={`px-3 py-1.5 text-xs font-medium rounded ${
            currentLayout === 'FORCE' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 border hover:bg-gray-100'
          }`}
          data-testid="layout-force-btn"
        >
          Force
        </button>
      </div>

      <div className="flex items-center space-x-2">
        <button
          onClick={onFitToScreen}
          className="px-3 py-1.5 text-xs font-medium bg-white text-gray-700 border rounded hover:bg-gray-100"
        >
          🎯 Sığdır
        </button>
        <div className="h-4 w-px bg-gray-300 mx-1" />
        <span className="text-sm font-semibold text-gray-700">Dışa Aktar:</span>
        <button
          onClick={() => onExport(ExportFormat.JSON)}
          className="px-2.5 py-1.5 text-xs font-medium bg-green-50 text-green-700 border border-green-300 rounded hover:bg-green-100"
          data-testid="export-json-btn"
        >
          JSON
        </button>
        <button
          onClick={() => onExport(ExportFormat.SVG)}
          className="px-2.5 py-1.5 text-xs font-medium bg-blue-50 text-blue-700 border border-blue-300 rounded hover:bg-blue-100"
          data-testid="export-svg-btn"
        >
          SVG
        </button>
      </div>
    </div>
  );
};