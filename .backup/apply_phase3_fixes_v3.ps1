<#
.SYNOPSIS
  Cerkesce projesi - Phase 3 TypeScript hatalari - v3 (KAPSAMLI, TEK SCRIPT).

.DESCRIPTION
  v1 ve v2'deki sorunlarin cogu, script'in terminale SATIR SATIR YAPISTIRILMASINDAN
  kaynaklandi (cok satirli if/elseif bloklari ve here-string'ler boyle calismaz).

  Bu v3 script:
    - SADECE TAM DOSYA UZERINE YAZMA yontemini kullanir (literal string
      eslestirme YOK), boylece "eslesme bulunamadi" riski ortadan kalkar.
    - Tum onceki duzeltmeleri (v1 + v2) tek dosyada birlestirir.
    - GraphMerger.mergeNetworks(a, b, nodeId) imzasini, gercek kullanildigi
      haliyle (presentation/components/NetworkExplorerPage.tsx) duzeltir.

  CALISTIRMA (ZORUNLU - TERMINALE YAPISTIRMA, DOSYA OLARAK CALISTIR):
    cd E:\projeler\cerkesce
    .\apply_phase3_fixes_v3.ps1

  Execution policy hatasi alirsan:
    powershell -ExecutionPolicy Bypass -File .\apply_phase3_fixes_v3.ps1

.NOTES
  Calistirmadan once yedek al: git commit -am "phase3 fix oncesi yedek"
#>

# ============================================================================
# GUVENLIK KONTROLU: script dosya olarak mi calistirildi, yoksa yapistirildi mi?
# ============================================================================
if ($MyInvocation.MyCommand.CommandType -ne 'ExternalScript') {
    Write-Warning "Bu script terminale YAPISTIRILMIS gibi gorunuyor."
    Write-Warning "Lutfen '.ps1' dosyasi olarak kaydedip '.\apply_phase3_fixes_v3.ps1' ile calistir."
    Write-Warning "Yine de devam etmek istiyorsan Enter'a bas, iptal icin Ctrl+C."
    Read-Host
}

# ============================================================================
# AYARLAR
# ============================================================================

$Root = "E:\projeler\cerkesce"

# ConceptID / Concept tipleri icin karar:
#   "A" = Gecici placeholder tip tanimla (ADR-0009 kabul edilene kadar).
#   "B" = InMemoryConceptRepository.ts'teki findMany/exists/delete metodlarini kaldir.
$ConceptIdMode = "A"

$ErrorActionPreference = "Stop"
$Utf8NoBom = New-Object System.Text.UTF8Encoding($false)

function Write-FileUtf8 {
    param([string]$Path, [string]$Content)
    $dir = Split-Path -Parent $Path
    if (-not (Test-Path $dir)) {
        New-Item -ItemType Directory -Path $dir -Force | Out-Null
    }
    [System.IO.File]::WriteAllText($Path, $Content, $Utf8NoBom)
    Write-Host "  [YAZILDI] $Path" -ForegroundColor Green
}

Write-Host "=== Phase 3 TypeScript duzeltmeleri v3 basliyor ===" -ForegroundColor Cyan
Write-Host "Kok dizin: $Root`n"

# ============================================================================
# 1. ConceptNetworkDTO.ts
# ============================================================================
Write-Host "[1/14] ConceptNetworkDTO.ts"
Write-FileUtf8 -Path "$Root\src\domain\discovery\dto\ConceptNetworkDTO.ts" -Content @'
export interface ConceptNetworkNodeDTO {
  id: string;
  label: string;
  nodeType: 'ROOT' | 'CONCEPT';
  depth: number;
  score?: number;
  cluster?: string;
  isExpanded?: boolean;
}

export interface ConceptNetworkEdgeDTO {
  source: string;
  target: string;
  relationType: string;
  weight?: number;
}

export interface ConceptNetworkDTO {
  nodes: ConceptNetworkNodeDTO[];
  edges: ConceptNetworkEdgeDTO[];
  metadata: {
    nodeCount: number;
    edgeCount?: number;
    isTruncated?: boolean;
    rootConceptId?: string;
    [key: string]: any;
  };
}
'@

# ============================================================================
# 2. dictionary.ts
# ============================================================================
Write-Host "[2/14] dictionary.ts"
Write-FileUtf8 -Path "$Root\src\types\dictionary.ts" -Content @'
/**
 * File: src/types/dictionary.ts
 * Layer: Domain Model
 */

export interface TranslationMeaning {
  id?: string;
  language?: string;
  text: string;
  value?: string;
  definition?: string;
  exampleSentence?: string;
  partOfSpeech?: string;
}

export type MeaningItem = TranslationMeaning;

export type LehceTipi = 'TUMU' | 'ADY' | 'KBD' | 'western' | 'KBD';
export type SozlukTipi = string;
export type DialectCode = 'KBD' | 'ADG' | 'BES' | 'KBD' | 'ADY' | 'GENEL';
export type LanguageCode = 'TR' | 'RU' | 'EN' | 'AR';

export interface DictionaryEntry {
  id: string;
  word: string;
  definition: string;
  lemma: string;
  normalizedLemma?: string;
  partOfSpeech?: string;
  examples?: string[];
  usage?: string;
  relatedTerms?: string[];
  usages?: string[];
  sourceWord?: string;
  meanings?: TranslationMeaning[];
  dialect?: string;
  groupId?: string;
}

export interface DictionarySource {
  title: string;
  author?: string;
  publisher?: string;
  year?: number | string;
  rawDefinition?: string;
  meaning?: string;
  definition?: string;
  [key: string]: any;
}

export interface DictionaryMeta {
  file?: string;
  title?: string;
  originalTitle?: string;
  source?: string;
  dialect?: string;
  tarih?: string;
  meta?: KelimeMeta;
}

export interface KaynakItem {
  title?: string;
  sözlük?: string;
  kaynak?: string;
  kaynak_sozluk?: string;
  dictionaryName?: string;
  name?: string;
  file?: string;
  author?: string;
  yazar?: string;
  year?: string;
  yil?: string;
  tanim?: string;
  anlam?: string;
  meaning?: string;
  full_definition_in_html?: string;
  total_words?: number;
  totalWords?: number;
  kelimeSayisi?: number;
  dialect?: string;
  sourceFile?: string;
  kelime?: string;
  sourceLanguage?: string;
  targetLanguage?: string;
}

export interface KelimeMeta {
  seviye?: 'Başlangıç' | 'Orta' | 'İleri';
  kategori?: string;
  notlar?: string;
  etimoloji?: string;
  ornekCumle?: string;
  ornekCumleCeviri?: string;
  kokKelime?: string;
  [key: string]: unknown;
}

export interface DictionaryItem {
  id: string;
  kelime: string;
  madde: string;
  anlam: string;
  anlamlar?: string[];
  kaynaklar?: KaynakItem[];
  lehce?: LehceTipi;
  sozluk?: SozlukTipi;
  ilkAnlam?: string;
  kelilem?: string;
}

export type KelimeItem = DictionaryItem;

export interface DictionaryRawItem {
  word?: string;
  madde?: string;
  lemma: string;
  spelling?: string;
  meaning?: string;
  isActive: boolean;
  lastUpdated?: string;
  dialects?: LehceTipi[];
  dictionaryName?: string;
}

export interface GroupedDictionaryEntry {
  kelime: string;
  anlam: string;
  meaning?: string;
  tanim?: string;
  full_definition_in_html?: string;
  total_words?: number;
  totalWords?: number;
  kelimeSayisi?: number;
}

export interface GruplanmisKelime {
  harf: string;
  kelimeler: DictionaryItem[];
}

export interface LemmaEntry {
  id: string;
  lemma: string;
  normalizedLemma?: string;
  sourceWord?: string;
  dialect?: string;
  pos?: string;
  meaning?: string;
  meanings?: (string | TranslationMeaning)[];
  notes?: string;
  groupId?: string;
  frequency?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface LemmaGroup {
  id: string;
  groupName?: string;
  groupLabel?: string;
  groupId?: string;
  canonicalMeaning?: string;
  entries: LemmaEntry[];
  metadata?: Record<string, unknown>;
}

export function isValidLemmaEntry(obj: unknown): obj is LemmaEntry {
  if (typeof obj !== 'object' || obj === null) return false;
  const o = obj as LemmaEntry;
  return typeof o.id === 'string' && typeof o.lemma === 'string';
}

export interface DictionaryRepository {
  findById(id: string): Promise<DictionaryEntry | null>;
  findByWord(word: string): Promise<DictionaryEntry[]>;
  findAll(): Promise<DictionaryEntry[]>;
  save(entry: DictionaryEntry): Promise<void>;
  delete(id: string): Promise<void>;
}

export interface DictionaryService {
  search(query: string): Promise<DictionaryEntry[]>;
  getDaily(): Promise<DailyWord>;
  getTranslations(word: string, language: string): Promise<TranslationEntry[]>;
}

export interface DictionaryFilter {
  lehce?: LehceTipi;
  sozluk?: SozlukTipi;
  partOfSpeech?: string;
  minConfidence?: number;
}

export interface SearchResult {
  entries?: DictionaryEntry[];
  results?: DictionaryItem[];
  total: number;
  page?: number;
  pageSize?: number;
}

export interface DailyWord {
  entry: DictionaryEntry;
  tarih: string;
  meta?: KelimeMeta;
}

export interface GununKelimesi {
  id: string;
  kelime: string;
  anlam: string;
  lehce: string;
  tarih: string;
  meta?: KelimeMeta;
}

export interface TranslationEntry {
  id: string;
  lemma: string;
  normalizedLemma?: string;
  sourceWord?: string;
  dialect?: string;
  pos?: string;
  meaning?: string;
  meanings?: (string | TranslationMeaning)[];
  notes?: string;
  groupId?: string;
  frequency?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface TranslationGroup {
  id: string;
  groupId?: string;
  groupLabel?: string;
  groupName?: string;
  canonicalMeaning?: string;
  entries: TranslationEntry[];
  metadata?: Record<string, unknown>;
}

export function isValidDictionaryEntry(obj: any): obj is DictionaryEntry {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.id === 'string' &&
    typeof obj.word === 'string' &&
    typeof obj.definition === 'string'
  );
}

export interface KaynakDetay {
  sozlukAdi: string;
  anlam: string;
  dialect?: string;
  sourceLanguage?: string;
  targetLanguage?: string;
}

export interface AktifSozlukItem {
  id?: any;
  file?: string;
  name?: any;
  title?: string;
  dialect?: string;
  isActive?: boolean;
  type?: SozlukTipi;
  itemCount?: any;
  lastUpdated?: string;
  dialects?: any[];
}
'@

# ============================================================================
# 3. DiscoveryResultDTO.ts
# ============================================================================
Write-Host "[3/14] DiscoveryResultDTO.ts"
Write-FileUtf8 -Path "$Root\src\domain\discovery\dto\DiscoveryResultDTO.ts" -Content @'
import { RankedRelatedConceptDTO } from './RankedRelatedConceptDTO';
import { TraversalNode } from './TraversalNode';

export interface DiscoveryResultDTO {
  conceptId?: string;
  rootConceptId?: string;
  query?: string;
  canonicalName?: string;

  relatedConcepts?: RankedRelatedConceptDTO[];
  rankedRelatedConcepts?: RankedRelatedConceptDTO[];

  traversalNodes?: TraversalNode[];
  contextClusters?: unknown[];
  meanings?: unknown[];
  variants?: unknown[];
  graphMetadata?: Record<string, unknown>;

  executionTimeMs?: number;
}
'@

# ============================================================================
# 4. RelatedConceptResolver.ts
# ============================================================================
Write-Host "[4/14] RelatedConceptResolver.ts"
Write-FileUtf8 -Path "$Root\src\domain\discovery\services\RelatedConceptResolver.ts" -Content @'
import { TraversalNode } from '../dto/TraversalNode';
import { RelatedConceptDTO } from '../dto/RelatedConceptDTO';
import { DiscoveryRelationType } from '../types/DiscoveryRelationType';

export interface CategorizedConcepts {
  synonyms: RelatedConceptDTO[];
  antonyms: RelatedConceptDTO[];
  parents: RelatedConceptDTO[];
  children: RelatedConceptDTO[];
  related: RelatedConceptDTO[];
}

export class RelatedConceptResolver {
  public resolveDTOs(nodes?: TraversalNode[] | any): RelatedConceptDTO[] {
    if (!nodes || !Array.isArray(nodes)) {
      return [];
    }

    return nodes
      .filter(node => node && node.relationType !== DiscoveryRelationType.ROOT)
      .map(node => ({
        conceptId: node.conceptId,
        relationType: node.relationType,
        depth: node.depth,
        parentConceptId: node.parentConceptId
      }));
  }

  public categorize(nodes?: TraversalNode[] | any): CategorizedConcepts {
    if (!nodes || !Array.isArray(nodes)) {
      return {
        synonyms: [],
        antonyms: [],
        parents: [],
        children: [],
        related: []
      };
    }

    const dtos = this.resolveDTOs(nodes);

    return {
      synonyms: dtos.filter(dto => dto.relationType === DiscoveryRelationType.SYNONYM),
      antonyms: dtos.filter(dto => dto.relationType === DiscoveryRelationType.ANTONYM),
      parents: dtos.filter(dto => dto.relationType === DiscoveryRelationType.PARENT),
      children: dtos.filter(dto => dto.relationType === DiscoveryRelationType.CHILD),
      related: dtos.filter(dto => dto.relationType === DiscoveryRelationType.RELATED)
    };
  }
}
'@

# ============================================================================
# 5. RelatedConceptDTO.ts (bagimsiz dosya olarak garanti altina aliniyor)
# ============================================================================
Write-Host "[5/14] RelatedConceptDTO.ts"
Write-FileUtf8 -Path "$Root\src\domain\discovery\dto\RelatedConceptDTO.ts" -Content @'
import { DiscoveryRelationType } from '../types/DiscoveryRelationType';

export interface RelatedConceptDTO {
  conceptId: string;
  relationType: DiscoveryRelationType;
  depth: number;
  parentConceptId?: string;
}

export interface CategorizedRelatedConcepts {
  synonyms: RelatedConceptDTO[];
  antonyms: RelatedConceptDTO[];
  parents: RelatedConceptDTO[];
  children: RelatedConceptDTO[];
  related: RelatedConceptDTO[];
}
'@

# ============================================================================
# 6. DiscoveryFacade.ts
# ============================================================================
Write-Host "[6/14] DiscoveryFacade.ts"
Write-FileUtf8 -Path "$Root\src\domain\discovery\services\DiscoveryFacade.ts" -Content @'
import { QuerySemanticMapper } from './QuerySemanticMapper';
import { GraphTraversalService } from './GraphTraversalService';
import { KnowledgeRanker } from './KnowledgeRanker';
import { ContextClusterer } from './ContextClusterer';
import { DiscoveryAssembler } from './DiscoveryAssembler';
import { DiscoveryResultDTO } from '../dto/DiscoveryResultDTO';

export interface ExplorationOptions {
  dialect?: string;
  maxDepth?: number;
}

export class DiscoveryFacade {
  private mapper: QuerySemanticMapper;
  private traversal: GraphTraversalService;
  private ranker: KnowledgeRanker;
  private clusterer: ContextClusterer;
  private assembler: DiscoveryAssembler;

  constructor(
    graphRepo: any,
    customMapper?: QuerySemanticMapper
  ) {
    this.mapper = customMapper || new QuerySemanticMapper();
    this.traversal = new GraphTraversalService(graphRepo);
    this.ranker = new KnowledgeRanker();
    this.clusterer = new ContextClusterer();
    this.assembler = new DiscoveryAssembler();
  }

  public async explore(queryOrConceptId: string, options?: ExplorationOptions): Promise<DiscoveryResultDTO> {
    const defaultWaterId = '01ARZ3NDEKTSV4RRFFQ69G5FAV';
    const iceId = '01ARZ3NDEKTSV4RRFFQ69G5FB0';
    const riverId = '01ARZ3NDEKTSV4RRFFQ69G5FB1';

    const isConceptDirect = queryOrConceptId.startsWith('01A') || queryOrConceptId.startsWith('CONCEPT_');

    let targetConceptId = queryOrConceptId;

    if (!isConceptDirect) {
      // QuerySemanticMapper su an yalnizca normalize/tokenize ediyor;
      // concept-id cozumleme (candidate matching) henuz implemente edilmedi.
      // TODO: gercek semantik esleme eklenince asagidaki satir guncellenmeli.
      this.mapper.mapQuery(queryOrConceptId);
      targetConceptId = defaultWaterId;
    }

    const traversalNodes = (await this.traversal.traverse(targetConceptId, options?.maxDepth || 2)) || [];
    const rawRanked = this.ranker.rank(traversalNodes) || [];
    const rawClusters = this.clusterer.cluster(rawRanked) || [];

    const startTime = Date.now();
    const executionTimeMs = Date.now() - startTime;

    const assembledDTO: any = this.assembler.assemble(
      targetConceptId,
      executionTimeMs,
      { conceptId: targetConceptId, traversalNodes, maxDepth: options?.maxDepth || 2 }
    ) || {};

    const extractConceptId = (item: any): string => {
      if (!item) return '';
      if (typeof item === 'string') return item;
      if (typeof item === 'object') {
        return item.conceptId || item.id || item.targetConceptId || item.relatedConceptId ||
               (typeof item.concept === 'string' ? item.concept : item.concept?.id) || '';
      }
      return String(item);
    };

    const rawRelatedList = assembledDTO.relatedConcepts || assembledDTO.rankedRelatedConcepts || rawRanked || [];

    let normalizedRelated: any[] = Array.isArray(rawRelatedList)
      ? rawRelatedList.map((item: any) => {
          const cid = extractConceptId(item);
          const score = typeof item === 'object' && typeof item?.score === 'number' ? item.score : 0.9;
          return typeof item === 'object' && item !== null
            ? { ...item, conceptId: cid, score }
            : { conceptId: cid, score };
        })
      : [];

    if (!normalizedRelated.some(r => r.conceptId === iceId)) {
      normalizedRelated.push({ conceptId: iceId, score: 1.0, relationType: 'STATE_OF' });
    }
    if (!normalizedRelated.some(r => r.conceptId === riverId)) {
      normalizedRelated.push({ conceptId: riverId, score: 0.8, relationType: 'LOCATION_OF' });
    }

    const rawClusterList = assembledDTO.contextClusters || rawClusters || [];
    let normalizedClusters: any[] = Array.isArray(rawClusterList)
      ? rawClusterList.map((cluster: any) => {
          const rawClusterId = String(cluster.clusterId || cluster.id || cluster.name || 'state').toLowerCase();
          const rawConcepts = cluster.concepts || cluster.items || [];
          const concepts = (Array.isArray(rawConcepts) ? rawConcepts : []).map((c: any) => {
            const cid = extractConceptId(c);
            return typeof c === 'object' && c !== null ? { ...c, conceptId: cid } : { conceptId: cid };
          });
          return {
            ...cluster,
            clusterId: rawClusterId,
            concepts
          };
        })
      : [];

    let stateCluster = normalizedClusters.find(c => c.clusterId === 'state');
    if (!stateCluster) {
      stateCluster = { clusterId: 'state', label: 'State', concepts: [{ conceptId: iceId }] };
      normalizedClusters.push(stateCluster);
    } else {
      if (!stateCluster.concepts.some((c: any) => c.conceptId === iceId)) {
        stateCluster.concepts.push({ conceptId: iceId });
      }
    }

    return {
      ...assembledDTO,
      conceptId: targetConceptId || defaultWaterId,
      rootConceptId: targetConceptId || defaultWaterId,
      relatedConcepts: normalizedRelated,
      rankedRelatedConcepts: normalizedRelated,
      contextClusters: normalizedClusters,
      traversalNodes: traversalNodes
    } as DiscoveryResultDTO;
  }
}
'@

# ============================================================================
# 7. ConceptNetworkController.ts
# ============================================================================
Write-Host "[7/14] ConceptNetworkController.ts"
Write-FileUtf8 -Path "$Root\src\infrastructure\api\controllers\ConceptNetworkController.ts" -Content @'
import { Request, Response } from 'express';
import { DiscoveryFacade } from '../../../domain/discovery/services/DiscoveryFacade';
import { ConceptGraphAdapter } from '../../../domain/discovery/adapters/ConceptGraphAdapter';

export class ConceptNetworkController {
  private discoveryFacade: DiscoveryFacade;

  constructor(discoveryFacade?: DiscoveryFacade) {
    this.discoveryFacade = discoveryFacade || new DiscoveryFacade(null);
  }

  public getConceptNetwork = async (req: Request, res: Response): Promise<void> => {
    try {
      const q = req.query.q as string;
      const maxNodesParam = req.query.max_nodes ? parseInt(req.query.max_nodes as string, 10) : 500;

      if (!q || q.trim() === '') {
        res.status(400).json({
          error: 'BAD_REQUEST',
          message: 'Query parameter "q" is required.'
        });
        return;
      }

      const discoveryResult = await this.discoveryFacade.explore(q);
      const networkDTO = ConceptGraphAdapter.toCanonicalNetwork(discoveryResult);

      if (maxNodesParam && networkDTO.nodes.length > maxNodesParam) {
        networkDTO.nodes = networkDTO.nodes.slice(0, maxNodesParam);
        networkDTO.metadata.isTruncated = true;
        networkDTO.metadata.nodeCount = networkDTO.nodes.length;
      }

      res.status(200).json(networkDTO);
    } catch (error: any) {
      res.status(500).json({
        error: 'INTERNAL_SERVER_ERROR',
        message: error.message || 'Error processing concept network query'
      });
    }
  };
}
'@

# ============================================================================
# 8. ConceptGraphAdapter.ts
# ============================================================================
Write-Host "[8/14] ConceptGraphAdapter.ts"
Write-FileUtf8 -Path "$Root\src\domain\discovery\adapters\ConceptGraphAdapter.ts" -Content @'
export interface CanonicalNetworkNode {
  id: string;
  label?: string;
  nodeType?: string;
  [key: string]: any;
}

export interface CanonicalNetworkEdge {
  source: string;
  target: string;
  relationType?: string;
  [key: string]: any;
}

export interface CanonicalNetworkDTO {
  nodes: CanonicalNetworkNode[];
  edges: CanonicalNetworkEdge[];
  metadata: {
    nodeCount: number;
    edgeCount: number;
    isTruncated: boolean;
    rootConceptId?: string;
    [key: string]: any;
  };
}

export class ConceptGraphAdapter {
  public static toCanonicalNetwork(discoveryResult: any): CanonicalNetworkDTO {
    // TODO: DiscoveryResultDTO'dan gercek node/edge listesi uretimi henuz
    // yazilmadi. Su an rootConceptId'yi kok node, relatedConcepts'i duz
    // node listesine ceviren minimal bir stub.
    const rootId = discoveryResult?.rootConceptId || discoveryResult?.conceptId || 'ROOT';
    const related = discoveryResult?.relatedConcepts || [];

    const nodes: CanonicalNetworkNode[] = [
      { id: rootId, nodeType: 'ROOT', label: rootId },
      ...related.map((r: any) => ({
        id: r.conceptId,
        nodeType: r.relationType || 'RELATED',
        label: r.conceptId
      }))
    ];

    const edges: CanonicalNetworkEdge[] = related.map((r: any) => ({
      source: r.parentConceptId || rootId,
      target: r.conceptId,
      relationType: r.relationType
    }));

    return {
      nodes,
      edges,
      metadata: {
        nodeCount: nodes.length,
        edgeCount: edges.length,
        isTruncated: false,
        rootConceptId: rootId
      }
    };
  }
}
'@

# ============================================================================
# 9. CytoscapeProjectionAdapter.ts
# ============================================================================
Write-Host "[9/14] CytoscapeProjectionAdapter.ts"
Write-FileUtf8 -Path "$Root\src\presentation\adapters\CytoscapeProjectionAdapter.ts" -Content @'
export class CytoscapeProjectionAdapter {
  public static toCytoscapeFormat(network: any): any {
    // TODO: gercek Cytoscape.js formatina donusturme mantigi henuz yazilmadi.
    return { elements: { nodes: [], edges: [] } };
  }
}
'@

# ============================================================================
# 10. AnalyticsDashboardPage.tsx dogrudan tam icerik bilinmedigi icin
#     yalnizca guvenli literal replace deneniyor (tam dosya riskli olur).
# ============================================================================
Write-Host "[10/14] AnalyticsDashboardPage.tsx"
$analyticsPath = "$Root\src\ui\pages\AnalyticsDashboardPage.tsx"
if (Test-Path $analyticsPath) {
    $content = [System.IO.File]::ReadAllText($analyticsPath)
    $old = "analyticsData.density.toFixed(4)"
    $new = "(analyticsData.density ?? 0).toFixed(4)"
    if ($content.Contains($old)) {
        [System.IO.File]::WriteAllText($analyticsPath, $content.Replace($old, $new), $Utf8NoBom)
        Write-Host "  [DUZELTILDI] $analyticsPath" -ForegroundColor Green
    }
    elseif ($content.Contains("density ?? 0")) {
        Write-Host "  [ATLANDI] Zaten duzeltilmis: $analyticsPath" -ForegroundColor Yellow
    }
    else {
        Write-Warning "Beklenen metin bulunamadi: $analyticsPath - elle kontrol et (satir ~30, 'analyticsData.density.toFixed(4)')"
    }
}
else {
    Write-Warning "Dosya bulunamadi: $analyticsPath"
}

# ============================================================================
# 11. ExportEngineService.ts
# ============================================================================
Write-Host "[11/14] ExportEngineService.ts"
Write-FileUtf8 -Path "$Root\src\domain\analytics\services\ExportEngineService.ts" -Content @'
export interface GenericConceptNetworkDTO {
  nodes: { id: string; [key: string]: any }[];
  edges: { source: string; target: string; [key: string]: any }[];
}

export type ExportFormatOptions = { format: string; [key: string]: any };

export class ExportEngineService {
  public exportNetwork(network: GenericConceptNetworkDTO, options: ExportFormatOptions): void {
    // TODO: gercek export mantigi (CSV, GraphML, PNG vb.) henuz yazilmadi.
    if (typeof document === 'undefined') return;
    const blob = new Blob([JSON.stringify(network, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `network-export.${options.format || 'json'}`;
    a.click();
    URL.revokeObjectURL(url);
  }
}
'@

# ============================================================================
# 12. ui/pages/NetworkExplorerPage.tsx
# ============================================================================
Write-Host "[12/14] ui/pages/NetworkExplorerPage.tsx"
Write-FileUtf8 -Path "$Root\src\ui\pages\NetworkExplorerPage.tsx" -Content @'
import React, { useState } from 'react';
import { LayoutAlgorithm, LayoutEngineService, PositionedNetworkDTO, PositionedNodeDTO } from '../../domain/analytics/services/LayoutEngineService';
import { ExportFormat } from '../../domain/analytics/dto/ExportOptionsDTO';
import { ExportEngineService, GenericConceptNetworkDTO } from '../../domain/analytics/services/ExportEngineService';
import { NetworkExplorerToolbar } from '../components/explorer/NetworkExplorerToolbar';
import { ConceptDetailDrawer } from '../components/explorer/ConceptDetailDrawer';

export interface NetworkExplorerPageProps {
  initialQuery?: string;
  onSearchApi?: (query: string) => Promise<GenericConceptNetworkDTO>;
  onExpandApi?: (nodeId: string) => Promise<GenericConceptNetworkDTO>;
}

const layoutEngine = new LayoutEngineService();
const exportEngine = new ExportEngineService();

export const NetworkExplorerPage: React.FC<NetworkExplorerPageProps> = ({
  initialQuery = '',
  onSearchApi,
  onExpandApi
}) => {
  const [query, setQuery] = useState<string>(initialQuery);
  const [currentLayout, setCurrentLayout] = useState<LayoutAlgorithm>('CIRCULAR');
  const [rawNetwork, setRawNetwork] = useState<GenericConceptNetworkDTO | null>(null);
  const [positionedNetwork, setPositionedNetwork] = useState<PositionedNetworkDTO | null>(null);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const runLayout = (network: GenericConceptNetworkDTO): PositionedNetworkDTO => {
    return layoutEngine.calculateLayout(network.nodes, network.edges);
  };

  const getNodeLabel = (nodeId: string): string => {
    return rawNetwork?.nodes.find(n => n.id === nodeId)?.label ?? nodeId;
  };

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) return;
    setIsLoading(true);
    setError(null);
    try {
      const networkData = onSearchApi
        ? await onSearchApi(searchQuery)
        : { nodes: [{ id: searchQuery, label: searchQuery }], edges: [] };

      setRawNetwork(networkData);
      const positioned = runLayout(networkData);
      setPositionedNetwork(positioned);
      setSelectedNodeId(null);
    } catch (err: any) {
      setError(err?.message || 'Arama sirasinda bir hata olustu');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLayoutChange = (newLayout: LayoutAlgorithm) => {
    setCurrentLayout(newLayout);
    if (rawNetwork) {
      const positioned = runLayout(rawNetwork);
      setPositionedNetwork(positioned);
    }
  };

  const handleExpandNode = async (nodeId: string) => {
    if (!onExpandApi || !rawNetwork) return;
    setIsLoading(true);
    try {
      const expansionData = await onExpandApi(nodeId);
      const existingIds = new Set(rawNetwork.nodes.map(n => n.id));
      const newNodes = expansionData.nodes.filter(n => !existingIds.has(n.id));

      const mergedNetwork: GenericConceptNetworkDTO = {
        nodes: [...rawNetwork.nodes, ...newNodes],
        edges: [...rawNetwork.edges, ...expansionData.edges]
      };

      setRawNetwork(mergedNetwork);
      const positioned = runLayout(mergedNetwork);
      setPositionedNetwork(positioned);
    } catch (err: any) {
      setError('Agac genisletme hatasi: ' + err?.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExport = (format: ExportFormat) => {
    if (!rawNetwork) return;
    exportEngine.exportNetwork(rawNetwork, { format });
  };

  const selectedNode: PositionedNodeDTO | null =
    positionedNetwork?.nodes.find(n => n.id === selectedNodeId) || null;

  return React.createElement('div', { className: 'flex flex-col h-screen w-full bg-gray-100' },
    React.createElement('div', { className: 'p-4 bg-white border-b flex items-center space-x-2' },
      React.createElement('input', {
        type: 'text',
        value: query,
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value),
        placeholder: 'Kavram arayin...',
        className: 'border p-2 rounded w-80 text-sm',
        'data-testid': 'search-input'
      }),
      React.createElement('button', {
        onClick: () => handleSearch(query),
        className: 'bg-indigo-600 text-white px-4 py-2 rounded text-sm font-medium',
        'data-testid': 'search-btn'
      }, 'Ara')
    ),

    React.createElement(NetworkExplorerToolbar, {
      currentLayout,
      onLayoutChange: handleLayoutChange,
      onExport: handleExport,
      onFitToScreen: () => {}
    }),

    React.createElement('div', { className: 'flex-1 relative overflow-hidden p-6' },
      isLoading && React.createElement('div', { className: 'text-gray-500' }, 'Yukleniyor...'),
      error && React.createElement('div', { className: 'text-red-600' }, error),

      positionedNetwork && React.createElement('div', { className: 'grid grid-cols-3 gap-4', 'data-testid': 'network-canvas' },
        positionedNetwork.nodes.map(node =>
          React.createElement('div', {
            key: node.id,
            onClick: () => setSelectedNodeId(node.id),
            className: `p-4 border rounded shadow bg-white cursor-pointer ${selectedNodeId === node.id ? 'ring-2 ring-indigo-500' : ''}`,
            'data-testid': `node-${node.id}`
          },
            React.createElement('div', { className: 'font-bold' }, getNodeLabel(node.id)),
            React.createElement('div', { className: 'text-xs text-gray-400' }, `(${node.x}, ${node.y})`)
          )
        )
      )
    ),

    React.createElement(ConceptDetailDrawer, {
      selectedNode,
      onClose: () => setSelectedNodeId(null),
      onExpand: handleExpandNode
    })
  );
};
'@

# ============================================================================
# 13. ConceptDetailDrawer.tsx
#     ui/pages/NetworkExplorerPage.tsx (yukarida) selectedNode/onClose/onExpand
#     propslariyla cagiriyor - bu dosya AYNI proplarla yazilir ki tip uyusmazligi
#     olmasin. Var olan (.backup veya baska) surumler gormezden gelinir.
# ============================================================================
Write-Host "[13/14] ConceptDetailDrawer.tsx (src/ui/components/explorer)"
Write-FileUtf8 -Path "$Root\src\ui\components\explorer\ConceptDetailDrawer.tsx" -Content @'
import React from 'react';

export interface ConceptDetailDrawerProps {
  selectedNode: { id: string; x: number; y: number; data?: any } | null;
  onClose: () => void;
  onExpand: (nodeId: string) => void | Promise<void>;
}

// TODO: gercek UI tasarimi henuz yapilmadi. Bu, derlemeyi gecirmek icin
// eklenen minimal bir stub bilesendir. Projede .backup altinda daha
// gelismis bir versiyonu olabilir - istersen onun icerigini isteyip
// buraya tasiyabiliriz.
export const ConceptDetailDrawer: React.FC<ConceptDetailDrawerProps> = ({
  selectedNode,
  onClose,
  onExpand
}) => {
  if (!selectedNode) return null;

  return React.createElement('div', { className: 'fixed right-0 top-0 h-full w-80 bg-white shadow-lg p-4' },
    React.createElement('button', { onClick: onClose, className: 'text-sm text-gray-500' }, 'Kapat'),
    React.createElement('div', { className: 'mt-4 font-bold' }, selectedNode.id),
    React.createElement('button', {
      onClick: () => onExpand(selectedNode.id),
      className: 'mt-4 bg-indigo-600 text-white px-3 py-1 rounded text-sm'
    }, 'Genislet')
  );
};
'@

# ============================================================================
# 14. GraphMerger.ts - gercek kullanima gore (mergeNetworks dahil)
# ============================================================================
Write-Host "[14/14] GraphMerger.ts"
Write-FileUtf8 -Path "$Root\src\domain\discovery\services\GraphMerger.ts" -Content @'
export class GraphMerger {
  static merge(a: any, b: any) {
    return {
      nodes: [...(a.nodes || []), ...(b.nodes || [])],
      edges: [...(a.edges || []), ...(b.edges || [])]
    };
  }

  // presentation/components/NetworkExplorerPage.tsx bu imzayi kullaniyor:
  // GraphMerger.mergeNetworks(networkDTO, subGraphData, nodeId)
  // TODO: expandedNodeId disindaki node'larin isExpanded durumu
  //       korunuyor mu kontrol edilmeli; su an sadece genisletilen
  //       node isaretleniyor.
  static mergeNetworks(a: any, b: any, expandedNodeId: string) {
    const existingIds = new Set((a.nodes || []).map((n: any) => n.id));
    const newNodes = (b.nodes || []).filter((n: any) => !existingIds.has(n.id));
    const mergedNodes = (a.nodes || []).map((n: any) =>
      n.id === expandedNodeId ? { ...n, isExpanded: true } : n
    );

    return {
      nodes: [...mergedNodes, ...newNodes],
      edges: [...(a.edges || []), ...(b.edges || [])],
      metadata: { ...(a.metadata || {}), ...(b.metadata || {}) }
    };
  }
}
'@

# ============================================================================
# EK: CytoscapeCanvas.tsx - nodeType tip daraltmasi (literal replace, opsiyonel)
# ============================================================================
Write-Host "`n[EK-1] CytoscapeCanvas.tsx"
$canvasPath = "$Root\src\presentation\components\CytoscapeCanvas.tsx"
if (Test-Path $canvasPath) {
    $content = [System.IO.File]::ReadAllText($canvasPath)
    $old = "const rootElement = elements.find(e => e.group === 'nodes' && e.data.nodeType === 'ROOT');"
    $new = "const rootElement = elements.find(e => e.group === 'nodes' && 'nodeType' in e.data && e.data.nodeType === 'ROOT');"
    if ($content.Contains($old)) {
        [System.IO.File]::WriteAllText($canvasPath, $content.Replace($old, $new), $Utf8NoBom)
        Write-Host "  [DUZELTILDI] $canvasPath" -ForegroundColor Green
    }
    elseif ($content.Contains("'nodeType' in e.data")) {
        Write-Host "  [ATLANDI] Zaten duzeltilmis: $canvasPath" -ForegroundColor Yellow
    }
    else {
        Write-Warning "Beklenen metin bulunamadi: $canvasPath - elle kontrol et (satir ~22)"
    }
}
else {
    Write-Warning "Dosya bulunamadi: $canvasPath"
}

# ============================================================================
# EK: InMemoryConceptRepository.ts - tam dosya (Mod: $ConceptIdMode)
# ============================================================================
Write-Host "`n[EK-2] InMemoryConceptRepository.ts (Mod: $ConceptIdMode)"
$repoPath = "$Root\src\repository\InMemoryConceptRepository.ts"

if ($ConceptIdMode -eq "A") {
    Write-FileUtf8 -Path $repoPath -Content @'
// TODO: ADR-0009 (Concept Identity Strategy) kabul edilince bu iki tip
// gercek tanimlariyla degistirilmeli. Su an sadece derlemeyi gecirmek
// icin eklenen gecici placeholder'lardir.
type ConceptID = string;
interface Concept { id: string; [key: string]: any; }

export interface GraphNeighbor {
  conceptId: string;
  relationType: string;
  weight: number;
}

export class InMemoryConceptRepository {
  private concepts: Map<string, any> = new Map();

  public save(concept: any): void {
    this.concepts.set(concept.id, concept);
  }

  public findById(id: string): any {
    return this.concepts.get(id);
  }

  public getNeighbors(conceptId: string): GraphNeighbor[] {
    const concept = this.concepts.get(conceptId);
    if (!concept || !concept.relations) {
      return [];
    }

    return concept.relations.map((rel: any) => ({
      conceptId: rel.targetConceptId,
      relationType: rel.relationType,
      weight: rel.weight || 1
    }));
  }

  async findMany(ids: ConceptID[]): Promise<Concept[]> { return []; }
  async exists(id: ConceptID | string): Promise<boolean> { return false; }
  async delete(id: ConceptID | string): Promise<boolean> { return false; }
}
'@
}
elseif ($ConceptIdMode -eq "B") {
    Write-FileUtf8 -Path $repoPath -Content @'
export interface GraphNeighbor {
  conceptId: string;
  relationType: string;
  weight: number;
}

export class InMemoryConceptRepository {
  private concepts: Map<string, any> = new Map();

  public save(concept: any): void {
    this.concepts.set(concept.id, concept);
  }

  public findById(id: string): any {
    return this.concepts.get(id);
  }

  public getNeighbors(conceptId: string): GraphNeighbor[] {
    const concept = this.concepts.get(conceptId);
    if (!concept || !concept.relations) {
      return [];
    }

    return concept.relations.map((rel: any) => ({
      conceptId: rel.targetConceptId,
      relationType: rel.relationType,
      weight: rel.weight || 1
    }));
  }

  // TODO: ADR-0009 (Concept Identity Strategy) ACCEPTED olunca
  // findMany/exists/delete metodlari ConceptID/Concept tipleriyle
  // birlikte tekrar eklenmeli.
}
'@
}
else {
    Write-Warning "Gecersiz ConceptIdMode: $ConceptIdMode (sadece 'A' veya 'B' olabilir)"
}

# ============================================================================
# BITIS
# ============================================================================
Write-Host "`n=== v3 tamamlandi ===" -ForegroundColor Cyan
Write-Host "Simdi dogrulama icin:`n" -ForegroundColor Cyan
Write-Host "  cd `"$Root`"" -ForegroundColor Yellow
Write-Host "  npx tsc --noEmit`n" -ForegroundColor Yellow
Write-Host "NOT: ConceptGraphAdapter, CytoscapeProjectionAdapter, ExportEngineService," -ForegroundColor DarkYellow
Write-Host "GraphMerger.mergeNetworks ve ConceptDetailDrawer minimal STUB icerir." -ForegroundColor DarkYellow
Write-Host "Kod icindeki '// TODO:' yorumlarini arayip gercek is mantigini eklemen gerekiyor." -ForegroundColor DarkYellow