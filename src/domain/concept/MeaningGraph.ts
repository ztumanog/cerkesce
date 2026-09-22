function extractId(val: any): string {
  if (val === null || val === undefined) return "";
  if (typeof val === "string") return val;
  if (typeof val === "number") return String(val);
  if (typeof val.getValue === "function") return String(val.getValue());
  if (val.value !== undefined) return extractId(val.value);
  if (val.id !== undefined) return extractId(val.id);
  if (val.conceptId !== undefined) return extractId(val.conceptId);
  if (val.code !== undefined) return String(val.code);
  return String(val);
}

function extractRelationType(relation: any): string {
  if (!relation) return "";
  const type = relation.relationType ?? relation.type ?? relation.relation_type;
  if (!type) return "";
  if (typeof type === "string") return type;
  if (typeof type.getValue === "function") return String(type.getValue());
  if (type.value !== undefined) return String(type.value);
  if (type.name !== undefined) return String(type.name);
  return String(type);
}

export class MeaningGraph {
  private conceptsMap: Map<string, any> = new Map();
  private adjMap: Map<string, Array<{ targetId: string; relationType?: string }>> = new Map();
  private relationsList: Array<any> = [];

  constructor(private conceptRepository?: any) {}

  addConcept(concept: any): void {
    if (!concept) return;
    const id = extractId(concept.id || concept.conceptId || concept.code || concept);
    if (id) {
      this.conceptsMap.set(id, concept);
    }
  }

  addRelation(relation: any): void {
    if (!relation) return;
    const rawSource = relation.sourceId ?? relation.sourceConceptId ?? relation.from ?? relation.source;
    const rawTarget = relation.targetId ?? relation.targetConceptId ?? relation.to ?? relation.target;

    const sourceId = extractId(rawSource);
    const targetId = extractId(rawTarget);
    const relationType = extractRelationType(relation);

    if (sourceId && targetId) {
      this.relationsList.push({ ...relation, sourceId, targetId, relationType });

      if (!this.adjMap.has(sourceId)) this.adjMap.set(sourceId, []);
      if (!this.adjMap.has(targetId)) this.adjMap.set(targetId, []);

      this.adjMap.get(sourceId)!.push({ targetId, relationType });
      this.adjMap.get(targetId)!.push({ targetId: sourceId, relationType });
    }
  }

  getNeighbors(conceptId: any, relationTypes?: string[]): any[] {
    const key = extractId(conceptId);
    const neighbors = this.adjMap.get(key) || [];
    const upperTypes = relationTypes ? relationTypes.map((t) => String(t).toUpperCase()) : null;

    return neighbors
      .filter((n) => {
        if (!upperTypes || upperTypes.length === 0) return true;
        return n.relationType && upperTypes.includes(String(n.relationType).toUpperCase());
      })
      .map((n) => this.conceptsMap.get(n.targetId))
      .filter(Boolean);
  }

  filterByRelation(relationType: string): any[] {
    const upper = String(relationType).toUpperCase();
    return this.relationsList.filter((r) => String(r.relationType).toUpperCase() === upper);
  }

  async getSynonyms(conceptId: any): Promise<string[]> {
    return this.getRelatedByType(conceptId, ["SYNONYM", "SAME_AS", "EŞ", "ES", "SYNONYMOUS", "EQUIVALENT"]);
  }

  async getAntonyms(conceptId: any): Promise<string[]> {
    return this.getRelatedByType(conceptId, ["ANTONYM", "OPPOSITE_OF", "ZIT", "ZIT_ANLAM", "ANTONYMOUS", "OPPOSITE"]);
  }

  private getRelatedByType(conceptId: any, types: string[]): string[] {
    const key = extractId(conceptId);
    const neighbors = this.adjMap.get(key) || [];
    const out: string[] = [];
    const upperTypes = types.map((t) => t.toUpperCase());

    for (const n of neighbors) {
      const relType = String(n.relationType || "").toUpperCase();
      if (upperTypes.includes(relType)) {
        out.push(n.targetId);
      }
    }
    return out;
  }

  async traverse(
    startId: any,
    depth: number = 1,
    options?: { relationTypes?: string[]; filterTypes?: string[]; [key: string]: any }
  ): Promise<{ rootId: string; depth1: string[]; depth2: string[]; [key: string]: any }> {
    if (this.conceptRepository) {
      let repoItems: any[] = [];
      if (typeof this.conceptRepository.findAll === "function") {
        repoItems = await this.conceptRepository.findAll();
      } else if (this.conceptRepository.items) {
        repoItems = this.conceptRepository.items instanceof Map
          ? Array.from(this.conceptRepository.items.values())
          : Array.from(Object.values(this.conceptRepository.items));
      }

      if (Array.isArray(repoItems)) {
        for (const item of repoItems) {
          const id = extractId(item.id || item.conceptId);
          if (id && !this.conceptsMap.has(id)) {
            this.conceptsMap.set(id, item);
          }
        }
      }
    }

    const startKey = extractId(startId);
    const allowedTypes = options?.relationTypes || options?.filterTypes;
    const allowedUpper = allowedTypes ? allowedTypes.map((t) => String(t).toUpperCase()) : null;

    const visited = new Set<string>();
    const levels: Record<number, string[]> = { 0: [startKey] };
    const queue: Array<{ id: string; currentDepth: number }> = [{ id: startKey, currentDepth: 0 }];

    visited.add(startKey);

    while (queue.length > 0) {
      const { id, currentDepth } = queue.shift()!;

      if (currentDepth >= depth) continue;

      const neighbors = this.adjMap.get(id) || [];
      for (const neighbor of neighbors) {
        if (allowedUpper && allowedUpper.length > 0 && neighbor.relationType) {
          const relTypeUpper = String(neighbor.relationType).toUpperCase();
          if (!allowedUpper.includes(relTypeUpper)) {
            continue;
          }
        }
        if (!visited.has(neighbor.targetId)) {
          visited.add(neighbor.targetId);
          const nextDepth = currentDepth + 1;
          if (!levels[nextDepth]) levels[nextDepth] = [];
          levels[nextDepth].push(neighbor.targetId);
          queue.push({ id: neighbor.targetId, currentDepth: nextDepth });
        }
      }
    }

    const out: any = { rootId: startKey, depth1: levels[1] || [], depth2: levels[2] || [] };
    for (const d of Object.keys(levels)) {
      out[`depth${d}`] = levels[Number(d)];
    }
    return out;
  }
}

export default MeaningGraph;
