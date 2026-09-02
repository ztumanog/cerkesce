import { describe, it, expect } from 'vitest';
import { WebGLGraphRendererService } from '../../../ui/renderers/WebGLGraphRendererService';

describe('Phase 10.0 - WebGL Scaling & Render Pipeline Certification', () => {
  it('SCALE-001: Automatically switches to WebGL GPU rendering when node count exceeds 5000', () => {
    expect(WebGLGraphRendererService.selectRendererMode(1200)).toBe('DOM_CANVAS');
    expect(WebGLGraphRendererService.selectRendererMode(5500)).toBe('WEBGL_GPU');
  });
});