import { IMultilingualExplorer, SearchOptions } from './IMultilingualExplorer';
import { DiscoveryResultDTO } from '../dto/DiscoveryResultDTO';
import { DiscoveryAssembler } from './DiscoveryAssembler';
import { TraversalNode } from '../dto/TraversalNode';
import { TranslationService } from '../../../services/TranslationService';
import { MeaningConceptLinker } from '../../concept/services/MeaningConceptLinker';
import { DialectResolver } from '../../dialect/services/DialectResolver';
import { GraphTraversalService } from './GraphTraversalService';

export class MultilingualExplorer implements IMultilingualExplorer {
  private readonly assembler: DiscoveryAssembler;

  constructor(
    private readonly translationService?: TranslationService | any,
    private readonly meaningLinker?: MeaningConceptLinker | any,
    private readonly dialectResolver?: DialectResolver | any,
    private readonly graphTraversalService?: GraphTraversalService | any,
    assembler?: DiscoveryAssembler
  ) {
    this.assembler = assembler ?? new DiscoveryAssembler();
  }

  private extractIdString(id: any): string | undefined {
    if (!id) return undefined;
    if (typeof id === 'string') return id;
    if (typeof id.getValue === 'function') return id.getValue();
    if (typeof id.value === 'string') return id.value;
    return String(id);
  }

  public async explore(query: string, options?: SearchOptions): Promise<DiscoveryResultDTO> {
    const startTime = performance.now();

    if (!query || query.trim() === '') {
      return this.assembler.assemble(query, 0, {});
    }

    let rawMeanings: any[] = [];
    if (this.translationService) {
      if (typeof (this.translationService as any).search === 'function') {
        rawMeanings = await (this.translationService as any).search(query);
      } else if (typeof (this.translationService as any).findByTerm === 'function') {
        rawMeanings = await (this.translationService as any).findByTerm(query);
      } else if (typeof (this.translationService as any).getTranslations === 'function') {
        rawMeanings = await (this.translationService as any).getTranslations(query);
      }
    }

    if (!rawMeanings || rawMeanings.length === 0) {
      const duration = performance.now() - startTime;
      return this.assembler.assemble(query, duration, {});
    }

    const meanings = rawMeanings.map((m: any, idx: number) => ({
      id: m.id || m.meaningId || `m_${idx}`,
      language: m.language || m.lang || 'TR',
      term: m.term || query,
      definition: m.definition || m.def
    }));

    let conceptId: string | undefined;
    let canonicalName: string | undefined;

    if (this.meaningLinker && meanings.length > 0) {
      const concept = await this.meaningLinker.resolveConcept(meanings[0].id);
      if (concept) {
        conceptId = this.extractIdString(concept.id);
        canonicalName = concept.canonicalName;
      }
    }

    let variants: any[] = [];
    if (this.dialectResolver && conceptId) {
      const rawVariants = await (this.dialectResolver as any).resolveVariants(conceptId, options?.targetDialect);
      variants = (rawVariants || []).map((v: any, idx: number) => ({
        id: v.id || `v_${idx}`,
        dialectCode: v.dialectCode || options?.targetDialect || 'UNKNOWN',
        term: v.term || '',
        isFallback: !!v.isFallback,
        fallbackSourceDialect: v.fallbackSourceDialect
      }));
    }

    let traversalNodes: TraversalNode[] = [];
    if (this.graphTraversalService && conceptId) {
      traversalNodes = await this.graphTraversalService.traverse(conceptId, 2);
    }

    const duration = performance.now() - startTime;

    return this.assembler.assemble(query, duration, {
      conceptId,
      canonicalName,
      meanings,
      variants,
      traversalNodes,
      maxDepth: 2
    });
  }
}