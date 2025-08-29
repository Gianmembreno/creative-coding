import { Pattern, ColorPalette, Expressions } from './types';

export const applyPattern = (
  grid: number[][], 
  x: number, 
  y: number, 
  pattern: number[][], 
  intensity: number = 1,
  gridWidth: number,
  gridHeight: number
) => {
  pattern.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      const gridY = y + rowIndex;
      const gridX = x + colIndex;
      if (gridY >= 0 && gridY < gridHeight && gridX >= 0 && gridX < gridWidth) {
        grid[gridY][gridX] = Math.max(grid[gridY][gridX], cell * intensity);
      }
    });
  });
};

export const generateGrid = (
  expressionName: string,
  expressions: Expressions,
  nosePattern: Pattern[],
  gridWidth: number,
  gridHeight: number,
  intensity: number = 1
) => {
  const newGrid = Array(gridHeight).fill(null).map(() => Array(gridWidth).fill(0));
  const expression = expressions[expressionName];
  
  if (!expression) return newGrid;
  
  // Apply nose (always present)
  nosePattern.forEach(({ x, y, pattern }) => {
    applyPattern(newGrid, x, y, pattern, intensity, gridWidth, gridHeight);
  });

  // Apply expression features
  [...expression.eyes, ...expression.mouth, ...expression.cheeks].forEach(({ x, y, pattern }) => {
    applyPattern(newGrid, x, y, pattern, intensity, gridWidth, gridHeight);
  });

  return newGrid;
};

export const interpolateGrids = (
  grid1: number[][], 
  grid2: number[][], 
  progress: number
) => {
  return grid1.map((row, y) =>
    row.map((cell, x) => {
      const val1 = grid1[y][x];
      const val2 = grid2[y][x];
      return val1 + (val2 - val1) * progress;
    })
  );
};

export const getPixelColor = (intensity: number, colors: ColorPalette) => {
  if (intensity <= 0) return colors.background;
  if (intensity <= 0.3) return colors.dim;
  if (intensity <= 0.6) return colors.medium;
  if (intensity <= 0.9) return colors.bright;
  return colors.highlight;
};
