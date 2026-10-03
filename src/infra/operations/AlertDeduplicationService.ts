export interface Alert {
  id: string;
  type: string;
  message: string;
  severity: 'info' | 'warning' | 'critical';
  timestamp: string;
  source: string;
}

export interface DeduplicationResult {
  uniqueAlerts: Alert[];
  duplicateCount: number;
  groups: Record<string, Alert[]>;
  status: 'ok' | 'warning' | 'critical';
}

export class AlertDeduplicationService {
  private static alerts: Alert[] = [];

  static add(alert: Omit<Alert, 'id' | 'timestamp'>): Alert {
    const newAlert: Alert = {
      ...alert,
      id: `ALERT-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      timestamp: new Date().toISOString(),
    };
    this.alerts.push(newAlert);
    return newAlert;
  }

  static deduplicate(windowMinutes: number = 5): DeduplicationResult {
    const groups: Record<string, Alert[]> = {};
    const uniqueAlerts: Alert[] = [];
    const now = Date.now();
    const windowMs = windowMinutes * 60 * 1000;

    for (const alert of this.alerts) {
      const age = now - new Date(alert.timestamp).getTime();
      if (age > windowMs) continue;

      const key = `${alert.type}-${alert.source}`;
      if (!groups[key]) groups[key] = [];
      groups[key].push(alert);
    }

    let duplicateCount = 0;
    for (const key of Object.keys(groups)) {
      const group = groups[key];
      uniqueAlerts.push(group[0]);
      duplicateCount += group.length - 1;
    }

    const status = duplicateCount > 10 ? 'warning' : 'ok';

    return {
      uniqueAlerts,
      duplicateCount,
      groups,
      status,
    };
  }

  static clear(): void {
    this.alerts = [];
  }
}
