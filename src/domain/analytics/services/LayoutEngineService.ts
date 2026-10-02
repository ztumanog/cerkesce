/**
 * LayoutEngineService - Network layout servisi
 * ADR-ROOT-001: Runtime izolasyonu
 *
 * Algoritmalar:
 * - CIRCULAR: Dairesel yerlestirme
 * - GRID: Izgara yerlestirme
 * - FORCE: Kuvvet yonlendirmeli
 */

import type { GenericConceptNetworkDTO } from './ExportEngineService';

export type LayoutAlgorithm = 'CIRCULAR' | 'GRID' | 'FORCE';

export interface PositionedNodeDTO {
  id: string;
  x: number;
  y: number;
  data?: any;
}

export interface PositionedNetworkDTO {
  nodes: PositionedNodeDTO[];
  edges: any[];
}

export class LayoutEngineService {
  /**
   * Network'e layout uygular.
   */
  static applyLayout(
    network: GenericConceptNetworkDTO,
    algorithm: LayoutAlgorithm,
    width: number = 800,
    height: number = 600
  ): PositionedNetworkDTO {
    if (!network || !Array.isArray(network.nodes)) {
      throw new Error('Invalid network structure');
    }

    const nodes = network.nodes;
    const centerX = width / 2;
    const centerY = height / 2;

    let positioned: PositionedNodeDTO[] = [];

    if (algorithm === 'CIRCULAR') {
      const radius = Math.min(width, height) / 3;
      positioned = nodes.map((node, i) => {
        const angle = (2 * Math.PI * i) / nodes.length;
        return {
          id: node.id,
          x: centerX + radius * Math.cos(angle),
          y: centerY + radius * Math.sin(angle),
          data: node,
        };
      });
    } else if (algorithm === 'GRID') {
      const cols = Math.ceil(Math.sqrt(nodes.length));
      const cellW = width / (cols + 1);
      const cellH = height / (cols + 1);

      positioned = nodes.map((node, i) => {
        const row = Math.floor(i / cols);
        const col = i % cols;
        return {
          id: node.id,
          x: cellW * (col + 1),
          y: cellH * (row + 1),
          data: node,
        };
      });
    } else if (algorithm === 'FORCE') {
      // Basit kuvvet simulasyonu (deterministik)
      positioned = nodes.map((node, i) => ({
        id: node.id,
        x: centerX + (i - nodes.length / 2) * 50,
        y: centerY + (i % 2 === 0 ? -30 : 30),
        data: node,
      }));
    } else {
      throw new Error(`Unsupported algorithm: ${algorithm}`);
    }

    return {
      nodes: positioned,
      edges: network.edges || [],
    };
  }
}
