import { Request, Response } from 'express';
import { DiscoveryFacade } from '../../../domain/discovery/facades/DiscoveryFacade';
import { ConceptGraphAdapter } from '../../../domain/discovery/adapters/ConceptGraphAdapter';

export class ConceptNetworkController {
  private discoveryFacade: DiscoveryFacade;

  constructor(discoveryFacade?: DiscoveryFacade) {
    this.discoveryFacade = discoveryFacade || new DiscoveryFacade();
  }

  public getConceptNetwork = async (req: Request, res: Response): Promise<void> => {
    try {
      const q = req.query.q as string;
      const maxNodesParam = req.query.max_nodes ? parseInt(req.query.max_nodes as string, 10) : 500;

      if (!q || q.trim() === '') {
        res.status(400).json({ 
          error: 'BAD_REQUEST', 
          message: 'Query parameter "q" is required.' 
        });
        return;
      }

      // 1. Discovery Facade üzerinden veriyi al
      const discoveryResult = await this.discoveryFacade.discoverConcepts({ queryText: q });

      // 2. Canonical Network DTO'ya dönüştür
      const networkDTO = ConceptGraphAdapter.toCanonicalNetwork(discoveryResult);

      // 3. Guardrail Tavan Sınırı (max_nodes)
      if (maxNodesParam && networkDTO.nodes.length > maxNodesParam) {
        networkDTO.nodes = networkDTO.nodes.slice(0, maxNodesParam);
        networkDTO.metadata.isTruncated = true;
        networkDTO.metadata.nodeCount = networkDTO.nodes.length;
      }

      res.status(200).json(networkDTO);
    } catch (error: any) {
      res.status(500).json({ 
        error: 'INTERNAL_SERVER_ERROR', 
        message: error.message || 'Error processing concept network query' 
      });
    }
  };
}
