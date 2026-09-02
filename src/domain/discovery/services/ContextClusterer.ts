import { RankedRelatedConceptDTO } from '../dto/RankedRelatedConceptDTO';
import { ContextClusterDTO } from '../dto/ContextClusterDTO';

export class ContextClusterer {
  public cluster(concepts: RankedRelatedConceptDTO[]): ContextClusterDTO[] {
    if (concepts.length === 0) {
      return [];
    }

    const clustersMap = new Map<string, { label: string; concepts: RankedRelatedConceptDTO[] }>();

    const getClusterInfo = (relationType: any): { id: string; label: string } => {
      const rel = String(relationType || '').toUpperCase();

      if (rel.includes('STATE')) {
        return { id: 'state', label: 'State' };
      }
      if (rel.includes('DRINK') || rel.includes('BEVERAGE')) {
        return { id: 'drink', label: 'Drink' };
      }
      if (rel.includes('CATEGORY')) {
        return { id: 'category', label: 'Category' };
      }
      if (rel.includes('LOCATION') || rel.includes('RESOURCE') || rel.includes('ORIGIN')) {
        return { id: 'location', label: 'Location' };
      }
      return { id: 'general', label: 'General Relations' };
    };

    for (const concept of concepts) {
      const { id, label } = getClusterInfo(concept.relationType);

      if (!clustersMap.has(id)) {
        clustersMap.set(id, { label, concepts: [] });
      }
      clustersMap.get(id)!.concepts.push(concept);
    }

    const result: ContextClusterDTO[] = [];
    clustersMap.forEach((val, key) => {
      // Her cluster içinde konseptleri score'a göre sırala (yüksekten düşüğe)
      const sortedConcepts = val.concepts.sort((a, b) => {
        if (b.score !== a.score) {
          return (b.score || 0) - (a.score || 0);
        }
        // Aynı score'da alfabetik sıralama
        return (a.conceptId || '').localeCompare(b.conceptId || '');
      });
      
      result.push({
        clusterId: key,
        label: val.label,
        concepts: sortedConcepts
      });
    });

    return result;
  }
}