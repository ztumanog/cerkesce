/**
 * SvgLayoutEngineService
 * Phase 7.0.4: Real SVG Layout Engine
 *
 * Layout + SVG birlestirme:
 * - LayoutEngineService ile koordinat hesapla
 * - Node/edge'leri SVG'ye ciz
 * - XML escaping
 * - Deterministik cikti
 */

import { LayoutEngineService, LayoutAlgorithm, PositionedNetworkDTO } from './LayoutEngineService';
import { GenericConceptNetworkDTO } from './ExportEngineService';

export interface SvgLayoutOptions {
  algorithm?: LayoutAlgorithm;
  width?: number;
  height?: number;
}

export class SvgLayoutEngineService {
  /**
   * Network'u SVG olarak cizer.
   */
  static render(
    network: GenericConceptNetworkDTO,
    options: SvgLayoutOptions = {}
  ): string {
    const algorithm = options.algorithm || 'CIRCULAR';
    const width = options.width || 800;
    const height = options.height || 600;

    // 1. Layout hesapla
    const positioned = LayoutEngineService.applyLayout(network, algorithm, width, height);

    // 2. XML escaping
    const escapeXML = (str: string): string => {
      return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
    };

    // 3. SVG basligi
    let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">`;

    // 4. Defs (stil)
    svg += '<defs>';
    svg += '<style>';
    svg += '.node { fill: #3b82f6; stroke: #1e40af; stroke-width: 2; }';
    svg += '.node-label { font-family: sans-serif; font-size: 12px; fill: #1f2937; text-anchor: middle; }';
    svg += '.edge { stroke: #9ca3af; stroke-width: 1.5; fill: none; }';
    svg += '</style>';
    svg += '</defs>';

    // 5. Kenarlar (once)
    const nodeMap = new Map(positioned.nodes.map(n => [n.id, n]));

    for (const edge of positioned.edges) {
      const source = nodeMap.get(edge.source);
      const target = nodeMap.get(edge.target);

      if (source && target) {
        svg += `<line class="edge" x1="${source.x}" y1="${source.y}" x2="${target.x}" y2="${target.y}" />`;
      }
    }

    // 6. Dugumler (sonra)
    for (const node of positioned.nodes) {
      const label = escapeXML(node.data?.label || node.id);
      svg += `<circle class="node" cx="${node.x}" cy="${node.y}" r="20" />`;
      svg += `<text class="node-label" x="${node.x}" y="${node.y + 35}">${label}</text>`;
    }

    // 7. SVG sonu
    svg += '</svg>';

    return svg;
  }

  /**
   * Network'u SVG data URI olarak dondurur.
   */
  static renderDataUri(
    network: GenericConceptNetworkDTO,
    options: SvgLayoutOptions = {}
  ): string {
    const svg = SvgLayoutEngineService.render(network, options);
    const base64 = Buffer.from(svg).toString('base64');
    return `data:image/svg+xml;base64,${base64}`;
  }
}
