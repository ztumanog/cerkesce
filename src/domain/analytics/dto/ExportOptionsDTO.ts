export enum ExportFormat { JSON = "JSON", SVG = "SVG", PNG = "PNG" }
export interface ExportOptions { format: ExportFormat; width?: number; height?: number }
