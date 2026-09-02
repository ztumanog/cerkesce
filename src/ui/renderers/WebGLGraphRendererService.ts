export interface WebGLRenderConfig {
  enableGPUAcceleration: boolean;
  maxNodeThreshold: number;
}

export class WebGLGraphRendererService {
  public static selectRendererMode(nodeCount: number): 'DOM_CANVAS' | 'WEBGL_GPU' {
    return nodeCount > 5000 ? 'WEBGL_GPU' : 'DOM_CANVAS';
  }
}