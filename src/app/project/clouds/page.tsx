'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { useFullscreen } from '@/hooks/useFullscreen';
import CloudsSketch from '@/components/clouds/CloudsSketch';

export default function CloudsPage() {
  const { isFullscreen, toggleFullscreen } = useFullscreen();
  const sketchRef = useRef<HTMLDivElement>(null);

  return (
    <div className={`${
      isFullscreen 
        ? 'fixed inset-0 z-50 bg-gradient-to-b from-blue-300 via-blue-200 to-blue-100' 
        : 'min-h-screen bg-gradient-to-b from-blue-300 via-blue-200 to-blue-100 p-4'
    } transition-all duration-300`}>
      <div className={`${
        isFullscreen ? 'w-full h-full flex flex-col' : 'mx-auto max-w-6xl'
      }`}>
        {/* Header - hide in fullscreen */}
        {!isFullscreen && (
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <Link 
                href="/" 
                className="text-blue-800 hover:text-blue-600 transition-colors"
              >
                ← Back to Projects
              </Link>
            </div>
            <h1 className="text-4xl font-bold mb-2 text-blue-900">Floating Clouds</h1>
            <p className="text-blue-700 text-lg">
              Watch as procedurally generated clouds drift peacefully across the sky from right to left.
              Each cloud is unique and moves at its own pace.
            </p>
          </div>
        )}

        {/* Controls */}
        {!isFullscreen && (
          <div className="mb-6 flex gap-4 items-center">
            <button
              onClick={toggleFullscreen}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Toggle Fullscreen
            </button>
            <div className="text-sm text-blue-700">
              Click anywhere to add a new cloud
            </div>
          </div>
        )}

        {/* Sketch Container */}
        <div 
          ref={sketchRef} 
          className={`flex justify-center items-center ${
            isFullscreen ? 'flex-1 w-full h-full relative' : 'w-full'
          }`}
        >
          <CloudsSketch 
            isFullscreen={isFullscreen} 
            containerRef={sketchRef as React.RefObject<HTMLDivElement>}
          />
          
          {/* Escape text for fullscreen */}
          {isFullscreen && (
            <div className="absolute bottom-4 right-4 text-white/70 text-sm bg-black/20 px-3 py-1 rounded backdrop-blur-sm">
              ESC for escape
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
