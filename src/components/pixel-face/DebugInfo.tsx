import React from 'react';

interface DebugInfoProps {
  currentExpressionName: string;
  transitionProgress: number;
  showDebug?: boolean;
}

export const DebugInfo: React.FC<DebugInfoProps> = ({
  currentExpressionName,
  transitionProgress,
  showDebug = true
}) => {
  if (!showDebug) return null;

  return (
    <div className="fixed bottom-4 right-4 text-white text-sm bg-black bg-opacity-50 px-3 py-2 rounded">
      Expression: {currentExpressionName}
      {transitionProgress > 0 && (
        <div>Transition: {Math.round(transitionProgress * 100)}%</div>
      )}
    </div>
  );
};
