import React from 'react';
import { ColorPalette } from './types';
import { getPixelColor } from './utils';

interface PixelGridProps {
  grid: number[][];
  gridWidth: number;
  gridHeight: number;
  colors: ColorPalette;
}

export const PixelGrid: React.FC<PixelGridProps> = ({
  grid,
  gridWidth,
  gridHeight,
  colors
}) => {
  return (
    <div 
      className="grid gap-1 max-w-full max-h-full"
      style={{
        gridTemplateColumns: `repeat(${gridWidth}, 1fr)`,
        gridTemplateRows: `repeat(${gridHeight}, 1fr)`,
        aspectRatio: `${gridWidth} / ${gridHeight}`,
        width: `min(90vw, 90vh * ${gridWidth / gridHeight})`,
        height: `min(90vh, 90vw * ${gridHeight / gridWidth})`,
      }}
    >
      {grid.map((row, y) =>
        row.map((intensity, x) => (
          <div
            key={`${x}-${y}`}
            className="aspect-square rounded-sm transition-colors duration-100"
            style={{
              backgroundColor: getPixelColor(intensity, colors),
              boxShadow: intensity > 0.5 
                ? `0 0 ${intensity * 8}px ${getPixelColor(intensity, colors)}40`
                : 'none',
            }}
          />
        ))
      )}
    </div>
  );
};
