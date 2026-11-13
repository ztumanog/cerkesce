# Çerkesçe Dilbilimsel Platform — Mimari ve Arka Uç Bağlantı Denetim Raporu
**Tarih:** 2026-11-12 23:17:14

## 1. Veri Katmanı ve Standart ID (`L-<TRANSLITERASYON>`) Bütünlüğü
- **Toplam Lexeme Kaydı:** 28414
- **Standart Dışı Kalan ID Sayısı:** 0
- **Legacy ID (Geriye Dönük Uyumluluk) Havuzu:** 18574 kayıt
- **Diyalekt Dağılımı:** {"KBD":18471,"COMMON":7648,"ADY":2295}
- **Kırık Kök (`rootIds`) Referansı:** 28347
- **Kırık Kelime Ailesi (`wordFamilyId`) Referansı:** 0

### Yan Veri Dosyaları Referans Kontrolü
| Dosya | Toplam L-Ref | Geçerli | Eşleşmeyen | Örnek |
|---|---:|---:|---:|---|
| added-by-source.json | 0 | 0 | 0 | - |
| concept-tr.json | 1 | 1 | 0 | - |
| concept-verification.json | 0 | 0 | 0 | - |
| concept-words.json | 0 | 0 | 0 | - |
| concept_mapping.json | 0 | 0 | 0 | - |
| concept_registry_audit.json | 0 | 0 | 0 | - |
| dialects.json | 0 | 0 | 0 | - |
| dialect_pairs.json | 0 | 0 | 0 | - |
| embedding_dataset.json | 1339 | 834 | 505 | L-NEF, L-NEF1EGU, L-NEGUM, L-NEPC1YSHCH, L-KUSHCH |
| gramer_morfem.json | 477 | 0 | 477 | L-CORPUS2-00053, L-CORPUS2-00060, L-CORPUS2-00072, L-CORPUS2-00075, L-CORPUS2-00077 |
| huvaj_tr.json | 0 | 0 | 0 | - |
| huvaj_tr_temiz.json | 0 | 0 | 0 | - |
| kabardian_roots_database.json | 0 | 0 | 0 | - |
| kalan_kavramsizlar.json | 319 | 319 | 0 | - |
| lexemes.hatali_son.json | 67381 | 63910 | 3471 | L-UNESHHUE, L-UNEC1YQ1U, L-NEF-KOR, L-BZEDYDHU, L-BZESHXUE |
| lexemes.json | 73623 | 64994 | 8629 | L-UNESHHUE, L-UNEC1YQ1U, L-NEF-KOR, L-BZEDYDHU, L-BZESHXUE |
| lexemes_archived_c9.json | 44 | 12 | 32 | L-NE1EY, L-NEZAKUE, L-1EBZYGE, L-MAF1ASHE, L-PSYXHEL |
| lexemes_before_migration.json | 65432 | 62820 | 2612 | L-UNESHHUE, L-UNEC1YQ1U, L-NEF-KOR, L-BZEDYDHU, L-BZESHXUE |
| lexemes_gemini_temiz.json | 21124 | 21119 | 5 | L-CORPUS-01324, L-CORPUS-02360, L-KBD-05798, L-KBD-05799, L-KBD-05800 |
| lexemes_gemini_temiz_filtreli.json | 21124 | 21119 | 5 | L-CORPUS-01324, L-CORPUS-02360, L-KBD-05798, L-KBD-05799, L-KBD-05800 |
| lexemes_master_temiz.json | 69103 | 66466 | 2637 | L-UNESHHUE, L-UNEC1YQ1U, L-NEF-KOR, L-BZEDYDHU, L-BZESHXUE |
| lexemes_temiz_final.json | 21124 | 21119 | 5 | L-CORPUS-01324, L-CORPUS-02360, L-KBD-05798, L-KBD-05799, L-KBD-05800 |
| lexemes_to_restore.json | 44 | 12 | 32 | L-NE1EY, L-NEZAKUE, L-1EBZYGE, L-MAF1ASHE, L-PSYXHEL |
| lexemes_yeni_adaylar.json | 0 | 0 | 0 | - |
| lexemes_yeni_adaylar_p3.json | 0 | 0 | 0 | - |
| lexeme_roots.json | 0 | 0 | 0 | - |
| loanwords.json | 3 | 3 | 0 | - |
| morphemes.json | 301 | 301 | 0 | - |
| oneriler_examples.json | 34 | 34 | 0 | - |
| oneriler_literal_meaning.json | 7128 | 3034 | 4094 | L-D186D38FD18B, L-D189D185D18C, L-D185D183D18D, L-D0B4D0B5D0B6, L-D189D38FD18B |
| oneriler_translations_tr.json | 5696 | 4566 | 1130 | L-TKHE, L-D186D38FD18B, L-D0B0D183D18D, L-D189D185D18C, L-D185D183D18D |
| ornek-50.json | 0 | 0 | 0 | - |
| particles_pronouns.json | 3 | 3 | 0 | - |
| qc-post-merge.json | 0 | 0 | 0 | - |
| qc-pre-merge.json | 0 | 0 | 0 | - |
| ref_check_report.json | 22260 | 22252 | 8 | L-SHCH1EZHYN, L-SHCHIT1, L-SHCHISHCH, L-SHCHIPL1, L-SHCHITKHU |
| review-en.json | 279 | 276 | 3 | L-D0B7D18BD189, L-CORPUS-03662, L-VERIFIED-02242 |
| roots.json | 39499 | 39496 | 3 | L-TKHE, L-SHCHIBGHU, L-SHCHITKHU |
| roots_dangling_deleted_ids.json | 126 | 120 | 6 | L-D185D18CD18B, L-D09DD18DD189, L-CORPUS2-02960, L-CORPUS2-03220, L-CORPUS2-04010 |
| semantic_relations.json | 94 | 64 | 30 | L-PSY1AGHE, L-PSYXHEL, L-PSE1UV, L-PSEXU, L-PSEK1UED |
| taxonomy.json | 0 | 0 | 0 | - |
| word_families.before_A4.json | 166 | 122 | 44 | L-NAF, L-PSYSHXUE, L-NYBZHYSHXUE, L-UNESHHUE, L-C1YQ1U |
| word_families.json | 23712 | 23712 | 0 | - |
| word_families_merged.json | 5040 | 4615 | 425 | L-K1UIT1U, L-D0B3D183D0BF, L-D0B3D183D183, L-D0B3D183D184, L-D0B3D183D189 |
| word_families_yeni.json | 20000 | 19996 | 4 | L-SHCHIBGHU, L-SHCHITKHU, L-SHCHISHCH |
| word_form_mapping.json | 0 | 0 | 0 | - |
| yasakli-en.json | 0 | 0 | 0 | - |
| _aile_atama_plani.json | 0 | 0 | 0 | - |
| _bos_kok_oneri.json | 11 | 11 | 0 | - |

## 2. Backend API Rotaları (`app/api/**`) ve Çağrılma Durumu
| Endpoint | Metotlar | Çağıran Sayısı | Çağıran Dosyalar | Okuduğu JSON |
|---|---|---:|---|---|
| `/api/admin/concepts` | GET | 0 | ⚠️ HİÇBİR YERDEN ÇAĞRILMIYOR | 2ca-001-review.json, NextResponse.json |
| `/api/admin/curation/concepts` | GET,POST | 0 | ⚠️ HİÇBİR YERDEN ÇAĞRILMIYOR | concept_mapping.json, concept-tr.json, concept-verification.json, NextResponse.json, NextResponse.json |
| `/api/admin/curation/create` | POST | 1 | app/admin/curation/new/page.tsx | req.json, NextResponse.json, lexemes.json, NextResponse.json, lexemes.json, NextResponse.json, NextResponse.json |
| `/api/admin/curation/lexeme` | GET,POST | 2 | app/admin/curation/lexemes/page.tsx, app/admin/curation/[id]/EditForm.tsx | lexemes.json, audit_log.json, NextResponse.json, lexemes.json, NextResponse.json, NextResponse.json, req.json, NextResponse.json, NextResponse.json, lexemes.json, NextResponse.json, NextResponse.json, NextResponse.json, NextResponse.json |
| `/api/admin/curation` | GET,POST | 6 | app/admin/curation/bulk/page.tsx, app/admin/curation/csv/page.tsx, app/admin/curation/lexemes/page.tsx | concept_mapping.json, concept-tr.json, concept-verification.json, NextResponse.json, NextResponse.json |
| `/api/admin/curation/update-lexemes` | POST | 3 | app/admin/curation/bulk/page.tsx, app/admin/curation/csv/page.tsx, app/admin/curation/roots/page.tsx | NextResponse.json, req.json, NextResponse.json, NextResponse.json, lexemes.json, NextResponse.json, lexemes.json, NextResponse.json, lexemes.json, NextResponse.json |
| `/api/curation/batch-update` | POST | 1 | app/sozluk/family/[id]/page.tsx | req.json, NextResponse.json, lexemes.json, NextResponse.json, lexemes.json, NextResponse.json, NextResponse.json |
| `/api/curation/concepts/decide` | POST | 1 | app/admin/curation/ConceptReview copy.tsx | req.json, NextResponse.json |
| `/api/curation/concepts` | GET | 3 | app/admin/curation/ConceptReview copy.tsx, app/admin/curation/concepts/graph/page.tsx, app/admin/curation/concepts/page.tsx | lexemes.json, NextResponse.json, NextResponse.json |
| `/api/curation/lexemes` | GET,PATCH | 4 | app/admin/curation/concepts/graph/page.tsx, app/admin/curation/concepts/page.tsx, app/admin/curation/family/page.tsx | lexemes.json, NextResponse.json, NextResponse.json, lexemes.json, req.json, NextResponse.json, NextResponse.json, NextResponse.json, NextResponse.json, NextResponse.json, NextResponse.json, NextResponse.json, NextResponse.json, NextResponse.json, NextResponse.json, NextResponse.json, lexemes.json, NextResponse.json, NextResponse.json, NextResponse.json, NextResponse.json |
| `/api/curation/lexemes/update` | POST | 2 | app/admin/curation/concepts/graph/page.tsx, app/admin/curation/concepts/page.tsx | NextResponse.json, lexemes.json, req.json, NextResponse.json, NextResponse.json, -lexemes.json, audit.json, NextResponse.json, NextResponse.json |
| `/api/discovery/concept/[name]` | GET | 0 | ⚠️ HİÇBİR YERDEN ÇAĞRILMIYOR | NextResponse.json, NextResponse.json |
| `/api/discovery/search` | GET | 0 | ⚠️ HİÇBİR YERDEN ÇAĞRILMIYOR | NextResponse.json |
| `/api/governance/executive` | GET | 0 | ⚠️ HİÇBİR YERDEN ÇAĞRILMIYOR | NextResponse.json, NextResponse.json |
| `/api/governance/intelligence` | GET | 0 | ⚠️ HİÇBİR YERDEN ÇAĞRILMIYOR | NextResponse.json, NextResponse.json |
| `/api/governance/knowledge` | GET | 0 | ⚠️ HİÇBİR YERDEN ÇAĞRILMIYOR | NextResponse.json, NextResponse.json |
| `/api/governance/operations` | GET | 0 | ⚠️ HİÇBİR YERDEN ÇAĞRILMIYOR | NextResponse.json, NextResponse.json |
| `/api/governance/view` | GET | 0 | ⚠️ HİÇBİR YERDEN ÇAĞRILMIYOR | NextResponse.json, NextResponse.json |
| `/api/kavram/[concept]` | GET | 0 | ⚠️ HİÇBİR YERDEN ÇAĞRILMIYOR | lexemes.json, concept-words.json, concept-tr.json, NextResponse.json |
| `/api/moderasyon` | GET,POST | 0 | ⚠️ HİÇBİR YERDEN ÇAĞRILMIYOR | req.json, NextResponse.json, NextResponse.json, NextResponse.json, NextResponse.json, NextResponse.json |
| `/api/morphology/analyze` | GET,POST | 1 | app/sozluk/morphology/page.tsx | req.json, NextResponse.json, NextResponse.json, NextResponse.json, NextResponse.json |
| `/api/search` | GET | 1 | app/arama/AramaClient.tsx | lexemes.json, NextResponse.json, lexemes.json, NextResponse.json, NextResponse.json |
| `/api/sozluk/family/[id]` | GET | 0 | ⚠️ HİÇBİR YERDEN ÇAĞRILMIYOR | lexemes.json, NextResponse.json, NextResponse.json |
| `/api/sozluk/search` | POST | 0 | ⚠️ HİÇBİR YERDEN ÇAĞRILMIYOR | lexemes.json, req.json, NextResponse.json, NextResponse.json, NextResponse.json |
| `/api/translation` | GET | 0 | ⚠️ HİÇBİR YERDEN ÇAĞRILMIYOR | NextResponse.json, NextResponse.json, NextResponse.json |

## 3. Bağlantısız / Hiç Import Edilmeyen `lib/` Modülleri (0 adet)
- ✅ Tüm `lib/` modülleri en az bir dosya tarafından kullanılıyor.

## 4. Mock / Dummy / TODO İzleri Taşıyan Dosyalar (2 dosya)
- **app/admin/curation/family/client.tsx** (2 eşleşme): `const MOCK = [`
- **app/api/discovery/search/route.ts** (2 eşleşme): `const mockSuggestions = [`