export interface ExternalSystem {
  id: string;
  name: string;
  type: 'api' | 'database' | 'service' | 'external';
  endpoint: string;
  status: 'active' | 'inactive' | 'error';
  lastSync: string;
  metadata?: Record<string, unknown>;
}

export interface FederationStatus {
  systemId: string;
  connected: boolean;
  latency: number;
  errorRate: number;
  lastCheck: string;
}

export interface FederationReport {
  timestamp: string;
  systems: ExternalSystem[];
  statuses: FederationStatus[];
  totalSystems: number;
  activeSystems: number;
  status: 'ok' | 'warning' | 'critical';
}

export class ExternalSystemFederationService {
  private static systems: Map<string, ExternalSystem> = new Map();

  static register(system: Omit<ExternalSystem, 'lastSync'>): ExternalSystem {
    const newSystem: ExternalSystem = {
      ...system,
      lastSync: new Date().toISOString(),
    };
    this.systems.set(system.id, newSystem);
    return newSystem;
  }

  static unregister(id: string): boolean {
    return this.systems.delete(id);
  }

  static getSystem(id: string): ExternalSystem | undefined {
    return this.systems.get(id);
  }

  static getReport(): FederationReport {
    const systems = Array.from(this.systems.values());
    const statuses: FederationStatus[] = systems.map(s => ({
      systemId: s.id,
      connected: s.status === 'active',
      latency: 0,
      errorRate: 0,
      lastCheck: new Date().toISOString(),
    }));

    const activeSystems = systems.filter(s => s.status === 'active').length;
    const errorSystems = systems.filter(s => s.status === 'error').length;

    const status = errorSystems > 0 ? 'critical'
      : systems.length === 0 ? 'warning'
        : activeSystems === systems.length ? 'ok' : 'warning';

    return {
      timestamp: new Date().toISOString(),
      systems,
      statuses,
      totalSystems: systems.length,
      activeSystems,
      status,
    };
  }

  static clear(): void {
    this.systems.clear();
  }
}
