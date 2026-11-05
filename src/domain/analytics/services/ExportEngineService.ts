/**
 * ExportEngineService - Network export servisi
 * ADR-ROOT-001: Runtime izolasyonu
 *
 * Formatlar:
 * - JSON: metadata + schema version
 * - SVG: XML escaping
 * - PNG: data URI stub
 */
import { SvgLayoutEngineService } from './SvgLayoutEngineService';

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
   * SVG export - TEK URETEC: SvgLayoutEngineService (motor birlestirme)
   */
  private static exportSVG(
    network: GenericConceptNetworkDTO,
    width: number,
    height: number
  ): ExportResult {
    const content = SvgLayoutEngineService.render(network, { width, height });
    return { format: 'SVG', mimeType: 'image/svg+xml', content, nodeCount: network.nodes.length, edgeCount: network.edges.length };
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

