// @/types/network.ts (Gelecek Faz Taslağı)

export type CentralityMetric = 'degree' | 'betweenness' | 'closeness';

export interface ConceptNodeScore {
  nodeId: string;
  conceptLabel: string;
  score: number;
}

export interface NetworkAnalyticsDTO {
  /** Ağdaki toplam düğüm (konsept) sayısı */
  totalNodes: number;
  
  /** Ağdaki toplam bağ (ilişki) sayısı */
  totalEdges: number;
  
  /** Ağın yoğunluk oranı (0 ile 1 arasında) */
  density: number;
  
  /** Ağdaki izole veya bağımsız alt graf (component) sayısı */
  connectedComponentsCount: number;
  
  /** Belirli bir metriğe göre en yüksek skora sahip düğümler */
  topConcepts: {
    metric: CentralityMetric;
    nodes: ConceptNodeScore[];
  }[];
}