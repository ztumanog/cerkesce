import { 
  ConceptNetworkDTO, 
  ConceptNodeDTO, 
  ConceptEdgeDTO, 
  DiscoveryRelationType, 
  NodeType 
} from '../dto/ConceptNetworkDTO';

export class ConceptGraphAdapter {
  private static readonly MAX_NODES = 500;
  private static readonly SCHEMA_VERSION = "1.0.0";

  public static mapToRelationType(relStr?: string): DiscoveryRelationType {
    if (!relStr) return DiscoveryRelationType.RELATED;
    const upper = relStr.toUpperCase();
    if (Object.values(DiscoveryRelationType).includes(upper as DiscoveryRelationType)) {
      return upper as DiscoveryRelationType;
    }
    return DiscoveryRelationType.RELATED;
  }

  public static toCanonicalNetwork(discoveryResult: any): ConceptNetworkDTO {
    const rootId = discoveryResult?.conceptId || discoveryResult?.rootConceptId || 'WATER';
    
    const clusterMap = new Map<string, string>();
    if (discoveryResult?.contextClusters && Array.isArray(discoveryResult.contextClusters)) {
      discoveryResult.contextClusters.forEach((cluster: any) => {
        const cId = cluster.clusterId || cluster.id || cluster.name || 'general';
        if (Array.isArray(cluster.concepts)) {
          cluster.concepts.forEach((c: any) => {
            const cid = typeof c === 'string' ? c : (c.conceptId || c.id);
            if (cid) clusterMap.set(cid, cId);
          });
        }
      });
    }

    const nodes: ConceptNodeDTO[] = [];
    const edges: ConceptEdgeDTO[] = [];

    // Root node (nodeType="ROOT", depth=0)
    nodes.push({
      id: rootId,
      label: rootId,
      nodeType: 'ROOT',
      depth: 0,
      score: 1.0,
      cluster: clusterMap.get(rootId) || 'root'
    });

    let rawRelated = discoveryResult?.rankedConcepts || discoveryResult?.relatedConcepts || discoveryResult?.rankedRelatedConcepts || [];
    let isTruncated = false;

    if (Array.isArray(rawRelated)) {
      if (rawRelated.length > this.MAX_NODES - 1) {
        rawRelated = rawRelated.slice(0, this.MAX_NODES - 1);
        isTruncated = true;
      }

      rawRelated.forEach((item: any) => {
        const targetId = item.conceptId || item.id || (typeof item === 'string' ? item : null);
        if (!targetId || targetId === rootId) return;

        if (!nodes.some(n => n.id === targetId)) {
          nodes.push({
            id: targetId,
            label: item.label || targetId,
            nodeType: 'CONCEPT',
            depth: item.depth || 1,
            score: typeof item.score === 'number' ? item.score : 0.8,
            cluster: item.cluster || clusterMap.get(targetId) || 'general'
          });
        }

        const relationTypes = Array.isArray(item.relationTypes) 
          ? item.relationTypes 
          : [item.relationType || 'RELATED'];

        relationTypes.forEach((rel: string) => {
          edges.push({
            source: rootId,
            target: targetId,
            relationType: this.mapToRelationType(rel),
            weight: typeof item.weight === 'number' ? item.weight : (item.score || 1.0)
          });
        });
      });
    }

    // Sort nodes alphabetically by ID
    nodes.sort((a, b) => a.id.localeCompare(b.id));

    // Sort edges lexicographically
    edges.sort((a, b) => {
      const srcComp = a.source.localeCompare(b.source);
      if (srcComp !== 0) return srcComp;
      return a.target.localeCompare(b.target);
    });

    return {
      nodes,
      edges,
      metadata: {
        rootConceptId: rootId,
        generatedAt: new Date().toISOString(),
        nodeCount: nodes.length,
        edgeCount: edges.length,
        schemaVersion: this.SCHEMA_VERSION,
        isDirected: true,
        isTruncated
      }
    };
  }
}
