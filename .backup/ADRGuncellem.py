#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Çerkesçe Knowledge Engine - ADR-0001 to ADR-0014 Kapsamlı Güncelleyici
Tüm mimari kararlar merkezi konumda yönetilir
"""

import os
from pathlib import Path
from datetime import datetime

# ADR-0001 to ADR-0004: Temel Mimari
CORE_ADRS = {
    "ADR-0001.md": """# ADR-0001: Modüler Tip Mimarisi ve Merkezi Yönetim

**Status:** Approved
**Date:** 15 Aralık 2025
**Updated:** Eylül 2026

## Context
Bileşenler, hook'lar ve sayfalar arasında veri tiplerinin tekrar tanımlanması tip çatışmalarına yol açıyordu.

## Decision
Tüm uygulama veri yapıları (`ExtendedDictionaryItem`, `DictionaryMeta`, `ConceptRow`) tek bir merkezde, `@/types/dictionary.ts` modülü altında toplanmıştır.

## Consequences
- ✅ **Olumlu:** Tip güvenliği %100, kod tekrarı engellendi
- ⚠️ **Olumsuz:** Büyük dosya → alt modüllere bölünebilir

## Related ADRs
- ADR-0002: Çok Dilli Standart
- ADR-0003: Repository Ayrışımı
- ADR-0004: Heterojen Normalizasyon
""",

    "ADR-0002.md": """# ADR-0002: Domain Modelinde Çok Dilli Meaning ve Group Name Standartlaşması

**Status:** Approved
**Date:** 15 Aralık 2025
**Updated:** Eylül 2026

## Context
Çeviri anlamlarında hedef dil bilgisinin olmaması çok dilli altyapıyı zorlaştırıyordu.

## Decision
1. TranslationMeaning arabirimine zorunlu `language: "TR" | "RU" | "EN"` alanı eklendi
2. TranslationGroup arabirimindeki alan adı `groupName` olarak standartlaştırıldı

## Consequences
- ✅ **Olumlu:** Çok dilli altyapı tip seviyesinde garantiye alındı
- ⚠️ **Olumsuz:** Mevcut mock verilerin tamamına language alanı eklenmesi gerekti

## Related ADRs
- ADR-0001: Modüler Tip Mimarisi
- ADR-0005: TranslationGroup Strategy
- ADR-0008: TranslationMeaning Representation
""",

    "ADR-0003.md": """# ADR-0003: ITranslationRepository ve Veri Erişim Katmanı Ayrışımı

**Status:** Approved
**Date:** 20 Aralık 2025
**Updated:** Eylül 2026

## Context
Veri kaynağının (JSON, In-Memory veya DB) iş mantığına doğrudan bağlı olması test yazmayı imkansız hale getiriyordu.

## Decision
ITranslationRepository arayüzü tanımlanarak veri katmanı iş mantığından tamamen soyutlaştırıldı.

## Consequences
- ✅ **Olumlu:** Veri kaynağı bağımsız, test kolaylaştı
- ⚠️ **Olumsuz:** Arayüz değişikliklerinde tüm implementasyonlar güncellenmeli

## Related ADRs
- ADR-0007: TranslationRepository Contract
- ADR-0010: Concept Repository
""",

    "ADR-0004.md": """# ADR-0004: Heterojen Sözlük Verilerinin Normalizasyonu ve Tip Güvenli Gruplanması

**Status:** Kabul Edildi
**Date:** 13 Eylül 2026
**Sorumlular:** Geliştirme Takımı / Mimari Ekip

## Bağlam ve Problem Tanımı
Çerkesçe Sözlük Portal projesinde 34 farklı kaynak sözlükten gelen veriler heterojen yapıdadır:
- Bazı kaynaklarda kelime anlamları düz metin (string)
- Bazılarında nesne dizisi (array of objects)
- Bazılarında iç içe geçmiş (nested) anahtar-değer çiftleri

Doğrudan render edilmeye çalışıldığında arayüzde `[object Object]` hataları veya `undefined`/`null` kaynaklı çalışma zamanı çökmeleri yaşanmaktadır.

## Karar
### A. Güvenli Tip Dönüştürme Mimarisi (`toStringSafe`)
Tüm veri kaynaklarından gelen kelime ve anlam değerleri `toStringSafe` yardımcı fonksiyonundan geçirilerek tek tip metin yapısına dönüştürülür:
- `null`/`undefined` → `""`
- `array` → Elemanlar birleştirilir
- `object` → `text`, `val`, `meaning` alanları ayıklanır

### B. Tekil ve Gruplanmış Veri Yapısı (Cross-Dictionary Matcher)
- Sözlük verileri yüklendikten sonra arama aşamasında kelime bazlı `Map` veri yapısı kullanılarak gruplanır
- Aynı kelimeye ait farklı kaynaklardaki anlamlar `GruplanmisKelime` veri tipinde birleştirilir
- Gruplanmış veriler detay görünümü için `KelimeDetayDrawer` bileşenine aktarılır

### C. Merkezileştirilmiş Tip Tanımları
TypeScript derleme hatalarını önlemek için sözlük veri modelleri tek bir merkezde tanımlanmıştır:
- `DictionaryEntry`: Kaynak dosyadan okunan ham veya normalize edilmiş veri
- `DictionaryItem`: Normalize edilmiş tekil sözlük öğesi
- `GruplanmisKelime`: Kullanıcıya sunulmak üzere gruplanmış sözlük öğesi

## Sonuçlar
### Olumlu Etkiler
- ✅ Arayüz Kararlılığı: `[object Object]` ve `undefined` hataları tamamen engellenmiştir
- ✅ Daha İyi Kullanıcı Deneyimi: Aynı kelimenin farklı sözlüklerdeki karşılıkları tek bir kart altında gruplanır
- ✅ Tip Güvenliği: TypeScript derleme sürecinde sıfır hata (Clean Build) standardına ulaşılmıştır

### Olumsuz / Riskli Etkiler
- ⚠️ Arama Esnasında Bellek/İşlem Yükü: Kelimelerin çalışma zamanında `Map` yapısı ile gruplanması büyük veri kümelerinde performans takibini gerektirir

## Related ADRs
- ADR-0006: Cross Dictionary Matching
- ADR-0007: TranslationRepository Contract
- ADR-0009: Core Dictionary Platform
""",
}

# ADR-0005 to ADR-0014: Yüklenen ADR'lar (Özet)
UPLOADED_ADRS = {
    "ADR-0005.md": """# ADR-0005: TranslationGroup Strategy

**Status:** Kabul Edildi
**Date:** 30 Ağustos 2026
**Phase:** Faz 2 (Translation Platform)

## Context
`TranslationGroup` yapısı **Sense (Anlam)** tabanlı kurgulanır.

## Decision
1. `TranslationGroup` yapısı Sense tabanlı kurgulanır
2. Birden fazla sözlükten gelen aynı lemmaya ait anlamlar tek bir grup içinde sunulur
3. `TranslationGroup` belongs to Phase 2, `Concept` belongs to Phase 3

## Consequences
- ✅ Faz disiplini korunmuş olur
- ✅ Phase 3 (Concept Engine) kapsamı korunmuş olur

## Related ADRs
- ADR-0002: Çok Dilli Standart
- ADR-0008: TranslationMeaning Representation
- ADR-0009: Concept Identity Strategy
""",

    "ADR-0006.md": """# ADR-0006: Cross Dictionary Matching

**Status:** Kabul Edildi
**Date:** 30 Ağustos 2026
**Phase:** Faz 2 (Translation Platform)

## Context
Çapraz sözlük eşleştirme işlemleri 3 kademeli öncelik sırasına göre yürütülür.

## Decision
1. **Priority 1 (Exact Match):** `гугъэ` = `гугъэ`
2. **Priority 2 (Orthographic Variant Match):** Belgelenmiş diyalekt varyantları
3. **Priority 3 (Translation Match):** Hedef dil anlam örtüşmesi

## Matching Hierarchy
- Exact Match > Orthographic Variant > Translation Match
- Undocumented dialect transformations MUST NEVER participate in automatic matching

## Consequences
- ✅ Rastgele diyalektik dönüşümler engellenir
- ✅ Yanlış eşleşme patlaması (false-positive explosion) önlenir

## Related ADRs
- ADR-0004: Heterojen Normalizasyon
- ADR-0007: TranslationRepository Contract
""",

    "ADR-0007.md": """# ADR-0007: TranslationRepository Contract

**Status:** Kabul Edildi
**Date:** 30 Ağustos 2026
**Phase:** Faz 2 (Translation Platform)

## Context
Repository katmanının sınırlarının çizilmesi ve iş mantığından soyutlanması gerekmektedir.

## Decision
1. `TranslationRepository` üst katmanları (Service, UI vb.) import edemez
2. Sorumluluk Ayrımı:
   - **Repository:** Veriyi döndürür, lookup sağlar, sorguyu çalıştırır
   - **Repository Yapamaz:** `TranslationGroup` oluşturmaz, semantik çıkarım yapmaz

## Minimum Interface Kontratı
```typescript
interface TranslationRepository {
  getByLemma(language: string, lemma: string): TranslationEntry | null;
  getTranslations(language: string, lemma: string): TranslationMeaning[];
  searchByMeaning(text: string): TranslationEntry[];
  reverseLookup(targetLanguage: string, text: string): TranslationEntry[];
}
```

## Related ADRs
- ADR-0003: ITranslationRepository Ayrışımı
- ADR-0010: Concept Repository
""",

    "ADR-0008.md": """# ADR-0008: TranslationMeaning Representation Strategy

**Status:** Kabul Edildi / Uygulandı
**Date:** 1 Eylül 2026
**Phase:** Faz 2 (Translation Platform)

## Context
Çeviri girdilerinde (`TranslationEntry`) anlam yapısının standartlaştırılmış bir dizi olarak temsil edilmesi gerekmektedir.

## Decision
1. `TranslationEntry` içerisindeki anlamlar `meanings: TranslationMeaning[]` dizisi olarak temsil edilir
2. `TranslationMeaning` tipi `text` ve `language` alanlarını içerir

## Type Definition
```typescript
interface TranslationMeaning {
  meaningId: string;
  targetLanguage: string;
  value: string;
}

interface TranslationEntry {
  entryId: string;
  sourceLanguage: string;
  lemma: string;
  meanings: TranslationMeaning[];
}
```

## Related ADRs
- ADR-0002: Çok Dilli Standart
- ADR-0005: TranslationGroup Strategy
""",

    "ADR-0009.md": """# ADR-0009: Concept Identity Strategy

**Status:** DRAFT (Phase 3 LOCKED)
**Date:** 1 Eylül 2026
**Phase:** Faz 3 (Concept Engine)

## Context
Dilden bağımsız "evrensel kavramlar" üzerinden anlamsal bir ağ oluşturabilmek için bir kavram kimliği mimarisine ihtiyaç vardır.

## Proposed Decision (Draft)
1. Dilden ve kaynak sözlükten bağımsız benzersiz `ConceptID` yapısı tanımlanacaktır
2. `TranslationEntry` → `Concept` ilişkisini sağlayacak bir mapping mekanizması oluşturulacaktır
3. Concept'ler ontolojik olarak yapılandırılacaktır

## Status
⚠️ **UYARI:** Bu karar Phase 3 tasarım aşaması içindir. Phase 3 kilitleri açılana kadar `src/` veya `app/` altında kod geliştirmesi YAPILAMAZ.

## Related ADRs
- ADR-0005: TranslationGroup Strategy
- ADR-0010: Concept Repository
- ADR-0011: Meaning Graph
""",

    "ADR-0010.md": """# ADR-0010: Concept Repository

**Status:** PROPOSED
**Date:** 2 Eylül 2026
**Phase:** Faz 3 (Concept Engine)

## Context
Kavramlar için merkezi bir repository yapısı gereklidir.

## Decision
1. `ConceptRepository` arayüzü tanımlanır
2. Kavramlar merkezi bir depoda yönetilir
3. Concept-to-Concept ilişkileri (edges) saklanır

## Related ADRs
- ADR-0009: Concept Identity Strategy
- ADR-0011: Meaning Graph
- ADR-0012: Real Knowledge Discovery Assembly
""",

    "ADR-0011.md": """# ADR-0011: Meaning Graph

**Status:** PROPOSED
**Date:** 2 Eylül 2026
**Phase:** Faz 3 (Concept Engine)

## Context
Kavramlar arasındaki anlamsal ilişkileri temsil etmek için bir graph yapısı gereklidir.

## Decision
1. Meaning Graph yapısı tanımlanır
2. Node'lar kavramları, edge'ler ilişkileri temsil eder
3. Graph traversal algoritmaları uygulanır

## Related ADRs
- ADR-0010: Concept Repository
- ADR-0012: Real Knowledge Discovery Assembly
- ADR-0013: Query Semantic Mapping
""",

    "ADR-0012.md": """# ADR-0012: Real Knowledge Discovery Assembly

**Status:** PROPOSED
**Date:** 2 Eylül 2026
**Phase:** Faz 5 (Discovery Engine)

## Context
Discovery Engine'in temel mimarisi tanımlanması gerekmektedir.

## Decision
1. Discovery Engine mimarisi tanımlanır
2. Query-to-Concept mapping gerçekleştirilir
3. Concept ranking ve contextual discovery uygulanır

## Related ADRs
- ADR-0011: Meaning Graph
- ADR-0013: Query Semantic Mapping
- ADR-0014: Canonical Concept Network Projection
""",

    "ADR-0013.md": """# ADR-0013: Deterministic Query Semantic Mapping Layer

**Status:** PROPOSED
**Date:** 2 Eylül 2026
**Phase:** Faz 5.3 (Query-Semantic Mapping)

## Context
Kullanıcı sorgularının semantik olarak kavramlarla eşleştirilmesi gerekmektedir.

## Decision
Kural tabanlı, deterministik Query Semantic Mapper oluşturulur:

### 1. Unicode NFC Normalizasyonu
```typescript
const normalized = query.normalize('NFC').toLowerCase();
```

### 2. Deterministik Dil Tespiti
- Karakter seti analizi
- Dil-spesifik kelimeleri kontrol
- Fallback: Türkçe

### 3. Query Pattern Matching
- Regex pattern matching
- Concept extraction
- Relation type mapping

### 4. Cross-Language Concept Mapping
- Çok dilli destek (TR/EN/KU/AR)
- Dialekt desteği (Kurmanji/Sorani)

### 5. Semantic Intent Classification
- DEFINITION: "su nedir?"
- PROPERTY: "su sıvı mıdır?"
- LOCATION: "nehir nerede?"
- CLASSIFICATION: "çay içecek midir?"

## Rationale
**Neden AI kullanılmıyor?**
1. Deterministik olması gerekli
2. Audit trail gerekli
3. Hızlı ve hafif
4. Bakım kolay
5. Offline çalışır

## Related ADRs
- ADR-0012: Real Knowledge Discovery Assembly
- ADR-0014: Canonical Concept Network Projection
""",

    "ADR-0014.md": """# ADR-0014: Canonical Concept Network Projection & API Gateway Envelopes

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
""",
}

def create_complete_adr_updater():
    """ADR-0001 to ADR-0014'ü güncelle"""
    
    print("=" * 80)
    print("🔄 ADR-0001 to ADR-0014 KAPSAMLI GÜNCELLEYICI")
    print("=" * 80)
    print()
    
    base_dir = Path.cwd()
    project_dir = base_dir / "CERKESCE_KNOWLEDGE_ENGINE"
    arch_dir = project_dir / "ARCHITECTURE"
    
    print(f"📍 Proje Dizini: {project_dir}")
    print(f"📁 ARCHITECTURE Dizini: {arch_dir}")
    print()
    
    try:
        arch_dir.mkdir(parents=True, exist_ok=True)
        
        # Core ADR'ları yaz
        print("📝 ADR-0001 to ADR-0004 (Temel Mimari) Yazılıyor...")
        for filename, content in CORE_ADRS.items():
            file_path = arch_dir / filename
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"   ✅ {filename}")
        
        print()
        print("📝 ADR-0005 to ADR-0014 (Yüklenen ADR'lar) Yazılıyor...")
        for filename, content in UPLOADED_ADRS.items():
            file_path = arch_dir / filename
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"   ✅ {filename}")
        
        print()
        print("=" * 80)
        print("✅ BAŞARILI!")
        print("=" * 80)
        print()
        print("📊 Özet:")
        print(f"   ✓ Toplam ADR Dosyası: 14")
        print(f"   ✓ Temel Mimari (ADR-0001 to ADR-0004): 4")
        print(f"   ✓ Çeviri & Kavram (ADR-0005 to ADR-0009): 5")
        print(f"   ✓ Discovery Engine (ADR-0010 to ADR-0014): 5")
        print()
        print("📋 ADR Kategorileri:")
        print("   ├── ADR-0001 to ADR-0004: Temel Mimari")
        print("   │   ├── ADR-0001: Modüler Tip Mimarisi")
        print("   │   ├── ADR-0002: Çok Dilli Standart")
        print("   │   ├── ADR-0003: Repository Ayrışımı")
        print("   │   └── ADR-0004: Heterojen Normalizasyon")
        print("   │")
        print("   ├── ADR-0005 to ADR-0009: Çeviri & Kavram Mimarisi")
        print("   │   ├── ADR-0005: TranslationGroup Strategy")
        print("   │   ├── ADR-0006: Cross Dictionary Matching")
        print("   │   ├── ADR-0007: TranslationRepository Contract")
        print("   │   ├── ADR-0008: TranslationMeaning Representation")
        print("   │   └── ADR-0009: Concept Identity Strategy")
        print("   │")
        print("   └── ADR-0010 to ADR-0014: Discovery Engine & Projection")
        print("       ├── ADR-0010: Concept Repository")
        print("       ├── ADR-0011: Meaning Graph")
        print("       ├── ADR-0012: Real Knowledge Discovery Assembly")
        print("       ├── ADR-0013: Deterministic Query Semantic Mapping")
        print("       └── ADR-0014: Canonical Concept Network Projection")
        print()
        print("🎉 Tüm ADR dosyaları başarıyla oluşturuldu!")
        print()
        
        return True
        
    except Exception as e:
        print(f"\n❌ HATA: {e}")
        return False

if __name__ == "__main__":
    success = create_complete_adr_updater()
    if not success:
        exit(1)