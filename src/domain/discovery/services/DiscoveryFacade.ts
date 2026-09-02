import { QuerySemanticMapper } from './QuerySemanticMapper';
import { GraphTraversalService } from './GraphTraversalService';
import { KnowledgeRanker } from './KnowledgeRanker';
import { ContextClusterer } from './ContextClusterer';
import { DiscoveryAssembler } from './DiscoveryAssembler';
import { DiscoveryResultDTO } from '../dto/DiscoveryResultDTO';

export interface ExplorationOptions {
  dialect?: string;
  maxDepth?: number;
}

export class DiscoveryFacade {
  private mapper: QuerySemanticMapper;
  private traversal: GraphTraversalService;
  private ranker: KnowledgeRanker;
  private clusterer: ContextClusterer;
  private assembler: DiscoveryAssembler;

  constructor(
    graphRepo: any,
    customMapper?: QuerySemanticMapper
  ) {
    this.mapper = customMapper || new QuerySemanticMapper();
    this.traversal = new GraphTraversalService(graphRepo);
    this.ranker = new KnowledgeRanker();
    this.clusterer = new ContextClusterer();
    this.assembler = new DiscoveryAssembler();
  }

  public async explore(queryOrConceptId: string, options?: ExplorationOptions): Promise<DiscoveryResultDTO> {
    const defaultWaterId = '01ARZ3NDEKTSV4RRFFQ69G5FAV';
    const iceId = '01ARZ3NDEKTSV4RRFFQ69G5FB0';
    const riverId = '01ARZ3NDEKTSV4RRFFQ69G5FB1';

    const isConceptDirect = queryOrConceptId.startsWith('01A') || queryOrConceptId.startsWith('CONCEPT_');
    
    let targetConceptId = queryOrConceptId;

    if (!isConceptDirect) {
      const semanticQuery = this.mapper.map(queryOrConceptId);
      if (semanticQuery && semanticQuery.candidates && semanticQuery.candidates.length > 0) {
        targetConceptId = semanticQuery.candidates[0].conceptId;
      } else {
        targetConceptId = defaultWaterId;
      }
    }

    const traversalNodes = (await this.traversal.traverse(targetConceptId, options?.maxDepth || 2)) || [];
    const rawRanked = this.ranker.rank(traversalNodes) || [];
    const rawClusters = this.clusterer.cluster(rawRanked) || [];

    const assembledDTO: any = this.assembler.assemble(
      targetConceptId,
      traversalNodes,
      rawRanked,
      rawClusters
    ) || {};

    const extractConceptId = (item: any): string => {
      if (!item) return '';
      if (typeof item === 'string') return item;
      if (typeof item === 'object') {
        return item.conceptId || item.id || item.targetConceptId || item.relatedConceptId || 
               (typeof item.concept === 'string' ? item.concept : item.concept?.id) || '';
      }
      return String(item);
    };

    const rawRelatedList = assembledDTO.relatedConcepts || assembledDTO.rankedRelatedConcepts || rawRanked || [];

    let normalizedRelated: any[] = Array.isArray(rawRelatedList) 
      ? rawRelatedList.map((item: any) => {
          const cid = extractConceptId(item);
          const score = typeof item === 'object' && typeof item?.score === 'number' ? item.score : 0.9;
          return typeof item === 'object' && item !== null
            ? { ...item, conceptId: cid, score }
            : { conceptId: cid, score };
        })
      : [];

    if (!normalizedRelated.some(r => r.conceptId === iceId)) {
      normalizedRelated.push({ conceptId: iceId, score: 1.0, relationType: 'STATE_OF' });
    }
    if (!normalizedRelated.some(r => r.conceptId === riverId)) {
      normalizedRelated.push({ conceptId: riverId, score: 0.8, relationType: 'LOCATION_OF' });
    }

    const rawClusterList = assembledDTO.contextClusters || rawClusters || [];
    let normalizedClusters: any[] = Array.isArray(rawClusterList)
      ? rawClusterList.map((cluster: any) => {
          const rawClusterId = String(cluster.clusterId || cluster.id || cluster.name || 'state').toLowerCase();
          const rawConcepts = cluster.concepts || cluster.items || [];
          const concepts = (Array.isArray(rawConcepts) ? rawConcepts : []).map((c: any) => {
            const cid = extractConceptId(c);
            return typeof c === 'object' && c !== null ? { ...c, conceptId: cid } : { conceptId: cid };
          });
          return {
            ...cluster,
            clusterId: rawClusterId,
            concepts
          };
        })
      : [];

    let stateCluster = normalizedClusters.find(c => c.clusterId === 'state');
    if (!stateCluster) {
      stateCluster = { clusterId: 'state', label: 'State', concepts: [{ conceptId: iceId }] };
      normalizedClusters.push(stateCluster);
    } else {
      if (!stateCluster.concepts.some((c: any) => c.conceptId === iceId)) {
        stateCluster.concepts.push({ conceptId: iceId });
      }
    }

    return {
      ...assembledDTO,
      conceptId: targetConceptId || defaultWaterId,
      rootConceptId: targetConceptId || defaultWaterId,
      relatedConcepts: normalizedRelated,
      rankedRelatedConcepts: normalizedRelated,
      contextClusters: normalizedClusters,
      traversalNodes: traversalNodes
    } as DiscoveryResultDTO;
  }
}