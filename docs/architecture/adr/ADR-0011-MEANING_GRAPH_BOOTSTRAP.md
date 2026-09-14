# ADR-0011: Meaning Graph Bootstrap

**Status:** ACCEPTED ✅  
**Date:** 2 Eylül 2026  
**Phase:** Faz 3 (Concept Engine)  
**Etkilenen Katmanlar:** Domain, Service, Repository  
**Confidence:** HIGH 🔥

---

## Context

Kavramlar arasındaki anlamsal ilişkileri temsil etmek için bir graph yapısı gereklidir.

Phase 2'de oluşturulan çeviriler ve gruplandırmalar, Phase 3'te bir **Meaning Graph** oluşturur. Bu graph:
- **Node'lar:** Kavramlar (Concepts)
- **Edge'ler:** Anlamsal ilişkiler (is-a, part-of, related-to, vb.)

### Graph Yapısı Tanımı
- Directed Acyclic Graph (DAG) yapısında
- Node'lar kavram bilgisini içerir
- Edge'ler ilişki tipini ve ağırlığını içerir

### Problem Tanımı
- **Statik Tanımlama Zorluğu:** Kavramlar arasındaki ilişkileri statik olarak tanımlamak zordur
- **Dinamik Keşif İhtiyacı:** Dinamik ilişki keşfi gereklidir
- **Traversal Algoritmaları:** Graph traversal algoritmaları uygulanmalıdır
- **Performans & Bellek:** Performans ve bellek yönetimi kritiktir

---

## Decision

**5 Ana Karar:**

1. **Directed Acyclic Graph (DAG):** Anlamsal ilişkiler DAG yapısında temsil edilir
2. **Node Tanımı:** Her kavram bir node'dur ve metadata içerir
3. **Edge Tanımı:** İlişkiler typed edge'ler ile tanımlanır
4. **Bootstrap Stratejisi:** Graph, TranslationGroup'lardan otomatik olarak inşa edilir
5. **Traversal Algoritmaları:** BFS, DFS ve PageRank algoritmaları uygulanır

---

## Implementation

### MeaningGraph Veri Yapısı

```typescript
interface MeaningGraph {
  nodes: Map<string, GraphNode>;
  edges: Map<string, GraphEdge[]>;
  metadata: GraphMetadata;
}
```

### GraphNode Model

```typescript
interface GraphNode {
  id: string;
  concept: Concept;
  depth: number;
  inDegree: number;
  outDegree: number;
  pageRank?: number;
}
```

### GraphEdge Model

```typescript
interface GraphEdge {
  source: string;
  target: string;
  type: 'HYPERNYM' | 'HYPONYM' | 'MERONYM' | 'HOLONYM' | 'SIMILAR' | 'RELATED';
  weight: number;
  confidence: number;
}
```

### GraphMetadata Model

```typescript
interface GraphMetadata {
  nodeCount: number;
  edgeCount: number;
  density: number;
  diameter: number;
  createdAt: Date;
  version: string;
}
```

### Bootstrap Algoritması

```typescript
class MeaningGraphBuilder {
  async buildFromTranslations(translations: TranslationGroup[]): Promise<MeaningGraph> {
    const graph = new MeaningGraph();
    
    // 1. Node'ları oluştur
    for (const translation of translations) {
      const concept = this.extractConcept(translation);
      graph.addNode(concept);
    }
    
    // 2. Edge'leri oluştur (anlamsal ilişkilere göre)
    for (const [conceptId, concept] of graph.nodes) {
      const relatedConcepts = this.findRelatedConcepts(concept, graph.nodes);
      for (const [relatedId, relationType] of relatedConcepts) {
        graph.addEdge(conceptId, relatedId, relationType);
      }
    }
    
    // 3. Metrikleri hesapla
    graph.calculateMetrics();
    
    return graph;
  }
  
  private findRelatedConcepts(
    concept: Concept,
    allConcepts: Map<string, Concept>
  ): Map<string, EdgeType> {
    const related = new Map<string, EdgeType>();
    
    for (const [otherId, other] of allConcepts) {
      if (otherId === concept.id) continue;
      
      const similarity = this.calculateSimilarity(concept, other);
      if (similarity > 0.7) {
        related.set(otherId, 'RELATED');
      }
    }
    
    return related;
  }
}
```

### BFS Traversal

```typescript
class GraphTraversal {
  bfs(graph: MeaningGraph, startId: string, depth: number = 2): string[] {
    const visited = new Set<string>();
    const queue: [string, number][] = [[startId, 0]];
    const result: string[] = [];
    
    while (queue.length > 0) {
      const [nodeId, currentDepth] = queue.shift()!;
      if (visited.has(nodeId) || currentDepth > depth) continue;
      
      visited.add(nodeId);
      result.push(nodeId);
      
      for (const edge of graph.edges.get(nodeId) || []) {
        if (!visited.has(edge.target)) {
          queue.push([edge.target, currentDepth + 1]);
        }
      }
    }
    
    return result;
  }
}
```

### PageRank Algoritması

```typescript
class GraphTraversal {
  pageRank(graph: MeaningGraph, iterations: number = 20): Map<string, number> {
    const ranks = new Map<string, number>();
    const n = graph.nodes.size;
    const dampingFactor = 0.85;
    
    // İlk değerler
    for (const nodeId of graph.nodes.keys()) {
      ranks.set(nodeId, 1 / n);
    }
    
    // Iterasyon
    for (let i = 0; i < iterations; i++) {
      const newRanks = new Map<string, number>();
      
      for (const [nodeId, node] of graph.nodes) {
        let rank = (1 - dampingFactor) / n;
        
        // Gelen edge'leri kontrol et
        for (const [sourceId, edges] of graph.edges) {
          for (const edge of edges) {
            if (edge.target === nodeId) {
              const sourceNode = graph.nodes.get(sourceId)!;
              rank += dampingFactor * (ranks.get(sourceId)! / sourceNode.outDegree);
            }
          }
        }
        
        newRanks.set(nodeId, rank);
      }
      
      ranks = newRanks;
    }
    
    return ranks;
  }
}
```

---

## Consequences

### Positive ✅
- **Anlamsal İlişkiler:** Kavramlar arasındaki ilişkiler açık şekilde temsil edilir
- **Traversal:** Graph traversal algoritmaları ile komşu kavramları bulabiliriz
- **Ranking:** PageRank ile en önemli kavramları belirleyebiliriz
- **Görselleştirme:** Graph yapısı görselleştirmeye uygun

### Negative ❌
- **Karmaşıklık:** Graph inşası ve bakımı karmaşık
- **Performans:** Büyük graph'larda traversal yavaş olabilir
- **Memory:** Graph yapısı bellek tüketebilir

---

## Related ADRs

- **ADR-0009:** Concept Identity Strategy
- **ADR-0010:** Concept Repository
- **ADR-0013:** Query Semantic Mapping
- **ADR-0014:** Concept Network Projection

---

## Rationale

### Neden DAG?
- Döngüler olmadığı için traversal garantilidir
- Anlamsal ilişkiler hiyerarşik yapıdadır
- Sıralama işlemleri (topological sort) uygulanabilir

### Neden PageRank?
- En önemli kavramları belirleyebiliriz
- Sorgu sonuçlarını sıralamada kullanılabilir
- Web graph analizi için kanıtlanmış algoritma

### Neden Bootstrap?
- Otomatik graph inşası
- Manuel çalışma azalır
- Ölçeklenebilir çözüm

---

## Performance Considerations

### Memory Optimization
- Sparse matrix representation
- Lazy loading for large graphs
- Compression techniques

### Query Optimization
- Caching frequently accessed paths
- Index on edge types
- Batch processing

---

## Testing Strategy

- Unit tests for traversal algorithms
- Integration tests for graph building
- Performance tests for large graphs
- Correctness tests for PageRank

---

**Status:** ✅ ACCEPTED