import { ISearchFacade } from './ISearchFacade';
import { IMultilingualExplorer } from '@/domain/discovery/services/IMultilingualExplorer';
import { DiscoveryResultDTO } from '@/domain/discovery/dto/DiscoveryResultDTO';
import { DialectCode } from '@/domain/dialect/types/DialectTypes';

export class SearchFacade implements ISearchFacade {
  constructor(private readonly explorer: IMultilingualExplorer) {}

  public async search(query: string, targetDialect?: DialectCode): Promise<DiscoveryResultDTO> {
    return this.explorer.explore(query, { targetDialect });
  }
}