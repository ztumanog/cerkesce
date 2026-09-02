import { GenericConceptNetworkDTO } from '../../domain/analytics/services/ExportEngineService';
import { NetworkAnalyticsResultDTO } from '../../domain/analytics/dto/NetworkAnalyticsDTO';
import { NetworkAnalyticsService } from '../../domain/analytics/services/NetworkAnalyticsService';

export interface ApiCacheEntry<T> {
  data: T;
  timestamp: number;
}

export class ApiClientService {
  private static cache = new Map<string, ApiCacheEntry<any>>();
  private static TTL_MS = 5 * 60 * 1000;

  public static async fetchConceptNetwork(query: string): Promise<GenericConceptNetworkDTO> {
    const cacheKey = `network_${query.trim().toLowerCase()}`;
    const cached = this.getCache<GenericConceptNetworkDTO>(cacheKey);
    if (cached) return cached;

    const result: GenericConceptNetworkDTO = {
      nodes: [
        { id: query, label: query.toUpperCase() },
        { id: `${query}_rel_1`, label: `${query.toUpperCase()}-Kavram1` },
        { id: `${query}_rel_2`, label: `${query.toUpperCase()}-Kavram2` }
      ],
      edges: [
        { source: query, target: `${query}_rel_1` },
        { source: query, target: `${query}_rel_2` }
      ]
    };

    this.setCache(cacheKey, result);
    return result;
  }

  public static async fetchNetworkAnalytics(network: GenericConceptNetworkDTO): Promise<NetworkAnalyticsResultDTO> {
    const cacheKey = `analytics_${network.nodes.map(n => n.id).join('_')}`;
    const cached = this.getCache<NetworkAnalyticsResultDTO>(cacheKey);
    if (cached) return cached;

    const analytics = NetworkAnalyticsService.analyzeNetwork(network);
    this.setCache(cacheKey, analytics);
    return analytics;
  }

  private static getCache<T>(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry) return null;
    if (Date.now() - entry.timestamp > this.TTL_MS) {
      this.cache.delete(key);
      return null;
    }
    return entry.data;
  }

  private static setCache<T>(key: string, data: T): void {
    this.cache.set(key, { data, timestamp: Date.now() });
  }

  public static clearCache(): void {
    this.cache.clear();
  }
}