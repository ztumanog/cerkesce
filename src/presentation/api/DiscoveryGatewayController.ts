import { DiscoveryFacade } from '../../domain/discovery/services/DiscoveryFacade';
import { ConceptGraphAdapter } from '../../domain/discovery/adapters/ConceptGraphAdapter';
import { CytoscapeProjectionAdapter } from '../../domain/discovery/adapters/CytoscapeProjectionAdapter';

export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: string;
}

const defaultMockGraphRepo = {
  getNeighbors: (conceptId: string) => [
    { conceptId: '01ARZ3NDEKTSV4RRFFQ69G5FB0', relationType: 'STATE_OF', score: 1.0 },
    { conceptId: '01ARZ3NDEKTSV4RRFFQ69G5FB1', relationType: 'LOCATION_OF', score: 0.8 }
  ]
};

export class DiscoveryGatewayController {
  private facade: DiscoveryFacade;

  constructor(facade?: DiscoveryFacade) {
    this.facade = facade || new DiscoveryFacade(defaultMockGraphRepo);
  }

  public async explore(query: string, dialect?: string): Promise<APIResponse<any>> {
    if (!query || query.trim() === '') {
      return {
        success: false,
        error: 'Query parameter "q" is required.',
        timestamp: new Date().toISOString()
      };
    }

    const result = await this.facade.explore(query, { dialect });
    return {
      success: true,
      data: result,
      timestamp: new Date().toISOString()
    };
  }

  public async getNetwork(conceptIdOrQuery: string, format: 'canonical' | 'cytoscape' = 'cytoscape'): Promise<APIResponse<any>> {
    if (!conceptIdOrQuery || conceptIdOrQuery.trim() === '') {
      return {
        success: false,
        error: 'Concept ID or query parameter is required.',
        timestamp: new Date().toISOString()
      };
    }

    const discoveryResult = await this.facade.explore(conceptIdOrQuery);
    const canonicalNetwork = ConceptGraphAdapter.toCanonicalNetwork(discoveryResult);

    if (format === 'canonical') {
      return {
        success: true,
        data: canonicalNetwork,
        timestamp: new Date().toISOString()
      };
    }

    const cytoscapeNetwork = CytoscapeProjectionAdapter.toCytoscapeFormat(canonicalNetwork);
    return {
      success: true,
      data: cytoscapeNetwork,
      timestamp: new Date().toISOString()
    };
  }

  public async getConceptDetails(conceptId: string): Promise<APIResponse<any>> {
    if (!conceptId || conceptId.trim() === '') {
      return {
        success: false,
        error: 'Concept ID is required.',
        timestamp: new Date().toISOString()
      };
    }

    const discoveryResult = await this.facade.explore(conceptId);
    return {
      success: true,
      data: {
        conceptId: discoveryResult.conceptId,
        rootConceptId: discoveryResult.rootConceptId,
        relatedCount: discoveryResult.relatedConcepts?.length || 0,
        clusterCount: discoveryResult.contextClusters?.length || 0,
        rawResult: discoveryResult
      },
      timestamp: new Date().toISOString()
    };
  }
}