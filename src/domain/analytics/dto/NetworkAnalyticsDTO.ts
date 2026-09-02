export interface NetworkAnalyticsResultDTO {
  density: number;
  degreeCentrality: Record<string, number>;
  isolatedNodes: string[];
  clusters: Array<{ id: string; nodeIds: string[] }>;
}