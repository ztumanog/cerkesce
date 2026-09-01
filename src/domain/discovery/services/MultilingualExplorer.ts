import { IMultilingualExplorer, SearchOptions } from './IMultilingualExplorer';
import { DiscoveryResultDTO } from '../dto/DiscoveryResultDTO';
import { DiscoveryAssembler } from '../assembler/DiscoveryAssembler';

export interface ITranslationServiceMock {
  search(query: string): Promise<any[]>;
}

export interface IMeaningConceptLinkerMock {
  resolveConcept(meaningId: string): Promise<any | null>;
}

export interface IDialectResolverMock {
  resolveVariants(conceptId: string, dialect?: string): Promise<any[]>;
}

export class MultilingualExplorer implements IMultilingualExplorer {
  constructor(
    private readonly translationService?: ITranslationServiceMock,
    private readonly meaningLinker?: IMeaningConceptLinkerMock,
    private readonly dialectResolver?: IDialectResolverMock
  ) {}

  public async explore(query: string, options?: SearchOptions): Promise<DiscoveryResultDTO> {
    const startTime = performance.now();

    if (!query || query.trim() === '') {
      return DiscoveryAssembler.createEmpty(query, 0);
    }

    const rawMeanings = this.translationService ? await this.translationService.search(query) : [];

    if (!rawMeanings || rawMeanings.length === 0) {
      const duration = performance.now() - startTime;
      return DiscoveryAssembler.createEmpty(query, duration);
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

    const duration = performance.now() - startTime;

    return DiscoveryAssembler.assemble(
      query,
      conceptId,
      canonicalName,
      meanings,
      variants,
      [],
      duration
    );
  }
}