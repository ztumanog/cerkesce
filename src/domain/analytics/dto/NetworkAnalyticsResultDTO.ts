export interface NetworkAnalyticsResultDTO {
  nodeCount: number;
  edgeCount: number;
  density?: number;
  degreeCentrality?: Record<string, number>;
  isolatedNodes: string[];
  clusters: { id: string; nodeIds: string[] }[];
}
