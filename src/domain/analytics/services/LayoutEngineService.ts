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
  public calculateLayout(nodes: any[], edges: any[]): any {
    return { nodes, edges };
  }
}

