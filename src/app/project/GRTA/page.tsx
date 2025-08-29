'use client';

import { useState, useEffect, useCallback } from 'react';

// Grid dimensions
const GRID_WIDTH = 24;
const GRID_HEIGHT = 32;

// Color palette inspired by the reference image
const COLORS = {
  background: '#2d1b2e',
  dim: '#4a2d4d',
  medium: '#8b4a8c',
  bright: '#d16ba5',
  highlight: '#f7a8d8',
};

// Facial expression patterns
const EXPRESSIONS = {
  neutral: {
    eyes: [
      { x: 7, y: 10, pattern: [[1, 1, 1], [1, 0, 1], [1, 1, 1]] },
      { x: 15, y: 10, pattern: [[1, 1, 1], [1, 0, 1], [1, 1, 1]] }
    ],
    mouth: [
      { x: 10, y: 22, pattern: [[0, 1, 1, 1, 0]] }
    ],
    cheeks: [
      { x: 5, y: 18, pattern: [[1]] },
      { x: 18, y: 18, pattern: [[1]] }
    ]
  },
  
  smiling: {
    eyes: [
      { x: 7, y: 10, pattern: [[1, 1, 1], [1, 1, 1], [0, 1, 0]] },
      { x: 15, y: 10, pattern: [[1, 1, 1], [1, 1, 1], [0, 1, 0]] }
    ],
    mouth: [
      { x: 9, y: 22, pattern: [[0, 1, 1, 1, 1, 0]] },
      { x: 10, y: 23, pattern: [[1, 1, 1, 1]] }
    ],
    cheeks: [
      { x: 4, y: 17, pattern: [[1, 1], [1, 1]] },
      { x: 18, y: 17, pattern: [[1, 1], [1, 1]] }
    ]
  },

  surprised: {
    eyes: [
      { x: 6, y: 9, pattern: [[0, 1, 1, 1, 0], [1, 1, 0, 1, 1], [1, 1, 1, 1, 1], [1, 1, 0, 1, 1], [0, 1, 1, 1, 0]] },
      { x: 14, y: 9, pattern: [[0, 1, 1, 1, 0], [1, 1, 0, 1, 1], [1, 1, 1, 1, 1], [1, 1, 0, 1, 1], [0, 1, 1, 1, 0]] }
    ],
    mouth: [
      { x: 11, y: 22, pattern: [[1, 1], [1, 1]] }
    ],
    cheeks: [
      { x: 5, y: 18, pattern: [[1]] },
      { x: 18, y: 18, pattern: [[1]] }
    ]
  },

  sad: {
    eyes: [
      { x: 7, y: 11, pattern: [[0, 1, 0], [1, 0, 1], [1, 1, 1]] },
      { x: 15, y: 11, pattern: [[0, 1, 0], [1, 0, 1], [1, 1, 1]] }
    ],
    mouth: [
      { x: 10, y: 24, pattern: [[1, 1, 1, 1]] },
      { x: 9, y: 23, pattern: [[0, 1, 1, 1, 1, 0]] }
    ],
    cheeks: [
      { x: 5, y: 19, pattern: [[1]] },
      { x: 18, y: 19, pattern: [[1]] }
    ]
  },

  winking: {
    eyes: [
      { x: 7, y: 10, pattern: [[1, 1, 1], [0, 0, 0]] },
      { x: 15, y: 10, pattern: [[1, 1, 1], [1, 0, 1], [1, 1, 1]] }
    ],
    mouth: [
      { x: 9, y: 22, pattern: [[0, 1, 1, 1, 1, 0]] },
      { x: 11, y: 23, pattern: [[1, 1]] }
    ],
    cheeks: [
      { x: 4, y: 17, pattern: [[1, 1]] },
      { x: 18, y: 18, pattern: [[1]] }
    ]
  }
};

const NOSE_PATTERN = [
  { x: 11, y: 16, pattern: [[1]] },
  { x: 11, y: 17, pattern: [[1]] }
];

export default function PixelFace() {
  const [currentExpression, setCurrentExpression] = useState('neutral');
  const [grid, setGrid] = useState<number[][]>(() => 
    Array(GRID_HEIGHT).fill(null).map(() => Array(GRID_WIDTH).fill(0))
  );
  const [transitionProgress, setTransitionProgress] = useState(0);

  const expressions = Object.keys(EXPRESSIONS);

  const applyPattern = useCallback((grid: number[][], x: number, y: number, pattern: number[][], intensity: number = 1) => {
    pattern.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        const gridY = y + rowIndex;
        const gridX = x + colIndex;
        if (gridY >= 0 && gridY < GRID_HEIGHT && gridX >= 0 && gridX < GRID_WIDTH) {
          grid[gridY][gridX] = Math.max(grid[gridY][gridX], cell * intensity);
        }
      });
    });
  }, []);

  const generateGrid = useCallback((expressionName: string, intensity: number = 1) => {
    const newGrid = Array(GRID_HEIGHT).fill(null).map(() => Array(GRID_WIDTH).fill(0));
    const expression = EXPRESSIONS[expressionName as keyof typeof EXPRESSIONS];
    
    // Apply nose (always present)
    NOSE_PATTERN.forEach(({ x, y, pattern }) => {
      applyPattern(newGrid, x, y, pattern, intensity);
    });

    // Apply expression features
    [...expression.eyes, ...expression.mouth, ...expression.cheeks].forEach(({ x, y, pattern }) => {
      applyPattern(newGrid, x, y, pattern, intensity);
    });

    return newGrid;
  }, [applyPattern]);

  const interpolateGrids = useCallback((grid1: number[][], grid2: number[][], progress: number) => {
    return grid1.map((row, y) =>
      row.map((cell, x) => {
        const val1 = grid1[y][x];
        const val2 = grid2[y][x];
        return val1 + (val2 - val1) * progress;
      })
    );
  }, []);

  useEffect(() => {
    let animationId: number;
    const startTime = Date.now();
    const expressionDuration = 3000; // 3 seconds per expression
    const transitionDuration = 800; // 0.8 seconds transition

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const cycle = elapsed % expressionDuration;
      
      if (cycle < transitionDuration) {
        // Transition phase
        const progress = cycle / transitionDuration;
        setTransitionProgress(progress);
        
        const currentIndex = expressions.indexOf(currentExpression);
        const nextIndex = (currentIndex + 1) % expressions.length;
        const nextExpression = expressions[nextIndex];
        
        const currentGrid = generateGrid(currentExpression);
        const nextGrid = generateGrid(nextExpression);
        const interpolatedGrid = interpolateGrids(currentGrid, nextGrid, progress);
        
        setGrid(interpolatedGrid);
        
        if (progress >= 1) {
          setCurrentExpression(nextExpression);
          setTransitionProgress(0);
        }
      } else {
        // Stable phase with subtle breathing animation
        const breathe = Math.sin((elapsed % 4000) / 4000 * Math.PI * 2) * 0.1 + 1;
        const baseGrid = generateGrid(currentExpression, breathe);
        setGrid(baseGrid);
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [currentExpression, expressions, generateGrid, interpolateGrids]);

  const getPixelColor = (intensity: number) => {
    if (intensity <= 0) return COLORS.background;
    if (intensity <= 0.3) return COLORS.dim;
    if (intensity <= 0.6) return COLORS.medium;
    if (intensity <= 0.9) return COLORS.bright;
    return COLORS.highlight;
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-purple-900 via-pink-900 to-rose-900 p-4">
      <div 
        className="grid gap-1 max-w-full max-h-full"
        style={{
          gridTemplateColumns: `repeat(${GRID_WIDTH}, 1fr)`,
          gridTemplateRows: `repeat(${GRID_HEIGHT}, 1fr)`,
          aspectRatio: `${GRID_WIDTH} / ${GRID_HEIGHT}`,
          width: 'min(90vw, 90vh * ' + (GRID_WIDTH / GRID_HEIGHT) + ')',
          height: 'min(90vh, 90vw * ' + (GRID_HEIGHT / GRID_WIDTH) + ')',
        }}
      >
        {grid.map((row, y) =>
          row.map((intensity, x) => (
            <div
              key={`${x}-${y}`}
              className="aspect-square rounded-sm transition-colors duration-100"
              style={{
                backgroundColor: getPixelColor(intensity),
                boxShadow: intensity > 0.5 
                  ? `0 0 ${intensity * 8}px ${getPixelColor(intensity)}40`
                  : 'none',
              }}
            />
          ))
        )}
      </div>
      
      {/* Debug info (remove in production) */}
      <div className="fixed bottom-4 right-4 text-white text-sm bg-black bg-opacity-50 px-3 py-2 rounded">
        Expression: {currentExpression}
        {transitionProgress > 0 && (
          <div>Transition: {Math.round(transitionProgress * 100)}%</div>
        )}
      </div>
    </div>
  );
}
