import fs from 'fs';
import path from 'path';

export interface ConsistencyIssue {
  area: string;
  document: string;
  code: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
  recommendation: string;
}

export interface ArchitectureConsistencyReport {
  timestamp: string;
  issues: ConsistencyIssue[];
  consistencyScore: number;
  status: 'ok' | 'warning' | 'critical';
}

export class ArchitectureConsistencyAdvisor {
  static analyze(): ArchitectureConsistencyReport {
    const issues: ConsistencyIssue[] = [];

    // 1. PHASES.md Phase 6 = API Gateway kontrolu
    const phasesFile = path.resolve('./docs/governance/status/PHASES.md');
    if (fs.existsSync(phasesFile)) {
      const content = fs.readFileSync(phasesFile, 'utf-8');
      if (content.includes('Phase 6') && content.includes('API Gateway')) {
        // Kod tarafinda Express API var mi?
        const expressRoutes = path.resolve('./src/infrastructure/api/routes');
        if (fs.existsSync(expressRoutes)) {
          const routes = fs.readdirSync(expressRoutes);
          if (routes.length > 0) {
            // Tutarli
          } else {
            issues.push({
              area: 'API Gateway',
              document: 'PHASES.md',
              code: 'src/infrastructure/api/routes',
              description: 'Phase 6 = API Gateway deniyor ama route dosyalari yok',
              severity: 'high',
              recommendation: 'Route dosyalarini olusturun',
            });
          }
        }
      }
    }

    // 2. CONSTITUTION.md versiyon kontrolu
    const constFile = path.resolve('./docs/governance/constitution/CONSTITUTION.md');
    if (fs.existsSync(constFile)) {
      const content = fs.readFileSync(constFile, 'utf-8');
      if (content.includes('v13.0')) {
        // Guncel
      } else if (content.includes('v12.0')) {
        issues.push({
          area: 'Constitution',
          document: 'CONSTITUTION.md',
          code: '-',
          description: 'Anayasa versiyonu eski (v12.0)',
          severity: 'medium',
          recommendation: 'CONSTITUTION.md\'yi v13.0\'a guncelleyin',
        });
      }
    }

    // 3. ADR_INDEX vs fiziksel dosya
    const adrDir = path.resolve('./docs/architecture/adr');
    const adrIndexFile = path.join(adrDir, 'ADR_INDEX.md');
    if (fs.existsSync(adrIndexFile) && fs.existsSync(adrDir)) {
      const indexContent = fs.readFileSync(adrIndexFile, 'utf-8');
      const physicalFiles = fs.readdirSync(adrDir).filter(f => f.startsWith('ADR-'));

      const indexed = (indexContent.match(/ADR-[A-Z0-9-]+/g) || []).length;

      if (indexed > physicalFiles.length * 1.5) {
        issues.push({
          area: 'ADR',
          document: 'ADR_INDEX.md',
          code: 'docs/architecture/adr/',
          description: `Index ${indexed} ADR gosteriyor ama ${physicalFiles.length} dosya var`,
          severity: 'medium',
          recommendation: 'ADR_INDEX.md\'yi temizleyin',
        });
      }
    }

    const consistencyScore = issues.reduce((sum, i) => {
      const weight = { low: 1, medium: 2, high: 3 }[i.severity];
      return sum + weight * 10;
    }, 0);

    const status = consistencyScore > 40 ? 'critical' : consistencyScore > 20 ? 'warning' : 'ok';

    return {
      timestamp: new Date().toISOString(),
      issues,
      consistencyScore,
      status,
    };
  }
}
