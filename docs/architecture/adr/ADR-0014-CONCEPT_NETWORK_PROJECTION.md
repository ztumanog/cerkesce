# ADR-0014: Canonical Concept Network Projection & API Gateway Envelopes

**Status:** ACCEPTED
**Date:** 2 Eylül 2026
**Phase:** Faz 5.4 & Faz 6.1

## Executive Summary
ADR-0014, Discovery Engine (Faz 5.3) tarafından üretilen `DiscoveryResultDTO` verisini, UI üzerinde görselleştirilmek üzere bir formata dönüştüren ara katman (Projection Layer) mimarisini tanımlar.

## Core Decision
Kanonik `ConceptNetworkDTO` modeli aracılığıyla Discovery Engine'i tüm görselleştirme kütüphanelerinden (Cytoscape, D3, Vis.js, Sigma.js) izole etmek ve API Gateway seviyesinde gerekli dönük uyumlu (backward compatible) schema versiyonlama, güvenlik tavanı (graph ceiling) ve yönlülük bayrakları ile garanti altına almak.

## Decisions

### 1. Canonical Network Representation: `ConceptNetworkDTO`
UI kütüphanelerinden bağımsız olarak düğüm (nodes) ve yönlü kenar (edges) modelini temsil eder:
```typescript
interface ConceptNetworkDTO {
  nodes: ConceptNode[];
  edges: ConceptEdge[];
  metadata: NetworkMetadata;
}
```

### 2. Adapter Pattern for Visualization
- `ConceptGraphAdapter`: Domain verisini canonical modele çevirir
- `CytoscapeProjectionAdapter`: Verileri Cytoscape.js formatına dönüştürür
- Visualization kütüphaneleri bağımsız hale gelir

### 3. Standardized API Envelope
`DiscoveryGatewayController` üzerindeki tüm yanıtlar tip güvenli `APIResponse<T>` zarfı (success, data, error, timestamp) ile kapsulanır

## Consequences
- ✅ Domain katmanı frontend/görselleştirme kütüphanesi değişikliklerinden etkilenmez
- ✅ Tüm API istemcileri standart hata ve veri zarfları alarak entegrasyon sağlanır
- ⚠️ Adapter katmanı büyüdükçe performans takibini gerektirir

## Related ADRs
- ADR-0012: Real Knowledge Discovery Assembly
- ADR-0013: Query Semantic Mapping
- ADR-0011: Meaning Graph
