'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import GameBoard from '@/components/game-of-life/GameBoard';
import GameControls from '@/components/game-of-life/GameControls';
import RulesModal from '@/components/game-of-life/RulesModal';
import { useFullscreen } from '@/hooks/useFullscreen';

const NORMAL_GRID_SIZE = 50;
const FULLSCREEN_GRID_SIZE = 120;
const NORMAL_CELL_SIZE = 8;
const FULLSCREEN_CELL_SIZE = 6;

type Grid = boolean[][];

const createEmptyGrid = (size: number): Grid => {
  return Array(size).fill(null).map(() => Array(size).fill(false));
};

const createRandomGrid = (size: number): Grid => {
  return Array(size).fill(null).map(() => 
    Array(size).fill(null).map(() => Math.random() > 0.7)
  );
};

const countNeighbors = (grid: Grid, x: number, y: number, size: number): number => {
  let count = 0;
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) continue;
      const newX = x + i;
      const newY = y + j;
      if (newX >= 0 && newX < size && newY >= 0 && newY < size) {
        if (grid[newX][newY]) count++;
      }
    }
  }
  return count;
};

const nextGeneration = (grid: Grid, size: number): Grid => {
  const newGrid = createEmptyGrid(size);
  
  for (let x = 0; x < size; x++) {
    for (let y = 0; y < size; y++) {
      const neighbors = countNeighbors(grid, x, y, size);
      
      if (grid[x][y]) {
        // Cell is alive
        newGrid[x][y] = neighbors === 2 || neighbors === 3;
      } else {
        // Cell is dead
        newGrid[x][y] = neighbors === 3;
      }
    }
  }
  
  return newGrid;
};

// Helper function to resize grid when switching between modes
const resizeGrid = (oldGrid: Grid, newSize: number): Grid => {
  const newGrid = createEmptyGrid(newSize);
  const oldSize = oldGrid.length;
  const minSize = Math.min(oldSize, newSize);
  
  // Copy existing cells to new grid, centered
  const offsetOld = Math.floor((oldSize - minSize) / 2);
  const offsetNew = Math.floor((newSize - minSize) / 2);
  
  for (let x = 0; x < minSize; x++) {
    for (let y = 0; y < minSize; y++) {
      newGrid[x + offsetNew][y + offsetNew] = oldGrid[x + offsetOld][y + offsetOld];
    }
  }
  
  return newGrid;
};

export default function GameOfLife() {
  const [grid, setGrid] = useState<Grid>(() => createEmptyGrid(NORMAL_GRID_SIZE));
  const [isRunning, setIsRunning] = useState(false);
  const [generation, setGeneration] = useState(0);
  const [speed, setSpeed] = useState(100);
  const [showRules, setShowRules] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const { isFullscreen, toggleFullscreen } = useFullscreen();
  
  // Dynamic grid and cell sizes based on fullscreen state
  const gridSize = isFullscreen ? FULLSCREEN_GRID_SIZE : NORMAL_GRID_SIZE;
  const cellSize = isFullscreen ? FULLSCREEN_CELL_SIZE : NORMAL_CELL_SIZE;

  const runSimulation = useCallback(() => {
    setGrid(prevGrid => {
      setGeneration(prev => prev + 1);
      return nextGeneration(prevGrid, gridSize);
    });
  }, [gridSize]);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(runSimulation, speed);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, speed, runSimulation]);

  const toggleCell = (x: number, y: number) => {
    if (isRunning) return;
    
    setGrid(prevGrid => {
      const newGrid = [...prevGrid];
      newGrid[x][y] = !newGrid[x][y];
      return newGrid;
    });
  };

  const startStop = () => {
    setIsRunning(!isRunning);
  };

  const clear = () => {
    setGrid(createEmptyGrid(gridSize));
    setGeneration(0);
    setIsRunning(false);
  };

  const randomize = () => {
    setGrid(createRandomGrid(gridSize));
    setGeneration(0);
  };

  const loadPattern = (pattern: 'glider' | 'blinker' | 'toad' | 'beacon') => {
    const newGrid = createEmptyGrid(gridSize);
    const centerX = Math.floor(gridSize / 2);
    const centerY = Math.floor(gridSize / 2);

    switch (pattern) {
      case 'glider':
        newGrid[centerX][centerY + 1] = true;
        newGrid[centerX + 1][centerY + 2] = true;
        newGrid[centerX + 2][centerY] = true;
        newGrid[centerX + 2][centerY + 1] = true;
        newGrid[centerX + 2][centerY + 2] = true;
        break;
      case 'blinker':
        newGrid[centerX][centerY - 1] = true;
        newGrid[centerX][centerY] = true;
        newGrid[centerX][centerY + 1] = true;
        break;
      case 'toad':
        newGrid[centerX][centerY] = true;
        newGrid[centerX][centerY + 1] = true;
        newGrid[centerX][centerY + 2] = true;
        newGrid[centerX + 1][centerY - 1] = true;
        newGrid[centerX + 1][centerY] = true;
        newGrid[centerX + 1][centerY + 1] = true;
        break;
      case 'beacon':
        newGrid[centerX][centerY] = true;
        newGrid[centerX][centerY + 1] = true;
        newGrid[centerX + 1][centerY] = true;
        newGrid[centerX + 2][centerY + 3] = true;
        newGrid[centerX + 3][centerY + 2] = true;
        newGrid[centerX + 3][centerY + 3] = true;
        break;
    }
    
    setGrid(newGrid);
    setGeneration(0);
  };

  // Handle fullscreen toggle - toggle internal state and resize grid
  const handleFullscreenToggle = () => {
    const newIsFullscreen = !isFullscreen;
    const newGridSize = newIsFullscreen ? FULLSCREEN_GRID_SIZE : NORMAL_GRID_SIZE;
    
    // Resize the current grid to fit the new size
    setGrid(prevGrid => resizeGrid(prevGrid, newGridSize));
    
    // Toggle internal fullscreen state
    toggleFullscreen();
  };

  return (
    <div className={`min-h-screen bg-black text-white transition-all duration-300 ${
      isFullscreen ? 'p-2' : 'p-4'
    }`}>
      <div className={`mx-auto ${
        isFullscreen ? 'max-w-full h-screen flex flex-col' : 'max-w-6xl'
      }`}>
        {/* Header - hide in fullscreen */}
        {!isFullscreen && (
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <Link 
                href="/" 
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                ← Back to Projects
              </Link>
            </div>
            <h1 className="text-4xl font-bold mb-2">Conway&apos;s Game of Life</h1>
            <p className="text-gray-300 text-lg">
              A cellular automaton where complex patterns emerge from simple rules. 
              Click cells to toggle them, or use the presets below.
            </p>
          </div>
        )}

        {/* Controls */}
        <div className={`mb-6 ${isFullscreen ? 'flex-shrink-0' : ''}`}>
          <GameControls
            isRunning={isRunning}
            generation={generation}
            speed={speed}
            onStartStop={startStop}
            onClear={clear}
            onRandomize={randomize}
            onSpeedChange={setSpeed}
            onPatternLoad={loadPattern}
            onToggleFullscreen={handleFullscreenToggle}
            onShowRules={() => setShowRules(true)}
            isFullscreen={isFullscreen}
          />
        </div>

        {/* Game Grid */}
        <div className={`flex justify-center ${isFullscreen ? 'flex-1 items-center' : ''}`}>
          <GameBoard
            grid={grid}
            gridSize={gridSize}
            cellSize={cellSize}
            onCellToggle={toggleCell}
            isRunning={isRunning}
          />
        </div>

        {/* Rules Modal */}
        <RulesModal
          isOpen={showRules}
          onClose={() => setShowRules(false)}
        />
      </div>
    </div>
  );
}
