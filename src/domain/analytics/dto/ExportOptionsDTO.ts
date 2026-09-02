export enum ExportFormat {
  JSON = 'JSON',
  SVG = 'SVG',
  PNG = 'PNG'
}

export interface ExportOptionsDTO {
  format: ExportFormat;
  width?: number;
  height?: number;
  backgroundColor?: string;
  includeMetadata?: boolean;
}

export interface NetworkExportPayload {
  format: ExportFormat;
  mimeType: string;
  content: string;
  exportedAt: string;
  nodeCount: number;
  edgeCount: number;
}