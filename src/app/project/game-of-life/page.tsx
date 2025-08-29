'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';

const GRID_SIZE = 50;
const CELL_SIZE = 8;

type Grid = boolean[][];

const createEmptyGrid = (): Grid => {
  return Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(false));
};

const createRandomGrid = (): Grid => {
  return Array(GRID_SIZE).fill(null).map(() => 
    Array(GRID_SIZE).fill(null).map(() => Math.random() > 0.7)
  );
};

const countNeighbors = (grid: Grid, x: number, y: number): number => {
  let count = 0;
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) continue;
      const newX = x + i;
      const newY = y + j;
      if (newX >= 0 && newX < GRID_SIZE && newY >= 0 && newY < GRID_SIZE) {
        if (grid[newX][newY]) count++;
      }
    }
  }
  return count;
};

const nextGeneration = (grid: Grid): Grid => {
  const newGrid = createEmptyGrid();
  
  for (let x = 0; x < GRID_SIZE; x++) {
    for (let y = 0; y < GRID_SIZE; y++) {
      const neighbors = countNeighbors(grid, x, y);
      
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

export default function GameOfLife() {
  const [grid, setGrid] = useState<Grid>(createEmptyGrid);
  const [isRunning, setIsRunning] = useState(false);
  const [generation, setGeneration] = useState(0);
  const [speed, setSpeed] = useState(100);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const runSimulation = useCallback(() => {
    setGrid(prevGrid => {
      setGeneration(prev => prev + 1);
      return nextGeneration(prevGrid);
    });
  }, []);

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
    setGrid(createEmptyGrid());
    setGeneration(0);
    setIsRunning(false);
  };

  const randomize = () => {
    setGrid(createRandomGrid());
    setGeneration(0);
  };

  const loadPattern = (pattern: 'glider' | 'blinker' | 'toad' | 'beacon') => {
    const newGrid = createEmptyGrid();
    const centerX = Math.floor(GRID_SIZE / 2);
    const centerY = Math.floor(GRID_SIZE / 2);

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

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
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

        {/* Controls */}
        <div className="mb-6 flex flex-wrap gap-4 items-center">
          <button
            onClick={startStop}
            className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
              isRunning 
                ? 'bg-red-600 hover:bg-red-700 text-white' 
                : 'bg-green-600 hover:bg-green-700 text-white'
            }`}
          >
            {isRunning ? 'Stop' : 'Start'}
          </button>
          
          <button
            onClick={clear}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
          >
            Clear
          </button>
          
          <button
            onClick={randomize}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
          >
            Random
          </button>

          <div className="flex items-center gap-2">
            <label className="text-gray-300">Speed:</label>
            <input
              type="range"
              min="50"
              max="500"
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              className="w-24"
            />
            <span className="text-gray-300 text-sm">{speed}ms</span>
          </div>

          <div className="text-gray-300">
            Generation: <span className="font-mono">{generation}</span>
          </div>
        </div>

        {/* Pattern Presets */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2 text-gray-300">Patterns:</h3>
          <div className="flex flex-wrap gap-2">
            {(['glider', 'blinker', 'toad', 'beacon'] as const).map(pattern => (
              <button
                key={pattern}
                onClick={() => loadPattern(pattern)}
                className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded transition-colors capitalize"
              >
                {pattern}
              </button>
            ))}
          </div>
        </div>

        {/* Game Grid */}
        <div className="flex justify-center">
          <div 
            className="grid border border-gray-600 bg-gray-900"
            style={{ 
              gridTemplateColumns: `repeat(${GRID_SIZE}, ${CELL_SIZE}px)`,
              gap: '1px'
            }}
          >
            {grid.map((row, x) =>
              row.map((cell, y) => (
                <div
                  key={`${x}-${y}`}
                  className={`cursor-pointer transition-colors ${
                    cell ? 'bg-green-400' : 'bg-gray-800 hover:bg-gray-700'
                  }`}
                  style={{ 
                    width: `${CELL_SIZE}px`, 
                    height: `${CELL_SIZE}px` 
                  }}
                  onClick={() => toggleCell(x, y)}
                />
              ))
            )}
          </div>
        </div>

        {/* Rules */}
        <div className="mt-8 max-w-2xl mx-auto">
          <h3 className="text-xl font-semibold mb-4">Rules</h3>
          <div className="space-y-2 text-gray-300">
            <p>• Any live cell with 2 or 3 live neighbors survives</p>
            <p>• Any dead cell with exactly 3 live neighbors becomes alive</p>
            <p>• All other live cells die, and all other dead cells stay dead</p>
          </div>
        </div>
      </div>
    </div>
  );
}
