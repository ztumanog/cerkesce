import fs from 'fs';
import path from 'path';

export interface DocConsistencyResult {
  totalDocs: number;
  brokenReferences: string[];
  missingFiles: string[];
  status: 'ok' | 'warning' | 'error';
  timestamp: string;
}

export class DocumentationConsistencyChecker {
  private static docsDir = path.resolve('./docs');
  private static excludeDirs = ['archive', '_arsiv', 'node_modules'];

  static check(): DocConsistencyResult {
    const docs = this.getAllDocs();
    const brokenReferences: string[] = [];
    const missingFiles: string[] = [];

    for (const doc of docs) {
      const content = fs.readFileSync(doc, 'utf-8');
      const links = content.match(/\[[^\]]+\]\(([^)]+)\)/g) || [];
      for (const link of links) {
        const match = link.match(/\]\(([^)]+)\)/);
        if (!match) continue;
        const target = match[1];
        if (target.startsWith('http') || target.startsWith('#')) continue;
        const targetPath = path.resolve(path.dirname(doc), target);
        if (!fs.existsSync(targetPath)) {
          brokenReferences.push(`${path.relative(this.docsDir, doc)} -> ${target}`);
        }
      }
    }

    const status = brokenReferences.length === 0
      ? 'ok'
      : brokenReferences.length > 10 ? 'error' : 'warning';

    return {
      totalDocs: docs.length,
      brokenReferences,
      missingFiles,
      status,
      timestamp: new Date().toISOString(),
    };
  }

  private static getAllDocs(): string[] {
    if (!fs.existsSync(this.docsDir)) return [];
    const result: string[] = [];
    const walk = (dir: string) => {
      for (const item of fs.readdirSync(dir)) {
        const full = path.join(dir, item);
        if (fs.statSync(full).isDirectory()) {
          if (this.excludeDirs.includes(item)) continue;
          walk(full);
        } else if (item.endsWith('.md')) {
          result.push(full);
        }
      }
    };
    walk(this.docsDir);
    return result;
  }
}
