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

  constructor(props: DialectRuleProps) {
    this.id = props.id;
    this.sourceDialect = props.sourceDialect;
    this.targetDialect = props.targetDialect;
    this.pattern = props.pattern;
    this.replacement = props.replacement;
  }
}