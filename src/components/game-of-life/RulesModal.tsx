'use client';

interface RulesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RulesModal({ isOpen, onClose }: RulesModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-white">Conway&apos;s Game of Life Rules</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-xl"
          >
            ×
          </button>
        </div>
        
        <div className="space-y-3 text-gray-300">
          <p className="text-sm text-gray-400 mb-4">
            Each cell follows these simple rules every generation:
          </p>
          
          <div className="space-y-2">
            <p>• <span className="text-green-400">Live cell</span> with 2 or 3 neighbors survives</p>
            <p>• <span className="text-green-400">Live cell</span> with fewer than 2 neighbors dies (underpopulation)</p>
            <p>• <span className="text-green-400">Live cell</span> with more than 3 neighbors dies (overpopulation)</p>
            <p>• <span className="text-gray-500">Dead cell</span> with exactly 3 neighbors becomes alive (reproduction)</p>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-700">
            <p className="text-sm text-gray-400">
              These simple rules create complex, emergent behaviors and patterns.
              Try the preset patterns to see some classic examples!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}