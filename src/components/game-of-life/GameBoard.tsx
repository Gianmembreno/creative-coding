'use client';

type Grid = boolean[][];

interface GameBoardProps {
  grid: Grid;
  gridSize: number;
  cellSize: number;
  onCellToggle: (x: number, y: number) => void;
  isRunning: boolean;
}

export default function GameBoard({ 
  grid, 
  gridSize, 
  cellSize, 
  onCellToggle, 
  isRunning 
}: GameBoardProps) {
  return (
    <div className="flex justify-center">
      <div 
        className="grid border border-gray-600 bg-gray-900"
        style={{ 
          gridTemplateColumns: `repeat(${gridSize}, ${cellSize}px)`,
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
                width: `${cellSize}px`, 
                height: `${cellSize}px` 
              }}
              onClick={() => !isRunning && onCellToggle(x, y)}
            />
          ))
        )}
      </div>
    </div>
  );
}