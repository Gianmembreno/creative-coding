import React, { useState, useEffect } from 'react';
import { PixelFaceConfig } from './types';
import { generateGrid, interpolateGrids } from './utils';
import { PixelGrid } from './PixelGrid';
import { DebugInfo } from './DebugInfo';

interface PixelFaceProps {
  config: PixelFaceConfig;
  expressionDuration?: number;
  transitionDuration?: number;
  showDebug?: boolean;
}

export const PixelFace: React.FC<PixelFaceProps> = ({
  config,
  expressionDuration = 3000,
  transitionDuration = 800,
  showDebug = false
}) => {
  const [grid, setGrid] = useState<number[][]>(() => 
    Array(config.gridHeight).fill(null).map(() => Array(config.gridWidth).fill(0))
  );
  const [currentExpressionName, setCurrentExpressionName] = useState('neutral');
  const [transitionProgress, setTransitionProgress] = useState(0);

  useEffect(() => {
    let animationId: number;
    const startTime = Date.now();
    let currentIndex = 0;
    let lastProgressUpdate = -1;
    
    // Local copy of expressions array
    const localExpressions = Object.keys(config.expressions);
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const cycle = elapsed % expressionDuration;
      
      if (cycle < transitionDuration) {
        // Transition phase
        const progress = cycle / transitionDuration;
        
        // Only update if progress has changed significantly
        if (Math.abs(progress - lastProgressUpdate) > 0.01) {
          const nextIndex = (currentIndex + 1) % localExpressions.length;
          const currentExpr = localExpressions[currentIndex];
          const nextExpr = localExpressions[nextIndex];
          
          const currentGrid = generateGrid(
            currentExpr, 
            config.expressions, 
            config.nosePattern, 
            config.gridWidth, 
            config.gridHeight
          );
          const nextGrid = generateGrid(
            nextExpr, 
            config.expressions, 
            config.nosePattern, 
            config.gridWidth, 
            config.gridHeight
          );
          const interpolatedGrid = interpolateGrids(currentGrid, nextGrid, progress);
          
          setGrid(interpolatedGrid);
          setTransitionProgress(progress);
          lastProgressUpdate = progress;
          
          if (progress >= 0.99) {
            currentIndex = nextIndex;
            setCurrentExpressionName(nextExpr);
            setTransitionProgress(0);
            lastProgressUpdate = -1;
          }
        }
      } else {
        // Stable phase with subtle breathing animation
        const breathe = Math.sin((elapsed % 4000) / 4000 * Math.PI * 2) * 0.1 + 1;
        const currentExpr = localExpressions[currentIndex];
        const baseGrid = generateGrid(
          currentExpr, 
          config.expressions, 
          config.nosePattern, 
          config.gridWidth, 
          config.gridHeight, 
          breathe
        );
        setGrid(baseGrid);
        
        if (lastProgressUpdate !== 0) {
          setTransitionProgress(0);
          lastProgressUpdate = 0;
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [config, expressionDuration, transitionDuration]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-purple-900 via-pink-900 to-rose-900 p-4">
      <PixelGrid
        grid={grid}
        gridWidth={config.gridWidth}
        gridHeight={config.gridHeight}
        colors={config.colors}
      />
      
      <DebugInfo
        currentExpressionName={currentExpressionName}
        transitionProgress={transitionProgress}
        showDebug={showDebug}
      />
    </div>
  );
};
