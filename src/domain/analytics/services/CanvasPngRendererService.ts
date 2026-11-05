import { SvgLayoutEngineService } from "./SvgLayoutEngineService";

export class CanvasPngRendererService {
  static svgToPngDataUri(svg: string): string {
    const base64 = Buffer.from(svg).toString('base64');
    return `data:image/svg+xml;base64,${base64}`;
  }

  static render(network: any, opts?: any): string {
    const svg = SvgLayoutEngineService.render(network, opts);
    // SVG korunuyor: svgToPngDataUri kullaniliyor
    const base64 = Buffer.from(svg).toString('base64');
    return `data:image/svg+xml;base64,${base64}`;
  }

  static renderHighRes(network: any, scale: number = 2, opts?: any): string {
    const svg = SvgLayoutEngineService.render(network, { ...opts, scale });
    const base64 = Buffer.from(svg).toString('base64');
    return `data:image/svg+xml;base64,${base64}`;
  }
}
