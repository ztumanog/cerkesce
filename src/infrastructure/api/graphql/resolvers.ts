/**
 * GraphQL Resolvers
 * ADR-GOV-005: API Gateway olgunlastirma
 *
 * Resolver'lar:
 * - Query.conceptNetwork
 * - Query.explore
 * - Query.concept
 */

import { DiscoveryFacade } from '../../../domain/discovery/services/DiscoveryFacade';
import { ConceptGraphAdapter } from '../../../domain/discovery/adapters/ConceptGraphAdapter';
import { InMemoryConceptGraphRepository } from '../../../repository/InMemoryConceptGraphRepository';

const facade = new DiscoveryFacade(new InMemoryConceptGraphRepository());

export const resolvers = {
  Query: {
    conceptNetwork: async (_: any, args: { q: string; maxNodes?: number }) => {
      if (!args.q || args.q.trim() === '') {
        throw new Error('Query parameter "q" is required.');
      }

      const discoveryResult = await facade.explore(args.q);
      const network = ConceptGraphAdapter.toCanonicalNetwork(discoveryResult);

      const maxNodes = args.maxNodes || 500;
      if (network.nodes.length > maxNodes) {
        network.nodes = network.nodes.slice(0, maxNodes);
        const retainedIds = new Set(network.nodes.map((n: any) => n.id));
        network.edges = network.edges.filter(
          (e: any) => retainedIds.has(e.source) && retainedIds.has(e.target)
        );
        network.metadata.isTruncated = true;
        network.metadata.nodeCount = network.nodes.length;
        network.metadata.edgeCount = network.edges.length;
      }

      return network;
    },

    explore: async (_: any, args: { q: string; dialect?: string }) => {
      if (!args.q || args.q.trim() === '') {
        throw new Error('Query parameter "q" is required.');
      }

      const result = await facade.explore(args.q, { dialect: args.dialect });
      return {
        conceptId: result.conceptId,
        rootConceptId: result.rootConceptId,
        relatedConcepts: result.relatedConcepts || [],
        contextClusters: result.contextClusters || [],
      };
    },

    concept: async (_: any, args: { id: string }) => {
      if (!args.id || args.id.trim() === '') {
        throw new Error('Concept ID is required.');
      }

      const result = await facade.explore(args.id);
      return {
        id: result.conceptId,
        label: result.rootConceptId || result.conceptId,
        nodeType: 'ROOT',
        depth: 0,
      };
    },
  },
};
