# ADR-0012: Real Knowledge Discovery Assembly

**Status:** ACCEPTED ✅  
**Date:** 2 Eylül 2026  
**Phase:** Faz 5 (Discovery Engine)  
**Etkilenen Katmanlar:** Service, API, UI  
**Confidence:** HIGH 🔥

---

## Context

Discovery Engine'in temel mimarisi, Phase 5'te tanımlanmaktadır. Bu engine:
- Kullanıcı sorgularını anlamsal olarak kavramlara eşleştirir
- İlişkili kavramları bulur
- Bilgi grafiğini keşfeder

### Discovery Engine Tanımı
- Sorgu-kavram eşleştirme sistemi
- Graph traversal motoru
- Sonuç sıralama sistemi

### Problem Tanımı
- **Deterministik Eşleştirme:** Sorgu-kavram eşleştirmesi deterministik olmalıdır
- **Çok Dilli Destek:** Çok dilli sorgular desteklenmelidir
- **Performans Kritiği:** Performans kritiktir (sub-50ms)
- **Bağlamsal Sonuçlar:** Sonuçlar sıralanmalı ve bağlamsal olmalıdır

### Gereksinimler
- Sub-50ms yanıt süresi
- Türkçe, Kürtçe, Arapça, İngilizce desteği
- Deterministik sonuçlar
- Audit trail

---

## Decision

**5 Ana Karar:**

1. **Query Semantic Mapper:** Sorguları kavramlara eşleştiren deterministik mapper
2. **Concept Network Traversal:** Meaning Graph'ta traversal yapan engine
3. **Result Ranking:** PageRank ve relevance score ile sonuçları sırala
4. **Multi-language Support:** Türkçe, Kürtçe, Arapça, İngilizce desteği
5. **Caching Strategy:** Sık sorguları cache'le

---

## Implementation

### Discovery Engine Mimarisi

```
User Query
    ↓
[1] Unicode NFC Normalizasyonu
    ↓
[2] Dil Tespiti (TR/EN/KU/AR)
    ↓
[3] Query Intent Sınıflandırması
    ↓
[4] Concept Mapping
    ↓
[5] Graph Traversal
    ↓
[6] Result Ranking
    ↓
Discovery Result
```

### QuerySemanticMapper Service

```typescript
class QuerySemanticMapper {
  async mapQueryToConcepts(query: string): Promise<ConceptMappingResult> {
    // 1. Normalize
    const normalized = query.normalize('NFC').toLowerCase();
    
    // 2. Detect Language
    const language = this.detectLanguage(normalized);
    
    // 3. Classify Intent
    const intent = this.classifyIntent(normalized, language);
    
    // 4. Extract Concepts
    const concepts = this.extractConcepts(normalized, language);
    
    return {
      concepts,
      intent,
      language,
      confidence: this.calculateConfidence(concepts)
    };
  }
  
  private detectLanguage(query: string): 'tr' | 'en' | 'ku' | 'ar' {
    // Karakter seti analizi
    const turkishChars = /[çğıöşüÇĞİÖŞÜ]/;
    const kurdishChars = /[êîûÊÎÛ]/;
    const arabicChars = /[\u0600-\u06FF]/;
    
    if (arabicChars.test(query)) return 'ar';
    if (kurdishChars.test(query)) return 'ku';
    if (turkishChars.test(query)) return 'tr';
    return 'en';
  }
  
  private classifyIntent(query: string, language: string): QueryIntent {
    if (/nedir|ne|what|çi ye/i.test(query)) return QueryIntent.DEFINITION;
    if (/nerede|where|li ye/i.test(query)) return QueryIntent.LOCATION;
    if (/midir|mi|is|a|e/i.test(query)) return QueryIntent.CLASSIFICATION;
    return QueryIntent.PROPERTY;
  }
}
```

### DiscoveryService

```typescript
class DiscoveryService {
  constructor(
    private graph: MeaningGraph,
    private mapper: QuerySemanticMapper,
    private cache: Cache
  ) {}
  
  async discover(query: string, depth: number = 2): Promise<DiscoveryResult> {
    // Cache'i kontrol et
    const cacheKey = `discovery:${query}`;
    const cached = await this.cache.get(cacheKey);
    if (cached) return cached;
    
    const startTime = Date.now();
    
    // Query'yi kavramlara eşleştir
    const mapping = await this.mapper.mapQueryToConcepts(query);
    
    // Graph'ta traversal yap
    const relatedConcepts = new Set<string>();
    for (const conceptId of mapping.concepts) {
      const traversal = new GraphTraversal();
      const related = traversal.bfs(this.graph, conceptId, depth);
      related.forEach(id => relatedConcepts.add(id));
    }
    
    // Sonuçları sırala
    const ranked = this.rankResults(relatedConcepts, mapping);
    
    const result: DiscoveryResult = {
      query,
      concepts: ranked,
      intent: mapping.intent,
      language: mapping.language,
      timestamp: new Date(),
      executionTime: Date.now() - startTime
    };
    
    // Cache'e kaydet (1 saat)
    await this.cache.set(cacheKey, result, 3600);
    
    return result;
  }
  
  private rankResults(
    conceptIds: Set<string>,
    mapping: ConceptMappingResult
  ): RankedConcept[] {
    const ranked: RankedConcept[] = [];
    
    for (const conceptId of conceptIds) {
      const node = this.graph.nodes.get(conceptId);
      if (!node) continue;
      
      const relevance = this.calculateRelevance(node.concept, mapping);
      const pageRank = node.pageRank || 0;
      
      // Weighted score: 60% relevance, 40% pagerank
      const score = relevance * 0.6 + pageRank * 0.4;
      
      ranked.push({
        concept: node.concept,
        score,
        relevance,
        pageRank
      });
    }
    
    // En yüksek score'dan en düşüğe sırala
    return ranked.sort((a, b) => b.score - a.score);
  }
  
  private calculateRelevance(concept: Concept, mapping: ConceptMappingResult): number {
    let relevance = 0;
    
    // Dil eşleşmesi
    if (concept.language === mapping.language) {
      relevance += 0.3;
    }
    
    // Label eşleşmesi
    if (concept.label.toLowerCase().includes(mapping.query.toLowerCase())) {
      relevance += 0.4;
    }
    
    // Açıklama eşleşmesi
    if (concept.description?.toLowerCase().includes(mapping.query.toLowerCase())) {
      relevance += 0.3;
    }
    
    return Math.min(relevance, 1.0);
  }
}
```

### API Response Models

```typescript
interface DiscoveryResult {
  query: string;
  concepts: RankedConcept[];
  intent: QueryIntent;
  language: string;
  timestamp: Date;
  executionTime: number;
}

interface RankedConcept {
  concept: Concept;
  score: number;
  relevance: number;
  pageRank: number;
}

enum QueryIntent {
  DEFINITION = 'definition',        // "su nedir?"
  PROPERTY = 'property',            // "su sıvı mıdır?"
  LOCATION = 'location',            // "nehir nerede?"
  CLASSIFICATION = 'classification' // "çay içecek midir?"
}
```

### Discovery Gateway Controller

```typescript
@Controller('/api/discovery')
export class DiscoveryGatewayController {
  constructor(private discoveryService: DiscoveryService) {}
  
  @Post('/search')
  async search(@Body() req: DiscoveryRequest): Promise<APIResponse<DiscoveryResult>> {
    try {
      const result = await this.discoveryService.discover(req.query, req.depth);
      
      return {
        success: true,
        data: result,
        timestamp: new Date()
      };
    } catch (error) {
      return {
        success: false,
        error: {
          code: 'DISCOVERY_ERROR',
          message: error.message
        },
        timestamp: new Date()
      };
    }
  }
}
```

---

## Consequences

### Positive ✅
- **Deterministik:** Aynı sorgu aynı sonucu verir
- **Hızlı:** Sub-50ms yanıt süresi
- **Ölçeklenebilir:** Cache ile performans artar
- **Çok Dilli:** Birden fazla dil desteklenir

### Negative ❌
- **Sınırlı:** Sadece tanımlanmış pattern'ler çalışır
- **Bakım:** Yeni pattern'ler eklemesi gerekli
- **Cache:** Cache invalidation karmaşık

---

## Related ADRs

- **ADR-0010:** Concept Repository
- **ADR-0011:** Meaning Graph Bootstrap
- **ADR-0013:** Query Semantic Mapping
- **ADR-0014:** Concept Network Projection

---

## Rationale

### Neden Deterministik?
- Audit trail gerekli
- Aynı sorgu aynı sonuç vermeli
- AI bağımlılığını azaltmak
- Reproducible results

### Neden Cache?
- Sub-50ms yanıt süresi için gerekli
- Sık sorguları optimize etmek
- Database yükünü azaltmak
- Kullanıcı deneyimi iyileştirmek

### Neden Multi-language?
- Çerkesçe, Türkçe, Kürtçe, Arapça desteği
- Global audience
- Linguistic diversity

---

## Performance Targets

| Metrik | Hedef |
|--------|-------|
| Response Time | < 50ms |
| Cache Hit Rate | > 80% |
| Accuracy | > 90% |
| Throughput | > 1000 req/sec |

---

## Acceptance Criteria

- [x] QuerySemanticMapper service tanımlandı
- [x] DiscoveryService implementasyonu planlandı
- [x] Graph traversal algoritmaları tanımlandı
- [x] Result ranking stratejisi belirlendi
- [x] Caching stratejisi tanımlandı
- [x] Multi-language support planlandı
- [x] API Gateway controller tanımlandı
- [x] Performance targets belirlendi

---

## Implementation Roadmap

**Phase 5.1:** QuerySemanticMapper implementasyonu  
**Phase 5.2:** DiscoveryService implementasyonu  
**Phase 5.3:** Caching layer eklenmesi  
**Phase 5.4:** Multi-language support eklenmesi  
**Phase 5.5:** API Gateway integration  
**Phase 5.6:** Performance optimization  
**Phase 5.7:** Load testing

---

**Status:** ✅ ACCEPTED