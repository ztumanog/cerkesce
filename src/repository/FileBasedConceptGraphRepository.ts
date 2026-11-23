/**
 * FileBasedConceptGraphRepository — Görev 1b
 *
 * IConceptGraphRepository implementasyonu: kavram komşuluklarını GERÇEK VERİDEN türetir.
 * InMemoryConceptGraphRepository'deki (~57 kavram) elle tohumlanmış graf yerine:
 *   1. Kürasyon katmanı: InMemory tohum ilişkileri (yüksek kalite, öncelikli)
 *   2. Veri katmanı: lexemes.json üzerinden ortak wordFamilyId / rootId paylaşan kavramlar
 *
 * Böylece DiscoveryFacade zinciri 57 kavramla sınırlı kalmaz; veritabanındaki tüm
 * kavramlar için komşu üretir. Bilinen büyük hub'lar (tek kökte yüzlerce kavram)
 * HUB_LIMIT ile filtrelenir — "her şey her şeyle ilişkili" gürültüsünü önler.
 *
 * Önbellek: lexemes.json mtime'a göre modül düzeyinde tek örnek (lexemeStore deseni).
 * Sunucu bileşenlerinde senkron fs okuma sorun değil; istemcide kullanılmaz.
 */

import fs from 'fs';
import path from 'path';
import {
  IConceptGraphRepository,
  ConceptNeighbor,
} from '../domain/discovery/services/IConceptGraphRepository';
import { DiscoveryRelationType } from '../domain/discovery/types/DiscoveryRelationType';
import { InMemoryConceptGraphRepository } from './InMemoryConceptGraphRepository';

/** Tek bir aile/kök en fazla bu kadar kavrama bağlıysa komşuluk sinyali sayılır. */
const HUB_LIMIT = 150;
/** Veri katmanından kavram başına en fazla komşu (family + root toplamı). */
const MAX_DATA_NEIGHBORS = 10;

interface GraphIndex {
  /** conceptId -> o kavramın lexemelerinin familyId'leri */
  familiesByConcept: Map<string, Set<string>>;
  /** conceptId -> o kavramın lexemelerinin rootId'leri */
  rootsByConcept: Map<string, Set<string>>;
  /** familyId -> kavram kümesi */
  conceptsByFamily: Map<string, Set<string>>;
  /** rootId -> kavram kümesi */
  conceptsByRoot: Map<string, Set<string>>;
}

const DATA_DIR = path.join(process.cwd(), 'public', 'data', 'linguistic');

let cachedIndex: { mtimeMs: number; index: GraphIndex } | null = null;
const curatedRepo = new InMemoryConceptGraphRepository();

function buildIndex(lexemesPath: string): GraphIndex {
  const index: GraphIndex = {
    familiesByConcept: new Map(),
    rootsByConcept: new Map(),
    conceptsByFamily: new Map(),
    conceptsByRoot: new Map(),
  };

  let raw: unknown;
  try {
    raw = JSON.parse(fs.readFileSync(lexemesPath, 'utf-8').replace(/^﻿/, ''));
  } catch {
    return index; // veri okunamazsa boş indeks: yalnız kürasyon katmanı çalışır
  }
  const list: any[] = Array.isArray(raw) ? raw : (raw as any)?.lexemes ?? [];

  const addTo = (m: Map<string, Set<string>>, key: string, val: string) => {
    let s = m.get(key);
    if (!s) { s = new Set(); m.set(key, s); }
    s.add(val);
  };

  for (const l of list) {
    const conceptId = String(l?.conceptId || '').trim().toUpperCase();
    if (!conceptId) continue;
    const wordFamilyId = String(l?.wordFamilyId || '').trim();
    if (wordFamilyId) {
      addTo(index.familiesByConcept, conceptId, wordFamilyId);
      addTo(index.conceptsByFamily, wordFamilyId, conceptId);
    }
    if (Array.isArray(l?.rootIds)) {
      for (const rRaw of l.rootIds) {
        const rid = String(rRaw || '').trim();
        if (!rid) continue;
        addTo(index.rootsByConcept, conceptId, rid);
        addTo(index.conceptsByRoot, rid, conceptId);
      }
    }
  }
  return index;
}

function getIndex(lexemesPath: string): GraphIndex {
  let mtimeMs = 0;
  try {
    mtimeMs = fs.statSync(lexemesPath).mtimeMs;
  } catch {
    return cachedIndex?.index ?? buildIndex(lexemesPath); // dosya yoksa: eski indeks veya boş
  }
  if (cachedIndex && cachedIndex.mtimeMs === mtimeMs) return cachedIndex.index;
  const index = buildIndex(lexemesPath);
  cachedIndex = { mtimeMs, index };
  return index;
}

/**
 * Veri katmanı komşuları: ortak aile (güçlü sinyal) önce, ortak kök sonra.
 * Paylaşılan bağ sayısına göre puanlanır, en yüksek puanlılar döner.
 */
function dataNeighbors(index: GraphIndex, conceptId: string): ConceptNeighbor[] {
  const families = index.familiesByConcept.get(conceptId);
  const roots = index.rootsByConcept.get(conceptId);
  if (!families && !roots) return [];

  const scoreByConcept = new Map<string, number>();

  const accumulate = (linkIds: Set<string> | undefined, byLink: Map<string, Set<string>>, weight: number) => {
    if (!linkIds) return;
    for (const linkId of linkIds) {
      const members = byLink.get(linkId);
      if (!members || members.size > HUB_LIMIT) continue; // dev hub: gürültü, atla
      for (const member of members) {
        if (member === conceptId) continue;
        scoreByConcept.set(member, (scoreByConcept.get(member) || 0) + weight);
      }
    }
  };

  accumulate(families, index.conceptsByFamily, 3); // ortak aile: güçlü sinyal
  accumulate(roots, index.conceptsByRoot, 1); // ortak kök: zayıf sinyal

  return Array.from(scoreByConcept.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, MAX_DATA_NEIGHBORS)
    .map(([target]) => ({ targetConceptId: target, relationType: DiscoveryRelationType.RELATED }));
}

export class FileBasedConceptGraphRepository implements IConceptGraphRepository {
  private lexemesPath: string;

  /** Test edilebilirlik: varsayılan yol overridable. */
  constructor(lexemesPath?: string) {
    this.lexemesPath = lexemesPath || path.join(DATA_DIR, 'lexemes.json');
  }

  public getNeighbors(conceptId: string): ConceptNeighbor[] {
    if (!conceptId) return [];
    const key = conceptId.trim().toUpperCase();

    // 1) Kürasyon katmanı: elle doğrulanmış ilişkiler (öncelikli, küçük küme)
    const curated = curatedRepo.getNeighbors(key);

    // 2) Veri katmanı: aile/kök temelli türetilmiş ilişkiler
    const index = getIndex(this.lexemesPath);
    const data = dataNeighbors(index, key);

    const seen = new Set(curated.map((n) => n.targetConceptId));
    const merged = [...curated];
    for (const n of data) {
      if (seen.has(n.targetConceptId)) continue;
      seen.add(n.targetConceptId);
      merged.push(n);
    }
    return merged;
  }
}
