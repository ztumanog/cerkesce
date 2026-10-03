export interface HistoricalEvent {
  id: string;
  type: 'decision' | 'incident' | 'change';
  description: string;
  outcome: 'positive' | 'negative' | 'neutral';
  timestamp: string;
  context: Record<string, string>;
}

export interface ReasoningInsight {
  pattern: string;
  occurrences: number;
  recommendation: string;
  confidence: number;
}

export interface HistoricalReasoningReport {
  timestamp: string;
  totalEvents: number;
  insights: ReasoningInsight[];
  status: 'ok' | 'warning' | 'critical';
}

export class HistoricalReasoningService {
  private static events: HistoricalEvent[] = [];

  static record(event: Omit<HistoricalEvent, 'id' | 'timestamp'>): HistoricalEvent {
    const newEvent: HistoricalEvent = {
      ...event,
      id: `EVT-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      timestamp: new Date().toISOString(),
    };
    this.events.push(newEvent);
    return newEvent;
  }

  static analyze(): HistoricalReasoningReport {
    const patterns: Record<string, { count: number; outcomes: string[] }> = {};

    for (const event of this.events) {
      const key = event.type;
      if (!patterns[key]) patterns[key] = { count: 0, outcomes: [] };
      patterns[key].count++;
      patterns[key].outcomes.push(event.outcome);
    }

    const insights: ReasoningInsight[] = Object.entries(patterns).map(([type, data]) => {
      const positive = data.outcomes.filter(o => o === 'positive').length;
      const negative = data.outcomes.filter(o => o === 'negative').length;

      const recommendation = negative > positive
        ? `${type} olaylarinda olumsuz sonuclar baskin - dikkatli olunmali`
        : positive > negative
          ? `${type} olaylarinda olumlu sonuclar baskin - devam edilmeli`
          : `${type} olaylari notr - izlenmeli`;

      return {
        pattern: type,
        occurrences: data.count,
        recommendation,
        confidence: Math.min(1, data.count / 5),
      };
    });

    const status = this.events.length === 0 ? 'warning' : 'ok';

    return {
      timestamp: new Date().toISOString(),
      totalEvents: this.events.length,
      insights,
      status,
    };
  }

  static clear(): void {
    this.events = [];
  }
}
