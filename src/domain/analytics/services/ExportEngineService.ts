import { ExportFormat, ExportOptionsDTO, NetworkExportPayload } from '../dto/ExportOptionsDTO';

export interface ConceptNetworkNodeDTO {
  id: string;
  label: string;
  depth?: number;
  cluster?: string;
}

export interface ConceptNetworkEdgeDTO {
  id: string;
  source: string;
  target: string;
  relationType: string;
}

export interface GenericConceptNetworkDTO {
  nodes: ConceptNetworkNodeDTO[];
  edges: ConceptNetworkEdgeDTO[];
}

function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&"']/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '"': return '&quot;';
      case "'": return '&apos;';
      default: return c;
    }
  });
}

export class ExportEngineService {
  /**
   * Sprint 7.0.2 Concept Network Export Engine
   * Exports concept graph into JSON, SVG, or PNG payloads.
   * 
   * Note on PNG: Sprint 7.0.2 provides PNG Export Stub ✅.
   * Real Canvas-based rasterization is scheduled for Sprint 7.0.3 🚀.
   */
  public static exportNetwork(
    network: GenericConceptNetworkDTO,
    options: ExportOptionsDTO,
    fixedTimestamp?: string
  ): NetworkExportPayload {
    if (!network || !Array.isArray(network.nodes) || !Array.isArray(network.edges)) {
      throw new Error('Invalid ConceptNetworkDTO payload for export');
    }

    const width = options.width || 800;
    const height = options.height || 600;
    const bgColor = options.backgroundColor || '#1e293b';
    const exportedAt = fixedTimestamp || new Date().toISOString();

    // Deterministik çıktı için düğüm ve kenarların ID bazlı sıralanması (ADR Uyumluluğu)
    const sortedNodes = [...network.nodes].sort((a, b) => a.id.localeCompare(b.id));
    const sortedEdges = [...network.edges].sort((a, b) => a.id.localeCompare(b.id));

    switch (options.format) {
      case ExportFormat.JSON: {
        const jsonContent = JSON.stringify({
          schemaVersion: '1.0',
          exportedAt,
          network: {
            nodes: sortedNodes,
            edges: sortedEdges
          }
        }, null, 2);

        return {
          format: ExportFormat.JSON,
          mimeType: 'application/json',
          content: jsonContent,
          exportedAt,
          nodeCount: sortedNodes.length,
          edgeCount: sortedEdges.length
        };
      }

      case ExportFormat.SVG: {
        const svgNodes = sortedNodes.map((node, i) => {
          const cx = 80 + (i % 6) * 120;
          const cy = 80 + Math.floor(i / 6) * 90;
          const escapedLabel = escapeXml(node.label);
          return `<g id="node-${node.id}"><circle cx="${cx}" cy="${cy}" r="22" fill="#3b82f6" stroke="#60a5fa" stroke-width="2"/><text x="${cx}" y="${cy + 4}" text-anchor="middle" fill="#ffffff" font-size="11" font-family="sans-serif">${escapedLabel}</text></g>`;
        }).join('');

        const svgEdges = sortedEdges.map(edge => {
          return `<line id="edge-${edge.id}" x1="80" y1="80" x2="200" y2="170" stroke="#64748b" stroke-width="1.5" stroke-dasharray="4"/>`;
        }).join('');

        const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" style="background-color: ${bgColor};">${svgEdges}${svgNodes}</svg>`;

        return {
          format: ExportFormat.SVG,
          mimeType: 'image/svg+xml',
          content: svgContent,
          exportedAt,
          nodeCount: sortedNodes.length,
          edgeCount: sortedEdges.length
        };
      }

      case ExportFormat.PNG: {
        // PNG Export Stub ✅ (Real rendering planned for Sprint 7.0.3)
        const pngContent = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==`;

        return {
          format: ExportFormat.PNG,
          mimeType: 'image/png',
          content: pngContent,
          exportedAt,
          nodeCount: sortedNodes.length,
          edgeCount: sortedEdges.length
        };
      }

      default:
        throw new Error(`Unsupported export format: ${options.format}`);
    }
  }
}