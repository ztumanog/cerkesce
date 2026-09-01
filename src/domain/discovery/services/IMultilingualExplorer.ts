import { DiscoveryResultDTO } from '../dto/DiscoveryResultDTO';
import { DialectCode } from '@/domain/dialect/types/DialectTypes';

export interface SearchOptions {
  targetDialect?: DialectCode;
  maxDepth?: number;
}

export interface IMultilingualExplorer {
  explore(query: string, options?: SearchOptions): Promise<DiscoveryResultDTO>;
}