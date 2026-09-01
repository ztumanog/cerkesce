import { DialectCode, RegionGroup } from './types/DialectTypes';

export interface DialectProps {
  code: DialectCode;
  name: string;
  regionGroup: RegionGroup;
  parentDialectCode?: DialectCode;
}

export class Dialect {
  readonly code: DialectCode;
  readonly name: string;
  readonly regionGroup: RegionGroup;
  readonly parentDialectCode?: DialectCode;

  constructor(props: DialectProps) {
    if (!props.name || props.name.trim().length === 0) {
      throw new Error("Dialect name cannot be empty");
    }
    this.code = props.code;
    this.name = props.name.trim();
    this.regionGroup = props.regionGroup;
    this.parentDialectCode = props.parentDialectCode;
  }
}