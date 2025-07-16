"use client";
import React, { useRef, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import { useAnimationFrame } from "@/hooks/use-animation-cleanup";
import { Boxes } from "./background-boxes";

interface CanvasBackgroundProps {
  className?: string;
}

export const CanvasBackground = React.memo(({ className }: CanvasBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const lastMouseUpdate = useRef(0);
  const isInitialized = useRef(false);
  const [canvasError, setCanvasError] = React.useState(false);
  
  const colors = [
    "#fbbf24",
    "#f59e0b", 
    "#d97706",
    "#92400e",
    "#451a03",
    "#a16207",
    "#78350f"
  ];

  const gridConfig = {
    rows: 150,     // Restore original
    cols: 100,     // Restore original
    cellWidth: 64, // Match original: h-8 w-16 = 32px height, 64px width
    cellHeight: 32,
    borderOpacity: 0.4,
    hoverRadius: 120,
    animationSpeed: 0.02
  };

  const getRandomColor = useCallback(() => {
    return colors[Math.floor(Math.random() * colors.length)];
  }, [colors]);

  const drawGrid = useCallback((ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const { rows, cols, cellWidth, cellHeight, borderOpacity, hoverRadius } = gridConfig;
    const { x: mouseX, y: mouseY } = mousePositionRef.current;
    
    // Recreate the original CSS transform exactly
    ctx.save();
    
    // Original CSS transform: translate(-40%,-60%) skewX(-48deg) skewY(14deg) scale(0.675)
    // Plus positioning: absolute -top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 p-4
    
    // Apply positioning transforms
    ctx.translate(canvas.width * 0.25, -canvas.height * 0.25); // left-1/4, -top-1/4
    ctx.translate(-canvas.width * 0.5, -canvas.height * 0.5);   // -translate-x-1/2 -translate-y-1/2
    ctx.translate(-canvas.width * 0.4, -canvas.height * 0.6);   // translate(-40%,-60%)
    
    // Apply the main transform
    const skewXRad = -48 * Math.PI / 180;
    const skewYRad = 14 * Math.PI / 180;
    const scale = 0.675;
    
    // Create the full transformation matrix
    // Matrix for: scale * skewX * skewY
    const a = scale;                            // scale x
    const b = Math.tan(skewYRad) * scale;      // skew y 
    const c = Math.tan(skewXRad) * scale;      // skew x
    const d = scale;                            // scale y
    const e = 0;                               // translate x
    const f = 0;                               // translate y
    
    ctx.transform(a, b, c, d, e, f);
    
    // Performance optimization: Calculate visible bounds
    const margin = 200;
    const visibleStartX = Math.max(0, Math.floor(-margin / cellWidth));
    const visibleEndX = Math.min(cols, Math.ceil((canvas.width + margin) / cellWidth));
    const visibleStartY = Math.max(0, Math.floor(-margin / cellHeight));
    const visibleEndY = Math.min(rows, Math.ceil((canvas.height + margin) / cellHeight));
    
    // Cache style strings for better performance
    const defaultFillStyle = 'rgba(15, 23, 42, 0.2)';
    const borderStrokeStyle = `rgba(100, 116, 139, ${borderOpacity})`;
    const crossStrokeStyle = 'rgba(100, 116, 139, 0.5)';
    
    for (let i = visibleStartY; i < visibleEndY; i++) {
      for (let j = visibleStartX; j < visibleEndX; j++) {
        const x = j * cellWidth;
        const y = i * cellHeight;
        
        // Calculate distance from mouse
        const distance = Math.sqrt((mouseX - x) ** 2 + (mouseY - y) ** 2);
        const isHovered = distance < hoverRadius;
        
        // Draw cell background
        if (isHovered) {
          const intensity = Math.max(0, 1 - distance / hoverRadius);
          const alpha = Math.floor(intensity * 255).toString(16).padStart(2, '0');
          ctx.fillStyle = getRandomColor() + alpha;
          ctx.fillRect(x, y, cellWidth, cellHeight);
        } else {
          ctx.fillStyle = defaultFillStyle;
          ctx.fillRect(x, y, cellWidth, cellHeight);
        }
        
        // Draw borders (batch strokes for performance)
        ctx.strokeStyle = borderStrokeStyle;
        ctx.lineWidth = 1;
        ctx.strokeRect(x, y, cellWidth, cellHeight);
        
        // Draw cross icons (every other cell)
        if (j % 2 === 0 && i % 2 === 0) {
          ctx.strokeStyle = crossStrokeStyle;
          ctx.lineWidth = 1.5;
          const centerX = x + cellWidth / 2;
          const centerY = y + cellHeight / 2;
          const size = 8;
          
          // Draw cross
          ctx.beginPath();
          ctx.moveTo(centerX - size, centerY);
          ctx.lineTo(centerX + size, centerY);
          ctx.moveTo(centerX, centerY - size);
          ctx.lineTo(centerX, centerY + size);
          ctx.stroke();
        }
      }
    }
    ctx.restore();
  }, [getRandomColor]);

  const handleMouseMove = useCallback((event: MouseEvent) => {
    const now = performance.now();
    if (now - lastMouseUpdate.current < 16) return; // Throttle to ~60fps
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const screenX = event.clientX - rect.left;
    const screenY = event.clientY - rect.top;
    
    // Transform mouse coordinates to match grid coordinate space
    // Need to reverse all the transforms we apply to the grid
    
    // Reverse the positioning transforms first
    let transformedX = screenX;
    let transformedY = screenY;
    
    // Reverse translate(-40%,-60%)
    transformedX += canvas.width * 0.4;
    transformedY += canvas.height * 0.6;
    
    // Reverse -translate-x-1/2 -translate-y-1/2
    transformedX += canvas.width * 0.5;
    transformedY += canvas.height * 0.5;
    
    // Reverse left-1/4, -top-1/4
    transformedX -= canvas.width * 0.25;
    transformedY -= (-canvas.height * 0.25);
    
    // Reverse the scale and skew transform (approximate inverse)
    const scale = 0.675;
    const skewXRad = -48 * Math.PI / 180;
    const skewYRad = 14 * Math.PI / 180;
    
    // Apply inverse scale
    transformedX = transformedX / scale;
    transformedY = transformedY / scale;
    
    // Approximate inverse skew (simplified)
    transformedX = transformedX - (transformedY * Math.tan(skewXRad));
    transformedY = transformedY - (transformedX * Math.tan(skewYRad));
    
    mousePositionRef.current = {
      x: transformedX,
      y: transformedY
    };
    lastMouseUpdate.current = now;
  }, []);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isInitialized.current) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    drawGrid(ctx, canvas);
  }, [drawGrid]);

  const { start: startAnimation, stop: stopAnimation } = useAnimationFrame(animate, [drawGrid]);

  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const container = canvas.parentElement;
    if (!container) return;
    
    const rect = container.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    
    // Set CSS size to prevent scaling issues
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      setCanvasError(true);
      return;
    }
    
    // Test if canvas context is available
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      setCanvasError(true);
      return;
    }
    
    try {
      handleResize();
      isInitialized.current = true;
      
      // Add event listeners
      canvas.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('resize', handleResize);
      
      // Start animation
      startAnimation();
      
      // Test initial draw
      setTimeout(() => {
        if (canvas.width === 0 || canvas.height === 0) {
          setCanvasError(true);
        }
      }, 100);
      
    } catch (error) {
      setCanvasError(true);
    }
    
    return () => {
      isInitialized.current = false;
      stopAnimation();
      canvas.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, [handleMouseMove, handleResize, startAnimation, stopAnimation]);

  // Fallback to DOM version if Canvas fails
  if (canvasError) {
    return <Boxes className={className} />;
  }

  return (
    <canvas
      ref={canvasRef}
      className={cn("absolute inset-0 z-1", className)}
      style={{
        willChange: 'transform',
        transform: 'translateZ(0)' // Force GPU acceleration
      }}
    />
  );
});

CanvasBackground.displayName = "CanvasBackground";