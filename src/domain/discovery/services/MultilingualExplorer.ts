import { IMultilingualExplorer, SearchOptions } from './IMultilingualExplorer';
import { DiscoveryResultDTO } from '../dto/DiscoveryResultDTO';
import { DiscoveryAssembler } from './DiscoveryAssembler';
import { TraversalNode } from '../dto/TraversalNode';

export interface ITranslationServiceMock {
  search(query: string): Promise<any[]>;
}

export interface IMeaningConceptLinkerMock {
  resolveConcept(meaningId: string): Promise<any | null>;
}

export interface IDialectResolverMock {
  resolveVariants(conceptId: string, dialect?: string): Promise<any[]>;
}

export interface IGraphTraversalServiceMock {
  traverse(rootId: string, maxDepth?: number): Promise<TraversalNode[]>;
}

export class MultilingualExplorer implements IMultilingualExplorer {
  private readonly assembler: DiscoveryAssembler;

  constructor(
    private readonly translationService?: ITranslationServiceMock,
    private readonly meaningLinker?: IMeaningConceptLinkerMock,
    private readonly dialectResolver?: IDialectResolverMock,
    private readonly graphTraversalService?: IGraphTraversalServiceMock,
    assembler?: DiscoveryAssembler
  ) {
    this.assembler = assembler ?? new DiscoveryAssembler();
  }

  public async explore(query: string, options?: SearchOptions): Promise<DiscoveryResultDTO> {
    const startTime = performance.now();

    if (!query || query.trim() === '') {
      return this.assembler.assemble(query, 0, {});
    }

    const rawMeanings = this.translationService ? await this.translationService.search(query) : [];

    if (!rawMeanings || rawMeanings.length === 0) {
      const duration = performance.now() - startTime;
      return this.assembler.assemble(query, duration, {});
    }

    const meanings = rawMeanings.map((m, idx) => ({
      id: m.id || `m_${idx}`,
      language: m.language || 'TR',
      term: m.term || query,
      definition: m.definition
    }));

    let conceptId: string | undefined;
    let canonicalName: string | undefined;

    if (this.meaningLinker && meanings.length > 0) {
      const concept = await this.meaningLinker.resolveConcept(meanings[0].id);
      if (concept) {
        conceptId = concept.id;
        canonicalName = concept.canonicalName;
      }
    }

    let variants: any[] = [];
    if (this.dialectResolver && conceptId) {
      const rawVariants = await this.dialectResolver.resolveVariants(conceptId, options?.targetDialect);
      variants = (rawVariants || []).map((v, idx) => ({
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