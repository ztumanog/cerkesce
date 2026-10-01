
# FAZ 6 GATE QUESTIONS

**Tarih:** 2026-09-29
**Durum:** PROPOSED
**Amac:** Faz 6 (Embedding Engine) icin gate sorularini cevaplamak

---

## ON KOSUL: Faz 5 Durumu

**Soru:** Faz 5 gercekten kapandi mi?

**Cevap:** EVET

**Kanit:**
- Commit: 979cd5c (Faz 5 kapanis karari)
- Commit: 156320c (Faz C-7 tamamlama)
- PROJECT_STATUS.md: Faz 5 = COMPLETED
- ROADMAP.md: Faz 5 = COMPLETED
- PHASES.md: Faz 5 = COMPLETED

**Test:** 231/231 PASS

---

## Q1: Embedding Unit nedir?

**Secenekler:**
- [ ] Concept Embedding
- [ ] TranslationGroup Embedding
- [ ] Lexeme Embedding
- [ ] WordFamily Embedding
- [ ] Root Embedding

**Karar:** (Mimar onayi bekleniyor)

**Not:** Bu, Faz 6'nin temel mimari karari. Her secenek farkli bir mimari gerektirir.

---

## Q2: Vector Store kullanilacak mi?

**Secenekler:**
- [ ] Evet, harici vector DB (Pinecone, Weaviate, vb.)
- [ ] Evet, yerel vector store (FAISS, Annoy, vb.)
- [ ] Hayir, sadece in-memory
- [ ] Henuz belirsiz

**Karar:** (Mimar onayi bekleniyor)

---

## Q3: Similarity Search hangi katmanda calisacak?

**Secenekler:**
- [ ] Runtime (Discovery Engine)
- [ ] Arastirma katmani (Linguistic Dataset)
- [ ] Her ikisi de
- [ ] Henuz belirsiz

**Karar:** (Mimar onayi bekleniyor)

**Not:** ADR-ROOT-001'e gore SemanticRelations runtime'a sokulmaz. Bu sinir korunmali.

---

## Q4: Semantic Relations runtime'a girecek mi?

**Mimar Onerisi:** HAYIR

**Karar:** (Mimar onayi bekleniyor)

**Not:** ADR-ROOT-001 acikca "SemanticRelations runtime'a sokulmaz" diyor.

---

## Q5: Runtime maliyeti nedir?

**Soru:** Embedding ve vector search runtime'da ne kadar maliyet getirir?

**Cevap:** (Henuz belirsiz)

---

## Q6: Retrieval modeli nedir?

**Secenekler:**
- [ ] Cosine similarity
- [ ] Euclidean distance
- [ ] Dot product
- [ ] Henuz belirsiz

**Karar:** (Mimar onayi bekleniyor)

---

## FAZ 6 GATE KARARI

**Durum:** PROPOSED

**Aciklama:** Bu belge, Faz 6'nin baslamasi icin cevaplanmasi gereken sorulari icerir. Tum sorular cevaplandiktan sonra Mimar gate kararini verir.

**Sonraki Adim:** Mimar'in Q1-Q6 sorularina cevap vermesi.

---

**Hazirlayan:** Dipo
**Tarih:** 2026-09-29
