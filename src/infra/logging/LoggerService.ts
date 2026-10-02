export interface LogEntry {
  timestamp: string;
  level: 'DEBUG' | 'INFO' | 'WARN' | 'ERROR' | 'FATAL';
  service: string;
  correlationId?: string;
  event: string;
  durationMs?: number;
  context?: Record<string, unknown>;
}

export class LoggerService {
  private static logs: LogEntry[] = [];
  private static serviceName = 'api-gateway';
  private static consoleEnabled = process.env.NODE_ENV !== 'test';

  public static log(
    level: 'DEBUG' | 'INFO' | 'WARN' | 'ERROR' | 'FATAL',
    event: string,
    options?: {
      correlationId?: string;
      durationMs?: number;
      context?: Record<string, unknown>;
    }
  ): LogEntry {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      service: this.serviceName,
      correlationId: options?.correlationId,
      event,
      durationMs: options?.durationMs,
      context: options?.context,
    };

    this.logs.push(entry);

    if (this.consoleEnabled) {
      console.log(JSON.stringify(entry));
    }

    return entry;
  }

  public static debug(event: string, options?: any): LogEntry {
    return this.log('DEBUG', event, options);
  }

  public static info(event: string, options?: any): LogEntry {
    return this.log('INFO', event, options);
  }

  public static warn(event: string, options?: any): LogEntry {
    return this.log('WARN', event, options);
  }

  public static error(event: string, options?: any): LogEntry {
    return this.log('ERROR', event, options);
  }

  public static fatal(event: string, options?: any): LogEntry {
    return this.log('FATAL', event, options);
  }

  public static getLogs(): LogEntry[] {
    return this.logs;
  }

  public static clear(): void {
    this.logs = [];
  }

  public static toJSON(): string {
    return JSON.stringify(this.logs);
  }
}
