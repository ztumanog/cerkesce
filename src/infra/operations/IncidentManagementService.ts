export type IncidentSeverity = 'SEV1' | 'SEV2' | 'SEV3' | 'SEV4';
export type IncidentStatus = 'open' | 'investigating' | 'resolved' | 'closed';

export interface Incident {
  id: string;
  title: string;
  severity: IncidentSeverity;
  status: IncidentStatus;
  createdAt: string;
  resolvedAt?: string;
  runbook?: string;
}

export interface IncidentReport {
  timestamp: string;
  total: number;
  open: number;
  resolved: number;
  bySeverity: Record<IncidentSeverity, number>;
  incidents: Incident[];
}

export class IncidentManagementService {
  private static incidents: Incident[] = [];

  static create(title: string, severity: IncidentSeverity, runbook?: string): Incident {
    const incident: Incident = {
      id: `INC-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      title,
      severity,
      status: 'open',
      createdAt: new Date().toISOString(),
      runbook,
    };
    this.incidents.push(incident);
    console.log(`[INCIDENT] ${severity}: ${title}`);
    return incident;
  }

  static resolve(id: string): Incident | undefined {
    const incident = this.incidents.find(i => i.id === id);
    if (incident) {
      incident.status = 'resolved';
      incident.resolvedAt = new Date().toISOString();
    }
    return incident;
  }

  static getReport(): IncidentReport {
    const bySeverity: Record<IncidentSeverity, number> = {
      SEV1: 0, SEV2: 0, SEV3: 0, SEV4: 0,
    };
    for (const inc of this.incidents) {
      bySeverity[inc.severity]++;
    }
    return {
      timestamp: new Date().toISOString(),
      total: this.incidents.length,
      open: this.incidents.filter(i => i.status === 'open' || i.status === 'investigating').length,
      resolved: this.incidents.filter(i => i.status === 'resolved' || i.status === 'closed').length,
      bySeverity,
      incidents: this.incidents,
    };
  }

  static clear(): void {
    this.incidents = [];
  }
}
