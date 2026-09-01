import { DialectCode } from './types/DialectTypes';
import { VariantId } from './value-objects/VariantId';

export interface VariantProps {
  id: VariantId;
  dialectCode: DialectCode;
  spelling: string;
  phoneticNotation?: string;
}

export class Variant {
  readonly id: VariantId;
  readonly dialectCode: DialectCode;
  readonly spelling: string;
  readonly phoneticNotation?: string;

  constructor(props: VariantProps) {
    if (!props.spelling || props.spelling.trim().length === 0) {
      throw new Error("Variant spelling cannot be empty");
    }

    this.id = props.id;
    this.dialectCode = props.dialectCode;
    this.spelling = props.spelling.trim();
    this.phoneticNotation = props.phoneticNotation?.trim();
  }
}