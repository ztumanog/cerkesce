/**
 * ExportEngineService - Network export servisi
 * ADR-ROOT-001: Runtime izolasyonu
 *
 * Formatlar:
 * - JSON: metadata + schema version
 * - SVG: XML escaping
 * - PNG: data URI stub
 */

export type ExportFormat = 'JSON' | 'SVG' | 'PNG';

export interface GenericConceptNetworkDTO {
  nodes: { id: string; label?: string; [key: string]: any }[];
  edges: { id?: string; source: string; target: string; [key: string]: any }[];
}

export interface ExportOptions {
  format: ExportFormat;
  width?: number;
  height?: number;
}

export interface ExportResult {
  format: ExportFormat;
  mimeType: string;
  content: string;
  nodeCount: number;
  edgeCount: number;
}

export class ExportEngineService {
  /**
   * Network'u belirtilen formatta export eder.
   */
  static exportNetwork(
    network: GenericConceptNetworkDTO,
    options: ExportOptions
  ): ExportResult {
    // 1. Validation
    if (!network || !Array.isArray(network.nodes) || !Array.isArray(network.edges)) {
      throw new Error('Invalid ConceptNetworkDTO payload');
    }

    const format = options.format;

    if (format === 'JSON') {
      return ExportEngineService.exportJSON(network);
    }

    if (format === 'SVG') {
      return ExportEngineService.exportSVG(network, options.width || 1024, options.height || 768);
    }

    if (format === 'PNG') {
      return ExportEngineService.exportPNG(network);
    }

    throw new Error(`Unsupported format: ${format}`);
  }

  /**
   * JSON export
   */
  private static exportJSON(network: GenericConceptNetworkDTO): ExportResult {
    const payload = {
      schemaVersion: '1.0',
      network: {
        nodes: network.nodes,
        edges: network.edges,
      },
    };

    return {
      format: 'JSON',
      mimeType: 'application/json',
      content: JSON.stringify(payload, null, 2),
      nodeCount: network.nodes.length,
      edgeCount: network.edges.length,
    };
  }

  /**
   * SVG export (XML escaping ile)
   */
  private static exportSVG(
    network: GenericConceptNetworkDTO,
    width: number,
    height: number
  ): ExportResult {
    const escapeXML = (str: string): string => {
      return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
    };

    let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">`;

    for (const node of network.nodes) {
      const label = escapeXML(node.label || node.id);
      const x = Math.floor(Math.random() * width);
      const y = Math.floor(Math.random() * height);
      svg += `<circle id="node-${escapeXML(node.id)}" cx="${x}" cy="${y}" r="20" />`;
      svg += `<text x="${x}" y="${y}">${label}</text>`;
    }

    svg += '</svg>';

    return {
      format: 'SVG',
      mimeType: 'image/svg+xml',
      content: svg,
      nodeCount: network.nodes.length,
      edgeCount: network.edges.length,
    };
  }

  /**
   * PNG export (data URI stub)
   */
  private static exportPNG(network: GenericConceptNetworkDTO): ExportResult {
    // Stub: gercek PNG uretimi ileride
    const stubBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';

    return {
      format: 'PNG',
      mimeType: 'image/png',
      content: `data:image/png;base64,${stubBase64}`,
      nodeCount: network.nodes.length,
      edgeCount: network.edges.length,
    };
  }
}
