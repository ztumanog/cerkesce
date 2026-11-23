/**
 * FileBasedConceptGraphRepository testleri (Görev 1b).
 *
 * Gerçek lexemes.json (140MB) testte okunmaz; fs mock'u küçük fixture'larla değiştirilir
 * (bulk-route.test.ts deseni). mtime, fixture içeriğinden türetilir — modül önbelleği
 * fixture değişince kendini yeniler.
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import fs from 'fs';

const lex = (id: string, conceptId: string, wordFamilyId?: string, rootIds?: string[]) =>
  ({ id, conceptId, wordFamilyId: wordFamilyId || '', rootIds: rootIds || [] });

describe('FileBasedConceptGraphRepository', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  function installFixtures(files: Record<string, string>) {
    const realStat = fs.statSync.bind(fs);
    vi.spyOn(fs, 'readFileSync').mockImplementation(((p: any, ...rest: any[]) => {
      const key = String(p);
      if (key in files) return files[key];
      return realStat(p, ...rest);
    }) as any);
    // mtime = içerik hash'i: fixture değişirse önbellek tazelenir
    vi.spyOn(fs, 'statSync').mockImplementation(((p: any, ...rest: any[]) => {
      const key = String(p);
      if (key in files) return { mtimeMs: files[key].length + key.length };
      return realStat(p, ...rest);
    }) as any);
  }

  it('kürasyon katmanı: tohumlanmış ilişkiler veri olmasa da döner (WATER -> ICE)', async () => {
    installFixtures({ 'f1.json': JSON.stringify([]) });
    const { FileBasedConceptGraphRepository } = await import('../../../repository/FileBasedConceptGraphRepository');
    const repo = new FileBasedConceptGraphRepository('f1.json');
    const n = repo.getNeighbors('WATER');
    const ice = n.find((x) => x.targetConceptId === 'ICE');
    expect(ice).toBeDefined();
  });

  it('veri katmanı: ortak wordFamilyId paylaşan kavramlar komşudur', async () => {
    installFixtures({
      'f2.json': JSON.stringify([
        lex('L1', 'HORSE', 'WF-A'),
        lex('L2', 'HORSEMAN', 'WF-A'),
        lex('L3', 'SEA', 'WF-B'),
      ]),
    });
    const { FileBasedConceptGraphRepository } = await import('../../../repository/FileBasedConceptGraphRepository');
    const repo = new FileBasedConceptGraphRepository('f2.json');
    const n = repo.getNeighbors('HORSE');
    expect(n.some((x) => x.targetConceptId === 'HORSEMAN')).toBe(true);
    expect(n.some((x) => x.targetConceptId === 'SEA')).toBe(false);
  });

  it('veri katmanı: ortak kök de komşuluk üretir', async () => {
    installFixtures({
      'f3.json': JSON.stringify([
        lex('L1', 'KNIFE', '', ['R-K']),
        lex('L2', 'SWORD', '', ['R-K']),
      ]),
    });
    const { FileBasedConceptGraphRepository } = await import('../../../repository/FileBasedConceptGraphRepository');
    const repo = new FileBasedConceptGraphRepository('f3.json');
    const n = repo.getNeighbors('KNIFE');
    expect(n.some((x) => x.targetConceptId === 'SWORD')).toBe(true);
  });

  it('ortak aile, ortak kökten güçlü sinyaldir (sıralama)', async () => {
    installFixtures({
      'f4.json': JSON.stringify([
        lex('L1', 'HORSE', 'WF-A', ['R-X']),
        lex('L2', 'FAMILY_PEER', 'WF-A'),
        lex('L3', 'ROOT_PEER', '', ['R-X']),
      ]),
    });
    const { FileBasedConceptGraphRepository } = await import('../../../repository/FileBasedConceptGraphRepository');
    const repo = new FileBasedConceptGraphRepository('f4.json');
    const n = repo.getNeighbors('HORSE');
    const fi = n.findIndex((x) => x.targetConceptId === 'FAMILY_PEER');
    const ri = n.findIndex((x) => x.targetConceptId === 'ROOT_PEER');
    expect(fi).toBeGreaterThanOrEqual(0);
    expect(ri).toBeGreaterThanOrEqual(0);
    expect(fi).toBeLessThan(ri);
  });

  it('hub filtresi: 150+ kavramlı aile komşuluk üretmez', async () => {
    const big: any[] = [lex('L0', 'HUB_MEMBER_A', 'WF-HUGE'), lex('L1', 'HUB_MEMBER_B', 'WF-HUGE')];
    for (let i = 0; i < 160; i++) big.push(lex(`LF${i}`, `C${i}`, 'WF-HUGE'));
    installFixtures({ 'f5.json': JSON.stringify(big) });
    const { FileBasedConceptGraphRepository } = await import('../../../repository/FileBasedConceptGraphRepository');
    const repo = new FileBasedConceptGraphRepository('f5.json');
    const n = repo.getNeighbors('HUB_MEMBER_A');
    expect(n.some((x) => x.targetConceptId === 'HUB_MEMBER_B')).toBe(false);
  });

  it('bilinmeyen kavram ve boş girdi: boş döner (kürasyon dışı)', async () => {
    installFixtures({ 'f6.json': JSON.stringify([lex('L1', 'SEA', 'WF-B')]) });
    const { FileBasedConceptGraphRepository } = await import('../../../repository/FileBasedConceptGraphRepository');
    const repo = new FileBasedConceptGraphRepository('f6.json');
    expect(repo.getNeighbors('')).toEqual([]);
    expect(repo.getNeighbors('BILINMEYEN_KAVRAM_XXX')).toEqual([]);
  });

  it('büyük/küçük harf duyarsız: küçük harfli sorgu çalışır', async () => {
    installFixtures({
      'f7.json': JSON.stringify([
        lex('L1', 'HORSE', 'WF-A'),
        lex('L2', 'HORSEMAN', 'WF-A'),
      ]),
    });
    const { FileBasedConceptGraphRepository } = await import('../../../repository/FileBasedConceptGraphRepository');
    const repo = new FileBasedConceptGraphRepository('f7.json');
    expect(repo.getNeighbors('horse').some((x) => x.targetConceptId === 'HORSEMAN')).toBe(true);
  });
});
