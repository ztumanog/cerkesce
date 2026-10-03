export interface Incident {
  id: string;
  title: string;
  symptoms: string[];
  rootCause: string;
  resolution: string;
  timestamp: string;
}

export interface RootCauseCluster {
  clusterId: string;
  commonSymptoms: string[];
  incidents: Incident[];
  likelyRootCause: string;
  confidence: number;
  recommendation: string;
}

export interface RootCauseReport {
  timestamp: string;
  totalIncidents: number;
  clusters: RootCauseCluster[];
  status: 'ok' | 'warning' | 'critical';
}

export class RootCauseIntelligenceService {
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

  static findClusters(): RootCauseCluster[] {
    const clusters: RootCauseCluster[] = [];
    const processed = new Set<string>();

    for (const incident of this.incidents) {
      if (processed.has(incident.id)) continue;

      const similar = this.incidents.filter(i =>
        i.id !== incident.id &&
        !processed.has(i.id) &&
        this.similarity(i.symptoms, incident.symptoms) > 0.5
      );

      if (similar.length > 0) {
        const allSymptoms = [incident, ...similar].flatMap(i => i.symptoms);
        const symptomCounts = this.countOccurrences(allSymptoms);
        const commonSymptoms = Object.entries(symptomCounts)
          .filter(([_, count]) => count > 1)
          .map(([symptom]) => symptom);

        const cluster: RootCauseCluster = {
          clusterId: `CL-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
          commonSymptoms,
          incidents: [incident, ...similar],
          likelyRootCause: incident.rootCause,
          confidence: Math.min(1, similar.length / 3),
          recommendation: `Root cause: ${incident.rootCause} - ${incident.resolution}`,
        };
        clusters.push(cluster);

        processed.add(incident.id);
        similar.forEach(i => processed.add(i.id));
      }
    }

    return clusters;
  }

  static getReport(): RootCauseReport {
    const clusters = this.findClusters();
    const status = clusters.length > 3 ? 'warning'
      : this.incidents.length === 0 ? 'ok' : 'ok';

    return {
      timestamp: new Date().toISOString(),
      totalIncidents: this.incidents.length,
      clusters,
      status,
    };
  }

  private static similarity(a: string[], b: string[]): number {
    if (a.length === 0 || b.length === 0) return 0;
    const intersection = a.filter(x => b.includes(x)).length;
    const union = new Set([...a, ...b]).size;
    return intersection / union;
  }

  private static countOccurrences(arr: string[]): Record<string, number> {
    const counts: Record<string, number> = {};
    for (const item of arr) {
      counts[item] = (counts[item] || 0) + 1;
    }
    return counts;
  }

  static clear(): void {
    this.incidents = [];
  }
}
