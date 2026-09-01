export interface MeaningConceptLinkProps {
  meaningId: string;
  conceptId: string;
}

export class MeaningConceptLink {
  private readonly _meaningId: string;
  private readonly _conceptId: string;

  constructor(props: MeaningConceptLinkProps) {
    if (!props.meaningId || !props.conceptId) {
      throw new Error('MeaningConceptLink requires valid meaningId and conceptId');
    }
    this._meaningId = props.meaningId;
    this._conceptId = props.conceptId;
    Object.freeze(this);
  }

  get meaningId(): string {
    return this._meaningId;
  }

  get conceptId(): string {
    return this._conceptId;
  }
}