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
    return this.svgToPngDataUri(svg);
  }

  /**
   * SVG'yi data URI'ye cevirir (client-side icin).
   *
   * P4-B5/P4-C düzeltmesi: Buffer yalnızca Node'da vardir; tarayicida
   * TextEncoder + btoa fallback'u kullanilir (SvgLayoutEngineService._toBase64
   * deseni). Önceki hali client'ta ReferenceError üretiyordu.
   *
   * NOT: Bu metodun döndürdügü URI SVG içeriklidir (image/svg+xml) — gercek
   * PNG rasterizasyonu tarayicida canvas ile yapilir (GraphExport bileşenindeki
   * rasterizeSvgToPng). Servis SVG üretim ve kodlama katmanidir.
   */
  static svgToPngDataUri(svg: string): string {
    let base64: string;
    if (typeof Buffer !== 'undefined') {
      base64 = Buffer.from(svg, 'utf-8').toString('base64');
    } else {
      const bytes = new TextEncoder().encode(svg);
      let binary = '';
      for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
      base64 = btoa(binary);
    }
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

// SVG korunuyor: svgToPngDataUri kullaniliyor

