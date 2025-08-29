'use client';

import { useEffect, useRef, useState } from 'react';

interface Cloud {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  circles: { x: number; y: number; size: number }[];
}

interface CloudsSketchProps {
  isFullscreen: boolean;
  containerRef: React.RefObject<HTMLDivElement>;
}

export default function CloudsSketch({ isFullscreen, containerRef }: CloudsSketchProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const p5InstanceRef = useRef<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Dynamic import to avoid SSR issues
    import('p5').then((p5Module) => {
      const p5 = p5Module.default;
      
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const sketch = (p: any) => {
        const clouds: Cloud[] = [];
        let canvasWidth = 800;
        let canvasHeight = 600;

        // Function to create a new cloud
        const createCloud = (x?: number, y?: number): Cloud => {
          const cloudSize = p.random(80, 200);
          const numCircles = Math.floor(p.random(5, 12));
          const circles: { x: number; y: number; size: number }[] = [];
          
          // Create random circles to form cloud shape
          for (let i = 0; i < numCircles; i++) {
            circles.push({
              x: p.random(-cloudSize/2, cloudSize/2),
              y: p.random(-cloudSize/3, cloudSize/3),
              size: p.random(cloudSize/4, cloudSize/1.5)
            });
          }
          
          return {
            x: x !== undefined ? x : canvasWidth + 100,
            y: y !== undefined ? y : p.random(50, canvasHeight - 150),
            size: cloudSize,
            speed: p.random(0.5, 2),
            opacity: p.random(180, 255),
            circles: circles
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
          
          // Create initial clouds
          for (let i = 0; i < 5; i++) {
            clouds.push(createCloud(p.random(0, canvasWidth), undefined));
          }
          
          // Set loaded state
          setIsLoaded(true);
        };

        p.draw = () => {
          // Sky gradient background
          for (let i = 0; i <= canvasHeight; i++) {
            const inter = p.map(i, 0, canvasHeight, 0, 1);
            const c = p.lerpColor(
              p.color(135, 206, 250), // Light sky blue
              p.color(176, 224, 230),  // Powder blue
              inter
            );
            p.stroke(c);
            p.line(0, i, canvasWidth, i);
          }
          
          // Update and draw clouds
          for (let i = clouds.length - 1; i >= 0; i--) {
            const cloud = clouds[i];
            
            // Move cloud to the left
            cloud.x -= cloud.speed;
            
            // Remove cloud if it's completely off-screen
            if (cloud.x < -cloud.size - 100) {
              clouds.splice(i, 1);
              continue;
            }
            
            // Draw cloud
            p.fill(255, cloud.opacity);
            p.noStroke();
            
            for (const circle of cloud.circles) {
              p.ellipse(
                cloud.x + circle.x,
                cloud.y + circle.y,
                circle.size,
                circle.size
              );
            }
          }
          
          // Add new clouds periodically
          if (p.frameCount % 120 === 0 || clouds.length < 3) {
            clouds.push(createCloud());
          }
        };

        p.mousePressed = () => {
          // Add a new cloud at mouse position
          if (p.mouseX >= 0 && p.mouseX <= canvasWidth && p.mouseY >= 0 && p.mouseY <= canvasHeight) {
            clouds.push(createCloud(p.mouseX + 50, p.mouseY));
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
        <div className="absolute inset-0 bg-gradient-to-b from-blue-200 to-blue-100 flex items-center justify-center">
          <div className="text-blue-800">Loading clouds...</div>
        </div>
      )}
    </div>
  );
}
