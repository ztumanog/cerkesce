import { EmbeddingResearchService } from '../research/EmbeddingResearchService';
import { VectorSearchService } from '../research/VectorSearchService';
import { SemanticSimilarityService } from '../research/SemanticSimilarityService';
import { LlmRetrievalService } from '../research/LlmRetrievalService';
import { ExperimentalGraphIntelligenceService } from '../research/ExperimentalGraphIntelligenceService';

export interface ResearchWidget {
  id: string;
  title: string;
  value: string;
  status: 'ok' | 'warning' | 'critical';
  details: string;
}

export interface ResearchView {
  timestamp: string;
  widgets: ResearchWidget[];
  overallStatus: 'ok' | 'warning' | 'critical';
  summary: string;
}

export class ResearchViewService {
  static getView(): ResearchView {
    const embedding = EmbeddingResearchService.getReport();
    const vectorSearch = VectorSearchService.getReport();
    const similarity = SemanticSimilarityService.getReport();
    const llm = LlmRetrievalService.getReport();
    const graph = ExperimentalGraphIntelligenceService.getReport();

    const widgets: ResearchWidget[] = [
      {
        id: 'embedding',
        title: 'Embedding Research',
        value: `${(embedding as any).totalEmbeddings ?? 0}`,
        status: embedding.status === 'ok' ? 'ok' : embedding.status === 'warning' ? 'warning' : 'critical',
        details: `${(embedding as any).dimensions ?? 0} boyut`,
      },
      {
        id: 'vector',
        title: 'Vector Search',
        value: `${vectorSearch.totalVectors}`,
        status: vectorSearch.status === 'ok' ? 'ok' : vectorSearch.status === 'warning' ? 'warning' : 'critical',
        details: `${vectorSearch.lastResults} son sonuc`,
      },
      {
        id: 'similarity',
        title: 'Semantic Similarity',
        value: `${similarity.totalPairs}`,
        status: similarity.status === 'ok' ? 'ok' : similarity.status === 'warning' ? 'warning' : 'critical',
        details: `${similarity.matrix?.averageSimilarity?.toFixed(2) ?? 0} ort. benzerlik`,
      },
      {
        id: 'llm',
        title: 'LLM Retrieval',
        value: `${llm.totalDocuments}`,
        status: llm.status === 'ok' ? 'ok' : llm.status === 'warning' ? 'warning' : 'critical',
        details: `${llm.lastResults?.length ?? 0} son sonuc`,
      },
      {
        id: 'graph',
        title: 'Experimental Graph',
        value: `${graph.totalNodes}`,
        status: graph.status === 'ok' ? 'ok' : graph.status === 'warning' ? 'warning' : 'critical',
        details: `${graph.insights?.length ?? 0} icgoru`,
      },
    ];

    const statuses = widgets.map(w => w.status);
    const overallStatus = statuses.includes('critical') ? 'critical'
      : statuses.includes('warning') ? 'warning' : 'ok';

    const summary = overallStatus === 'ok'
      ? 'Arastirma katmani saglikli'
      : `${widgets.filter(w => w.status !== 'ok').length} widget uyari veriyor`;

    return {
      timestamp: new Date().toISOString(),
      widgets,
      overallStatus,
      summary,
    };
  }
}
