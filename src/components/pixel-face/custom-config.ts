import { PIXEL_FACE_CONFIG } from './config';
import { PixelFaceConfig } from './types';

// Example of creating a custom configuration
export const CUSTOM_PIXEL_FACE_CONFIG: PixelFaceConfig = {
  ...PIXEL_FACE_CONFIG,
  colors: {
    background: '#1a1a2e',
    dim: '#16213e',
    medium: '#0f4c75',
    bright: '#3282b8',
    highlight: '#bbe1fa',
  },
  expressions: {
    // Only include a subset of expressions for a simpler version
    neutral: PIXEL_FACE_CONFIG.expressions.neutral,
    smiling: PIXEL_FACE_CONFIG.expressions.smiling,
    winking: PIXEL_FACE_CONFIG.expressions.winking,
  }
};
