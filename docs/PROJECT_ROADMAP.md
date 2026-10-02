# PROJECT_ROADMAP.md

**Tarih:** 2026-10-02
**Durum:** AKTIF
**Versiyon:** v1.0

---

## 1. PROJE OZETI

| Ozellik | Deger |
|---------|-------|
| Proje | Cerkesce Sozluk |
| Framework | Next.js 16 + TypeScript 5 |
| Parser | 18 |
| Ana Testler | 653 |
| Cert Testleri | 87 |
| Toplam Test | 740 |
| PASS | 740 |
| FAIL | 0 |

---

## 2. FAZ DURUMU

| Faz | Ad | Durum | Kanit |
|-----|-----|-------|-------|
| Phase 1 | Foundation | CLOSED | 287/287 PASS |
| Phase 2 | Translation Platform | CLOSED | ADR-GOV-006 |
| Phase 3 | Morphological Analysis | CLOSED | PHASE3_COMPLETION_REPORT |
| Phase 4 | Morphology + Syntax | COMPLETED | 621/621 PASS |
| Phase 5 | Discovery Engine | COMPLETED | PHASE_5_COMPLETION_REPORT |
| Phase 6 | API Gateway | COMPLETED | ADR-GOV-005 + 87/87 cert PASS |
| Phase 7 | Analytics & Export | COMPLETION CANDIDATE | ADR-P7-001 (beklemede) |

---

## 3. MORPHOLOGY ENGINE (18 PARSER)

### Root Katmani (2)
| # | Parser | Test |
|---|--------|------|
| 1 | RootClassifier | 10 |
| 2 | RootExtractor | 13 |

### Morpheme Katmani (12)
| # | Parser | Test |
|---|--------|------|
| 3 | MorphemeParser | 15 |
| 4 | PossessivePrefixDecompiler | 15 |
| 5 | NounCaseParser | 23 |
| 6 | NominalDerivationDecompiler | 24 |
| 7 | PronounDecompiler | 25 |
| 8 | NumeralDecompiler | 30 |
| 9 | VerbDecompiler | 24 |
| 10 | ParticipleDecompiler | 24 |
| 11 | AdverbDecompiler | 24 |
| 12 | PostpositionDecompiler | 24 |
| 13 | ConjunctionDecompiler | 24 |
| 14 | ParticleDecompiler | 24 |

### Lemma Katmani (2)
| # | Parser | Test |
|---|--------|------|
| 15 | LemmaBuilder | 10 |
| 16 | InflectionHandler | 5 |

### Phrase Katmani (1)
| # | Parser | Test |
|---|--------|------|
| 17 | PhraseAnalyzer | 30 |

### Syntax Katmani (1)
| # | Parser | Test |
|---|--------|------|
| 18 | SyntaxAnalyzer | 40 |

### TOPLAM
- 18 parser
- 621 test PASS

---

## 4. API GATEWAY (PHASE 6)

### Endpoint'ler

| # | Method | Path | Aciklama |
|---|--------|------|----------|
| 1 | GET | /api/v1/discovery/concept-network | Kavram agi |
| 2 | GET | /api/v1/discovery/explore | Kesif |
| 3 | GET | /api/v1/discovery/concept/:id | Kavram detayi |

### Middleware

| # | Middleware | Aciklama |
|---|-----------|----------|
| 1 | rateLimiter | 100 req/min |

### Bilesenler

| Katman | Dosya |
|--------|-------|
| Controller | ConceptNetworkController.ts |
| Controller | DiscoveryGatewayController.ts |
| Route | discoveryRoutes.ts |
| Middleware | rateLimiter.ts |
| OpenAPI | conceptNetworkOpenAPISpec.ts |

---

## 5. TEST DURUMU

### Main Pipeline

| Ozellik | Deger |
|---------|-------|
| Config | vitest.config.ts |
| Test | 621 |
| Dosya | 92 |
| Komut | npm test |
| Amac | Release kriteri |

### Cert Pipeline

| Ozellik | Deger |
|---------|-------|
| Config | vitest.cert.config.ts |
| Test | 87 |
| Dosya | 25 |
| Komut | npm run test:cert |
| Amac | Kalite hatti |

### TOPLAM

| Metrik | Deger |
|--------|-------|
| Test | 708 |
| PASS | 740 |
| FAIL | 0 |

---

## 6. YONETISIM BELGELERI (15)

| # | Belge | Konum |
|---|-------|-------|
| 1 | PHASE_TIMELINE_RECONCILIATION.md | docs/governance/ |
| 2 | MORPHOLOGY_SCOPE.md | docs/morphology/ |
| 3 | MORPHOLOGY_SCOPE_FREEZE.md | docs/morphology/ |
| 4 | MORPHOLOGY_ENGINE_CHARTER.md | docs/morphology/ |
| 5 | ROOTCLASSIFIER_COVERAGE.md | docs/morphology/ |
| 6 | PHASE_4_TEKNIK_KAPANIS_MATRISI.md | docs/phases/phase-4/ |
| 7 | ADR_INDEX.md | docs/architecture/adr/ |
| 8 | ADR_NUMBERING_POLICY.md | docs/architecture/adr/ |
| 9 | ADR-GOV-003-PHASE_REDEFINITION.md | docs/architecture/adr/ |
| 10 | ADR-GOV-005-PHASE_6_IDENTITY_DECISION.md | docs/architecture/adr/ |
| 11 | PHASE_6_IDENTITY_DECISION.md | docs/governance/ |
| 12 | PHASE_6_API_GATEWAY_CHARTER.md | docs/phases/phase-6/ |
| 13 | EMBEDDING_RESEARCH_TRACK.md | docs/embedding/ |
| 14 | CERT_PIPELINE.md | docs/governance/ |
| 15 | MIMAR_DURUM_RAPORU_2026-10-02.md | docs/reports/ |

---

## 7. RUNTIME IZOLASYONU

| Kontrol | Durum |
|---------|-------|
| Discovery import | Yok |
| KnowledgeRanker import | Yok |
| SemanticRetrieval import | Yok |
| Search Runtime import | Yok |

### Ilkeler

- Morphology uretir
- Phrase yapilandirir
- Syntax analiz eder
- Runtime karar verir

---

## 8. ADR DURUMU

| ADR | Konu | Durum |
|-----|------|-------|
| ADR-0016 | Phase 3-7 Freeze | SUPERSEDED |
| ADR-P4-001 | Phase 4 Activation | ACCEPTED |
| ADR-GOV-003 | Phase Redefinition | ACCEPTED |
| ADR-GOV-004 | Phase Gate Modeli | ACCEPTED |
| ADR-GOV-005 | Phase 6 Identity | ACCEPTED |
| ADR-0040 | Root Taxonomy | ACCEPTED |
| ADR-0023 | Verb Prefix Slot | ACCEPTED |
| ADR-0024 | Lemma Identity | ACCEPTED |
| ADR-0025 | Dialect Naming | ACCEPTED |

---

## 9. COMMIT GECMISI (SON 10)

| Commit | Aciklama |
|--------|----------|
| 3854b4d | ADR-GOV-005 netlestirildi |
| aaffdf4 | Cert pipeline ayristirildi |
| ea5c728 | API Gateway olgunlastirma |
| 842544e | PHASE_6_API_GATEWAY_CHARTER v2.0 |
| efc5462 | ADR-GOV-005 (Phase 6 Identity) |
| 69d3537 | ADR-GOV-004 + EMBEDDING_RESEARCH_TRACK |
| 95fac8c | Cert testleri 87/87 PASS |
| 83fad2d | MORPHOLOGY_SCOPE_FREEZE + CHARTER |
| 1ed3371 | PHASE_6_IDENTITY_DECISION + CHARTER |
| 05773ae | RootClassifier Coverage + Phase 4 Matrisi |

---

## 10. SONRAKI ADIMLAR

### Kisa Vade (1-2 gun)
- [ ] API Gateway Authentication
- [ ] API Gateway Monitoring
- [ ] Mimar'a nihai rapor

### Orta Vade (1 hafta)
- [ ] API Gateway GraphQL
- [ ] API Gateway Caching
- [ ] Phase 7 (Analytics & Export)

### Uzun Vade (1 ay)
- [ ] Production deployment
- [ ] Embedding Research Track (ayri)
- [ ] Yeni lexeme ekleme (dataset)

---

## 11. ILKELER

| Ilke | Durum |
|------|-------|
| ADR-ROOT-001 | Korunuyor |
| Runtime Izolasyonu | Korunuyor |
| Kapsam Dondurma | Korunuyor |
| Morphology = Frozen Scope | Korunuyor |
| Discovery'ye baglanmaz | Korunuyor |

---

**Imza:** Mimari Ekip
**Tarih:** 2026-10-02

