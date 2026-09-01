import { DiscoveryResultDTO } from '@/domain/discovery/dto/DiscoveryResultDTO';
import { DialectCode } from '@/domain/dialect/types/DialectTypes';

export interface ISearchFacade {
  search(query: string, targetDialect?: DialectCode): Promise<DiscoveryResultDTO>;
}