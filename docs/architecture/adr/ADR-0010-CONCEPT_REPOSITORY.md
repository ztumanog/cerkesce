# ADR-0010: Concept Repository

**Status:** ACCEPTED ✅  
**Date:** 2 Eylül 2026  
**Phase:** Faz 3 (Concept Engine)  
**Etkilenen Katmanlar:** Service, Repository, Domain  
**Confidence:** HIGH 🔥

---

## Context

Kavramlar (Concepts) için merkezi bir repository yapısı, Phase 3 Concept Engine'in temel altyapısını oluşturur.

Phase 2'de oluşturulan `TranslationEntry` ve `TranslationGroup` yapıları, Phase 3'te daha soyut bir seviyeye (Concept) çıkarılmaktadır. Birden fazla dil ve sözlükten gelen çeviriler, tek bir kavram altında birleştirilmelidir.

### Problem Tanımı
- **Dağınık Veri:** Çeviriler farklı kaynaklar ve dillerde dağınık durumdadır
- **Merkezi Yönetim Eksikliği:** Kavramlar arasındaki ilişkileri yönetmek için merkezi bir sistem gereklidir
- **Esneklik İhtiyacı:** Veri kaynağı değişikliğine karşı esneklik sağlanmalıdır
- **Performans Kritiği:** Sorgu performansı kritiktir

### Mevcut Durum
- Phase 2'de TranslationGroup yapısı oluşturulmuş
- Çeviriler JSON dosyalarında saklanmış
- İlişkiler tanımlanmamış

### Çözüm İhtiyacı
- Merkezi repository yapısı
- Generic adapter pattern
- Flexible veri kaynağı desteği

---

## Decision

**5 Ana Karar:**

1. **ConceptRepository<T> Arayüzü:** Kavramları yönetmek için generic bir repository arayüzü tanımlanır
2. **Merkezi Depo:** Tüm kavramlar unique `CONCEPT_ID` ile merkezi depoda yönetilir
3. **İlişki Yönetimi:** Concept-to-Concept ilişkileri (edges) repository tarafından yönetilir
4. **Adapter Pattern:** Repository, in-memory, JSON veya database tabanlı olabilir
5. **Sorgu Arayüzü:** Tüm sorgulamalar repository aracılığıyla yapılır (Service katmanından)

---

## Implementation

### ConceptRepository Arayüzü

```typescript
interface ConceptRepository<T = Concept> {
  // Temel CRUD işlemleri
  getConceptById(conceptId: string): Promise<T | null>;
  getConceptsByIds(conceptIds: string[]): Promise<T[]>;
  
  // İlişki sorgulaması
  getRelatedConcepts(conceptId: string, depth?: number): Promise<T[]>;
  getConceptRelations(conceptId: string): Promise<ConceptEdge[]>;
  
  // Oluşturma ve güncelleme
  createConcept(concept: Omit<T, 'id'>): Promise<string>;
  updateConceptRelations(conceptId: string, relations: ConceptEdge[]): Promise<void>;
  
  // Arama
  searchConcepts(query: string, language?: string): Promise<T[]>;
}
```

### Concept Model

```typescript
interface Concept {
  id: string;
  label: string;
  description?: string;
  language: string;
  translations: TranslationGroup[];
  metadata?: Record<string, any>;
}
```

### ConceptEdge Model

```typescript
interface ConceptEdge {
  sourceId: string;
  targetId: string;
  relationType: 'PARENT' | 'CHILD' | 'SIBLING' | 'RELATED';
  weight?: number;
}
```

### InMemoryConceptRepository

```typescript
class InMemoryConceptRepository implements ConceptRepository {
  private concepts: Map<string, Concept> = new Map();
  private edges: Map<string, ConceptEdge[]> = new Map();
  
  async getConceptById(conceptId: string): Promise<Concept | null> {
    return this.concepts.get(conceptId) || null;
  }
  
  async getRelatedConcepts(conceptId: string, depth: number = 1): Promise<Concept[]> {
    // BFS algoritması ile ilişkili kavramları getir
    const visited = new Set<string>();
    const queue: [string, number][] = [[conceptId, 0]];
    const result: Concept[] = [];
    
    while (queue.length > 0) {
      const [id, d] = queue.shift()!;
      if (visited.has(id) || d > depth) continue;
      
      visited.add(id);
      const concept = this.concepts.get(id);
      if (concept) result.push(concept);
      
      const edges = this.edges.get(id) || [];
      for (const edge of edges) {
        if (!visited.has(edge.targetId)) {
          queue.push([edge.targetId, d + 1]);
        }
      }
    }
    
    return result;
  }
  
  async createConcept(concept: Omit<Concept, 'id'>): Promise<string> {
    const id = `CONCEPT_${Date.now()}`;
    this.concepts.set(id, { ...concept, id });
    return id;
  }
}
```

### JsonConceptRepository

```typescript
class JsonConceptRepository implements ConceptRepository {
  private data: Concept[] = [];
  
  async loadFromFile(filePath: string): Promise<void> {
    // JSON dosyasından kavramları yükle
    const content = await fs.readFile(filePath, 'utf-8');
    this.data = JSON.parse(content);
  }
  
  async getConceptById(conceptId: string): Promise<Concept | null> {
    return this.data.find(c => c.id === conceptId) || null;
  }
}
```

### DatabaseConceptRepository

```typescript
class DatabaseConceptRepository implements ConceptRepository {
  constructor(private db: Database) {}
  
  async getConceptById(conceptId: string): Promise<Concept | null> {
    return this.db.query('SELECT * FROM concepts WHERE id = ?', [conceptId]);
  }
  
  async getRelatedConcepts(conceptId: string, depth: number = 1): Promise<Concept[]> {
    const query = `
      WITH RECURSIVE concept_tree AS (
        SELECT id, label, 0 as depth FROM concepts WHERE id = ?
        UNION ALL
        SELECT c.id, c.label, ct.depth + 1
        FROM concepts c
        JOIN concept_edges e ON c.id = e.target_id
        JOIN concept_tree ct ON e.source_id = ct.id
        WHERE ct.depth < ?
      )
      SELECT * FROM concept_tree
    `;
    return this.db.query(query, [conceptId, depth]);
  }
}
```

---

## Consequences

### Positive ✅
- **Merkezi Yönetim:** Kavramlar tek bir yerden yönetilir
- **Esneklik:** Veri kaynağı değişikliğine karşı dirençli (adapter pattern)
- **Ölçeklenebilirlik:** Yeni veri kaynakları kolayca entegre edilebilir
- **Sorgu Performansı:** İlişki sorgulaması optimize edilebilir

### Negative ❌
- **Sorgu Performansı:** Veri kaynağına bağlı (in-memory vs database)
- **Cache Stratejisi:** Büyük veri setlerinde cache gerekli
- **Senkronizasyon:** Birden fazla kaynaktan veri gelirse senkronizasyon zor

---

## Related ADRs

- **ADR-0009:** Concept Identity Strategy (Kavram kimliği tanımı)
- **ADR-0011:** Meaning Graph Bootstrap (Graph yapısı)
- **ADR-0013:** Query Semantic Mapping (Sorgu-kavram eşleştirmesi)
- **ADR-0014:** Concept Network Projection (Görselleştirme)

---

## Rationale

### Neden Repository Pattern?
- Veri kaynağından bağımsız olarak kavramları yönetebiliriz
- Test edilebilirlik artar (mock repository kullanılabilir)
- Yeni veri kaynakları eklemesi kolay hale gelir
- Dependency injection ile loose coupling sağlanır

### Neden Generic<T>?
- Farklı kavram tiplerini destekleyebiliriz
- Type safety sağlanır
- Gelecek genişlemelere hazır oluruz
- Code reusability artar

### Neden Adapter Pattern?
- In-memory, JSON ve database arasında kolayca geçiş yapılabilir
- Test ortamında mock repository kullanılabilir
- Production'da database, development'da in-memory kullanılabilir

---

## Acceptance Criteria

- [x] ConceptRepository arayüzü tanımlandı
- [x] InMemory, Json, Database implementasyonları planlandı
- [x] İlişki yönetimi (edges) tanımlandı
- [x] Adapter pattern uygulandı
- [x] Test edilebilirlik sağlandı
- [x] Tüm CRUD işlemleri tanımlandı
- [x] BFS algoritması implementasyonu yapıldı

---

## Implementation Roadmap

**Phase 3.1:** InMemoryConceptRepository implementasyonu  
**Phase 3.2:** JsonConceptRepository implementasyonu  
**Phase 3.3:** DatabaseConceptRepository implementasyonu  
**Phase 3.4:** Unit test yazılması  
**Phase 3.5:** Integration test yazılması  
**Phase 3.6:** Performance optimization

---

**Status:** ✅ ACCEPTED