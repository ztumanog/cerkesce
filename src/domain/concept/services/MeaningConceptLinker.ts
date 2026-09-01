import { MeaningConceptLink } from '../bridge/MeaningConceptLink';

export class MeaningConceptLinker {
  private readonly links: MeaningConceptLink[] = [];

  public link(meaningId: string, conceptId: string): MeaningConceptLink {
    const existing = this.links.find(
      l => l.meaningId === meaningId && l.conceptId === conceptId
    );
    if (existing) return existing;

    const newLink = new MeaningConceptLink({ meaningId, conceptId });
    this.links.push(newLink);
    return newLink;
  }

  public getMeaningsByConceptId(conceptId: string): string[] {
    return this.links
      .filter(l => l.conceptId === conceptId)
      .map(l => l.meaningId);
  }

  public getConceptsByMeaningId(meaningId: string): string[] {
    return this.links
      .filter(l => l.meaningId === meaningId)
      .map(l => l.conceptId);
  }
}