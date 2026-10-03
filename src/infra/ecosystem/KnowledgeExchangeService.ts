export interface KnowledgePackage {
  id: string;
  source: string;
  target: string;
  type: 'adr' | 'pattern' | 'lesson' | 'metric';
  content: Record<string, unknown>;
  timestamp: string;
  status: 'pending' | 'transferred' | 'failed';
}

export interface ExchangeResult {
  packageId: string;
  success: boolean;
  message: string;
  transferredAt: string;
}

export interface ExchangeReport {
  timestamp: string;
  totalPackages: number;
  transferred: number;
  failed: number;
  pending: number;
  status: 'ok' | 'warning' | 'critical';
}

export class KnowledgeExchangeService {
  private static packages: Map<string, KnowledgePackage> = new Map();

  static create(pkg: Omit<KnowledgePackage, 'id' | 'timestamp' | 'status'>): KnowledgePackage {
    const newPackage: KnowledgePackage = {
      ...pkg,
      id: `PKG-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      timestamp: new Date().toISOString(),
      status: 'pending',
    };
    this.packages.set(newPackage.id, newPackage);
    return newPackage;
  }

  static transfer(id: string): ExchangeResult {
    const pkg = this.packages.get(id);
    if (!pkg) {
      return {
        packageId: id,
        success: false,
        message: 'Package not found',
        transferredAt: new Date().toISOString(),
      };
    }

    pkg.status = 'transferred';
    return {
      packageId: id,
      success: true,
      message: `Transferred from ${pkg.source} to ${pkg.target}`,
      transferredAt: new Date().toISOString(),
    };
  }

  static fail(id: string): ExchangeResult {
    const pkg = this.packages.get(id);
    if (!pkg) {
      return {
        packageId: id,
        success: false,
        message: 'Package not found',
        transferredAt: new Date().toISOString(),
      };
    }

    pkg.status = 'failed';
    return {
      packageId: id,
      success: false,
      message: 'Transfer failed',
      transferredAt: new Date().toISOString(),
    };
  }

  static getReport(): ExchangeReport {
    const packages = Array.from(this.packages.values());
    const transferred = packages.filter(p => p.status === 'transferred').length;
    const failed = packages.filter(p => p.status === 'failed').length;
    const pending = packages.filter(p => p.status === 'pending').length;

    const status = failed > 0 ? 'critical'
      : packages.length === 0 ? 'warning' : 'ok';

    return {
      timestamp: new Date().toISOString(),
      totalPackages: packages.length,
      transferred,
      failed,
      pending,
      status,
    };
  }

  static clear(): void {
    this.packages.clear();
  }
}
