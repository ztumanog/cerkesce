'use client';

/**
 * KAVRAM AĞI EXPORT BUTONLARI (kavram-agi sayfası).
 *
 * Bağlı backend servisleri (P4 - backend/UI kesişim taraması):
 * - ExportEngineService.exportNetwork (JSON + SVG)
 * - CsvExporterService.exportNetwork (CSV) — P4-C ile bağlandı
 * - CanvasPngRendererService.render (SVG data URI üretimi) + tarayıcıda
 *   canvas rasterizasyonu → gerçek PNG — P4-C ile bağlandı
 * - SVG üretimi tek üreteç: SvgLayoutEngineService.render (d3 yok, deterministik)
 *
 * PNG akışı: CanvasPngRendererService.render SVG data URI döndürür (servis
 * üretim/kodlama katmanı), bileşendeki rasterizeSvgToPng onu tarayıcı canvas'ında
 * gerçek PNG'ye çevirir. ExportEngineService.exportPNG (1x1 stub) KULLANILMAZ.
 *
 * Export istemci tarafında yapılır: saf TS servisler (fs yok), veri zaten sayfada
 * kurulu — API rotası üzerinden sunucu turu gerekmez.
 */

import React, { useState } from 'react';
import { Download, FileJson, FileCode2, FileSpreadsheet, Image as ImageIcon } from 'lucide-react';
import { ExportEngineService, ExportFormat } from '@/domain/analytics/services/ExportEngineService';
import { CsvExporterService } from '@/domain/analytics/services/CsvExporterService';
import { CanvasPngRendererService } from '@/domain/analytics/services/CanvasPngRendererService';
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

function downloadBinaryBlob(blob: Blob, fileName: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/**
 * SVG data URI'yi tarayıcı canvas'ında gerçek PNG'ye rasterize eder.
 * (CanvasPngRendererService Node'da canvas olmadığı için rasterizasyon
 * tarayıcıya aittir — servisin kendi dokümantasyonunun dediği gibi.)
 */
async function rasterizeSvgToPng(svgDataUri: string): Promise<Blob> {
  const img = new Image();
  img.src = svgDataUri;
  await img.decode();
  const width = img.naturalWidth || 1280;
  const height = img.naturalHeight || 960;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas 2D bağlamı alınamadı');
  ctx.fillStyle = '#ffffff'; // SVG şeffaf arka planlı — PNG'de beyaz zemin
  ctx.fillRect(0, 0, width, height);
  ctx.drawImage(img, 0, 0, width, height);
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error('PNG üretilemedi'));
    }, 'image/png');
  });
}

export function GraphExportButtons({ data, conceptKey }: { data: CytoscapeElementData; conceptKey?: string }) {
  const [error, setError] = useState<string | null>(null);
  const [pngLoading, setPngLoading] = useState(false);

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

  // CSV İndir — CsvExporterService.exportNetwork (P4-C)
  const handleCsv = () => {
    setError(null);
    try {
      // ﻿: Excel'in UTF-8 Türkçe karakterleri doğru açması için BOM
      const csv = '﻿' + CsvExporterService.exportNetwork(toExportNetwork(data));
      downloadBlob(csv, 'text/csv', `${safeFileName(conceptKey || '')}.csv`);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'CSV export basarisiz');
    }
  };

  // PNG İndir — CanvasPngRendererService (SVG üretimi) + tarayıcı rasterizasyonu (P4-C)
  const handlePng = async () => {
    setError(null);
    setPngLoading(true);
    try {
      const svgDataUri = CanvasPngRendererService.render(toExportNetwork(data), { width: 1280, height: 960 });
      const pngBlob = await rasterizeSvgToPng(svgDataUri);
      downloadBinaryBlob(pngBlob, `${safeFileName(conceptKey || '')}.png`);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'PNG export basarisiz');
    } finally {
      setPngLoading(false);
    }
  };

  const nodeCount = (data?.nodes || []).length;
  if (nodeCount === 0) return null;

  const btnCls =
    'inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-slate-600 bg-slate-800/80 px-3 py-1.5 text-xs font-semibold text-slate-200 transition-all hover:border-slate-400 hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60';

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={() => handleExport('SVG')}
        className={btnCls}
        title="Kavram ağını SVG olarak indir (vektör, ölçeklenebilir)"
      >
        <FileCode2 className="h-3.5 w-3.5" aria-hidden />
        SVG indir
      </button>
      <button
        type="button"
        onClick={() => handleExport('JSON')}
        className={btnCls}
        title="Kavram ağının ham verisini JSON olarak indir"
      >
        <FileJson className="h-3.5 w-3.5" aria-hidden />
        JSON indir
      </button>
      <button
        type="button"
        onClick={handleCsv}
        className={btnCls}
        title="Kavram ağını CSV olarak indir (Excel'de analiz için)"
      >
        <FileSpreadsheet className="h-3.5 w-3.5" aria-hidden />
        CSV indir
      </button>
      <button
        type="button"
        onClick={handlePng}
        disabled={pngLoading}
        className={btnCls}
        title="Kavram ağını PNG resim olarak indir"
      >
        <ImageIcon className="h-3.5 w-3.5" aria-hidden />
        {pngLoading ? 'PNG üretiliyor...' : 'PNG indir'}
      </button>
      {error && <span className="text-xs text-red-400" role="alert">{error}</span>}
      <span className="ml-auto hidden items-center gap-1 text-xs text-slate-500 sm:inline-flex">
        <Download className="h-3 w-3" aria-hidden />
        {nodeCount} düğüm
      </span>
    </div>
  );
}
