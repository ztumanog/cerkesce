import json
from pathlib import Path

# 1) Mapping oku
mapping_path = Path('public/data/linguistic/concept_mapping.json')
mapping = json.loads(mapping_path.read_text(encoding='utf-8'))
print(f"Mapping: {len(mapping)}")

# 2) Yeni ConceptRegistry.ts olustur
yeni = """/**
 * File: src/domain/concept/ConceptRegistry.ts
 * Layer: Domain
 * 
 * Tum Concept ID'lerinin merkezi kaydi.
 * HIBRIT - String + ULID (05.10.2026)
 */

export interface ConceptEntry {
  ulid: string;
  tr: string;
  kbd?: string;
  ady?: string;
}

export const CONCEPT_REGISTRY: Record<string, ConceptEntry> = {
"""

# 3) Kavramlari ekle
kavramlar = sorted(mapping.keys())
for i, kavram in enumerate(kavramlar):
    comma = "," if i < len(kavramlar) - 1 else ""
    ulid = mapping[kavram]
    yeni += f"\n  {kavram}: {{ ulid: '{ulid}', tr: '{kavram}' }}{comma}"

yeni += """
};

export type ConceptName = keyof typeof CONCEPT_REGISTRY;
export type ConceptId = string;

/**
 * Concept ID -> ULID
 */
export function getConceptUlid(conceptId: string): string | undefined {
  return CONCEPT_REGISTRY[conceptId]?.ulid;
}

/**
 * ULID -> Concept ID
 */
export function getConceptIdByUlid(ulid: string): string | undefined {
  for (const [key, value] of Object.entries(CONCEPT_REGISTRY)) {
    if (value.ulid === ulid) return key;
  }
  return undefined;
}

/**
 * Concept ID -> Turkce isim
 */
export function getConceptDisplayNameTr(conceptId: string): string {
  return CONCEPT_REGISTRY[conceptId]?.tr || conceptId;
}

/**
 * Concept ID -> Kabardeyce isim
 */
export function getConceptDisplayNameKbd(conceptId: string): string {
  return CONCEPT_REGISTRY[conceptId]?.kbd || CONCEPT_REGISTRY[conceptId]?.tr || conceptId;
}
"""

# 4) Yaz
ts_path = Path('src/domain/concept/ConceptRegistry.ts')
ts_path.write_text(yeni, encoding='utf-8')

print(f"ConceptRegistry.ts guncellendi: {len(kavramlar)} kavram")
