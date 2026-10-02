export interface LogEntry {
  level: 'DEBUG' | 'INFO' | 'WARN' | 'ERROR';
  message: string;
  context?: Record<string, unknown>;
  correlationId?: string;
  service: string;
  timestamp: string;
}

export class LoggerService {
  private static logs: LogEntry[] = [];
  private static serviceName = 'cerkesce-api';
  private static consoleEnabled = process.env.NODE_ENV !== 'test';

  public static log(
    level: 'DEBUG' | 'INFO' | 'WARN' | 'ERROR',
    message: string,
    context?: Record<string, unknown>,
    correlationId?: string
  ): LogEntry {
    const entry: LogEntry = {
      level,
      message,
      context,
      correlationId,
      service: this.serviceName,
      timestamp: new Date().toISOString(),
    };

    this.logs.push(entry);

    if (this.consoleEnabled) {
      console.log(JSON.stringify(entry));
    }

    return entry;
  }

  public static debug(message: string, context?: Record<string, unknown>, correlationId?: string): LogEntry {
    return this.log('DEBUG', message, context, correlationId);
  }

  public static info(message: string, context?: Record<string, unknown>, correlationId?: string): LogEntry {
    return this.log('INFO', message, context, correlationId);
  }

  public static warn(message: string, context?: Record<string, unknown>, correlationId?: string): LogEntry {
    return this.log('WARN', message, context, correlationId);
  }

  public static error(message: string, context?: Record<string, unknown>, correlationId?: string): LogEntry {
    return this.log('ERROR', message, context, correlationId);
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
