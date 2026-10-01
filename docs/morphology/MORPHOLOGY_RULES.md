# MORPHOLOGY_RULES.md

## Rule 001 — Prefix Slots
Durum: AKTIF
Referans: ADR-0023
Bilesen: VerbPrefixDecompiler

## Rule 002 — Bound Root Detection
Durum: AKTIF
Ornekler: -сы, -лъы, -ты, -гъы, -къIэ
Bilesen: RootClassifier

## Rule 003 — Lemma Identity
Durum: AKTIF
Referans: ADR-0024
Kural: Farkli anlam = farkli lemma (Model A)

## Rule 004 — Root Taxonomy
Durum: AKTIF
Referans: ADR-0040
Tipler: FREE, BOUND, NEUTRAL, STABLE
Bilesen: RootClassifier

## Rule 005 — Possessive Prefix
Durum: AKTIF
Bilesen: PossessivePrefixDecompiler
Onekler: си-, уи-, и-, ди-, фи-, я-

## Rule 006 — Valence (Future)
Durum: KILITLI
Katman: Syntax Layer
Not: Morphology Engine disinda tutulur
