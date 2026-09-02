import { GenericConceptNetworkDTO, ConceptNetworkNodeDTO } from './ExportEngineService';

export type LayoutAlgorithm = 'CIRCULAR' | 'GRID' | 'FORCE';

export interface PositionedNodeDTO extends ConceptNetworkNodeDTO {
  x: number;
  y: number;
}

export interface PositionedNetworkDTO {
  nodes: PositionedNodeDTO[];
  edges: GenericConceptNetworkDTO['edges'];
}

export class LayoutEngineService {
  public static applyLayout(
    network: GenericConceptNetworkDTO,
    algorithm: LayoutAlgorithm = 'CIRCULAR',
    width: number = 800,
    height: number = 600
  ): PositionedNetworkDTO {
    const nodes = network?.nodes || [];
    const edges = network?.edges || [];
    const centerX = width / 2;
    const centerY = height / 2;

    if (nodes.length === 0) {
      return { nodes: [], edges };
    }

    let positionedNodes: PositionedNodeDTO[] = [];

    switch (algorithm) {
      case 'CIRCULAR': {
        const radius = Math.min(width, height) / 3;
        const angleStep = (2 * Math.PI) / nodes.length;

        positionedNodes = nodes.map((node, i) => ({
          ...node,
          x: Math.round(centerX + radius * Math.cos(i * angleStep)),
          y: Math.round(centerY + radius * Math.sin(i * angleStep))
        }));
        break;
      }

      case 'GRID': {
        const cols = Math.ceil(Math.sqrt(nodes.length));
        const cellWidth = width / (cols + 1);
        const cellHeight = height / (Math.ceil(nodes.length / cols) + 1);

        positionedNodes = nodes.map((node, i) => {
          const col = i % cols;
          const row = Math.floor(i / cols);
          return {
            ...node,
            x: Math.round(cellWidth * (col + 1)),
            y: Math.round(cellHeight * (row + 1))
          };
        });
        break;
      }

      case 'FORCE': {
        positionedNodes = nodes.map((node, i) => ({
          ...node,
          x: Math.round(centerX + (i % 2 === 0 ? 1 : -1) * (i * 40)),
          y: Math.round(centerY + (i % 3 === 0 ? 1 : -1) * (i * 30))
        }));
        break;
      }
    }

    return {
      nodes: positionedNodes,
      edges
    };
  }
}