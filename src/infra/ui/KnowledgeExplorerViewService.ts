import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

import { PhaseStatusValidator } from '../governance/PhaseStatusValidator';
import { AdrValidator } from '../governance/AdrValidator';
import { HistoricalReasoningService } from '../knowledge/HistoricalReasoningService';
import { TraceabilityMatrixService } from '../knowledge/TraceabilityMatrixService';
import { ExecutiveMemoryService } from '../knowledge/ExecutiveMemoryService';
import { ExecutiveLearningService } from '../knowledge/ExecutiveLearningService';
import { AdrSearchService } from '../knowledge/AdrSearchService';

export interface KnowledgeWidget {
  id: string;
  title: string;
  value: string;
  status: 'ok' | 'warning' | 'critical';
  details: string;
}

export interface KnowledgeExplorerView {
  timestamp: string;
  widgets: KnowledgeWidget[];
  overallStatus: 'ok' | 'warning' | 'critical';
  summary: string;
}

export class KnowledgeExplorerViewService {
  private static seeded = false;

  static getView(): KnowledgeExplorerView {
    this.ensureTrackCSeeded();

    const phaseResult = PhaseStatusValidator.validate();
    const adrResult = AdrValidator.validate();
    const historical = HistoricalReasoningService.analyze();
    const traceability = TraceabilityMatrixService.getReport();
    const memory = ExecutiveMemoryService.getReport();
    const learning = ExecutiveLearningService.getDashboard();
    const adrSearch = AdrSearchService.getReport();

    const phaseCount = phaseResult.phases.length;
    const adrCount = adrResult.totalIndexed;
    const inconsistencyCount = phaseResult.inconsistencies.length;

    const widgets: KnowledgeWidget[] = [
      {
        id: 'phase',
        title: 'Phase Nodes',
        value: `${phaseCount}`,
        status: phaseResult.status === 'ok' ? 'ok'
              : phaseResult.status === 'warning' ? 'warning' : 'critical',
        details: `${inconsistencyCount} tutarsizlik`,
      },
      {
        id: 'adr',
        title: 'ADR Nodes',
        value: `${adrCount}`,
        status: adrResult.status === 'ok' ? 'ok'
              : adrResult.status === 'warning' ? 'warning' : 'critical',
        details: `${adrResult.missing.length} eksik, ${adrResult.orphaned.length} yetim`,
      },
      {
        id: 'historical',
        title: 'Historical Reasoning',
        value: `${historical.totalEvents}`,
        status: historical.status,
        details: `${historical.insights?.length ?? 0} pattern`,
      },
      {
        id: 'traceability',
        title: 'Traceability Matrix',
        value: `${traceability.coveragePercent}%`,
        status: traceability.status,
        details: `${traceability.totalTests} test`,
      },
      {
        id: 'memory',
        title: 'Executive Memory',
        value: `${memory.totalEntries}`,
        status: memory.status,
        details: `${Object.keys(memory.byType ?? {}).length} kategori`,
      },
      {
        id: 'learning',
        title: 'Executive Learning',
        value: `${learning.insights?.length ?? 0}`,
        status: learning.status === 'ok' ? 'ok' : 'warning',
        details: `${learning.summary ?? ''}`.substring(0, 30),
      },
      {
        id: 'adrSearch',
        title: 'ADR Search',
        value: `${adrSearch.totalAdrs}`,
        status: adrSearch.status,
        details: `${adrSearch.lastResults?.length ?? 0} son sonuc`,
      },
    ];

    const statuses = widgets.map(w => w.status);
    const overallStatus = statuses.includes('critical') ? 'critical'
      : statuses.includes('warning') ? 'warning' : 'ok';

    const summary = overallStatus === 'ok'
      ? 'Bilgi katmani saglikli'
      : `${widgets.filter(w => w.status !== 'ok').length} widget uyari veriyor`;

    return {
      timestamp: new Date().toISOString(),
      widgets,
      overallStatus,
      summary,
    };
  }

  private static ensureTrackCSeeded(): void {
    if (this.seeded) return;
    this.seeded = true;

    try {
      // 1. AdrSearchService: ADR_INDEX.md
      const adrIndexPath = path.resolve('./docs/architecture/adr/ADR_INDEX.md');
      if (fs.existsSync(adrIndexPath)) {
        const content = fs.readFileSync(adrIndexPath, 'utf-8');
        const regex = /\| (ADR[-_][A-Z0-9_-]+) \|[^|]*\| `([^`]+\.md)`/gi;
        let match;
        while ((match = regex.exec(content)) !== null) {
          AdrSearchService.index({
            id: match[1].trim(),
            title: match[1].trim(),
            content: match[2].trim(),
            status: 'accepted',
          } as any);
        }
      }

      // 2. HistoricalReasoningService: git log
      try {
        const gitLog = execSync('git log --oneline -50', { encoding: 'utf-8' });
        const lines = gitLog.trim().split('\n');
        for (const line of lines) {
          const idx = line.indexOf(' ');
          const hash = line.substring(0, idx);
          const msg = line.substring(idx + 1);
          let type = 'chore';
          if (msg.startsWith('docs:')) type = 'docs';
          else if (msg.startsWith('feat:')) type = 'feature';
          else if (msg.startsWith('fix:')) type = 'fix';
          HistoricalReasoningService.record({
            type, title: msg, description: `Commit ${hash}`, category: 'git',
          } as any);
        }
      } catch (e) { /* git yoksa gec */ }

      // 3. TraceabilityMatrixService: test dosyalari
      const testDir = path.resolve('./src/tests');
      if (fs.existsSync(testDir)) {
        const walk = (dir: string): string[] => {
          const files: string[] = [];
          for (const f of fs.readdirSync(dir)) {
            const full = path.join(dir, f);
            if (fs.statSync(full).isDirectory()) files.push(...walk(full));
            else if (f.endsWith('.test.ts')) files.push(full);
          }
          return files;
        };
        const testFiles = walk(testDir);
        for (const tf of testFiles) {
          const name = path.basename(tf);
          const adrMatch = name.match(/ADR[-_]?[A-Z0-9_-]+/i);
          TraceabilityMatrixService.add({
            requirementId: `REQ-${name.replace('.test.ts', '')}`,
            adrId: adrMatch ? adrMatch[0] : 'ADR-GOV-002',
            testId: name,
            status: 'covered',
          });
        }
      }

      // 4. ExecutiveMemoryService: PHASES.md
      const phasesPath = path.resolve('./docs/governance/status/PHASES.md');
      if (fs.existsSync(phasesPath)) {
        const content = fs.readFileSync(phasesPath, 'utf-8');
        const regex = /^\| (\d+(?:-\d+)?) \| ([^|]+) \| ([A-Z_ ]+) \|/gm;
        let match;
        while ((match = regex.exec(content)) !== null) {
          ExecutiveMemoryService.remember({
            type: 'decision',
            title: `Phase ${match[1]}: ${match[2].trim()}`,
            content: `Durum: ${match[3].trim()}`,
            tags: ['phase', match[3].trim().toLowerCase()],
          } as any);
        }
      }
    } catch (e) {
      console.error('Track C seeding error:', e);
    }
  }
}
