export interface RenderOptions {
  width: number;
  height: number;
  backgroundColor?: string;
}

export class CanvasRasterizerService {
  /**
   * Converts SVG string representation into PNG DataURL on client-side context.
   */
  public static async svgToPngDataUrl(svgContent: string, options: RenderOptions): Promise<string> {
    if (!svgContent || svgContent.trim() === '') {
      throw new Error('SVG content cannot be empty for rasterization');
    }
    // Stub implementation for environment compatibility
    return `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==`;
  }
}