'use client';

/**
 * KAVRAM AĞI EXPORT BUTONLARI (kavram-agi sayfası).
 *
 * Backend servisleri ilk kez UI'a bağlanıyor (P4 - backend/UI kesişim taraması):
 * - ExportEngineService.exportNetwork (JSON + SVG) — src/domain/analytics/services/ExportEngineService.ts
 * - SVG üretimi tek üreteç: SvgLayoutEngineService.render (d3 bağımlılığı yok, deterministik layout)
 *
 * PNG sunulmaz: ExportEngineService.exportPNG halen 1x1 piksel stub döndürüyor
 * (ExportEngineService.ts:100). Stub'ı buton olarak sunmak yanıltıcı olur; gerçek
 * PNG üretimi (CanvasPngRendererService client-side render) ileriki iş.
 *
 * Export istemci tarafında yapılır: saf TS servisler (fs yok), veri zaten sayfada
 * kurulu — API rotası üzerinden sunucu turu gerekmez.
 */

import React, { useState } from 'react';
import { Download, FileJson, FileCode2 } from 'lucide-react';
import { ExportEngineService, ExportFormat } from '@/domain/analytics/services/ExportEngineService';
import type { CytoscapeElementData } from './ConceptGraphCanvas';
import { toExportNetwork } from './graphExportUtils';

// toExportNetwork graphExportUtils.ts'e taşındı ('use client' export'ları server
// component'ten çağrılamadığı için). Geriye dönük uyumluluk için yeniden export:
export { toExportNetwork };

function safeFileName(conceptKey: string): string {
  return `kavram-agi-${String(conceptKey || 'ag').replace(/[^a-zA-Z0-9_-]/g, '_')}`;
}

function downloadBlob(content: string, mimeType: string, fileName: string) {
  const blob = new Blob([content], { type: mimeType + ';charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function GraphExportButtons({ data, conceptKey }: { data: CytoscapeElementData; conceptKey?: string }) {
  const [error, setError] = useState<string | null>(null);

  const handleExport = (format: ExportFormat) => {
    setError(null);
    try {
      const result = ExportEngineService.exportNetwork(toExportNetwork(data), { format, width: 1280, height: 960 });
      if (!result.content) throw new Error('Bos icerik');
      const ext = format === 'JSON' ? 'json' : 'svg';
      downloadBlob(result.content, result.mimeType, `${safeFileName(conceptKey || '')}.${ext}`);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Export basarisiz');
    }
  };

  const nodeCount = (data?.nodes || []).length;
  if (nodeCount === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={() => handleExport('SVG')}
        className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-slate-600 bg-slate-800/80 px-3 py-1.5 text-xs font-semibold text-slate-200 transition-all hover:border-slate-400 hover:bg-slate-700"
        title="Kavram ağını SVG olarak indir (vektör, ölçeklenebilir)"
      >
        <FileCode2 className="h-3.5 w-3.5" aria-hidden />
        SVG indir
      </button>
      <button
        type="button"
        onClick={() => handleExport('JSON')}
        className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-slate-600 bg-slate-800/80 px-3 py-1.5 text-xs font-semibold text-slate-200 transition-all hover:border-slate-400 hover:bg-slate-700"
        title="Kavram ağının ham verisini JSON olarak indir"
      >
        <FileJson className="h-3.5 w-3.5" aria-hidden />
        JSON indir
      </button>
      {error && <span className="text-xs text-red-400" role="alert">{error}</span>}
      <span className="ml-auto hidden items-center gap-1 text-xs text-slate-500 sm:inline-flex">
        <Download className="h-3 w-3" aria-hidden />
        {nodeCount} düğüm
      </span>
    </div>
  );
}
