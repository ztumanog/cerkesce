/** 
 * @file src/domain/concept/services/MeaningConceptLinker.ts 
 * @description Phase 2 Meaning ID ile Phase 3 Concept ID arasında köprü servisi. 
 */
export interface MeaningConceptLink {  
  meaningId: string;  
  conceptId: string;
}

export class MeaningConceptLinker {  
  private meaningToConceptMap: Map<string, Set<string>> = new Map();  
  private conceptToMeaningMap: Map<string, Set<string>> = new Map();  

  constructor(private readonly conceptRepo?: any) {}  

  public link(meaningId: string, conceptId: string): void {    
    if (!this.meaningToConceptMap.has(meaningId)) {      
      this.meaningToConceptMap.set(meaningId, new Set());    
    }    
    this.meaningToConceptMap.get(meaningId)!.add(conceptId);    

    if (!this.conceptToMeaningMap.has(conceptId)) {      
      this.conceptToMeaningMap.set(conceptId, new Set());    
    }    
    this.conceptToMeaningMap.get(conceptId)!.add(meaningId);  
  }  

  public getConceptIds(meaningId: string): string[] {    
    return Array.from(this.meaningToConceptMap.get(meaningId) || []);  
  }  

  public getMeaningIds(conceptId: string): string[] {    
    return Array.from(this.conceptToMeaningMap.get(conceptId) || []);  
  }  

  public resolveConcept(meaningId: string): { id: string; canonicalName?: string } | null {
    const conceptIds = this.getConceptIds(meaningId);
    if (!conceptIds || conceptIds.length === 0) return null;
    
    const conceptId = conceptIds[0];
    if (this.conceptRepo && typeof this.conceptRepo.findById === 'function') {
      const concept = this.conceptRepo.findById(conceptId);
      if (concept) {
        const idStr = typeof concept.id === 'object' && concept.id !== null ? (concept.id.value || concept.id.toString()) : String(concept.id || conceptId);
        return {
          id: idStr,
          canonicalName: concept.canonicalName || concept.name
        };
      }
    }
    return { id: conceptId, canonicalName: conceptId };
  }

  public getAllLinks(): MeaningConceptLink[] {    
    const links: MeaningConceptLink[] = [];    
    this.meaningToConceptMap.forEach((conceptIds, meaningId) => {      
      conceptIds.forEach(conceptId => {        
        links.push({ meaningId, conceptId });      
      });    
    });    
    return links;  
  }  

  public hasLink(meaningId: string, conceptId: string): boolean {    
    return this.meaningToConceptMap.get(meaningId)?.has(conceptId) ?? false;  
  }
}