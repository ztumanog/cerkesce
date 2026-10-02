import fs from 'fs';
import path from 'path';

export interface PhaseComparison {
  phase: string;
  phases: string;
  projectStatus: string;
  roadmap: string;
}

export interface PhaseValidationResult {
  phases: PhaseComparison[];
  inconsistencies: string[];
  status: 'ok' | 'warning' | 'error';
  timestamp: string;
}

export class PhaseStatusValidator {
  static validate(): PhaseValidationResult {
    const phases = this.parsePhases();
    const projectStatus = this.parseProjectStatus();
    const roadmap = this.parseRoadmap();

    const allPhases = new Set([
      ...Object.keys(phases),
      ...Object.keys(projectStatus),
      ...Object.keys(roadmap),
    ]);

    const result: PhaseComparison[] = [];
    const inconsistencies: string[] = [];

    for (const phase of allPhases) {
      const p = phases[phase] || 'MISSING';
      const ps = projectStatus[phase] || 'MISSING';
      const r = roadmap[phase] || 'MISSING';

      result.push({ phase, phases: p, projectStatus: ps, roadmap: r });

      const statuses = [p, ps, r].filter(s => s !== 'MISSING');
      if (new Set(statuses).size > 1) {
        inconsistencies.push(`${phase}: PHASES=${p}, PROJECT_STATUS=${ps}, ROADMAP=${r}`);
      }
    }

    const status = inconsistencies.length === 0
      ? 'ok'
      : inconsistencies.length > 3 ? 'error' : 'warning';

    return {
      phases: result,
      inconsistencies,
      status,
      timestamp: new Date().toISOString(),
    };
  }

  private static parsePhases(): Record<string, string> {
    const file = path.resolve('./docs/governance/status/PHASES.md');
    if (!fs.existsSync(file)) return {};
    const content = fs.readFileSync(file, 'utf-8');
    const result: Record<string, string> = {};
    const regex = /^\| (\d+(?:\.\d+)*) \| [^|]+ \| ([A-Z_ ]+) \|/gm;
    let match;
    while ((match = regex.exec(content)) !== null) {
      result[`Phase ${match[1]}`] = match[2].trim();
    }
    return result;
  }

  private static parseProjectStatus(): Record<string, string> {
    const file = path.resolve('./docs/governance/status/PROJECT_STATUS.md');
    if (!fs.existsSync(file)) return {};
    const content = fs.readFileSync(file, 'utf-8');
    const result: Record<string, string> = {};
    const regex = /## Phase (\d+(?:\.\d+)*)[^\n]*\n\*\*Status:\*\* ([A-Z_ ]+)/g;
    let match;
    while ((match = regex.exec(content)) !== null) {
      result[`Phase ${match[1]}`] = match[2].trim();
    }
    return result;
  }

  private static parseRoadmap(): Record<string, string> {
    const file = path.resolve('./docs/governance/status/ROADMAP.md');
    if (!fs.existsSync(file)) return {};
    const content = fs.readFileSync(file, 'utf-8');
    const result: Record<string, string> = {};
    const regex = /^\| (\d+(?:\.\d+)*) \| [^|]+ \| ([A-Z_ ]+) \|/gm;
    let match;
    while ((match = regex.exec(content)) !== null) {
      result[`Phase ${match[1]}`] = match[2].trim();
    }
    return result;
  }
}
