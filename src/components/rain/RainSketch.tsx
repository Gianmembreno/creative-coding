'use client';

import { useEffect, useRef, useState } from 'react';

interface Raindrop {
  x: number;
  y: number;
  speed: number;
  length: number;
  opacity: number;
  thickness: number;
}

interface Splash {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  opacity: number;
}

interface RainSketchProps {
  isFullscreen: boolean;
  containerRef: React.RefObject<HTMLDivElement>;
}

export default function RainSketch({ isFullscreen, containerRef }: RainSketchProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const p5InstanceRef = useRef<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Dynamic import to avoid SSR issues
    import('p5').then((p5Module) => {
      const p5 = p5Module.default;
      
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const sketch = (p: any) => {
        const raindrops: Raindrop[] = [];
        const splashes: Splash[] = [];
        let canvasWidth = 800;
        let canvasHeight = 600;

        // Function to create a new raindrop
        const createRaindrop = (): Raindrop => {
          return {
            x: p.random(-50, canvasWidth + 50),
            y: p.random(-200, -50),
            speed: p.random(4, 12),
            length: p.random(10, 25),
            opacity: p.random(150, 255),
            thickness: p.random(1, 2.5)
          };
        };

        // Function to create a splash effect
        const createSplash = (x: number, y: number): Splash => {
          return {
            x: x,
            y: y,
            radius: 0,
            maxRadius: p.random(15, 30),
            opacity: 255
          };
        };

        p.setup = () => {
          // Get container dimensions
          if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            canvasWidth = isFullscreen ? window.innerWidth : Math.min(rect.width, 800);
            canvasHeight = isFullscreen ? window.innerHeight : 600;
          }
          
          const canvas = p.createCanvas(canvasWidth, canvasHeight);
          canvas.parent(containerRef.current!);
          
          // Create initial raindrops
          for (let i = 0; i < 150; i++) {
            raindrops.push(createRaindrop());
          }
          
          // Set loaded state
          setIsLoaded(true);
        };

        p.draw = () => {
          // Dark stormy sky background
          p.background(40, 50, 65);
          
          // Draw raindrops
          for (let i = raindrops.length - 1; i >= 0; i--) {
            const drop = raindrops[i];
            
            // Update raindrop position
            drop.y += drop.speed;
            drop.x += p.random(-0.5, 0.5); // Slight horizontal drift
            
            // Remove raindrop if it's off-screen
            if (drop.y > canvasHeight + 50) {
              // Create splash effect at bottom
              if (p.random() < 0.3) { // 30% chance of splash
                splashes.push(createSplash(drop.x, canvasHeight - 10));
              }
              raindrops.splice(i, 1);
              continue;
            }
            
            // Draw raindrop
            p.stroke(173, 216, 230, drop.opacity); // Light blue color
            p.strokeWeight(drop.thickness);
            p.line(drop.x, drop.y, drop.x, drop.y + drop.length);
          }
          
          // Draw splash effects
          for (let i = splashes.length - 1; i >= 0; i--) {
            const splash = splashes[i];
            
            // Update splash
            splash.radius += 1.5;
            splash.opacity -= 8;
            
            // Remove splash if finished
            if (splash.opacity <= 0 || splash.radius > splash.maxRadius) {
              splashes.splice(i, 1);
              continue;
            }
            
            // Draw splash as expanding circle
            p.noFill();
            p.stroke(173, 216, 230, splash.opacity);
            p.strokeWeight(1.5);
            p.ellipse(splash.x, splash.y, splash.radius * 2, splash.radius * 0.5);
          }
          
          // Add new raindrops to maintain density
          if (raindrops.length < 150) {
            for (let i = 0; i < 3; i++) {
              raindrops.push(createRaindrop());
            }
          }
        };

        p.mousePressed = () => {
          // Create splash at mouse position
          if (p.mouseX >= 0 && p.mouseX <= canvasWidth && p.mouseY >= 0 && p.mouseY <= canvasHeight) {
            for (let i = 0; i < 3; i++) {
              splashes.push(createSplash(
                p.mouseX + p.random(-20, 20), 
                p.mouseY + p.random(-10, 10)
              ));
            }
          }
        };

        p.windowResized = () => {
          if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            canvasWidth = isFullscreen ? window.innerWidth : Math.min(rect.width, 800);
            canvasHeight = isFullscreen ? window.innerHeight : 600;
            p.resizeCanvas(canvasWidth, canvasHeight);
          }
        };
      };

      // Create p5 instance
      if (containerRef.current) {
        p5InstanceRef.current = new p5(sketch);
      }
    });

    // Cleanup
    return () => {
      if (p5InstanceRef.current) {
        p5InstanceRef.current.remove();
        p5InstanceRef.current = null;
      }
      setIsLoaded(false);
    };
  }, [isFullscreen, containerRef]);

  // Handle fullscreen changes
  useEffect(() => {
    if (p5InstanceRef.current && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const canvasWidth = isFullscreen ? window.innerWidth : Math.min(rect.width, 800);
      const canvasHeight = isFullscreen ? window.innerHeight : 600;
      p5InstanceRef.current.resizeCanvas(canvasWidth, canvasHeight);
    }
  }, [isFullscreen, containerRef]);

  return (
    <div className={`${isFullscreen ? 'w-full h-full' : 'w-full max-w-4xl h-96'} relative`}>
      {/* Loading placeholder - only show when not loaded */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-b from-gray-700 to-gray-600 flex items-center justify-center">
          <div className="text-gray-300">Loading rain...</div>
        </div>
      )}
    </div>
  );
}