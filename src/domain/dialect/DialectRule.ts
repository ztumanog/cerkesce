export interface DialectRuleProps {
  id: string;
  sourceDialect: string;
  targetDialect: string;
  pattern: string;
  replacement: string;
}

export class DialectRule {
  public readonly id: string;
  public readonly sourceDialect: string;
  public readonly targetDialect: string;
  public readonly pattern: string;
  public readonly replacement: string;

  /** Backward-compatible names used by repository implementations. */
  public get fromDialect(): string {
    return this.sourceDialect;
  }

  public get toDialect(): string {
    return this.targetDialect;
  }

  constructor(props: DialectRuleProps) {
    this.id = props.id;
    this.sourceDialect = props.sourceDialect;
    this.targetDialect = props.targetDialect;
    this.pattern = props.pattern;
    this.replacement = props.replacement;
  }
}
