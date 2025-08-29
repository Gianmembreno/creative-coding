export interface Pattern {
  x: number;
  y: number;
  pattern: number[][];
}

export interface Expression {
  eyes: Pattern[];
  mouth: Pattern[];
  cheeks: Pattern[];
}

export interface Expressions {
  [key: string]: Expression;
}

export interface ColorPalette {
  background: string;
  dim: string;
  medium: string;
  bright: string;
  highlight: string;
}

export interface PixelFaceConfig {
  gridWidth: number;
  gridHeight: number;
  colors: ColorPalette;
  expressions: Expressions;
  nosePattern: Pattern[];
}
