export interface LogEntry {
  level: 'INFO' | 'WARN' | 'ERROR';
  message: string;
  context?: Record<string, unknown>;
  timestamp: string;
}

export class LoggerService {
  private static logs: LogEntry[] = [];

  public static log(level: 'INFO' | 'WARN' | 'ERROR', message: string, context?: Record<string, unknown>): LogEntry {
    const entry: LogEntry = {
      level,
      message,
      context,
      timestamp: new Date().toISOString()
    };
    this.logs.push(entry);
    return entry;
  }

  public static getLogs(): LogEntry[] {
    return this.logs;
  }

  public static clear(): void {
    this.logs = [];
  }
}