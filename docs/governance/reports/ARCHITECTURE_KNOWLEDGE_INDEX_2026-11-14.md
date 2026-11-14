\# Architecture Knowledge Index



\*\*Tarih:\*\* 2026-11-14

\*\*Kapsam:\*\* Kurumsal hafıza konsolidasyonu

\*\*Durum:\*\* Aktif



\## 1. Doküman Envanteri



\### 1.1. Raporlar (docs/governance/reports/)



| Belge | Boyut | Durum | Kategori |

|---|---|---|---|

| DIALECT\_BENCHMARK\_ACIKLAMASI.md | 2266 | ✅ Geçerli | Referans |

| LOADER\_TUTARLILIGI\_TEKNIK\_INCELEME\_2026-11-13.md | 2434 | ✅ Geçerli | Analiz |

| MIMARA\_RAPOR\_20261110.md | 4808 | 🟡 Tarihsel | Rapor |

| MVP2\_AUDIT\_RAPORU\_20261108.md | 4081 | 🟡 Tarihsel | Audit |

| ROOT\_FAMILY\_QUALITY\_REVIEW\_2026-11-13.md | 4664 | ✅ Geçerli | Analiz |

| SSOT\_MIGRATION\_FINAL\_REPORT\_2026-11-13.md | 5597 | ✅ Geçerli | Migration |



\### 1.2. Kararlar (docs/governance/decisions/)



| Belge | Boyut | Durum | Kategori |

|---|---|---|---|

| DECISIONS\_ARCHIVE\_2026-09-24.md | 1188 | 🟡 Tarihsel | Arşiv |

| DECISIONS\_FAZ16\_17.md | 24333 | 🟡 Tarihsel | Arşiv |

| DECISIONS.md | 4485 | ✅ Geçerli | Karar |

| KURUL\_HATIRLATMA\_HOMONYM\_PARTIAL\_RESOLUTION\_2026-11-13.md | 1480 | 🟡 Gözlem | Kayıt |

| KURUL\_HATIRLATMA\_HOMONYM\_ROOT\_DISAMBIGUATION\_2026-11-13.md | 4933 | 🟡 Gözlem | Kayıt |

| KURUL\_HATIRLATMA\_SSOT\_CONCEPTID.md | 1892 | ✅ Geçerli | Kayıt |

| MIMAR\_KARARI\_ARCHIVE\_2026-09-24.md | 1480 | 🟡 Tarihsel | Arşiv |

| MIMAR\_KARARI.md | 2971 | ✅ Geçerli | Karar |

| MIMAR\_MESAJ\_ADR\_CATALOG\_CLEANUP.md | 697 | 🟡 Tarihsel | Mesaj |

| MIMAR\_MESAJ\_FAZ4.md | 3382 | 🟡 Tarihsel | Mesaj |

| MIMAR\_MESAJ\_P5-001\_KAPANDI.md | 1350 | 🟡 Tarihsel | Mesaj |

| MIMAR\_MESAJ.md | 869 | 🟡 Tarihsel | Mesaj |

| MIMAR\_RAPOR\_ADR\_CATALOG\_CLEANUP.md | 1204 | 🟡 Tarihsel | Rapor |

| SSOT\_CONCEPTID\_MIGRATION\_PLAN.md | 7476 | ✅ Tamamlandı | Plan |

| SSOT\_MIGRATION\_BLOCKER\_RECORD\_2026-11-13.md | 4472 | ✅ KAPANDI | Blocker |



\## 2. Aktif Gerçekler



| # | Gerçek | Kanıt |

|---|---|---|

| 1 | ConceptId tek otorite | ConceptID.ts silindi, 21 ConceptId import |

| 2 | SSOT Migration tamamlandı | 24ee412, 15 commit |

| 3 | Loader problemi raporlandı | 486e330, P1/P2 açık |

| 4 | Homonym konusu gözlem seviyesinde | e692dd0, b08595f |

| 5 | Dialect motoru kabul edildi | 5943 Huvaj %100, dialectBulk %87-90 (referans) |

| 6 | Root-Lexeme grafı tutarlı | R-1E/R-GU/R-LHE raporu |

| 7 | Kırık referans sayısı 0 | Guard testi yeşil |

| 8 | Testler yeşil | 193/193, 998/998 |

| 9 | Build yeşil | next build çıktısı temiz |



\## 3. Tarihsel Ama Geçersiz



| # | Geçersiz Bilgi | Neden |

|---|---|---|

| 1 | ConceptID alias dönemi | ConceptID.ts silindi (03b221b) |

| 2 | Compatibility Bridge dönemi | Concept.ts'ten kaldırıldı (ef1edf3) |

| 3 | Eski baseline (14 ConceptID) | Final: 0 ConceptID |

| 4 | Eski WF-GU bulguları | R-GU\_1/2/3, R-GUP ayrı kökler |

| 5 | Eski dialect benchmark (65 çift) | Şimdi 101 çift, %87-90 |

| 6 | Eski test sayısı (1085) | Şimdi 998 (temizlik sonrası) |



\## 4. Tamamlanan İşler



| İş | Commit | Tarih | Durum |

|---|---|---|---|

| SSOT ConceptId Migration | 24ee412 | 2026-11-13 | ✅ |

| Loader Tutarlılığı İnceleme | 486e330 | 2026-11-13 | ✅ |

| Root Family Quality Review | 6cee3c7 | 2026-11-13 | ✅ |

| Dialect Benchmark | 2e136ac | 2026-11-12 | ✅ |

| ADR-GOV-014 | ? | ? | ✅ |

| ADR-GOV-015 | ? | ? | ✅ |

| MVP-2 | ? | ? | ✅ |

| BAT-002 | ? | ? | ✅ |



\## 5. Gözlem / Park



| İş | Commit | Durum | Neden |

|---|---|---|---|

| Homonym Root Disambiguation | e692dd0 | 🟡 Gözlem | Domain borcu |

| Homonym Partial Resolution | b08595f | 🟡 Gözlem | Tarihsel not |

| Loader Tutarlılığı | 85a9f42 | 🟡 Kayıt | P1/P2 açık |

| R-1E/R-GU/R-LHE kalite | 6cee3c7 | 🟡 Gözlem | Mimar kararı |



\## 6. Bloker Geçmişi



| Bloker | Açılış | Kapanış | Neden |

|---|---|---|---|

| Concept.ts Bridge | 2026-11-13 | b21c098 | API parity + bridge kaldırma |



\## 7. Aktif İş



\*\*Yok.\*\* Operatör modu, kurul kararı bekliyor.



\## 8. Yasaklar (Kurul Kararı Gelmeden)



\- Yeni migration

\- Yeni refactor

\- Yeni ADR

\- Veri modeli değişikliği

\- ConceptId ile ilgili çalışma

\- Root merge çalışması

\- Homonym düzeltmesi



\## 9. Sonraki Adım



Kurul kararı bekleniyor. Tetikleyiciler:

1\. CI kırılırsa

2\. Build kırılırsa

3\. Üretim hatası çıkarsa

4\. Kurul kararı gelirse

5\. Yeni MVP onaylanırsa



\---



\*\*İndeks:\*\* 2026-11-14

\*\*Kapsam:\*\* 21 doküman (6 rapor + 15 karar)

\*\*Durum:\*\* Aktif

