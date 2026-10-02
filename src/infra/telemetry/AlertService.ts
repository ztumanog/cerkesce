export type AlertLevel = 'INFO' | 'WARNING' | 'CRITICAL';

export interface Alert {
  level: AlertLevel;
  message: string;
  context?: Record<string, unknown>;
  timestamp: string;
}

export class AlertService {
  private static alerts: Alert[] = [];
  private static consoleEnabled = process.env.NODE_ENV !== 'test';

  static trigger(level: AlertLevel, message: string, context?: Record<string, unknown>): Alert {
    const alert: Alert = {
      level,
      message,
      context,
      timestamp: new Date().toISOString(),
    };

    this.alerts.push(alert);

    if (this.consoleEnabled) {
      console.log(`[ALERT] ${JSON.stringify(alert)}`);
    }

    return alert;
  }

  static info(message: string, context?: Record<string, unknown>): Alert {
    return this.trigger('INFO', message, context);
  }

  static warning(message: string, context?: Record<string, unknown>): Alert {
    return this.trigger('WARNING', message, context);
  }

  static critical(message: string, context?: Record<string, unknown>): Alert {
    return this.trigger('CRITICAL', message, context);
  }

  static getAlerts(): Alert[] {
    return this.alerts;
  }

  static clear(): void {
    this.alerts = [];
  }

  static toJSON(): string {
    return JSON.stringify(this.alerts);
  }
}
