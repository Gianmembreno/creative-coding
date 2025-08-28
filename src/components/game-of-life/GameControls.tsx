'use client';

interface GameControlsProps {
  isRunning: boolean;
  generation: number;
  speed: number;
  onStartStop: () => void;
  onClear: () => void;
  onRandomize: () => void;
  onSpeedChange: (speed: number) => void;
  onPatternLoad: (pattern: 'glider' | 'blinker' | 'toad' | 'beacon') => void;
  onToggleFullscreen: () => void;
  onShowRules: () => void;
  isFullscreen: boolean;
}

export default function GameControls({
  isRunning,
  generation,
  speed,
  onStartStop,
  onClear,
  onRandomize,
  onSpeedChange,
  onPatternLoad,
  onToggleFullscreen,
  onShowRules,
  isFullscreen
}: GameControlsProps) {
  return (
    <div className="space-y-4">
      {/* Main Controls */}
      <div className="flex flex-wrap gap-4 items-center">
        <button
          onClick={onStartStop}
          className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
            isRunning 
              ? 'bg-red-600 hover:bg-red-700 text-white' 
              : 'bg-green-600 hover:bg-green-700 text-white'
          }`}
        >
          {isRunning ? 'Stop' : 'Start'}
        </button>
        
        <button
          onClick={onClear}
          className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
        >
          Clear
        </button>
        
        <button
          onClick={onRandomize}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
        >
          Random
        </button>

        <button
          onClick={onToggleFullscreen}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
        </button>

        <button
          onClick={onShowRules}
          className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition-colors"
        >
          Rules
        </button>

        <div className="flex items-center gap-2">
          <label className="text-gray-300">Speed:</label>
          <input
            type="range"
            min="50"
            max="500"
            value={speed}
            onChange={(e) => onSpeedChange(Number(e.target.value))}
            className="w-24"
          />
          <span className="text-gray-300 text-sm">{speed}ms</span>
        </div>

        <div className="text-gray-300">
          Generation: <span className="font-mono">{generation}</span>
        </div>
      </div>

      {/* Pattern Presets */}
      <div>
        <h3 className="text-lg font-semibold mb-2 text-gray-300">Patterns:</h3>
        <div className="flex flex-wrap gap-2">
          {(['glider', 'blinker', 'toad', 'beacon'] as const).map(pattern => (
            <button
              key={pattern}
              onClick={() => onPatternLoad(pattern)}
              className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded transition-colors capitalize"
            >
              {pattern}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}