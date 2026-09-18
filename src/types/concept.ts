import { ConceptID } from '../domain/concept/value-objects/ConceptID';
import { ConceptRelation } from '../domain/concept/types/ConceptRelation';

/**
 * Kavram verilerinin servisler ve dış katmanlar arasında 
 * taşınmasını sağlayan Veri Aktarım Nesnesi (DTO) arabirimi.
 */
export interface ConceptDTO {
  id: string;
  name: string;
  meaningId?: string;
  relations?: ConceptRelation[];
}

/**
 * Kavram arama sonuçlarını ve arama eşleşme skorunu 
 * kapsayan sonuç arabirimi.
 */
export interface ConceptSearchResult {
  concept: ConceptDTO;
  score: number;
}