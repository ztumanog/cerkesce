import { DialectCode } from '../../dialect/types/DialectTypes';
import { DiscoveryResultDTO } from '../dto/DiscoveryResultDTO';
import { MultilingualExplorer } from './MultilingualExplorer';

export class SearchFacade {
  constructor(private readonly explorer: MultilingualExplorer) {}

  /**
   * Dış dünya için saf API Giriş Kapısı
   */
  public async search(query: string, preferredDialect: DialectCode = DialectCode.ADY_WEST): Promise<DiscoveryResultDTO> {
    return this.explorer.explore(query, { targetDialect: preferredDialect });
  }
}