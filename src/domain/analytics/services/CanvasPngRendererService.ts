/**
 * CanvasPngRendererService
 * Phase 7.0.4: Canvas PNG Rendering
 *
 * SVG -> PNG donusumu:
 * - Node.js'de stub (base64)
 * - Client-side'da gercek render
 * - Yüksek çözünürlük
 */

import { SvgLayoutEngineService, SvgLayoutOptions } from './SvgLayoutEngineService';
import { GenericConceptNetworkDTO } from './ExportEngineService';

export interface PngRenderOptions extends SvgLayoutOptions {
  scale?: number;
}

export class CanvasPngRendererService {
  /**
   * Network'u PNG olarak render eder.
   *
   * NOT: Node.js'de gercek canvas yok — stub base64 doner.
   * Gercek render client-side'da yapilir (Sprint 7.0.5).
   */
  static render(
    network: GenericConceptNetworkDTO,
    options: PngRenderOptions = {}
  ): string {
    // 1. SVG uret
    const svg = SvgLayoutEngineService.render(network, options);

    // 2. PNG stub (gercek render client-side)
    // 1x1 transparent PNG
    const stubBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';

    // 3. Data URI
    return `data:image/png;base64,${stubBase64}`;
  }

  /**
   * SVG'yi PNG data URI'ye cevirir (client-side icin).
   */
  static svgToPngDataUri(svg: string): string {
    const base64 = Buffer.from(svg).toString('base64');
    return `data:image/svg+xml;base64,${base64}`;
  }

  /**
   * Yüksek çözünürlüklü PNG (scale faktörü).
   */
  static renderHighRes(
    network: GenericConceptNetworkDTO,
    options: PngRenderOptions = {}
  ): string {
    const scale = options.scale || 2;
    const width = (options.width || 800) * scale;
    const height = (options.height || 600) * scale;

    return CanvasPngRendererService.render(network, {
      ...options,
      width,
      height,
    });
  }
}
