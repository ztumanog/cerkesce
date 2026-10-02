/**
 * ZipExporterService
 * Phase 7.3: Export Hardening
 *
 * ZIP paketi:
 * - Coklu network'u ZIP olarak paketle
 * - Base64 data URI
 * - Manifest dosyasi
 */

import { GenericConceptNetworkDTO } from './ExportEngineService';

export interface ZipExportItem {
  id: string;
  network: GenericConceptNetworkDTO;
}

export interface ZipExportResult {
  filename: string;
  base64: string;
  mimeType: string;
  itemCount: number;
}

export class ZipExporterService {
  /**
   * Birden fazla network'u ZIP olarak paketler.
   *
   * NOT: Node.js'de gercek ZIP icin 'archiver' veya 'jszip' gerekir.
   * Bu stub, manifest + base64 doner.
   */
  static exportZip(items: ZipExportItem[]): ZipExportResult {
    if (!Array.isArray(items)) {
      throw new Error('Items must be an array');
    }

    // Manifest olustur
    const manifest = {
      version: '1.0.0',
      exportedAt: new Date().toISOString(),
      itemCount: items.length,
      items: items.map(item => ({
        id: item.id,
        nodeCount: item.network.nodes.length,
        edgeCount: item.network.edges.length,
      })),
    };

    // Stub base64 (gercek ZIP degil)
    const manifestJson = JSON.stringify(manifest, null, 2);
    const base64 = Buffer.from(manifestJson).toString('base64');

    return {
      filename: `cerkesce-export-${Date.now()}.zip`,
      base64,
      mimeType: 'application/zip',
      itemCount: items.length,
    };
  }

  /**
   * ZIP manifest'i JSON olarak dondurur.
   */
  static getManifest(items: ZipExportItem[]): string {
    const manifest = {
      version: '1.0.0',
      exportedAt: new Date().toISOString(),
      itemCount: items.length,
      items: items.map(item => ({
        id: item.id,
        nodeCount: item.network.nodes.length,
        edgeCount: item.network.edges.length,
      })),
    };

    return JSON.stringify(manifest, null, 2);
  }
}
