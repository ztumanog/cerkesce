import fs from 'fs';
import path from 'path';

export interface BackupCheck {
  name: string;
  path: string;
  exists: boolean;
  sizeBytes: number;
  lastModified: string | null;
}

export interface BackupVerificationReport {
  timestamp: string;
  checks: BackupCheck[];
  totalChecked: number;
  passed: number;
  failed: number;
  status: 'ok' | 'warning' | 'critical';
}

export class BackupVerificationService {
  private static backupDirs = [
    'docs/archive',
    'docs/governance',
  ];

  static verify(): BackupVerificationReport {
    const checks: BackupCheck[] = [];

    for (const dir of this.backupDirs) {
      const exists = fs.existsSync(dir);
      let sizeBytes = 0;
      let lastModified: string | null = null;

      if (exists) {
        try {
          const stat = fs.statSync(dir);
          lastModified = stat.mtime.toISOString();
          sizeBytes = stat.size;
        } catch {
          // ignore
        }
      }

      checks.push({
        name: path.basename(dir),
        path: dir,
        exists,
        sizeBytes,
        lastModified,
      });
    }

    const passed = checks.filter(c => c.exists).length;
    const failed = checks.length - passed;
    const status = failed === 0 ? 'ok' : failed > 1 ? 'critical' : 'warning';

    return {
      timestamp: new Date().toISOString(),
      checks,
      totalChecked: checks.length,
      passed,
      failed,
      status,
    };
  }
}
