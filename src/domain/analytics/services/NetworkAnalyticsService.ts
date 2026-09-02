import { NetworkAnalyticsResultDTO } from '../dto/NetworkAnalyticsDTO';
import { GenericConceptNetworkDTO } from './ExportEngineService';

export class NetworkAnalyticsService {
  public static analyzeNetwork(network: GenericConceptNetworkDTO): NetworkAnalyticsResultDTO {
    const nodeCount = network.nodes.length;
    const edgeCount = network.edges.length;

    const maxEdges = nodeCount > 1 ? (nodeCount * (nodeCount - 1)) / 2 : 1;
    const density = nodeCount > 1 ? edgeCount / maxEdges : 0;

    const degreeCentrality: Record<string, number> = {};
    const connectedNodes = new Set<string>();

    network.nodes.forEach(node => {
      degreeCentrality[node.id] = 0;
    });

    network.edges.forEach(edge => {
      degreeCentrality[edge.source] = (degreeCentrality[edge.source] || 0) + 1;
      degreeCentrality[edge.target] = (degreeCentrality[edge.target] || 0) + 1;
      connectedNodes.add(edge.source);
      connectedNodes.add(edge.target);
    });

    const isolatedNodes = network.nodes
      .filter(node => !connectedNodes.has(node.id))
      .map(node => node.id);

    return {
      density,
      degreeCentrality,
      isolatedNodes,
      clusters: [{ id: 'cluster_1', nodeIds: network.nodes.map(n => n.id) }]
    };
  }
}