export interface Incident {
  id: string;
  title: string;
  services: string[];
  severity: 'low' | 'medium' | 'high' | 'critical';
  timestamp: string;
  symptoms: string[];
}

export interface CorrelationGroup {
  groupId: string;
  incidents: Incident[];
  commonServices: string[];
  commonSymptoms: string[];
  likelyCause: string;
  confidence: number;
}

export interface CorrelationReport {
  timestamp: string;
  totalIncidents: number;
  groups: CorrelationGroup[];
  status: 'ok' | 'warning' | 'critical';
}

export class IncidentCorrelationService {
  private static incidents: Incident[] = [];

  static record(incident: Omit<Incident, 'id' | 'timestamp'>): Incident {
    const newIncident: Incident = {
      ...incident,
      id: `INC-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      timestamp: new Date().toISOString(),
    };
    this.incidents.push(newIncident);
    return newIncident;
  }

  static correlate(windowMinutes: number = 30): CorrelationReport {
    const now = Date.now();
    const windowMs = windowMinutes * 60 * 1000;
    const recent = this.incidents.filter(i => now - new Date(i.timestamp).getTime() <= windowMs);

    const groups: CorrelationGroup[] = [];
    const processed = new Set<string>();

    for (const incident of recent) {
      if (processed.has(incident.id)) continue;

      const related = recent.filter(i =>
        i.id !== incident.id &&
        !processed.has(i.id) &&
        this.hasCommonElements(i.services, incident.services)
      );

      if (related.length > 0) {
        const all = [incident, ...related];
        const allServices = all.flatMap(i => i.services);
        const allSymptoms = all.flatMap(i => i.symptoms);

        groups.push({
          groupId: `GRP-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
          incidents: all,
          commonServices: this.findCommon(allServices),
          commonSymptoms: this.findCommon(allSymptoms),
          likelyCause: incident.symptoms[0] || 'Unknown',
          confidence: Math.min(1, related.length / 3),
        });

        processed.add(incident.id);
        related.forEach(i => processed.add(i.id));
      }
    }

    const status = groups.length > 2 ? 'warning' : 'ok';

    return {
      timestamp: new Date().toISOString(),
      totalIncidents: recent.length,
      groups,
      status,
    };
  }

  private static hasCommonElements(a: string[], b: string[]): boolean {
    return a.some(x => b.includes(x));
  }

  private static findCommon(arr: string[]): string[] {
    const counts: Record<string, number> = {};
    for (const item of arr) {
      counts[item] = (counts[item] || 0) + 1;
    }
    return Object.entries(counts)
      .filter(([_, count]) => count > 1)
      .map(([item]) => item);
  }

  static clear(): void {
    this.incidents = [];
  }
}
