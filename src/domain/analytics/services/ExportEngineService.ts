export interface GenericConceptNetworkDTO {
  nodes: { id: string; [key: string]: any }[];
  edges: { source: string; target: string; [key: string]: any }[];
}

export type ExportFormatOptions = { format: string; [key: string]: any };

export class ExportEngineService {
  public exportNetwork(network: GenericConceptNetworkDTO, options: ExportFormatOptions): void {
    // TODO: gercek export mantigi (CSV, GraphML, PNG vb.) henuz yazilmadi.
    if (typeof document === 'undefined') return;
    const blob = new Blob([JSON.stringify(network, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `network-export.${options.format || 'json'}`;
    a.click();
    URL.revokeObjectURL(url);
  }
}