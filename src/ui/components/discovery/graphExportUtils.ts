/**
 * Kavram ağı yardımcıları — 'use client' OLMAYAN paylaşılan modül.
 *
 * Neden ayrı dosya: 'use client' dosyalarının export'ları server component'ten
 * import edildiğinde client reference olur ve sunucuda ÇAĞRILAMAZ. Bu fonksiyonlar
 * hem server (kavram-agi sayfası) hem client (GraphExport butonları) tarafında
 * çağrıldığı için client direktifsiz, saf bir modülde yaşamalı.
 */

import { GenericConceptNetworkDTO } from '@/domain/analytics/services/ExportEngineService';
import { LargeGraphOptimizerService } from '@/domain/performance/services/LargeGraphOptimizerService';
import type { CytoscapeElementData } from './ConceptGraphCanvas';

/** Cytoscape elemanlarını ExportEngine'in beklediği genel ağ DTO'suna çevirir (saf, test edilebilir). */
export function toExportNetwork(data: CytoscapeElementData): GenericConceptNetworkDTO {
  return {
    nodes: (data?.nodes || []).map((n) => ({
      id: String(n.data.id),
      label: n.data.label !== undefined && n.data.label !== null ? String(n.data.label) : String(n.data.id),
      nodeType: n.data.nodeType,
      dialect: n.data.dialect,
    })),
    edges: (data?.edges || []).map((e) => ({
      source: String(e.data.source),
      target: String(e.data.target),
      relationType: e.data.relationType,
    })),
  };
}

/**
 * Büyük grafları viewport için budar — karar otoritesi LargeGraphOptimizerService
 * (derece sıralaması, max düğüm sayısı). Zengin düğüm verisi (nodeType, dialect vb.)
 * korunur: yalnızca orijinal graphData, servisin görünür-düğüm kümesiyle filtrelenir.
 */
export function optimizeGraphDataForViewport(
  data: CytoscapeElementData,
  maxNodes = 60
): { data: CytoscapeElementData; pruned: { visible: number; total: number } | null } {
  const network = toExportNetwork(data);
  if (network.nodes.length <= maxNodes) {
    return { data, pruned: null };
  }
  const optimized = LargeGraphOptimizerService.optimizeForViewport(
    network.nodes.map((n) => ({ id: n.id, label: String(n.label ?? n.id) })),
    network.edges.map((e) => ({ source: e.source, target: e.target })),
    maxNodes
  );
  const visibleIds = new Set(optimized.nodes.map((n) => n.id));
  const prunedData: CytoscapeElementData = {
    nodes: data.nodes.filter((n) => visibleIds.has(String(n.data.id))),
    edges: data.edges.filter(
      (e) => visibleIds.has(String(e.data.source)) && visibleIds.has(String(e.data.target))
    ),
  };
  return {
    data: prunedData,
    pruned: { visible: optimized.nodes.length, total: optimized.totalNodes },
  };
}
